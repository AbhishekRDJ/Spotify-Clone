/**
 * script.js
 * Main application controller for Spotify Web Clone.
 *
 * Clean, modular, responsive, state-driven front-end player logic.
 * Mobile-responsive with drawer, bottom nav, and full-screen now-playing panel.
 */

import { searchYouTube } from './Fetch_Youtube_music.js';
import {
  likedSongsData, sandeepMaheshwariData, arijitSinghData,
  arijitTopTrackData, sonuNigamData, rightListedSongData, playlistMap
} from './songsData.js';

// ============================================================
// Constants & Configuration
// ============================================================
// Auto-detect backend URL: localhost in dev, same origin in production
const SERVER_BASE_URL = (() => {
  const h = window.location.hostname;
  if (h === 'localhost' || h === '127.0.0.1') {
    return `${window.location.protocol}//${h}:5500`;
  }
  return window.location.origin;
})();
const LOTTIE_ANIMATION_PATH = 'animation/Animation - 1733655375256.json';

// ============================================================
// DOM Element References
// ============================================================
const mostContainer = document.querySelector('.most');
const songsListContainer = document.querySelector('.songs_list');
const listItems = mostContainer.querySelectorAll('li');
const rightContainer = document.querySelector(".card2_wrap");
const listRightCard = rightContainer.querySelectorAll("li");
const featureContainer = document.querySelector(".feature_song");
const homeButton = document.querySelector('#home_btn');

const musicPlayer = document.querySelector('.music-player');
const songTitleElement = musicPlayer.querySelector('.song-details .title');
const artistElement = musicPlayer.querySelector('.song-details .artist');
// Use the desktop progress bar container (hidden md:flex)
const progressBarContainer = musicPlayer.querySelector('.progress-bar-container');
const progressBar = musicPlayer.querySelector('.progress-bar .progress');
const startTime = progressBarContainer ? progressBarContainer.querySelector('.time:first-child') : null;
const endTime = progressBarContainer ? progressBarContainer.querySelector('.time:last-child') : null;
const playPauseBtn = musicPlayer.querySelector('#playing'); // Pause icon (active when playing)
const pauseBtn = musicPlayer.querySelector('#pause');       // Play icon (active when paused)
const prevBtn = musicPlayer.querySelector('[aria-label="Previous Track"]');
const nextBtn = musicPlayer.querySelector('[aria-label="Next Track"]');

const volumeSlider = document.querySelector('.volume-slider');
const volumeBar = volumeSlider ? volumeSlider.querySelector('.volume') : null;
const muteButton = document.querySelector('.settings button:first-child');
const fullscreenBtn = document.querySelector('.settings button:last-child');

const searchContainer = document.querySelector('.search_SONG_Container');
const searchResultsBody = document.getElementById('searchResultsBody');
const searchInput = document.getElementById('input');
const searchButton = document.getElementById('searchButton');

const gallery = document.querySelector('.playlist');
const galleryItems = gallery ? gallery.querySelectorAll('.playlist_item') : [];

// --- Mobile UI DOM References ---
const hamburgerBtn     = document.getElementById('hamburger-btn');
const mobileDrawer     = document.getElementById('mobile-drawer');
const drawerBackdrop   = document.getElementById('drawer-backdrop');
const drawerCloseBtn   = document.getElementById('drawer-close-btn');
const mobileSearchToggle  = document.getElementById('mobile-search-toggle');
const mobileSearchBar     = document.getElementById('mobile-search-bar');
const mobileInput         = document.getElementById('mobile-input');
const mobileSearchBtn     = document.getElementById('mobile-search-btn');
const mobileHomeBtn       = document.getElementById('mobile-home-btn');
const mobNavHome          = document.getElementById('mob-nav-home');
const mobNavSearch        = document.getElementById('mob-nav-search');
const mobNavLibrary       = document.getElementById('mob-nav-library');
const nowPlayingPanel     = document.getElementById('now-playing-fullscreen');
const npCollapseBtn       = document.getElementById('np-collapse-btn');
const npAlbumArt          = document.getElementById('np-album-art');
const npTitle             = document.getElementById('np-title');
const npArtist            = document.getElementById('np-artist');
const npProgress          = document.getElementById('np-progress');
const npProgressBar       = document.getElementById('np-progress-bar');
const npStartTime         = document.getElementById('np-start-time');
const npEndTime           = document.getElementById('np-end-time');
const npPlayBtn           = document.getElementById('np-play-btn');
const npPrevBtn           = document.getElementById('np-prev-btn');
const npNextBtn           = document.getElementById('np-next-btn');
const miniPlayerInfo      = document.getElementById('mini-player-info');
const playerAlbumArt      = document.getElementById('player-album-art');
const mobileExpandPlayer  = document.getElementById('mobile-expand-player');
const shuffleBtn          = document.getElementById('shuffle-btn');
const repeatBtn           = document.getElementById('repeat-btn');

// ============================================================
// Global State Management
// ============================================================
let currentAudio = new Audio();
let currentlyPlayingIndex = null;
let currentPlayingRow = null;
let playbackState = 'idle'; // 'idle', 'loading', 'playing', 'paused'
let isMuted = false;
let previousVolume = 0.5;

let playbackQueue = [];    // Holds track objects in current active playlist
let queueIndex = -1;       // Current track index in the active queue
let currentSearchQuery = '';

// Mobile UI state
let isDrawerOpen = false;
let isMobileSearchOpen = false;
let isNowPlayingOpen = false;

// Playback feature state
let isShuffleOn = false;
let repeatMode = 'off'; // 'off', 'all', 'one'

// Set default volume
currentAudio.volume = 0.5;
if (volumeBar) volumeBar.style.width = `${currentAudio.volume * 100}%`;

// ============================================================
// Visual State Controller (Buffering, Loading & Playback States)
// ============================================================

/**
 * Transitions the UI to match the current playback state.
 * Adds loading spinners, equalizer visualizers, or standard status play icons.
 */
function setPlaybackState(state) {
  playbackState = state;

  // Clear visual highlights on all rows/cards
  document.querySelectorAll('tr').forEach(tr => tr.classList.remove('row-buffering', 'row-playing'));
  document.querySelectorAll('.song_card').forEach(card => card.classList.remove('row-buffering', 'row-playing'));

  // 1. Manage active row styling and icons
  if (currentPlayingRow) {
    if (state === 'loading') {
      currentPlayingRow.classList.add('row-buffering');
      const statusCol = currentPlayingRow.querySelector('.status-col');
      if (statusCol) {
        statusCol.innerHTML = '<div class="spinner"></div>';
      }
    } else if (state === 'playing') {
      currentPlayingRow.classList.add('row-playing');
      const statusCol = currentPlayingRow.querySelector('.status-col');
      if (statusCol) {
        statusCol.innerHTML = '<i class="fa-solid fa-volume-high" style="color: var(--spotify-green);"></i>';
      }
      
      // Update subpause button display if local song card
      const subplayBtn = currentPlayingRow.querySelector('.subplay');
      const subpauseBtn = currentPlayingRow.querySelector('.subpause');
      if (subplayBtn && subpauseBtn) {
        subplayBtn.style.display = 'none';
        subpauseBtn.style.display = 'flex';
      }
    } else if (state === 'paused') {
      const statusCol = currentPlayingRow.querySelector('.status-col');
      if (statusCol) {
        statusCol.innerHTML = '<i class="fa-solid fa-play" style="color: #b3b3b3;"></i>';
      }

      // Update subplay button display if local song card
      const subplayBtn = currentPlayingRow.querySelector('.subplay');
      const subpauseBtn = currentPlayingRow.querySelector('.subpause');
      if (subplayBtn && subpauseBtn) {
        subplayBtn.style.display = 'flex';
        subpauseBtn.style.display = 'none';
      }
    }
  }

  // 2. Manage footer control buttons
  const pControls = musicPlayer.querySelector('.playback-controls');
  let spinner = pControls.querySelector('.spinner');

  if (state === 'loading') {
    playPauseBtn.style.display = 'none';
    pauseBtn.style.display = 'none';
    if (!spinner) {
      spinner = document.createElement('div');
      spinner.className = 'spinner';
      pControls.insertBefore(spinner, nextBtn);
    }
  } else {
    if (spinner) spinner.remove();

    if (state === 'playing') {
      playPauseBtn.style.display = 'flex'; // Pause button visible
      pauseBtn.style.display = 'none';    // Play button hidden
    } else {
      playPauseBtn.style.display = 'none'; // Pause button hidden
      pauseBtn.style.display = 'flex';    // Play button visible
    }
  }

  // 3. Sync mobile Now Playing panel button icon (Bug Fix #5)
  if (npPlayBtn) {
    const npIcon = npPlayBtn.querySelector('i');
    if (state === 'playing') {
      if (npIcon) {
        npIcon.className = 'fa-pause fa-solid text-2xl';
      }
    } else {
      if (npIcon) {
        npIcon.className = 'fa-circle-play fa-regular text-2xl';
      }
    }
  }
}

// Bind native Audio events to the state machine
currentAudio.addEventListener('waiting', () => setPlaybackState('loading'));
currentAudio.addEventListener('playing', () => setPlaybackState('playing'));
currentAudio.addEventListener('pause', () => setPlaybackState('paused'));
currentAudio.addEventListener('ended', () => playNextTrack());
currentAudio.addEventListener('error', (e) => {
  setPlaybackState('paused');
  showToast('Error loading audio stream. Please try again.');
  console.error('Audio element error:', e);
});

// ============================================================
// Toast Notification Engine
// ============================================================

/** Displays a premium notification banner */
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span>${message}</span>
    <button class="toast-close" aria-label="Close">&times;</button>
  `;

  toast.querySelector('.toast-close').addEventListener('click', () => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  });

  container.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);

  setTimeout(() => {
    if (toast.parentNode) {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }
  }, 4000);
}

// ============================================================
// Utility / Helper Functions
// ============================================================

function formatTime(seconds) {
  if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

function getRandomSong(songsArray) {
  const randomIndex = Math.floor(Math.random() * songsArray.length);
  return songsArray[randomIndex];
}

function getRandomPastelColor() {
  const red = Math.floor(150 + Math.random() * 100);
  const green = Math.floor(150 + Math.random() * 100);
  const blue = Math.floor(150 + Math.random() * 100);
  return `rgb(${red}, ${green}, ${blue})`;
}

function setCustomGradient() {
  const brightColor = getRandomPastelColor();
  const darkColor = `rgb(${Math.floor(Math.random() * 55)}, ${Math.floor(Math.random() * 55)}, ${Math.floor(Math.random() * 55)})`;
  featureContainer.style.background = `linear-gradient(to bottom, ${darkColor} 10%, ${brightColor} 90%)`;
}

// ============================================================
// Core Playback Logic
// ============================================================

/**
 * Standard track playback wrapper.
 * Sets the active audio stream source and triggers loading.
 */
async function playTrack(song, elementRef = null) {
  if (elementRef) {
    currentPlayingRow = elementRef;
  }

  // Update footer title details immediately
  songTitleElement.textContent = song.title;
  artistElement.textContent = song.singer;
  if (startTime) startTime.textContent = formatTime(0);
  progressBar.style.width = '0%';

  // Update Now Playing panel
  if (npTitle) npTitle.textContent = song.title;
  if (npArtist) npArtist.textContent = song.singer;
  if (npProgress) npProgress.style.width = '0%';
  if (npStartTime) npStartTime.textContent = '0:00';

  // Save to recently played in localStorage
  saveRecentlyPlayed(song);

  let targetSrc = song.filePath;

  // If this is a YouTube proxy URL, fetch the direct seekable URL
  if (song.filePath && song.filePath.includes('/audio?url=')) {
    setPlaybackState('loading');
    try {
      const videoUrl = song.filePath.split('/audio?url=')[1];
      const response = await fetch(`${SERVER_BASE_URL}/stream-url?url=${videoUrl}`);
      const data = await response.json();
      if (data && data.url) {
        targetSrc = data.url;
      } else {
        throw new Error('Failed to parse URL from stream-url response');
      }
    } catch (err) {
      console.error('Error resolving direct stream URL:', err);
      showToast('Error resolving stream link. Using fallback...');
      targetSrc = song.filePath; // Fall back to direct audio pipe
    }
  }

  if (currentAudio.src !== targetSrc) {
    setPlaybackState('loading');
    currentAudio.src = targetSrc;
    currentAudio.load();
  }

  currentAudio.play().catch(err => {
    console.error('Play failed:', err);
    setPlaybackState('paused');
  });

  currentAudio.removeEventListener('timeupdate', updateProgressBar);
  currentAudio.addEventListener('timeupdate', updateProgressBar);
}

/** Toggles play/pause state */
function togglePlayPause() {
  if (!currentAudio.src) return;
  if (currentAudio.paused) {
    currentAudio.play().catch(console.error);
  } else {
    currentAudio.pause();
  }
}

/** Updates bottom progress bar fill and elapsed time text */
function updateProgressBar() {
  if (currentAudio.duration) {
    const progressPercent = (currentAudio.currentTime / currentAudio.duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
    if (startTime) startTime.textContent = formatTime(currentAudio.currentTime);
    // Also update now-playing panel
    if (npProgress) npProgress.style.width = `${progressPercent}%`;
    if (npStartTime) npStartTime.textContent = formatTime(currentAudio.currentTime);
  }
}

// ============================================================
// Queue Management (Unified Next / Previous)
// ============================================================

/** Sets up the active list as the playing queue context */
function setPlayingQueue(tracks, index) {
  playbackQueue = tracks;
  queueIndex = index;
}

/** Plays the track in the current queue at the specified index */
async function playQueueTrack(index) {
  if (index < 0 || index >= playbackQueue.length) return;
  queueIndex = index;
  const song = playbackQueue[index];

  // Refresh active row references based on active view
  if (songsListContainer.style.display === 'flex') {
    const cards = songsListContainer.querySelectorAll('.song_card');
    if (cards[index]) {
      currentPlayingRow = cards[index];
    }
  } else if (searchContainer.style.display === 'flex') {
    const rows = searchResultsBody.querySelectorAll('tr');
    if (rows[index]) {
      currentPlayingRow = rows[index];
    }
  }

  playTrack(song, currentPlayingRow);
}

function playNextTrack() {
  if (playbackQueue.length === 0 || queueIndex === -1) return;

  // Repeat one: restart the same track
  if (repeatMode === 'one') {
    currentAudio.currentTime = 0;
    currentAudio.play().catch(console.error);
    return;
  }

  // Shuffle: pick random next index
  if (isShuffleOn && playbackQueue.length > 1) {
    let randomIndex;
    do { randomIndex = Math.floor(Math.random() * playbackQueue.length); }
    while (randomIndex === queueIndex);
    playQueueTrack(randomIndex);
    return;
  }

  let nextIndex = queueIndex + 1;
  if (nextIndex >= playbackQueue.length) {
    if (repeatMode === 'all') {
      nextIndex = 0; // Loop back to start
    } else {
      return; // Stop at end if no repeat
    }
  }
  playQueueTrack(nextIndex);
}

function playPrevTrack() {
  if (playbackQueue.length === 0 || queueIndex === -1) return;
  let prevIndex = queueIndex - 1;
  if (prevIndex < 0) {
    prevIndex = playbackQueue.length - 1; // Loop back to end
  }
  playQueueTrack(prevIndex);
}

// ============================================================
// YouTube Search Results Handling
// ============================================================

/** Render dynamic list of matching results into the table body */
function renderSearchResults(videos, query) {
  searchResultsBody.innerHTML = '';
  
  const queryTitle = document.getElementById('searchQueryTitle');
  if (queryTitle) {
    queryTitle.textContent = `Results for "${query}"`;
  }

  // Format array to match track queue schema
  const tracksList = videos.map(video => ({
    title: video.snippet.title,
    singer: video.snippet.channelTitle,
    playlist: "YouTube Search",
    filePath: `${SERVER_BASE_URL}/audio?url=https://www.youtube.com/watch?v=${video.id.videoId}`
  }));

  videos.forEach((video, index) => {
    const tr = document.createElement('tr');
    tr.className = 'border-b border-spotify-lightGrey/20 hover:bg-spotify-cardHover/70 transition duration-200 cursor-pointer';
    
    tr.innerHTML = `
      <td class="px-4 py-3.5 text-sm text-spotify-subdued align-middle">${index + 1}</td>
      <td class="px-4 py-3.5 align-middle">
        <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.title}" class="w-12 h-12 rounded object-cover shadow">
      </td>
      <td class="px-4 py-3.5 align-middle">
        <div class="song-info1 truncate max-w-[280px]">
          <span class="font-medium text-white block truncate">${video.snippet.title}</span>
        </div>
      </td>
      <td class="px-4 py-3.5 align-middle text-spotify-subdued text-sm truncate max-w-[180px]">${video.snippet.channelTitle}</td>
      <td class="status-col px-4 py-3.5 align-middle text-center">
        <i class="fa-solid fa-play" style="color: #b3b3b3;"></i>
      </td>
    `;

    tr.addEventListener('click', () => {
      setPlayingQueue(tracksList, index);
      playQueueTrack(index);
    });

    searchResultsBody.appendChild(tr);
  });
}

/** Queries YouTube API and triggers the search view */
async function performSearch() {
  const query = searchInput.value;
  if (!query.trim()) return;

  // Toggle views — hide home grid, show search results
  // NOTE: rightSide (.right) is the PARENT of searchContainer — never hide the parent!
  const playingCard = document.querySelector('.playing_card');
  const galleryDetail = document.querySelector('.Gallery_card_detail');
  const recentlyPlayed = document.getElementById('recently-played-section');

  if (playingCard) playingCard.style.display = 'none';
  if (galleryDetail) galleryDetail.style.display = 'none';
  if (recentlyPlayed) recentlyPlayed.style.display = 'none';
  featureContainer.style.display = 'none';
  searchContainer.style.display = 'flex';

  // Show inline loader
  searchResultsBody.innerHTML = `
    <tr>
      <td colspan="5" style="text-align: center; padding: 50px 0;">
        <div class="spinner" style="width: 32px; height: 32px;"></div>
        <div style="margin-top: 15px; color: #b3b3b3; font-size: 14px;">Searching YouTube database...</div>
      </td>
    </tr>
  `;

  try {
    const videos = await searchYouTube(query, 8, null); // Return array of 8 videos
    if (videos && videos.length > 0) {
      currentSearchQuery = query;
      renderSearchResults(videos, query);
    } else {
      searchResultsBody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align: center; color: #b3b3b3; padding: 50px 0;">
            No results found. Try another search query.
          </td>
        </tr>
      `;
    }
  } catch (error) {
    console.error('YouTube search failed:', error);
    searchResultsBody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; color: #ff5555; padding: 50px 0;">
          Failed to fetch results. Ensure backend Node proxy server is active.
        </td>
      </tr>
    `;
  }
}

// ============================================================
// Render Local Playlists
// ============================================================

function populateSongsList(dataPlaylist) {
  const songsListUl = document.querySelector('.songs_list ul');
  songsListUl.innerHTML = '';

  dataPlaylist.forEach((song, index) => {
    const li = document.createElement('li');
    li.className = 'song_card flex items-center justify-between p-2.5 rounded-md hover:bg-spotify-cardHover transition duration-200 cursor-pointer group relative mb-2';

    li.innerHTML = `
        <div class="number w-8 text-center text-sm text-spotify-subdued font-medium"><h3 class="song_number">${index + 1}</h3></div>
        <div class="song_title flex-1 ml-2 overflow-hidden flex justify-between items-center">
          <div class="card_title overflow-hidden flex-1 mr-4">
            <p class="text-sm font-semibold truncate text-white group-hover:text-spotify-green transition">${song.title}</p>
            <div class="playlist_name text-xs text-spotify-subdued truncate mt-1"><p>${song.playlist}</p></div>
          </div>
          <div class="sub_btn mr-2 shrink-0">
            <div class="subplay" style="display: flex;"><i class="fa-regular fa-circle-play text-lg text-spotify-subdued hover:text-white hover:scale-105 transition"></i></div>
            <div class="subpause" style="display: none;"><i class="fa-solid fa-pause text-base text-spotify-green hover:scale-105 transition"></i></div>
          </div>
        </div>
      `;

    const subplayBtn = li.querySelector('.subplay');
    const subpauseBtn = li.querySelector('.subpause');

    li.addEventListener('click', (e) => {
      if (!e.target.closest('.subpause')) {
        setPlayingQueue(dataPlaylist, index);
        playQueueTrack(index);
      }
    });

    subpauseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      pauseSong(subplayBtn, subpauseBtn);
    });

    songsListUl.appendChild(li);
  });
}

function pauseSong(subplayBtn, subpauseBtn) {
  currentAudio.pause();
  if (subplayBtn) subplayBtn.style.display = 'flex';
  if (subpauseBtn) subpauseBtn.style.display = 'none';
}

// ============================================================
// Sidebar / Dashboard Views Toggles
// ============================================================

function showSongsList() {
  mostContainer.style.display = 'none';
  songsListContainer.style.display = 'flex';
}

function showMostContainer() {
  songsListContainer.style.display = 'none';
  mostContainer.style.display = 'flex';
  featureContainer.style.display = 'none';
  searchContainer.style.display = 'none';

  // Show the home grid, hide detail panels
  const playingCard = document.querySelector('.playing_card');
  const galleryDetail = document.querySelector('.Gallery_card_detail');
  if (playingCard) playingCard.style.display = 'flex';
  if (galleryDetail) galleryDetail.style.display = 'none';

  // Restore recently played if it has data
  renderRecentlyPlayed();
}

/** Handles clicking recommendations to play featured items */
function showFeatureSong(song, cardElement, useRandomFromArijit) {
  let trackToPlay;

  if (useRandomFromArijit) {
    trackToPlay = getRandomSong(arijitSinghData);
    setPlayingQueue(arijitSinghData, arijitSinghData.indexOf(trackToPlay));
  } else {
    trackToPlay = song;
    setPlayingQueue(rightListedSongData, rightListedSongData.indexOf(trackToPlay));
  }

  playTrack(trackToPlay);

  // Hide the home grid, show the feature panel
  // NOTE: rightSide (.right) is the parent of featureContainer — never hide the parent!
  const playingCard = document.querySelector('.playing_card');
  const galleryDetail = document.querySelector('.Gallery_card_detail');
  const recentlyPlayed = document.getElementById('recently-played-section');
  if (playingCard) playingCard.style.display = 'none';
  if (galleryDetail) galleryDetail.style.display = 'none';
  if (recentlyPlayed) recentlyPlayed.style.display = 'none';
  searchContainer.style.display = 'none';
  featureContainer.style.display = 'flex';
  setCustomGradient();

  // Set cover art and texts
  const imgSrc = cardElement.querySelector('.image-container img').src;
  const featureSongImg = document.querySelector('.feature_song_img img');
  if (featureSongImg) featureSongImg.src = imgSrc;

  const descriptionContent = cardElement.querySelector(".description").textContent.trim();
  const featureSongTitle = document.querySelector(".feature_song_title h1");
  if (featureSongTitle) featureSongTitle.textContent = descriptionContent;

  catchPlayingSong(trackToPlay, cardElement);
}

function catchPlayingSong(playingSong, songIMG) {
  const getClass = document.querySelector(".recent_playing_song");
  if (!getClass) return;

  const playingSongTitle = getClass.querySelector(".title");
  const playingSongIMG = getClass.querySelector(".details img");
  const playingSongArtist = getClass.querySelector(".artist");
  const playingSongSource = getClass.querySelector(".Source");

  if (playingSongTitle) playingSongTitle.textContent = playingSong.title;
  if (playingSongArtist) playingSongArtist.textContent = songIMG.querySelector(".description").textContent;
  if (playingSongSource) playingSongSource.textContent = playingSong.singer;
  if (playingSongIMG) playingSongIMG.src = songIMG.querySelector(".image-container img").src;
}

// ============================================================
// Event Listeners Registration
// ============================================================

// --- Sidebar Navigation ---
listItems.forEach(li => {
  li.addEventListener('click', showSongsList);
});
homeButton.addEventListener('click', showMostContainer);

// --- Sidebar Playlist click binding ---
listItems.forEach((item, index) => {
  if (index < playlistMap.length) {
    item.addEventListener('click', () => {
      populateSongsList(playlistMap[index]);
    });
  }
});

// --- Playlist categories filter clicks (Dummy badges click toast) ---
const playlistFilters = document.querySelectorAll('.playlist_btn button');
playlistFilters.forEach(btn => {
  btn.addEventListener('click', () => {
    showToast(`Filtering by ${btn.textContent} coming soon!`);
  });
});

// --- Plus Button (Sidebar toast) ---
const plusBtn = document.querySelector('.plus_btn');
if (plusBtn) {
  plusBtn.addEventListener('click', () => {
    showToast('Playlist creation feature is coming in the next release!');
  });
}

// --- Recommendation Cards ---
listRightCard.forEach((cardEl, index) => {
  cardEl.addEventListener('click', () => {
    const isArijitCard = (index === 0 || index === 1 || index === 4 || index === 10);
    if (isArijitCard) {
      showFeatureSong(null, cardEl, true);
    } else {
      showFeatureSong(rightListedSongData[index], cardEl, false);
    }
  });
});

// --- Footer Controls Playback ---
playPauseBtn.addEventListener('click', togglePlayPause);
pauseBtn.addEventListener('click', togglePlayPause);
prevBtn.addEventListener('click', playPrevTrack);
nextBtn.addEventListener('click', playNextTrack);

// --- Seek Progress Bar ---
progressBarContainer.addEventListener('click', (e) => {
  if (!currentAudio.duration) return;
  const barWidth = progressBarContainer.querySelector('.progress-bar').offsetWidth;
  const rect = progressBarContainer.querySelector('.progress-bar').getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const progressPercent = clickX / barWidth;

  currentAudio.currentTime = Math.min(Math.max(progressPercent * currentAudio.duration, 0), currentAudio.duration);
  updateProgressBar();
});

currentAudio.addEventListener('loadedmetadata', () => {
  if (endTime) endTime.textContent = formatTime(currentAudio.duration);
  if (npEndTime) npEndTime.textContent = formatTime(currentAudio.duration);
});

// --- Volume Slider Adjustments ---
if (volumeSlider) {
  volumeSlider.addEventListener('click', (event) => {
    const rect = volumeSlider.getBoundingClientRect();
    const clickedPosition = event.clientX - rect.left;
    const newVolume = Math.min(Math.max(clickedPosition / rect.width, 0), 1);
    currentAudio.volume = newVolume;
    if (volumeBar) volumeBar.style.width = `${newVolume * 100}%`;
  });
}

if (muteButton) {
  muteButton.addEventListener('click', () => {
    if (isMuted) {
      currentAudio.volume = previousVolume;
      muteButton.querySelector('i').className = 'fa-solid fa-volume-high';
    } else {
      previousVolume = currentAudio.volume;
      currentAudio.volume = 0;
      muteButton.querySelector('i').className = 'fa-solid fa-volume-xmark';
    }
    if (volumeBar) volumeBar.style.width = `${currentAudio.volume * 100}%`;
    isMuted = !isMuted;
  });
}

fullscreenBtn.addEventListener('click', () => {
  showToast('Fullscreen lyrics view coming soon!');
});

// --- Search Bar Input Event Bindings ---
searchInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    performSearch();
  }
});
searchButton.addEventListener('click', performSearch);

// --- Gallery Grid Playlist Items ---
galleryItems.forEach(item => {
  item.addEventListener('click', async () => {
    const playingCard = document.querySelector(".playing_card");
    const galleryDetail = document.querySelector(".Gallery_card_detail");

    if (playingCard) playingCard.style.display = "none";
    if (galleryDetail) galleryDetail.style.display = "block";

    const query = item.querySelector('span').textContent;

    // Show inline spinner inside gallery table
    const tbody = document.querySelector('.playlist-table tbody');
    tbody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; padding: 40px 0;">
          <div class="spinner" style="width: 24px; height: 24px;"></div>
          <div style="margin-top: 10px; color: #b3b3b3;">Loading gallery tracks...</div>
        </td>
      </tr>
    `;

    try {
      const videos = await searchYouTube(query, 6, null); // Array of 6 tracks
      if (videos) {
        // Format to play queue schemas
        const tracksList = videos.map(video => ({
          title: video.snippet.title,
          singer: video.snippet.channelTitle,
          playlist: query,
          filePath: `${SERVER_BASE_URL}/audio?url=https://www.youtube.com/watch?v=${video.id.videoId}`
        }));

        tbody.innerHTML = '';
        videos.forEach((video, index) => {
          const tr = document.createElement('tr');
          const publishTime = new Date(video.snippet.publishTime).toLocaleDateString();

          tr.innerHTML = `
            <td>${index + 1}</td>
            <td class="status-col" style="text-align: center;"><i class="fa-solid fa-play" style="color: #b3b3b3;"></i></td>
            <td>
              <div class="song-info1">
                <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.title}" style="width: 48px; height: 48px; border-radius: 4px; object-fit: cover;">
                <span>${video.snippet.title}</span>
              </div>
              <span class="artist" style="display: block; margin-top: 2px;">${video.snippet.channelTitle}</span>
            </td>
            <td>${query}</td>
            <td>${publishTime}</td>
          `;

          tr.addEventListener('click', () => {
            setPlayingQueue(tracksList, index);
            playQueueTrack(index);
          });

          tbody.appendChild(tr);
        });
      }
    } catch (error) {
      console.error('Gallery loading failed:', error);
    }
  });
});

// ============================================================
// Global Keyboard Navigation Shortcuts
// ============================================================
document.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

  switch (e.key) {
    case ' ':
      e.preventDefault();
      togglePlayPause();
      break;
    case 'm':
    case 'M':
      if (muteButton) muteButton.click();
      break;
    case 'ArrowRight':
      if (currentAudio.duration) {
        currentAudio.currentTime = Math.min(currentAudio.currentTime + 5, currentAudio.duration);
      }
      break;
    case 'ArrowLeft':
      currentAudio.currentTime = Math.max(currentAudio.currentTime - 5, 0);
      break;
  }
});

// ============================================================
// Recently Played (localStorage)
// ============================================================

const RECENTLY_PLAYED_KEY = 'spotify_clone_recently_played';
const MAX_RECENT = 6;

function saveRecentlyPlayed(song) {
  try {
    let recent = JSON.parse(localStorage.getItem(RECENTLY_PLAYED_KEY) || '[]');
    // Remove if already exists
    recent = recent.filter(s => s.title !== song.title);
    // Add to front
    recent.unshift({ title: song.title, singer: song.singer, filePath: song.filePath, playlist: song.playlist });
    // Trim to max
    recent = recent.slice(0, MAX_RECENT);
    localStorage.setItem(RECENTLY_PLAYED_KEY, JSON.stringify(recent));
    renderRecentlyPlayed();
  } catch (e) {
    console.warn('Could not save recently played:', e);
  }
}

function renderRecentlyPlayed() {
  const container = document.getElementById('recently-played-section');
  if (!container) return;

  try {
    const recent = JSON.parse(localStorage.getItem(RECENTLY_PLAYED_KEY) || '[]');
    if (recent.length === 0) {
      container.style.display = 'none';
      return;
    }
    container.style.display = 'block';
    const grid = container.querySelector('.recently-played-grid');
    if (!grid) return;

    grid.innerHTML = '';
    recent.forEach((song, index) => {
      const item = document.createElement('div');
      item.className = 'recently-played-item flex items-center gap-3 bg-[#181818] hover:bg-[#282828] rounded-md cursor-pointer transition duration-200 p-3 group overflow-hidden';
      item.innerHTML = `
        <div class="w-10 h-10 rounded bg-[#333] flex items-center justify-center shrink-0">
          <i class="fa-solid fa-music text-spotify-green text-sm"></i>
        </div>
        <div class="overflow-hidden flex-1">
          <p class="text-xs font-semibold text-white truncate">${song.title}</p>
          <p class="text-[10px] text-spotify-subdued truncate">${song.singer}</p>
        </div>
        <div class="opacity-0 group-hover:opacity-100 transition shrink-0">
          <i class="fa-solid fa-play text-xs text-white"></i>
        </div>
      `;
      item.addEventListener('click', () => {
        setPlayingQueue([song], 0);
        playQueueTrack(0);
      });
      grid.appendChild(item);
    });
  } catch (e) {
    console.warn('Could not render recently played:', e);
  }
}

// Initialize recently played section on load
renderRecentlyPlayed();

// ============================================================
// Mobile Drawer Open / Close
// ============================================================

function openDrawer() {
  if (!mobileDrawer || !drawerBackdrop) return;
  mobileDrawer.classList.add('open');
  drawerBackdrop.classList.add('open');
  isDrawerOpen = true;
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  if (!mobileDrawer || !drawerBackdrop) return;
  mobileDrawer.classList.remove('open');
  drawerBackdrop.classList.remove('open');
  isDrawerOpen = false;
  document.body.style.overflow = '';
}

if (hamburgerBtn) hamburgerBtn.addEventListener('click', openDrawer);
if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);
if (mobNavLibrary) mobNavLibrary.addEventListener('click', openDrawer);

// Drawer library items → populate songs list + close drawer
document.querySelectorAll('.drawer-lib-item').forEach((item, index) => {
  item.addEventListener('click', () => {
    if (index < playlistMap.length) {
      populateSongsList(playlistMap[index]);
      showSongsList();
    }
    closeDrawer();
  });
});

// Touch swipe-left to close drawer
let drawerTouchStartX = 0;
if (mobileDrawer) {
  mobileDrawer.addEventListener('touchstart', (e) => {
    drawerTouchStartX = e.touches[0].clientX;
  }, { passive: true });
  mobileDrawer.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - drawerTouchStartX;
    if (dx < -60) closeDrawer(); // swipe left 60px = close
  }, { passive: true });
}

// ============================================================
// Mobile Search Bar Toggle
// ============================================================

function openMobileSearch() {
  if (!mobileSearchBar) return;
  mobileSearchBar.classList.add('open');
  isMobileSearchOpen = true;
  if (mobileInput) mobileInput.focus();
}

function closeMobileSearch() {
  if (!mobileSearchBar) return;
  mobileSearchBar.classList.remove('open');
  isMobileSearchOpen = false;
}

if (mobileSearchToggle) mobileSearchToggle.addEventListener('click', () => {
  isMobileSearchOpen ? closeMobileSearch() : openMobileSearch();
});

// Mobile search bar events (mirrors desktop)
if (mobileInput) {
  mobileInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      if (searchInput) searchInput.value = mobileInput.value;
      closeMobileSearch();
      performSearch();
    }
  });
}
if (mobileSearchBtn) {
  mobileSearchBtn.addEventListener('click', () => {
    if (mobileInput && searchInput) searchInput.value = mobileInput.value;
    closeMobileSearch();
    performSearch();
  });
}

// Mobile home button (in mobile search bar)
if (mobileHomeBtn) mobileHomeBtn.addEventListener('click', () => {
  closeMobileSearch();
  showMostContainer();
  setMobileNavActive(mobNavHome);
});

// ============================================================
// Mobile Bottom Navigation Tab Switching
// ============================================================

function setMobileNavActive(activeBtn) {
  [mobNavHome, mobNavSearch, mobNavLibrary].forEach(btn => {
    if (!btn) return;
    btn.classList.remove('mobile-nav-active');
    btn.querySelector('i')?.classList.remove('text-white');
    btn.querySelector('i')?.classList.add('text-spotify-subdued');
  });
  if (activeBtn) {
    activeBtn.classList.add('mobile-nav-active');
    activeBtn.querySelector('i')?.classList.remove('text-spotify-subdued');
    activeBtn.querySelector('i')?.classList.add('text-white');
  }
}

if (mobNavHome) {
  mobNavHome.addEventListener('click', () => {
    closeMobileSearch();
    closeDrawer();
    showMostContainer();
    setMobileNavActive(mobNavHome);
  });
}

if (mobNavSearch) {
  mobNavSearch.addEventListener('click', () => {
    openMobileSearch();
    setMobileNavActive(mobNavSearch);
  });
}

// ============================================================
// Now Playing Full-Screen Panel (Mobile)
// ============================================================

function openNowPlaying() {
  if (!nowPlayingPanel) return;
  nowPlayingPanel.classList.add('open');
  isNowPlayingOpen = true;
}

function closeNowPlaying() {
  if (!nowPlayingPanel) return;
  nowPlayingPanel.classList.remove('open');
  isNowPlayingOpen = false;
}

// Open: tap mini-player area or expand button
if (miniPlayerInfo) miniPlayerInfo.addEventListener('click', () => {
  if (window.innerWidth < 768) openNowPlaying();
});
if (mobileExpandPlayer) mobileExpandPlayer.addEventListener('click', openNowPlaying);

// Close: tap collapse button
if (npCollapseBtn) npCollapseBtn.addEventListener('click', closeNowPlaying);

// NP panel controls (mirror footer controls)
if (npPlayBtn) npPlayBtn.addEventListener('click', togglePlayPause);
if (npPrevBtn) npPrevBtn.addEventListener('click', playPrevTrack);
if (npNextBtn) npNextBtn.addEventListener('click', playNextTrack);

// NP panel seek bar
if (npProgressBar) {
  npProgressBar.addEventListener('click', (e) => {
    if (!currentAudio.duration) return;
    const rect = npProgressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = Math.min(Math.max(clickX / rect.width, 0), 1);
    currentAudio.currentTime = percent * currentAudio.duration;
    updateProgressBar();
  });
}

// Swipe down to close NP panel
let npTouchStartY = 0;
if (nowPlayingPanel) {
  nowPlayingPanel.addEventListener('touchstart', (e) => {
    npTouchStartY = e.touches[0].clientY;
  }, { passive: true });
  nowPlayingPanel.addEventListener('touchend', (e) => {
    const dy = e.changedTouches[0].clientY - npTouchStartY;
    if (dy > 80) closeNowPlaying(); // swipe down 80px = close
  }, { passive: true });
}

// ============================================================
// Shuffle & Repeat Toggle
// ============================================================

if (shuffleBtn) {
  shuffleBtn.addEventListener('click', () => {
    isShuffleOn = !isShuffleOn;
    shuffleBtn.classList.toggle('active', isShuffleOn);
    showToast(isShuffleOn ? 'Shuffle On' : 'Shuffle Off');
  });
}

if (repeatBtn) {
  repeatBtn.addEventListener('click', () => {
    if (repeatMode === 'off') {
      repeatMode = 'all';
      repeatBtn.classList.add('active');
      showToast('Repeat All On');
    } else if (repeatMode === 'all') {
      repeatMode = 'one';
      repeatBtn.classList.add('active');
      repeatBtn.querySelector('i').className = 'fa-solid fa-repeat-1';
      showToast('Repeat One On');
    } else {
      repeatMode = 'off';
      repeatBtn.classList.remove('active');
      repeatBtn.querySelector('i').className = 'fa-solid fa-repeat';
      showToast('Repeat Off');
    }
  });
}

// Set home tab as active on init
setMobileNavActive(mobNavHome);

