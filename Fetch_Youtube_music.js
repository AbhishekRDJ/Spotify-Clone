/**
 * Fetch_Youtube_music.js
 * Unified YouTube Data API v3 search helper.
 * 
 * Refactored: Merged searchYouTube, searchYouTube2, searchYouTube3, searchYouTube4
 * into a single parameterized function to eliminate code duplication (DRY).
 */

const API_KEY = 'AIzaSyBNBHFwHGLXYRaR0kPDAzQV33UYljdRzzw'; // TODO: Move to backend environment variable
const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

/**
 * Search YouTube for videos matching a song title.
 * @param {string} songTitle - The song title to search for.
 * @param {number} maxResults - Maximum number of results to fetch (default: 3).
 * @param {number|null} returnIndex - If set, returns only the item at this index. If null, returns all items.
 * @returns {Promise<Object|Object[]|null>} - Single video object, array of videos, or null if not found.
 */
export async function searchYouTube(songTitle, maxResults = 3, returnIndex = 0) {
  const params = new URLSearchParams({
    part: 'snippet',
    q: songTitle,
    type: 'video',
    videoCategoryId: '10', // Music category
    maxResults: maxResults,
    key: API_KEY,
  });

  try {
    const response = await fetch(`${BASE_URL}?${params}`);
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      // If returnIndex is null, return the full array (used by gallery)
      if (returnIndex === null) {
        return data.items;
      }
      // Otherwise return the specific item at the requested index
      if (returnIndex < data.items.length) {
        return data.items[returnIndex];
      }
      // Fallback to first result if index is out of bounds
      return data.items[0];
    } else {
      console.error('No videos found for:', songTitle);
      return null;
    }
  } catch (error) {
    console.error('Error fetching data from YouTube API:', error);
    return null;
  }
}

// Legacy named exports for backward compatibility during migration
// These call the unified function with the original behavior

export async function searchYouTube2(songTitle) {
  return searchYouTube(songTitle, 3, 1);
}

export async function searchYouTube3(songTitle) {
  return searchYouTube(songTitle, 3, 2);
}

export async function searchYouTube4(songTitle) {
  return searchYouTube(songTitle, 6, null);
}
