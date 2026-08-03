// Import dependencies
const express = require("express");

const app = express();
const PORT = 3000;

// Middleware to parse incoming JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" folder
app.use(express.static("public"));

// An array as OUR TEMPORARY DATABASE
let blogs = [];

// --- POST Route: Create a new blog post ---
app.post("/api/blogs", async (req, res) => {
  // Extract the data sent from the client
  const { title, author, content } = req.body;

  // Validate that the required fields are provided
  if (!title || !author || !content) {
    return res
      .status(400)
      .json({ message: "Please provide title, author, and content." });
  }

  // Create a new blog object
  const newBlog = {
    id: Date.now().toString(), // Creates a unique ID using the current timestamp
    title: title,
    author: author,
    content: content,
    createdAt: new Date(),
  };

  // Push the new blog into our temporary array
  blogs.push(newBlog);

  // Send a success response back to the client
  res.status(201).json({
    message: "Blog post saved successfully!",
    blog: newBlog,
    totalBlogs: blogs.length, // Shows how many blogs are currently in the array
  });
});

// --- GET Route: Fetch all blog posts ---
app.get("/api/blogs", async (req, res) => {
  // We simply send back the entire 'blogs' array to the client
  res.status(200).json(blogs);
});

// --- PUT Route: Edit an existing blog post ---
app.put("/api/blogs/:id", (req, res) => {
  // Grab the ID from the url parameter
  const blogId = req.params.id;

  // Grab the new data sent in the request body
  const { title, author, content } = req.body;

  // Find the exact index of the blog in our array that matches this ID
  const blogIndex = blogs.findIndex((blog) => blog.id === blogId);

  // If the blog isn't found, return a 404 console.error
  if (blogIndex === -1) {
    return res.status(404).json({ message: "Blog post not found" });
  }

  // Update the blog's data while keeping its original ID and creation Date
  blogs[blogIndex] = {
    ...blogs[blogIndex], // Keep existing data
    title: title || blogs[blogIndex].title,
    author: author || blogs[blogIndex].author,
    content: content || blogs[blogIndex].content,
  };

  // Send the updated blog back to the client
  res.status(200).json({
    message: "Blog updated successfully!",
    blog: blogs[blogIndex],
  });
});

// --- DELETE Route: Remove a blog post ---
app.delete("/api/blogs/:id", (req, res) => {
  // Grab the ID from the URL parameter
  const blogId = req.params.id;

  // Find the exact index of the blog in our array
  const blogIndex = blogs.findIndex((blog) => blog.id === blogId);

  // If the blog isn't found return a 404 error
  if (blogIndex === -1) {
    return res.status(404).json({ message: "Blog post not found!" });
  }

  // Remove that 1 item from the array using splice()
  blogs.splice(blogIndex, 1);

  // Send a success response back to the client
  res.status(200).json({ message: "Blog deleted successfully!" });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Express server on http://localhost:${PORT}`);
});
