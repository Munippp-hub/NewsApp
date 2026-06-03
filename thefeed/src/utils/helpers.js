export function timeAgo(dateString) {
  const now  = new Date()
  const date = new Date(dateString)
  const diff = Math.floor((now - date) / 1000)

  if (diff < 60)           return `${diff}s ago`
  if (diff < 3600)         return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400)        return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

export function truncate(text, maxLen = 120) {
  if (!text) return ''
  return text.length > maxLen ? text.slice(0, maxLen) + '…' : text
}

export const CATEGORIES = [
  { label: 'Top',       value: 'general',       color: 'text-accent-red',  icon: '🔥' },
  { label: 'Tech',      value: 'technology',    color: 'text-accent-blue', icon: '💻' },
  { label: 'World',     value: 'world',         color: 'text-ink-200',     icon: '🌍' },
  { label: 'Business',  value: 'business',      color: 'text-ink-200',     icon: '📈' },
  { label: 'Science',   value: 'science',       color: 'text-ink-200',     icon: '🔬' },
  { label: 'Health',    value: 'health',        color: 'text-ink-200',     icon: '❤️' },
  { label: 'Sports',    value: 'sports',        color: 'text-ink-200',     icon: '⚽' },
  { label: 'Entertain', value: 'entertainment', color: 'text-ink-200',     icon: '🎬' },
]
