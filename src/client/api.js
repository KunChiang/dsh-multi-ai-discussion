/** 面板与 Host 之间的唯一通道：connection 的 /api/multi-ai-discussion 路由。 */

const BASE = 'api/multi-ai-discussion'

export async function fetchCatalog(force = false) {
  const response = await fetch(`${BASE}/models?refresh=${force ? '1' : '0'}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: '{}',
  })
  const data = await response.json().catch(() => null)
  if (!response.ok || data?.ok !== true) {
    throw new Error(data?.error?.message ?? `模型列表请求失败（HTTP ${response.status}）`)
  }
  return data
}

/**
 * 发起一次讨论，逐条消费 SSE 事件。
 * @param {{question: string, extra?: string, models: Array<{provider: string, model: string, label?: string}>, rounds: number, chairIndex: number}} payload
 * @param {{signal?: AbortSignal, onEvent: (event: object) => void}} options
 */
export async function runDiscussion(payload, { signal, onEvent }) {
  const response = await fetch(`${BASE}/discuss`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', accept: 'text/event-stream' },
    body: JSON.stringify(payload),
    signal,
  })

  if (!response.ok) {
    const data = await response.json().catch(() => null)
    throw new Error(data?.error?.message ?? `讨论请求失败（HTTP ${response.status}）`)
  }
  if (response.body === null) throw new Error('当前浏览器不支持流式响应。')

  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  let finished = false

  while (!finished) {
    const { done, value } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })
    let separator = buffer.indexOf('\n\n')
    while (separator >= 0) {
      const block = buffer.slice(0, separator)
      buffer = buffer.slice(separator + 2)
      for (const line of block.split('\n')) {
        if (!line.startsWith('data:')) continue
        const raw = line.slice(5).trim()
        if (raw === '' || raw === '[DONE]') continue
        let event
        try {
          event = JSON.parse(raw)
        } catch {
          continue
        }
        onEvent(event)
        if (event?.t === 'done') finished = true
      }
      separator = buffer.indexOf('\n\n')
    }
  }
  try {
    await reader.cancel()
  } catch {
    // 已经关闭的流无需处理
  }
}
