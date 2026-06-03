import { Routes, Route } from 'react-router-dom'
import { BookmarkProvider } from './context/BookmarkContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import CategoryPage from './pages/CategoryPage'
import SearchPage from './pages/SearchPage'
import ArticleDetail from './pages/ArticleDetail'
import Bookmarks from './pages/Bookmarks'

export default function App() {
  return (
    <BookmarkProvider>
      <div className="min-h-screen bg-ink-950 text-ink-50 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/article" element={<ArticleDetail />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BookmarkProvider>
  )
}
