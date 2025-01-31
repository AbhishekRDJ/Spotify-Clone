export async function searchYouTube(songTitle) {
  const apiKey = 'AIzaSyBNBHFwHGLXYRaR0kPDAzQV33UYljdRzzw'; // Replace with your actual API key
  const baseURL = 'https://www.googleapis.com/youtube/v3/search';

  const params = new URLSearchParams({
    part: 'snippet',
    q: songTitle, // The song title to search for
    type: 'video', // Only return videos
    videoCategoryId: '10', // Music category
    maxResults: 3, // Limit to one result
    key: apiKey,
  });

  try {
    const response = await fetch(`${baseURL}?${params}`);
    const data = await response.json();
    console.log(data)
    if (data.items && data.items.length > 0) {
      return data.items[0]; // Return the first video result
    } else {
      console.error('No videos found.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching data from YouTube API:', error);
  }
}

export async function searchYouTube2(songTitle) {
  const apiKey = 'AIzaSyBNBHFwHGLXYRaR0kPDAzQV33UYljdRzzw'; // Replace with your actual API key
  const baseURL = 'https://www.googleapis.com/youtube/v3/search';

  const params = new URLSearchParams({
    part: 'snippet',
    q: songTitle, // The song title to search for
    type: 'video', // Only return videos
    videoCategoryId: '10', // Music category
    maxResults: 3, // Limit to one result
    key: apiKey,
  });

  try {
    const response = await fetch(`${baseURL}?${params}`);
    const data = await response.json();
    console.log(data)
    if (data.items && data.items.length > 0) {
      return data.items[1]; // Return the second video result
    } else {
      console.error('No videos found.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching data from YouTube API:', error);
  }
}

export async function searchYouTube3(songTitle) {
  const apiKey = 'AIzaSyBNBHFwHGLXYRaR0kPDAzQV33UYljdRzzw'; // Replace with your actual API key
  const baseURL = 'https://www.googleapis.com/youtube/v3/search';

  const params = new URLSearchParams({
    part: 'snippet',
    q: songTitle, // The song title to search for
    type: 'video', // Only return videos
    videoCategoryId: '10', // Music category
    maxResults: 3, // Limit to one result
    key: apiKey,
  });

  try {
    const response = await fetch(`${baseURL}?${params}`);
    const data = await response.json();
    console.log(data)
    if (data.items && data.items.length > 0) {
      return data.items[2]; // Return the third video result
    } else {
      console.error('No videos found.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching data from YouTube API:', error);
  }
}


export async function searchYouTube4(songTitle) {
  const apiKey = 'AIzaSyBNBHFwHGLXYRaR0kPDAzQV33UYljdRzzw'; // Replace with your actual API key
  const baseURL = 'https://www.googleapis.com/youtube/v3/search';

  const params = new URLSearchParams({
    part: 'snippet',
    q: songTitle, // The song title to search for
    type: 'video', // Only return videos
    videoCategoryId: '10', // Music category
    maxResults: 6, // Limit to one result
    key: apiKey,
  });

  try {
    const response = await fetch(`${baseURL}?${params}`);
    const data = await response.json();
    console.log(data)
    if (data.items && data.items.length > 0) {
      return data.items; // Return the third video result
    } else {
      console.error('No videos found.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching data from YouTube API:', error);
  }
}
