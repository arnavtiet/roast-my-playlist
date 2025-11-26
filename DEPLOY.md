# 🚀 How to Deploy to Vercel

This project is configured as a monorepo (Client + Server) ready for Vercel deployment.

## 1. Push to GitHub
First, make sure your project is pushed to a GitHub repository.

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

## 2. Import to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** -> **"Project"**
3. Import your GitHub repository
4. **Important**: Leave all settings as default - Vercel will use the `vercel.json` configuration

## 3. Configure Environment Variables
In the Vercel project settings, go to **Settings** -> **Environment Variables** and add:

**Required Variables:**
- `SPOTIFY_CLIENT_ID`: Your Spotify Client ID
- `SPOTIFY_CLIENT_SECRET`: Your Spotify Client Secret
- `GEMINI_API_KEY`: Your Gemini API Key
- `NODE_ENV`: Set to `production`

**How to get these:**
- **Spotify**: https://developer.spotify.com/dashboard
- **Gemini API**: https://aistudio.google.com/app/apikey

## 4. Deploy!
Click **Deploy**. Vercel will:
1. Install dependencies for both client and server
2. Build your React frontend (Vite)
3. Set up your Express backend as Serverless Functions
4. Route `/api/*` requests to your backend

## Troubleshooting

### Build fails with "Command exited with 1"
1. Check the build logs in Vercel for specific errors
2. Make sure all environment variables are set
3. Try building locally first: `cd client && npm install && npm run build`
4. Check that `vercel.json` is committed to your repo

### API calls not working
1. Verify environment variables are set in Vercel
2. Check the Functions tab in Vercel to ensure `/api` is deployed
3. Look at the Function logs for backend errors

### CORS errors
The backend is already configured to accept requests from Vercel domains. No changes needed.

## Local Development (Single Command)

To run everything locally with one command:

```bash
# Install all dependencies (first time only)
npm run install-all

# Start both frontend and backend
npm run dev
```

- Frontend: http://localhost:5173 (or 8080)
- Backend: http://localhost:3001
