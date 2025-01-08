const clientId = '3aa936805edc4f62aba6fb2db003e080';
const clientSecret = '370833d8fabe42ff8f4c3828b9ed36af';
let accessToken;

// Get the access token
export async function getAccessToken() {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${btoa(clientId + ':' + clientSecret)}`
        },
        body: 'grant_type=client_credentials'
    });

    const data = await response.json();
    accessToken = data.access_token;
}

// Search for songs
export async function searchSong(query) {
    if (!accessToken) {
        await getAccessToken();
    }

    const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=10`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const data = await response.json();
    return data.tracks.items;
}
