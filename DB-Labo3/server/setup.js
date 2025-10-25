const neo4j = require('neo4j-driver');
const redis = require('redis');

// Neo4j setup
async function setupNeo4j() {
  const driver = neo4j.driver(
    'bolt://localhost:7687',
    neo4j.auth.basic('neo4j', 'password')
  );
  
  const session = driver.session();
  
  try {
    console.log('🎬 Setting up Neo4j movie database...');
    
    // Clear existing data
    await session.run('MATCH (n) DETACH DELETE n');
    
    // Create sample movies
    const movies = [
      { title: "The Matrix", released: 1999, tagline: "Welcome to the Real World" },
      { title: "The Matrix Reloaded", released: 2003, tagline: "Free your mind" },
      { title: "The Matrix Revolutions", released: 2003, tagline: "Everything that has a beginning has an end" },
      { title: "John Wick", released: 2014, tagline: "Don't set him off" },
      { title: "John Wick: Chapter 2", released: 2017, tagline: "Never stab the devil in the back" },
      { title: "John Wick: Chapter 3", released: 2019, tagline: "If you want peace, prepare for war" },
      { title: "Speed", released: 1994, tagline: "Get ready for rush hour" },
      { title: "Point Break", released: 1991, tagline: "100% pure adrenaline" },
      { title: "The Devil's Advocate", released: 1997, tagline: "Evil has its winning ways" },
      { title: "Constantine", released: 2005, tagline: "Hell wants him. Heaven won't take him. Earth needs him." },
      { title: "Bill & Ted's Excellent Adventure", released: 1989, tagline: "History is about to be rewritten by two guys who can't spell." },
      { title: "The Lake House", released: 2006, tagline: "How do you hold on to someone you've never met?" },
      { title: "47 Ronin", released: 2013, tagline: "For honor. For love. For revenge." },
      { title: "Replicas", released: 2018, tagline: "Some humans are unstoppable" },
      { title: "Cyberpunk 2077", released: 2020, tagline: "The future is worth fighting for" }
    ];
    
    for (const movie of movies) {
      await session.run(
        'CREATE (m:Movie {title: $title, released: $released, tagline: $tagline})',
        movie
      );
    }
    
    console.log(`✅ Created ${movies.length} movies in Neo4j database`);
    
    // Verify data
    const result = await session.run('MATCH (m:Movie) RETURN count(m) as count');
    const count = result.records[0].get('count').toNumber();
    console.log(`✅ Verified: ${count} movies in database`);
    
  } catch (error) {
    console.error('❌ Error setting up Neo4j:', error.message);
    throw error;
  } finally {
    await session.close();
    await driver.close();
  }
}

// Redis setup
async function setupRedis() {
  const client = redis.createClient({
    url: 'redis://localhost:6379'
  });
  
  try {
    await client.connect();
    console.log('🔴 Setting up Redis...');
    
    // Clear any existing rate limit data
    const keys = await client.keys('rate_limit:*');
    if (keys.length > 0) {
      await client.del(keys);
      console.log(`✅ Cleared ${keys.length} existing rate limit entries`);
    }
    
    // Test Redis functionality
    await client.set('test_key', 'test_value', { EX: 10 });
    const testValue = await client.get('test_key');
    
    if (testValue === 'test_value') {
      console.log('✅ Redis is working correctly');
      await client.del('test_key');
    }
    
  } catch (error) {
    console.error('❌ Error setting up Redis:', error.message);
    throw error;
  } finally {
    await client.quit();
  }
}

// Main setup function
async function setup() {
  console.log('🚀 Starting database setup...\n');
  
  try {
    await setupRedis();
    console.log('');
    await setupNeo4j();
    
    console.log('\n✅ Database setup completed successfully!');
    console.log('You can now start the server with: npm start');
    
  } catch (error) {
    console.error('\n❌ Setup failed:', error.message);
    console.log('\nPlease ensure Redis and Neo4j are running:');
    console.log('- Redis: redis-server (port 6379)');
    console.log('- Neo4j: neo4j start (port 7687, user: neo4j, password: password)');
    console.log('- Or use Docker: docker-compose up -d');
    process.exit(1);
  }
}

if (require.main === module) {
  setup();
}

module.exports = { setupNeo4j, setupRedis };