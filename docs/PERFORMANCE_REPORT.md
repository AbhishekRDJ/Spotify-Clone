# Performance Report - Spotify Clone

Analysis of loading speeds, API requests, DOM rendering bottlenecks, and code organization, with recommendations for optimization.

---

## 1. Identified Performance Bottlenecks

### API Request Redundancy & Quota Waste
- **Issue**: The application makes live network calls to the YouTube API every time a playlist item or search term is clicked. No caching mechanism is used to save results.
- **Impact**: Slow page loading and quick exhaustion of YouTube API query quotas.
- **Solution**: Implement client-side query caching (e.g. using a simple memory cache map or `localStorage` for search terms) or move requests to the backend server and cache responses.

### DOM Recreation and Memory Leaks
- **Issue**: In `script.js`, functions like `populateSongsList` and `handleVideoResponse_Gallery` clear contents using `.innerHTML = ''` before regenerating DOM strings. This leaves old event listeners dangling in memory because they are not properly unbound.
- **Impact**: Gradual memory build-up over long browser sessions.
- **Solution**: Use event delegation on parent containers instead of binding events to individual list rows.

### Unoptimized Image Loading
- **Issue**: High-resolution playlist covers and track thumbnails are loaded synchronously from external CDNs. None of the `<img>` tags use standard lazy loading attributes.
- **Impact**: Slower initial page load and increased data usage.
- **Solution**: Add `loading="lazy"` to all dashboard and library cover images that sit below the fold.

### Large Monolithic Files
- **Issue**: `script.js` contains a large array of hardcoded songs alongside core playback and API handling logic. This makes the file size unnecessarily large.
- **Impact**: Harder code maintenance and slower script compilation.
- **Solution**: Split song lists into a separate `songsData.js` file or load them from a local JSON file.

---

## 2. Metrics & Improvement Roadmap

| Metric Area | Current State | Target State | Implementation Complexity |
| :--- | :--- | :--- | :--- |
| **API Latency** | ~600ms - 1.2s (no cache) | <50ms (for cached queries) | Medium (add server caching) |
| **DOM Element Count** | Low (re-created dynamically) | Low (re-created with event delegation) | Low |
| **Lighthouse Performance Score** | Estimated: ~72 | Estimated: ~92 | Medium (image sizing & lazy loading) |
| **Memory Footprint** | Incremental increase on navigation | Stable (proper garbage collection) | Medium (cleanup event bindings) |
