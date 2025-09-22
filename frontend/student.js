// Global variables
        let currentTab = 'courses';
        
        // Theme Management
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
                showNotification('Switched to Light Mode', 'success');
            } else {
                body.setAttribute('data-theme', 'dark');
                themeToggle.textContent = '☀️';
                localStorage.setItem('theme', 'dark');
                showNotification('Switched to Dark Mode', 'success');
            }
        }

        // Tab Management
        function switchTab(tabName) {
            // Update active tab
            document.querySelectorAll('.nav-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

            // Hide all tab content
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.add('hidden');
            });

            // Show selected tab content
            document.getElementById(`${tabName}-tab`).classList.remove('hidden');
            currentTab = tabName;
            
            showNotification(`Switched to ${tabName.charAt(0).toUpperCase() + tabName.slice(1)} tab`, 'info');
        }

        // Progress Bar Animation
        function animateProgressBars() {
            setTimeout(() => {
                document.querySelectorAll('.progress-fill').forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width + '%';
                });
            }, 500);
        }

        // Course Details
        function openCourseDetails(courseCode) {
            showNotification(`Opening detailed view for ${courseCode}`, 'info');
            setTimeout(() => {
                showDialog(
                    `Course Details - ${courseCode}`,
                    `Detailed information about ${courseCode} including syllabus, grades, assignments, and announcements.`,
                    [
                        { text: 'View Syllabus', action: () => showNotification('Syllabus opened', 'info') },
                        { text: 'Check Grades', action: () => showNotification('Grade book opened', 'info') },
                        { text: 'Close', action: () => {} }
                    ]
                );
            }, 500);
        }

        // Assignment Details
        function openAssignment(assignmentName) {
            showNotification(`Opening ${assignmentName}`, 'info');
            setTimeout(() => {
                showDialog(
                    assignmentName,
                    'Assignment details, requirements, submission guidelines, and resources.',
                    [
                        { text: 'Start Assignment', action: () => showNotification('Assignment workspace opened', 'info') },
                        { text: 'Download Resources', action: () => showNotification('Resources downloaded', 'success') },
                        { text: 'Close', action: () => {} }
                    ]
                );
            }, 500);
        }

        // Support Contact
        function contactSupport(type) {
            const messages = {
                mentor: 'Connecting you with your academic mentor...',
                counselor: 'Scheduling a counseling session...',
                tutor: 'Finding available tutors for your subjects...'
            };
            
            showNotification(messages[type], 'info');
            
            setTimeout(() => {
                const titles = {
                    mentor: 'Contact Academic Mentor',
                    counselor: 'Schedule Counseling Session',
                    tutor: 'Find Academic Tutor'
                };
                
                const descriptions = {
                    mentor: 'Connect with Prof. Sarah Mitchell for academic guidance, course planning, and career advice.',
                    counselor: 'Schedule a session with Dr. James Wilson for personal counseling and mental health support.',
                    tutor: 'Find qualified tutors for Physics, Mathematics, and other challenging subjects.'
                };
                
                showDialog(
                    titles[type],
                    descriptions[type],
                    [
                        { text: 'Continue', action: () => showNotification(`${type} contact initiated!`, 'success') },
                        { text: 'Cancel', action: () => {} }
                    ]
                );
            }, 1000);
        }

        // Profile Function
        function showProfile() {
            showDialog(
                'Student Profile',
                'Alex Johnson\\nStudent ID: ST12345\\nMajor: Computer Science\\nYear: Sophomore\\nGPA: 3.4\\nEmail: alex.johnson@university.edu',
                [
                    { text: 'Edit Profile', action: () => showNotification('Profile editor opened', 'info') },
                    { text: 'Academic Records', action: () => showNotification('Academic records opened', 'info') },
                    { text: 'Logout', action: () => showNotification('Logged out successfully', 'success') },
                    { text: 'Close', action: () => {} }
                ]
            );
        }

        // Notification System
        function showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = `notification notification-${type}`;
            
            const icons = {
                success: '✅',
                warning: '⚠️',
                error: '❌',
                info: 'ℹ️'
            };

            notification.innerHTML = `
                <div class="notification-content">
                    <span class="notification-icon">${icons[type]}</span>
                    <span class="notification-message">${message}</span>
                </div>
            `;

            // Add notification styles if not already present
            if (!document.getElementById('notification-styles')) {
                const style = document.createElement('style');
                style.id = 'notification-styles';
                style.textContent = `
                    .notification {
                        position: fixed;
                        top: 100px;
                        right: 20px;
                        padding: 1rem 1.5rem;
                        border-radius: 12px;
                        color: white;
                        font-weight: 500;
                        z-index: 2000;
                        animation: slideIn 0.3s ease-out;
                        box-shadow: var(--shadow-lg);
                        backdrop-filter: blur(10px);
                        max-width: 400px;
                    }
                    
                    .notification-success { background: linear-gradient(135deg, var(--success-color), #059669); }
                    .notification-warning { background: linear-gradient(135deg, var(--warning-color), #d97706); }
                    .notification-error { background: linear-gradient(135deg, var(--danger-color), #dc2626); }
                    .notification-info { background: linear-gradient(135deg, var(--primary-color), var(--primary-dark)); }
                    
                    .notification-content {
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                    }
                    
                    @keyframes slideIn {
                        from { transform: translateX(100%); opacity: 0; }
                        to { transform: translateX(0); opacity: 1; }
                    }
                    
                    @keyframes slideOut {
                        from { transform: translateX(0); opacity: 1; }
                        to { transform: translateX(100%); opacity: 0; }
                    }
                `;
                document.head.appendChild(style);
            }

            document.body.appendChild(notification);

            setTimeout(() => {
                notification.style.animation = 'slideOut 0.3s ease-in';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }, 3000);
        }

        // Dialog System
        function showDialog(title, message, buttons) {
            const dialog = document.createElement('div');
            dialog.className = 'dialog-overlay';
            
            const buttonElements = buttons.map(button => 
                `<button class="dialog-btn ${button.text === 'Cancel' || button.text === 'Close' ? 'btn-secondary' : 'btn-primary'}" 
                 onclick="this.parentElement.parentElement.parentElement.remove(); (${button.action.toString()})()">${button.text}</button>`
            ).join('');

            dialog.innerHTML = `
                <div class="dialog-backdrop" onclick="this.parentElement.remove()"></div>
                <div class="dialog-content">
                    <h3 class="dialog-title">${title}</h3>
                    <p class="dialog-message">${message.replace(/\\n/g, '<br>')}</p>
                    <div class="dialog-actions">
                        ${buttonElements}
                    </div>
                </div>
            `;

            // Add dialog styles if not already present
            if (!document.getElementById('dialog-styles')) {
                const style = document.createElement('style');
                style.id = 'dialog-styles';
                style.textContent = `
                    .dialog-overlay {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        z-index: 3000;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        animation: fadeIn 0.3s ease-out;
                    }
                    
                    .dialog-backdrop {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0, 0, 0, 0.5);
                        backdrop-filter: blur(5px);
                    }
                    
                    .dialog-content {
                        background: var(--card-bg);
                        border: 1px solid var(--border-color);
                        border-radius: 20px;
                        padding: 2rem;
                        max-width: 500px;
                        width: 90%;
                        position: relative;
                        box-shadow: var(--shadow-xl);
                        backdrop-filter: blur(10px);
                        animation: slideUp 0.3s ease-out;
                    }
                    
                    .dialog-title {
                        font-size: 1.25rem;
                        font-weight: 600;
                        color: var(--text-primary);
                        margin-bottom: 1rem;
                    }
                    
                    .dialog-message {
                        color: var(--text-secondary);
                        line-height: 1.6;
                        margin-bottom: 1.5rem;
                    }
                    
                    .dialog-actions {
                        display: flex;
                        gap: 1rem;
                        justify-content: flex-end;
                        flex-wrap: wrap;
                    }
                    
                    .dialog-btn {
                        padding: 0.75rem 1.5rem;
                        border: none;
                        border-radius: 12px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    }
                    
                    .btn-secondary {
                        background: transparent;
                        color: var(--text-primary);
                        border: 2px solid var(--border-color);
                    }
                    
                    .btn-secondary:hover {
                        border-color: var(--primary-color);
                        color: var(--primary-color);
                        background: rgba(37, 99, 235, 0.05);
                    }
                    
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    
                    @keyframes slideUp {
                        from { transform: translateY(30px); opacity: 0; }
                        to { transform: translateY(0); opacity: 1; }
                    }
                `;
                document.head.appendChild(style);
            }

            document.body.appendChild(dialog);
        }

        // Initialize dashboard
        document.addEventListener('DOMContentLoaded', function() {
            animateProgressBars();
            showNotification('Student Dashboard loaded successfully!', 'success');
            
            // Add click handlers for interactive stat cards
            document.querySelectorAll('.stat-card').forEach((card, index) => {
                card.addEventListener('click', function() {
                    const labels = ['Attendance Details', 'GPA Breakdown', 'Assignment History', 'Progress Analytics'];
                    showNotification(`Opening ${labels[index]}`, 'info');
                });
            });
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            if (e.altKey) {
                switch(e.key) {
                    case '1': switchTab('courses'); e.preventDefault(); break;
                    case '2': switchTab('assignments'); e.preventDefault(); break;
                    case '3': switchTab('schedule'); e.preventDefault(); break;
                    case '4': switchTab('support'); e.preventDefault(); break;
                    case 't': toggleTheme(); e.preventDefault(); break;
                }
            }
            
            if (e.key === 'Escape') {
                // Close any open dialogs
                const dialogs = document.querySelectorAll('.dialog-overlay');
                dialogs.forEach(dialog => dialog.remove());
            }
        });

        // Simulate real-time updates
        setInterval(() => {
            // Simulate random progress updates
            if (Math.random() < 0.05) { // 5% chance every 30 seconds
                const randomMessages = [
                    'New assignment posted in CS 101',
                    'Grade updated for Math 151',
                    'Reminder: Physics lab due tomorrow',
                    'New announcement from English professor'
                ];
                const randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)];
                showNotification(randomMessage, 'info');
            }
        }, 30000);