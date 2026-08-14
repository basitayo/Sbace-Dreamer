document.addEventListener('DOMContentLoaded', () => {
            const video = document.getElementById('heroVideo');
            const toggleBtn = document.getElementById('videoToggleBtn');
            const videoIcon = toggleBtn.querySelector('.video-icon');
            const videoText = toggleBtn.querySelector('.video-text');

            toggleBtn.addEventListener('click', () => {
                if (video.paused) {
                    video.play();
                    videoIcon.textContent = '▌▌';
                    videoText.textContent = 'Pause Video';
                    toggleBtn.setAttribute('aria-label', 'Pause background video');
                } else {
                    video.pause();
                    videoIcon.textContent = '▶';
                    videoText.textContent = 'Watch Video';
                    toggleBtn.setAttribute('aria-label', 'Play background video');
                }
            });
        });