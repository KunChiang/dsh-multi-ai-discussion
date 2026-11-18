/**
 * 多 AI 讨论 —— Host 半。
 *
 * 职责：
 * 1. 从 `ctx.llm` 读出当前 profile 里已经配置好的 provider / model 列表，交给前端让用户挑选；
 * 2. 用 `ctx.llm.stream()` 并发驱动多个模型：先各自独立作答，再互相评审修订，最后由主持人汇总；
 * 3. 通过 connection 的 `/api/multi-ai-discussion/*` 路由，把过程以 SSE 的形式实时推给浏览器半。
 *
 * 本文件不读写任何凭据，也不落盘：一次讨论只在内存里活到连接断开为止。
 */

export const name = 'multi-ai-discussion'
export const inject = ['llm']

const ROUTE_BASE = '/api/multi-ai-discussion'
const MAX_BODY_BYTES = 64 * 1024
const MAX_QUESTION_CHARS = 20000
const MAX_MEMBERS = 6
const MIN_MEMBERS = 1
const DEFAULT_ANSWER_TOKENS = 2048
const DEFAULT_SYNTH_TOKENS = 4096
const MAX_ANSWER_CHARS = 6000
const STREAM_TIMEOUT_MS = 240000
const CATALOG_TTL_MS = 60000

/** 非对话模型：列出来只会增加误选概率。 */
const NON_CHAT = /(embedding|rerank|moderation|tts|whisper|speech|transcri|image-generation|dall-e|stable-diffusion|ocr)/i

// ---------------------------------------------------------------------------
// 提示词
// ---------------------------------------------------------------------------

const ANSWER_SYSTEM = [
  '你正在参加「多 AI 讨论」，是其中一位独立专家。',
  '请针对用户给出的需求或问题，独立给出你自己的最佳答案或方案。',
  '',
  '要求：',
  '1. 先给结论或方案要点，再展开关键理由、步骤、取舍与风险。',
  '2. 不确定的地方明确标注为假设；不要编造事实、数据、接口或引用。',
  '3. 用与用户提问相同的语言作答。',
  '4. 只输出答案本身：不要复述这些要求，不要提及"其他模型"，也不要自我介绍。',
].join('\n')

const CRITIQUE_SYSTEM = [
  '你正在参加「多 AI 讨论」的第二轮：交叉评审。',
  '你会看到同一个问题的若干份独立回答（已匿名编号）。',
  '',
  '请完成三件事：',
  '1. 指出其他回答里的错误、遗漏、含糊或过度自信之处，并指明是第几号回答。',
  '2. 吸收其中确实更好的部分，修正你自己此前的回答。',
  '3. 输出你修订后的完整答案（不是评审清单）：它应当能独立成立、比第一轮更准确完整。',
  '',
  '要求：用与用户提问相同的语言作答；结尾另起一行，用「关键修正：」概括本轮你改了什么。',
].join('\n')

const SYNTH_SYSTEM = [
  '你正在参加「多 AI 讨论」，担任主持人兼汇总者。',
  '你会读到多位专家对同一问题的独立回答与相互评审。',
  '',
  '请综合出唯一一份最终答案：',
  '1. 直接给出合并后的结论或方案，按重要性排序，可执行。',
  '2. 指出仍然存在的关键分歧，并说明你采纳哪一方、为什么。',
  '3. 保留必要的前提、步骤与风险提示。',
  '4. 用与用户提问相同的语言作答；不要出现"模型 A 认为"这类过程描述，直接陈述最终结论。',
].join('\n')

// ---------------------------------------------------------------------------
// 基础工具
// ---------------------------------------------------------------------------

function noStoreJson(value, status = 200) {
  return Response.json(value, {
    status,
    headers: { 'cache-control': 'no-store' },
  })
}

function failure(code, message, status = 400) {
  return noStoreJson({ ok: false, error: { code, message } }, status)
}

function asRecord(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value) ? value : null
}

function asString(value) {
  return typeof value === 'string' && value.trim() !== '' ? value.trim() : undefined
}

function asPositiveInt(value, fallback, min, max) {
  const n = typeof value === 'number' ? value : Number.parseInt(String(value ?? ''), 10)
  if (!Number.isFinite(n)) return fallback
  return Math.max(min, Math.min(max, Math.trunc(n)))
}

function clip(text, limit) {
  const value = String(text ?? '')
  return value.length <= limit ? value : `${value.slice(0, limit)}\n…（内容过长，已截断）`
}

function errorText(error) {
  if (error instanceof Error) return error.message || error.name
  if (typeof error === 'string') return error
  return String(error)
}

function safeLabel(value, fallback) {
  const text = typeof value === 'string' ? value.trim() : ''
  return text === '' ? fallback : text.slice(0, 80)
}

// ---------------------------------------------------------------------------
// 模型目录
// ---------------------------------------------------------------------------

/** 把 profile 里配置好的 provider / model 整理成前端可选列表，并短时缓存。 */
function createCatalog() {
  let cached = null
  let cachedAt = 0

  async function build(ctx) {
    const providers = typeof ctx.llm?.listProviders === 'function' ? ctx.llm.listProviders() : []
    const out = []
    for (const provider of Array.isArray(providers) ? providers : []) {
      const providerId = asString(provider?.id)
      if (providerId === undefined) continue
      let models = []
      try {
        models = await ctx.llm.listModels(providerId)
      } catch (error) {
        ctx.logger?.warn?.(`[multi-ai-discussion] listModels(${providerId}) 失败：${errorText(error)}`)
        continue
      }
      const usable = (Array.isArray(models) ? models : [])
        .filter((model) => asString(model?.id) !== undefined && !NON_CHAT.test(String(model.id)) && !NON_CHAT.test(String(model.name ?? '')))
        .map((model) => ({
          id: String(model.id),
          name: safeLabel(model.name, String(model.id)),
          ...(asString(model.description) === undefined ? {} : { description: asString(model.description) }),
        }))
      if (usable.length === 0) continue
      out.push({
        id: providerId,
        name: safeLabel(provider?.name, providerId),
        models: usable,
      })
    }
    return out
  }

  return {
    async get(ctx, force = false) {
      const now = Date.now()
      if (!force && cached !== null && now - cachedAt < CATALOG_TTL_MS) return cached
      cached = await build(ctx)
      cachedAt = now
      return cached
    },
    invalidate() {
      cached = null
      cachedAt = 0
    },
  }
}

/** 默认选中项：优先会话默认模型，否则挑目录里第一个 provider 的前两个模型。 */
function pickDefaultSelection(providers, ctx) {
  const known = new Set()
  for (const provider of providers) for (const model of provider.models) known.add(`${provider.id}::${model.id}`)
  const selection = []
  let current
  try {
    current = ctx.get('agentDefaultModel')?.currentSelection?.()
  } catch {
    current = undefined
  }
  const preferred = asString(current?.provider)
  const preferredModel = asString(current?.model)
  if (preferred !== undefined && preferredModel !== undefined && known.has(`${preferred}::${preferredModel}`)) {
    selection.push({ provider: preferred, model: preferredModel })
  }
  for (const provider of providers) {
    for (const model of provider.models) {
      if (selection.length >= 2) break
      if (selection.some((item) => item.provider === provider.id && item.model === model.id)) continue
      selection.push({ provider: provider.id, model: model.id })
    }
    if (selection.length >= 2) break
  }
  return selection
}

// ---------------------------------------------------------------------------
// 一次模型调用
// ---------------------------------------------------------------------------

function userMessage(text) {
  return [{ role: 'user', content: [{ type: 'text', text }] }]
}

async function callModel(ctx, member, system, userText, options, signal, onDelta) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(new Error('模型响应超时')), STREAM_TIMEOUT_MS)
  const onAbort = () => controller.abort(signal.reason)
  if (signal.aborted) controller.abort(signal.reason)
  else signal.addEventListener('abort', onAbort, { once: true })

  let text = ''
  let usage = null
  try {
    const stream = ctx.llm.stream({
      provider: member.provider,
      model: member.model,
      system,
      messages: userMessage(userText),
      maxTokens: options.maxTokens,
      ...(options.temperature === undefined ? {} : { temperature: options.temperature }),
      signal: controller.signal,
    })
    for await (const chunk of stream) {
      if (chunk.type === 'text-delta') {
        if (chunk.text !== '') {
          text += chunk.text
          onDelta(chunk.text)
        }
        continue
      }
      if (chunk.type === 'usage') {
        usage = chunk.usage ?? null
        continue
      }
      if (chunk.type === 'finish') {
        const reason = chunk.reason ?? {}
        if (reason.kind === 'error') {
          throw new Error(reason.failure?.message ?? '模型返回错误')
        }
        if (reason.kind === 'aborted') {
          throw new Error('讨论已中止')
        }
      }
    }
  } finally {
    clearTimeout(timer)
    signal.removeEventListener('abort', onAbort)
  }
  return { text, usage }
}

// ---------------------------------------------------------------------------
// 讨论编排
// ---------------------------------------------------------------------------

function memberLabel(member) {
  return member.label ?? member.model
}

function answerPrompt(question, extra) {
  const parts = [`# 需求 / 问题\n${question}`]
  if (extra !== undefined) parts.push(`# 补充说明\n${extra}`)
  parts.push('请给出你的答案。')
  return parts.join('\n\n')
}

function critiquePrompt(question, answers, selfIndex) {
  const others = answers
    .map((answer, index) => (index === selfIndex ? null : { answer, index }))
    .filter((item) => item !== null)
    .map(({ answer, index }) => `## 回答 ${index + 1}\n${clip(answer.text, MAX_ANSWER_CHARS)}`)
    .join('\n\n')
  const mine = `## 你自己第一轮的回答\n${clip(answers[selfIndex]?.text ?? '', MAX_ANSWER_CHARS)}`
  return [
    `# 需求 / 问题\n${question}`,
    `# 其他专家的独立回答\n${others === '' ? '（没有其他有效回答）' : others}`,
    mine,
    '请按系统提示完成：指出问题、吸收优点、输出你修订后的完整答案。',
  ].join('\n\n')
}

function synthesisPrompt(question, answers, phases) {
  const body = answers
    .map((answer, index) => {
      const label = `## 专家 ${index + 1}（${answer.providerName} / ${answer.model}）`
      const critique = phases.critique
        ? `\n\n### 该专家对其他回答的评审\n${clip(answer.critique ?? '（未参与评审轮）', Math.floor(MAX_ANSWER_CHARS / 2))}`
        : ''
      return `${label}\n${clip(answer.final ?? answer.text, MAX_ANSWER_CHARS)}${critique}`
    })
    .join('\n\n')
  return [
    `# 需求 / 问题\n${question}`,
    `# 各专家的最终回答\n${body}`,
    '请按系统提示，输出唯一一份最终答案。',
  ].join('\n\n')
}

/**
 * 执行一次完整讨论，把每个事件交给 send 推送。
 * phases: { answer: true, critique: boolean, synthesis: boolean }
 */
async function runDiscussion(ctx, request, send) {
  const question = request.question
  const members = request.members
  const phases = request.phases
  const options = { maxTokens: request.maxTokens, temperature: request.temperature }

  const answers = members.map((member, index) => ({
    index,
    providerName: member.providerName,
    model: member.model,
    text: '',
    critique: null,
    usage: null,
    failed: false,
    error: null,
  }))

  send({ t: 'ready', rounds: (phases.critique ? 1 : 0) + 1 + (phases.synthesis ? 1 : 0) })

  // ---- 第一轮：独立作答 --------------------------------------------------
  send({ t: 'phase', phase: 'answer' })
  await Promise.all(members.map(async (member, index) => {
    send({ t: 'start', phase: 'answer', index })
    try {
      const { text, usage } = await callModel(
        ctx,
        member,
        ANSWER_SYSTEM,
        answerPrompt(question, request.extra),
        { maxTokens: options.maxTokens ?? DEFAULT_ANSWER_TOKENS, temperature: options.temperature },
        request.signal,
        (delta) => send({ t: 'delta', phase: 'answer', index, text: delta }),
      )
      answers[index].text = text
      answers[index].usage = usage
      send({ t: 'end', phase: 'answer', index, chars: text.length, usage })
    } catch (error) {
      answers[index].failed = true
      answers[index].error = errorText(error)
      send({ t: 'fail', phase: 'answer', index, message: answers[index].error })
    }
  }))

  if (request.signal.aborted) return

  const usableAnswers = answers.filter((answer) => !answer.failed && answer.text.trim() !== '')
  if (usableAnswers.length === 0) {
    send({ t: 'fail', message: '所有模型都没有给出有效回答，请检查模型配置或稍后重试。' })
    return
  }

  // ---- 第二轮：交叉评审 --------------------------------------------------
  if (phases.critique && members.length > 1) {
    send({ t: 'phase', phase: 'critique' })
    await Promise.all(members.map(async (member, index) => {
      const own = answers[index]
      if (own.failed) {
        send({ t: 'fail', phase: 'critique', index, message: '该模型首轮作答失败，跳过评审。' })
        return
      }
      send({ t: 'start', phase: 'critique', index })
      try {
        const { text, usage } = await callModel(
          ctx,
          member,
          CRITIQUE_SYSTEM,
          critiquePrompt(question, answers.map((item) => ({ text: item.failed ? '' : item.text })), index),
          { maxTokens: options.maxTokens ?? DEFAULT_ANSWER_TOKENS, temperature: options.temperature },
          request.signal,
          (delta) => send({ t: 'delta', phase: 'critique', index, text: delta }),
        )
        own.critique = text
        own.final = text
        own.usage = usage
        send({ t: 'end', phase: 'critique', index, chars: text.length, usage })
      } catch (error) {
        own.critiqueFailed = true
        send({ t: 'fail', phase: 'critique', index, message: errorText(error) })
      }
    }))
  }

  if (request.signal.aborted) return

  // ---- 第三轮：主持人汇总 ------------------------------------------------
  if (phases.synthesis && usableAnswers.length > 0) {
    send({ t: 'phase', phase: 'synthesis' })
    const chair = request.chair
    send({ t: 'start', phase: 'synthesis', index: chair.index })
    try {
      const { text, usage } = await callModel(
        ctx,
        chair,
        SYNTH_SYSTEM,
        synthesisPrompt(question, answers, { critique: phases.critique }),
        { maxTokens: request.maxTokens ?? DEFAULT_SYNTH_TOKENS, temperature: options.temperature },
        request.signal,
        (delta) => send({ t: 'delta', phase: 'synthesis', index: chair.index, text: delta }),
      )
      send({ t: 'end', phase: 'synthesis', index: chair.index, chars: text.length, usage })
    } catch (error) {
      send({ t: 'fail', phase: 'synthesis', index: chair.index, message: errorText(error) })
    }
  }

  send({ t: 'done' })
}

// ---------------------------------------------------------------------------
// HTTP 边界
// ---------------------------------------------------------------------------

function normalizeConfig(raw) {
  const config = asRecord(raw) ?? {}
  return {
    maxMembers: asPositiveInt(config.maxMembers, MAX_MEMBERS, 2, 10),
    answerTokens: asPositiveInt(config.answerTokens, DEFAULT_ANSWER_TOKENS, 256, 32000),
    synthesisTokens: asPositiveInt(config.synthesisTokens, DEFAULT_SYNTH_TOKENS, 256, 32000),
    defaultRounds: asPositiveInt(config.defaultRounds, 3, 1, 3),
    excludeModels: Array.isArray(config.excludeModels)
      ? config.excludeModels.filter((item) => typeof item === 'string').map((item) => item.trim()).filter((item) => item !== '')
      : [],
  }
}

function isExcluded(config, provider, model) {
  return config.excludeModels.some((pattern) => pattern === `${provider}::${model}` || pattern === `${provider}/${model}` || pattern === model)
}

function readRequestBody(request) {
  return request.text().then((text) => {
    if (text.length > MAX_BODY_BYTES) throw new Error('请求体过大')
    if (text.trim() === '') return {}
    const parsed = JSON.parse(text)
    return asRecord(parsed) ?? {}
  })
}

function sseResponse(run, onCancel) {
  const encoder = new TextEncoder()
  let closed = false
  let doneSent = false
  let controllerRef = null
  const stream = new ReadableStream({
    async start(controller) {
      controllerRef = controller
      const send = (event) => {
        if (closed) return
        if (event?.t === 'done') doneSent = true
        try {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`))
        } catch {
          closed = true
        }
      }
      try {
        await run(send)
      } catch (error) {
        send({ t: 'fail', message: errorText(error) })
      } finally {
        if (!closed) {
          if (!doneSent) send({ t: 'done' })
          closed = true
          try {
            controller.close()
          } catch {
            // 忽略：连接已断开
          }
        }
      }
    },
    cancel() {
      closed = true
      try {
        onCancel?.()
      } catch {
        // 忽略
      }
      try {
        controllerRef?.close()
      } catch {
        // 忽略
      }
    },
  })
  return new Response(stream, {
    headers: {
      'content-type': 'text/event-stream; charset=utf-8',
      'cache-control': 'no-cache, no-transform',
      'x-accel-buffering': 'no',
      'content-encoding': 'identity',
    },
  })
}

function createServer(ctx, config, catalog) {
  async function handleModels(request) {
    const url = new URL(request.url)
    const providers = await catalog.get(ctx, url.searchParams.get('refresh') === '1')
    const filtered = providers
      .map((provider) => ({
        ...provider,
        models: provider.models.filter((model) => !isExcluded(config, provider.id, model.id)),
      }))
      .filter((provider) => provider.models.length > 0)
    return noStoreJson({
      ok: true,
      providers: filtered,
      selection: pickDefaultSelection(filtered, ctx).filter((item) => !isExcluded(config, item.provider, item.model)),
      limits: {
        minMembers: MIN_MEMBERS,
        maxMembers: config.maxMembers,
        defaultRounds: config.defaultRounds,
        answerTokens: config.answerTokens,
        synthesisTokens: config.synthesisTokens,
      },
    })
  }

  async function handleDiscuss(request) {
    let body
    try {
      body = await readRequestBody(request)
    } catch (error) {
      return failure('multi-ai-discussion/bad-body', `无法解析请求体：${errorText(error)}`)
    }

    const question = asString(body.question)
    if (question === undefined) {
      return failure('multi-ai-discussion/no-question', '请先填写要讨论的需求或问题。')
    }
    if (question.length > MAX_QUESTION_CHARS) {
      return failure('multi-ai-discussion/question-too-long', `问题过长，请控制在 ${MAX_QUESTION_CHARS} 字以内。`)
    }

    const providers = await catalog.get(ctx)
    const known = new Map()
    for (const provider of providers) {
      for (const model of provider.models) known.set(`${provider.id}::${model.id}`, { providerName: provider.name, modelName: model.name })
    }

    const rawMembers = Array.isArray(body.models) ? body.models : []
    const seen = new Set()
    const members = []
    for (const item of rawMembers) {
      const record = asRecord(item)
      if (record === null) continue
      const provider = asString(record.provider)
      const model = asString(record.model)
      if (provider === undefined || model === undefined) continue
      const key = `${provider}::${model}`
      if (seen.has(key)) continue
      const meta = known.get(key)
      if (meta === undefined) continue
      if (isExcluded(config, provider, model)) continue
      seen.add(key)
      members.push({
        provider,
        model,
        providerName: meta.providerName,
        label: safeLabel(record.label, meta.modelName),
        index: members.length,
      })
      if (members.length >= config.maxMembers) break
    }

    if (members.length < MIN_MEMBERS) {
      return failure('multi-ai-discussion/no-models', '请至少选择一个模型；至少两个模型才能形成互相讨论。')
    }

    const rounds = asPositiveInt(body.rounds, config.defaultRounds, 1, 3)
    const phases = {
      critique: rounds >= 2,
      synthesis: rounds >= 3,
    }

    const chairIndex = asPositiveInt(body.chairIndex, 0, 0, members.length - 1)
    const chair = members[chairIndex]

    const temperature =
      typeof body.temperature === 'number' && Number.isFinite(body.temperature)
        ? Math.max(0, Math.min(2, body.temperature))
        : undefined

    const abort = new AbortController()
    const onAbort = () => abort.abort(new Error('客户端已断开'))
    if (request.signal.aborted) onAbort()
    else request.signal.addEventListener('abort', onAbort, { once: true })

    const discussion = {
      question,
      extra: asString(body.extra)?.slice(0, 4000),
      members,
      chair,
      phases,
      maxTokens: phases.synthesis ? config.synthesisTokens : config.answerTokens,
      temperature,
      signal: abort.signal,
    }

    ctx.logger?.info?.(
      `[multi-ai-discussion] 开始讨论：问题 ${question.length} 字，模型 ${members.map((member) => `${member.provider}/${member.model}`).join(', ')}`,
    )

    return sseResponse(
      async (send) => {
        try {
          await runDiscussion(ctx, discussion, send)
        } finally {
          request.signal.removeEventListener('abort', onAbort)
        }
      },
      () => abort.abort(new Error('客户端已断开')),
    )
  }

  return {
    handleModels,
    handleDiscuss,
  }
}

// ---------------------------------------------------------------------------
// 入口
// ---------------------------------------------------------------------------

export function apply(ctx, rawConfig) {
  const config = normalizeConfig(rawConfig)
  const catalog = createCatalog()
  const server = createServer(ctx, config, catalog)

  ctx.inject(['connection'], (scoped) => {
    const connection = scoped.get('connection')
    const register = connection?.fetch?.register?.bind(connection.fetch)
    if (typeof register !== 'function') {
      scoped.logger?.warn?.('[multi-ai-discussion] 当前部署没有 connection.fetch，插件不会出现在界面上。')
      return
    }
    scoped.effect(
      () => register({
        path: `${ROUTE_BASE}/models`,
        methods: ['POST'],
        requestBody: 'buffered',
        fetch: (request) => server.handleModels(request).catch((error) => failure('multi-ai-discussion/models', errorText(error), 500)),
      }),
      'multi-ai-discussion: models route',
    )
    scoped.effect(
      () => register({
        path: `${ROUTE_BASE}/discuss`,
        methods: ['POST'],
        requestBody: 'buffered',
        fetch: (request) => server.handleDiscuss(request).catch((error) => failure('multi-ai-discussion/discuss', errorText(error), 500)),
      }),
      'multi-ai-discussion: discuss route',
    )
  })

  // 配置变化时让模型目录失效，下一次点开面板就能看到最新模型。
  ctx.on('dispose', () => catalog.invalidate())
}