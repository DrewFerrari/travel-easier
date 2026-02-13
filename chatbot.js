// Travel Easy Agency - AI Chatbot Assistant
class TravelChatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.knowledgeBase = this.initializeKnowledgeBase();
        this.init();
    }

    initializeKnowledgeBase() {
        return {
            greetings: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'greetings'],
            visaKeywords: ['visa', 'visas', 'passport', 'travel document', 'application', 'processing', 'apply'],
            travelKeywords: ['flight', 'hotel', 'booking', 'package', 'tour', 'travel', 'trip', 'vacation', 'holiday'],
            priceKeywords: ['price', 'cost', 'fee', 'charge', 'how much', 'payment', 'expensive', 'cheap', 'afford'],
            contactKeywords: ['contact', 'call', 'phone', 'email', 'whatsapp', 'agent', 'speak', 'talk', 'reach'],
            helpKeywords: ['help', 'assist', 'support', 'question', 'inquiry', 'information'],
            documentKeywords: ['document', 'documents', 'requirement', 'requirements', 'need', 'necessary', 'papers'],
            paymentKeywords: ['pay', 'payment', 'ecocash', 'innbucks', 'bank', 'transfer', 'cash'],
            bookingKeywords: ['book', 'reserve', 'reservation', 'schedule'],
            teamKeywords: ['team', 'agent', 'consultant', 'staff', 'who'],
            hoursKeywords: ['hours', 'open', 'close', 'time', 'when', 'available'],
            locationKeywords: ['where', 'location', 'address', 'office', 'find you'],

            visaServices: {
                'united kingdom': { price: '$200', processing: '15-20 working days', type: 'Tourist/Business' },
                'uk': { price: '$200', processing: '15-20 working days', type: 'Tourist/Business' },
                'usa': { price: '$250', processing: '20-25 working days', type: 'Tourist/Business' },
                'united states': { price: '$250', processing: '20-25 working days', type: 'Tourist/Business' },
                'america': { price: '$250', processing: '20-25 working days', type: 'Tourist/Business' },
                'canada': { price: '$180', processing: '15-20 working days', type: 'Tourist/Business' },
                'australia': { price: '$220', processing: '15-20 working days', type: 'Tourist/Business' },
                'schengen': { price: '$150', processing: '10-15 working days', type: 'Tourist/Business' },
                'europe': { price: '$150', processing: '10-15 working days', type: 'Schengen' },
                'dubai': { price: '$120', processing: '5-7 working days', type: 'Tourist' },
                'uae': { price: '$120', processing: '5-7 working days', type: 'Tourist' },
                'china': { price: '$180', processing: '10-15 working days', type: 'Tourist/Business' },
                'thailand': { price: '$100', processing: '7-10 working days', type: 'Tourist' },
                'south africa': { price: '$130', processing: '10-15 working days', type: 'Tourist/Business' },
                'india': { price: '$140', processing: '10-12 working days', type: 'Tourist/Business' },
                'singapore': { price: '$110', processing: '5-7 working days', type: 'Tourist' },
                'malaysia': { price: '$95', processing: '5-7 working days', type: 'Tourist' },
                'turkey': { price: '$125', processing: '7-10 working days', type: 'Tourist' },
                'egypt': { price: '$115', processing: '7-10 working days', type: 'Tourist' },
                'kenya': { price: '$105', processing: '5-7 working days', type: 'Tourist' }
            },

            documentRequirements: {
                general: [
                    '• Valid passport (minimum 6 months validity)',
                    '• 2 recent passport-sized photos (white background, 35x45mm)',
                    '• National ID or residence permit',
                    '• Bank statements (last 3 months)',
                    '• Travel itinerary (flight bookings)',
                    '• Hotel reservations or accommodation proof',
                    '• Employment letter with salary details',
                    '• Marriage certificate (if traveling with spouse)',
                    '• Birth certificates (for minors)'
                ],
                business: [
                    '• Company registration documents',
                    '• Invitation letter from host company',
                    '• Business bank statements',
                    '• Tax clearance certificate'
                ],
                student: [
                    '• Acceptance letter from institution',
                    '• Proof of tuition payment',
                    '• Sponsor\'s financial documents',
                    '• Academic transcripts'
                ]
            },

            teamMembers: [
                { name: 'Daniel Gwerenha', role: 'Senior Travel Consultant', phone: '0788362552', specialty: 'UK & USA Visas' },
                { name: 'Takunda Mushavi', role: 'Travel Consultant', phone: '0788828516', specialty: 'Travel Packages' },
                { name: 'Gladwell', role: 'Travel Consultant', phone: '0772825967', specialty: 'Flight Bookings' },
                { name: 'Tasha', role: 'Travel Consultant', phone: '0780109466', specialty: 'Hotel Reservations' },
                { name: 'Russell T.C', role: 'Visa Specialist', phone: '0784083826', specialty: 'All Visa Types' }
            ],

            faqs: {
                'how long': 'Processing times vary by destination:\n• Express visas: 5-7 days\n• Standard visas: 10-20 days\n• Complex visas: 20-25 days\n\nWe also offer premium packages for faster processing!',
                'what documents': 'Required documents include:\n• Valid passport (6+ months)\n• Passport photos\n• Bank statements\n• Travel itinerary\n• Employment letter\n\nSpecific requirements vary by destination. Which country are you applying for?',
                'payment methods': 'We accept multiple payment methods:\n💳 EcoCash\n💰 InnBucks\n🏦 Bank Transfer\n💵 Cash (at our office)\n\nAll payments are secure and receipted!',
                'office hours': 'We\'re open:\n📅 Monday - Friday: 8:00 AM - 5:00 PM\n📅 Saturday: 9:00 AM - 1:00 PM\n📅 Sunday: Closed\n\nFor urgent matters, contact us via WhatsApp!',
                'track application': 'To track your application:\n1. Visit our Traveler Portal\n2. Enter your application ID\n3. View real-time status updates\n\nOr contact your assigned agent directly!',
                'cancel booking': 'Cancellation policy:\n• 7+ days before: Full refund\n• 3-7 days before: 50% refund\n• Less than 3 days: No refund\n\nContact us immediately if you need to cancel.',
                'group booking': 'Yes! We offer special rates for:\n• Family groups (4+ people)\n• Corporate groups\n• Tour groups\n\nContact us for a customized quote!',
                'travel insurance': 'We highly recommend travel insurance! We can help you:\n• Compare insurance options\n• Process insurance applications\n• Include it in your travel package\n\nAsk an agent for details!'
            },

            responses: {
                greeting: [
                    "Hello! 👋 Welcome to Travel Easy Agency. I'm your AI travel assistant. How can I help you today?",
                    "Hi there! 🌍 I'm here to help with your visa and travel needs. What can I assist you with?",
                    "Welcome! ✈️ I'm your virtual travel consultant. How may I help you today?"
                ],
                visa: [
                    "We offer comprehensive visa services for 20+ destinations worldwide! Which country are you interested in visiting?",
                    "I can help you with visa applications! We process visas for UK, USA, Canada, Schengen, Dubai, and many more. Which destination interests you?",
                    "Our visa services cover all major destinations. Tell me where you'd like to travel, and I'll provide the details!"
                ],
                travel: [
                    "We offer complete travel packages including flights, hotels, and tours! Where would you like to go?",
                    "I can help you book flights, hotels, and complete travel packages. What's your destination?",
                    "Our travel services include:\n✈️ Flight bookings (local & international)\n🏨 Hotel reservations worldwide\n🎒 Customized tour packages\n🚗 Airport transfers\n\nWhat interests you?"
                ],
                contact: [
                    "You can reach us at:\n📞 +263 78 408 3826\n📧 info@travelesasy.co.zw\n📍 1574 Alpes Road, Hatcliffe Extension, Harare\n\n⏰ Mon-Fri: 8AM-5PM | Sat: 9AM-1PM\n\nWould you like to speak with one of our agents?",
                    "Our team is ready to help! Contact us:\n☎️ +263 78 408 3826\n✉️ info@travelesasy.co.zw\n\nOr click the WhatsApp button to chat with an agent instantly!"
                ],
                help: [
                    "I can help you with:\n✅ Visa applications & requirements\n✅ Flight & hotel bookings\n✅ Travel packages & tours\n✅ Pricing information\n✅ Document requirements\n✅ Payment methods\n✅ Connecting with our agents\n\nWhat would you like to know?",
                    "I'm here to assist with visa services, travel bookings, pricing, and general inquiries. What do you need help with?"
                ],
                documents: [
                    "Required documents vary by visa type, but generally include:\n\n📋 Basic Requirements:\n• Valid passport (6+ months)\n• 2 passport photos\n• Bank statements (3 months)\n• Travel itinerary\n• Employment letter\n\nWhich country are you applying for? I can give you specific requirements!",
                    "Document requirements depend on your destination. Common documents include passport, photos, bank statements, and travel itinerary. Tell me your destination for specific requirements!"
                ],
                payment: [
                    "We accept multiple payment methods:\n\n💳 EcoCash - Instant confirmation\n💰 InnBucks - Quick processing\n🏦 Bank Transfer - Secure\n💵 Cash - At our office\n\nAll payments are secure and you'll receive an official receipt!",
                    "Payment is easy! We accept EcoCash, InnBucks, bank transfers, and cash. Which method would you prefer?"
                ],
                booking: [
                    "Booking with us is simple:\n\n1️⃣ Contact an agent or fill our form\n2️⃣ Provide your travel details\n3️⃣ Submit required documents\n4️⃣ Make payment\n5️⃣ Receive confirmation\n\nWould you like to start a booking?",
                    "Ready to book? Contact one of our agents and they'll guide you through the process step-by-step!"
                ],
                team: [
                    "Meet our expert team:\n\n👨‍💼 Daniel Gwerenha - Senior Consultant (UK/USA specialist)\n👨‍💼 Takunda Mushavi - Travel packages\n👨‍💼 Russell T.C - Visa specialist\n👩‍💼 Tasha - Hotel bookings\n👨‍💼 Gladwell - Flight bookings\n\nWho would you like to speak with?",
                    "Our professional team is here to help! We have specialists for visas, flights, hotels, and complete travel packages. Would you like to connect with a specific agent?"
                ],
                hours: [
                    "We're open:\n\n📅 Monday - Friday: 8:00 AM - 5:00 PM\n📅 Saturday: 9:00 AM - 1:00 PM\n📅 Sunday: Closed\n\n💬 For urgent matters outside business hours, contact us via WhatsApp!",
                    "Our office hours are Mon-Fri 8AM-5PM and Saturday 9AM-1PM. We're closed on Sundays, but you can reach us on WhatsApp anytime!"
                ],
                location: [
                    "Visit us at:\n\n📍 1574 Alpes Road\nHatcliffe Extension\nHarare, Zimbabwe\n\n🚗 We're easily accessible with parking available!\n\nWould you like directions?",
                    "Our office is located at 1574 Alpes Road, Hatcliffe Extension, Harare. We have ample parking and a comfortable waiting area!"
                ],
                default: [
                    "I'd be happy to help! Could you please provide more details about what you're looking for?",
                    "Let me connect you with the right information. Could you tell me more about your travel needs?",
                    "I'm here to assist! For specific questions, you can also contact our agents directly. What would you like to know?"
                ],
                thanks: [
                    "You're welcome! 😊 Is there anything else I can help you with?",
                    "Happy to help! Feel free to ask if you have more questions.",
                    "My pleasure! Let me know if you need anything else."
                ]
            }
        };
    }

    init() {
        this.createChatbotUI();
        this.attachEventListeners();
        this.addWelcomeMessage();
    }

    createChatbotUI() {
        const chatbotHTML = `
            <div id="ai-chatbot-container" class="chatbot-container">
                <div id="chatbot-toggle" class="chatbot-toggle">
                    <i class="fas fa-robot"></i>
                    <span class="chatbot-badge">AI</span>
                </div>
                
                <div id="chatbot-window" class="chatbot-window">
                    <div class="chatbot-header">
                        <div class="chatbot-header-content">
                            <i class="fas fa-robot"></i>
                            <div>
                                <h4>Travel Assistant</h4>
                                <span class="chatbot-status">
                                    <i class="fas fa-circle"></i> Online
                                </span>
                            </div>
                        </div>
                        <button id="chatbot-close" class="chatbot-close-btn">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <div id="chatbot-messages" class="chatbot-messages">
                        <!-- Messages will be added here -->
                    </div>
                    
                    <div class="chatbot-quick-actions">
                        <button class="quick-action-btn" data-action="visa">
                            <i class="fas fa-passport"></i> Visa Info
                        </button>
                        <button class="quick-action-btn" data-action="travel">
                            <i class="fas fa-plane"></i> Travel Packages
                        </button>
                        <button class="quick-action-btn" data-action="contact">
                            <i class="fas fa-phone"></i> Contact Us
                        </button>
                    </div>
                    
                    <div class="chatbot-input-container">
                        <input 
                            type="text" 
                            id="chatbot-input" 
                            placeholder="Type your message..."
                            autocomplete="off"
                        />
                        <button id="chatbot-send" class="chatbot-send-btn">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }

    attachEventListeners() {
        const toggle = document.getElementById('chatbot-toggle');
        const close = document.getElementById('chatbot-close');
        const send = document.getElementById('chatbot-send');
        const input = document.getElementById('chatbot-input');
        const quickActions = document.querySelectorAll('.quick-action-btn');

        toggle.addEventListener('click', () => this.toggleChat());
        close.addEventListener('click', () => this.toggleChat());
        send.addEventListener('click', () => this.sendMessage());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        quickActions.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.currentTarget.dataset.action;
                this.handleQuickAction(action);
            });
        });
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        const window = document.getElementById('chatbot-window');
        const toggle = document.getElementById('chatbot-toggle');

        if (this.isOpen) {
            window.classList.add('active');
            toggle.classList.add('hidden');
        } else {
            window.classList.remove('active');
            toggle.classList.remove('hidden');
        }
    }

    addWelcomeMessage() {
        const welcomeMsg = "👋 Hello! I'm your AI Travel Assistant. I can help you with:\n\n✈️ Visa applications & requirements\n🏨 Travel packages & bookings\n💰 Pricing information\n📞 Connecting with our agents\n\nHow can I assist you today?";
        this.addMessage(welcomeMsg, 'bot');
    }

    handleQuickAction(action) {
        const actions = {
            visa: "I'm interested in visa services",
            travel: "Tell me about travel packages",
            contact: "How can I contact you?"
        };

        const message = actions[action];
        if (message) {
            this.addMessage(message, 'user');
            setTimeout(() => this.processMessage(message), 500);
        }
    }

    sendMessage() {
        const input = document.getElementById('chatbot-input');
        const message = input.value.trim();

        if (message) {
            this.addMessage(message, 'user');
            input.value = '';

            setTimeout(() => this.processMessage(message), 800);
        }
    }

    addMessage(text, sender) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${sender}-message`;

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = sender === 'bot'
            ? '<i class="fas fa-robot"></i>'
            : '<i class="fas fa-user"></i>';

        const content = document.createElement('div');
        content.className = 'message-content';
        content.textContent = text;

        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        messagesContainer.appendChild(messageDiv);

        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        this.messages.push({ text, sender, timestamp: new Date() });
    }

    processMessage(message) {
        const lowerMessage = message.toLowerCase();
        let response = '';

        // Check for greetings
        if (this.containsAny(lowerMessage, this.knowledgeBase.greetings)) {
            response = this.getRandomResponse('greeting');
        }
        // Check for thank you
        else if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
            response = this.getRandomResponse('thanks');
        }
        // Check for FAQ patterns
        else if (this.checkFAQs(lowerMessage)) {
            response = this.checkFAQs(lowerMessage);
        }
        // Check for document inquiries
        else if (this.containsAny(lowerMessage, this.knowledgeBase.documentKeywords)) {
            response = this.handleDocumentInquiry(lowerMessage);
        }
        // Check for payment inquiries
        else if (this.containsAny(lowerMessage, this.knowledgeBase.paymentKeywords)) {
            response = this.getRandomResponse('payment');
        }
        // Check for booking inquiries
        else if (this.containsAny(lowerMessage, this.knowledgeBase.bookingKeywords)) {
            response = this.getRandomResponse('booking');
        }
        // Check for team inquiries
        else if (this.containsAny(lowerMessage, this.knowledgeBase.teamKeywords)) {
            response = this.handleTeamInquiry(lowerMessage);
        }
        // Check for hours inquiries
        else if (this.containsAny(lowerMessage, this.knowledgeBase.hoursKeywords)) {
            response = this.getRandomResponse('hours');
        }
        // Check for location inquiries
        else if (this.containsAny(lowerMessage, this.knowledgeBase.locationKeywords)) {
            response = this.getRandomResponse('location');
        }
        // Check for visa inquiries
        else if (this.containsAny(lowerMessage, this.knowledgeBase.visaKeywords)) {
            response = this.handleVisaInquiry(lowerMessage);
        }
        // Check for travel inquiries
        else if (this.containsAny(lowerMessage, this.knowledgeBase.travelKeywords)) {
            response = this.getRandomResponse('travel');
        }
        // Check for contact inquiries
        else if (this.containsAny(lowerMessage, this.knowledgeBase.contactKeywords)) {
            response = this.getRandomResponse('contact');
        }
        // Check for help
        else if (this.containsAny(lowerMessage, this.knowledgeBase.helpKeywords)) {
            response = this.getRandomResponse('help');
        }
        // Default response
        else {
            response = this.getRandomResponse('default');
        }

        this.addMessage(response, 'bot');
    }

    checkFAQs(message) {
        for (const [question, answer] of Object.entries(this.knowledgeBase.faqs)) {
            if (message.includes(question)) {
                return answer;
            }
        }
        return null;
    }

    handleDocumentInquiry(message) {
        // Check for specific visa types
        if (message.includes('business')) {
            return "For BUSINESS visas, you'll need:\n\n" +
                this.knowledgeBase.documentRequirements.general.join('\n') +
                '\n\nAdditional business documents:\n' +
                this.knowledgeBase.documentRequirements.business.join('\n');
        } else if (message.includes('student')) {
            return "For STUDENT visas, you'll need:\n\n" +
                this.knowledgeBase.documentRequirements.general.join('\n') +
                '\n\nAdditional student documents:\n' +
                this.knowledgeBase.documentRequirements.student.join('\n');
        } else {
            return this.getRandomResponse('documents');
        }
    }

    handleTeamInquiry(message) {
        // Check if asking about a specific agent
        for (const member of this.knowledgeBase.teamMembers) {
            if (message.includes(member.name.toLowerCase())) {
                return `${member.name} - ${member.role}\n\n📞 Phone: ${member.phone}\n🎯 Specialty: ${member.specialty}\n\nWould you like to contact ${member.name.split(' ')[0]}?`;
            }
        }

        // Check for specialty-based search
        if (message.includes('uk') || message.includes('usa') || message.includes('america')) {
            const specialist = this.knowledgeBase.teamMembers.find(m => m.specialty.includes('UK'));
            return `For UK/USA visas, I recommend:\n\n${specialist.name} - ${specialist.role}\n📞 ${specialist.phone}\n🎯 ${specialist.specialty}`;
        }

        return this.getRandomResponse('team');
    }

    handleVisaInquiry(message) {
        // Check if a specific country is mentioned
        for (const [country, details] of Object.entries(this.knowledgeBase.visaServices)) {
            if (message.includes(country)) {
                return `Great! For ${country.toUpperCase()} visa:\n\n💰 Price: ${details.price}\n⏱️ Processing Time: ${details.processing}\n📝 Visa Type: ${details.type}\n\n📋 Required documents:\n• Valid passport (6 months validity)\n• Passport photos\n• Bank statements\n• Travel itinerary\n• Employment letter\n\nWould you like to speak with an agent to start your application?`;
            }
        }

        // Generic visa response with expanded list
        return this.getRandomResponse('visa') + "\n\nPopular destinations:\n🇬🇧 UK - $200\n🇺🇸 USA - $250\n🇨🇦 Canada - $180\n🇦🇪 Dubai - $120\n🇹🇭 Thailand - $100\n🇮🇳 India - $140\n🇸🇬 Singapore - $110\n🇲🇾 Malaysia - $95\n\nAnd many more destinations available!";
    }

    containsAny(text, keywords) {
        return keywords.some(keyword => text.includes(keyword));
    }

    getRandomResponse(type) {
        const responses = this.knowledgeBase.responses[type];
        return responses[Math.floor(Math.random() * responses.length)];
    }
}

// Initialize chatbot when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.travelChatbot = new TravelChatbot();
});
