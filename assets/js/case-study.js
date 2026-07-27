document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Footer Year
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // 2. Header Scroll Effect
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
        threshold: 0.02
    };

    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after running once
                observerInstance.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Apply observer to all elements with the 'fade-up' class
    document.querySelectorAll('.fade-up').forEach((elem) => {
        observer.observe(elem);
    });

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
});