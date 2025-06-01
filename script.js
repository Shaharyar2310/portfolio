// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Page navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetPage = link.getAttribute('data-page');
            
            // Remove active class from all nav links and pages
            navLinks.forEach(nl => nl.classList.remove('active'));
            pages.forEach(page => page.classList.remove('active'));
            
            // Add active class to clicked nav link
            link.classList.add('active');
            
            // Show target page
            const targetPageElement = document.getElementById(targetPage);
            if (targetPageElement) {
                targetPageElement.classList.add('active');
                targetPageElement.classList.add('fade-in');
                
                // Remove fade-in class after animation
                setTimeout(() => {
                    targetPageElement.classList.remove('fade-in');
                }, 600);
            }
            
            // Close mobile menu if open
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Contact form handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                alert('Thank you for your message! I will get back to you soon.');
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Animate progress bars when resume page is visible
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress');
        const resumePage = document.getElementById('resume');
        
        if (resumePage && resumePage.classList.contains('active')) {
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
        }
    }

    // Trigger progress bar animation when resume page is shown
    const resumeLink = document.querySelector('[data-page="resume"]');
    if (resumeLink) {
        resumeLink.addEventListener('click', () => {
            setTimeout(animateProgressBars, 300);
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe project cards for animation
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        observer.observe(card);
    });

    // Observe timeline items for animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        observer.observe(item);
    });

    // Navbar background on scroll - removed for solid white navbar

    // Typing effect for the subtitle (optional enhancement)
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Apply typing effect to subtitle when about page is active
    const aboutLink = document.querySelector('[data-page="about"]');
    if (aboutLink) {
        aboutLink.addEventListener('click', () => {
            setTimeout(() => {
                const subtitle = document.querySelector('.subtitle');
                if (subtitle) {
                    typeWriter(subtitle, 'Full Stack Developer & Designer', 80);
                }
            }, 300);
        });
    }

    // Initialize with typing effect on first load
    setTimeout(() => {
        const subtitle = document.querySelector('.subtitle');
        if (subtitle) {
            typeWriter(subtitle, 'Full Stack Developer & Designer', 80);
        }
    }, 500);

    // Add click animation to buttons
    const buttons = document.querySelectorAll('.submit-btn, .social-link, .project-link');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .submit-btn, .social-link, .project-link {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);

    // Preload images for better performance
    const imageUrls = [
        'https://via.placeholder.com/400x400/4A90E2/FFFFFF?text=Profile+Photo',
        'https://via.placeholder.com/400x250/4A90E2/FFFFFF?text=E-Commerce+Platform',
        'https://via.placeholder.com/400x250/7B68EE/FFFFFF?text=Task+Management+App',
        'https://via.placeholder.com/400x250/FF6B6B/FFFFFF?text=Weather+Dashboard',
        'https://via.placeholder.com/400x250/20B2AA/FFFFFF?text=Portfolio+Website',
        'https://via.placeholder.com/400x250/FFA500/FFFFFF?text=Blog+Platform',
        'https://via.placeholder.com/400x250/9370DB/FFFFFF?text=Chat+Application'
    ];

    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });

    console.log('Portfolio website initialized successfully!');
});
