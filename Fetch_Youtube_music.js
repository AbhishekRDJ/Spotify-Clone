/**
 * Fetch_Youtube_music.js
 * YouTube search helper — uses backend proxy to keep API key secure.
 *
 * The API key is NO LONGER in this file. All requests go through:
 *   GET /api/search?q=<query>&maxResults=<n>
 * which is handled by server.js using a secret environment variable.
 */

// Auto-detect backend URL: use same origin in production, fallback to localhost in dev
const BACKEND_BASE_URL = (() => {
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return `${window.location.protocol}//${window.location.hostname}:5500`;
  }
  // In production (Vercel/Railway), use relative URL if frontend & backend are on same domain
  // OR set this to your deployed backend URL, e.g.: 'https://spotify-clone.railway.app'
  return window.location.origin;
})();

/**
 * Search YouTube for videos matching a song title via the backend proxy.
 * @param {string} songTitle - The song title to search for.
 * @param {number} maxResults - Maximum number of results to fetch (default: 3).
 * @param {number|null} returnIndex - If set, returns only the item at this index. If null, returns all items.
 * @returns {Promise<Object|Object[]|null>} - Single video object, array of videos, or null if not found.
 */
export async function searchYouTube(songTitle, maxResults = 3, returnIndex = 0) {
  try {
    const params = new URLSearchParams({
      q: songTitle,
      maxResults: maxResults,
    });

    const response = await fetch(`${BACKEND_BASE_URL}/api/search?${params}`);

    if (!response.ok) {
      const errText = await response.text();
      console.error(`Search API error ${response.status}:`, errText);
      return null;
    }

    const data = await response.json();

    if (data.items && data.items.length > 0) {
      if (returnIndex === null) {
        return data.items;
      }
      if (returnIndex < data.items.length) {
        return data.items[returnIndex];
      }
      return data.items[0];
    } else {
      console.error('No videos found for:', songTitle);
      return null;
    }
  } catch (error) {
    console.error('Error fetching from search proxy:', error);
    return null;
  }
}

// Legacy named exports for backward compatibility
export async function searchYouTube2(songTitle) {
  return searchYouTube(songTitle, 3, 1);
}

export async function searchYouTube3(songTitle) {
  return searchYouTube(songTitle, 3, 2);
}

export async function searchYouTube4(songTitle) {
  return searchYouTube(songTitle, 6, null);
}
