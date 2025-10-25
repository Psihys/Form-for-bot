const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Configuration
const PORT = 3000;
const RATE_LIMIT = 10;
const WINDOW_SIZE = 60 * 1000;

// In-memory storage (simulating Redis and Neo4j)
const rateLimitStore = new Map();
const movieDatabase = [
  { title: "The Matrix", released: 1999, tagline: "Welcome to the Real World" },
  { title: "The Matrix Reloaded", released: 2003, tagline: "Free your mind" },
  { title: "The Matrix Revolutions", released: 2003, tagline: "Everything that has a beginning has an end" },
  { title: "John Wick", released: 2014, tagline: "Don't set him off" },
  { title: "John Wick: Chapter 2", released: 2017, tagline: "Never stab the devil in the back" },
  { title: "Speed", released: 1994, tagline: "Get ready for rush hour" },
  { title: "Point Break", released: 1991, tagline: "100% pure adrenaline" },
  { title: "The Devil's Advocate", released: 1997, tagline: "Evil has its winning ways" },
  { title: "Constantine", released: 2005, tagline: "Hell wants him. Heaven won't take him. Earth needs him." },
  { title: "Bill & Ted's Excellent Adventure", released: 1989, tagline: "History is about to be rewritten by two guys who can't spell." }
];

// Rate limiting (simulating Redis)
function checkRateLimit(clientId) {
  const now = Date.now();
  const windowStart = now - WINDOW_SIZE;
  
  if (!rateLimitStore.has(clientId)) {
    rateLimitStore.set(clientId, []);
  }
  
  const requests = rateLimitStore.get(clientId);
  const validRequests = requests.filter(timestamp => timestamp > windowStart);
  
  if (validRequests.length >= RATE_LIMIT) {
    return false;
  }
  
  validRequests.push(now);
  rateLimitStore.set(clientId, validRequests);
  return true;
}

// Get movies (simulating Neo4j)
function getMovies(query = '') {
  if (!query) return movieDatabase;
  return movieDatabase.filter(movie => 
    movie.title.toLowerCase().includes(query.toLowerCase())
  );
}

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client')));

// WebSocket handling
wss.on('connection', (ws, req) => {
  const clientId = req.socket.remoteAddress + ':' + req.socket.remotePort;
  console.log(`Client connected: ${clientId}`);
  
  ws.on('message', async (data) => {
    try {
      const message = data.toString();
      
      if (!checkRateLimit(clientId)) {
        ws.send(JSON.stringify({
          error: 'Too Many Requests',
          message: 'Rate limit exceeded (10 requests/minute). Please try again later.'
        }));
        return;
      }
      
      let request;
      try {
        request = JSON.parse(message);
      } catch {
        request = { action: 'getMovies', query: message };
      }
      
      if (request.action === 'getMovies') {
        const movies = getMovies(request.query);
        ws.send(JSON.stringify({ success: true, data: movies, count: movies.length }));
      } else {
        ws.send(JSON.stringify({ error: 'Unknown action' }));
      }
      
    } catch (error) {
      ws.send(JSON.stringify({ error: 'Server error', message: error.message }));
    }
  });
  
  ws.on('close', () => console.log(`Client disconnected: ${clientId}`));
});

// REST API
app.get('/api/movies', (req, res) => {
  const clientId = req.ip;
  
  if (!checkRateLimit(clientId)) {
    return res.status(429).json({
      error: 'Too Many Requests',
      message: 'Rate limit exceeded (10 requests/minute). Please try again later.'
    });
  }
  
  const query = req.query.q || '';
  const movies = getMovies(query);
  res.json({ success: true, data: movies, count: movies.length });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    redis: 'simulated', 
    neo4j: 'simulated',
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log('Using in-memory storage (Redis and Neo4j simulated)');
});