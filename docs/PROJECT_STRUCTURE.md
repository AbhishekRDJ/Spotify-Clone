# Project Structure - Spotify Clone

This document maps out the folder hierarchy and provides descriptions of the codebase files and directories.

## Folder Hierarchy

```
Spotify-Clone/
├── .git/                      # Git repository files
├── docs/                      # Project analysis and documentation
├── animation/                 # Lottie animations
│   └── Animation - 1733655375256.json  # Lottie visualizer JSON
├── songs/                     # Local MP3 audio folders
│   ├── Arijit_Singh/
│   ├── liked_Songs/
│   ├── random/
│   ├── right_listed_song/
│   ├── sandeepMaheshwari/
│   └── sonu_nigam/
├── index.html                 # Main single-page interface
├── style.css                  # Global styles for the player interface
├── script.js                  # Frontend logic module
├── server.js                  # Node.js backend streaming server
├── spotifyAPI.js              # Spotify web API helper class (placeholder)
├── Fetch_Youtube_music.js     # Helper function mapping YouTube audio searches
├── package.json               # Backend dependencies and startup scripts
├── package-lock.json          # Node dependency lock file
└── README.md                  # Basic user guide
```

## Directory & File Descriptions

### Root Files
- **[index.html](file:///d:/projects%20for%20fun/Spotify%20web%20clone/Spotify-Clone/index.html)**: Defines the layout grids representing Spotify Desktop. This includes the sidebar library lists, the main dashboard grid containing song recommendations, a hidden details table panel for active playlist files, and a bottom playback control tray.
- **[script.js](file:///d:/projects%20for%20fun/Spotify%20web%20clone/Spotify-Clone/script.js)**: The core script driving the client behavior. Stores hardcoded arrays of tracks, binds click events to play buttons, updates seek bars on time updates, and manages global player variables (`currentAudio`, `currentlyPlayingIndex`).
- **[style.css](file:///d:/projects%20for%20fun/Spotify%20web%20clone/Spotify-Clone/style.css)**: Handles layout styling. Uses custom layouts, gradients, hover transformations, volume bars, and overlay positions.
- **[server.js](file:///d:/projects%20for%20fun/Spotify%20web%20clone/Spotify-Clone/server.js)**: An Express web server which serves frontend files statically and exposes a proxy streaming endpoint (`/audio`). It invokes `yt-dlp` using child-process spawning to extract and pipe audio from YouTube directly to the browser.
- **[spotifyAPI.js](file:///d:/projects%20for%20fun/Spotify%20web%20clone/Spotify-Clone/spotifyAPI.js)**: Contains helper code to authenticate via the client credentials flow and search for track metadata on Spotify's REST endpoint.
- **[Fetch_Youtube_music.js](file:///d:/projects%20for%20fun/Spotify%20web%20clone/Spotify-Clone/Fetch_Youtube_music.js)**: Exports search routines targeting the YouTube v3 Data API. It queries songs and retrieves matching video identifiers and cover art details.

### Subdirectories
- **[animation/](file:///d:/projects%20for%20fun/Spotify%20web%20clone/Spotify-Clone/animation)**: Contains the Lottie animation file representing the active visualizer overlay.
- **[songs/](file:///d:/projects%20for%20fun/Spotify%20web%20clone/Spotify-Clone/songs)**: Contains categorised subdirectories housing physical `.mp3` files for offline playback.
  - `Arijit_Singh/`, `liked_Songs/`, `random/`, `right_listed_song/`, `sandeepMaheshwari/`, `sonu_nigam/`.

## Dependencies

- **Client Dependencies**:
  - `lottie-web` (loaded via CDN link) for running vector animations inside the playing track rows.
  - FontAwesome (loaded via CDN link) for player control and sidebar navigation icons.
- **Server Dependencies**:
  - `express`: Serves files and handles requests.
  - `cors`: Handles cross-origin requests between the client and server.
  - `yt-dlp`: Executable command-line tool (must be installed on the system path) used by the Node server to extract audio streams from YouTube.
