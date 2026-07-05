# Bug Report - Spotify Clone

This document catalogs code bugs, logical errors, and environment integration problems found in the Spotify Clone repository.

---

## 1. Local HTTPS vs HTTP Port Mismatch

- **Severity**: **Critical** (Breaks dynamic streaming completely)
- **Location**: [script.js](file:///d:/projects%20for%20fun/Spotify%20web%20clone/Spotify-Clone/script.js) (Lines 946, 969, 1012, 1053, 1054)
- **Cause**: The JavaScript client requests audio streams from `https://localhost:5500/audio?...`. However, the Node backend server in `server.js` listens on standard HTTP (`http://localhost:5500`). Because localhost does not have SSL configured, browser requests to the HTTPS URL fail with connection errors, blocking all audio playback.
- **Solution**: Update the client script URLs to match the backend protocol:
  ```javascript
  const audioUrl = `http://localhost:5500/audio?url=...`;
  ```

---

## 2. Invalid Local File Paths (Missing Files)

- **Severity**: **High** (Causes broken playback and console errors)
- **Location**: [script.js](file:///d:/projects%20for%20fun/Spotify%20web%20clone/Spotify-Clone/script.js) (Lines 129, 208, 265, 322)
- **Cause**: Multiple song playlist entries reference a placeholder file path: `path/to/song2.mp3`. When a user clicks these tracks, the browser attempts to load a non-existent file, throwing a `404 Not Found` error in the console.
- **Solution**: Remove the placeholder tracks or replace the file paths with valid local MP3 files.

---

## 3. Client-Side Hardcoded YouTube API Key

- **Severity**: **High** (Security vulnerability & API quota exhaustion)
- **Location**: [Fetch_Youtube_music.js](file:///d:/projects%20for%20fun/Spotify%20web%20clone/Spotify-Clone/Fetch_Youtube_music.js) (Lines 2, 30, 58, 87)
- **Cause**: The API key (`AIzaSy...`) is hardcoded directly in the client-side files. This exposes the key in public network requests, allowing anyone to copy it. It is also prone to hitting API query limits.
- **Solution**: Refactor the search workflow. The client should request searches from the backend (e.g. `GET /api/search?q=...`), and the Node server should execute the YouTube API request using keys stored in backend environment variables.

---

## 4. Stacked Click Event Listeners

- **Severity**: **Medium** (Degrades performance and page speed)
- **Location**: [script.js](file:///d:/projects%20for%20fun/Spotify%20web%20clone/Spotify-Clone/script.js) (Lines 1078, 1132)
- **Cause**: The click event listener for the `#home_btn` selector is repeatedly registered inside `handleVideoResponse_Gallery` and `galleryItems.forEach` callbacks. Every time the user interacts with gallery items, duplicate click handlers are added to the home button, causing performance lag over time.
- **Solution**: Bind the `#home_btn` click event once globally during script initialization.

---

## 5. Play/Pause Button State Out of Sync

- **Severity**: **Medium** (Confusing UI behavior)
- **Location**: [script.js](file:///d:/projects%20for%20fun/Spotify%20web%20clone/Spotify-Clone/script.js) (Lines 487-519)
- **Cause**: The bottom player tray play/pause button state and the individual list item play/pause buttons are updated using separate selectors. If a user clicks play in the bottom control tray, the active list row visual button icon does not update to match the playing state.
- **Solution**: Create a unified player state manager function that synchronizes all play/pause icons across the page whenever the media player state changes.
