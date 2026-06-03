import { useNavigate } from 'react-router-dom'
import { useBookmarks } from '../context/BookmarkContext'
import { timeAgo, truncate } from '../utils/helpers'

// Reusable component: ArticleCard - dipakai di Home, Category, Search
export default function ArticleCard({ article, variant = 'default' }) {
  const { toggleBookmark, isBookmarked } = useBookmarks()
  const navigate = useNavigate()
  const saved = isBookmarked(article.url)

  // Event handler: onClick untuk navigasi ke detail
  const handleClick = () => {
    navigate('/article', { state: { article } })
  }

  // Event handler: onClick untuk toggle bookmark
  const handleBookmark = (e) => {
    e.stopPropagation()
    toggleBookmark(article)
  }

  if (variant === 'hero') {
    return (
      <article
        onClick={handleClick}
        className="group cursor-pointer relative rounded-lg overflow-hidden bg-ink-900 border border-ink-700 hover:border-ink-500 transition-all duration-300 animate-slide-up"
      >
        {article.urlToImage && (
          <div className="relative h-64 sm:h-80 overflow-hidden">
            <img
              src={article.urlToImage}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => { e.target.style.display = 'none' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
            <div className="absolute top-3 left-3 flex gap-2">
              <span className="bg-accent-red text-white text-[10px] font-semibold uppercase tracking-widest px-2 py-1 rounded">
                Breaking
              </span>
            </div>
            <button
              onClick={handleBookmark}
              className="absolute top-3 right-3 p-1.5 rounded bg-ink-900/70 hover:bg-ink-800 transition-colors"
            >
              <BookmarkIcon filled={saved} />
            </button>
          </div>
        )}
        <div className="p-5">
          <p className="text-xs text-ink-400 uppercase tracking-widest mb-2 font-sans">
            {article.source?.name} · {timeAgo(article.publishedAt)}
          </p>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-ink-50 leading-tight line-clamp-2 group-hover:text-accent-red transition-colors">
            {article.title}
          </h2>
          {article.description && (
            <p className="text-ink-400 text-sm mt-2 line-clamp-2">{article.description}</p>
          )}
        </div>
      </article>
    )
  }

  if (variant === 'horizontal') {
    return (
      <article
        onClick={handleClick}
        className="group cursor-pointer flex gap-3 py-3 border-b border-ink-800 last:border-0 hover:opacity-80 transition-opacity animate-fade-in"
      >
        {article.urlToImage && (
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-16 h-16 rounded object-cover shrink-0"
            onError={(e) => { e.target.style.display = 'none' }}
          />
        )}
        <div className="flex-1 min-w-0">
          <p className="text-[10px] text-accent-red uppercase tracking-widest mb-1">
            {article.source?.name}
          </p>
          <h3 className="text-sm font-medium text-ink-100 line-clamp-2 leading-snug group-hover:text-accent-red transition-colors">
            {article.title}
          </h3>
          <p className="text-xs text-ink-500 mt-1">{timeAgo(article.publishedAt)}</p>
        </div>
        <button onClick={handleBookmark} className="shrink-0 self-start mt-1">
          <BookmarkIcon filled={saved} small />
        </button>
      </article>
    )
  }

  // Default card variant
  return (
    <article
      onClick={handleClick}
      className="group cursor-pointer bg-ink-900 border border-ink-700 hover:border-ink-500 rounded-lg overflow-hidden transition-all duration-300 animate-slide-up flex flex-col"
    >
      {article.urlToImage && (
        <div className="relative h-44 overflow-hidden">
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => { e.target.style.display = 'none' }}
          />
          <button
            onClick={handleBookmark}
            className="absolute top-2 right-2 p-1.5 rounded bg-ink-900/70 hover:bg-ink-800 transition-colors"
          >
            <BookmarkIcon filled={saved} />
          </button>
        </div>
      )}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-[10px] text-ink-500 uppercase tracking-widest mb-2 font-sans">
          {article.source?.name} · {timeAgo(article.publishedAt)}
        </p>
        <h3 className="font-display font-bold text-ink-50 leading-snug line-clamp-2 group-hover:text-accent-red transition-colors mb-2">
          {article.title}
        </h3>
        {article.description && (
          <p className="text-ink-400 text-xs line-clamp-2 flex-1">{article.description}</p>
        )}
        <div className="mt-3 pt-3 border-t border-ink-800 flex items-center justify-between">
          <span className="text-xs text-ink-500">{article.author ? truncate(article.author, 30) : 'Unknown'}</span>
          <span className="text-xs text-ink-600">Read →</span>
        </div>
      </div>
    </article>
  )
}

function BookmarkIcon({ filled, small }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={small ? 'w-4 h-4' : 'w-5 h-5'}
      fill={filled ? '#e8503a' : 'none'}
      viewBox="0 0 24 24"
      stroke={filled ? '#e8503a' : '#888888'}
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
    </svg>
  )
}
