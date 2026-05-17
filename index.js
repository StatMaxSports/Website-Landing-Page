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

    // Scroll Spy (Highlight active section in nav)
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link-item');

    const scrollSpyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');

                // List of sections that SHOULD have nav links highlighted
                const highlightableSections = ['how-it-works', 'built-for', 'whats-ahead'];

                // Highlight Nav Links only if we are in a highlightable section
                navLinks.forEach(link => {
                    const isTargetSection = highlightableSections.includes(id);
                    // Also check if we are not at the very top (Hero) or bottom (Contact)
                    const scrollPos = window.scrollY;
                    const isTop = scrollPos < 100;
                    const isBottom = (window.innerHeight + scrollPos) >= document.body.offsetHeight - 50;

                    link.classList.toggle('active', isTargetSection && !isTop && !isBottom && link.getAttribute('href') === `#${id}`);
                });

                // Handle CTA Button state specifically
                const ctaBtn = document.querySelector('.nav-cta-btn');
                if (ctaBtn) {
                    ctaBtn.classList.toggle('active', id === 'contact');
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "-10% 0px -10% 0px"
    });

    sections.forEach(section => scrollSpyObserver.observe(section));

    // Clear highlights when at the very top or bottom
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;
        const isTop = scrollPos < 100;
        const isBottom = (window.innerHeight + scrollPos) >= document.body.offsetHeight - 50;

        if (isTop || isBottom) {
            navLinks.forEach(link => link.classList.remove('active'));
        }
    });

    // Functional Form Submission
    const waitlistForm = document.querySelector('.waitlist-form');
    if (waitlistForm) {
        waitlistForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = waitlistForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;

            // Basic UI Feedback
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            const formData = new FormData(waitlistForm);
            const data = Object.fromEntries(formData.entries());

            try {
                const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxAvJPmTDdFf7aFhin5jN7z7aQWoKUrYQgpYDMKAGXheNaoH2oYsdIGlnMnt0RpdVyZ/exec';

                const response = await fetch(SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors', // Important for Google Apps Script cross-origin
                    cache: 'no-cache',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });

                // Success State
                waitlistForm.innerHTML = `
                    <div class="success-message" style="text-align: center; padding: 2rem;">
                        <h3 style="color: var(--accent-yellow); margin-bottom: 1rem;">Enquiry Received!</h3>
                        <p style="color: var(--bg-navy);">Thank you for your interest. We'll be in touch at <b>${data.email}</b> shortly.</p>
                        <button onclick="location.reload()" class="btn btn-primary" style="margin-top: 1.5rem;">Send Another</button>
                    </div>
                `;
            } catch (error) {
                console.error('Submission error:', error);
                alert('There was an error sending your enquiry. Please try again or email us directly.');
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }
        });
    }
});
