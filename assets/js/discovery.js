document.addEventListener('DOMContentLoaded', () => {
    // FAQ Accordion Logic
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all currently open items to maintain a clean layout
            accordionItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                const otherBody = otherItem.querySelector('.accordion-body');
                otherBody.style.maxHeight = null;
            });

            // If the clicked item was not active, open it
            if (!isActive) {
                item.classList.add('active');
                const body = item.querySelector('.accordion-body');
                // Calculate actual scroll height + accounting for the padding applied via CSS active class
                body.style.maxHeight = body.scrollHeight + 32 + "px"; 
            }
        });
    });


    // Form Submission & Success Modal Logic
    const bookingForm = document.querySelector('.booking-form');
    const successModal = document.getElementById('successModal');
    const closeModalBtn = document.querySelector('.close-modal-btn');

    if (bookingForm) {
        bookingForm.addEventListener('submit', async function(e) {
            e.preventDefault(); // Prevent page reload
            
            const submitBtn = bookingForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.textContent;
            
            // Provide visual feedback while sending
            submitBtn.textContent = 'Sending Request...';
            submitBtn.disabled = true;

            const formData = new FormData(bookingForm);

            try {
                // Send data to Formspree
                const response = await fetch(bookingForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Show success modal & reset form
                    successModal.classList.add('active');
                    bookingForm.reset();
                } else {
                    alert('Oops! There was a problem submitting your form. Please try again.');
                }
            } catch (error) {
                alert('Oops! A network error occurred. Please try again later.');
            } finally {
                // Restore button state
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }

    // Modal Close Logic
    const closeModal = () => {
        if (successModal) {
            successModal.classList.remove('active');
        }
    };

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside the modal content
    window.addEventListener('click', (e) => {
        if (e.target === successModal) {
            closeModal();
        }
    });
});