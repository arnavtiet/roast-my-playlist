# Spotify Playlist Roaster - Backend Server

Backend API for the Spotify Playlist Roaster application. Extracts playlist details from Spotify and generates humorous AI-powered roasts.

## Features

- 🎵 Spotify Web API integration
- 🤖 AI-powered roast generation using Google Gemini
- 🔥 Gen-Z style humor with emojis
- ✅ Input validation and error handling
- 🚀 RESTful API design

## Prerequisites

- Node.js 18+ installed
- Spotify Developer Account
- Google Gemini API Key

## Setup Instructions

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Get Spotify API Credentials

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in or create an account
3. Click "Create App"
4. Fill in app details:
   - App name: "Playlist Roaster" (or any name)
   - App description: "AI-powered playlist roaster"
   - Redirect URI: `http://localhost:3001` (not used but required)
5. Accept terms and create
6. Copy your **Client ID** and **Client Secret**

### 3. Get Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### 4. Configure Environment Variables

Create a `.env` file in the server directory:

```bash
cp .env.example .env
```

Edit `.env` and add your credentials:

```env
SPOTIFY_CLIENT_ID=your_spotify_client_id_here
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret_here
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3001
NODE_ENV=development
```

### 5. Start the Server

```bash
npm start
```

For development with auto-reload:

```bash
npm run dev
```

The server will start on `http://localhost:3001`

## API Endpoints

### Health Check

```
GET /health
```

Returns server status.

**Response:**
```json
{
  "status": "ok",
  "message": "Spotify Playlist Roaster API is running",
  "timestamp": "2025-11-26T08:30:00.000Z"
}
```

### Roast Playlist

```
POST /api/roast
```

Generates a roast for a Spotify playlist.

**Request Body:**
```json
{
  "playlistUrl": "https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "roast": "bestie... your playlist screams 'I discovered music in 2019 and never evolved' 💀",
  "playlistInfo": {
    "name": "Today's Top Hits",
    "totalTracks": 50,
    "imageUrl": "https://..."
  }
}
```

**Error Response (400/500):**
```json
{
  "error": "Invalid URL",
  "message": "Please provide a valid Spotify playlist URL"
}
```

## Project Structure

```
server/
├── index.js                 # Main Express server
├── routes/
│   └── roast.js            # API routes
├── services/
│   ├── spotifyService.js   # Spotify API integration
│   └── roastService.js     # AI roast generation
├── middleware/
│   └── validation.js       # Request validation
├── package.json
├── .env.example
└── README.md
```

## Error Handling

The API handles various error scenarios:

- Invalid Spotify URL format
- Playlist not found
- Spotify API rate limits
- AI generation failures
- Missing environment variables

## Development

The server uses ES modules (`type: "module"` in package.json). All imports use `.js` extensions.

### Testing the API

Using curl:

```bash
curl -X POST http://localhost:3001/api/roast \
  -H "Content-Type: application/json" \
  -d '{"playlistUrl": "https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M"}'
```

## Notes

- The Spotify API uses client credentials flow (no user authentication required)
- Access tokens are automatically refreshed every hour
- The AI generates unique roasts based on playlist characteristics
- CORS is configured to allow requests from the frontend dev server

## Troubleshooting

**"Missing environment variables" warning:**
- Make sure you created `.env` file with all required variables

**"Error authenticating with Spotify":**
- Verify your Spotify Client ID and Secret are correct
- Check if your Spotify app is active in the dashboard

**"Failed to generate roast":**
- Verify your Gemini API key is valid
- Check if you have API quota remaining

## License

MIT
