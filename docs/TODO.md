# TODO List - Spotify Clone Tasks

A checklist tracking engineering tasks required to fix bugs, optimize codebase architecture, and refine UI layouts.

---

## Phase 1: Critical Playback & Network Fixes
- [x] Fix HTTPS local connection URL schema error (change `https` to `http` or dynamic browser locations). `[Easy]`
- [x] Merge duplicated audio controllers (`playSong`, `playSong2`, `playSong3`) into a clean, unified playback manager. `[Medium]`
- [x] Clear invalid placeholder file paths (`path/to/song2.mp3`). `[Easy]`

---

## Phase 2: Security & Code Modularization
- [ ] Move YouTube search queries to Node server routes to protect API keys from exposure. `[Medium]`
- [x] Refactor duplicate search routines in `Fetch_Youtube_music.js` into a single query function with count limits. `[Easy]`
- [x] Separate the hardcoded playlist arrays from `script.js` into a standalone JSON file or a dedicated database file. `[Easy]`
- [x] Implement event delegation on song rows to prevent memory leaks from multiple event listeners. `[Medium]`

---

## Phase 3: UI Design & Responsiveness
- [x] Implement media query breakpoints inside `style.css` to fix layout issues on devices under 768px wide. `[Medium]`
- [x] Update the bottom playback bar layout on mobile. Hide volume controls and metadata details to prevent text collisions. `[Medium]`
- [x] Add smooth hover transitions to all sidebar list items and play buttons. `[Easy]`
- [ ] Implement loading skeletons or spinner indicators to show search and stream loading states. `[Medium]`

---

## Phase 4: Accessibility & Optimization
- [x] Add `tabindex` and key event bindings to enable complete keyboard navigation. `[Medium]`
- [x] Add descriptive `aria-label` text to all play, pause, next, and previous buttons. `[Easy]`
- [ ] Cache search queries in browser memory or local storage to save YouTube API quotas. `[Medium]`
- [ ] Add `loading="lazy"` attributes to all playlist covers and thumbnails that load below the fold. `[Easy]`

