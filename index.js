document.addEventListener('DOMContentLoaded', () => {
    // Header Scroll Effect
    const header = document.querySelector('.site-header');
    const bgVideo = document.querySelector('#bg-video');
    const videoOverlay = document.querySelector('.video-overlay');
    const aiOverlays = document.querySelector('#ai-overlays');

    window.addEventListener('scroll', () => {
        // Background Video Opacity/Scale Effect
        const scrollPercent = window.scrollY / window.innerHeight;

        if (scrollPercent < 1) {
            const opacity = 1 - (scrollPercent * 0.5);
            bgVideo.style.opacity = Math.max(0.5, opacity);
            videoOverlay.style.background = `linear-gradient(to bottom, rgba(15, 20, 50, ${0.4 + scrollPercent * 0.4}), rgba(15, 20, 50, ${0.8 + scrollPercent * 0.2}))`;
        } else {
            // Standardize transparency for all sections below hero
            bgVideo.style.opacity = 0.5;
            videoOverlay.style.background = `linear-gradient(to bottom, rgba(15, 20, 50, 0.8), rgba(15, 20, 50, 1))`;
        }
    });

    // Reveal Animations on Scroll
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // Simulated Form Submission
    const waitlistForm = document.getElementById('waitlist-form');
    const formSuccess = document.getElementById('form-success');

    if (waitlistForm) {
        waitlistForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simulation
            const submitBtn = waitlistForm.querySelector('button');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'Registering...';
            submitBtn.disabled = true;

            setTimeout(() => {
                waitlistForm.classList.add('hidden');
                formSuccess.classList.remove('hidden');

                // Track interest (simulated)
                console.log('Enquiry Captured: Simulated redirect/tracking event here.');
            }, 1500);
        });
    }
});
