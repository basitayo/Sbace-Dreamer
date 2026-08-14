const cardsSection = document.querySelector(".groomingservices-cardsscc");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            cardsSection.classList.add("show");
        }
    });
}, {
    threshold: 0.3
});

observer.observe(cardsSection);

// ADD THIS TO script.js

const heroItems = document.querySelectorAll(
    ".givefur-tit-on, .grooming-premmiuu-on, .Bookedofferminisec-on"
);

const heroObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
},{
    threshold:0.3
});

heroItems.forEach(item=>{
    heroObserver.observe(item);
});


// REPLACE YOUR OLD RIPPLE JS WITH THIS

const rippleItems = document.querySelectorAll(
    "header button, header .nav-linkss a"
);

rippleItems.forEach(item => {
    item.addEventListener("mouseenter", function(){

        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);

        const ripple = document.createElement("span");

        if(this.matches(".nav-linkss a")){
            ripple.classList.add("ripple-nav");
        }else{
            ripple.classList.add("ripple");
        }

        ripple.style.width = size + "px";
        ripple.style.height = size + "px";

        ripple.style.left = (rect.width / 2 - size / 2) + "px";
        ripple.style.top = (rect.height / 2 - size / 2) + "px";

        this.appendChild(ripple);

        ripple.addEventListener("animationend", ()=>{
            ripple.remove();
        });
    });
});


// ADD THIS TO BOTTOM OF script.js

/* scroll reveal for many sections */
const revealItems = document.querySelectorAll(`
.teamexperi-onnss,
.teamaboutusess-onno,
.persondogimag,
.stylingservititle-maai,
.und-mainsecfive .styylesev-spoptitle,
.caraselimmgg,
.groprocomming-onsst,
.footerquote-undssdt,
.bestdealssnotations,
.legalmetionsonms
`.replace(/\n/g,''));

revealItems.forEach(item=>{
    item.classList.add("reveal-up");
});

const revealObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
},{
    threshold:0.18
});

revealItems.forEach(item=>{
    revealObserver.observe(item);
});


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