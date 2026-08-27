# 🎵 Spotify Web Clone

A Spotify-themed web music player built with HTML, TailwindCSS (CDN), and Vanilla JS. Features YouTube search-powered playback, local MP3 playlists, and a fully mobile-responsive layout.

[![Deploy on Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/Spotify-Clone)

---

## ✨ Features

- 🎧 **YouTube Search & Stream** — Search any song and stream it via yt-dlp on the backend
- 📁 **Local Playlists** — Liked Songs, Arijit Singh, Sonu Nigam, Sandeep Maheshwari
- 📱 **Fully Mobile Responsive** — Drawer sidebar, bottom nav bar, full-screen now-playing panel
- 🔁 **Shuffle & Repeat** — Shuffle queue, Repeat All, and Repeat One modes
- 🕐 **Recently Played** — Remembers your last 6 tracks (saved in browser localStorage)
- ⌨️ **Keyboard Shortcuts** — `Space` (play/pause), `M` (mute), `←/→` (seek 5s)
- 🔐 **Secure API** — YouTube API key is server-side only, never exposed to the browser

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- [yt-dlp](https://github.com/yt-dlp/yt-dlp) installed and on your PATH
- A [YouTube Data API v3 key](https://console.cloud.google.com/apis/credentials)

### Setup

```bash
# 1. Clone the project
git clone https://github.com/your-username/Spotify-Clone.git
cd Spotify-Clone

# 2. Install dependencies
npm install

# 3. Create your .env file
cp .env.example .env
# Then edit .env and add your YouTube API key

# 4. Start the server
npm start
```

Open `http://localhost:5500` in your browser.

---

## 🌐 Deploying for Friends (Sharing)

> **Important**: The backend uses `yt-dlp` to stream YouTube audio. This only works when deployed to a server, **not** on serverless platforms like Vercel free tier.

### Option A — Railway (Recommended, Free Tier Available)

1. Push your code to GitHub
2. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub
3. Set environment variable: `YOUTUBE_API_KEY=your_key_here`
4. Railway auto-detects Node.js and runs `npm start`
5. Share the Railway URL with friends! 🎉

### Option B — Render

1. Push to GitHub
2. Go to [render.com](https://render.com) → New Web Service → Connect repo
3. Build command: `npm install`
4. Start command: `node server.js`
5. Add env var: `YOUTUBE_API_KEY=your_key_here`

### Option C — Vercel (Frontend + Serverless API only)

> ⚠️ Vercel cannot run `yt-dlp` (10s function timeout). YouTube streaming won't work.
> Only local MP3 playlists and the search UI will work.

1. Push to GitHub
2. Import to [vercel.com](https://vercel.com)
3. Add env var: `YOUTUBE_API_KEY=your_key_here`
4. Deploy

---

## 📁 Project Structure

```
Spotify-Clone/
├── index.html          # Main UI — all HTML markup
├── script.js           # App logic (playback, mobile UI, queue)
├── style.css           # Custom styles + mobile media queries
├── server.js           # Node/Express backend (YouTube proxy + yt-dlp)
├── Fetch_Youtube_music.js  # Frontend YouTube search (calls /api/search)
├── songsData.js        # Local playlist data
├── songs/              # Local MP3 files
├── animation/          # Lottie animation assets
├── vercel.json         # Vercel deployment config
├── .env                # ⚠️ NEVER COMMIT — local secrets only
└── docs/               # Architecture, changelogs, reports
```

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` | Play / Pause |
| `←` | Seek back 5 seconds |
| `→` | Seek forward 5 seconds |
| `M` | Mute / Unmute |

---

## 📱 Mobile Controls

| Gesture | Action |
|---------|--------|
| Tap mini-player | Open full-screen Now Playing |
| Swipe down on NP panel | Close Now Playing |
| Hamburger `☰` | Open Library drawer |
| Swipe left on drawer | Close drawer |
| Bottom nav icons | Home / Search / Library |

---

## 🔒 Security Notes

- The YouTube API key lives in `.env` (server-side only)
- The frontend calls `/api/search` on your server — the key is never exposed in browser requests
- `.env` is in `.gitignore` — it will never be committed accidentally

---

## 📖 Documentation

Full project documentation is in the [`docs/`](./docs/) folder:
- [`PROJECT_OVERVIEW.md`](./docs/PROJECT_OVERVIEW.md) — Architecture overview
- [`FUTURE_FEATURES.md`](./docs/FUTURE_FEATURES.md) — Planned features
- [`BUG_REPORT.md`](./docs/BUG_REPORT.md) — Known issues and fixes

---

## 📝 License

This project is for educational and personal use only. Spotify® is a trademark of Spotify AB.
