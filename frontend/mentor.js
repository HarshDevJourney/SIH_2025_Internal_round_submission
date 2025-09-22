// mentor.js

import { mockStudents, mockNotifications } from './mockData.js';

// ====================
// Global Variables
// ====================
let currentTab = 'dashboard';
let students = [];
let notifications = [];
let filteredStudents = [];

// ====================
// Theme Management
// ====================
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

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

themeToggle.addEventListener('click', toggleTheme);

// ====================
// Dashboard Initialization
// ====================
function init() {
    students = [...mockStudents];
    notifications = [...mockNotifications];
    filteredStudents = [...students];

    setupEventListeners();
    updateStats();
    renderNotifications();
    renderStudents();
    setupPredictionForm();
    renderAnalytics();
}

// ====================
// Event Listeners
// ====================
function setupEventListeners() {
    // Tab navigation
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            const tabName = e.target.closest('.nav-tab').dataset.tab;
            switchTab(tabName);
        });
    });

    // Risk filter
    const riskFilter = document.getElementById('risk-filter');
    if (riskFilter) {
        riskFilter.addEventListener('change', (e) => filterStudents(e.target.value));
    }

    // Export button
    const exportBtn = document.querySelector('.btn-export');
    if (exportBtn) exportBtn.addEventListener('click', exportReport);
}

// ====================
// Tab Switching
// ====================
function switchTab(tabName) {
    document.querySelectorAll('.nav-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelector(`[data-tab="${tabName}"]`)?.classList.add('active');

    document.querySelectorAll('.tab-content').forEach(content => content.classList.add('hidden'));
    document.getElementById(`${tabName}-tab`)?.classList.remove('hidden');

    currentTab = tabName;
}

// ====================
// Stats & Rendering
// ====================
function updateStats() {
    const stats = {
        total: students.length,
        high: students.filter(s => s.riskLevel === 'high').length,
        medium: students.filter(s => s.riskLevel === 'medium').length,
        low: students.filter(s => s.riskLevel === 'low').length
    };

    document.getElementById('total-students').textContent = stats.total;
    document.getElementById('high-risk-students').textContent = stats.high;
    document.getElementById('medium-risk-students').textContent = stats.medium;
    document.getElementById('low-risk-students').textContent = stats.low;
}

function renderNotifications() {
    const notificationsList = document.getElementById('notifications-list');
    if (!notificationsList) return;
    notificationsList.innerHTML = '';

    notifications.forEach(notification => {
        const div = document.createElement('div');
        div.className = `notification-item notification-${notification.type}`;
        div.innerHTML = `
            <div class="notification-message">${notification.message}</div>
            <div class="notification-time">${notification.timestamp}</div>
        `;
        notificationsList.appendChild(div);
    });
}

function filterStudents(riskLevel) {
    filteredStudents = riskLevel === 'all'
        ? [...students]
        : students.filter(s => s.riskLevel === riskLevel);
    renderStudents();
}

function renderStudents() {
    const studentsGrid = document.getElementById('students-grid');
    if (!studentsGrid) return;
    studentsGrid.innerHTML = '';

    filteredStudents.forEach(student => {
        const card = document.createElement('div');
        card.className = 'student-card';
        card.innerHTML = `
            <div class="student-header">
                <div class="student-info">
                    <div class="student-avatar">👤</div>
                    <div class="student-details">
                        <h3>${student.name}</h3>
                        <p>${student.studentId} • ${student.course}</p>
                    </div>
                </div>
                <span class="risk-badge risk-${student.riskLevel}">${student.riskLevel.toUpperCase()}</span>
            </div>

            <div class="student-metrics">
                <div class="metric attendance">
                    <div class="metric-value">${student.attendance}%</div>
                    <div class="metric-label">Attendance</div>
                </div>
                <div class="metric grade">
                    <div class="metric-value">${student.avgGrade}</div>
                    <div class="metric-label">Avg Grade</div>
                </div>
                <div class="metric risk-score">
                    <div class="metric-value">${Math.round(student.riskScore * 100)}%</div>
                    <div class="metric-label">Risk Score</div>
                </div>
            </div>

            <div style="margin-bottom: 16px; font-size: 14px;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">🎓<span>Semester ${student.semester}</span></div>
                <div style="display: flex; align-items: center; gap: 8px;">👨‍🏫<span>Mentor: ${student.mentorName}</span></div>
            </div>

            <div class="student-actions">
                <button class="btn btn-primary" onclick="viewStudentDetails(${student.id})">👁️ View Details</button>
                <button class="btn btn-success" onclick="connectToMentor(${student.id})">💬 Connect Mentor</button>
            </div>
        `;
        studentsGrid.appendChild(card);
    });
}

// ====================
// Student Actions
// ====================
function viewStudentDetails(studentId) {
    const student = students.find(s => s.id === studentId);
    alert(`Viewing details for ${student.name}\n\nRisk Level: ${student.riskLevel}\nAttendance: ${student.attendance}%\nGrade: ${student.avgGrade}\nRecent Activity: ${student.recentActivity}`);
}

function connectToMentor(studentId) {
    const student = students.find(s => s.id === studentId);
    alert(`Connecting ${student.name} to ${student.mentorName}...`);
}

function exportReport() {
    alert('Exporting student report...');
}

// ====================
// Prediction Form
// ====================
function setupPredictionForm() {
    const form = document.getElementById('prediction-form');
    const resetBtn = document.getElementById('reset-btn');

    if (form) form.addEventListener('submit', handlePredictionSubmit);
    if (resetBtn) resetBtn.addEventListener('click', resetPredictionForm);
}

async function handlePredictionSubmit(e) {
    e.preventDefault();

    const predictBtn = document.getElementById('predict-btn');
    const resultPlaceholder = document.getElementById('result-placeholder');
    const resultLoading = document.getElementById('result-loading');
    const resultSuccess = document.getElementById('result-success');

    predictBtn.disabled = true;
    predictBtn.innerHTML = '<div class="loading-spinner"></div> Processing...';
    resultPlaceholder?.classList.add('hidden');
    resultLoading?.classList.remove('hidden');
    resultSuccess?.classList.add('hidden');

    try {
        const formData = new FormData(e.target);
        const data = {
            age: parseFloat(formData.get('age')) || 18,
            gender: formData.get('gender'),
            nationality: parseInt(formData.get('nationality')) || 1,
            highschool_score: parseFloat(formData.get('highschool_score')) || 0,
            entrance_exam_score_normalized: parseFloat(formData.get('entrance_exam_score_normalized')) || 0,
            department: parseInt(formData.get('department')) || 0,
            admission_type: parseInt(formData.get('admission_type')) || 0,
            family_income_bracket: parseInt(formData.get('family_income_bracket')) || 0,
            parent_education: parseInt(formData.get('parent_education')) || 1,
            scholarship_status: formData.get('scholarship_status') || 'none',
            residence_type: formData.get('residence_type') || 'day_scholar',
            commute_distance_km: parseFloat(formData.get('commute_distance_km')) || 0,

            current_sem_cgpa: parseFloat(formData.get('current_sem_cgpa')) || 0,
            aggregate_cgpa: parseFloat(formData.get('aggregate_cgpa')) || 0,

            // The rest of the features (hardcoded defaults for now)
            backlogs_count: 0,
            backlogs_count_missing: 1,
            fee_payment_status: 0,
            fee_payment_status_missing: 1,
            department_missing: formData.get('department') ? 0 : 1,
            admission_type_missing: formData.get('admission_type') ? 0 : 1,
            scholarship_status_missing: formData.get('scholarship_status') ? 0 : 1,
            residence_type_missing: formData.get('residence_type') ? 0 : 1,
            family_income_bracket_missing: formData.get('family_income_bracket') ? 0 : 1,
            commute_distance_km_missing: formData.get('commute_distance_km') ? 0 : 1,
            // extra_feature_1: 0,
            // extra_feature_2: 0,
            // extra_feature_3: 0,
            // extra_feature_4: 0,
            // extra_feature_5: 0
        };


        const prediction = await simulateAPICall(data);
        displayPredictionResult(prediction);

    } catch (error) {
        console.error('Prediction error:', error);
        alert('Error making prediction. Please try again.');
        resultLoading?.classList.add('hidden');
        resultPlaceholder?.classList.remove('hidden');
    } finally {
        predictBtn.disabled = false;
        predictBtn.innerHTML = '🎯 Predict Risk';
    }
}

async function simulateAPICall(data) {
    const res = await fetch("http://localhost:3000/api/predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Prediction request failed");
    return await res.json();
}

function displayPredictionResult(prediction) {
    const resultLoading = document.getElementById('result-loading');
    const resultSuccess = document.getElementById('result-success');
    const riskLevelBadge = document.getElementById('risk-level-badge');
    const dropoutProbability = document.getElementById('dropout-probability');
    const confidenceScore = document.getElementById('confidence-score');
    const riskProgress = document.getElementById('risk-progress');

    resultLoading?.classList.add('hidden');
    resultSuccess?.classList.remove('hidden');

    const riskLevel = prediction.risk_level.toLowerCase(); // use API field

    riskLevelBadge.textContent = prediction.risk_level.toUpperCase();
    riskLevelBadge.className = `risk-badge risk-${riskLevel}`;

    dropoutProbability.textContent = Math.round(prediction.probabilities.Dropout * 100) + '%';
    confidenceScore.textContent = Math.round(prediction.confidence * 100) + '%';

    const progressWidth = prediction.probabilities.Dropout * 100;
    riskProgress.style.width = progressWidth + '%';
    riskProgress.style.background = riskLevel === 'high' ? '#ef4444' :
                                   riskLevel === 'medium' ? '#f59e0b' : '#10b981';

    const factorsList = document.getElementById('risk-factors-list');
    factorsList.innerHTML = ['Academic Performance', 'Attendance Pattern', 'Financial Status', 'Family Background']
        .map(f => `<li>🔴 ${f}</li>`).join('');

    const recommendationsList = document.getElementById('recommendations-list');
    let recommendations = [];
    if (riskLevel === 'high') {
        recommendations = ['Schedule immediate academic counseling','Connect with financial aid office','Arrange mentor meeting within 48 hours','Monitor attendance closely'];
    } else if (riskLevel === 'medium') {
        recommendations = ['Monthly check-in with advisor','Study group participation','Regular performance monitoring'];
    } else {
        recommendations = ['Continue current support level','Quarterly progress review'];
    }
    recommendationsList.innerHTML = recommendations.map(r => `<li>✅ ${r}</li>`).join('');
}


function resetPredictionForm() {
    document.getElementById('prediction-form')?.reset();
    document.getElementById('result-success')?.classList.add('hidden');
    document.getElementById('result-loading')?.classList.add('hidden');
    document.getElementById('result-placeholder')?.classList.remove('hidden');
}

// ====================
// Analytics Rendering
// ====================
function renderAnalytics() {
    // renderDonutChart();
    // renderRiskBreakdown();
    // renderAttendanceBars();
    // renderGradeBars();
    // renderInterventionBars();
    // renderModelPerformanceBars();
    // renderFeatureImportanceBars();
    // renderTrendChart();
}

// (Analytics chart functions remain the same as your original code, omitted here for brevity. Add them below.)
// e.g., renderDonutChart(), renderRiskBreakdown(), renderAttendanceBars(), etc.

// ====================
// Initialize Dashboard
// ====================
document.addEventListener('DOMContentLoaded', init);