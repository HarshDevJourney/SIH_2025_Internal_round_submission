
// Theme Management (Updated for Unicode icons)
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;

        // Check for saved theme preference or default to light mode
        const currentTheme = localStorage.getItem('theme') || 'light';
        if (currentTheme === 'dark') {
            body.setAttribute('data-theme', 'dark');
            themeToggle.textContent = '☀️';
        } else {
            themeToggle.textContent = '🌙';
        }

        function toggleTheme() {
            const isDark = body.getAttribute('data-theme') === 'dark';
            
            if (isDark) {
                body.removeAttribute('data-theme');
                themeToggle.textContent = '🌙';
                localStorage.setItem('theme', 'light');
            } else {
                body.setAttribute('data-theme', 'dark');
                themeToggle.textContent = '☀️';
                localStorage.setItem('theme', 'dark');
            }
        }

        // Add event listeners for theme toggle
        themeToggle.addEventListener('click', toggleTheme);

        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const mobileMenu = document.getElementById('mobileMenu');

        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('show');
            if (mobileMenu.classList.contains('show')) {
                this.textContent = '✕';
            } else {
                this.textContent = '☰';
            }
        });

        // Loading screen
        function showLoading() {
            document.getElementById('loading').classList.add('show');
        }

        function hideLoading() {
            document.getElementById('loading').classList.remove('show');
        }

        // Role selection with actual file redirection
        function selectRole(role) {
            showLoading();
            
            // Define the file paths for each dashboard based on your file structure
            const dashboardFiles = {
                'student': 'student.html',
                'mentor': 'mentor.html',
                'guardian': 'guard.html'
            };
            
            setTimeout(() => {
                hideLoading();
                
                // Store user role in localStorage for dashboard personalization
                localStorage.setItem('userRole', role);
                localStorage.setItem('loginTime', new Date().toISOString());
                localStorage.setItem('userName', getUserName(role)); // Optional: store user name
                
                // Redirect to the appropriate dashboard
                if (dashboardFiles[role]) {
                    window.location.href = dashboardFiles[role];
                } else {
                    console.error('Dashboard file not found for role:', role);
                    showErrorNotification('Dashboard not available. Please contact support.');
                }
            }, 1500);
        }

        // Helper function to get user name based on role (optional)
        function getUserName(role) {
            const defaultNames = {
                'student': 'Student User',
                'mentor': 'Mentor User', 
                'guardian': 'Guardian User'
            };
            return defaultNames[role];
        }

        // Error notification function
        function showErrorNotification(message) {
            const errorNotification = document.createElement('div');
            errorNotification.innerHTML = `
                <div style="
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: var(--bg-primary);
                    border: 2px solid #ef4444;
                    border-radius: 16px;
                    padding: 2rem;
                    text-align: center;
                    z-index: 3000;
                    box-shadow: var(--shadow-xl);
                    backdrop-filter: blur(10px);
                    max-width: 400px;
                    width: 90%;
                ">
                    <div style="
                        width: 60px;
                        height: 60px;
                        background: linear-gradient(135deg, #ef4444, #dc2626);
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin: 0 auto 1rem;
                        color: white;
                        font-size: 1.5rem;
                    ">
                        ⚠️
                    </div>
                    <h3 style="color: var(--text-primary); margin-bottom: 0.5rem;">Error</h3>
                    <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">
                        ${message}
                    </p>
                    <button onclick="this.parentElement.parentElement.remove()" style="
                        background: linear-gradient(135deg, #ef4444, #dc2626);
                        color: white;
                        border: none;
                        padding: 0.75rem 1.5rem;
                        border-radius: 8px;
                        cursor: pointer;
                        font-weight: 600;
                    ">
                        OK
                    </button>
                </div>
                <div style="
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    backdrop-filter: blur(5px);
                    z-index: 2999;
                " onclick="this.parentElement.remove()"></div>
            `;
            document.body.appendChild(errorNotification);
        }

        // Smooth scrolling for navigation links
        function scrollToSection(sectionId) {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }

        // Demo function
        function showDemo() {
            const demoNotification = document.createElement('div');
            demoNotification.innerHTML = `
                <div style="
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: var(--bg-primary);
                    border: 2px solid var(--primary-color);
                    border-radius: 16px;
                    padding: 2rem;
                    text-align: center;
                    z-index: 3000;
                    box-shadow: var(--shadow-xl);
                    backdrop-filter: blur(10px);
                    max-width: 400px;
                    width: 90%;
                ">
                    <div style="
                        width: 60px;
                        height: 60px;
                        background: linear-gradient(135deg, #f59e0b, #d97706);
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin: 0 auto 1rem;
                        color: white;
                        font-size: 1.5rem;
                    ">
                        📹
                    </div>
                    <h3 style="color: var(--text-primary); margin-bottom: 0.5rem;">Demo Coming Soon</h3>
                    <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">
                        We're preparing an interactive demo to showcase all the amazing features of EduVantage. Stay tuned!
                    </p>
                    <button onclick="this.parentElement.parentElement.remove()" style="
                        background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
                        color: white;
                        border: none;
                        padding: 0.75rem 1.5rem;
                        border-radius: 8px;
                        cursor: pointer;
                        font-weight: 600;
                    ">
                        Got it
                    </button>
                </div>
                <div style="
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    backdrop-filter: blur(5px);
                    z-index: 2999;
                " onclick="this.parentElement.remove()"></div>
            `;
            document.body.appendChild(demoNotification);
        }

        // Smooth scrolling for all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Close mobile menu if open
                    if (mobileMenu.classList.contains('show')) {
                        mobileMenu.classList.remove('show');
                        document.querySelector('.mobile-menu-toggle i').className = 'fas fa-bars';
                    }
                }
            });
        });

        // Scroll animations
        function animateOnScroll() {
            const elements = document.querySelectorAll('.scroll-animate');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            elements.forEach(element => {
                observer.observe(element);
            });
        }

        // Add ripple effect to buttons
        function addRippleEffect(button, event) {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        }

        // Initialize all features when page loads
        window.addEventListener('load', function() {
            animateOnScroll();
            
            // Add ripple effect to all buttons
            document.querySelectorAll('.btn-primary, .btn-secondary, .continue-btn, .theme-toggle').forEach(button => {
                button.addEventListener('click', function(e) {
                    if (!this.classList.contains('theme-toggle')) {
                        addRippleEffect(this, e);
                    }
                });
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                if (mobileMenu.classList.contains('show')) {
                    mobileMenu.classList.remove('show');
                    mobileMenuToggle.textContent = '☰';
                }
            }
        });

        // Add keyboard navigation support
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                // Close any open modals or mobile menu
                if (mobileMenu.classList.contains('show')) {
                    mobileMenu.classList.remove('show');
                    mobileMenuToggle.textContent = '☰';
                }
                // Close any notifications
                const notifications = document.querySelectorAll('[style*="position: fixed"]');
                notifications.forEach(notification => {
                    if (notification.style.zIndex > 2000) {
                        notification.parentElement.remove();
                    }
                });
            }
        });
