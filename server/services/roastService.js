import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

// Generate a roast based on playlist data and intensity level
export async function generateRoast(playlistData, roastLevel = 'medium') {
  try {
    const { name, tracks, genres, totalTracks, owner } = playlistData;

    // Analyze playlist characteristics
    const topArtists = getTopArtists(tracks);
    const avgPopularity = calculateAveragePopularity(tracks);
    const yearRange = getYearRange(tracks);
    const trackNames = tracks.slice(0, 10).map(t => t.name);

    // Get level-specific instructions
    const levelInstructions = getRoastLevelInstructions(roastLevel);

    // Create a detailed prompt for the AI
    const prompt = `You are a witty, sarcastic Gen-Z music critic who roasts people's Spotify playlists with humor and no filter. 

Analyze this playlist and create a ${levelInstructions.intensity} roast:

Playlist Name: "${name}"
Owner: ${owner}
Total Tracks: ${totalTracks}
Genres: ${genres.slice(0, 10).join(', ') || 'unknown'}
Top Artists: ${topArtists.join(', ')}
Sample Track Names: ${trackNames.join(', ')}
Average Popularity: ${avgPopularity}/100
Year Range: ${yearRange}

${levelInstructions.guidelines}

Generate ONE unique roast now:`;

    const result = await model.generateContent(prompt);
    const roast = result.response.text().trim();

    return roast;
  } catch (error) {
    console.error('Error generating roast:', error.message);
    throw new Error('Failed to generate roast');
  }
}

// Get roast level specific instructions
function getRoastLevelInstructions(level) {
  const levels = {
    soft: {
      intensity: 'GENTLE and WHOLESOME',
      guidelines: `Guidelines for the roast:
- Be sweet and encouraging while gently teasing
- Use cute emojis (🥺, 💙, ✨, 🌸, etc.)
- Compliment their music taste while making light observations
- Keep it playful like talking to a friend
- 2-3 sentences max
- Example tone: "aww bestie your playlist is actually kinda cute 🥺 like yeah it's basic but in a cozy way. we love a safe music taste, no risks taken here 💙"`
    },
    medium: {
      intensity: 'PLAYFUL BANTER',
      guidelines: `Guidelines for the roast:
- Use Gen-Z slang and emojis (💀, 😭, 🫠, ✨, etc.)
- Be playful and humorous, not genuinely mean
- Reference specific patterns you notice (genres, artists, track names, eras)
- Keep it 2-4 sentences max
- Make observations about their music taste, personality, or life choices based on the playlist
- Use phrases like "bestie", "nah fam", "not the...", "the way...", "tell me why..."
- Add artist-specific references (e.g., comparing the user to the vibe/style/chaos of their top artists)
- Add language-specific jokes based on the languages of songs (Hindi, Punjabi, English, Spanish, Korean, etc.) without being offensive
- Add country/region-based humor depending on where the artists are from (India, US, UK, Korea, Latin America, etc.)
- If the playlist has a mix of languages/countries, joke about the user having a personality crisis or being an "international satellite"
- If certain artists dominate the playlist, call out their spiritual chokehold on the user
- If the playlist has culturally mismatched combos (like K-pop + Punjabi + 80s rock), highlight the chaos
- If lyrics are known to be toxic, sad, or delusional, reference that in the roast`
    },
    spicy: {
      intensity: 'NO MERCY MODE',
      guidelines: `Guidelines for the roast:
- Go HARD with the roast, be savage but still funny
- Use intense emojis (🔥, 💀, ☠️, 😬, 🚨, etc.)
- Call out every questionable choice
- Reference specific cringe patterns
- 3-5 sentences of pure roasting
- Be brutally honest about their music taste
- Use phrases like "YIKES", "the audacity", "absolutely unhinged", "seek help"
- Drag their entire personality based on the playlist
- Compare them to embarrassing stereotypes
- Point out if they're stuck in a specific era and roast them for it
- If they have sad songs, question their emotional stability
- If they have party songs, question their life choices
- Make it HURT (but keep it about music taste only)`
    },
    nuclear: {
      intensity: 'EMOTIONAL DAMAGE ☢️',
      guidelines: `Guidelines for the roast:
- ABSOLUTELY DESTROY their music taste with maximum savagery
- Use nuclear emojis (☢️, 💀, ⚰️, 🪦, 🔥, 💣, etc.)
- This is SCORCHED EARTH roasting
- 4-6 sentences of pure devastation
- Question their entire existence based on this playlist
- Be RUTHLESSLY creative and specific
- Use phrases like "JAIL", "CRIMINAL", "UNFORGIVABLE", "therapy can't fix this"
- Compare their playlist to actual disasters
- Suggest they delete their account
- Make connections between their music taste and their life failures
- If they listen to breakup songs, assume they caused all their breakups
- If they have motivational music, mock them for needing it
- Psychoanalyze them based on their music choices
- End with something absolutely devastating
- NO HOLDING BACK - this is what they asked for`
    }
  };

  return levels[level] || levels.medium;
}

// Helper function to get top artists
function getTopArtists(tracks) {
  const artistCounts = {};
  
  tracks.forEach(track => {
    track.artists.forEach(artist => {
      artistCounts[artist] = (artistCounts[artist] || 0) + 1;
    });
  });

  return Object.entries(artistCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([artist]) => artist);
}

// Helper function to calculate average popularity
function calculateAveragePopularity(tracks) {
  if (tracks.length === 0) return 0;
  const sum = tracks.reduce((acc, track) => acc + track.popularity, 0);
  return Math.round(sum / tracks.length);
}

// Helper function to get year range
function getYearRange(tracks) {
  const years = tracks
    .map(track => {
      const year = track.releaseDate?.split('-')[0];
      return year ? parseInt(year) : null;
    })
    .filter(Boolean);

  if (years.length === 0) return 'Unknown era';

  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);

  if (minYear === maxYear) return `${minYear}`;
  return `${minYear}-${maxYear}`;
}

export default {
  generateRoast,
};
