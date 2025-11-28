// Import Express app from server directory
try {
  var app = await import('../server/index.js').then(m => m.default);
  console.log('✓ Successfully loaded Express app');
} catch (error) {
  console.error('✗ Failed to load Express app:', error);
  throw error;
}

// Export for Vercel serverless
export default app;
