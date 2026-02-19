document.addEventListener('DOMContentLoaded', () => {
    // Header Scroll Effect
    const header = document.querySelector('.site-header');
    const bgVideo = document.querySelector('#bg-video');
    const videoOverlay = document.querySelector('.video-overlay');
    const aiOverlays = document.querySelector('#ai-overlays');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Background Video Opacity/Scale Effect
        const scrollPercent = window.scrollY / window.innerHeight;
        if (scrollPercent < 1.5) {
            const opacity = 1 - (scrollPercent * 0.5);
            bgVideo.style.opacity = Math.max(0.4, opacity);
            videoOverlay.style.background = `linear-gradient(to bottom, rgba(15, 20, 50, ${0.4 + scrollPercent * 0.4}), rgba(15, 20, 50, ${0.8 + scrollPercent * 0.2}))`;

            // Fade out the AI overlays as we scroll away from hero
            aiOverlays.style.opacity = Math.max(0, 0.8 - scrollPercent * 1.5);
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

    // Dynamic AI Overlays Movement (Subtle simulation)
    const boxes = document.querySelectorAll('.ai-box');
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;

        boxes.forEach((box, index) => {
            const shift = (index + 1) * 0.5;
            box.style.transform = `translate(${x * shift}px, ${y * shift}px)`;
        });
    });
});
