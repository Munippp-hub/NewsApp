import { useBookmarks } from '../context/BookmarkContext'
import ArticleCard from '../components/ArticleCard'
import SectionHeader from '../components/SectionHeader'

export default function Bookmarks() {
  const { bookmarks } = useBookmarks()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <p className="text-xs text-ink-500 uppercase tracking-widest mb-1">Your Collection</p>
        <h1 className="font-display font-black text-4xl text-ink-50">Saved Articles</h1>
      </div>

      {bookmarks.length === 0 ? (
        <div className="text-center py-20">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-ink-700 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
          <p className="text-ink-500 text-lg">No saved articles yet.</p>
          <p className="text-ink-600 text-sm mt-2">Click the bookmark icon on any article to save it here.</p>
        </div>
      ) : (
        <>
          <SectionHeader title="Saved" subtitle={`${bookmarks.length} article${bookmarks.length !== 1 ? 's' : ''}`} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookmarks.map((a, i) => (
              <ArticleCard key={i} article={a} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
