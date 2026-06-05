import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import ArticleCard from '../components/ArticleCard'
import LoadingSpinner from '../components/LoadingSpinner'
import SectionHeader from '../components/SectionHeader'

const MOCK_SEARCH = [
  {
    source: { name: 'The Verge' },
    author: 'Tech Reporter',
    title: 'Search Result: Latest Technology Developments',
    description: 'This is a mock search result since no API key is configured.',
    url: 'https://theverge.com',
    urlToImage: 'https://picsum.photos/seed/search1/800/450',
    publishedAt: new Date().toISOString(),
  },
]

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [inputVal, setInputVal] = useState(searchParams.get('q') || '')
  const [articles, setArticles]  = useState([])
  const [loading, setLoading]    = useState(false)
  const [searched, setSearched]  = useState(false)

  const query = searchParams.get('q') || ''

  useEffect(() => {
    if (!query) return
    setLoading(true)
    setSearched(true)

    axios
      .get('/api/news', {
        params: { q: query },
      })
      .then((res) => setArticles(res.data.articles.filter(a => a.title !== '[Removed]')))
      .catch(() => setArticles(MOCK_SEARCH))
      .finally(() => setLoading(false))
  }, [query])

  const handleSearch = (e) => {
    e.preventDefault()
    if (inputVal.trim()) setSearchParams({ q: inputVal.trim() })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="font-display font-black text-3xl text-ink-50 mb-6">Search</h1>

      <form onSubmit={handleSearch} className="flex gap-3 mb-8">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Search for news, topics, people..."
          className="flex-1 bg-ink-800 border border-ink-600 text-ink-100 rounded px-4 py-3 text-sm placeholder:text-ink-500 focus:outline-none focus:border-ink-400 transition-colors"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-accent-red text-white text-sm font-semibold rounded hover:bg-red-600 transition-colors"
        >
          Search
        </button>
      </form>

      {loading && <LoadingSpinner message={`Searching for "${query}"...`} />}

      {!loading && searched && (
        <>
          <SectionHeader
            title={`Results for "${query}"`}
            subtitle={`${articles.length} articles`}
          />
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {articles.map((a, i) => <ArticleCard key={i} article={a} />)}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-ink-500 text-lg">No results found for "{query}".</p>
              <p className="text-ink-600 text-sm mt-2">Try different keywords.</p>
            </div>
          )}
        </>
      )}

      {!searched && (
        <div className="text-center py-20">
          <p className="text-ink-600 text-5xl mb-4">🔍</p>
          <p className="text-ink-400 text-lg">Enter a keyword to search for news.</p>
        </div>
      )}
    </div>
  )
}