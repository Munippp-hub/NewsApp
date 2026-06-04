export default async function handler(req, res) {
  const { category, q } = req.query
  const API_KEY = process.env.VITE_NEWS_API_KEY

  let url = ''

  if (q) {
    url = `https://newsapi.org/v2/everything?q=${q}&language=en&pageSize=20&apiKey=${API_KEY}`
  } else {
    url = `https://newsapi.org/v2/top-headlines?country=us&category=${category || 'general'}&pageSize=20&apiKey=${API_KEY}`
  }

  const response = await fetch(url)
  const data = await response.json()

  res.setHeader('Access-Control-Allow-Origin', '*')
  res.status(200).json(data)
}