document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Sticky Corporate Navigation
    const header = document.getElementById("site-header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // 2. High-Performance Scroll Reveal (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Triggers when 10% of the element is visible
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add class to trigger CSS transition
                entry.target.classList.add("show");
                
                // Trigger number counter if it exists within the revealed section
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(counter => {
                    if(!counter.classList.contains('counted')) {
                        startCounter(counter);
                        counter.classList.add('counted');
                    }
                });
                
                // Unobserve after revealing to maximize performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Attach observer to all elements with the fade-up class
    document.querySelectorAll(".fade-up").forEach(element => {
        scrollObserver.observe(element);
    });

    // 3. Smooth Number Counter for Statistics
    function startCounter(counterElement) {
        const targetValue = +counterElement.getAttribute('data-target');
        const duration = 2000; // Animation duration in milliseconds
        const frameRate = 16; // ~60fps
        const increment = targetValue / (duration / frameRate); 
        let currentValue = 0;

        const updateCounter = () => {
            currentValue += increment;
            if (currentValue < targetValue) {
                counterElement.innerText = Math.ceil(currentValue);
                requestAnimationFrame(updateCounter);
            } else {
                counterElement.innerText = targetValue;
            }
        };
        
        updateCounter();
    }
});