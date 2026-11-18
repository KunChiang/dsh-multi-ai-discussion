/**
 * 极简 Markdown 渲染：标题、列表、引用、代码块、粗体、行内代码、链接。
 * 不接 HTML 注入，全部由 React 元素构造。
 */
import React from 'react'

const h = React.createElement

const INLINE = /(`[^`\n]+`|\*\*[^*\n]+\*\*|\*[^*\n]+\*|\[[^\]\n]+\]\([^)\n]+\))/g

function inline(text, keyPrefix) {
  const nodes = []
  let last = 0
  let match
  let index = 0
  INLINE.lastIndex = 0
  while ((match = INLINE.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index))
    const token = match[0]
    const key = `${keyPrefix}-i${index++}`
    if (token.startsWith('`')) {
      nodes.push(h('code', { key, className: 'mad-code' }, token.slice(1, -1)))
    } else if (token.startsWith('**')) {
      nodes.push(h('strong', { key }, token.slice(2, -2)))
    } else if (token.startsWith('[')) {
      const split = token.indexOf('](')
      const label = token.slice(1, split)
      const href = token.slice(split + 2, -1)
      const safe = /^https?:\/\//i.test(href) ? href : undefined
      nodes.push(safe === undefined
        ? h('span', { key }, label)
        : h('a', { key, href: safe, target: '_blank', rel: 'noreferrer noopener' }, label))
    } else {
      nodes.push(h('em', { key }, token.slice(1, -1)))
    }
    last = match.index + token.length
  }
  if (last < text.length) nodes.push(text.slice(last))
  return nodes
}

function renderBlocks(text) {
  const lines = String(text).replace(/\r\n?/g, '\n').split('\n')
  const blocks = []
  let paragraph = []
  let key = 0

  const flush = () => {
    if (paragraph.length === 0) return
    const content = paragraph.join(' ')
    blocks.push(h('p', { key: `p${key++}` }, inline(content, `p${key}`)))
    paragraph = []
  }

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i]
    const trimmed = line.trim()

    if (trimmed === '') {
      flush()
      continue
    }

    if (trimmed.startsWith('```')) {
      flush()
      const language = trimmed.slice(3).trim()
      const body = []
      i += 1
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        body.push(lines[i])
        i += 1
      }
      blocks.push(h('pre', { key: `c${key++}`, className: 'mad-pre' },
        h('code', { className: 'mad-code' }, body.join('\n'))))
      if (language !== '') blocks[blocks.length - 1] = h('div', { key: `cw${key++}`, className: 'mad-codeWrap' },
        h('div', { className: 'mad-codeLang' }, language),
        blocks[blocks.length - 1])
      continue
    }

    const heading = /^(#{1,4})\s+(.*)$/.exec(trimmed)
    if (heading !== null) {
      flush()
      const level = heading[1].length
      blocks.push(h(`h${level + 2}`, { key: `h${key++}`, className: `mad-h mad-h${level}` }, inline(heading[2], `h${key}`)))
      continue
    }

    if (/^(-{3,}|\*{3,})$/.test(trimmed)) {
      flush()
      blocks.push(h('hr', { key: `hr${key++}`, className: 'mad-hr' }))
      continue
    }

    if (trimmed.startsWith('>')) {
      flush()
      const quote = [trimmed.replace(/^>\s?/, '')]
      while (i + 1 < lines.length && lines[i + 1].trim().startsWith('>')) {
        i += 1
        quote.push(lines[i].trim().replace(/^>\s?/, ''))
      }
      blocks.push(h('blockquote', { key: `q${key++}`, className: 'mad-quote' }, inline(quote.join(' '), `q${key}`)))
      continue
    }

    if (/^[-*+]\s+/.test(trimmed)) {
      flush()
      const items = []
      while (i < lines.length && /^[-*+]\s+/.test(lines[i].trim())) {
        items.push(h('li', { key: `li${key++}` }, inline(lines[i].trim().replace(/^[-*+]\s+/, ''), `li${key}`)))
        i += 1
      }
      i -= 1
      blocks.push(h('ul', { key: `ul${key++}`, className: 'mad-list' }, items))
      continue
    }

    if (/^\d+[.)]\s+/.test(trimmed)) {
      flush()
      const items = []
      while (i < lines.length && /^\d+[.)]\s+/.test(lines[i].trim())) {
        items.push(h('li', { key: `li${key++}` }, inline(lines[i].trim().replace(/^\d+[.)]\s+/, ''), `li${key}`)))
        i += 1
      }
      i -= 1
      blocks.push(h('ol', { key: `ol${key++}`, className: 'mad-list' }, items))
      continue
    }

    paragraph.push(trimmed)
  }
  flush()
  return blocks
}

export function Markdown({ text, className }) {
  const blocks = React.useMemo(() => renderBlocks(text), [text])
  return h('div', { className: className ?? 'mad-md' }, blocks)
}
