
// Global variables
        let currentTab = 'overview';
        
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

        // Communication Functions
        function contactTeacher(subject) {
            showNotification(`Opening message composer for ${subject} instructor...`, 'info');
            setTimeout(() => {
                showDialog(
                    'Send Message to Physics Instructor',
                    'Dr. Emily Rodriguez will receive your message about Alex\'s performance in Physics I.',
                    [
                        { text: 'Send Message', action: () => showNotification('Message sent successfully!', 'success') },
                        { text: 'Cancel', action: () => {} }
                    ]
                );
            }, 500);
        }

        function contactMentor() {
            showNotification('Loading scheduled meeting details...', 'info');
            setTimeout(() => {
                showDialog(
                    'Scheduled Meeting',
                    'Meeting with Prof. Michael Chen scheduled for Tomorrow, 2:00 PM - 3:00 PM. Topic: Academic Progress Review',
                    [
                        { text: 'Join Meeting', action: () => showNotification('Meeting link opened!', 'success') },
                        { text: 'Reschedule', action: () => showNotification('Rescheduling options opened', 'info') },
                        { text: 'Close', action: () => {} }
                    ]
                );
            }, 500);
        }

        function contactCounselor() {
            showNotification('Opening counselor scheduling system...', 'info');
            setTimeout(() => {
                showDialog(
                    'Schedule Counselor Call',
                    'Schedule a call with Ms. Sarah Williams for personal and academic counseling support.',
                    [
                        { text: 'Schedule Now', action: () => showNotification('Call scheduled successfully!', 'success') },
                        { text: 'Cancel', action: () => {} }
                    ]
                );
            }, 500);
        }

        function requestMeeting() {
            showNotification('Opening parent-teacher meeting request form...', 'info');
            setTimeout(() => {
                showDialog(
                    'Request Parent-Teacher Meeting',
                    'Request a meeting to discuss Alex\'s academic progress and any concerns.',
                    [
                        { text: 'Submit Request', action: () => showNotification('Meeting request submitted!', 'success') },
                        { text: 'Cancel', action: () => {} }
                    ]
                );
            }, 500);
        }

        function viewReports() {
            showNotification('Loading detailed progress reports...', 'info');
            setTimeout(() => {
                showDialog(
                    'Progress Reports',
                    'Access detailed academic reports including grades, attendance, and performance analytics.',
                    [
                        { text: 'View Full Report', action: () => showNotification('Opening full report viewer...', 'info') },
                        { text: 'Download PDF', action: () => showNotification('Report downloaded!', 'success') },
                        { text: 'Close', action: () => {} }
                    ]
                );
            }, 500);
        }

        function setAlerts() {
            showNotification('Opening alert configuration panel...', 'info');
            setTimeout(() => {
                showDialog(
                    'Configure Alerts',
                    'Set up notifications for grades, attendance, assignments, and other important updates.',
                    [
                        { text: 'Save Settings', action: () => showNotification('Alert preferences saved!', 'success') },
                        { text: 'Cancel', action: () => {} }
                    ]
                );
            }, 500);
        }

        function downloadReports() {
            showNotification('Preparing reports for download...', 'info');
            setTimeout(() => {
                showNotification('Reports package downloaded successfully!', 'success');
            }, 2000);
        }

        function showProfile() {
            showDialog(
                'Guardian Profile',
                'Sarah Johnson\\nGuardian of Alex Johnson\\nEmail: sarah.johnson@email.com\\nPhone: (555) 123-4567',
                [
                    { text: 'Edit Profile', action: () => showNotification('Profile editor opened', 'info') },
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
            showNotification('Guardian Dashboard loaded successfully!', 'success');
            
            // Add click handlers for interactive elements
            document.querySelectorAll('.stat-card').forEach(card => {
                card.addEventListener('click', function() {
                    const cardType = this.classList[1].replace('-card', '');
                    showNotification(`Viewing detailed ${cardType} information`, 'info');
                });
            });

            document.querySelectorAll('.course-item').forEach(course => {
                course.addEventListener('click', function() {
                    const courseName = this.querySelector('.course-name').textContent;
                    showNotification(`Opening detailed view for ${courseName}`, 'info');
                });
            });
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            if (e.altKey) {
                switch(e.key) {
                    case '1': switchTab('overview'); e.preventDefault(); break;
                    case '2': switchTab('progress'); e.preventDefault(); break;
                    case '3': switchTab('activity'); e.preventDefault(); break;
                    case '4': switchTab('communication'); e.preventDefault(); break;
                    case 't': toggleTheme(); e.preventDefault(); break;
                }
            }
            
            if (e.key === 'Escape') {
                // Close any open dialogs
                const dialogs = document.querySelectorAll('.dialog-overlay');
                dialogs.forEach(dialog => dialog.remove());
            }
        });

        // Auto-refresh data simulation
        setInterval(() => {
            // Simulate real-time updates
            const attendanceValue = document.querySelector('.attendance-card .stat-value');
            if (attendanceValue && Math.random() < 0.1) { // 10% chance every 30 seconds
                const currentValue = parseInt(attendanceValue.textContent);
                const newValue = Math.max(0, Math.min(100, currentValue + (Math.random() > 0.5 ? 1 : -1)));
                attendanceValue.textContent = newValue + '%';
                showNotification('Attendance data updated', 'info');
            }
        }, 30000); // Check every 30 seconds
