import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

const MOCK_ARTICLES = [
  {
    source: { id: 'bbc-news', name: 'BBC News' },
    author: 'BBC Newsroom',
    title: 'Global Tech Giants Face New Antitrust Scrutiny in 2026',
    description: 'Regulators across Europe and the US are intensifying investigations into major technology companies over concerns about market dominance and data practices.',
    url: 'https://bbc.com',
    urlToImage: 'https://picsum.photos/seed/tech1/800/450',
    publishedAt: new Date(Date.now() - 2 * 3600000).toISOString(),
    content: 'Full article content here...',
  },
]

export default function useNews({ endpoint = 'top-headlines', params = {} }) {
  const [articles, setArticles] = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)

  const fetchNews = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios.get('/api/news', { params })
      setArticles(response.data.articles.filter(a => a.title !== '[Removed]'))
    } catch (err) {
      setError(err.message)
      setArticles(MOCK_ARTICLES)
    } finally {
      setLoading(false)
    }
  }, [JSON.stringify(params)])

  useEffect(() => {
    fetchNews()
  }, [fetchNews])

  return { articles, loading, error, refetch: fetchNews }
}