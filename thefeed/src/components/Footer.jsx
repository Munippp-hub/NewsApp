import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-ink-800 mt-16 py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-display font-black text-xl text-ink-50">
          THE<span className="text-accent-red">FEED</span>
        </span>
        <p className="text-xs text-ink-600">
          Powered by{' '}
          <a href="https://newsapi.org" target="_blank" rel="noopener noreferrer" className="text-ink-400 hover:text-ink-200 transition-colors">
            NewsAPI.org
          </a>
          {' '} · Built with React & Tailwind CSS
        </p>
        <p className="text-xs text-ink-700">© 2026 TheFeed</p>
      </div>
    </footer>
  )
}
