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
    const ytDlpProcess = spawn('yt-dlp', [
      '-f', 'bestaudio',
      '--extract-audio',
      '--audio-format', 'mp3',
      '-o', '-',
      videoUrl
    ]);

    ytDlpProcess.stdout.pipe(res);

    ytDlpProcess.on('error', (err) => {
      console.error('Error:', err);
      res.status(500).send('Failed to fetch audio');
    });

    ytDlpProcess.on('close', (code) => {
      if (code !== 0) {
        console.error(`yt-dlp process exited with code ${code}`);
        res.status(500).send('Failed to fetch audio');
      }
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error while processing the request');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
