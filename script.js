// Enhanced JavaScript for Tennis Rating Landing Page

// Smooth scroll behavior for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Enhanced form submission with better feedback
function handleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const emailInput = form.querySelector('input[type="email"]');
    const submitButton = form.querySelector('button[type="submit"]');
    const email = emailInput.value;
    
    // Show loading state
    const originalButtonText = submitButton.innerHTML;
    submitButton.innerHTML = '<span>⏳</span> Joining...';
    submitButton.disabled = true;
    
    // Simulate API call (replace with actual backend integration)
    setTimeout(() => {
        // Success animation
        submitButton.innerHTML = '<span>✅</span> You\'re In!';
        submitButton.style.background = 'linear-gradient(135deg, #00D46A 0%, #00a050 100%)';
        
        // Show success message
        showSuccessMessage(email);
        
        // Track with Google Analytics if available
        if (typeof gtag !== 'undefined') {
            gtag('event', 'waitlist_signup', {
                'event_category': 'engagement',
                'event_label': 'landing_page'
            });
        }
        
        // Reset form after delay
        setTimeout(() => {
            form.reset();
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
            submitButton.style.background = '';
        }, 3000);
    }, 1000);
}

// Show success message with animation
function showSuccessMessage(email) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div class="success-content">
            <h3>🎉 Welcome to Tennis Rating!</h3>
            <p>We've added <strong>${email}</strong> to our early access list.</p>
            <p>You'll be among the first to know when we launch!</p>
        </div>
    `;
    
    document.body.appendChild(successDiv);
    
    // Trigger animation
    setTimeout(() => successDiv.classList.add('show'), 10);
    
    // Remove after 5 seconds
    setTimeout(() => {
        successDiv.classList.remove('show');
        setTimeout(() => successDiv.remove(), 300);
    }, 5000);
}

// Add animation on scroll with stagger effect
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                entry.target.style.opacity = '1';
            }, index * 100); // Stagger animations
        }
    });
}, observerOptions);

// Observe all animatable elements
document.querySelectorAll('.feature-card, .step, .stat-item').forEach(el => {
    el.style.opacity = '0'; // Start hidden
    observer.observe(el);
});

// Enhanced nav background on scroll with progress indicator
let lastScrollY = window.scrollY;
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = (scrollY / maxScroll) * 100;
    
    // Update nav background
    if (scrollY > 100) {
        nav.style.background = 'rgba(26, 26, 46, 0.98)';
        nav.style.boxShadow = '0 5px 20px rgba(0,0,0,0.3)';
    } else {
        nav.style.background = 'rgba(26, 26, 46, 0.95)';
        nav.style.boxShadow = 'none';
    }
    
    // Add scroll progress bar
    updateScrollProgress(scrollProgress);
    
    lastScrollY = scrollY;
});

// Scroll progress indicator
function updateScrollProgress(progress) {
    let progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.querySelector('nav').appendChild(progressBar);
    }
    progressBar.style.width = `${progress}%`;
}

// Enhanced animated counter with formatting
function animateCounter(element, target, duration = 2000, format = null) {
    let start = 0;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Apply formatting
        let displayValue = Math.floor(current);
        if (format === 'percentage') {
            element.textContent = displayValue + '%';
        } else if (format === 'ms') {
            element.textContent = '<' + displayValue + 'ms';
        } else {
            element.textContent = displayValue;
        }
    }, 16);
}

// Enhanced stats animation with proper formatting
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = 'true';
            const statItems = entry.target.querySelectorAll('.stat-item');
            
            statItems.forEach((item, index) => {
                setTimeout(() => {
                    const h3 = item.querySelector('h3');
                    const text = h3.textContent;
                    
                    if (text.includes('%')) {
                        animateCounter(h3, 95, 2000, 'percentage');
                    } else if (text.includes('ms')) {
                        animateCounter(h3, 130, 2000, 'ms');
                    } else if (text === '3') {
                        animateCounter(h3, 3, 1000);
                    } else if (text.includes('100')) {
                        animateCounter(h3, 100, 2000, 'percentage');
                    }
                    
                    // Add pulse animation after counter
                    h3.style.animation = 'pulse 0.5s ease';
                }, index * 200);
            });
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.stats-grid');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Add interactive phone mockup animation
const phoneMockup = document.querySelector('.phone-mockup');
if (phoneMockup) {
    phoneMockup.addEventListener('mouseenter', () => {
        const dots = phoneMockup.querySelectorAll('.pose-dot');
        dots.forEach((dot, index) => {
            setTimeout(() => {
                dot.style.animation = 'pulse 0.5s ease';
                setTimeout(() => {
                    dot.style.animation = 'glow 2s ease-in-out infinite';
                }, 500);
            }, index * 100);
        });
    });
}

// Add typing effect for hero headline
function addTypingEffect() {
    const headline = document.querySelector('.hero-text h1');
    if (!headline) return;
    
    const originalText = headline.innerHTML;
    const textBeforeSpan = 'Your Personal ';
    const spanContent = 'AI Tennis Coach';
    
    // Only run typing effect once
    if (headline.dataset.typed) return;
    headline.dataset.typed = 'true';
    
    // Clear and rebuild with typing effect
    headline.innerHTML = '';
    let charIndex = 0;
    
    function typeChar() {
        if (charIndex < textBeforeSpan.length) {
            headline.innerHTML += textBeforeSpan[charIndex];
            charIndex++;
            setTimeout(typeChar, 50);
        } else {
            // Add the highlighted span with typing effect
            const span = document.createElement('span');
            span.className = 'highlight';
            headline.appendChild(span);
            
            let spanIndex = 0;
            function typeSpan() {
                if (spanIndex < spanContent.length) {
                    span.textContent += spanContent[spanIndex];
                    spanIndex++;
                    setTimeout(typeSpan, 80);
                }
            }
            typeSpan();
        }
    }
    
    // Start typing after a small delay
    setTimeout(typeChar, 500);
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', addTypingEffect);

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// Add hover effect for feature cards with tilt
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Add custom cursor for interactive elements
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button, .feature-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// Initialize AOS-like animations for mobile
if (window.innerWidth <= 768) {
    document.querySelectorAll('.hero-text h1, .hero-text p, .cta-buttons').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            el.style.transition = 'all 0.8s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Add demo video modal functionality
document.querySelectorAll('.btn-secondary').forEach(btn => {
    if (btn.textContent.includes('Watch Demo')) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showDemoModal();
        });
    }
});

function showDemoModal() {
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
    <div class="modal-content">
        <span class="close-modal">&times;</span>
        <video controls autoplay>
            <source src="TennisPromo.mp4" type="video/mp4">
        </video>
    </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);
    
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        }
    });
}