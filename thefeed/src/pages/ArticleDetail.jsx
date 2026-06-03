import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useBookmarks } from '../context/BookmarkContext'
import { timeAgo } from '../utils/helpers'

export default function ArticleDetail() {
  const { state }   = useLocation()
  const navigate    = useNavigate()
  const { toggleBookmark, isBookmarked } = useBookmarks()

  const article = state?.article

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-ink-500 text-lg mb-4">Article not found.</p>
        <button
          onClick={() => navigate('/')}
          className="text-accent-red hover:underline text-sm"
        >
          ← Back to Home
        </button>
      </div>
    )
  }

  const saved = isBookmarked(article.url)

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-ink-400 hover:text-ink-100 text-sm mb-6 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      {/* Source & date */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xs bg-ink-800 text-ink-300 px-2 py-1 rounded uppercase tracking-widest">
          {article.source?.name}
        </span>
        <span className="text-xs text-ink-500">{timeAgo(article.publishedAt)}</span>
      </div>

      {/* Title */}
      <h1 className="font-display font-black text-2xl sm:text-4xl text-ink-50 leading-tight mb-4">
        {article.title}
      </h1>

      {/* Author & actions */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-ink-800">
        <p className="text-sm text-ink-400">
          {article.author ? `By ${article.author}` : 'Unknown author'}
        </p>
        <button
          onClick={() => toggleBookmark(article)}
          className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded border transition-colors ${
            saved
              ? 'border-accent-red text-accent-red'
              : 'border-ink-600 text-ink-400 hover:border-ink-400'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill={saved ? '#e8503a' : 'none'}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
          {saved ? 'Saved' : 'Save'}
        </button>
      </div>

      {/* Hero image */}
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full rounded-lg object-cover max-h-96 mb-6"
          onError={(e) => { e.target.style.display = 'none' }}
        />
      )}

      {/* Description */}
      {article.description && (
        <p className="text-ink-200 text-lg leading-relaxed mb-6 font-serif italic border-l-2 border-accent-red pl-4">
          {article.description}
        </p>
      )}

      {/* Content preview */}
      {article.content && (
        <div className="text-ink-300 leading-relaxed text-base mb-8">
          {article.content.replace(/\[\+\d+ chars\]/, '').trim()}
          <span className="text-ink-600"> [...]</span>
        </div>
      )}

      {/* CTA to full article */}
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-accent-red text-white px-6 py-3 rounded font-semibold text-sm hover:bg-red-600 transition-colors"
      >
        Read Full Article
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>
  )
}
