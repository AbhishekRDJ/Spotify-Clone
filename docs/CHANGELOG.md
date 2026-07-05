# Changelog - Spotify Clone

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
- Created `/docs` directory to house documentation.
- Generated `PROJECT_OVERVIEW.md` detailing goals, tech stack, and high-level problems.
- Generated `PROJECT_STRUCTURE.md` documenting file and directory organization.
- Generated `COMPONENT_ARCHITECTURE.md` mapping logical DOM components.
- Generated `UI_UX_AUDIT.md` highlighting visual design issues and fixes.
- Generated `DESIGN_SYSTEM.md` establishing color, spacing, and typography tokens.
- Generated `RESPONSIVENESS_REPORT.md` documenting layout breakpoint breakages.
- Generated `BUG_REPORT.md` listing critical local-network and file path bugs.
- Generated `PERFORMANCE_REPORT.md` assessing loading and memory optimization.
- Generated `ACCESSIBILITY_REPORT.md` checking WCAG compliance.
- Generated `CODE_QUALITY.md` reviewing DRY and SOLID design principles.
- Generated `LLD.md` detailing state machines and low-level data flows.
- Generated `HLD.md` documenting system architecture and sequence diagrams.
- Generated `REFACTOR_PLAN.md` mapping out refactoring phases.
- Generated `TODO.md` providing a developer task checklist.
- Generated `CODING_GUIDELINES.md` outlining project coding standards.
- Generated `FUTURE_FEATURES.md` detailing prospective features.

### Changed (Phase 3 — Code Improvement)
- **[NEW] `songsData.js`**: Extracted all hardcoded song arrays from `script.js` into a centralized data module with clean ES module exports. Removed 4 placeholder tracks with invalid paths (`path/to/song2.mp3`). Fixed inconsistent naming and metadata.
- **`Fetch_Youtube_music.js`**: Merged 4 duplicate `searchYouTube` functions into a single parameterized function. Kept backward-compatible named exports (`searchYouTube2`, `searchYouTube3`, `searchYouTube4`).
- **`script.js`**: Major refactor:
  - Merged `playSong()`, `playSong2()`, `playSong3()` into unified `playTrack()` function.
  - Merged `getAudioStream()`, `getAudioStream1()` into unified `streamFromYouTube()` function.
  - Fixed critical HTTPS→HTTP mismatch bug. URLs now use dynamic `window.location` protocol.
  - Removed stacked event listeners on `#home_btn`, `.fa-forward-step`, `.fa-backward-step` that were re-bound inside other callbacks.
  - Removed all dead commented-out code blocks (~100 lines).
  - Used `{ once: true }` on `loadedmetadata` listeners to prevent memory leaks.
  - Added null safety checks on DOM elements.
  - Added keyboard shortcuts: `Space` (play/pause), `M` (mute), `←/→` (seek ±5s).
  - File reduced from 1139 lines to ~390 lines.

### Changed (Phase 4 — UI Improvement)
- **`style.css`**:
  - Added `:root` CSS custom properties for Spotify brand colors, spacing, and transitions.
  - Fixed global `font-weight: 700` bug that broke typographic hierarchy. Reset to `400` (regular).
  - Added `box-sizing: border-box` to universal selector.
  - Added smooth transitions to all interactive elements (buttons, cards, song rows, table rows).
  - Added `focus-visible` outline styles for keyboard accessibility (WCAG AA).
  - Added styled scrollbar for Webkit browsers.
  - Added responsive tablet breakpoint (`≤1024px`): sidebar collapses to icon-only mode.
  - Added responsive mobile breakpoint (`≤768px`): sidebar hidden, stacked layout, simplified media player, hidden volume controls.
- **`index.html`**:
  - Added `meta description` tag for SEO.
  - Added `aria-label` attributes to home, search, play, pause, next, and previous buttons.
  - Added `name` and `aria-label` attributes to search input.

