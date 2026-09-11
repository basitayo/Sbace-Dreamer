// Simple micro-interaction scroll script to swap states at 50px
        const header = document.getElementById('mainHeader');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });


// Ensure DOM layout exists before running script bindings
document.addEventListener('DOMContentLoaded', () => {
    
    // --- PART 1: FLOATING NAVBAR SCROLL TRACKER ---
    const header = document.getElementById('mainHeader');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- PART 2: GLASSMOPRHIC PLAY/PAUSE PILL CONTROLLER ---
    const actionPill = document.querySelector('.glass-action-pill');
    const nativeVideo = document.getElementById('showcaseVideo');
    const controlIcon = document.querySelector('.control-icon');
    const pillLabel = document.querySelector('.glass-pill-label');

    if (actionPill && nativeVideo) {
        actionPill.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevents layout target event bubbling triggers
            
            if (nativeVideo.paused) {
                nativeVideo.play();
                controlIcon.classList.remove('play-state');
                controlIcon.classList.add('pause-state');
                pillLabel.textContent = 'Pause Showreel';
            } else {
                nativeVideo.pause();
                controlIcon.classList.remove('pause-state');
                controlIcon.classList.add('play-state');
                pillLabel.textContent = 'Play Showreel';
            }
        });
    }

    // --- PART 3: REVEAL ON SCROLL INTERSECTION OBSERVER ---
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target); // Runs cleanly once per page execution lifecycle
            }
        });
    }, {
        threshold: 0.15 // Triggers element entry exactly when 15% becomes visible inside view matrix boundaries
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // --- PART 4: INTERACTIVE METRIC COUNTERS ENGINE ---
    const metricsSection = document.querySelector('.metrics-counter-bar');
    const counterNumbers = document.querySelectorAll('.metric-number');

    if (metricsSection && counterNumbers.length > 0) {
        const startCounters = () => {
            counterNumbers.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const duration = 2000; // Animation duration in milliseconds (2 seconds)
                const startTime = performance.now();

                const updateCount = (currentTime) => {
                    const elapsedTime = currentTime - startTime;
                    const progress = Math.min(elapsedTime / duration, 1);
                    
                    // Smooth out the animation calculation curve
                    const easeOutQuad = (t) => t * (2 - t);
                    const currentValue = Math.floor(easeOutQuad(progress) * target);
                    
                    counter.textContent = currentValue;

                    if (progress < 1) {
                        requestAnimationFrame(updateCount);
                    } else {
                        counter.textContent = target; // Ensure it finishes precisely on target
                    }
                };

                requestAnimationFrame(updateCount);
            });
        };

        // Fire calculation only when numbers scroll perfectly into view
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounters();
                    counterObserver.unobserve(entry.target); // Kill observer so it runs once
                }
            });
        }, { threshold: 0.4 }); // Triggers when 40% of the bar is visible

        counterObserver.observe(metricsSection);
    }


    // --- PART 5: CINEMATIC VINTAGE TIMECODE SIMULATOR RUNNER ---
    const timecodeFields = document.querySelectorAll('.hud-timecode');
    
    if (timecodeFields.length > 0) {
        setInterval(() => {
            const now = new Date();
            let hours = String(now.getHours()).padStart(2, '0');
            let minutes = String(now.getMinutes()).padStart(2, '0');
            let seconds = String(now.getSeconds()).padStart(2, '0');
            
            // Generate arbitrary random vintage camera frames running matrix metrics loops (00-24)
            let frames = String(Math.floor(Math.random() * 25)).padStart(2, '0');
            
            timecodeFields.forEach(field => {
                field.textContent = `00:${minutes}:${seconds}:${frames}`;
            });
        }, 40); // 40ms interval updates matching 25fps vintage playback speed metrics flawlessly
    }


    // Ensure DOM layout exists before running script bindings
    document.addEventListener('DOMContentLoaded', () => {
        
        // Force browser to reset viewport scroll positions on clean landing refresh
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);

        // --- PART 1: FLOATING NAVBAR SCROLL TRACKER ---
        const header = document.getElementById('mainHeader');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // (Keep the remaining existing logic for Parts 2, 3, 4, and 5 untouched below...)
    });

    // --- PART 6: BLOG GRID CAROUSEL CONTROLS ---
    const blogGrid = document.querySelector('.blog-grid');
    const prevBtn = document.querySelector('.arrow-btn.prev');
    const nextBtn = document.querySelector('.arrow-btn.next');

    if (blogGrid && prevBtn && nextBtn) {
        // Defines how far the grid scrolls on each click (matches approximate card width + gap)
        const scrollAmount = 350; 

        prevBtn.addEventListener('click', () => {
            blogGrid.scrollBy({ 
                left: -scrollAmount, 
                behavior: 'smooth' 
            });
        });

        nextBtn.addEventListener('click', () => {
            blogGrid.scrollBy({ 
                left: scrollAmount, 
                behavior: 'smooth' 
            });
        });
    }


    // --- PART 7: HAMBURGER MENU TOGGLE ---
    const menuBtn = document.querySelector('.menu-btn');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuSvgPath = menuBtn.querySelector('svg path');

    if (menuBtn && menuOverlay) {
        menuBtn.addEventListener('click', () => {
            // Toggle the active class on the overlay
            const isActive = menuOverlay.classList.toggle('active');
            
            // Swap the SVG icon path
            if (isActive) {
                // Morph into an 'X' icon
                menuSvgPath.setAttribute('d', 'M6 18L18 6M6 6l12 12');
            } else {
                // Revert back to the 3-line hamburger icon
                menuSvgPath.setAttribute('d', 'M3 12h18M3 6h18M3 18h18');
            }
        });
    }


    
});