const { db } = require("./db");

const createPost = (username, imagePath) => {
  const insertQuery = db.prepare(
    "INSERT INTO posts (username, image) VALUES (?, ?)",
  );
  const result = insertQuery.run(username, imagePath);
  return result.lastInsertRowid; // Return the ID of the inserted post
};

const getPosts = () => {
  const query = db.prepare(
    "SELECT id, username, image FROM posts ORDER BY created_at DESC",
  );
  const posts = query.all();

  return posts.map(post => ({
    id: post.id,
    username: post.username,
    image: post.image ? post.image.toString("base64") : null,
  }));
};

const deletePost = postId => {
  const deleteQuery = db.prepare("DELETE FROM posts WHERE id = ?");
  const result = deleteQuery.run(postId);
  return result.changes > 0;
};

module.exports = { createPost, getPosts, deletePost };
