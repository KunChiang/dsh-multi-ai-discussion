import React from 'react'
import { NS } from './i18n.js'
import {
  getCatalog, getRun, getSettings, loadCatalog, modelKey,
  startDiscussion, stopDiscussion, subscribeCatalog, subscribeRuns, subscribeSettings,
  updateSettings,
} from './store.js'

const h = React.createElement

function useStoreValue(subscribe, read) {
  return React.useSyncExternalStore(subscribe, read, read)
}

function Chip({ on, disabled, onClick, children, title }) {
  return h('button', {
    type: 'button',
    className: `mad-dockChip${on ? ' on' : ''}`,
    disabled,
    onClick,
    title,
  }, children)
}

/**
 * 输入框下方的「多 AI 讨论」控制条：
 * 选模型 → 直接用输入框里的话题开始讨论。讨论结果显示在对话区的面板里。
 */
export function ComposerBar(props) {
  const { ctx, sessionId, useInput, inputActions } = props
  const t = ctx.locale.bind(NS)
  const catalog = useStoreValue(subscribeCatalog, getCatalog)
  const settings = useStoreValue(subscribeSettings, getSettings)
  const run = useStoreValue(subscribeRuns, () => getRun(sessionId))
  const draft = useInput((state) => state.draft)
  const [open, setOpen] = React.useState(false)
  const [hint, setHint] = React.useState(null)
  const rowRef = React.useRef(null)

  React.useEffect(() => {
    loadCatalog(false)
  }, [])

  React.useEffect(() => {
    if (!open) return undefined
    const onPointerDown = (event) => {
      if (rowRef.current !== null && !rowRef.current.contains(event.target)) setOpen(false)
    }
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  React.useEffect(() => {
    if (hint === null) return undefined
    const timer = setTimeout(() => setHint(null), 3200)
    return () => clearTimeout(timer)
  }, [hint])

  const providers = catalog.data?.providers ?? []
  const chosenKeys = new Set(settings.models.map((item) => modelKey(item.provider, item.model)))
  const running = run !== null && run.status === 'running'
  const topic = draft.trim()

  const toggleModel = (provider, model) => {
    const id = modelKey(provider, model)
    const current = settings.models
    const exists = current.some((item) => modelKey(item.provider, item.model) === id)
    let next
    if (exists) {
      if (current.length <= 1) return
      next = current.filter((item) => modelKey(item.provider, item.model) !== id)
    } else {
      if (current.length >= settings.maxMembers) {
        setHint(t('dock.full', { max: settings.maxMembers }))
        return
      }
      next = [...current, { provider, model }]
    }
    const keepChair = next.some((item) => modelKey(item.provider, item.model) === settings.chair)
    updateSettings({ models: next, chair: keepChair ? settings.chair : null })
  }

  const begin = async () => {
    if (running) return
    if (topic === '') {
      setHint(t('dock.needTopic'))
      return
    }
    if (settings.models.length < 2) {
      setHint(t('dock.needTwo'))
      return
    }
    inputActions.setDraft('')
    const result = await startDiscussion(sessionId, topic)
    if (result.ok !== true) {
      if (result.reason === 'needTwo') setHint(t('dock.needTwo'))
      else if (result.reason === 'empty') setHint(t('dock.needTopic'))
    }
  }

  return h('div', { className: 'mad-dock', ref: rowRef },
    h('div', { className: 'mad-dockRow' },
      h('button', {
        type: 'button',
        className: `mad-dockToggle${running ? ' running' : ''}`,
        onClick: () => setOpen((value) => !value),
        title: t('dock.title'),
        'aria-expanded': open,
      },
        h('span', { className: 'mad-dockDot' }),
        h('span', null, t('nav')),
        h('span', { className: 'mad-dockCount' }, `${settings.models.length}`),
        h('span', { className: 'mad-dockCaret' }, open ? '▾' : '▸')),

      running
        ? h('button', { type: 'button', className: 'mad-dockAction stop', onClick: () => stopDiscussion(sessionId) }, `■ ${t('stop')}`)
        : h('button', {
          type: 'button',
          className: 'mad-dockAction',
          onClick: begin,
          disabled: topic === '',
          title: topic === '' ? t('dock.needTopic') : t('dock.startHint'),
        }, `${t('dock.start')} →`),

      hint !== null ? h('span', { className: 'mad-dockHint' }, hint) : null),

    open
      ? h('div', { className: 'mad-dockPanel' },
        h('div', { className: 'mad-dockPanelHead' },
          h('span', { className: 'mad-hint' }, t('modelsHint')),
          h('button', { type: 'button', className: 'mad-btn tiny ghost', onClick: () => loadCatalog(true) }, t('modelsRetry'))),
        catalog.status === 'error'
          ? h('div', { className: 'mad-error' }, `${t('modelsFailed')}：${catalog.error}`)
          : catalog.status === 'loading' && providers.length === 0
            ? h('div', { className: 'mad-hint' }, t('modelsLoading'))
            : providers.length === 0
              ? h('div', { className: 'mad-emptyNote' }, t('modelsEmpty'))
              : h('div', { className: 'mad-dockGroups' },
                providers.map((provider) => h('div', { key: provider.id, className: 'mad-group' },
                  h('div', { className: 'mad-groupName' }, provider.name),
                  h('div', { className: 'mad-chips' },
                    provider.models.map((model) => h('label', {
                      key: model.id,
                      className: `mad-chip${chosenKeys.has(modelKey(provider.id, model.id)) ? ' on' : ''}`,
                      title: `${provider.name} / ${model.name}`,
                    },
                      h('input', {
                        type: 'checkbox',
                        checked: chosenKeys.has(modelKey(provider.id, model.id)),
                        onChange: () => toggleModel(provider.id, model.id),
                        disabled: running,
                      }),
                      h('span', { className: 'mad-dot' }),
                      h('span', { className: 'mad-chipName' }, model.name)))))),
        h('div', { className: 'mad-dockPanelFoot' },
          h('span', { className: 'mad-hint' }, t('roundsLabel')),
          h('div', { className: 'mad-seg small' },
            [1, 2, 3].map((value) => h('button', {
              key: value,
              type: 'button',
              'aria-pressed': settings.rounds === value,
              disabled: running,
              onClick: () => updateSettings({ rounds: value }),
            }, t(`rounds${value}`)))),
          h('span', { className: 'mad-spacer' }),
          h('span', { className: 'mad-hint' }, t('dock.settingsHint')))))
      : null)
}
