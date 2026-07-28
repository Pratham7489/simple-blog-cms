const mongoose = require('mongoose');

// Define the blueprint ( Schema ) for the blog post  
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,   // Now this field is mandatory
        trim: true        // Automatically removes extra spaces at the start/end
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now // Automatically sets the exact date/time it was created
    }
});

// Compile the schema into a Model and export it
module.exports = mongoose.model("Blog", blogSchema );