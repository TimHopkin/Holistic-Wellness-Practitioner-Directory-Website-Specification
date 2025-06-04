// Profile page functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeProfilePage();
});

function initializeProfilePage() {
    // Get practitioner ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const practitionerId = parseInt(urlParams.get('id')) || 1;
    
    // Load practitioner data (in a real app, this would come from an API)
    loadPractitionerProfile(practitionerId);
    
    // Initialize interactive elements
    initializeBookingButtons();
    initializeContactForms();
}

function loadPractitionerProfile(practitionerId) {
    // Sample practitioner profiles data
    const practitionerProfiles = {
        1: {
            name: "Sarah Chen",
            modalities: ["Somatic Therapy", "Energy Healing", "Breathwork"],
            location: "San Francisco, CA",
            sessionTypes: ["💻 Virtual", "🏠 In-Person"],
            bio: [
                "Sarah is a compassionate somatic therapist with over 8 years of experience helping women reconnect with their bodies and heal from trauma. Her integrative approach combines somatic experiencing, energy healing, and breathwork to support deep transformation.",
                "She believes that the body holds infinite wisdom and that through gentle, trauma-informed practices, we can access our innate capacity for healing. Sarah creates a safe, nurturing space where clients can explore their inner landscape and discover new pathways to wellness."
            ],
            philosophy: "I believe that healing happens in relationship - with ourselves, our bodies, and the world around us. My role is to witness and support your journey back to wholeness.",
            approach: "My practice is grounded in the understanding that trauma lives in the body, and therefore healing must also happen at the somatic level. I use gentle, body-based techniques to help you develop a new relationship with your nervous system and cultivate resilience.",
            credentials: [
                "Licensed Clinical Social Worker (LCSW)",
                "Somatic Experiencing Practitioner (SEP)",
                "Certified Breathwork Facilitator",
                "Reiki Master Teacher",
                "Trauma-Sensitive Yoga Teacher (TSY)"
            ],
            specialties: ["Trauma Recovery", "Anxiety", "Body Image", "Nervous System Regulation", "Women's Wellness"],
            sessionDetails: {
                length: "60-90 minutes",
                format: "Individual sessions, both virtual and in-person available",
                investment: "$120 - $150 per session",
                availability: "Tuesday - Friday, 10am - 6pm PST"
            },
            testimonials: [
                {
                    quote: "Sarah's gentle guidance helped me reconnect with my body after years of disconnection. Her space feels so safe and nurturing.",
                    author: "Emma K."
                },
                {
                    quote: "Working with Sarah has been transformational. She has such a gift for holding space and helping you feel what you need to feel.",
                    author: "Maria L."
                }
            ]
        },
        2: {
            name: "Maria Rodriguez",
            modalities: ["Life Coaching", "Mindfulness"],
            location: "Austin, TX",
            sessionTypes: ["💻 Virtual", "🔄 Hybrid"],
            bio: [
                "Maria empowers women to create meaningful lives through evidence-based coaching and mindfulness practices. With over 6 years of experience, she specializes in helping clients navigate life transitions and build resilience.",
                "Her approach combines practical goal-setting with deep inner work, helping clients align their actions with their values and create sustainable change."
            ],
            philosophy: "Every woman has the wisdom and strength within her to create the life she desires. My role is to help you access that wisdom and take aligned action.",
            approach: "I use a combination of cognitive-behavioral techniques, mindfulness practices, and somatic awareness to help clients create lasting change from the inside out.",
            credentials: [
                "Certified Professional Life Coach (CPC)",
                "Mindfulness-Based Stress Reduction (MBSR) Teacher",
                "Bachelor's in Psychology",
                "Certified in Emotional Freedom Techniques (EFT)"
            ],
            specialties: ["Life Transitions", "Career Coaching", "Mindfulness", "Goal Achievement", "Stress Management"],
            sessionDetails: {
                length: "60 minutes",
                format: "Individual and group sessions, virtual and hybrid options",
                investment: "$100 - $130 per session",
                availability: "Monday - Thursday, 9am - 5pm CST"
            },
            testimonials: [
                {
                    quote: "Maria helped me navigate a major career transition with confidence and clarity. Her coaching style is both supportive and challenging.",
                    author: "Jessica M."
                },
                {
                    quote: "The mindfulness techniques Maria taught me have completely changed how I handle stress. I feel more centered and focused.",
                    author: "Amanda R."
                }
            ]
        },
        3: {
            name: "Luna Thompson",
            modalities: ["Reiki", "Crystal Healing"],
            location: "Portland, OR",
            sessionTypes: ["💻 Virtual", "🏠 In-Person"],
            bio: [
                "Luna brings a gentle, intuitive approach to energy healing with over 5 years of dedicated practice. With certifications in Reiki and crystal therapy, she helps clients restore balance and tap into their inner wisdom.",
                "She creates sacred spaces for healing where clients feel deeply held and supported in their journey toward wholeness."
            ],
            philosophy: "I believe we all have an innate ability to heal and that energy work simply helps remove the blocks that prevent our natural healing processes from flowing.",
            approach: "My sessions combine traditional Reiki techniques with crystal healing and intuitive guidance, creating a personalized healing experience for each client.",
            credentials: [
                "Reiki Master Teacher",
                "Certified Crystal Healer",
                "Intuitive Energy Practitioner",
                "Sound Healing Practitioner"
            ],
            specialties: ["Energy Healing", "Spiritual Guidance", "Chakra Balancing", "Emotional Release", "Spiritual Awakening"],
            sessionDetails: {
                length: "75 minutes",
                format: "Individual sessions, in-person and distance healing available",
                investment: "$80 - $100 per session",
                availability: "Wednesday - Sunday, 11am - 7pm PST"
            },
            testimonials: [
                {
                    quote: "Luna's energy work helped me release emotional blocks I didn't even know I was carrying. I feel lighter and more connected to myself.",
                    author: "Rachel T."
                },
                {
                    quote: "The crystal healing session with Luna was profound. I experienced deep relaxation and clarity that lasted for weeks.",
                    author: "Sarah K."
                }
            ]
        }
    };

    // Get practitioner data or default to Sarah Chen
    const practitioner = practitionerProfiles[practitionerId] || practitionerProfiles[1];
    
    // Update page content
    updatePageContent(practitioner);
}

function updatePageContent(practitioner) {
    // Update practitioner name
    const nameElement = document.getElementById('practitionerName');
    if (nameElement) {
        nameElement.textContent = practitioner.name;
    }

    // Update modalities
    const modalitiesElement = document.getElementById('practitionerModalities');
    if (modalitiesElement) {
        modalitiesElement.innerHTML = practitioner.modalities
            .map(modality => `<span class="modality-tag">${modality}</span>`)
            .join('');
    }

    // Update location and session types
    const locationSession = document.querySelector('.location-session');
    if (locationSession) {
        locationSession.innerHTML = `
            <span class="location">📍 ${practitioner.location}</span>
            <span class="session-types">${practitioner.sessionTypes.join(' • ')}</span>
        `;
    }

    // Update bio
    const bioElement = document.getElementById('practitionerBio');
    if (bioElement) {
        bioElement.innerHTML = practitioner.bio
            .map(paragraph => `<p>${paragraph}</p>`)
            .join('');
    }

    // Update philosophy
    const philosophyContent = document.querySelector('.philosophy-content');
    if (philosophyContent) {
        philosophyContent.innerHTML = `
            <blockquote>"${practitioner.philosophy}"</blockquote>
            <p>${practitioner.approach}</p>
        `;
    }

    // Update credentials
    const credentialsList = document.querySelector('.credentials-list');
    if (credentialsList) {
        credentialsList.innerHTML = practitioner.credentials
            .map(credential => `<li>${credential}</li>`)
            .join('');
    }

    // Update specialties
    const specialtiesTags = document.querySelector('.specialties-tags');
    if (specialtiesTags) {
        specialtiesTags.innerHTML = practitioner.specialties
            .map(specialty => `<span class="specialty-tag">${specialty}</span>`)
            .join('');
    }

    // Update session details
    const sessionDetails = document.querySelector('.session-details');
    if (sessionDetails) {
        sessionDetails.innerHTML = `
            <div class="detail-item">
                <h4>Session Length</h4>
                <p>${practitioner.sessionDetails.length}</p>
            </div>
            <div class="detail-item">
                <h4>Session Format</h4>
                <p>${practitioner.sessionDetails.format}</p>
            </div>
            <div class="detail-item">
                <h4>Investment</h4>
                <p>${practitioner.sessionDetails.investment}</p>
            </div>
            <div class="detail-item">
                <h4>Availability</h4>
                <p>${practitioner.sessionDetails.availability}</p>
            </div>
        `;
    }

    // Update testimonials
    const testimonialsList = document.querySelector('.testimonials-list');
    if (testimonialsList) {
        testimonialsList.innerHTML = practitioner.testimonials
            .map(testimonial => `
                <div class="testimonial-item">
                    <blockquote>"${testimonial.quote}"</blockquote>
                    <cite>- ${testimonial.author}</cite>
                </div>
            `).join('');
    }

    // Update page title
    document.title = `${practitioner.name} - Holistic Wellness Directory`;
}

function initializeBookingButtons() {
    const bookCallBtn = document.getElementById('bookCallBtn');
    const inquireBtn = document.getElementById('inquireBtn');
    const scheduleConsultationBtns = document.querySelectorAll('button:contains("Schedule Consultation")');

    // Handle "Book a Call" button
    if (bookCallBtn) {
        bookCallBtn.addEventListener('click', function() {
            showBookingModal();
        });
    }

    // Handle "Send Inquiry" button
    if (inquireBtn) {
        inquireBtn.addEventListener('click', function() {
            showInquiryModal();
        });
    }

    // Handle schedule consultation buttons
    document.querySelectorAll('button').forEach(btn => {
        if (btn.textContent.includes('Schedule Consultation')) {
            btn.addEventListener('click', function() {
                showBookingModal();
            });
        }
    });
}

function initializeContactForms() {
    // Handle contact links
    const contactLinks = document.querySelectorAll('.contact-link');
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const type = this.textContent.trim();
            
            if (type.includes('Website')) {
                alert('This would open the practitioner\'s website in a new tab.');
            } else if (type.includes('Email')) {
                alert('This would open your email client to send a message to the practitioner.');
            } else if (type.includes('Instagram')) {
                alert('This would open the practitioner\'s Instagram profile in a new tab.');
            }
        });
    });
}

function showBookingModal() {
    const modal = createModal('Book a Session', `
        <div style="text-align: center; padding: 1rem;">
            <p style="margin-bottom: 2rem; color: var(--text-secondary);">
                Ready to start your healing journey? Let's schedule your session.
            </p>
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                <button onclick="this.closest('.modal-overlay').remove(); alert('This would redirect to the practitioner\\'s booking calendar.');" 
                        style="background: var(--primary-color); color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 6px; font-weight: 600; cursor: pointer;">
                    View Calendar
                </button>
                <button onclick="this.closest('.modal-overlay').remove(); showInquiryModal();" 
                        style="background: var(--accent-color); color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 6px; font-weight: 600; cursor: pointer;">
                    Send Message First
                </button>
            </div>
        </div>
    `);
    
    document.body.appendChild(modal);
}

function showInquiryModal() {
    const modal = createModal('Send Inquiry', `
        <form id="inquiryForm" style="padding: 1rem;">
            <div style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: var(--text-primary);">Your Name *</label>
                <input type="text" required style="width: 100%; padding: 0.75rem; border: 2px solid var(--border-light); border-radius: 6px; font-size: 1rem;">
            </div>
            <div style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: var(--text-primary);">Your Email *</label>
                <input type="email" required style="width: 100%; padding: 0.75rem; border: 2px solid var(--border-light); border-radius: 6px; font-size: 1rem;">
            </div>
            <div style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: var(--text-primary);">Subject</label>
                <input type="text" placeholder="e.g., Interested in somatic therapy sessions" style="width: 100%; padding: 0.75rem; border: 2px solid var(--border-light); border-radius: 6px; font-size: 1rem;">
            </div>
            <div style="margin-bottom: 1.5rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: var(--text-primary);">Message *</label>
                <textarea required rows="4" placeholder="Share what you're looking for and any questions you have..." style="width: 100%; padding: 0.75rem; border: 2px solid var(--border-light); border-radius: 6px; font-size: 1rem; resize: vertical;"></textarea>
            </div>
            <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                <button type="button" onclick="this.closest('.modal-overlay').remove();" 
                        style="background: transparent; color: var(--text-secondary); border: 2px solid var(--border-light); padding: 0.75rem 1.5rem; border-radius: 6px; cursor: pointer;">
                    Cancel
                </button>
                <button type="submit" 
                        style="background: var(--primary-color); color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 6px; font-weight: 600; cursor: pointer;">
                    Send Message
                </button>
            </div>
        </form>
    `);
    
    // Handle form submission
    const form = modal.querySelector('#inquiryForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            modal.remove();
            showSuccessMessage('Message sent! The practitioner will respond within 24-48 hours.');
        }, 1500);
    });
    
    document.body.appendChild(modal);
}

function createModal(title, content) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        padding: 2rem;
    `;

    const modal = document.createElement('div');
    modal.style.cssText = `
        background: white;
        border-radius: 12px;
        max-width: 500px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    `;

    const header = document.createElement('div');
    header.style.cssText = `
        padding: 1.5rem 1.5rem 1rem;
        border-bottom: 1px solid var(--border-light);
        display: flex;
        justify-content: space-between;
        align-items: center;
    `;

    const titleElement = document.createElement('h3');
    titleElement.textContent = title;
    titleElement.style.cssText = `
        margin: 0;
        color: var(--text-primary);
        font-size: 1.3rem;
    `;

    const closeButton = document.createElement('button');
    closeButton.innerHTML = '×';
    closeButton.style.cssText = `
        background: none;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        color: var(--text-secondary);
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    closeButton.addEventListener('click', () => overlay.remove());

    header.appendChild(titleElement);
    header.appendChild(closeButton);

    const body = document.createElement('div');
    body.innerHTML = content;

    modal.appendChild(header);
    modal.appendChild(body);
    overlay.appendChild(modal);

    // Close on overlay click
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            overlay.remove();
        }
    });

    // Close on escape key
    const escapeHandler = function(e) {
        if (e.key === 'Escape') {
            overlay.remove();
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);

    return overlay;
}

function showSuccessMessage(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: var(--accent-color);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        font-weight: 500;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}