# Future Features - Spotify Clone

A backlog of advanced features to enhance the Spotify Web Clone, divided by complexity and user value.

---

## 1. High Priority (Elevates User Experience)

### Dynamic Queue Management
- **Description**: Add a playlist queue panel. Users can add songs to a queue ("Play Next", "Add to Queue") and view upcoming tracks.
- **Complexity**: **Medium**
- **Implementation**: Manage an array of upcoming track items in the client state. When a song finishes playing, automatically load the next item in the queue list.

### Synchronized Real-Time Lyrics
- **Description**: Display scrolling lyrics synchronized with the active track timeline, matching Spotify's standard lyrics card style.
- **Complexity**: **Medium**
- **Implementation**: Load subtitle files (`.lrc` format) or time-stamped JSON objects. Sync text line offsets by monitoring the `timeupdate` events of the player.

### Recently Played History
- **Description**: Save recently played songs in the sidebar or homepage grids, allowing users to quickly return to previous tracks.
- **Complexity**: **Low**
- **Implementation**: Save details of played tracks in `localStorage` and read the stored values to render a "Recently Played" grid on startup.

---

## 2. Medium Priority (Personalization & Control)

### Keyboard Shortcuts
- **Description**: Control playback directly from the keyboard: `Space` for Play/Pause, `Left Arrow` / `Right Arrow` for seeking, and `M` for muting.
- **Complexity**: **Low**
- **Implementation**: Add keydown event listeners to the global `window` object and trigger active player controls.

### Search Auto-Suggestions
- **Description**: Show matching song and artist recommendations in a dropdown menu as the user types in the search bar.
- **Complexity**: **Medium**
- **Implementation**: Throttle/debounce input keyups and fetch matching queries from YouTube or Spotify API endpoints before rendering the dropdown.

---

## 3. Low Priority (Advanced Features)

### Playback Crossfade & Transition Effects
- **Description**: Smooth track changes by fading out the ending song while gradually fading in the next track.
- **Complexity**: **High**
- **Implementation**: Use twin `Audio` element channels. Linearly transition output volumes between the elements when the time position reaches the final 5 seconds.

### Audio Equalizer Presets
- **Description**: Allow users to adjust sound frequencies using custom equalizer presets (such as Bass Booster, Vocal Clarity, Pop, Classic).
- **Complexity**: **High**
- **Implementation**: Route the audio output node through Web Audio API filters (`BiquadFilterNode`) to tweak specific frequency bands.
