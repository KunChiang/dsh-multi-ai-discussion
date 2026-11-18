/**
 * 面板之外的状态中枢：按会话保存讨论进度，并持久化用户偏好。
 * 组件通过 useSyncExternalStore 订阅，避免把 SSE 状态塞进组件树。
 */
import { fetchCatalog, runDiscussion } from './api.js'

const SETTINGS_KEY = 'dsh-multi-ai-discussion.settings.v1'

const DEFAULT_SETTINGS = {
  models: [],
  rounds: 3,
  chair: null,
  maxMembers: 6,
}

function readSettings() {
  try {
    const raw = window.localStorage.getItem(SETTINGS_KEY)
    if (raw === null) return { ...DEFAULT_SETTINGS }
    const parsed = JSON.parse(raw)
    if (typeof parsed !== 'object' || parsed === null) return { ...DEFAULT_SETTINGS }
    return {
      models: Array.isArray(parsed.models)
        ? parsed.models.filter((item) => typeof item?.provider === 'string' && typeof item?.model === 'string')
        : [],
      rounds: [1, 2, 3].includes(parsed.rounds) ? parsed.rounds : 3,
      chair: typeof parsed.chair === 'string' ? parsed.chair : null,
      maxMembers: Number.isInteger(parsed.maxMembers) ? Math.max(2, Math.min(10, parsed.maxMembers)) : 6,
    }
  } catch {
    return { ...DEFAULT_SETTINGS }
  }
}

let settings = readSettings()
const settingsListeners = new Set()

export function getSettings() {
  return settings
}

export function subscribeSettings(listener) {
  settingsListeners.add(listener)
  return () => settingsListeners.delete(listener)
}

export function updateSettings(patch) {
  settings = { ...settings, ...patch }
  try {
    window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
  } catch {
    // 隐私模式下静默降级：本次会话内仍然生效。
  }
  for (const listener of settingsListeners) listener()
}

export function modelKey(provider, model) {
  return `${provider}::${model}`
}

/** 把持久化的选择与当前目录求交，丢弃已经不存在的模型。 */
export function reconcileSelection(catalog) {
  const available = new Set()
  for (const provider of catalog?.providers ?? []) {
    for (const model of provider.models) available.add(modelKey(provider.id, model.id))
  }
  const kept = getSettings().models.filter((item) => available.has(modelKey(item.provider, item.model)))
  const next = kept.length > 0 ? kept : (catalog?.selection ?? []).filter((item) => available.has(modelKey(item.provider, item.model)))
  if (next.length > 0) {
    const changed = next.length !== getSettings().models.length
      || next.some((item, index) => modelKey(item.provider, item.model) !== modelKey(settings.models[index]?.provider, settings.models[index]?.model))
    if (changed) updateSettings({ models: next, chair: next.some((item) => modelKey(item.provider, item.model) === settings.chair) ? settings.chair : null })
  }
  return next
}

// ---------------------------------------------------------------------------
// 讨论运行状态
// ---------------------------------------------------------------------------

const runs = new Map()
const runListeners = new Set()

export function getRun(sessionId) {
  return runs.get(sessionId) ?? null
}

export function subscribeRuns(listener) {
  runListeners.add(listener)
  return () => runListeners.delete(listener)
}

function publish(sessionId, next) {
  if (next === null) runs.delete(sessionId)
  else runs.set(sessionId, next)
  for (const listener of runListeners) listener()
}

function patch(sessionId, update) {
  const current = runs.get(sessionId)
  if (current === undefined) return
  publish(sessionId, update(current))
}

/** 活动中的 AbortController，按会话保存，供「停止」与切换会话使用。 */
const controllers = new Map()

export function stopDiscussion(sessionId) {
  const controller = controllers.get(sessionId)
  if (controller === undefined) return
  controller.abort()
  controllers.delete(sessionId)
  patch(sessionId, (run) => ({ ...run, status: 'stopped', finished: true, elapsed: Date.now() - run.startedAt }))
}

export function clearDiscussion(sessionId) {
  stopDiscussion(sessionId)
  publish(sessionId, null)
}

/**
 * 开始一次讨论。topic 来自输入框草稿；members 来自设置里的选择。
 */
export async function startDiscussion(sessionId, topic) {
  const text = String(topic ?? '').trim()
  if (text === '') return { ok: false, reason: 'empty' }

  const chosen = getSettings().models
  if (chosen.length < 2) return { ok: false, reason: 'needTwo' }

  const existing = controllers.get(sessionId)
  if (existing !== undefined) existing.abort()

  const controller = new AbortController()
  controllers.set(sessionId, controller)

  const startedAt = Date.now()
  const chairKey = getSettings().chair

  publish(sessionId, {
    topic: text,
    status: 'running',
    members: chosen.map((item) => ({ provider: item.provider, model: item.model, label: item.model, providerName: item.provider })),
    rounds: getSettings().rounds,
    phaseNow: 'answer',
    answers: chosen.map(() => ({ text: '', state: 'idle', error: null, chars: 0 })),
    critiques: chosen.map(() => null),
    synthesis: { text: '', state: 'idle', error: null, chairs: 0 },
    error: null,
    startedAt,
    elapsed: 0,
    finished: false,
  })

  const tick = setInterval(() => {
    patch(sessionId, (run) => (run.finished ? run : { ...run, elapsed: Date.now() - startedAt }))
  }, 500)

  const memberPatch = (index, next) => patch(sessionId, (run) => ({
    ...run,
    answers: run.answers.map((item, i) => (i === index ? { ...item, ...next } : item)),
  }))

  try {
    await runDiscussion({
      question: text,
      models: chosen.map((item) => ({ provider: item.provider, model: item.model })),
      rounds: getSettings().rounds,
      chairIndex: Math.max(0, chosen.findIndex((item) => modelKey(item.provider, item.model) === chairKey)),
    }, {
      signal: controller.signal,
      onEvent: (event) => {
        switch (event.t) {
          case 'phase':
            patch(sessionId, (run) => ({ ...run, phaseNow: event.phase }))
            break
          case 'start':
            if (event.phase === 'answer') memberPatch(event.index, { state: 'running' })
            else if (event.phase === 'critique') patch(sessionId, (run) => ({
              ...run,
              critiques: run.critiques.map((item, i) => (i === event.index ? { state: 'running', text: '', chars: 0, error: null } : item)),
            }))
            else if (event.phase === 'synthesis') patch(sessionId, (run) => ({ ...run, synthesis: { ...run.synthesis, state: 'running' } }))
            break
          case 'delta':
            if (event.phase === 'answer') patch(sessionId, (run) => ({
              ...run,
              answers: run.answers.map((item, i) => (i === event.index ? { ...item, text: item.text + event.text, chars: item.text.length + event.text.length } : item)),
            }))
            else if (event.phase === 'critique') patch(sessionId, (run) => ({
              ...run,
              critiques: run.critiques.map((item, i) => (i === event.index
                ? { ...(item ?? { state: 'running', chars: 0, text: '' }), text: (item?.text ?? '') + event.text, chars: (item?.text ?? '').length + event.text.length }
                : item)),
            }))
            else if (event.phase === 'synthesis') patch(sessionId, (run) => ({
              ...run,
              synthesis: { ...run.synthesis, text: run.synthesis.text + event.text },
            }))
            break
          case 'end':
            if (event.phase === 'answer') memberPatch(event.index, { state: 'done', chars: event.chars ?? 0 })
            else if (event.phase === 'critique') patch(sessionId, (run) => ({
              ...run,
              critiques: run.critiques.map((item, i) => (i === event.index ? { ...(item ?? {}), state: 'done', chars: event.chars ?? 0 } : item)),
            }))
            else if (event.phase === 'synthesis') patch(sessionId, (run) => ({ ...run, synthesis: { ...run.synthesis, state: 'done' } }))
            break
          case 'fail':
            if (event.phase === 'answer') memberPatch(event.index, { state: 'failed', error: event.message ?? 'failed' })
            else if (event.phase === 'critique') patch(sessionId, (run) => ({
              ...run,
              critiques: run.critiques.map((item, i) => (i === event.index ? { ...(item ?? {}), state: 'failed', error: event.message ?? 'failed' } : item)),
            }))
            else if (event.phase === 'synthesis') patch(sessionId, (run) => ({ ...run, synthesis: { ...run.synthesis, state: 'failed', error: event.message ?? 'failed' } }))
            else patch(sessionId, (run) => ({ ...run, error: event.message ?? 'failed' }))
            break
          case 'done':
            patch(sessionId, (run) => ({ ...run, status: 'done', finished: true, elapsed: Date.now() - startedAt }))
            break
          default:
            break
        }
      },
    })
    patch(sessionId, (run) => ({ ...run, finished: true, status: run.status === 'stopped' ? 'stopped' : 'done', elapsed: Date.now() - startedAt }))
    return { ok: true }
  } catch (error) {
    if (controller.signal.aborted) {
      patch(sessionId, (run) => ({ ...run, status: 'stopped', finished: true }))
      return { ok: false, reason: 'stopped' }
    }
    patch(sessionId, (run) => ({
      ...run,
      status: 'error',
      finished: true,
      error: error instanceof Error ? error.message : String(error),
    }))
    return { ok: false, reason: 'failed', error }
  } finally {
    clearInterval(tick)
    if (controllers.get(sessionId) === controller) controllers.delete(sessionId)
  }
}

// ---------------------------------------------------------------------------
// 模型目录（多个组件共享一次请求）
// ---------------------------------------------------------------------------

let catalogState = { status: 'idle', data: null, error: null }
const catalogListeners = new Set()

export function getCatalog() {
  return catalogState
}

export function subscribeCatalog(listener) {
  catalogListeners.add(listener)
  return () => catalogListeners.delete(listener)
}

function setCatalog(next) {
  catalogState = next
  for (const listener of catalogListeners) listener()
}

let catalogInflight = null

export async function loadCatalog(force = false) {
  if (!force && catalogState.status === 'ready') return catalogState.data
  // 并发调用共享同一个在途请求：第二个调用者必须拿到真实结果，而不是 null。
  if (catalogInflight !== null) return catalogInflight
  setCatalog({ status: 'loading', data: catalogState.data, error: null })
  catalogInflight = (async () => {
    try {
      const data = await fetchCatalog(force)
      setCatalog({ status: 'ready', data, error: null })
      reconcileSelection(data)
      return data
    } catch (error) {
      setCatalog({ status: 'error', data: null, error: error instanceof Error ? error.message : String(error) })
      return null
    } finally {
      catalogInflight = null
    }
  })()
  return catalogInflight
}
