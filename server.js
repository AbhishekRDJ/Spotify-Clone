require('dotenv').config();
const express = require('express');
const { spawn } = require('child_process');
const cors = require('cors');
const path = require('path');
const https = require('https');

const app = express();
const PORT = process.env.PORT || 5500;
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

app.use(cors());
app.use(express.static(path.join(__dirname)));

// Route to render index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ============================================================
// YouTube Search Proxy (keeps API key secret on server-side)
// ============================================================
app.get('/api/search', (req, res) => {
  const query = req.query.q;
  const maxResults = parseInt(req.query.maxResults) || 8;

  if (!query) {
    return res.status(400).json({ error: 'No search query provided' });
  }
  if (!YOUTUBE_API_KEY) {
    return res.status(500).json({ error: 'YouTube API key not configured on server' });
  }

  const params = new URLSearchParams({
    part: 'snippet',
    q: query,
    type: 'video',
    videoCategoryId: '10', // Music category
    maxResults: maxResults,
    key: YOUTUBE_API_KEY,
  });

  const apiUrl = `https://www.googleapis.com/youtube/v3/search?${params}`;

  https.get(apiUrl, (apiRes) => {
    let data = '';
    apiRes.on('data', chunk => data += chunk);
    apiRes.on('end', () => {
      try {
        const parsed = JSON.parse(data);
        if (parsed.error) {
          console.error('YouTube API error:', parsed.error.message);
          return res.status(500).json({ error: parsed.error.message });
        }
        res.json(parsed);
      } catch (e) {
        res.status(500).json({ error: 'Failed to parse YouTube API response' });
      }
    });
  }).on('error', (err) => {
    console.error('YouTube API request failed:', err.message);
    res.status(500).json({ error: 'Failed to reach YouTube API' });
  });
});

// ============================================================
// Route to stream audio from YouTube using yt-dlp
// ============================================================
app.get('/audio', async (req, res) => {
  const videoUrl = req.query.url;

  if (!videoUrl) {
    return res.status(400).send('No URL provided');
  }

  try {
    res.setHeader('Content-Type', 'audio/mpeg');

    const ytDlpProcess = spawn('yt-dlp', [
      '-f', 'bestaudio',
      '--extract-audio',
      '--audio-format', 'mp3',
      '-o', '-',
      videoUrl
    ]);

    ytDlpProcess.stdout.pipe(res);

    let stderrData = '';
    ytDlpProcess.stderr.on('data', (data) => {
      stderrData += data.toString();
    });

    ytDlpProcess.on('error', (err) => {
      console.error('yt-dlp spawn error:', err.message);
      if (!res.headersSent) {
        res.status(500).send('Failed to start yt-dlp. Is it installed?');
      }
    });

    ytDlpProcess.on('close', (code) => {
      if (code !== 0) {
        console.error(`yt-dlp process exited with code ${code}`);
        if (stderrData) console.error('yt-dlp stderr:', stderrData);
        if (!res.headersSent) {
          res.status(500).send('Failed to fetch audio');
        } else {
          res.end();
        }
      }
    });

  } catch (error) {
    console.error('Error:', error);
    if (!res.headersSent) {
      res.status(500).send('Error while processing the request');
    }
  }
});

// ============================================================
// Route to get direct stream URL from YouTube (seekable playback)
// ============================================================
app.get('/stream-url', async (req, res) => {
  const videoUrl = req.query.url;

  if (!videoUrl) {
    return res.status(400).send('No URL provided');
  }

  try {
    const ytDlpProcess = spawn('yt-dlp', [
      '-g',
      '-f', 'bestaudio',
      videoUrl
    ]);

    let urlData = '';
    let stderrData = '';

    ytDlpProcess.stdout.on('data', (data) => {
      urlData += data.toString();
    });

    ytDlpProcess.stderr.on('data', (data) => {
      stderrData += data.toString();
    });

    ytDlpProcess.on('error', (err) => {
      console.error('yt-dlp stream-url spawn error:', err.message);
      if (!res.headersSent) {
        res.status(500).send('Failed to start yt-dlp');
      }
    });

    ytDlpProcess.on('close', (code) => {
      if (code === 0) {
        res.json({ url: urlData.trim() });
      } else {
        console.error(`yt-dlp stream-url exited with code ${code}`);
        if (stderrData) console.error('yt-dlp stderr:', stderrData);
        if (!res.headersSent) {
          res.status(500).send('Failed to extract direct stream URL');
        }
      }
    });

  } catch (error) {
    console.error('Error:', error);
    if (!res.headersSent) {
      res.status(500).send('Error while processing the request');
    }
  }
});

app.listen(PORT, () => {
  console.log(`🎵 Spotify Clone server running on http://localhost:${PORT}`);
  console.log(`🔑 YouTube API Key: ${YOUTUBE_API_KEY ? '✅ Loaded from .env' : '❌ NOT SET — search will fail!'}`);
});
