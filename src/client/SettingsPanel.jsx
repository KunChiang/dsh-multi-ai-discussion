import React from 'react'
import { NS } from './i18n.js'
import {
  getCatalog, getSettings, loadCatalog, modelKey,
  subscribeCatalog, subscribeSettings, updateSettings,
} from './store.js'

const h = React.createElement

function useStoreValue(subscribe, read) {
  return React.useSyncExternalStore(subscribe, read, read)
}

const ROUNDS = [1, 2, 3]

/**
 * 侧栏「多 AI 讨论」= 设置页。
 * 这里只配置参与模型、轮次与汇总者；讨论本身在对话区进行。
 */
export function SettingsPanel({ ctx }) {
  const t = ctx.locale.bind(NS)
  const catalog = useStoreValue(subscribeCatalog, getCatalog)
  const settings = useStoreValue(subscribeSettings, getSettings)
  const [, bumpLocale] = React.useState(0)

  React.useEffect(() => {
    loadCatalog(false)
  }, [])

  React.useEffect(() => ctx.locale.subscribe(() => bumpLocale((value) => value + 1)), [ctx])

  const goBack = React.useCallback(() => {
    try {
      ctx.get('layout')?.selectPanel(null)
    } catch (error) {
      console.warn('[multi-ai-discussion] 无法返回会话', error)
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

  const providers = catalog.data?.providers ?? []
  const chosenKeys = new Set(settings.models.map((item) => modelKey(item.provider, item.model)))

  const toggleModel = (provider, model) => {
    const id = modelKey(provider, model)
    const current = settings.models
    if (chosenKeys.has(id)) {
      if (current.length <= 1) return
      const next = current.filter((item) => modelKey(item.provider, item.model) !== id)
      const keepChair = next.some((item) => modelKey(item.provider, item.model) === settings.chair)
      updateSettings({ models: next, chair: keepChair ? settings.chair : null })
      return
    }
    if (current.length >= settings.maxMembers) return
    updateSettings({ models: [...current, { provider, model }] })
  }

  return h('div', { className: 'mad-root' },
    h('header', { className: 'mad-header' },
      h('div', { className: 'mad-mark' }, h('svg', { width: 19, height: 19, viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': 'true' },
        h('circle', { cx: 7.2, cy: 8.6, r: 2.7, stroke: 'currentColor', strokeWidth: 1.6 }),
        h('circle', { cx: 16.8, cy: 8.6, r: 2.7, stroke: 'currentColor', strokeWidth: 1.6 }),
        h('path', { d: 'M3.4 18.6c.7-2.9 3-4.6 5.7-4.6s5 1.7 5.7 4.6', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' }))),
      h('div', { className: 'mad-headCopy' },
        h('h1', { className: 'mad-title' }, t('title'), h('small', null, t('settingsTag'))),
        h('p', { className: 'mad-sub' }, t('settingsSubtitle'))),
      h('span', { className: 'mad-spacer' }),
      h('button', { type: 'button', className: 'mad-btn ghost', onClick: goBack, title: t('backHint') }, `← ${t('back')}`)),

    h('div', { className: 'mad-scroll' },
      h('div', { className: 'mad-setup' },
        h('div', { className: 'mad-field' },
          h('div', { className: 'mad-labelRow' },
            h('span', { className: 'mad-label' }, t('modelsLabel')),
            h('span', { className: 'mad-hint' }, t('modelsHint')),
            h('span', { className: 'mad-count' }, `${settings.models.length} / ${settings.maxMembers}`)),
          catalog.status === 'error'
            ? h('div', { className: 'mad-error' },
              h('span', { style: { flex: '1 1 auto' } }, `${t('modelsFailed')}：${catalog.error}`),
              h('button', { type: 'button', className: 'mad-btn tiny', onClick: () => loadCatalog(true) }, t('modelsRetry')))
            : catalog.status === 'loading' && providers.length === 0
              ? h('div', { className: 'mad-hint' }, t('modelsLoading'))
              : providers.length === 0
                ? h('div', { className: 'mad-emptyNote' }, t('modelsEmpty'))
                : h('div', { className: 'mad-models' },
                  providers.map((provider) => h('div', { key: provider.id, className: 'mad-group' },
                    h('div', { className: 'mad-groupName' }, provider.name),
                    h('div', { className: 'mad-chips' },
                      provider.models.map((model) => {
                        const on = chosenKeys.has(modelKey(provider.id, model.id))
                        return h('label', {
                          key: model.id,
                          className: `mad-chip${on ? ' on' : ''}`,
                          title: `${provider.name} / ${model.name}`,
                        },
                          h('input', { type: 'checkbox', checked: on, onChange: () => toggleModel(provider.id, model.id) }),
                          h('span', { className: 'mad-dot' }),
                          h('span', { className: 'mad-chipName' }, model.name))
                      }))))) ,
        ),

        h('div', { className: 'mad-controls' },
          h('div', { className: 'mad-field' },
            h('div', { className: 'mad-labelRow' }, h('span', { className: 'mad-label' }, t('roundsLabel'))),
            h('div', { className: 'mad-seg' },
              ROUNDS.map((value) => h('button', {
                key: value,
                type: 'button',
                'aria-pressed': settings.rounds === value,
                onClick: () => updateSettings({ rounds: value }),
              }, t(`rounds${value}`)))),
            h('div', { className: 'mad-hint' }, t(`roundsHint${settings.rounds}`))),

          settings.rounds >= 3
            ? h('div', { className: 'mad-field' },
              h('div', { className: 'mad-labelRow' },
                h('span', { className: 'mad-label' }, t('chairLabel')),
                h('span', { className: 'mad-hint' }, t('chairHint'))),
              settings.models.length === 0
                ? h('div', { className: 'mad-hint' }, t('noSelection'))
                : h('select', {
                  className: 'mad-select',
                  value: settings.chair ?? '',
                  onChange: (event) => updateSettings({ chair: event.target.value === '' ? null : event.target.value }),
                },
                  h('option', { value: '' }, t('chairAuto')),
                  settings.models.map((item) => h('option', {
                    key: modelKey(item.provider, item.model),
                    value: modelKey(item.provider, item.model),
                  }, `${item.model} · ${item.provider}`))))
            : null)),

      h('div', { className: 'mad-howTo' },
        h('div', { className: 'mad-howToTitle' }, t('howToTitle')),
        h('ol', { className: 'mad-howToList' },
          h('li', null, t('howTo1')),
          h('li', null, t('howTo2')),
          h('li', null, t('howTo3')))))
  )
}