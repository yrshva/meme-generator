const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { connectDB } = require("./db");
const postController = require("./postController");

const server = express();
const HOST = "localhost";
const PORT = 3030;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

server.use(express.json());

connectDB();

server.post("/posts", upload.single("image"), (req, res) => {
  const { username } = req.body;
  const image = req.file ? req.file.buffer : null;

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

server.delete("/posts/:postId", (req, res) => {
  const postId = req.params.postId;
  const result = postController.deletePost(postId);

  if (result) {
    res.json({ success: true, message: "Post deleted successfully" });
  } else {
    res.status(404).json({ success: false, message: "Post not found" });
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
