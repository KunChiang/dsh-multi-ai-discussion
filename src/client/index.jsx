import React from 'react'
import { ComposerBar } from './ComposerBar.jsx'
import { DiscussionDock } from './DiscussionDock.jsx'
import { SettingsPanel } from './SettingsPanel.jsx'
import { STYLES } from './styles.js'
import { NS, zh, en } from './i18n.js'

const PLUGIN_ID = 'dsh-multi-ai-discussion'
const PANEL_ID = 'multi-ai-discussion'
const STYLE_ID = `${PLUGIN_ID}/styles`

let stylesInstalled = false

/** 注入样式；HMR 会按 data-plugin 清理旧标签，所以每次 materialize 都重试。 */
function installStyles() {
  if (stylesInstalled || typeof document === 'undefined') return
  const existing = document.querySelector(`style[data-plugin-css="${STYLE_ID}"]`)
  if (existing !== null) {
    stylesInstalled = true
    return
  }
  const tag = document.createElement('style')
  tag.dataset.plugin = PLUGIN_ID
  tag.dataset.pluginCss = STYLE_ID
  tag.textContent = STYLES
  document.head.appendChild(tag)
  stylesInstalled = true
}

export function PanelIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="7.2" cy="8.6" r="2.7" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16.8" cy="8.6" r="2.7" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3.4 18.6c.7-2.9 3-4.6 5.7-4.6s5 1.7 5.7 4.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M15.2 14.4c2.2.2 4 1.8 4.6 4.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity=".55" />
    </svg>
  )
}

export const name = 'multi-ai-discussion'
export const inject = ['slots', 'locale']

export function apply(ctx) {
  installStyles()

  ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'multi-ai-discussion: dictionaries')

  // 侧栏入口：打开的是设置页，不是讨论执行面。
  ctx.slots.inject('main', () => ctx.slots.register({
    name: 'main',
    key: PANEL_ID,
    locale: NS,
  }, (props) => <SettingsPanel ctx={ctx} sessionId={props?.sessionId} />))

  ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({
    name: 'sidebar.panellist',
    id: PANEL_ID,
    order: 68,
    label: () => ctx.locale.bind(NS)('nav'),
    locale: NS,
  }, (props) => <PanelIcon size={props.size ?? 18} active={props.active === true} />))

  // 输入框下方的控制条：选模型、开跑。
  ctx.slots.inject('conversation.composer.dock', () => ctx.slots.register({
    name: 'conversation.composer.dock',
    id: PANEL_ID,
    order: 30,
    label: () => ctx.locale.bind(NS)('dock.title'),
    locale: NS,
  }, (props) => <ComposerBar ctx={ctx} sessionId={props.sessionId} useInput={props.useInput} inputActions={props.inputActions} />))

  // 对话界面里（输入框正上方）的分栏讨论面板：开始后直接在这里流式输出。
  ctx.slots.inject('conversation.input.dock', () => ctx.slots.register({
    name: 'conversation.input.dock',
    id: PLUGIN_ID,
    order: 40,
    label: () => ctx.locale.bind(NS)('nav'),
    locale: NS,
  }, (props) => <DiscussionDock ctx={ctx} sessionId={props.sessionId} />))
}