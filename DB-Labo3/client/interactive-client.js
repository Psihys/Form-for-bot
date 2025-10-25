const readline = require('readline');
const MovieClient = require('./client');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class InteractiveClient {
  constructor() {
    this.client = new MovieClient();
    this.connected = false;
  }
  
  async start() {
    console.log('=== Movie Database Client ===');
    console.log('Commands:');
    console.log('  connect - Connect to server');
    console.log('  movies [query] - Get movies (optional search query)');
    console.log('  test-rate-limit - Send multiple requests to test rate limiting');
    console.log('  disconnect - Disconnect from server');
    console.log('  quit - Exit application');
    console.log('=============================\n');
    
    this.promptUser();
  }
  
  promptUser() {
    rl.question('> ', async (input) => {
      const [command, ...args] = input.trim().split(' ');
      
      switch (command.toLowerCase()) {
        case 'connect':
          await this.connect();
          break;
        case 'movies':
          this.getMovies(args.join(' '));
          break;
        case 'test-rate-limit':
          this.testRateLimit();
          break;
        case 'disconnect':
          this.disconnect();
          break;
        case 'quit':
        case 'exit':
          this.quit();
          return;
        default:
          console.log('Unknown command. Type "quit" to exit.');
      }
      
      setTimeout(() => this.promptUser(), 100);
    });
  }
  
  async connect() {
    if (this.connected) {
      console.log('Already connected');
      return;
    }
    
    try {
      await this.client.connect();
      this.connected = true;
    } catch (error) {
      console.error('Failed to connect:', error.message);
    }
  }
  
  getMovies(query = '') {
    if (!this.connected) {
      console.log('Not connected. Use "connect" command first.');
      return;
    }
    
    this.client.getMovies(query);
  }
  
  testRateLimit() {
    if (!this.connected) {
      console.log('Not connected. Use "connect" command first.');
      return;
    }
    
    console.log('Sending 15 requests rapidly to test rate limiting...');
    for (let i = 0; i < 15; i++) {
      setTimeout(() => {
        console.log(`Request ${i + 1}`);
        this.client.getMovies();
      }, i * 100);
    }
  }
  
  disconnect() {
    if (this.connected) {
      this.client.disconnect();
      this.connected = false;
    } else {
      console.log('Not connected');
    }
  }
  
  quit() {
    console.log('Goodbye!');
    if (this.connected) {
      this.client.disconnect();
    }
    rl.close();
    process.exit(0);
  }
}

const interactiveClient = new InteractiveClient();
interactiveClient.start();