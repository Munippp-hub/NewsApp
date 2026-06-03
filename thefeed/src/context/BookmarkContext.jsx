import { createContext, useContext, useReducer, useEffect } from 'react'

const BookmarkContext = createContext()

function bookmarkReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE':
      const exists = state.some(a => a.url === action.article.url)
      if (exists) return state.filter(a => a.url !== action.article.url)
      return [action.article, ...state]
    case 'LOAD':
      return action.payload
    default:
      return state
  }
}

export function BookmarkProvider({ children }) {
  const [bookmarks, dispatch] = useReducer(bookmarkReducer, [])

  // Load from localStorage on mount (useEffect)
  useEffect(() => {
    const saved = localStorage.getItem('thefeed_bookmarks')
    if (saved) dispatch({ type: 'LOAD', payload: JSON.parse(saved) })
  }, [])

  // Save to localStorage whenever bookmarks change
  useEffect(() => {
    localStorage.setItem('thefeed_bookmarks', JSON.stringify(bookmarks))
  }, [bookmarks])

  const toggleBookmark = (article) => dispatch({ type: 'TOGGLE', article })
  const isBookmarked = (url) => bookmarks.some(a => a.url === url)

  return (
    <BookmarkContext.Provider value={{ bookmarks, toggleBookmark, isBookmarked }}>
      {children}
    </BookmarkContext.Provider>
  )
}

export function useBookmarks() {
  return useContext(BookmarkContext)
}
