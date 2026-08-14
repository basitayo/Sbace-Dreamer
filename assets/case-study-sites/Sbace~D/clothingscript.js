const header = document.querySelector('header');
        
        window.addEventListener('scroll', () => {
            // If the page is scrolled down more than 50 pixels, apply the glass effect
            if (window.scrollY > 50) {
                header.classList.add('header-scrolled');
            } else {
                // Remove the effect when scrolled back to the top
                header.classList.remove('header-scrolled');
            }
        });

document.addEventListener("DOMContentLoaded", () => {
    const categories = document.querySelectorAll(".category-item");

    categories.forEach(item => {
        item.addEventListener("click", () => {
            categories.forEach(cat => cat.classList.remove("active"));
            item.classList.add("active");
        });
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        // If there's an arrow button, we can attach the click directly to the header
        header.addEventListener('click', () => {
            // Check if it's already active
            const isActive = item.classList.contains('active');

            // Close all items
            accordionItems.forEach(i => i.classList.remove('active'));

            // If it wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});


document.addEventListener("DOMContentLoaded", () => {
    // --- SCROLL REVEAL ANIMATIONS ---
    
    // Set up the observer options
    const observerOptions = {
        root: null, // use the viewport
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    // Create the observer
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the active class to trigger the CSS transition
                entry.target.classList.add('active');
                
                // Optional: Stop observing once it has been revealed (prevents it from hiding/showing repeatedly)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Grab all elements with the 'reveal' class and observe them
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => revealObserver.observe(el));
});