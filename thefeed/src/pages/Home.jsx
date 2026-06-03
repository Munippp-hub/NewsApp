import useNews from '../hooks/useNews'
import ArticleCard from '../components/ArticleCard'
import LoadingSpinner from '../components/LoadingSpinner'
import SectionHeader from '../components/SectionHeader'

export default function Home() {
  const { articles, loading } = useNews({ endpoint: 'top-headlines', params: { country: 'us' } })

  if (loading) return <LoadingSpinner message="Fetching latest headlines..." />

  const [hero, ...rest] = articles
  const featured = rest.slice(0, 4)
  const latest   = rest.slice(4, 8)
  const more     = rest.slice(8, 14)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

      {/* Ticker */}
      <div className="flex items-center gap-3 mb-8 overflow-hidden">
        <span className="shrink-0 bg-accent-red text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">Live</span>
        <div className="flex gap-6 overflow-x-auto scrollbar-none text-xs text-ink-400 whitespace-nowrap pb-1">
          {articles.slice(0, 6).map((a, i) => (
            <span key={i} className="hover:text-ink-100 cursor-default transition-colors">{a.title}</span>
          ))}
        </div>
      </div>

      {/* Hero + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        <div className="lg:col-span-2">
          {hero && <ArticleCard article={hero} variant="hero" />}
        </div>
        <aside>
          <SectionHeader title="Latest" />
          <div>
            {articles.slice(1, 7).map((a, i) => (
              <ArticleCard key={i} article={a} variant="horizontal" />
            ))}
          </div>
        </aside>
      </div>

      {/* Featured grid */}
      {featured.length > 0 && (
        <section className="mb-12">
          <SectionHeader title="Featured" subtitle="Top Stories" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featured.map((a, i) => (
              <ArticleCard key={i} article={a} />
            ))}
          </div>
        </section>
      )}

      {/* More stories */}
      {more.length > 0 && (
        <section>
          <SectionHeader title="More Stories" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {more.map((a, i) => (
              <ArticleCard key={i} article={a} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
