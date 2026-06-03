import { useParams } from 'react-router-dom'
import useNews from '../hooks/useNews'
import ArticleCard from '../components/ArticleCard'
import LoadingSpinner from '../components/LoadingSpinner'
import SectionHeader from '../components/SectionHeader'
import { CATEGORIES } from '../utils/helpers'

export default function CategoryPage() {
  const { category } = useParams()
  const { articles, loading } = useNews({
    endpoint: 'top-headlines',
    params: { category, country: 'us' },
  })

  const catInfo = CATEGORIES.find(c => c.value === category)

  if (loading) return <LoadingSpinner message={`Loading ${catInfo?.label || category} news...`} />

  const [hero, ...rest] = articles

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <p className="text-xs text-ink-500 uppercase tracking-widest mb-1">Category</p>
        <h1 className="font-display font-black text-4xl text-ink-50">
          {catInfo?.label || category}
        </h1>
      </div>

      {hero && (
        <div className="mb-8">
          <ArticleCard article={hero} variant="hero" />
        </div>
      )}

      <SectionHeader title="All Stories" subtitle={`${articles.length} articles`} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {rest.map((a, i) => (
          <ArticleCard key={i} article={a} />
        ))}
      </div>

      {articles.length === 0 && (
        <div className="text-center py-20">
          <p className="text-ink-500 text-lg">No articles found for this category.</p>
        </div>
      )}
    </div>
  )
}
