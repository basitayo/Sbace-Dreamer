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
                // Set max-height to the actual scrollHeight to allow CSS transition to work
                body.style.maxHeight = body.scrollHeight + 32 + "px"; // 32px accounts for the padding-bottom
            }
        });
    });
});