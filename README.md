# 🔥 Spotify Playlist Roaster

A full-stack web application that uses AI to roast your Spotify music taste. Built with React, Node.js, and Google Gemini AI.

![Project Preview](https://placehold.co/600x400?text=Spotify+Roaster+Preview)

## ✨ Features

- **Spotify Integration**: Extracts playlist details (tracks, artists, genres) from any Spotify link.
- **AI Roasting**: Uses Google Gemini AI to generate witty, sarcastic, and personalized roasts.
- **Roast Intensity Slider**: Choose your pain level from "Mama's Boy" 🥺 to "NUCLEAR" ☢️.
- **Modern UI**: Built with React, Tailwind CSS, and Framer Motion for a slick, animated experience.

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS, shadcn/ui
- **Backend**: Node.js, Express
- **AI**: Google Gemini API
- **API**: Spotify Web API

## 🚀 Getting Started (Local Development)

Follow these steps to run the project on your local machine.

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- A Spotify Developer Account (for API credentials)
- A Google Cloud Account (for Gemini API key)

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/roast-my-playlist.git
cd roast-my-playlist
```

### 2. Install Dependencies

We use a single command to install dependencies for both frontend and backend:

```bash
npm run install-all
```

### 3. Configure Environment Variables

You need to set up environment variables for the server.

1.  Navigate to the `server` directory:
    ```bash
    cd server
    ```
2.  Create a `.env` file (copy from `.env.example`):
    ```bash
    cp .env.example .env
    ```
3.  Fill in your credentials in `.env`:
    ```env
    PORT=3001
    SPOTIFY_CLIENT_ID=your_spotify_client_id
    SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
    GEMINI_API_KEY=your_gemini_api_key
    ```

### 4. Run the Application

From the root directory, start both the frontend and backend with one command:

```bash
npm run dev
```

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3001

## 📦 Building for Production

To build the frontend for production:

```bash
npm run build
```

The build artifacts will be stored in `client/dist`.

## 📤 Uploading to GitHub

If you want to push this project to your own GitHub repository:

1.  **Initialize Git** (if not already done):
    ```bash
    git init
    ```

2.  **Add files**:
    ```bash
    git add .
    ```

3.  **Commit changes**:
    ```bash
    git commit -m "Initial commit: Spotify Playlist Roaster"
    ```

4.  **Add remote repository**:
    *   Create a new repository on GitHub.
    *   Copy the repository URL.
    *   Run:
        ```bash
        git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
        ```

5.  **Push to GitHub**:
    ```bash
    git push -u origin main
    ```

## ☁️ Deployment

This project is configured for easy deployment on **Vercel**.

1.  Push your code to GitHub.
2.  Import the project in Vercel.
3.  Add your environment variables (`SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `GEMINI_API_KEY`) in the Vercel dashboard.
4.  Deploy! Vercel will automatically handle the frontend build and serverless backend functions.

See [DEPLOY.md](./DEPLOY.md) for more detailed deployment instructions.

## 📄 License

MIT
