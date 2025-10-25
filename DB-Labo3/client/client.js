const net = require('net');

class MovieClient {
  constructor(host = 'localhost', port = 8080) {
    this.host = host;
    this.port = port;
    this.socket = null;
  }
  
  connect() {
    return new Promise((resolve, reject) => {
      this.socket = net.createConnection(this.port, this.host);
      
      this.socket.on('connect', () => {
        console.log(`Connected to server ${this.host}:${this.port}`);
        resolve();
      });
      
      this.socket.on('error', (error) => {
        console.error('Connection error:', error);
        reject(error);
      });
      
      this.socket.on('data', (data) => {
        const response = data.toString().trim();
        try {
          const parsed = JSON.parse(response);
          this.handleResponse(parsed);
        } catch {
          console.log('Server response:', response);
        }
      });
      
      this.socket.on('close', () => {
        console.log('Connection closed');
      });
    });
  }
  
  handleResponse(response) {
    if (response.error) {
      console.error('Error:', response.error);
      if (response.message) {
        console.error('Message:', response.message);
      }
    } else if (response.success && response.data) {
      console.log('\n=== Movies ===');
      response.data.forEach((movie, index) => {
        console.log(`${index + 1}. ${movie.title} (${movie.released})`);
        if (movie.tagline) {
          console.log(`   "${movie.tagline}"`);
        }
      });
      console.log('=============\n');
    }
  }
  
  sendRequest(action, query = '') {
    if (!this.socket) {
      console.error('Not connected to server');
      return;
    }
    
    const request = JSON.stringify({ action, query });
    this.socket.write(request);
  }
  
  getMovies(query = '') {
    this.sendRequest('getMovies', query);
  }
  
  disconnect() {
    if (this.socket) {
      this.socket.end();
    }
  }
}

// Example usage
async function main() {
  const client = new MovieClient();
  
  try {
    await client.connect();
    
    // Get all movies
    console.log('Requesting all movies...');
    client.getMovies();
    
    // Wait a bit then search for specific movies
    setTimeout(() => {
      console.log('Searching for "Matrix" movies...');
      client.getMovies('Matrix');
    }, 2000);
    
    // Disconnect after 5 seconds
    setTimeout(() => {
      client.disconnect();
    }, 5000);
    
  } catch (error) {
    console.error('Failed to connect:', error);
  }
}

if (require.main === module) {
  main();
}

module.exports = MovieClient;