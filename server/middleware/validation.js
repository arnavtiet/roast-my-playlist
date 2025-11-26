// Validate Spotify playlist URL
export function validatePlaylistUrl(req, res, next) {
  const { playlistUrl } = req.body;

  if (!playlistUrl) {
    return res.status(400).json({
      error: 'Playlist URL is required',
      message: 'Please provide a Spotify playlist URL',
    });
  }

  if (typeof playlistUrl !== 'string') {
    return res.status(400).json({
      error: 'Invalid URL format',
      message: 'Playlist URL must be a string',
    });
  }

  // Check if URL is a valid Spotify playlist URL
  const spotifyPattern = /spotify\.com\/playlist\/[a-zA-Z0-9]+|spotify:playlist:[a-zA-Z0-9]+/;
  
  if (!spotifyPattern.test(playlistUrl)) {
    return res.status(400).json({
      error: 'Invalid Spotify URL',
      message: 'Please provide a valid Spotify playlist URL (e.g., https://open.spotify.com/playlist/...)',
    });
  }

  next();
}

export default {
  validatePlaylistUrl,
};
