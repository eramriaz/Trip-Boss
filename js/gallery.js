console.log("Script is connected!");

let navbarDiv = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if(document.body.scrollTop > 40 || document.documentElement.scrollTop > 40){
        navbarDiv.classList.add('navbar-cng');
    } else {
        navbarDiv.classList.remove('navbar-cng');
    }
});


const navbarCollapseDiv = document.getElementById('navbar-collapse');
const navbarShowBtn = document.getElementById('navbar-show-btn');
const navbarCloseBtn = document.getElementById('navbar-close-btn');
// show navbar
navbarShowBtn.addEventListener('click', () => {
    navbarCollapseDiv.classList.add('navbar-collapse-rmw');
});

// hide side bar
navbarCloseBtn.addEventListener('click', () => {
    navbarCollapseDiv.classList.remove('navbar-collapse-rmw');
});

document.addEventListener('click', (e) => {
    if(e.target.id != "navbar-collapse" && e.target.id != "navbar-show-btn" && e.target.parentElement.id != "navbar-show-btn"){
        navbarCollapseDiv.classList.remove('navbar-collapse-rmw');
    }
});

// stop transition and animatino during window resizing
let resizeTimer;
window.addEventListener('resize', () => {
    document.body.classList.add("resize-animation-stopper");
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove("resize-animation-stopper");
    }, 400);
});




// image modal
// Select all gallery items (assumes each has class 'gallery-item')
        const allGalleryItem = document.querySelectorAll('.gallery-item');
        
// Get the modal container (div that holds the popup image)
        const imgModalDiv = document.getElementById('img-modal-box');
        
// Get the close button element inside modal
        const modalCloseBtn = document.getElementById('modal-close-btn');
        
// Get next and previous navigation buttons
        const nextBtn = document.getElementById('next-btn');
        const prevBtn = document.getElementById('prev-btn');
        
// This will store the current index of the image shown in modal
        let imgIndex = 0;
// Loop through each gallery item
        allGalleryItem.forEach((galleryItem) => {
            // Add click event to each gallery image
            galleryItem.addEventListener('click', () => {
                    // Show the modal popup
                imgModalDiv.style.display = "block";
                  // Get the image source of the clicked image
                let imgSrc = galleryItem.querySelector('img').src;
                
        // Extract the image number from the src
        // For example: 'images/gallery-2.jpg' -> 2
                imgIndex = parseInt(imgSrc.split("-")[1].substring(0, 1));
                // Show the corresponding image in the modal
                showImageContent(imgIndex);
            })
        });

        // next click
        
// When user clicks the "Next" button
        nextBtn.addEventListener('click', () => {
            imgIndex++;// move to next image
    // If we are at the last image, loop back to the first
            if (imgIndex > allGalleryItem.length) {
                imgIndex = 1;
            }
            showImageContent(imgIndex);// Show the next image
        });

        // previous click
        // When user clicks the "Previous" button
        prevBtn.addEventListener('click', () => {
            imgIndex--;
             // move to previous image
    // If we are before the first image, loop to the last
            if (imgIndex <= 0) {
                imgIndex = allGalleryItem.length;
            }
            showImageContent(imgIndex);// Show the previous image
        });
// Function to display the image in the modal using the current index
        function showImageContent(index) {
             // Set the src of modal image to the current gallery image
            imgModalDiv.querySelector('#img-modal img').src = `images/gallery-${index}.jpg`;
        }
// When user clicks the close (×) button, hide the modal
        modalCloseBtn.addEventListener('click', () => {
            imgModalDiv.style.display = "none";
        })