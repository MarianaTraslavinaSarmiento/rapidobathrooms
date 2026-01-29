document.addEventListener('DOMContentLoaded', () => {
    const headerToggle = document.querySelector('.header__toggle');
    const headerNav = document.querySelector('.header__nav');
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const closeIcon = document.querySelector('.close-icon');
    const navLinks = document.querySelectorAll('.header__link');
    const sections = document.querySelectorAll('section');

    // Mobile Menu Toggle
    if (headerToggle) {
        headerToggle.addEventListener('click', () => {
            const isOpen = headerNav.classList.toggle('is-open');
            headerToggle.setAttribute('aria-expanded', isOpen);
            
            // Toggle icons
            if (isOpen) {
               hamburgerIcon.style.display = 'none';
               closeIcon.style.display = 'block';
            } else {
               hamburgerIcon.style.display = 'block';
               closeIcon.style.display = 'none';
            }
        });
    }

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (headerNav.classList.contains('is-open')) {
                headerNav.classList.remove('is-open');
                headerToggle.setAttribute('aria-expanded', 'false');
                hamburgerIcon.style.display = 'block';
                closeIcon.style.display = 'none';
            }
        });
    });

    // Active Link Highlighting with IntersectionObserver
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -50% 0px', // Trigger when section is near center/top
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to corresponding link
                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.header__link[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});

