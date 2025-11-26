import express from 'express';
import { getPlaylistDetails } from '../services/spotifyService.js';
import { generateRoast } from '../services/roastService.js';
import { validatePlaylistUrl } from '../middleware/validation.js';

const router = express.Router();

// POST /api/roast - Roast a Spotify playlist
router.post('/roast', validatePlaylistUrl, async (req, res) => {
  try {
    const { playlistUrl, roastLevel = 'medium' } = req.body;

    console.log(`🎵 Fetching playlist: ${playlistUrl}`);
    console.log(`🔥 Roast level: ${roastLevel}`);

    // Step 1: Get playlist details from Spotify
    const playlistData = await getPlaylistDetails(playlistUrl);
    
    console.log(`✅ Playlist fetched: "${playlistData.name}" (${playlistData.totalTracks} tracks)`);

    // Step 2: Generate AI roast with specified intensity
    console.log('🤖 Generating roast...');
    const roast = await generateRoast(playlistData, roastLevel);

    console.log('✅ Roast generated successfully');

    // Return the roast
    res.json({
      success: true,
      roast,
      playlistInfo: {
        name: playlistData.name,
        totalTracks: playlistData.totalTracks,
        imageUrl: playlistData.imageUrl,
      },
    });
  } catch (error) {
    console.error('❌ Error processing roast request:', error.message);

    // Handle specific errors
    if (error.message === 'Invalid Spotify playlist URL') {
      return res.status(400).json({
        error: 'Invalid URL',
        message: error.message,
      });
    }

    if (error.message.includes('Spotify')) {
      return res.status(500).json({
        error: 'Spotify API Error',
        message: 'Failed to fetch playlist from Spotify. Please check the URL and try again.',
      });
    }

    // Generic error
    res.status(500).json({
      error: 'Server Error',
      message: 'An error occurred while roasting your playlist. Please try again.',
    });
  }
});

export default router;
