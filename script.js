// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);

// Update theme toggle icon
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
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

// Chatbot Floating Button Functionality
let chatbotOpen = false;

function toggleChatbot() {
    const chatbotPreview = document.getElementById('chatbot-preview');
    const chatbotBtn = document.querySelector('.chatbot-btn');

    if (chatbotOpen) {
        chatbotPreview.classList.remove('active');
        chatbotBtn.innerHTML = '<i class="fas fa-comments"></i>';
        chatbotOpen = false;
    } else {
        chatbotPreview.classList.add('active');
        chatbotBtn.innerHTML = '<i class="fas fa-times"></i>';
        chatbotOpen = true;
    }
}

function openChatbot() {
    if (!chatbotOpen) {
        toggleChatbot();
    }

    // Simulate chatbot interaction
    setTimeout(() => {
        addChatMessage("Hello! I'm Sehat Saathi. What health concern would you like to discuss today?", 'bot');
    }, 500);
}

// Chatbot Message Functionality
function addChatMessage(message, sender) {
    const chatBody = document.querySelector('.chatbot-body');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;

    if (typeof message === 'string') {
        messageDiv.innerHTML = `<p>${message}</p>`;
    } else {
        messageDiv.appendChild(message);
    }

    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Handle chatbot input
const chatInput = document.querySelector('.chatbot-footer input');
const chatSendBtn = document.querySelector('.chatbot-footer button');

function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
        // Add user message
        addChatMessage(message, 'user');
        chatInput.value = '';

        // Simulate bot response
        setTimeout(() => {
            const response = generateBotResponse(message.toLowerCase());
            addChatMessage(response, 'bot');
        }, 1000);
    }
}

chatSendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Generate Bot Responses
function generateBotResponse(userMessage) {
    const responses = {
        'fever': `
            <strong>🏥 FEVER</strong><br><br>
            📋 <strong>Symptoms:</strong> High temperature, chills, headache, body aches<br><br>
            💊 <strong>Advice:</strong> Rest, drink fluids, take paracetamol. If fever persists >3 days, consult doctor.<br><br>
            🏛️ <strong>Government Info:</strong> Visit nearest PHC or call 104 for medical help
        `,
        'cough': `
            <strong>🏥 COUGH</strong><br><br>
            📋 <strong>Symptoms:</strong> Persistent coughing, throat irritation<br><br>
            💊 <strong>Advice:</strong> Stay hydrated, avoid cold drinks, use honey. If persistent, see doctor.<br><br>
            🏛️ <strong>Government Info:</strong> Free TB screening available at government hospitals
        `,
        'headache': `
            <strong>🏥 HEADACHE</strong><br><br>
            📋 <strong>Symptoms:</strong> Pain in head, sensitivity to light<br><br>
            💊 <strong>Advice:</strong> Rest in dark room, drink water, avoid screen time. Take paracetamol if needed.<br><br>
            🏛️ <strong>Government Info:</strong> Emergency services: Call 108
        `,
        'vaccination': `
            <strong>💉 VACCINATION INFO</strong><br><br>
            📅 <strong>Next Drive:</strong> Community Center, Tomorrow 10 AM<br><br>
            📱 <strong>Registration:</strong> Visit CoWIN portal or call 104<br><br>
            🆓 <strong>Free for all eligible citizens</strong>
        `,
        'emergency': `
            <strong>🚨 EMERGENCY CONTACTS</strong><br><br>
            🚑 <strong>Ambulance:</strong> 108<br>
            📞 <strong>Health Helpline:</strong> 104<br>
            👩 <strong>Women Helpline:</strong> 181<br>
            👶 <strong>Child Helpline:</strong> 1098
        `
    };

    // Check for keywords in user message
    for (const [keyword, response] of Object.entries(responses)) {
        if (userMessage.includes(keyword)) {
            return response;
        }
    }

    // Myth-busting responses
    if (userMessage.includes('turmeric') && userMessage.includes('covid')) {
        return "🚫 <strong>MYTH ALERT:</strong> Turmeric boosts immunity but cannot cure COVID-19. Get vaccinated and follow safety protocols.";
    }

    if (userMessage.includes('hot water') && userMessage.includes('corona')) {
        return "🚫 <strong>MYTH ALERT:</strong> Hot water doesn't kill coronavirus in your body. Maintain hygiene and get vaccinated.";
    }

    // Default response
    return `
        I understand you're asking about health. I can help you with:<br><br>
        • Common health problems (fever, cough, headache)<br>
        • Government health schemes<br>
        • Vaccination information<br>
        • Emergency contacts<br>
        • Myth busting<br><br>
        🚨 <strong>For emergencies, call 108 immediately!</strong>
    `;
}

// Scroll Animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .tech-category, .impact-card, .benefit');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize scroll animations
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', () => {
    // Set initial state for animated elements
    const elements = document.querySelectorAll('.feature-card, .tech-category, .impact-card, .benefit');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
    });

    animateOnScroll();
});

// Active Navigation Link Highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.offsetHeight;

        if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// Loading Animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add CSS for loading state
const style = document.createElement('style');
style.textContent = `
    body:not(.loaded) {
        overflow: hidden;
    }

    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--bg-color);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    body:not(.loaded)::after {
        content: 'Loading Sehat Saathi...';
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 1.2rem;
        color: var(--accent-color);
        z-index: 10000;
        animation: pulse 1.5s infinite;
    }

    .nav-menu a.active {
        color: var(--accent-color);
    }

    .nav-menu a.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Form Validation (if you add contact forms later)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Console welcome message
console.log(`
🌟 Welcome to Sehat Saathi!
🏥 AI-Driven Public Health Chatbot
👥 Team Binary Bandits - Smart India Hackathon 2025

🔧 Tech Stack:
- Frontend: HTML5, CSS3, JavaScript (ES6+)
- Theme: Light/Dark mode support
- Features: Responsive design, smooth animations

📱 Try our chatbot using the floating button!
`);