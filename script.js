/**
 * script.js
 * Main application controller for Spotify Web Clone.
 * 
 * Clean, modular, responsive, state-driven front-end player logic.
 */

import { searchYouTube } from './Fetch_Youtube_music.js';
import {
  likedSongsData, sandeepMaheshwariData, arijitSinghData,
  arijitTopTrackData, sonuNigamData, rightListedSongData, playlistMap
} from './songsData.js';

// ============================================================
// Constants & Configuration
// ============================================================
const SERVER_BASE_URL = `${window.location.protocol}//${window.location.hostname}:5500`;
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
const rightSide = document.querySelector(".right");
const homeButton = document.querySelector('#home_btn');

const musicPlayer = document.querySelector('.music-player');
const songTitleElement = musicPlayer.querySelector('.song-details .title');
const artistElement = musicPlayer.querySelector('.song-details .artist');
const progressBarContainer = musicPlayer.querySelector('.progress-bar-container');
const progressBar = musicPlayer.querySelector('.progress-bar .progress');
const startTime = musicPlayer.querySelector('.progress-bar-container .time:first-child');
const endTime = musicPlayer.querySelector('.progress-bar-container .time:last-child');
const playPauseBtn = musicPlayer.querySelector('#playing'); // Pause icon (active when playing)
const pauseBtn = musicPlayer.querySelector('#pause');       // Play icon (active when paused)
const prevBtn = musicPlayer.querySelector('[aria-label="Previous Track"]');
const nextBtn = musicPlayer.querySelector('[aria-label="Next Track"]');

const volumeSlider = document.querySelector('.volume-slider');
const volumeBar = volumeSlider.querySelector('.volume');
const muteButton = document.querySelector('.settings button:first-child');
const fullscreenBtn = document.querySelector('.settings button:last-child');

const searchContainer = document.querySelector('.search_SONG_Container');
const searchResultsBody = document.getElementById('searchResultsBody');
const searchInput = document.getElementById('input');
const searchButton = document.getElementById('searchButton');

const gallery = document.querySelector('.playlist');
const galleryItems = gallery.querySelectorAll('.playlist_item');

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

// Set default volume
currentAudio.volume = 0.5;
volumeBar.style.width = `${currentAudio.volume * 100}%`;

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
  startTime.textContent = formatTime(0);
  progressBar.style.width = '0%';

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
    startTime.textContent = formatTime(currentAudio.currentTime);
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
  let nextIndex = queueIndex + 1;
  if (nextIndex >= playbackQueue.length) {
    nextIndex = 0; // Loop back to start
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
    tr.style.cursor = 'pointer';
    
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>
        <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.title}" style="width: 48px; height: 48px; border-radius: 4px; object-fit: cover;">
      </td>
      <td>
        <div class="song-info1">
          <span style="font-weight: 500; color: #fff;">${video.snippet.title}</span>
        </div>
      </td>
      <td style="color: #b3b3b3;">${video.snippet.channelTitle}</td>
      <td class="status-col" style="text-align: center;">
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

  // Toggle views
  rightSide.style.display = "none";
  featureContainer.style.display = "none";
  searchContainer.style.display = "flex";

  // Show inline loader
  searchResultsBody.innerHTML = `
    <tr>
      <td colspan="5" style="text-align: center; padding: 50px 0;">
        <div class="spinner" style="width: 32px; height: 32px;"></div>
        <div style="margin-top: 15px; color: var(--text-secondary); font-size: 14px;">Searching YouTube database...</div>
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
          <td colspan="5" style="text-align: center; color: var(--text-secondary); padding: 50px 0;">
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
    li.classList.add('song_card');

    li.innerHTML = `
        <div class="number"><h3 class="song_number">${index + 1}</h3></div>
        <div class="song_title">
          <div class="card_title">
            <p>${song.title}</p>
            <div class="playlist_name"><p>${song.playlist}</p></div>
          </div>
          <div class="sub_btn">
            <div class="subplay" style="display: flex;"><i class="fa-regular fa-circle-play"></i></div>
            <div class="subpause" style="display: none;"><i class="fa-solid fa-pause"></i></div>
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
  rightSide.style.display = 'flex';
  searchContainer.style.display = "none";
  
  // Collapse detail tables
  const playingCard = document.querySelector('.playing_card');
  const galleryDetail = document.querySelector('.Gallery_card_detail');
  if (playingCard) playingCard.style.display = "flex";
  if (galleryDetail) galleryDetail.style.display = "none";
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

  rightSide.style.display = 'none';
  featureContainer.style.display = "flex";
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

// --- Volume Slider Adjustments ---
volumeSlider.addEventListener('click', (event) => {
  const rect = volumeSlider.getBoundingClientRect();
  const clickedPosition = event.clientX - rect.left;
  const newVolume = Math.min(Math.max(clickedPosition / rect.width, 0), 1);
  currentAudio.volume = newVolume;
  volumeBar.style.width = `${newVolume * 100}%`;
});

muteButton.addEventListener('click', () => {
  if (isMuted) {
    currentAudio.volume = previousVolume;
    muteButton.textContent = '🔊';
  } else {
    previousVolume = currentAudio.volume;
    currentAudio.volume = 0;
    muteButton.textContent = '🔈';
  }
  volumeBar.style.width = `${currentAudio.volume * 100}%`;
  isMuted = !isMuted;
});

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
      muteButton.click();
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
