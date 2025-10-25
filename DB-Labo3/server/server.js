const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const cors = require('cors');
const path = require('path');
const redis = require('redis');
const neo4j = require('neo4j-driver');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Configuration
const PORT = 3000;
const RATE_LIMIT = 10; // requests per minute
const WINDOW_SIZE = 60; // seconds

// Redis client
const redisClient = redis.createClient({
  url: 'redis://localhost:6379'
});

// Neo4j driver
const neo4jDriver = neo4j.driver(
  'bolt://localhost:7687',
  neo4j.auth.basic('neo4j', 'password')
);

// Initialize connections
async function initializeConnections() {
  try {
    await redisClient.connect();
    console.log('✅ Connected to Redis');
    
    const session = neo4jDriver.session();
    await session.run('RETURN 1');
    await session.close();
    console.log('✅ Connected to Neo4j');
    
    return true;
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    return false;
  }
}

// Rate limiting with Redis sliding window
async function checkRateLimit(clientId) {
  const key = `rate_limit:${clientId}`;
  const now = Date.now();
  const windowStart = now - (WINDOW_SIZE * 1000);
  
  try {
    // Remove old entries
    await redisClient.zRemRangeByScore(key, 0, windowStart);
    
    // Count current requests
    const requestCount = await redisClient.zCard(key);
    
    if (requestCount >= RATE_LIMIT) {
      return false; // Rate limit exceeded
    }
    
    // Add current request
    await redisClient.zAdd(key, { score: now, value: now.toString() });
    await redisClient.expire(key, WINDOW_SIZE);
    
    return true; // Request allowed
  } catch (error) {
    console.error('Redis error:', error);
    return true; // Allow request on Redis error
  }
}

// Get movies from Neo4j
async function getMovies(query = '') {
  const session = neo4jDriver.session();
  try {
    let cypher = 'MATCH (m:Movie) RETURN m.title as title, m.released as released, m.tagline as tagline ORDER BY m.title LIMIT 20';
    
    if (query) {
      cypher = `MATCH (m:Movie) WHERE toLower(m.title) CONTAINS toLower($query) 
                RETURN m.title as title, m.released as released, m.tagline as tagline 
                ORDER BY m.title LIMIT 20`;
    }
    
    const result = await session.run(cypher, { query });
    return result.records.map(record => ({
      title: record.get('title'),
      released: record.get('released')?.toNumber() || null,
      tagline: record.get('tagline')
    }));
  } catch (error) {
    console.error('Neo4j query error:', error);
    return [];
  } finally {
    await session.close();
  }
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client')));

// WebSocket connection handling
wss.on('connection', (ws, req) => {
  const clientId = req.socket.remoteAddress + ':' + req.socket.remotePort;
  console.log(`🔌 WebSocket client connected: ${clientId}`);
  
  ws.on('message', async (data) => {
    try {
      const message = data.toString();
      console.log(`📨 Received from ${clientId}: ${message}`);
      
      // Check rate limit
      const allowed = await checkRateLimit(clientId);
      if (!allowed) {
        ws.send(JSON.stringify({
          error: 'Too Many Requests',
          message: 'Rate limit exceeded (10 requests/minute). Please try again later.'
        }));
        return;
      }
      
      // Parse request
      let request;
      try {
        request = JSON.parse(message);
      } catch {
        request = { action: 'getMovies', query: message };
      }
      
      // Handle different actions
      let response;
      switch (request.action) {
        case 'getMovies':
          const movies = await getMovies(request.query);
          response = { success: true, data: movies, count: movies.length };
          break;
        default:
          response = { error: 'Unknown action' };
      }
      
      ws.send(JSON.stringify(response));
      
    } catch (error) {
      console.error(`❌ Error handling client ${clientId}:`, error);
      ws.send(JSON.stringify({
        error: 'Server error',
        message: error.message
      }));
    }
  });
  
  ws.on('close', () => {
    console.log(`🔌 WebSocket client disconnected: ${clientId}`);
  });
  
  ws.on('error', (error) => {
    console.error(`❌ WebSocket error for ${clientId}:`, error);
  });
});

// REST API endpoints
app.get('/api/movies', async (req, res) => {
  const clientId = req.ip;
  
  try {
    // Check rate limit
    const allowed = await checkRateLimit(clientId);
    if (!allowed) {
      return res.status(429).json({
        error: 'Too Many Requests',
        message: 'Rate limit exceeded (10 requests/minute). Please try again later.'
      });
    }
    
    const query = req.query.q || '';
    const movies = await getMovies(query);
    res.json({ success: true, data: movies, count: movies.length });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    // Check Redis
    await redisClient.ping();
    
    // Check Neo4j
    const session = neo4jDriver.session();
    await session.run('RETURN 1');
    await session.close();
    
    res.json({ 
      status: 'healthy', 
      redis: 'connected', 
      neo4j: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'unhealthy', 
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Serve main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// Start server
async function startServer() {
  const connected = await initializeConnections();
  
  if (!connected) {
    console.log('\n❌ Failed to connect to databases. Please ensure Redis and Neo4j are running:');
    console.log('Redis: redis-server (default port 6379)');
    console.log('Neo4j: neo4j start (default port 7687)');
    console.log('Or use Docker: docker-compose up -d\n');
    process.exit(1);
  }
  
  server.listen(PORT, () => {
    console.log(`\n🚀 Server running at http://localhost:${PORT}`);
    console.log(`🔌 WebSocket server running on ws://localhost:${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health\n`);
  });
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down server...');
  server.close();
  try {
    await redisClient.quit();
    await neo4jDriver.close();
  } catch (error) {
    console.error('Error during shutdown:', error);
  }
  process.exit(0);
});

startServer().catch(console.error);