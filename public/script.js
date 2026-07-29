// Grab the form and the input elements from the dom
const blogForm = document.getElementById("add-blog-form");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const contentInput = document.getElementById("content");

// Check if the form exists on the current page before adding the listener
if (blogForm) {
  // Add an event listener to the form for the 'submit' event
  blogForm.addEventListener("submit", function (event) {
    // Stop the page from reloading instantly
    event.preventDefault();

    // Get the values and remove accidental leading/trailing spaces
    const titleValue = titleInput.value.trim();
    const authorValue = authorInput.value.trim();
    const contentValue = contentInput.value.trim();

    // Reset borders back to default (in case they fixed a previous error)
    titleInput.style.borderColor = "#D1D5DB";
    authorInput.style.borderColor = "#D1D5DB";
    contentInput.style.borderColor = "#D1D5DB";

    let isValid = true;
    let errorMessage = "";

    // Check our real-world rules
    if (titleValue.length < 5) {
      errorMessage += "- Title must be at least 5 characters long.\n";
      titleInput.style.borderColor = "red"; // DOM manipulation for UI feedback
      isValid = false;
    }

    if (authorValue.length < 3) {
      errorMessage += "- Author name must be at least 3 characters long.\n";
      authorInput.style.borderColor = "red";
      isValid = false;
    }

    if (contentValue.length < 20) {
      errorMessage += "- Blog content must be at least 20 characters long.\n";
      contentInput.style.borderColor = "red";
      isValid = false;
    }

    // Decide what happens based on the validation
    if (!isValid) {
      // If data is bad, show the errors and stop
      alert("Please fix the following errors:\n" + errorMessage);
      return; // This stops the rest of the code from running
    }

    // If everything is perfect, simulate a successful submission
    alert(
      "Success! Your blog post has been validated and is ready to be published.",
    );
    console.log("Validated Data:", { titleValue, authorValue, contentValue });

    // Clear the form for the next entry
    blogForm.reset();
  });
}

// Wait for the HTML to fully load before running the script
document.addEventListener("DOMContentLoaded", fetchBlogs);

async function fetchBlogs() {
  try {
    // Call our backend API
    const response = await fetch("/api/blogs");
    const blogs = await response.json();

    // Find the container in our HTML
    const container = document.getElementById("blogs-container");

    // Clear the "Loading blogs..." text
    container.innerHTML = "";

    // Check if the array is empty
    if (blogs.length === 0) {
      container.innerHTML =
        "<p>No blogs found yet. Be the first to write one!</p>";
      return;
    }

    // Loop through the array and create HTML for each blog
    blogs.forEach((blog) => {
      const article = document.createElement("article");
      // Adding a bottom border and margin for styling
      article.style.borderBottom = "1px solid #ccc";
      article.style.marginBottom = "20px";
      article.style.paddingBottom = "10px";

      article.innerHTML = `
                <h3>${blog.title}</h3>
                <p><small>By: ${blog.author} | ${new Date(blog.createdAt).toLocaleDateString()}</small></p>
                <p>${blog.content}</p>
            `;

      // Add the new article to the page
      container.appendChild(article);
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    document.getElementById("blogs-container").innerHTML =
      "<p>Failed to load blogs.</p>";
  }
}
