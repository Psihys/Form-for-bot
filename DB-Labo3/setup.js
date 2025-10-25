const neo4j = require('neo4j-driver');

// Neo4j setup script
async function setupNeo4j() {
  const driver = neo4j.driver(
    'bolt://localhost:7687',
    neo4j.auth.basic('neo4j', 'password')
  );
  
  const session = driver.session();
  
  try {
    console.log('Setting up Neo4j database...');
    
    // Clear existing data
    await session.run('MATCH (n) DETACH DELETE n');
    
    // Create sample movies
    const movies = [
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
    
    for (const movie of movies) {
      await session.run(
        'CREATE (m:Movie {title: $title, released: $released, tagline: $tagline})',
        movie
      );
    }
    
    console.log(`Created ${movies.length} movies in Neo4j database`);
    
    // Verify data
    const result = await session.run('MATCH (m:Movie) RETURN count(m) as count');
    const count = result.records[0].get('count').toNumber();
    console.log(`Verified: ${count} movies in database`);
    
  } catch (error) {
    console.error('Error setting up Neo4j:', error);
  } finally {
    await session.close();
    await driver.close();
  }
}

if (require.main === module) {
  setupNeo4j().catch(console.error);
}

module.exports = { setupNeo4j };