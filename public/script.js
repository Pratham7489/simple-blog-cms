// 1. Grab the form and the input elements from the dom 
const blogForm = document.getElementById("add-blog-form");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const contentInput = document.getElementById("content");

// 2. Add an event listener to the form for the 'submit' event
blogForm.addEventListener("submit", function(event) {
    // 3. Stop the page from reloading instantly
    event.preventDefault();

// 4. Get the values and remove accidental leading/trailing spaces
const titleValue = titleInput.value.trim();
const authorValue = authorInput.value.trim();
const contentValue = contentInput.value.trim();

// 5. Reset borders back to default (in case they fixed a previous error)
titleInput.style.borderColor = "#D1D5DB";
authorInput.style.borderColor = "#D1D5DB";
contentInput.style.borderColor = "#D1D5DB";

let isValid = true;
let errorMessage = "";

// 6. Check our real-world rules
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

// 7. Decide what happens based on the validation
if (!isValid) {
    // If data is bad, show the errors and stop
    alert("Please fix the following errors:\n" + errorMessage);
    return; // This stops the rest of the code from running
}

// 8. If everything is perfect, simulate a successful submission
alert("Success! Your blog post has been validated and is ready to be published.");
console.log("Validated Data:", { titleValue, authorValue, contentValue });
    
// Clear the form for the next entry
blogForm.reset();

});