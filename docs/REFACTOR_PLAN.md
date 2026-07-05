# Refactor Plan - Spotify Clone

A structured, phased roadmap to resolve bugs, clean up code architecture, and implement UI/UX improvements.

---

## 1. Refactor Roadmap Categorization

### Phase 1: Critical Issues (Immediate Fixes)
*Focuses on resolving core playback blockages and standardizing local networking.*

| Task | Location | Complexity | Description |
| :--- | :--- | :--- | :--- |
| **Fix Client Connection Protocol** | [script.js](file:///d:/projects%20for%20fun/Spotify%20web%20clone/Spotify-Clone/script.js) | **Low** | Change hardcoded `https://localhost:5500` calls to use `http://localhost:5500` or auto-calculate protocols based on `window.location`. |
| **Unify Player Functions** | [script.js](file:///d:/projects%20for%20fun/Spotify%20web%20clone/Spotify-Clone/script.js) | **Medium** | Combine `playSong()`, `playSong2()`, and `playSong3()` into a single playback controller function. |
| **Remove Missing Audio Paths** | [script.js](file:///d:/projects%20for%20fun/Spotify%20web%20clone/Spotify-Clone/script.js) | **Low** | Clear placeholder tracks pointing to dummy file paths (`path/to/song2.mp3`). |

---

### Phase 2: High Priority (Security & Code Health)
*Focuses on separating data models, modularizing code, and securing API endpoints.*

| Task | Location | Complexity | Description |
| :--- | :--- | :--- | :--- |
| **Secure API Key** | [Fetch_Youtube_music.js](file:///d:/projects%20for%20fun/Spotify%20web%20clone/Spotify-Clone/Fetch_Youtube_music.js) | **Medium** | Move YouTube search requests to the backend server to secure API keys. |
| **Move Static Song Lists** | [script.js](file:///d:/projects%20for%20fun/Spotify%20web%20clone/Spotify-Clone/script.js) | **Low** | Move hardcoded song data structures to a standalone `songsData.js` file or load them from local JSON files. |
| **Unify YouTube Fetch Functions** | [Fetch_Youtube_music.js](file:///d:/projects%20for%20fun/Spotify%20web%20clone/Spotify-Clone/Fetch_Youtube_music.js) | **Low** | Replace the multiple duplicate search functions (`searchYouTube1`, `searchYouTube2`, etc.) with a single function that accepts search limit parameters. |
| **Implement Event Delegation** | [script.js](file:///d:/projects%20for%20fun/Spotify%20web%20clone/Spotify-Clone/script.js) | **Medium** | Bind click events to the parent list elements (`ul`) instead of binding individual event handlers to each song card. |

---

### Phase 3: Medium Priority (UI/UX & Responsiveness)
*Focuses on mobile layout updates and visual refinements.*

| Task | Location | Complexity | Description |
| :--- | :--- | :--- | :--- |
| **Mobile Layout CSS** | [style.css](file:///d:/projects%20for%20fun/Spotify%20web%20clone/Spotify-Clone/style.css) | **Medium** | Add media queries below 768px. Collapse the sidebar and stack cards vertically on smaller viewports. |
| **Bottom Tray Responsiveness** | [style.css](file:///d:/projects%20for%20fun/Spotify%20web%20clone/Spotify-Clone/style.css) | **Medium** | Clean up the bottom media player layout on mobile. Hide volume sliders and secondary details to prevent text overlaps. |
| **Add Hover Transitions** | [style.css](file:///d:/projects%20for%20fun/Spotify%20web%20clone/Spotify-Clone/style.css) | **Low** | Add `transition: all 0.2s ease` to all clickable elements to smooth out interactive states. |

---

### Phase 4: Low Priority (Accessibility & Caching)
*Focuses on semantic optimization and speed enhancements.*

| Task | Location | Complexity | Description |
| :--- | :--- | :--- | :--- |
| **Add Keyboard Focus Support** | [style.css](file:///d:/projects%20for%20fun/Spotify%20web%20clone/Spotify-Clone/style.css) | **Low** | Restore focus indicators and support keyboard actions using `tabindex` and event listeners. |
| **Add ARIA Labels** | [index.html](file:///d:/projects%20for%20fun/Spotify%20web%20clone/Spotify-Clone/index.html) | **Low** | Add descriptive screen-reader labels to all icon-only media player control buttons. |
| **Implement Local Caching** | [script.js](file:///d:/projects%20for%20fun/Spotify%20web%20clone/Spotify-Clone/script.js) | **Medium** | Cache YouTube search queries in the browser's `localStorage` to save API quota. |
