/* ==========================================================================
   PRIME COAT PAINTING - INTERACTION CONTROLLER
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. STICKY NAVBAR LOGIC
    const header = document.getElementById('header');
    
    const toggleHeaderScrolled = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', toggleHeaderScrolled, { passive: true });
    toggleHeaderScrolled();

    // 2. SMOOTH SCROLL REVEALS (Intersection Observer)
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal-up, .reveal-scale').forEach(element => {
        revealObserver.observe(element);
    });

    // 3. ENHANCED BEFORE/AFTER IMAGE SLIDER
    const sliderInput = document.querySelector('.slider');
    const imageAfter = document.querySelector('.image-after');
    const sliderLine = document.querySelector('.slider-line');
    
    if (sliderInput && imageAfter && sliderLine) {
        sliderInput.addEventListener('input', (e) => {
            const value = e.target.value;
            // Update the clip path of the after image to reveal the before image
            imageAfter.style.clipPath = `polygon(0 0, ${value}% 0, ${value}% 100%, 0 100%)`;
            // Move the slider dividing line
            sliderLine.style.left = `${value}%`;
        });
    }

    // 4. FAQ ACCORDION LOGIC
    const accordionTriggers = document.querySelectorAll('.accordion-trigger');
    
    accordionTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const parentItem = this.parentElement;
            const content = this.nextElementSibling;
            
            // Close other open items
            document.querySelectorAll('.accordion-item.active').forEach(item => {
                if (item !== parentItem) {
                    item.classList.remove('active');
                    item.querySelector('.accordion-content').style.maxHeight = null;
                }
            });

            // Toggle active state
            parentItem.classList.toggle('active');
            
            // Adjust height
            if (parentItem.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });
});