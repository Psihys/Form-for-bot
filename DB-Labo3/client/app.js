class MovieApp {
    constructor() {
        this.ws = null;
        this.connected = false;
        this.initializeElements();
        this.bindEvents();
    }
    
    initializeElements() {
        this.status = document.getElementById('status');
        this.dbStatus = document.getElementById('dbStatus');
        this.searchInput = document.getElementById('searchInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.connectBtn = document.getElementById('connectBtn');
        this.getAllBtn = document.getElementById('getAllBtn');
        this.testRateBtn = document.getElementById('testRateBtn');
        this.restApiBtn = document.getElementById('restApiBtn');
        this.healthBtn = document.getElementById('healthBtn');
        this.moviesContainer = document.getElementById('movies');
        
        // Check database health on load
        this.checkHealth();
    }
    
    bindEvents() {
        this.connectBtn.addEventListener('click', () => this.toggleConnection());
        this.searchBtn.addEventListener('click', () => this.searchMovies());
        this.getAllBtn.addEventListener('click', () => this.getAllMovies());
        this.testRateBtn.addEventListener('click', () => this.testRateLimit());
        this.restApiBtn.addEventListener('click', () => this.useRestApi());
        this.healthBtn.addEventListener('click', () => this.checkHealth());
        
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.searchMovies();
            }
        });
    }
    
    toggleConnection() {
        if (this.connected) {
            this.disconnect();
        } else {
            this.connect();
        }
    }
    
    connect() {
        try {
            this.ws = new WebSocket('ws://localhost:3000');
            
            this.ws.onopen = () => {
                this.connected = true;
                this.updateStatus('Connected to server', 'connected');
                this.updateButtons(true);
                this.connectBtn.textContent = 'Disconnect';
            };
            
            this.ws.onmessage = (event) => {
                const response = JSON.parse(event.data);
                this.handleResponse(response);
            };
            
            this.ws.onclose = () => {
                this.connected = false;
                this.updateStatus('Disconnected from server', 'disconnected');
                this.updateButtons(false);
                this.connectBtn.textContent = 'Connect';
            };
            
            this.ws.onerror = (error) => {
                this.updateStatus('Connection error', 'error');
                console.error('WebSocket error:', error);
            };
            
        } catch (error) {
            this.updateStatus('Failed to connect', 'error');
            console.error('Connection error:', error);
        }
    }
    
    disconnect() {
        if (this.ws) {
            this.ws.close();
        }
    }
    
    updateStatus(message, type) {
        this.status.textContent = message;
        this.status.className = `status ${type}`;
    }
    
    updateButtons(enabled) {
        this.searchInput.disabled = !enabled;
        this.searchBtn.disabled = !enabled;
        this.getAllBtn.disabled = !enabled;
        this.testRateBtn.disabled = !enabled;
    }
    
    sendMessage(action, query = '') {
        if (!this.connected || !this.ws) {
            this.updateStatus('Not connected to server', 'error');
            return;
        }
        
        const message = JSON.stringify({ action, query });
        this.ws.send(message);
    }
    
    searchMovies() {
        const query = this.searchInput.value.trim();
        this.sendMessage('getMovies', query);
    }
    
    getAllMovies() {
        this.sendMessage('getMovies');
    }
    
    testRateLimit() {
        this.updateStatus('Testing rate limit...', 'error');
        
        // Send 15 requests rapidly
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                this.sendMessage('getMovies');
            }, i * 100);
        }
    }
    
    async useRestApi() {
        try {
            const query = this.searchInput.value.trim();
            const url = query ? `/api/movies?q=${encodeURIComponent(query)}` : '/api/movies';
            
            const response = await fetch(url);
            const data = await response.json();
            
            if (response.ok) {
                this.handleResponse(data);
                this.updateStatus('Data loaded via REST API', 'connected');
            } else {
                this.handleResponse(data);
                this.updateStatus(`REST API Error: ${data.error}`, 'error');
            }
        } catch (error) {
            this.updateStatus('REST API request failed', 'error');
            console.error('REST API error:', error);
        }
    }
    
    handleResponse(response) {
        if (response.error) {
            this.updateStatus(`Error: ${response.error}`, 'error');
            if (response.message) {
                console.error('Server message:', response.message);
            }
        } else if (response.success && response.data) {
            this.displayMovies(response.data);
            this.updateStatus(`Found ${response.data.length} movies`, 'connected');
        }
    }
    
    async checkHealth() {
        try {
            const response = await fetch('/api/health');
            const data = await response.json();
            
            if (data.status === 'healthy') {
                this.dbStatus.textContent = `✅ Redis: ${data.redis}, Neo4j: ${data.neo4j}`;
                this.dbStatus.className = 'status connected';
            } else {
                this.dbStatus.textContent = `❌ Database Error: ${data.error}`;
                this.dbStatus.className = 'status error';
            }
        } catch (error) {
            this.dbStatus.textContent = '❌ Cannot connect to server';
            this.dbStatus.className = 'status error';
        }
    }
    
    displayMovies(movies) {
        if (movies.length === 0) {
            this.moviesContainer.innerHTML = '<p style="text-align: center; color: #6c757d;">No movies found</p>';
            return;
        }
        
        const moviesHtml = movies.map(movie => `
            <div class="movie">
                <div class="movie-title">${this.escapeHtml(movie.title)}</div>
                <div class="movie-year">Released: ${movie.released || 'Unknown'}</div>
                ${movie.tagline ? `<div class="movie-tagline">"${this.escapeHtml(movie.tagline)}"</div>` : ''}
            </div>
        `).join('');
        
        this.moviesContainer.innerHTML = moviesHtml;
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new MovieApp();
});