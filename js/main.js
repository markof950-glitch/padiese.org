document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Simple hamburger animation
        const spans = mobileBtn.querySelectorAll('span');
        if (navLinks.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Scroll Reveal Animation
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load

    // Number Counter Animation
    const counters = document.querySelectorAll('.stat-number');
    let hasCounted = false;

    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // ms
            const increment = target / (duration / 16); // 60fps

            let current = 0;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target + (target > 1000 ? '+' : '');
                }
            };
            updateCounter();
        });
    };

    // Trigger counters when impact section is visible
    const impactSection = document.querySelector('.impact');
    if(impactSection) {
        window.addEventListener('scroll', () => {
            if (hasCounted) return;
            const elementTop = impactSection.getBoundingClientRect().top;
            if (elementTop < window.innerHeight - 100) {
                animateCounters();
                hasCounted = true;
            }
        });
    }

    // Image Sliders
    const sliderContainers = document.querySelectorAll('.slider-container');
    sliderContainers.forEach(container => {
        const slider = container.querySelector('.slider');
        const prevBtn = container.querySelector('.slider-btn.prev');
        const nextBtn = container.querySelector('.slider-btn.next');
        const dotsContainer = container.querySelector('.slider-dots');
        const images = slider.querySelectorAll('img');
        
        if(images.length <= 1) {
            if(prevBtn) prevBtn.style.display = 'none';
            if(nextBtn) nextBtn.style.display = 'none';
            return;
        }

        // Create dots
        images.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if(index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                slider.scrollTo({
                    left: slider.clientWidth * index,
                    behavior: 'smooth'
                });
            });
            if(dotsContainer) dotsContainer.appendChild(dot);
        });

        const updateDots = () => {
            const index = Math.round(slider.scrollLeft / slider.clientWidth);
            if(dotsContainer) {
                dotsContainer.querySelectorAll('.slider-dot').forEach((dot, i) => {
                    dot.classList.toggle('active', i === index);
                });
            }
        };

        slider.addEventListener('scroll', updateDots);

        if(prevBtn) {
            prevBtn.addEventListener('click', () => {
                slider.scrollBy({ left: -slider.clientWidth, behavior: 'smooth' });
            });
        }
        if(nextBtn) {
            nextBtn.addEventListener('click', () => {
                slider.scrollBy({ left: slider.clientWidth, behavior: 'smooth' });
            });
        }
    });
});
