const Database = require("better-sqlite3");
const db = new Database("posts.db");

// Define schema and create tables
const createTables = () => {
  const createPostsTable = db.prepare(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      image BLOB,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  createPostsTable.run();
};

// Connect to the database and create tables if they don't exist
const connectDB = () => {
  createTables(); // Create tables when connecting
  console.log("Connected to SQLite database");
};

module.exports = { db, connectDB };
