import React from 'react'
import { Markdown } from './Markdown.jsx'
import { NS } from './i18n.js'
import { clearDiscussion, getRun, startDiscussion, stopDiscussion, subscribeRuns } from './store.js'

const h = React.createElement

function useRun(sessionId) {
  return React.useSyncExternalStore(
    subscribeRuns,
    () => getRun(sessionId),
    () => null,
  )
}

function Thinking() {
  return h('span', { className: 'mad-thinking' }, '···', h('i'), h('i'), h('i'))
}

function Caret({ on }) {
  return on ? h('span', { className: 'mad-caret' }) : null
}

function MemberCard({ member, entry, streaming }) {
  const state = entry?.state ?? 'idle'
  const text = entry?.text ?? ''
  return h('article', { className: `mad-discCard ${state}` },
    h('header', { className: 'mad-discCardHead' },
      h('span', { className: `mad-dotS ${state}` }),
      h('span', { className: 'mad-discCardName' }, member.label),
      h('span', { className: 'mad-discCardProvider' }, member.providerName),
      h('span', { className: 'mad-discCardMeta' }, state === 'running' ? '' : entry?.chars > 0 ? `${entry.chars}` : '')),
    h('div', { className: 'mad-discCardBody' },
      entry?.error
        ? h('div', { className: 'mad-discCardError' }, entry.error)
        : text === ''
          ? (state === 'running' ? h(Thinking) : h('span', { className: 'mad-hint' }, '—'))
          : h(React.Fragment, null,
            h(Markdown, { text }),
            h(Caret, { on: streaming && state === 'running' }))))
}

/**
 * 对话界面里的讨论面板（输入框正上方，整宽）。
 * 讨论开始后每个成员一栏，实时流式输出；不占输入框，也不要求切换视图。
 */
export function DiscussionDock({ ctx, sessionId }) {
  const t = ctx.locale.bind(NS)
  const run = useRun(sessionId)
  const [collapsed, setCollapsed] = React.useState(false)
  const scroller = React.useRef(null)

  // 新一轮开始时自动展开。
  React.useEffect(() => {
    if (run !== null && run.status === 'running') setCollapsed(false)
  }, [run?.startedAt])

  React.useEffect(() => {
    if (run === null || run.status !== 'running' || collapsed || scroller.current === null) return
    const element = scroller.current
    if (element.scrollHeight - element.scrollTop - element.clientHeight < 160) element.scrollTop = element.scrollHeight
  }, [run, collapsed])

  if (run === null) return null

  const rounds = run.rounds ?? 3
  const running = run.status === 'running'

  return h('div', { className: `mad-inline${collapsed ? ' collapsed' : ''}` },
    h('header', { className: 'mad-inlineHead' },
      h('span', { className: `mad-dotS ${running ? 'running' : run.status === 'error' ? 'failed' : 'done'}` }),
      h('span', { className: 'mad-inlineTitle' }, t('title')),
      h('span', { className: 'mad-inlineTopic' }, run.topic),
      h('span', { className: 'mad-spacer' }),
      h('span', { className: 'mad-inlineMeta' },
        `${run.members.length} ${t('expert')} · ${Math.max(0, Math.round((run.elapsed ?? 0) / 1000))}s`),
      running
        ? h('button', { type: 'button', className: 'mad-btn tiny danger', onClick: () => stopDiscussion(sessionId) }, `■ ${t('stop')}`)
        : h('button', {
          type: 'button',
          className: 'mad-btn tiny ghost',
          onClick: () => {
            clearDiscussion(sessionId)
            startDiscussion(sessionId, run.topic)
          },
        }, `↻ ${t('restart')}`),
      h('button', {
        type: 'button',
        className: 'mad-btn tiny ghost',
        onClick: () => setCollapsed((value) => !value),
        'aria-expanded': !collapsed,
      }, collapsed ? '▸' : '▾'),
      h('button', {
        type: 'button',
        className: 'mad-btn tiny ghost',
        onClick: () => clearDiscussion(sessionId),
        title: t('dock.close'),
      }, '✕')),

    collapsed
      ? null
      : h('div', { className: 'mad-inlineScroll', ref: scroller },
        h('div', { className: 'mad-inlinePhase' },
          h('span', { className: 'mad-inlinePhaseLabel' }, t('phaseAnswer')),
          h('div', { className: 'mad-discGrid' },
            run.members.map((member, index) => h(MemberCard, {
              key: `${member.provider}/${member.model}`,
              member,
              entry: run.answers[index],
              streaming: running,
            })))),

        rounds >= 2
          ? h('div', { className: 'mad-inlinePhase' },
            h('span', { className: 'mad-inlinePhaseLabel' }, t('phaseCritique')),
            h('div', { className: 'mad-discGrid' },
              run.members.map((member, index) => h(MemberCard, {
                key: `${member.provider}/${member.model}`,
                member,
                entry: run.critiques[index] ?? { state: run.answers[index]?.state === 'failed' ? 'failed' : 'idle', text: '', chars: 0 },
                streaming: running,
              }))))
          : null,

        rounds >= 3
          ? h('div', { className: 'mad-inlinePhase' },
            h('span', { className: 'mad-inlinePhaseLabel' }, t('phaseSynthesis')),
            h('div', { className: 'mad-inlineFinal' },
              run.synthesis.error
                ? h('div', { className: 'mad-discCardError' }, run.synthesis.error)
                : run.synthesis.text === ''
                  ? (run.synthesis.state === 'running' ? h(Thinking) : h('span', { className: 'mad-hint' }, '—'))
                  : h(React.Fragment, null,
                    h(Markdown, { text: run.synthesis.text }),
                    h(Caret, { on: running && run.synthesis.state === 'running' }))))
          : null,

        run.error !== null
          ? h('div', { className: 'mad-error' }, `${t('errorPrefix')}${run.error}`)
          : null))
}