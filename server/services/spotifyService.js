import SpotifyWebApi from 'spotify-web-api-node';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Spotify API client
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

// Track authentication state
let tokenExpiresAt = 0;

// Authenticate with Spotify using client credentials
async function authenticate() {
  try {
    const data = await spotifyApi.clientCredentialsGrant();
    spotifyApi.setAccessToken(data.body['access_token']);
    
    // Store when token expires (in milliseconds)
    tokenExpiresAt = Date.now() + (data.body['expires_in'] * 1000);
    
    console.log('✅ Spotify API authenticated successfully');
    return true;
  } catch (error) {
    console.error('❌ Error authenticating with Spotify:', error.message);
    throw error;
  }
}

// Ensure we have a valid token
async function ensureAuthenticated() {
  // If token doesn't exist or is about to expire (within 5 minutes), refresh it
  if (!tokenExpiresAt || Date.now() >= (tokenExpiresAt - 5 * 60 * 1000)) {
    await authenticate();
  }
}

// Extract playlist ID from Spotify URL
function extractPlaylistId(url) {
  const patterns = [
    /spotify\.com\/playlist\/([a-zA-Z0-9]+)/,
    /spotify:playlist:([a-zA-Z0-9]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  throw new Error('Invalid Spotify playlist URL');
}

// Get playlist details and tracks
export async function getPlaylistDetails(playlistUrl) {
  try {
    // Ensure we have a valid Spotify token
    await ensureAuthenticated();
    
    const playlistId = extractPlaylistId(playlistUrl);
    
    // Get playlist information
    const playlistData = await spotifyApi.getPlaylist(playlistId);
    const playlist = playlistData.body;

    // Extract track details
    const tracks = playlist.tracks.items.map(item => {
      const track = item.track;
      return {
        name: track.name,
        artists: track.artists.map(artist => artist.name),
        popularity: track.popularity,
        album: track.album.name,
        releaseDate: track.album.release_date,
      };
    });

    // Get unique artists for genre analysis
    const artistIds = [...new Set(
      playlist.tracks.items
        .flatMap(item => item.track.artists.map(artist => artist.id))
        .filter(Boolean)
    )].slice(0, 50); // Spotify API limit

    let genres = [];
    if (artistIds.length > 0) {
      const artistsData = await spotifyApi.getArtists(artistIds);
      genres = [...new Set(
        artistsData.body.artists.flatMap(artist => artist.genres)
      )];
    }

    return {
      name: playlist.name,
      description: playlist.description,
      totalTracks: playlist.tracks.total,
      followers: playlist.followers.total,
      owner: playlist.owner.display_name,
      tracks,
      genres,
      imageUrl: playlist.images[0]?.url,
    };
  } catch (error) {
    if (error.message === 'Invalid Spotify playlist URL') {
      throw error;
    }
    console.error('Error fetching playlist:', error.message);
    throw new Error('Failed to fetch playlist details from Spotify');
  }
}

export default {
  getPlaylistDetails,
};
