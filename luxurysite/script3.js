document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Sticky Navigation Header
    const header = document.getElementById("site-header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // 2. Refined Intersection Observer (Fade Up Reveal)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Triggers earlier than the previous 0.15 for smoother pacing
    };

    const fadeObserver = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                
                // Trigger number counter if it contains one
                const counter = entry.target.querySelector('.counter');
                if(counter && !counter.classList.contains('counted')) {
                    startCounter(counter);
                    counter.classList.add('counted');
                }
                
                observerInstance.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Attach observer to all fade-up elements
    document.querySelectorAll(".fade-up").forEach(el => {
        fadeObserver.observe(el);
    });

    // 3. Smooth Number Counter logic for floating badges
    function startCounter(counterElement) {
        const target = +counterElement.getAttribute('data-target');
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counterElement.innerText = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counterElement.innerText = target;
            }
        };
        updateCounter();
    }
});