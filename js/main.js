// Silence IDE-specific visual editor errors in console (Internal Trae tool logs)
(function() {
    const originalError = console.error;
    console.error = function(...args) {
        if (args[0] && typeof args[0] === 'string' && (args[0].includes('visualEditorElementSelected') || args[0].includes('No handler registered'))) {
            return;
        }
        originalError.apply(console, args);
    };
})();

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navIcon = hamburger ? hamburger.querySelector('i') : null;

    const closeMenu = () => {
        if (navLinks && hamburger && navIcon) {
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
            hamburger.setAttribute('aria-expanded', 'false');
            navIcon.classList.add('fa-bars');
            navIcon.classList.remove('fa-times');
        }
    };

    if (hamburger && navLinks && navIcon) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const isOpen = navLinks.classList.contains('active');
            document.body.classList.toggle('menu-open', isOpen);
            hamburger.setAttribute('aria-expanded', String(isOpen));
            navIcon.classList.toggle('fa-bars');
            navIcon.classList.toggle('fa-times');
        });
    }

    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nameField = document.getElementById('name');
            const emailField = document.getElementById('email');
            const phoneField = document.getElementById('phone');
            const messageField = document.getElementById('message');

            const name = nameField?.value.trim() || '';
            const email = emailField?.value.trim() || '';
            const phone = phoneField?.value.trim() || '';
            const message = messageField?.value.trim() || '';
            
            const emailIsValid = email ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) : true;
            const phoneIsValid = phone ? /^[0-9+()\-\s]{7,}$/.test(phone) : true;

            formStatus.style.display = 'block';

            // Check required fields based on existence in DOM
            if ((nameField && !name) || (emailField && !email) || (phoneField && !phone) || (messageField && !message)) {
                formStatus.style.color = 'var(--danger)';
                formStatus.textContent = 'Please complete all required fields before submitting.';
                return;
            }

            if (emailField && !emailIsValid) {
                formStatus.style.color = 'var(--danger)';
                formStatus.textContent = 'Please enter a valid email address.';
                return;
            }

            if (phoneField && !phoneIsValid) {
                formStatus.style.color = 'var(--danger)';
                formStatus.textContent = 'Please enter a valid phone number.';
                return;
            }

            formStatus.style.color = 'var(--success)';
            formStatus.textContent = 'Thank you. Your message has been received and our team will contact you shortly.';
            contactForm.reset();
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                closeMenu();
            }
        });
    });

    const currentLocation = location.href;
    const menuItem = document.querySelectorAll('.nav-links a:not(.btn)');
    for (let i = 0; i < menuItem.length; i += 1) {
        if (menuItem[i].href === currentLocation) {
            menuItem.forEach((item) => item.classList.remove('active'));
            menuItem[i].classList.add('active');
        }
    }

    menuItem.forEach((item) => {
        item.addEventListener('click', closeMenu);
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });

    const revealElements = document.querySelectorAll('[data-reveal]');
    if (revealElements.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        revealElements.forEach((element) => observer.observe(element));
    }

    // Floating Support Button Toggle
    const fabContainer = document.querySelector('.fab-container');
    const fabMain = document.getElementById('fabMain');

    if (fabContainer && fabMain) {
        fabMain.addEventListener('click', (e) => {
            e.stopPropagation();
            fabContainer.classList.toggle('active');
            fabMain.classList.toggle('active');
            
            const icon = fabMain.querySelector('i');
            if (fabMain.classList.contains('active')) {
                icon.classList.remove('fa-headset');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-headset');
            }
        });

        // Close FAB when clicking outside
        document.addEventListener('click', (e) => {
            if (!fabContainer.contains(e.target)) {
                fabContainer.classList.remove('active');
                fabMain.classList.remove('active');
                const icon = fabMain.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-headset');
                }
            }
        });
    }
});
