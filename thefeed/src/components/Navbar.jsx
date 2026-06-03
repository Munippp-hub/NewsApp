import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useBookmarks } from '../context/BookmarkContext'
import { CATEGORIES } from '../utils/helpers'

export default function Navbar() {
  const [query, setQuery]       = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const { bookmarks }           = useBookmarks()
  const navigate                = useNavigate()
  const location                = useLocation()

  // Event handler: onSubmit untuk search
  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
      setQuery('')
    }
  }

  const isActive = (path) => location.pathname === path

  return (
    <header className="sticky top-0 z-50 bg-ink-950/95 backdrop-blur border-b border-ink-700">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 h-14">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1 shrink-0">
          <span className="font-display font-black text-2xl tracking-tight text-ink-50">
            THE<span className="text-accent-red">FEED</span>
          </span>
        </Link>

        {/* Search bar - desktop */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center gap-2 bg-ink-800 border border-ink-600 rounded px-3 py-1.5 w-72 focus-within:border-ink-400 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-ink-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search news..."
            className="bg-transparent text-ink-100 text-sm placeholder:text-ink-500 outline-none flex-1"
          />
        </form>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <Link
            to="/bookmarks"
            className="relative flex items-center gap-1.5 text-sm text-ink-300 hover:text-ink-50 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <span className="hidden sm:inline">Saved</span>
            {bookmarks.length > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-accent-red text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {bookmarks.length > 9 ? '9+' : bookmarks.length}
              </span>
            )}
          </Link>

          {/* Hamburger - mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-ink-300 hover:text-ink-50"
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>
      </div>

      {/* Category nav */}
      <nav className="hidden md:flex items-center gap-0 px-6 border-t border-ink-800 overflow-x-auto">
        {CATEGORIES.map((cat) => {
          const active = location.pathname === `/category/${cat.value}` ||
                         (cat.value === 'general' && location.pathname === '/')
          return (
            <Link
              key={cat.value}
              to={cat.value === 'general' ? '/' : `/category/${cat.value}`}
              className={`px-4 py-2.5 text-xs uppercase tracking-widest font-medium whitespace-nowrap transition-colors border-b-2 ${
                active
                  ? 'border-accent-red text-accent-red'
                  : 'border-transparent text-ink-400 hover:text-ink-100'
              }`}
            >
              {cat.label}
            </Link>
          )
        })}
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-ink-900 border-t border-ink-700 px-4 py-4 flex flex-col gap-3 animate-fade-in">
          <form onSubmit={handleSearch} className="flex items-center gap-2 bg-ink-800 border border-ink-600 rounded px-3 py-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search news..."
              className="bg-transparent text-ink-100 text-sm placeholder:text-ink-500 outline-none flex-1"
            />
          </form>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.value}
                to={cat.value === 'general' ? '/' : `/category/${cat.value}`}
                onClick={() => setMenuOpen(false)}
                className="px-3 py-1.5 bg-ink-800 text-ink-300 text-xs rounded hover:bg-ink-700 transition-colors"
              >
                {cat.icon} {cat.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
