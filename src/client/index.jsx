import React from 'react'
import { MultiAiPanel, PanelIcon } from './Panel.jsx'
import { STYLES } from './styles.js'
import { NS, zh, en } from './i18n.js'

const PLUGIN_ID = 'dsh-multi-ai-discussion'
const PANEL_ID = 'multi-ai-discussion'
const STYLE_ID = `${PLUGIN_ID}/styles`

let stylesInstalled = false

/** 注入面板样式；HMR 会按 data-plugin 清理旧标签，所以每次 materialize 都重试。 */
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

let appCtx = null

function openPanel() {
  try {
    appCtx?.get('layout')?.selectPanel(PANEL_ID)
  } catch (error) {
    console.warn('[multi-ai-discussion] 无法打开面板', error)
  }
}

function ComposerButton({ t }) {
  return (
    <button
      type="button"
      className="mad-composerBtn"
      title={t('subtitle')}
      onClick={openPanel}
    >
      <PanelIcon size={13} />
      {t('nav')}
    </button>
  )
}

export const name = 'multi-ai-discussion'
export const inject = ['slots', 'locale']

export function apply(ctx) {
  appCtx = ctx
  installStyles()

  ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'multi-ai-discussion: dictionaries')

  // 主面板：侧栏按钮点击后由 key 派发到这里渲染。
  ctx.slots.inject('main', () => ctx.slots.register({
    name: 'main',
    key: PANEL_ID,
    locale: NS,
  }, (props) => <MultiAiPanel ctx={ctx} initialQuestion={props?.question} />))

  ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({
    name: 'sidebar.panellist',
    id: PANEL_ID,
    order: 68,
    label: () => ctx.locale.bind(NS)('nav'),
    locale: NS,
  }, (props) => <PanelIcon size={props.size ?? 18} active={props.active === true} />))

  // 输入框左侧的快捷入口：不用离开当前会话就能拉起讨论。
  ctx.slots.inject('conversation.input.left', () => ctx.slots.register({
    name: 'conversation.input.left',
    id: PANEL_ID,
    order: 44,
    label: () => ctx.locale.bind(NS)('nav'),
    locale: NS,
  }, ComposerButton))
}