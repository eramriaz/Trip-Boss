console.log("Script is connected!");
// Select the navbar element with class 'navbar'
let navbarDiv = document.querySelector('.navbar');

// Add scroll event listener to the window
window.addEventListener('scroll', () => {
  // Check if the user has scrolled more than 40px from the top
    if(document.body.scrollTop > 40 || document.documentElement.scrollTop > 40){
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
    if(e.target.id != "navbar-collapse" && e.target.id != "navbar-show-btn" && e.target.parentElement.id != "navbar-show-btn"){
            // Hide the sidebar
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

//checking API//
//Form api
// Select the form inside the element with class 'header-form'
const form = document.querySelector('.header-form form');
// Add event listener to the form on 'submit' event
form.addEventListener('submit', async (e) => {
  e.preventDefault();// Prevent page from reloading on form submission
  // Get user input values from the form (destination and date)
  const destination = form.children[0].value;
  const date = form.children[1].value;
 // If either field is empty, show an alert and stop execution
  if (!destination || !date) {
    alert("Please enter destination and date.");
    return;
  }

  try {
    // Step 1: Get coordinates from destination
     // Step 1: Fetch coordinates (latitude and longitude) using Nominatim API
    const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${destination}`);
    const geoData = await geoRes.json();
     // If no location data is returned, throw an error
    if (!geoData.length) throw new Error("Destination not found.");
     // Extract latitude and longitude from the first search result
    const { lat, lon } = geoData[0];

    // Step 2: Get weather data
    // Step 2: Fetch weather data using Open-Meteo API
    const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max&timezone=auto`);
    const weatherData = await weatherRes.json();

    // Match selected date with API date
      // Find the index of the selected date in the returned daily forecast data
    const index = weatherData.daily.time.indexOf(date);
      // If the date is not found in the forecast, throw an error
    if (index === -1) throw new Error("Weather data not available for this date.");
    // Get the temperature for the selected date
    const temp = weatherData.daily.temperature_2m_max[index];

    // Step 3: Decide offer
    // Step 3: Based on the temperature, decide what offer to show
    let offer = '';
    if (temp >= 30) offer = "🔥 Hot Deal: Get 15% off for beachwear!";
    else if (temp >= 20) offer = "🌤️ Mild Weather Bonus: Free walking tour!";
    else offer = "❄️ Winter Special: Free hot drinks included!";
 // Show final result and special offer in an alert
    alert(`Weather on ${date} in ${destination}: ${temp}°C.\nSpecial Offer: ${offer}`);
  } catch (error) {
      // Handle any error during API calls or data handling
    console.error(error);
    alert("Failed to fetch offer. Please try another location or date.");
  }
});


//featured places
// Select the container where country cards will be added
const featuredRow = document.querySelector('.featured-row');

// List of country names to fetch from the REST Countries API
const countries = ["brazil", "australia", "germany", "thailand", "italy", "maldives"];

// Loop through each country name
countries.forEach(country => {

  // Make an API call to get data for the country
  fetch(`https://restcountries.com/v3.1/name/${country}`)

    // Convert the API response to JSON
    .then(res => res.json())

    // Process the data
    .then(data => {
      const countryData = data[0]; // Take the first matching country
      const countryName = countryData.name.common; // Country name
      const flagUrl = countryData.flags.png; // Flag image URL
      const capital = countryData.capital ? countryData.capital[0] : "N/A"; // Capital city

      // Create a description for the card
      const description = `Explore ${capital}, the vibrant heart of ${countryName}. Dive into culture, nature, and unforgettable experiences.`;

      // Create a new div element for the country card
      const card = document.createElement('div');
      card.className = 'featured-item my-2 shadow'; // Apply classes for styling

      // Fill the card with dynamic content
      card.innerHTML = `
        <img src="${flagUrl}" alt="flag of ${countryName}">
        <div class="featured-item-content">
          <span><i class="fas fa-map-marker-alt"></i> ${capital}, ${countryName}</span>
          <div><p class="text">${description}</p></div>
        </div>
      `;

      // Append the card to the featured row section
      featuredRow.appendChild(card);
    })

    // Handle any errors
    .catch(err => console.error(`Error fetching data for ${country}:`, err));
});



//Customer Testimonials 
// Select the container in which testimonial cards will be displayed
const testRow = document.querySelector('.test-row');

// Fetch user and comment data from two API endpoints at the same time
Promise.all([
  // API 1: Get fake user data (names, cities, etc.)
  fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json()),

  // API 2: Get fake comments/reviews
  fetch('https://jsonplaceholder.typicode.com/comments').then(res => res.json())
])

// Once both requests are complete, we receive users and comments arrays
.then(([users, comments]) => {

  // Loop through the first 3 users to create 3 testimonial cards
  for (let i = 0; i < 3; i++) {

    // Extract name and city from the user object
    const name = users[i].name;
    const city = users[i].address.city;

    // Extract a review (comment body) from comments array
    const review = comments[i].body;

    // Create a new card div
    const card = document.createElement('div');
    card.className = 'test-item';

    // Populate the card with review, name, city, and a random avatar
    card.innerHTML = `
      <p class="text">${review}</p>
      <div class="test-item-info">
        <img src="https://i.pravatar.cc/100?img=${i+10}" alt="testimonial">
        <div>
          <h3>${name}</h3>
          <p class="text">Trip to ${city}</p>
        </div>
      </div>`;

    // Append the created card to the page
    testRow.appendChild(card);
  }
})

// Handle errors gracefully
.catch(err => console.error("Error loading testimonials:", err));
