# 🎵 Spotify Playlist Roaster - Quick Start Guide

## What You Need Before Starting

### 1. Spotify Developer Credentials
- Go to: https://developer.spotify.com/dashboard
- Create an app and get your **Client ID** and **Client Secret**

### 2. Gemini API Key
- Go to: https://makersuite.google.com/app/apikey
- Create an API key (it's free!)

---

## Setup (5 minutes)

### Step 1: Configure Backend

```bash
# Navigate to server folder
cd server

# Create environment file
copy .env.example .env
```

Now edit the `.env` file and add your credentials:
```env
SPOTIFY_CLIENT_ID=paste_your_client_id_here
SPOTIFY_CLIENT_SECRET=paste_your_client_secret_here
GEMINI_API_KEY=paste_your_gemini_key_here
PORT=3001
NODE_ENV=development
```

### Step 2: Start Backend Server

```bash
# Still in /server folder
npm start
```

You should see:
```
🚀 Server running on http://localhost:3001
📊 Health check: http://localhost:3001/health
🎵 Roast endpoint: http://localhost:3001/api/roast
```

### Step 3: Start Frontend (New Terminal)

```bash
# Navigate to client folder
cd client

# Start development server
npm run dev
```

The app will open at: **http://localhost:8080**

---

## Test It Out!

1. Open http://localhost:8080 in your browser
2. Paste a Spotify playlist URL, for example:
   ```
   https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M
   ```
3. Click "Roast My Playlist" 🔥
4. Watch the AI roast your music taste! 💀

---

## Troubleshooting

**"Missing environment variables" warning?**
- Make sure you created `.env` file in `/server` folder
- Check that all three credentials are filled in

**Server won't start?**
- Make sure port 3001 is not already in use
- Verify your Spotify credentials are correct

**Frontend can't connect?**
- Make sure backend server is running first
- Check that it's on port 3001

**Need help?**
- Check the full documentation in `/server/README.md`
- Review the walkthrough artifact for detailed information

---

## You're All Set! 🎉

The app is ready to roast some playlists. Have fun! 🔥💀😭
