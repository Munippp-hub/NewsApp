# 📰 TheFeed — News App

Aplikasi berita modern dibangun dengan React JS dan Tailwind CSS, menampilkan berita terkini dari seluruh dunia.

## 🚀 Fitur

- **Top Headlines** — Berita terkini dari berbagai sumber
- **Kategori** — Tech, World, Business, Science, Health, Sports, Entertainment
- **Search** — Cari berita berdasarkan keyword
- **Bookmark** — Simpan artikel favorit (tersimpan di localStorage)
- **Article Detail** — Baca ringkasan artikel lengkap
- **Responsive** — Tampil optimal di mobile & desktop

## 🛠️ Teknologi

| Teknologi | Keterangan |
|-----------|-----------|
| React JS 18 | Library UI utama |
| Tailwind CSS 3 | Utility-first CSS framework |
| React Router v6 | Routing antar halaman |
| Axios | HTTP client untuk API |
| NewsAPI.org | Sumber data berita |
| Vite | Build tool |

## 📋 Checklist Fitur Nilai Tambahan

- [x] ✅ Reusable Component (`ArticleCard`, `LoadingSpinner`, `SectionHeader`, `Navbar`, `Footer`)
- [x] ✅ useState (search input, menu toggle, loading state)
- [x] ✅ useEffect (fetch data saat component mount, simpan bookmark)
- [x] ✅ Event Handler (onClick, onSubmit, onChange, onError)
- [x] ✅ Konsumsi API Publik (NewsAPI.org)
- [x] ✅ React Router (/, /category/:category, /search, /article, /bookmarks)
- [x] ✅ Environment Variable (.env dengan VITE_NEWS_API_KEY)
- [ ] 🔲 Deploy ke Vercel / Netlify (lakukan setelah setup)

## ⚙️ Setup & Instalasi

### 1. Clone & Install

```bash
git clone https://github.com/username/thefeed-newsapp.git
cd thefeed-newsapp
npm install
```

### 2. Dapatkan API Key

1. Daftar gratis di [newsapi.org](https://newsapi.org)
2. Copy API key kamu

### 3. Setup Environment Variable

```bash
cp .env.example .env
```

Edit file `.env`:

```
VITE_NEWS_API_KEY=api_key_kamu_disini
VITE_NEWS_BASE_URL=https://newsapi.org/v2
```

> ⚠️ **Note:** Tanpa API key, app tetap berjalan dengan data mock/dummy.

### 4. Jalankan Development Server

```bash
npm run dev
```

Buka `http://localhost:5173`

### 5. Build untuk Production

```bash
npm run build
npm run preview
```

## 🌐 Deploy ke Vercel

1. Push code ke GitHub
2. Login ke [vercel.com](https://vercel.com)
3. Import repository
4. Tambahkan Environment Variable: `VITE_NEWS_API_KEY`
5. Deploy!

## 📁 Struktur Folder

```
src/
├── components/
│   ├── Navbar.jsx          # Navigasi utama + search
│   ├── Footer.jsx          # Footer
│   ├── ArticleCard.jsx     # Card berita (3 variant)
│   ├── LoadingSpinner.jsx  # Loading state
│   └── SectionHeader.jsx  # Header section
├── context/
│   └── BookmarkContext.jsx # Global state bookmark
├── hooks/
│   └── useNews.js          # Custom hook fetch API
├── pages/
│   ├── Home.jsx            # Halaman utama
│   ├── CategoryPage.jsx    # Halaman kategori
│   ├── SearchPage.jsx      # Halaman pencarian
│   ├── ArticleDetail.jsx   # Detail artikel
│   └── Bookmarks.jsx       # Artikel tersimpan
├── utils/
│   └── helpers.js          # Utility functions
├── App.jsx                 # Router setup
├── main.jsx                # Entry point
└── index.css               # Global styles
```

## 👨‍💻 Dibuat untuk Proyek Akhir React JS
