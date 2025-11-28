import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import roastRoutes from './routes/roast.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? '*' 
    : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000', 'http://localhost:8080'],
  credentials: process.env.NODE_ENV !== 'production',
}));
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log('Full URL:', req.url);
  console.log('Original URL:', req.originalUrl);
  console.log('Base URL:', req.baseUrl);
  next();
});

// Routes
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Spotify Playlist Roaster API is running',
    timestamp: new Date().toISOString(),
  });
});

app.use('/', roastRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} not found`,
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
  });
});

// Start server if not running in Vercel/Serverless environment
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`\n🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
    console.log(`🎵 Roast endpoint: http://localhost:${PORT}/api/roast\n`);
    
    // Check for required environment variables
    const requiredEnvVars = ['SPOTIFY_CLIENT_ID', 'SPOTIFY_CLIENT_SECRET', 'GEMINI_API_KEY'];
    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
      console.warn('⚠️  WARNING: Missing environment variables:');
      missingVars.forEach(varName => console.warn(`   - ${varName}`));
      console.warn('   Please create a .env file based on .env.example\n');
    }
  });
}

export default app;
