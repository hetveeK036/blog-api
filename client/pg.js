const { Pool } = require('pg');

// Create a new pool with your PostgreSQL configuration
const pool = new Pool({
  user: 'root',
  host: 'localhost',
  database: 'StoryForge',
  password: 'root',
  port: 5432, // Default PostgreSQL port
});

// Example query
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error executing query', err);
    return;
  }
  console.log('Current date from PostgreSQL:', res.rows[0].now);
});

// Close the pool when your application exits
// You don't need to call this in normal operation
// The pool will automatically close connections and drain when it is no longer needed
process.on('exit', () => {
  pool.end();
});
