// Function to check if an element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to handle scroll reveal animations
function handleScrollReveal() {
    const elements = document.querySelectorAll('.reveal-on-scroll');
    
    elements.forEach(element => {
        if (isElementInViewport(element)) {
            element.classList.add('active');
        }
    });
}

// Add scroll event listener
document.addEventListener('scroll', handleScrollReveal);
window.addEventListener('load', handleScrollReveal);
window.addEventListener('resize', handleScrollReveal);