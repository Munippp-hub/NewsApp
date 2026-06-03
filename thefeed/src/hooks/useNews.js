import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

const API_KEY  = import.meta.env.VITE_NEWS_API_KEY
const BASE_URL = import.meta.env.VITE_NEWS_BASE_URL || 'https://newsapi.org/v2'

// Fallback mock data supaya app tetap bisa dijalankan saat API key belum diset
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
  {
    source: { id: 'reuters', name: 'Reuters' },
    author: 'Jane Smith',
    title: 'Climate Summit 2026: World Leaders Pledge Net-Zero Targets',
    description: 'More than 150 countries committed to aggressive carbon reduction plans at the landmark climate conference held in Geneva this week.',
    url: 'https://reuters.com',
    urlToImage: 'https://picsum.photos/seed/climate/800/450',
    publishedAt: new Date(Date.now() - 4 * 3600000).toISOString(),
    content: 'Full article content here...',
  },
  {
    source: { id: 'nasa', name: 'NASA' },
    author: 'Dr. Alan Parker',
    title: 'Mars Rover Discovers Traces of Ancient Water Beneath the Surface',
    description: 'NASA\'s Perseverance rover has detected significant subsurface ice formations that suggest Mars once had liquid water oceans billions of years ago.',
    url: 'https://nasa.gov',
    urlToImage: 'https://picsum.photos/seed/mars/800/450',
    publishedAt: new Date(Date.now() - 6 * 3600000).toISOString(),
    content: 'Full article content here...',
  },
  {
    source: { id: 'financial-times', name: 'Financial Times' },
    author: 'Mike Chen',
    title: 'Stock Markets Rally to Record Highs Ahead of Federal Reserve Meeting',
    description: 'Investor optimism surged as inflation data came in lower than expected, raising hopes for interest rate cuts in the second half of 2026.',
    url: 'https://ft.com',
    urlToImage: 'https://picsum.photos/seed/stocks/800/450',
    publishedAt: new Date(Date.now() - 30 * 60000).toISOString(),
    content: 'Full article content here...',
  },
  {
    source: { id: 'espn', name: 'ESPN' },
    author: 'Sports Desk',
    title: 'Champions League Final Preview: Real Madrid vs Manchester City',
    description: 'Two football giants clash in what promises to be an epic finale at the Wembley Stadium this Saturday evening.',
    url: 'https://espn.com',
    urlToImage: 'https://picsum.photos/seed/soccer/800/450',
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    content: 'Full article content here...',
  },
  {
    source: { id: 'spacex', name: 'SpaceX' },
    author: 'SpaceX Team',
    title: 'SpaceX Successfully Launches 80-Satellite Starlink Batch',
    description: 'The latest Starlink mission brings the total constellation to over 8,000 satellites, expanding broadband coverage to remote regions globally.',
    url: 'https://spacex.com',
    urlToImage: 'https://picsum.photos/seed/spacex/800/450',
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
    content: 'Full article content here...',
  },
  {
    source: { id: 'who', name: 'WHO' },
    author: 'Health Desk',
    title: 'WHO Announces Breakthrough in Universal Flu Vaccine Development',
    description: 'Scientists have developed a vaccine candidate that could protect against all known strains of influenza, potentially ending seasonal flu shots.',
    url: 'https://who.int',
    urlToImage: 'https://picsum.photos/seed/health/800/450',
    publishedAt: new Date(Date.now() - 9 * 3600000).toISOString(),
    content: 'Full article content here...',
  },
  {
    source: { id: 'variety', name: 'Variety' },
    author: 'Entertainment Desk',
    title: 'Cannes 2026: Indonesian Film Wins Palme d\'Or in Historic Moment',
    description: 'A groundbreaking Indonesian production took home the top prize at this year\'s Cannes Film Festival, marking a historic first for Southeast Asian cinema.',
    url: 'https://variety.com',
    urlToImage: 'https://picsum.photos/seed/cannes/800/450',
    publishedAt: new Date(Date.now() - 5 * 3600000).toISOString(),
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

    // Jika API key belum diset, pakai mock data
    if (!API_KEY || API_KEY === 'your_newsapi_key_here') {
      setTimeout(() => {
        setArticles(MOCK_ARTICLES)
        setLoading(false)
      }, 800)
      return
    }

    try {
      const response = await axios.get(`${BASE_URL}/${endpoint}`, {
        params: {
          apiKey: API_KEY,
          pageSize: 20,
          language: 'en',
          ...params,
        },
      })
      setArticles(response.data.articles.filter(a => a.title !== '[Removed]'))
    } catch (err) {
      setError(err.message)
      // Fallback ke mock data kalau error
      setArticles(MOCK_ARTICLES)
    } finally {
      setLoading(false)
    }
  }, [endpoint, JSON.stringify(params)])

  useEffect(() => {
    fetchNews()
  }, [fetchNews])

  return { articles, loading, error, refetch: fetchNews }
}
