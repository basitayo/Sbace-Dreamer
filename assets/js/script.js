

// 1. Tell the browser NOT to remember scroll position on refresh
// if ('scrollRestoration' in history) {
//     history.scrollRestoration = 'manual';
// }

// 2. Force the window to the top right before the page unloads/refreshes
// window.onbeforeunload = function () {
//     window.scrollTo(0, 0);
// };



document.addEventListener('DOMContentLoaded', () => {
    // 1. Update Footer Year dynamically
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // 2. Header Scroll Effect (Blur & Background)
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // 3. Intersection Observer for Fade-Up Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after running once so it doesn't animate out and in repeatedly
                observerInstance.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Apply observer to all elements with the 'fade-up' class
    document.querySelectorAll('.fade-up').forEach((elem) => {
        observer.observe(elem);
    });

    // 4. Trust Section Marquee Clone
    const trustTrack = document.getElementById('trust-track');
    if (trustTrack) {
        // Clone all logos to create a seamless infinite scroll loop
        const logos = Array.from(trustTrack.children);
        logos.forEach(logo => {
            const clone = logo.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true');
            trustTrack.appendChild(clone);
        });
    }

    // 5. Dropdown Click Support
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener('click', (e) => {
            // Prevent default anchor jump if we're just opening the menu
            if (window.innerWidth <= 768 || e.pointerType === 'touch') {
                e.preventDefault();
                dropdownMenu.classList.toggle('show-dropdown');
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
                dropdownMenu.classList.remove('show-dropdown');
            }
        });
    }

    // 6. Impact Metrics Counter Animation
    const metricsSection = document.querySelector('.trust-metrics');
    const metricNumbers = document.querySelectorAll('.metric-number');

    if (metricsSection && metricNumbers.length > 0) {
        let hasAnimated = false;

        const animateCounter = (el) => {
            const target = parseFloat(el.getAttribute('data-target'));
            const suffix = el.getAttribute('data-suffix') || '';
            const decimals = parseInt(el.getAttribute('data-decimals')) || 0;
            const duration = 2000; // Animation duration in milliseconds (2 seconds)
            
            let startTimestamp = null;

            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                
                // easeOutQuart easing function for smooth deceleration
                const easeProgress = 1 - Math.pow(1 - progress, 4);
                
                const currentVal = (easeProgress * target).toFixed(decimals);
                el.textContent = currentVal + suffix;

                if (progress < 1) {
                    window.requestAnimationFrame(step);
                } else {
                    // Ensure the final value is exactly the target
                    el.textContent = target.toFixed(decimals) + suffix; 
                }
            };

            window.requestAnimationFrame(step);
        };

        const metricsObserver = new IntersectionObserver((entries) => {
            const [entry] = entries;
            // Trigger the animation only once when the section is at least 50% visible
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                metricNumbers.forEach(num => animateCounter(num));
            }
        }, { threshold: 0.5 }); 

        metricsObserver.observe(metricsSection);
    }


    // Remove hash from the URL on load without triggering a page reload
    if (window.location.hash) {
        setTimeout(() => {
            window.scrollTo(0, 0);
            history.replaceState(null, null, window.location.pathname + window.location.search);
        }, 1);
    }

    
});