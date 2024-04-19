// Import required modules
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs"); // Node.js File System module for reading directory
const { connectDB } = require("./db");
const postController = require("./postController");

// Create an Express app
const server = express();
const HOST = "localhost";
const PORT = 3030;

const storage = multer.memoryStorage(); // Store files in memory instead of disk
const upload = multer({ storage: storage });

server.use(express.json()); // Parse JSON requests

// Connect to the database
connectDB();

// Endpoint for uploading images and creating posts
server.post("/posts", upload.single("image"), (req, res) => {
  const { username } = req.body;
  const image = req.file ? req.file.buffer : null; // Get image data as Buffer

  if (!username || !image) {
    return res.status(400).json({ error: "Username and image are required" });
  }

  const postId = postController.createPost(username, image);
  res.json({ postId });
});

server.get("/posts", (req, res) => {
  const posts = postController.getPosts();
  res.json(posts);
});

server.listen(PORT, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
