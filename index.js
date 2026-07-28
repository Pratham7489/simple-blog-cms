// Import dependencies
require('dotenv').config(); // Loads variables from the .env file
const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/Blog');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
// These lines are crucial! They allow Express to understand incoming JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB connected successfully");
})
.catch((err) => {
  console.error("Error connecting to MongoDB:", err.message);
});

// Basic Test Route
app.get('/', (req, res) => {
  res.send('Blog Backend Server is Running!');
});

// --- POST Route: Create a new blog post ---
app.post("/api/blogs", async (req, res) => {
  try{
    // Extract the data sent from the client
    const { title, author, content } = req.body;

    // Create a new blog document using our Mongoose model
    const newBlog = new Blog({
      title : title,
      author : author,
      content : content
    });

    // Save the document to the MongoDB database
    const savedBlog = await newBlog.save();

    // Send a success response back to the client
    res.status(201).json({
      message: "Blog post saved successfully!",
      blog: savedBlog
    });

  }
  catch (error) {
    // If anything goes wrong, catch the error and send a 500 Server Error response
    console.error("Error in saving blog post:", error);
    res.status(500).json({ message: "Failed to save the blog post.", error: error.message });
  }
});

// --- GET Route: Fetch all blog posts ---
app.get('/api/blogs', async (req, res) => {
  try {
    // Fetch all blogs from the database
    // The .sort({ createdAt: -1 }) part ensures the newest posts show up first!
    const blogs = await Blog.find().sort({ createdAt: -1 });

    // Send the fetched blogs back to the client
    res.status(200).json(blogs);

  }
  catch (error) {
    // If there's an error fetching the blogs, log it and send a 500 response
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Failed to fetch blogs.", error: error.message });
  }
});

// Start the Server
app.listen(PORT, ()=> {
    console.log(`Express server on http://localhost:${PORT}`)
});