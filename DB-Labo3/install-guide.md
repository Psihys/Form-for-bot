# Installation Guide - DB-Labo3

## Prerequisites

### 1. Install Node.js
Download and install from: https://nodejs.org/

### 2. Install Redis

**Windows:**
```bash
# Using Chocolatey
choco install redis-64

# Or download from: https://github.com/microsoftarchive/redis/releases
```

**Start Redis:**
```bash
redis-server
```

### 3. Install Neo4j

**Windows:**
1. Download Neo4j Desktop from: https://neo4j.com/download/
2. Install and create a new database
3. Set password to: `password`
4. Start the database

**Or use Neo4j Community Edition:**
```bash
# Download and extract Neo4j Community
# Set NEO4J_AUTH=neo4j/password
neo4j.bat start
```

## Setup Instructions

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Setup Databases
```bash
npm run setup
```

### 3. Start Server
```bash
npm start
```

### 4. Open Web Application
Go to: **http://localhost:3000**

## Verification

1. Click "Check Health" - should show ✅ Redis and Neo4j connected
2. Click "Connect" - should connect WebSocket
3. Click "Get All Movies" - should show 15 movies from Neo4j
4. Click "Test Rate Limit" - should trigger rate limiting after 10 requests

## Troubleshooting

**Redis not connecting:**
- Ensure Redis server is running on port 6379
- Check: `redis-cli ping` should return "PONG"

**Neo4j not connecting:**
- Ensure Neo4j is running on port 7687
- Check username: `neo4j`, password: `password`
- Verify in Neo4j Browser: http://localhost:7474

**Alternative: Use Docker**
```bash
docker-compose up -d
npm run setup
npm start
```