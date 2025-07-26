/*=============== GSAP ANIMATIONS ===============*/
// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

/*=============== LOADING SCREEN ===============*/
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingBar = document.querySelector('.loading-bar');

    // Animation de chargement progressive et réaliste (4 secondes)
    const timeline = gsap.timeline();

    timeline
        // Phase 1: Chargement initial rapide (0-30%)
        .to(loadingBar, {
            width: '30%',
            duration: 0.8,
            ease: 'power2.out'
        })
        // Phase 2: Chargement moyen (30-70%)
        .to(loadingBar, {
            width: '70%',
            duration: 1.5,
            ease: 'power1.inOut'
        })
        // Phase 3: Finalisation lente (70-95%)
        .to(loadingBar, {
            width: '95%',
            duration: 1.2,
            ease: 'power2.inOut'
        })
        // Phase 4: Completion finale (95-100%)
        .to(loadingBar, {
            width: '100%',
            duration: 0.5,
            ease: 'power2.out',
            onComplete: () => {
                // Remove loading class and hide loading screen
                document.body.classList.remove('loading');
                gsap.to(loadingScreen, {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: () => {
                        loadingScreen.style.display = 'none';
                        initAnimations();
                    }
                });
            }
        });
});

/*=============== CUSTOM CURSOR ===============*/
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');

if (window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1
        });
        
        gsap.to(cursorFollower, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.3
        });
    });

    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .btn');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            gsap.to(cursor, { scale: 1.5, duration: 0.3 });
            gsap.to(cursorFollower, { scale: 1.5, duration: 0.3 });
        });
        
        element.addEventListener('mouseleave', () => {
            gsap.to(cursor, { scale: 1, duration: 0.3 });
            gsap.to(cursorFollower, { scale: 1, duration: 0.3 });
        });
    });
}

/*=============== NAVIGATION ===============*/
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

// Show menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

// Hide menu
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

// Remove menu mobile
const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
});

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
    const header = document.getElementById('header');
    if (this.scrollY >= 50) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
}
window.addEventListener('scroll', scrollHeader);

/*=============== ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 58;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    });
}
window.addEventListener('scroll', scrollActive);

/*=============== THEME CHANGE ===============*/
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'bx-sun';

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx bx-moon' : 'bx bx-sun';

// We validate if the user previously chose a topic
if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    themeButton.classList[selectedIcon === 'bx bx-moon' ? 'add' : 'remove'](iconTheme);
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
});

/*=============== GSAP ANIMATIONS INITIALIZATION ===============*/
function initAnimations() {
    // Home section animations
    const tl = gsap.timeline();
    
    // Animate greeting
    tl.from('.greeting-text', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out'
    })
    // Animate name with stagger
    .from('.name-line', {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out'
    }, '-=0.5')
    // Animate profession
    .from('.profession-text, .profession-highlight', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out'
    }, '-=0.5')
    // Animate description
    .from('.home__description', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out'
    }, '-=0.3')
    // Animate buttons
    .from('.home__buttons .btn', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out'
    }, '-=0.3')
    // Animate image
    .from('.image-container', {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        ease: 'power2.out'
    }, '-=1')
    // Animate floating elements
    .from('.floating-element', {
        opacity: 0,
        scale: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.7)'
    }, '-=0.5')
    // Animate social links
    .from('.social-link', {
        opacity: 0,
        x: -30,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out'
    }, '-=0.8')
    // Animate scroll indicator
    .from('.scroll-indicator', {
        opacity: 0,
        x: 30,
        duration: 0.8,
        ease: 'power2.out'
    }, '-=0.5');

    // Parallax effect for floating elements
    gsap.to('.floating-element', {
        y: -20,
        duration: 2,
        ease: 'power1.inOut',
        stagger: 0.2,
        repeat: -1,
        yoyo: true
    });

    // About section animations with ScrollTrigger
    gsap.from('.about__img-wrapper', {
        scrollTrigger: {
            trigger: '.about__img-wrapper',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: -50,
        duration: 1,
        ease: 'power2.out'
    });

    gsap.from('.about__text', {
        scrollTrigger: {
            trigger: '.about__text',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: 50,
        duration: 1,
        ease: 'power2.out'
    });

    // Animate stats with counter effect
    gsap.from('.stat-item', {
        scrollTrigger: {
            trigger: '.about__stats',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        onComplete: animateCounters
    });

    // Background grid animation
    gsap.to('.bg-grid', {
        backgroundPosition: '50px 50px',
        duration: 20,
        ease: 'none',
        repeat: -1
    });

    // Skills section animations
    gsap.from('.skills__content', {
        scrollTrigger: {
            trigger: '.skills',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.3,
        ease: 'power2.out'
    });

    // Animate skill progress bars
    gsap.utils.toArray('.skills__progress-bar').forEach(bar => {
        const width = bar.getAttribute('data-width');
        gsap.to(bar, {
            scrollTrigger: {
                trigger: bar,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            width: width + '%',
            duration: 1.5,
            ease: 'power2.out',
            delay: 0.5
        });
    });

    // Simple Project Cards Animations
    gsap.from('.project-card', {
        scrollTrigger: {
            trigger: '.projects__grid',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
    });

    // Animate progress bars when visible
    gsap.utils.toArray('.progress-fill').forEach(bar => {
        const progress = bar.getAttribute('data-progress') || '75';
        gsap.to(bar, {
            scrollTrigger: {
                trigger: bar,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            width: progress + '%',
            duration: 1.5,
            ease: 'power2.out',
            delay: 0.3
        });
    });

    // Contact section animations
    gsap.from('.contact__card', {
        scrollTrigger: {
            trigger: '.contact__cards',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out'
    });

    gsap.from('.contact__form-container', {
        scrollTrigger: {
            trigger: '.contact__form-container',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: 50,
        duration: 1,
        ease: 'power2.out'
    });

    // Footer animations
    gsap.from('.footer__content, .footer__links', {
        scrollTrigger: {
            trigger: '.footer',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.3,
        ease: 'power2.out'
    });

    // Chatbot entrance animation
    gsap.from('.chatbot__toggle', {
        scale: 0,
        rotation: 180,
        duration: 0.8,
        ease: 'back.out(1.7)',
        delay: 2
    });

    // Animate chatbot notification
    gsap.set('.chatbot__notification', {
        scale: 0.8,
        opacity: 0
    });
}

/*=============== COUNTER ANIMATION ===============*/
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2;
        
        gsap.to(counter, {
            innerHTML: target,
            duration: duration,
            ease: 'power2.out',
            snap: { innerHTML: 1 },
            onUpdate: function() {
                counter.innerHTML = Math.ceil(counter.innerHTML);
            }
        });
    });
}

/*=============== SMOOTH SCROLLING ===============*/
const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

smoothScrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: targetSection,
                    offsetY: 70
                },
                ease: 'power2.inOut'
            });
        }
    });
});

/*=============== SCROLL REVEAL ANIMATIONS ===============*/
gsap.utils.toArray('.section').forEach(section => {
    gsap.from(section.querySelectorAll('.section__subtitle, .section__title'), {
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out'
    });
});

/*=============== AI CHATBOT ===============*/
class AIChatbot {
    constructor() {
        this.chatbotToggle = document.getElementById('chatbot-toggle');
        this.chatbotContainer = document.getElementById('chatbot-container');
        this.chatbotClose = document.getElementById('chatbot-close');
        this.chatbotInput = document.getElementById('chatbot-input');
        this.chatbotSend = document.getElementById('chatbot-send');
        this.chatbotMessages = document.getElementById('chatbot-messages');
        this.chatbotNotification = document.getElementById('chatbot-notification');
        this.suggestions = document.querySelectorAll('.suggestion');

        this.isOpen = false;
        this.responses = this.initializeResponses();
        this.conversationHistory = this.loadConversationHistory();

        this.init();
        this.loadPreviousMessages();
    }

    initializeResponses() {
        return {
            // Informations de contact
            'numéro|téléphone|phone|appeler': {
                response: "📞 Vous pouvez contacter Haidi Iliass au numéro : <strong>+212 709702820</strong><br><br>N'hésitez pas à l'appeler ou lui envoyer un message WhatsApp !",
                suggestions: ['Email', 'LinkedIn', 'Projets']
            },
            'email|mail|adresse|contact': {
                response: "📧 L'adresse email de Haidi Iliass est : <strong>haidi.iliass.pro@gmail.com</strong><br><br>Il répond généralement dans les 24 heures !",
                suggestions: ['Téléphone', 'LinkedIn', 'Compétences']
            },
            'linkedin|réseau|professionnel': {
                response: "💼 Retrouvez Haidi Iliass sur LinkedIn : <a href='https://www.linkedin.com/in/haidi-iliass-37381833a' target='_blank'>Haidi Iliass</a><br><br>N'hésitez pas à vous connecter avec lui !",
                suggestions: ['Email', 'GitHub', 'Projets']
            },

            // Études et formation
            'études|formation|école|université|diplôme': {
                response: "🎓 <strong>Formation de Haidi Iliass :</strong><br><br>• Étudiant en 2ème année à l'OFPPT NTIC-2<br>• Spécialisation : Développement Full-Stack<br>• Formation continue en nouvelles technologies<br><br>Il est passionné par l'apprentissage continu !",
                suggestions: ['Compétences', 'Projets', 'Expérience']
            },

            // Compétences techniques
            'compétences|technologies|langages|programmation|stack': {
                response: "💻 <strong>Compétences techniques :</strong><br><br><strong>Frontend :</strong><br>• HTML5, CSS3, JavaScript<br>• React, Bootstrap<br><br><strong>Backend :</strong><br>• PHP/Laravel, Python<br>• MySQL, MongoDB<br><br><strong>Outils :</strong><br>• Git/GitHub, IONIC",
                suggestions: ['Projets', 'Expérience', 'Formation']
            },

            // Projets
            'projets|portfolio|réalisations|travaux': {
                response: "🚀 <strong>Projets principaux :</strong><br><br>• <strong>Listen APP</strong> - Application de streaming musical<br>• <strong>MP3 Player</strong> - Lecteur audio avec visualiseur<br>• <strong>Spyzem App</strong> - Application de monitoring<br><br>Plus de 15 projets réalisés au total !",
                suggestions: ['Compétences', 'GitHub', 'Contact']
            },

            // Expérience
            'expérience|travail|emploi|stage': {
                response: "💼 <strong>Expérience :</strong><br><br>• Plus de 15 projets développés<br>• Spécialiste en développement Full-Stack<br>• Support technique 24/7<br>• Collaboration en équipe<br><br>Toujours prêt pour de nouveaux défis !",
                suggestions: ['Projets', 'Compétences', 'Contact']
            },

            // Services
            'services|offres|propositions': {
                response: "🛠️ <strong>Services proposés :</strong><br><br>• Développement d'applications web et mobile<br>• Services de déploiement complets<br>• Création et gestion de boutiques e-commerce<br>• Support technique continu",
                suggestions: ['Projets', 'Contact', 'Tarifs']
            },

            // Disponibilité
            'disponible|libre|temps|horaires': {
                response: "⏰ Haidi Iliass est disponible pour de nouveaux projets !<br><br>• Support 24/7<br>• Réponse rapide aux messages<br>• Flexible sur les horaires<br><br>Contactez-le pour discuter de votre projet !",
                suggestions: ['Contact', 'Services', 'Tarifs']
            },

            // Localisation
            'où|localisation|adresse|ville|pays': {
                response: "📍 Haidi Iliass est basé au <strong>Maroc</strong><br><br>Il travaille principalement en remote mais peut se déplacer selon les besoins du projet.",
                suggestions: ['Contact', 'Services', 'Disponibilité']
            },

            // Salutations
            'bonjour|salut|hello|bonsoir|hey': {
                response: "👋 Bonjour ! Je suis ravi de vous aider à en savoir plus sur Haidi Iliass.<br><br>Que souhaitez-vous savoir ? Ses compétences, ses projets, ou comment le contacter ?",
                suggestions: ['Compétences', 'Projets', 'Contact', 'Formation']
            },

            // Remerciements
            'merci|thanks|thank you': {
                response: "😊 De rien ! N'hésitez pas si vous avez d'autres questions sur Haidi Iliass ou ses services.<br><br>Bonne journée !",
                suggestions: ['Contact', 'Projets', 'Services']
            },

            // Questions sur l'assistant
            'qui es-tu|qui êtes-vous|assistant|bot|ia': {
                response: "🤖 Je suis l'assistant virtuel de Haidi Iliass ! Je suis là pour répondre à toutes vos questions sur son parcours, ses compétences et ses projets.<br><br>Je peux vous aider à :",
                suggestions: ['Contact', 'Compétences', 'Projets', 'Formation']
            },

            // Tarifs et coûts
            'tarifs|prix|coût|budget|combien': {
                response: "💰 Pour connaître les tarifs de Haidi Iliass, je vous recommande de le contacter directement. Il propose des devis personnalisés selon :<br><br>• La complexité du projet<br>• Les technologies utilisées<br>• Les délais souhaités<br><br>Contactez-le pour un devis gratuit !",
                suggestions: ['Contact', 'Services', 'Projets']
            },

            // GitHub
            'github|code|source|repository': {
                response: "💻 Retrouvez les projets de Haidi Iliass sur GitHub : <a href='https://github.com/iliass7777' target='_blank'>@iliass7777</a><br><br>Vous y trouverez ses derniers projets et contributions open source !",
                suggestions: ['Projets', 'Compétences', 'LinkedIn']
            },

            // Au revoir
            'au revoir|bye|goodbye|à bientôt': {
                response: "👋 Au revoir ! Merci d'avoir visité le portfolio de Haidi Iliass.<br><br>N'hésitez pas à revenir si vous avez d'autres questions !",
                suggestions: ['Contact', 'Projets']
            }
        };
    }

    init() {
        // Show notification after 2 seconds
        setTimeout(() => {
            this.showNotification();
        }, 2000);

        // Show notification again every 30 seconds if not opened
        setInterval(() => {
            if (!this.isOpen) {
                this.showNotification();
            }
        }, 30000);

        // Event listeners
        this.chatbotToggle.addEventListener('click', () => this.toggleChatbot());
        this.chatbotClose.addEventListener('click', () => this.closeChatbot());
        this.chatbotSend.addEventListener('click', () => this.sendMessage());
        this.chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        // Suggestion clicks
        this.suggestions.forEach(suggestion => {
            suggestion.addEventListener('click', () => {
                const question = suggestion.getAttribute('data-question');
                this.chatbotInput.value = question;
                this.sendMessage();
            });
        });

        // Add hover effect to toggle
        this.chatbotToggle.addEventListener('mouseenter', () => {
            gsap.to(this.chatbotToggle, {
                scale: 1.1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        this.chatbotToggle.addEventListener('mouseleave', () => {
            gsap.to(this.chatbotToggle, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    }

    showNotification() {
        if (!this.isOpen) {
            // Animate notification appearance
            gsap.to(this.chatbotNotification, {
                scale: 1,
                opacity: 1,
                duration: 0.3,
                ease: 'back.out(1.7)',
                onComplete: () => {
                    this.chatbotNotification.classList.add('show');
                }
            });

            setTimeout(() => {
                gsap.to(this.chatbotNotification, {
                    scale: 0.8,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power2.inOut',
                    onComplete: () => {
                        this.chatbotNotification.classList.remove('show');
                    }
                });
            }, 5000);
        }
    }

    toggleChatbot() {
        this.isOpen = !this.isOpen;

        if (this.isOpen) {
            // Animate chatbot opening
            this.chatbotContainer.classList.add('active');
            gsap.from(this.chatbotContainer, {
                scale: 0.8,
                opacity: 0,
                y: 20,
                duration: 0.4,
                ease: 'back.out(1.7)'
            });

            // Animate toggle button
            gsap.to(this.chatbotToggle, {
                rotation: 180,
                scale: 0.9,
                duration: 0.3,
                ease: 'power2.inOut'
            });

            setTimeout(() => this.chatbotInput.focus(), 400);
        } else {
            // Animate chatbot closing
            gsap.to(this.chatbotContainer, {
                scale: 0.8,
                opacity: 0,
                y: 20,
                duration: 0.3,
                ease: 'power2.inOut',
                onComplete: () => {
                    this.chatbotContainer.classList.remove('active');
                }
            });

            // Reset toggle button
            gsap.to(this.chatbotToggle, {
                rotation: 0,
                scale: 1,
                duration: 0.3,
                ease: 'power2.inOut'
            });
        }

        this.chatbotNotification.classList.remove('show');
    }

    closeChatbot() {
        this.isOpen = false;
        this.chatbotContainer.classList.remove('active');
    }

    sendMessage() {
        const message = this.chatbotInput.value.trim();
        if (!message) return;

        // Add user message
        this.addMessage(message, 'user');
        this.chatbotInput.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        // Generate response after delay
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.generateResponse(message);
            this.addMessage(response.text, 'bot');
            this.updateSuggestions(response.suggestions);
        }, 1000 + Math.random() * 1000);
    }

    addMessage(text, type) {
        const currentTime = this.getCurrentTime();
        const messageDiv = this.addMessageToDOM(text, type, currentTime);

        // Save to history
        this.conversationHistory.push({
            text: text,
            type: type,
            time: currentTime,
            timestamp: Date.now()
        });
        this.saveConversationHistory();

        // Animate message
        gsap.from(messageDiv, {
            opacity: 0,
            y: 20,
            duration: 0.3,
            ease: 'power2.out'
        });
    }

    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message message--bot typing-message';
        typingDiv.innerHTML = `
            <div class="message__avatar">
                <i class="bx bx-bot"></i>
            </div>
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;

        this.chatbotMessages.appendChild(typingDiv);
        this.chatbotMessages.scrollTop = this.chatbotMessages.scrollHeight;
    }

    hideTypingIndicator() {
        const typingMessage = this.chatbotMessages.querySelector('.typing-message');
        if (typingMessage) {
            typingMessage.remove();
        }
    }

    generateResponse(message) {
        const lowerMessage = message.toLowerCase();

        // Find matching response
        for (const [keywords, responseData] of Object.entries(this.responses)) {
            const keywordList = keywords.split('|');
            if (keywordList.some(keyword => lowerMessage.includes(keyword))) {
                return {
                    text: responseData.response,
                    suggestions: responseData.suggestions || []
                };
            }
        }

        // Default response
        return {
            text: "🤔 Je ne suis pas sûr de comprendre votre question. Voici quelques sujets sur lesquels je peux vous renseigner :",
            suggestions: ['Contact', 'Compétences', 'Projets', 'Formation']
        };
    }

    updateSuggestions(suggestions) {
        const suggestionsContainer = document.getElementById('chatbot-suggestions');

        // Animate out old suggestions
        gsap.to(suggestionsContainer.children, {
            opacity: 0,
            y: -10,
            duration: 0.2,
            stagger: 0.05,
            onComplete: () => {
                suggestionsContainer.innerHTML = '';

                // Add new suggestions
                suggestions.forEach((suggestion, index) => {
                    const suggestionDiv = document.createElement('div');
                    suggestionDiv.className = 'suggestion';
                    suggestionDiv.textContent = suggestion;
                    suggestionDiv.setAttribute('data-question', `Parlez-moi de ${suggestion.toLowerCase()}`);

                    suggestionDiv.addEventListener('click', () => {
                        this.chatbotInput.value = suggestionDiv.getAttribute('data-question');
                        this.sendMessage();
                    });

                    suggestionsContainer.appendChild(suggestionDiv);

                    // Animate in new suggestions
                    gsap.from(suggestionDiv, {
                        opacity: 0,
                        y: 10,
                        duration: 0.3,
                        delay: index * 0.1,
                        ease: 'power2.out'
                    });
                });
            }
        });
    }

    getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    loadConversationHistory() {
        try {
            const history = localStorage.getItem('chatbot-history');
            return history ? JSON.parse(history) : [];
        } catch (error) {
            return [];
        }
    }

    saveConversationHistory() {
        try {
            // Keep only last 20 messages to avoid storage overflow
            const recentHistory = this.conversationHistory.slice(-20);
            localStorage.setItem('chatbot-history', JSON.stringify(recentHistory));
        } catch (error) {
            console.log('Could not save conversation history');
        }
    }

    loadPreviousMessages() {
        // Only load if there are previous messages and it's not the first visit
        if (this.conversationHistory.length > 1) {
            // Clear default message
            this.chatbotMessages.innerHTML = '';

            // Load last few messages
            const recentMessages = this.conversationHistory.slice(-6);
            recentMessages.forEach(msg => {
                this.addMessageToDOM(msg.text, msg.type, msg.time);
            });
        }
    }

    addMessageToDOM(text, type, time = null) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message message--${type}`;

        const avatar = document.createElement('div');
        avatar.className = 'message__avatar';
        avatar.innerHTML = type === 'bot' ? '<i class="bx bx-bot"></i>' : '<i class="bx bx-user"></i>';

        const content = document.createElement('div');
        content.className = 'message__content';
        content.innerHTML = `<p>${text}</p><span class="message__time">${time || this.getCurrentTime()}</span>`;

        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);

        this.chatbotMessages.appendChild(messageDiv);
        this.chatbotMessages.scrollTop = this.chatbotMessages.scrollHeight;

        return messageDiv;
    }
}

/*=============== CHATBOT SIMPLIFIÉ ===============*/
function toggleChatbot() {
    console.log('🤖 Clic sur le chatbot détecté !');

    // Simple alert avec informations
    alert('🤖 Assistant IA de Haidi Iliass\n\n' +
          'Bonjour ! Je peux vous renseigner sur :\n\n' +
          '• Compétences techniques\n' +
          '• Projets réalisés\n' +
          '• Formation et expérience\n' +
          '• Coordonnées de contact\n\n' +
          'N\'hésitez pas à me poser vos questions !');

    // Animation simple du bouton
    const chatbotBtn = document.getElementById('chatbot-btn');
    if (chatbotBtn) {
        gsap.to(chatbotBtn, {
            scale: 0.9,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: 'power2.inOut'
        });
    }
}

// Initialize chatbot simplifié
document.addEventListener('DOMContentLoaded', () => {
    console.log('🤖 Initialisation du chatbot simplifié...');

    const chatbotBtn = document.getElementById('chatbot-btn');
    const chatbotNotification = document.getElementById('chatbot-notification');

    if (chatbotBtn) {
        console.log('✅ Bouton chatbot trouvé !');

        // Animation d'entrée simple (après le chargement)
        gsap.from(chatbotBtn, {
            scale: 0,
            duration: 0.5,
            ease: 'back.out(1.7)',
            delay: 5 // Apparaît après le chargement de 4s + 1s
        });

        // Afficher notification après le chargement complet
        setTimeout(() => {
            if (chatbotNotification) {
                chatbotNotification.classList.add('show');

                // Masquer après 4 secondes
                setTimeout(() => {
                    chatbotNotification.classList.remove('show');
                }, 4000);
            }
        }, 6000); // 4s de chargement + 2s d'attente

        console.log('✅ Chatbot simplifié initialisé avec succès !');
    } else {
        console.error('❌ Bouton chatbot non trouvé !');
    }
});

/*=============== EMAILJS CONTACT FORM ===============*/
// Initialize EmailJS
(function() {
    emailjs.init("ws5C0bbs06CbwA1_N");
})();

// Contact form handler
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        emailjs.sendForm('service_we20q3w', 'template_mmumd83', this)
            .then(function(response) {
                console.log('SUCCESS!', response);

                // Show success animation
                gsap.to('.contact__form', {
                    scale: 0.95,
                    duration: 0.1,
                    yoyo: true,
                    repeat: 1,
                    ease: 'power2.inOut'
                });

                alert('Message envoyé avec succès!');
                contactForm.reset();
            }, function(error) {
                console.log('FAILED...', error);
                alert('Échec de l\'envoi du message.');
            });
    });
}
