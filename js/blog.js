console.log("Script is connected!");
// Select the navbar element with class 'navbar'
let navbarDiv = document.querySelector('.navbar');
// Add scroll event listener to the window
window.addEventListener('scroll', () => {
  // Check if the user has scrolled more than 40px from the top
  if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
    // Add class to change navbar style (like background, height etc.)
    navbarDiv.classList.add('navbar-cng');
  } else {
    // Remove the class if scroll is less than 40px
    navbarDiv.classList.remove('navbar-cng');
  }
});

// Get references to the collapsible navbar, show button, and close button
const navbarCollapseDiv = document.getElementById('navbar-collapse');
const navbarShowBtn = document.getElementById('navbar-show-btn');
const navbarCloseBtn = document.getElementById('navbar-close-btn');
// show navbar
// When the show button is clicked, show the sidebar by adding a class
navbarShowBtn.addEventListener('click', () => {
  navbarCollapseDiv.classList.add('navbar-collapse-rmw');
});

// hide side bar
// When the close button is clicked, hide the sidebar by removing the class
navbarCloseBtn.addEventListener('click', () => {
  navbarCollapseDiv.classList.remove('navbar-collapse-rmw');
});
// Hide the sidebar when clicking outside the sidebar or show button
document.addEventListener('click', (e) => {
  // If the clicked element is not the sidebar or the show button (or its child)
  if (e.target.id != "navbar-collapse" && e.target.id != "navbar-show-btn" && e.target.parentElement.id != "navbar-show-btn") {
    navbarCollapseDiv.classList.remove('navbar-collapse-rmw');
  }
});

// stop transition and animatino during window resizing
// Temporarily stop CSS animations/transitions during window resize to avoid lag
let resizeTimer;
window.addEventListener('resize', () => {
  // Add a class to stop animations
  document.body.classList.add("resize-animation-stopper");
  // Reset the timer and remove the class after 400ms
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.body.classList.remove("resize-animation-stopper");
  }, 400);
});

//blog apis
// Select the blog container div where blogs will be appended
const blogContainer = document.querySelector('.blog-row');
// Initialize an empty array to store fetched or added blog data
let blogData = [];
// Set initial counter for blog images to assign them in a loop
let imageCounter = 1; // For rotating images

// Fetch demo blogs from JSONPlaceholder
// Fetch 4 demo blog posts from JSONPlaceholder (a free fake API)
fetch('https://jsonplaceholder.typicode.com/posts?_limit=4')
  .then(res => res.json())
  .then(data => {
    // Map the received data into desired structure with author and image
    blogData = data.map((item, i) => ({
      // Keep original title and body
      ...item,
      author: 'Guest Author',// Assign default author
      image: `images/blog-${(i % 8) + 1}.jpg`// Assign blog images from 1 to 8 cyclically
    }));
    imageCounter = blogData.length + 1;// Update imageCounter
    renderBlogs(); // Render all fetched blogs on the page
  });

// Render blog cards
// Function to display all blogs from blogData on the webpage
function renderBlogs() {
  blogContainer.innerHTML = '';// Clear existing blogs
  blogData.forEach((post, index) => {
    const blogCard = document.createElement('div');// Create new blog card
    blogCard.className = 'blog-item my-2 shadow';// Add styling classes
    // Define the blog card HTML using template literals
    blogCard.innerHTML = `
      <div class="blog-item-top">
        <img src="${post.image}" alt="blog">
        <span class="blog-date">${new Date().toDateString()}</span>
      </div>
      <div class="blog-item-bottom">
        <span>travel | ${post.author}</span>
        <a href="#" contenteditable="false">${post.title}</a>
        <p class="text" contenteditable="false">${post.body}</p>
        <button onclick="editPost(${index}, this)">Edit</button>
        <button onclick="deletePost(${index})">Delete</button>
      </div>
    `;
    blogContainer.appendChild(blogCard);// Add the blog card to container
  });
}

// Add a new blog post
// Function to add a new blog post manually using input fields
function addPost() {
  const title = document.getElementById('title').value.trim();
  const body = document.getElementById('body').value.trim();
  const author = document.getElementById('author').value.trim();

  // Validate all fields are filled
  if (!title || !body || !author) {
    alert('Please fill all fields.');
    return;
  }

  // Calculate which image to use for the new blog post
  // 'imageCounter' is assumed to be a running number starting from 1 and increasing with each new post
  // Subtracting 1 makes it 0-based for modulo operation
  // '% 8' ensures the result is always between 0 and 7 (for 8 images)
  // Adding 1 converts it back to 1-based indexing (1 to 8)
  // Assign an image to the new post cyclically
  const imageNumber = ((imageCounter - 1) % 8) + 1;
  const newPost = {
    title,
    body,
    author,
    image: `images/blog-${imageNumber}.jpg` // Dynamically assigned image based on counter
  };

  blogData.unshift(newPost); // Add to beginning, // Add the new blog at the beginning
  imageCounter++;// Increase image counter
  renderBlogs();// Re-render all blogs including the new one

  // Clear form
  // Clear the input fields after adding
  document.getElementById('title').value = '';
  document.getElementById('body').value = '';
  document.getElementById('author').value = '';
}

// Edit post
// Function to edit an existing blog post (title and body)
function editPost(index, btn) {
  const card = btn.closest('.blog-item-bottom');// Get the card
  const title = card.querySelector('a'); // Blog title element
  const body = card.querySelector('p'); // Blog body element

  // Check if the button text is 'Edit'
  if (btn.textContent === 'Edit') {
    // Enable editing mode

    // Make the title and body editable by the user
    title.contentEditable = true;
    body.contentEditable = true;
    // Add visible borders to indicate that these fields are now editable
    title.style.border = '1px solid #ccc';
    body.style.border = '1px solid #ccc';

    // Change the button text from 'Edit' to 'Save'
    btn.textContent = 'Save';// Change button text
  } else {
    // Save updated content
    // Disable editing mode
    title.contentEditable = false;
    body.contentEditable = false;
    // Update the corresponding blog data in the array (or object)
    blogData[index].title = title.textContent;
    blogData[index].body = body.textContent;
    // Remove borders to indicate fields are no longer editable
    title.style.border = 'none';
    body.style.border = 'none';
    btn.textContent = 'Edit';// Revert button text
  }
}

// Delete post
// Function to delete a blog post
function deletePost(index) {
  if (confirm('Are you sure to delete this blog?')) {
    blogData.splice(index, 1);// Remove blog from data
    renderBlogs();// Re-render all blogs
  }
}
