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


//FAQ QS
// Run the following code after the entire page content has loaded
 document.addEventListener('DOMContentLoaded', function () {
     // Select all elements with the class 'accordion-btn' (these are FAQ questions)
            const buttons = document.querySelectorAll('.accordion-btn');
// Loop through each button (FAQ question)
            buttons.forEach(button => {
                 // Get the element immediately after the button (this is the FAQ answer)
                const content = button.nextElementSibling;

                // By default, keep all buttons active and content visible
                  // Step 1: By default, keep all questions open and answers visible
                button.classList.add('active'); // Mark the button as active (usually changes its style)
                content.classList.remove('closed'); // Ensure answer is visible (not hidden)
// Step 2: Add click event to toggle open/close on each FAQ
                button.addEventListener('click', () => {
                    button.classList.toggle('active');// Toggle the 'active' class on the button
                    content.classList.toggle('closed');// Toggle the visibility of the content
                });
            });
        });
