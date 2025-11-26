# 🚀 How to Deploy to Vercel

This project is configured as a monorepo (Client + Server) ready for Vercel deployment.

## 1. Push to GitHub
First, make sure your project is pushed to a GitHub repository.

```bash
git init
git add .
git commit -m "Initial commit"
# Add your remote origin
# git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

## 2. Import to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** -> **"Project"**
3. Import your GitHub repository
4. Vercel should auto-detect the settings from `vercel.json`

## 3. Configure Environment Variables
In the Vercel project settings, go to **Settings** -> **Environment Variables** and add:

- `SPOTIFY_CLIENT_ID`: Your Spotify Client ID
- `SPOTIFY_CLIENT_SECRET`: Your Spotify Client Secret
- `GEMINI_API_KEY`: Your Gemini API Key

## 4. Deploy!
Click **Deploy**. Vercel will:
1. Build your React frontend (Vite)
2. Set up your Express backend as Serverless Functions
3. Route `/api/*` requests to your backend

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
