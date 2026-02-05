// Travel Easy Agency - JavaScript Functions

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});

// Smooth Scrolling for Anchor Links
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

// Contact Form Handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        // Basic validation
        if (!formObject.name || !formObject.email || !formObject.phone || !formObject.message) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formObject.email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Phone validation (basic)
        const phoneRegex = /^[0-9]{10,}$/;
        if (!phoneRegex.test(formObject.phone.replace(/\D/g, ''))) {
            showNotification('Please enter a valid phone number', 'error');
            return;
        }

        // Simulate form submission
        showNotification('Sending message...', 'info');
        
        setTimeout(() => {
            showNotification('Message sent successfully! We will contact you soon.', 'success');
            contactForm.reset();
        }, 2000);
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.backgroundColor = '#28a745';
            break;
        case 'error':
            notification.style.backgroundColor = '#dc3545';
            break;
        case 'info':
            notification.style.backgroundColor = '#17a2b8';
            break;
        default:
            notification.style.backgroundColor = '#6c757d';
    }

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Phone Number Formatting
document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 10) {
            value = value.slice(0, 10);
        }
        e.target.value = value;
    });
});

// WhatsApp Click Tracking
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', function(e) {
        // Track WhatsApp clicks (you can integrate with analytics here)
        console.log('WhatsApp clicked:', this.href);
        
        // Optional: Add confirmation dialog
        const agentName = this.closest('.team-card, .agent-contact-card')?.querySelector('h3, h4')?.textContent;
        if (agentName) {
            console.log('Contacting agent:', agentName);
        }
    });
});

// Call Button Click Tracking
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', function(e) {
        // Track call clicks (you can integrate with analytics here)
        console.log('Call clicked:', this.href);
        
        // Optional: Add confirmation dialog
        const agentName = this.closest('.team-card, .agent-contact-card')?.querySelector('h3, h4')?.textContent;
        if (agentName) {
            console.log('Calling agent:', agentName);
        }
    });
});

// Scroll Animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.team-card, .service-card, .testimonial-card, .agent-contact-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Set initial state for animated elements
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.team-card, .service-card, .testimonial-card, .agent-contact-card');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
});

// Listen for scroll events
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('resize', animateOnScroll);

// Initial check for elements in view
animateOnScroll();

// Lazy Loading for Images (if you add real images later)
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// Copy phone number functionality
document.querySelectorAll('.phone-number').forEach(phoneElement => {
    phoneElement.style.cursor = 'pointer';
    phoneElement.addEventListener('click', function() {
        const phoneNumber = this.textContent.replace(/[^\d]/g, '');
        navigator.clipboard.writeText(phoneNumber).then(() => {
            showNotification('Phone number copied to clipboard!', 'success');
        }).catch(() => {
            showNotification('Failed to copy phone number', 'error');
        });
    });
});

// Agent availability simulation (you can replace with real data)
function updateAgentAvailability() {
    const agents = document.querySelectorAll('.agent-contact-card, .team-card');
    const currentHour = new Date().getHours();
    const businessHours = currentHour >= 8 && currentHour <= 17;
    
    agents.forEach(agent => {
        const statusIndicator = document.createElement('div');
        statusIndicator.className = 'availability-status';
        statusIndicator.style.cssText = `
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: ${businessHours ? '#28a745' : '#dc3545'};
            margin-left: 8px;
            display: inline-block;
            animation: pulse 2s infinite;
        `;
        
        const agentName = agent.querySelector('h3, h4');
        if (agentName && !agentName.querySelector('.availability-status')) {
            agentName.appendChild(statusIndicator);
        }
    });
}

// Add pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { opacity: 1; }
        50% { opacity: 0.5; }
        100% { opacity: 1; }
    }
    
    .availability-status {
        position: relative;
    }
    
    .availability-status::after {
        content: '${new Date().getHours() >= 8 && new Date().getHours() <= 17 ? 'Available' : 'Offline'}';
        position: absolute;
        top: -20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: rgba(0,0,0,0.8);
        color: white;
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 10px;
        white-space: nowrap;
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
    }
    
    .availability-status:hover::after {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// Update agent availability on page load
updateAgentAvailability();

// Update availability every minute
setInterval(updateAgentAvailability, 60000);

// Service selection form enhancement
const serviceSelect = document.getElementById('service');
if (serviceSelect) {
    serviceSelect.addEventListener('change', function() {
        const messageTextarea = document.getElementById('message');
        const selectedService = this.value;
        
        if (selectedService && messageTextarea) {
            const serviceMessages = {
                'visa': 'I am interested in applying for a visa. Please provide information about the requirements and processing time.',
                'travel': 'I would like to book travel services. Please assist with flight and hotel options.',
                'consultation': 'I need a consultation to discuss my travel plans and visa requirements.',
                'other': 'I have a general inquiry about your services.'
            };
            
            if (!messageTextarea.value || messageTextarea.value === serviceMessages[serviceSelect.dataset.previousService])) {
                messageTextarea.value = serviceMessages[selectedService] || '';
            }
            
            serviceSelect.dataset.previousService = selectedService;
        }
    });
}

// Form field focus effects
document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(field => {
    field.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
        this.parentElement.style.transition = 'transform 0.2s ease';
    });
    
    field.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// Page load animations
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Console branding
console.log('%c🌍 Travel Easy Agency', 'font-size: 20px; font-weight: bold; color: #1F4E79;');
console.log('%cProfessional Visa & Travel Services', 'font-size: 14px; color: #3A7CA5;');
console.log('%c📞 Need help? Contact our team!', 'font-size: 12px; color: #C9A24D;');
