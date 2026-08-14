// ===================================
// ONE-BY-ONE FADE UP REVEAL
// REPLACE OLD FADE JS WITH THIS
// ===================================

const fadeItems = [
    document.querySelector("header"),
    document.querySelector(".precisiveheeader"),
    document.querySelector(".first-underersectonnne"),
    document.querySelector(".seccceonddsssbbs"),
    document.querySelector(".uehdhuhdh-oomsbbs")
];

// add fade class
fadeItems.forEach(item=>{
    item.classList.add("fade-up");
});

// observer
const fadeObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            // reveal one by one
            fadeItems.forEach((item, index)=>{

                setTimeout(()=>{
                    item.classList.add("show");
                }, index * 350);

            });

        }

    });

},{
    threshold: 0.15
});

// observe first section
fadeObserver.observe(document.querySelector("main"));





// Get elements
const bookingBtn = document.querySelector(".bookavieeebtn button");
const modal = document.getElementById("bookingModal");
const closeModal = document.querySelector(".close-modal");
const bookingForm = document.getElementById("bookingForm");
const successMessage = document.getElementById("successMessage");

// Open Modal
bookingBtn.addEventListener("click", () => {
    modal.classList.add("active");
});

// Close Modal (clicking X or clicking outside the box)
closeModal.addEventListener("click", () => {
    modal.classList.remove("active");
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.remove("active");
    }
});

// Handle Form Submission
bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Animate the button to show "processing"
    const btn = document.querySelector(".submit-booking");
    btn.innerText = "Generating Ticket...";
    
    setTimeout(() => {
        bookingForm.style.display = "none";
        successMessage.style.display = "block";
        
        // Auto-close after 3 seconds
        setTimeout(() => {
            modal.classList.remove("active");
            // Reset for next time
            setTimeout(() => {
                bookingForm.style.display = "block";
                successMessage.style.display = "none";
                btn.innerText = "Confirm Booking";
            }, 500);
        }, 3000);
    }, 1500);
});