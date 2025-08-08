
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

        // Handle form submission
        function handleSubmit(event) {
            event.preventDefault();
            const email = event.target.querySelector('input[type="email"]').value;
            
            // Here you would normally send this to your backend
            // For now, we'll just show an alert
            alert(`Thanks for joining the waitlist! We'll notify ${email} when Tennis Rating launches.`);
            
            // Clear the form
            event.target.reset();
            
            // You could also track this with analytics
            console.log('Waitlist signup:', email);
        }

        // Add animation on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 1s ease forwards';
                }
            });
        }, observerOptions);

        // Observe all feature cards and steps
        document.querySelectorAll('.feature-card, .step, .stat-item').forEach(el => {
            observer.observe(el);
        });

        // Change nav background on scroll
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('nav');
            if (window.scrollY > 100) {
                nav.style.background = 'rgba(26, 26, 46, 0.98)';
                nav.style.boxShadow = '0 5px 20px rgba(0,0,0,0.3)';
            } else {
                nav.style.background = 'rgba(26, 26, 46, 0.95)';
                nav.style.boxShadow = 'none';
            }
        });

        // Animated counter for stats
        function animateCounter(element, target, duration = 2000) {
            let start = 0;
            const increment = target / (duration / 16);
            const timer = setInterval(() => {
                start += increment;
                if (start >= target) {
                    element.textContent = element.dataset.prefix + target + element.dataset.suffix;
                    clearInterval(timer);
                } else {
                    element.textContent = element.dataset.prefix + Math.floor(start) + element.dataset.suffix;
                }
            }, 16);
        }

        // Trigger counter animation when stats section is visible
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.animated) {
                    entry.target.dataset.animated = 'true';
                    const statNumbers = entry.target.querySelectorAll('.stat-item h3');
                    statNumbers[0].dataset.prefix = '';
                    statNumbers[0].dataset.suffix = '%';
                    animateCounter(statNumbers[0], 95);
                    
                    // For other stats, you'd handle them similarly
                }
            });
        }, observerOptions);

        const statsSection = document.querySelector('.stats-grid');
        if (statsSection) {
            statsObserver.observe(statsSection);
        }
