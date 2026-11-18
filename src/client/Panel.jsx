import React from 'react'
import { fetchCatalog, runDiscussion } from './api.js'
import { Markdown } from './Markdown.jsx'
import { NS } from './i18n.js'

const h = React.createElement

const defaultIcon = (size = 20) => h('svg', {
  width: size, height: size, viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': 'true',
},
  h('circle', { cx: 7.2, cy: 8.6, r: 2.7, stroke: 'currentColor', strokeWidth: 1.6 }),
  h('circle', { cx: 16.8, cy: 8.6, r: 2.7, stroke: 'currentColor', strokeWidth: 1.6 }),
  h('path', { d: 'M3.4 18.6c.7-2.9 3-4.6 5.7-4.6s5 1.7 5.7 4.6', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' }),
  h('path', { d: 'M15.2 14.4c2.2.2 4 1.8 4.6 4.2', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', opacity: '.55' }),
)

export function PanelIcon({ size = 18 }) {
  return defaultIcon(size)
}

function key(provider, model) {
  return `${provider}::${model}`
}

const ROUNDS = [1, 2, 3]

/** 逐字流式文本：新到的 delta 以淡入方式追加，末尾闪烁光标。 */
function StreamingText({ text, streaming }) {
  return h(React.Fragment, null,
    h(Markdown, { text }),
    streaming ? h('span', { className: 'mad-caret' }) : null)
}

function Thinking() {
  return h('span', { className: 'mad-thinking' },
    '…',
    h('i'), h('i'), h('i'))
}

function Card({ title, provider, state, chars, children, error }) {
  const meta = state === 'running' ? '···' : state === 'failed' ? '' : chars > 0 ? `${chars}` : ''
  return h('div', { className: `mad-card ${state}` },
    h('div', { className: 'mad-cardHead' },
      h('span', { className: `mad-dotS ${state}` }),
      h('span', { className: 'mad-cardName' }, title),
      provider ? h('span', { className: 'mad-cardProvider' }, provider) : null,
      h('span', { className: 'mad-cardMeta' }, meta)),
    h('div', { className: 'mad-cardBody' },
      error ? h('div', { className: 'mad-cardError' }, error) : children))
}

export function MultiAiPanel({ ctx, initialQuestion }) {
  const [, bumpLocale] = React.useState(0)
  const t = ctx.locale.bind(NS)
  React.useEffect(() => ctx.locale.subscribe(() => bumpLocale((value) => value + 1)), [ctx])

  const [catalog, setCatalog] = React.useState(null)
  const [catalogError, setCatalogError] = React.useState(null)
  const [loadingCatalog, setLoadingCatalog] = React.useState(true)
  const [selected, setSelected] = React.useState([])
  const [question, setQuestion] = React.useState(typeof initialQuestion === 'string' ? initialQuestion : '')
  const [extra, setExtra] = React.useState('')
  const [rounds, setRounds] = React.useState(3)
  const [chairKey, setChairKey] = React.useState(null)

  const [setupOpen, setSetupOpen] = React.useState(true)
  const [phase, setPhase] = React.useState('idle')
  const [runs, setRuns] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [copied, setCopied] = React.useState(false)

  const abortRef = React.useRef(null)
  const scrollRef = React.useRef(null)
  const liveRef = React.useRef(null)

  const loadCatalog = React.useCallback(async (force = false) => {
    setLoadingCatalog(true)
    setCatalogError(null)
    try {
      const data = await fetchCatalog(force)
      setCatalog(data)
      const preferred = data?.limits?.defaultRounds
      if (Number.isInteger(preferred) && preferred >= 1 && preferred <= 3) {
        setRounds((current) => (current === 3 ? preferred : current))
      }
      const preset = Array.isArray(data.selection) ? data.selection : []
      setSelected((current) => {
        const allowed = new Set()
        for (const provider of data.providers ?? []) {
          for (const model of provider.models) allowed.add(key(provider.id, model.id))
        }
        const kept = current.filter((item) => allowed.has(key(item.provider, item.model)))
        if (kept.length > 0) return kept
        return preset.filter((item) => allowed.has(key(item.provider, item.model)))
      })
    } catch (loadError) {
      setCatalogError(loadError instanceof Error ? loadError.message : String(loadError))
      setCatalog(null)
    } finally {
      setLoadingCatalog(false)
    }
  }, [])

  React.useEffect(() => {
    loadCatalog(false)
  }, [loadCatalog])

  // 默认汇总者：选中顺序里的第一个。
  React.useEffect(() => {
    if (selected.length === 0) {
      setChairKey(null)
      return
    }
    const keys = new Set(selected.map((item) => key(item.provider, item.model)))
    setChairKey((current) => (current !== null && keys.has(current) ? current : keys.values().next().value))
  }, [selected])

  const modelName = React.useCallback((providerId, modelId, fallbackLabel) => {
    if (typeof fallbackLabel === 'string' && fallbackLabel !== '') return fallbackLabel
    const provider = catalog?.providers?.find((item) => item.id === providerId)
    const model = provider?.models?.find((item) => item.id === modelId)
    return model?.name ?? modelId
  }, [catalog])

  const providerName = React.useCallback((providerId) => (
    catalog?.providers?.find((item) => item.id === providerId)?.name ?? providerId
  ), [catalog])

  const toggleModel = React.useCallback((providerId, modelId) => {
    if (phase === 'running') return
    const id = key(providerId, modelId)
    setSelected((current) => {
      const exists = current.some((item) => key(item.provider, item.model) === id)
      if (exists) return current.filter((item) => key(item.provider, item.model) !== id)
      const max = catalog?.limits?.maxMembers ?? 6
      if (current.length >= max) return current
      return [...current, { provider: providerId, model: modelId }]
    })
  }, [phase, catalog])

  const providerGroups = catalog?.providers ?? []

  const start = React.useCallback(async () => {
    const text = question.trim()
    if (text === '') {
      setError(t('needQuestion'))
      return
    }
    if (selected.length < 2) {
      setError(t('needTwo'))
      return
    }
    setError(null)
    setCopied(false)
    setPhase('running')
    const members = selected.map((item) => ({
      provider: item.provider,
      model: item.model,
      label: modelName(item.provider, item.model),
      providerName: providerName(item.provider),
    }))
    const initial = {
      question: text,
      members,
      chairIndex: Math.max(0, members.findIndex((item) => key(item.provider, item.model) === chairKey)),
      rounds,
      answer: members.map(() => ({ text: '', state: 'idle', error: null, chars: 0 })),
      critique: Array(members.length).fill(null),
      synthesis: { text: '', state: 'idle', error: null, chairIndex: Math.max(0, members.findIndex((item) => key(item.provider, item.model) === chairKey)) },
      phaseNow: 'answer',
      finished: false,
      startedAt: Date.now(),
      elapsed: 0,
    }
    setRuns(initial)
    setSetupOpen(false)
    if (scrollRef.current !== null) scrollRef.current.scrollTop = 0

    const controller = new AbortController()
    abortRef.current = controller
    const startedAt = Date.now()
    const tick = setInterval(() => {
      setRuns((current) => (current === null || current.finished ? current : { ...current, elapsed: Date.now() - startedAt }))
    }, 500)

    const patchMember = (index, patch) => setRuns((current) => {
      if (current === null) return current
      const membersList = current.answer.map((item, i) => (i === index ? { ...item, ...patch } : item))
      return { ...current, answer: membersList }
    })

    try {
      await runDiscussion({
        question: text,
        extra: extra.trim() === '' ? undefined : extra.trim(),
        models: selected.map((item) => ({ provider: item.provider, model: item.model })),
        rounds,
        chairIndex: Math.max(0, members.findIndex((item) => key(item.provider, item.model) === chairKey)),
      }, {
        signal: controller.signal,
        onEvent: (event) => {
          switch (event.t) {
            case 'ready':
              break
            case 'phase':
              setRuns((current) => (current === null ? current : { ...current, phaseNow: event.phase }))
              break
            case 'start':
              if (event.phase === 'answer') patchMember(event.index, { state: 'running' })
              else if (event.phase === 'critique') setRuns((current) => current === null ? current : {
                ...current,
                critique: current.critique.map((item, i) => (i === event.index ? { state: 'running', text: '', chars: 0, error: null } : item)),
              })
              else if (event.phase === 'synthesis') setRuns((current) => current === null ? current : {
                ...current, synthesis: { ...current.synthesis, state: 'running' },
              })
              break
            case 'delta':
              if (event.phase === 'answer') setRuns((current) => current === null ? current : {
                ...current,
                answer: current.answer.map((item, i) => (i === event.index ? { ...item, text: item.text + event.text, chars: item.text.length + event.text.length } : item)),
              })
              else if (event.phase === 'critique') setRuns((current) => current === null ? current : {
                ...current,
                critique: current.critique.map((item, i) => (i === event.index
                  ? { ...(item ?? { state: 'running', chars: 0 }), text: (item?.text ?? '') + event.text, chars: (item?.text ?? '').length + event.text.length }
                  : item)),
              })
              else if (event.phase === 'synthesis') setRuns((current) => current === null ? current : {
                ...current,
                synthesis: { ...current.synthesis, text: current.synthesis.text + event.text },
              })
              break
            case 'end':
              if (event.phase === 'answer') patchMember(event.index, { state: 'done', chars: event.chars ?? 0, usage: event.usage ?? null })
              else if (event.phase === 'critique') setRuns((current) => current === null ? current : {
                ...current,
                critique: current.critique.map((item, i) => (i === event.index ? { ...(item ?? {}), state: 'done', chars: event.chars ?? 0 } : item)),
              })
              else if (event.phase === 'synthesis') setRuns((current) => current === null ? current : {
                ...current, synthesis: { ...current.synthesis, state: 'done', chars: event.chars ?? 0 },
              })
              break
            case 'fail':
              if (event.phase === 'answer') patchMember(event.index, { state: 'failed', error: event.message ?? 'failed' })
              else if (event.phase === 'critique') setRuns((current) => current === null ? current : {
                ...current,
                critique: current.critique.map((item, i) => (i === event.index ? { ...(item ?? {}), state: 'failed', error: event.message ?? 'failed' } : item)),
              })
              else if (event.phase === 'synthesis') setRuns((current) => current === null ? current : {
                ...current, synthesis: { ...current.synthesis, state: 'failed', error: event.message ?? 'failed' },
              })
              else setError(event.message ?? 'failed')
              break
            case 'done':
              setRuns((current) => (current === null ? current : { ...current, finished: true, elapsed: Date.now() - startedAt }))
              setPhase('done')
              break
            default:
              break
          }
        },
      })
      setRuns((current) => (current === null ? current : { ...current, finished: true }))
      setPhase((current) => (current === 'running' ? 'done' : current))
    } catch (runError) {
      if (controller.signal.aborted) {
        setPhase('stopped')
      } else {
        setError(runError instanceof Error ? runError.message : String(runError))
        setPhase('error')
      }
      setRuns((current) => (current === null ? current : { ...current, finished: true }))
    } finally {
      clearInterval(tick)
      abortRef.current = null
    }
  }, [question, extra, selected, rounds, chairKey, t, modelName, providerName])

  const stop = React.useCallback(() => {
    abortRef.current?.abort()
    abortRef.current = null
    setPhase('stopped')
    setRuns((current) => (current === null ? current : { ...current, finished: true, elapsed: Date.now() - (current.startedAt ?? Date.now()) }))
  }, [])

  // 结果区自动贴底（仅在用户在底部附近时），保证流式输出不被甩开。
  React.useEffect(() => {
    if (phase !== 'running' || scrollRef.current === null) return
    const el = scrollRef.current
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 140
    if (nearBottom) el.scrollTop = el.scrollHeight
  }, [runs, phase])

  const copyFinal = React.useCallback(async () => {
    const text = runs?.synthesis?.text?.trim() || ''
    if (text === '') return
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }, [runs])

  const goBack = React.useCallback(() => {
    abortRef.current?.abort()
    try {
      ctx.get('layout')?.selectPanel(null)
    } catch (backError) {
      console.warn('[multi-ai-discussion] 无法返回会话', backError)
    }
  }, [ctx])

  React.useEffect(() => {
    const onKeyDown = (event) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return
      if (event.key !== 'Escape') return
      const target = event.target
      const typing = target !== null && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable === true)
      if (typing) return
      event.preventDefault()
      goBack()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [goBack])

  const running = phase === 'running'
  const hasResult = runs !== null
  const memberCount = selected.length
  const maxMembers = catalog?.limits?.maxMembers ?? 6
  const chair = selected.find((item) => key(item.provider, item.model) === chairKey)

  const statusText = running ? t('statusRunning') : phase === 'done' ? t('statusDone') : phase === 'stopped' ? t('statusStopped') : phase === 'error' ? t('statusError') : t('statusIdle')

  return h('div', { className: 'mad-root' },
    h('header', { className: 'mad-header' },
      h('div', { className: 'mad-mark' }, defaultIcon(19)),
      h('div', { className: 'mad-headCopy' },
        h('h1', { className: 'mad-title' }, t('title'), h('small', null, t('titleTag'))),
        h('p', { className: 'mad-sub' }, t('subtitle'))),
      h('span', { className: 'mad-spacer' }),
      h('button', { type: 'button', className: 'mad-btn ghost', onClick: goBack, title: t('backHint') }, `← ${t('back')}`)),

    h('div', { className: 'mad-scroll', ref: scrollRef },
      // ---------- 设定（运行中可收起） ----------
      h('section', {
        className: 'mad-setup',
        style: setupOpen || runs === null ? undefined : { display: 'none' },
      },
        h('div', { className: 'mad-field' },
          h('div', { className: 'mad-labelRow' },
            h('span', { className: 'mad-label' }, t('questionLabel')),
            h('span', { className: 'mad-count' }, `${question.length} / 20000`)),
          h('textarea', {
            className: 'mad-input',
            value: question,
            placeholder: t('questionPlaceholder'),
            rows: 4,
            disabled: running,
            maxLength: 20000,
            onChange: (event) => setQuestion(event.target.value),
          })),

        h('div', { className: 'mad-field' },
          h('div', { className: 'mad-labelRow' },
            h('span', { className: 'mad-label' }, t('extraLabel')),
            h('span', { className: 'mad-hint' }, t('extraHint'))),
          h('input', {
            className: 'mad-input small',
            value: extra,
            placeholder: t('extraPlaceholder'),
            disabled: running,
            maxLength: 4000,
            onChange: (event) => setExtra(event.target.value),
          })),

        h('div', { className: 'mad-field' },
          h('div', { className: 'mad-labelRow' },
            h('span', { className: 'mad-label' }, t('modelsLabel')),
            h('span', { className: 'mad-hint' }, t('modelsHint')),
            h('span', { className: 'mad-count' }, `${memberCount} / ${maxMembers}`)),
          loadingCatalog
            ? h('div', { className: 'mad-hint' }, t('modelsLoading'))
            : catalogError !== null
              ? h('div', { className: 'mad-error' },
                h('span', { style: { flex: '1 1 auto' } }, `${t('modelsFailed')}：${catalogError}`),
                h('button', { type: 'button', className: 'mad-btn tiny', onClick: () => loadCatalog(true) }, t('modelsRetry')))
              : providerGroups.length === 0
                ? h('div', { className: 'mad-emptyNote' }, t('modelsEmpty'))
                : h('div', { className: 'mad-models' },
                  providerGroups.map((provider) => h('div', { className: 'mad-group', key: provider.id },
                    h('div', { className: 'mad-groupName' }, provider.name),
                    h('div', { className: 'mad-chips' },
                      provider.models.map((model) => {
                        const on = selected.some((item) => key(item.provider, item.model) === key(provider.id, model.id))
                        return h('label', {
                          key: model.id,
                          className: `mad-chip${on ? ' on' : ''}`,
                          title: `${provider.name} / ${model.name}`,
                        },
                          h('input', {
                            type: 'checkbox',
                            checked: on,
                            disabled: running || (!on && memberCount >= maxMembers),
                            onChange: () => toggleModel(provider.id, model.id),
                          }),
                          h('span', { className: 'mad-dot' }),
                          h('span', { className: 'mad-chipName' }, model.name))
                      })))),
          memberCount > 0
            ? h('div', { className: 'mad-modelsFoot' },
              h('span', { className: 'mad-hint' }, `${t('modelsSelected')} ${memberCount}`),
              h('span', { className: 'mad-spacer' }),
              h('button', { type: 'button', className: 'mad-btn tiny ghost', disabled: running, onClick: () => setSelected([]) }, t('modelsClear')))
            : null),

        h('div', { className: 'mad-controls' },
          h('div', { className: 'mad-field' },
            h('div', { className: 'mad-labelRow' }, h('span', { className: 'mad-label' }, t('roundsLabel'))),
            h('div', { className: 'mad-seg' },
              ROUNDS.map((value) => h('button', {
                key: value,
                type: 'button',
                'aria-pressed': rounds === value,
                disabled: running,
                onClick: () => setRounds(value),
              }, t(`rounds${value}`)))),
            h('div', { className: 'mad-hint' },
              `${t(`roundsHint${rounds}`)}${rounds >= 3 && selected.length < 2 ? ` ${t('needTwo')}` : ''}`)),

          rounds >= 3
            ? h('div', { className: 'mad-field' },
              h('div', { className: 'mad-labelRow' },
                h('span', { className: 'mad-label' }, t('chairLabel')),
                h('span', { className: 'mad-hint' }, t('chairHint'))),
              selected.length === 0
                ? h('div', { className: 'mad-hint' }, t('noSelection'))
                : h('select', {
                  className: 'mad-select',
                  value: chairKey ?? '',
                  disabled: running,
                  onChange: (event) => setChairKey(event.target.value),
                }, selected.map((item) => {
                  const id = key(item.provider, item.model)
                  return h('option', { key: id, value: id }, `${modelName(item.provider, item.model)} · ${providerName(item.provider)}`)
                })))
            : null),

        h('div', { className: 'mad-submitRow' },
          running
            ? h('button', { type: 'button', className: 'mad-btn danger', onClick: stop }, `■ ${t('stop')}`)
            : h('button', {
              type: 'button',
              className: 'mad-btn primary',
              disabled: loadingCatalog || question.trim() === '' || memberCount < 2,
              onClick: start,
            }, `${hasResult ? t('restart') : t('start')} →`),
          hasResult && !running && setupOpen
            ? h('button', { type: 'button', className: 'mad-btn ghost', onClick: () => setSetupOpen(false) }, t('collapseSetup'))
            : null,
          hasResult && !running && runs?.synthesis?.state === 'done'
            ? h('button', { type: 'button', className: 'mad-btn', onClick: copyFinal }, copied ? `✓ ${t('copied')}` : t('copy'))
            : null,
          h('span', { className: 'mad-spacer' }),
          memberCount > 0 && !running
            ? h('span', { className: 'mad-hint' }, chair === undefined ? '' : `${t('chairLabel')}：${modelName(chair.provider, chair.model)}`)
            : null),

        error !== null
          ? h('div', { className: 'mad-error' }, h('span', null, `${t('errorPrefix')}${error}`))
          : null),

      runs !== null && !setupOpen
        ? h('section', { className: 'mad-summary' },
          h('span', { className: 'mad-summaryLabel' }, t('questionLabel')),
          h('span', { className: 'mad-summaryText' }, question),
          h('span', { className: 'mad-summaryMeta' }, runs.members.map((member) => member.label).join(' · ')),
          h('button', { type: 'button', className: 'mad-btn tiny', onClick: () => setSetupOpen(true) }, t('editSetup')))
        : null,

      // ---------- 进行中 / 结果 ----------
      runs === null
        ? h('div', { className: 'mad-empty' },
          h('div', { className: 'mad-emptyArt' }, defaultIcon(30)),
          h('div', { className: 'mad-emptyTitle' }, t('emptyTitle')),
          h('div', { className: 'mad-emptyBody' }, t('emptyBody')),
          h('div', { className: 'mad-steps' },
            h('span', { className: 'mad-step' }, h('b', null, '1'), t('empty1')),
            h('span', { className: 'mad-step' }, h('b', null, '2'), t('empty2')),
            h('span', { className: 'mad-step' }, h('b', null, '3'), t('empty3'))))
        : h('div', { className: 'mad-results' },
          h('div', { className: 'mad-statusBar' },
            h('strong', null, statusText),
            h('span', null, '·'),
            h('span', null, `${runs.members.length} ${t('expert')}`),
            h('span', null, '·'),
            h('span', null, `${Math.max(0, Math.round((runs.elapsed ?? 0) / 1000))}s`),
            h('span', { className: 'mad-spacer' }),
            h('span', null, rounds >= 3 ? t('phaseSynthesis') : rounds >= 2 ? t('phaseCritique') : t('phaseAnswer'))),

          h('section', { className: 'mad-phase' },
            h('div', { className: 'mad-phaseHead' },
              h('h2', { className: 'mad-phaseTitle' }, t('phaseAnswer')),
              h('span', { className: 'mad-phaseHint' }, t('phaseAnswerHint'))),
            h('div', { className: 'mad-grid' },
              runs.answer.map((item, index) => {
                const member = runs.members[index]
                return h(Card, {
                  key: `${member.provider}/${member.model}`,
                  title: member.label,
                  provider: member.providerName,
                  state: item.state,
                  chars: item.chars,
                  error: item.error,
                }, item.text === ''
                  ? (item.state === 'running' ? h(Thinking) : h('span', { className: 'mad-hint' }, '—'))
                  : h(StreamingText, { text: item.text, streaming: item.state === 'running' }))
              }))),

          rounds >= 2
            ? h('section', { className: 'mad-phase' },
              h('div', { className: 'mad-phaseHead' },
                h('h2', { className: 'mad-phaseTitle' }, t('phaseCritique')),
                h('span', { className: 'mad-phaseHint' }, t('phaseCritiqueHint'))),
              h('div', { className: 'mad-grid' },
                runs.answer.map((item, index) => {
                  const member = runs.members[index]
                  const critique = runs.critique[index]
                  const state = critique?.state ?? (item.state === 'failed' ? 'failed' : 'idle')
                  return h(Card, {
                    key: `${member.provider}/${member.model}`,
                    title: member.label,
                    provider: member.providerName,
                    state,
                    chars: critique?.chars ?? 0,
                    error: critique?.error ?? null,
                  }, (critique?.text ?? '') === ''
                    ? (state === 'running' ? h(Thinking) : h('span', { className: 'mad-hint' }, '—'))
                    : h(StreamingText, { text: critique.text, streaming: state === 'running' }))
                })))
            : null,

          rounds >= 3
            ? h('section', { className: 'mad-final' },
              h('div', { className: 'mad-finalHead' },
                h('span', { className: `mad-dotS ${runs.synthesis.state}` }),
                h('span', { className: 'mad-finalTitle' }, t('phaseSynthesis')),
                h('span', { className: 'mad-hint' }, t('phaseSynthesisHint')),
                h('span', { className: 'mad-spacer' }),
                h('span', { className: 'mad-hint' },
                  (() => {
                    const chairMember = runs.members[runs.synthesis.chairIndex]
                    return chairMember === undefined ? '' : `${t('chairLabel')}：${chairMember.label}`
                  })())),
              h('div', { className: 'mad-finalBody' },
                runs.synthesis.state === 'failed'
                  ? h('div', { className: 'mad-cardError' }, runs.synthesis.error ?? t('failed'))
                  : runs.synthesis.text === ''
                    ? (runs.synthesis.state === 'running' ? h(Thinking) : h('span', { className: 'mad-hint' }, '—'))
                    : h(StreamingText, { text: runs.synthesis.text, streaming: runs.synthesis.state === 'running' })))
            : null)))
  )
}