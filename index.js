// Import dependencies
const express = require('express');

const app = express();
const PORT = 3000;

// Middleware to parse incoming JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" folder
app.use(express.static('public'));

// An array as OUR TEMPORARY DATABASE
let blogs = [];

// --- POST Route: Create a new blog post ---
app.post("/api/blogs", async (req, res) => {
  // Extract the data sent from the client
  const { title, author, content } = req.body;

  // Validate that the required fields are provided
  if (!title || !author || !content) {
    return res.status(400).json({ message: "Please provide title, author, and content." });
  }

  // Create a new blog object
  const newBlog = {
    id: Date.now().toString(), // Creates a unique ID using the current timestamp
    title: title,
    author: author,
    content: content,
    createdAt: new Date()
  };

    // Push the new blog into our temporary array
    blogs.push(newBlog);

    // Send a success response back to the client
    res.status(201).json({
      message: "Blog post saved successfully!",
      blog: newBlog,
      totalBlogs: blogs.length // Shows how many blogs are currently in the array
    });
});

// --- GET Route: Fetch all blog posts ---
app.get('/api/blogs', async (req, res) => {
    // We simply send back the entire 'blogs' array to the client
    res.status(200).json(blogs);
});

// Start the Server
app.listen(PORT, ()=> {
    console.log(`Express server on http://localhost:${PORT}`)
});