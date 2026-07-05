const express = require('express');
const { spawn } = require('child_process');
const cors = require('cors'); // To handle cross-origin requests from frontend
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5500;

app.use(cors());  // Enable CORS to allow frontend requests

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// Route to render index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Route to stream audio from YouTube using yt-dlp
app.get('/audio', async (req, res) => {
  const videoUrl = req.query.url;  // Get video URL from query parameters

  if (!videoUrl) {
    return res.status(400).send('No URL provided');
  }

  try {
    // Set headers BEFORE piping so the browser knows it's audio
    res.setHeader('Content-Type', 'audio/mpeg');

    const ytDlpProcess = spawn('yt-dlp', [
      '-f', 'bestaudio',
      '--extract-audio',
      '--audio-format', 'mp3',
      '-o', '-',
      videoUrl
    ]);

    ytDlpProcess.stdout.pipe(res);

    // Capture stderr for debugging yt-dlp failures
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
          // Headers already sent (pipe started), just end the response
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

// Route to get direct stream URL from YouTube using yt-dlp (enables native browser seeking)
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
  console.log(`Server running on http://localhost:${PORT}`);
});
