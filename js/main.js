/* ==========================================
   DISCOVER EGYPT - JAVASCRIPT
   OMAR Web Design Project - Middle 2
   ========================================== */

// Import simple authentication (compatible version)
import { initAuth } from './core/auth-simple.js';

// Import translations from JS file
import { translations } from '../data/translations.js';

// ========== GLOBAL VARIABLES ==========
let currentLanguage = 'en'; // Default language

// ========== INITIALIZATION ==========
// This function runs when the page loads
document.addEventListener('DOMContentLoaded', async function() {
    console.log('🚀 Discover Egypt - Starting...');

    try {
        console.log('✅ Translations loaded from JS module');

        // Initialize all features
        initializeNavigation();
        console.log('✅ Navigation initialized');
        
        initializeTheme();
        console.log('✅ Theme initialized');
        
        initializeLanguage();
        console.log('✅ Language initialized');
        
        initializeMobileMenu();
        console.log('✅ Mobile menu initialized');
        
        initializeFilters();
        console.log('✅ Filters initialized');
        
        initializeMap();
        console.log('✅ Map initialized');
        
        // initializeAIGuide(); // ❌ Removed - Using new Gemini AI Guide
        // console.log('✅ AI Guide initialized');
        
        initializeTools();  // ✅ تم التصحيح
        console.log('✅ Tools initialized');
        
        // Initialize tool buttons for navigation
        initializeToolButtons();
        console.log('✅ Tool buttons initialized');
        
        // Initialize simple authentication system
        console.log('🔐 Initializing authentication...');
        initAuth();
        console.log('✅ Authentication ready');
        
        console.log('🎉 All systems ready!');
    } catch (error) {
        console.error('❌ Initialization error:', error);
    }
});

// ========== SECTION NAVIGATION (SPA Behavior) ==========
function initializeNavigation() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    // Add click event to each navigation link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default link behavior

            // Get the target section from data attribute
            const targetSection = this.getAttribute('data-section');

            // Hide all sections
            sections.forEach(section => {
                section.classList.remove('active');
            });

            // Show the target section
            const activeSection = document.getElementById(targetSection);
            if (activeSection) {
                activeSection.classList.add('active');
            }

            // Update active state on navigation links
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });
            this.classList.add('active');

            // Close mobile menu after navigation (if open)
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }

            // Scroll to top smoothly
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });

    // CTA Button - Navigate to Tools section
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // Find and click the Tools navigation link
            const toolsLink = document.querySelector('[data-section="plans"]');
            if (toolsLink) {
                toolsLink.click();
            }
        });
    }
}

// ========== TOOL BUTTONS NAVIGATION ==========
function initializeToolButtons() {
    const toolButtons = document.querySelectorAll('.tool-btn');
    const sections = document.querySelectorAll('.section');

    toolButtons.forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault(); // يمنع الانتقال الافتراضي

            const targetId = btn.getAttribute('href').substring(1); // اسم القسم
            const targetSection = document.getElementById(targetId);

            // خفي كل الأقسام
            sections.forEach(sec => sec.classList.remove('visible'));

            // أظهر القسم المطلوب
            if(targetSection) targetSection.classList.add('visible');

            // تمرير الصفحة للقسم بشكل ناعم
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });
}







// ========== THEME TOGGLE (Dark/Light Mode) ==========
function initializeTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.querySelector('.theme-icon');
    const themeOptionBtns = document.querySelectorAll('.theme-option-btn');

    // Check if user has a saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    // Theme toggle button in navbar
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }

    // Theme option buttons in settings
    themeOptionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const selectedTheme = this.getAttribute('data-theme');
            setTheme(selectedTheme);

            // Update active state
            themeOptionBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Function to set theme
    function setTheme(theme) {
        // Set theme attribute on HTML element
        document.documentElement.setAttribute('data-theme', theme);

        // Save to localStorage
        localStorage.setItem('theme', theme);

        // Update icon
        if (themeIcon) {
            themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
        }

        // Update active button in settings
        themeOptionBtns.forEach(btn => {
            if (btn.getAttribute('data-theme') === theme) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        console.log(`Theme changed to: ${theme}`);
    }
}

// ========== LANGUAGE SYSTEM ==========
function initializeLanguage() {
    const languageSelector = document.getElementById('language-selector');
    const languageRadios = document.querySelectorAll('input[name="language"]');
    const autoDetectCheckbox = document.getElementById('auto-detect-lang');

    // Check for auto-detect preference
    const autoDetect = localStorage.getItem('autoDetectLang') !== 'false';
    if (autoDetectCheckbox) {
        autoDetectCheckbox.checked = autoDetect;
    }

    // Auto-detect browser language if enabled
    if (autoDetect) {
        const browserLang = navigator.language.substring(0, 2); // Get 'en' from 'en-US'
        const supportedLangs = ['en', 'ar', 'fr'];

        if (supportedLangs.includes(browserLang)) {
            currentLanguage = browserLang;
        }
    } else {
        // Use saved language
        currentLanguage = localStorage.getItem('language') || 'en';
    }

    // Set initial language
    setLanguage(currentLanguage);

    // Language selector in navbar
    if (languageSelector) {
        languageSelector.addEventListener('change', function() {
            const selectedLang = this.value;
            setLanguage(selectedLang);
        });
    }

    // Language radio buttons in settings
    languageRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.checked) {
                const selectedLang = this.value;
                setLanguage(selectedLang);
            }
        });
    });

    // Auto-detect checkbox
    if (autoDetectCheckbox) {
        autoDetectCheckbox.addEventListener('change', function() {
            localStorage.setItem('autoDetectLang', this.checked);

            if (this.checked) {
                // Re-detect browser language
                const browserLang = navigator.language.substring(0, 2);
                const supportedLangs = ['en', 'ar', 'fr'];

                if (supportedLangs.includes(browserLang)) {
                    setLanguage(browserLang);
                }
            }
        });
    }
}

function setLanguage(lang) {
    console.log(`🌐 setLanguage() called with: ${lang}`);
    currentLanguage = lang;

    // Update HTML lang and dir attributes
    document.documentElement.setAttribute('lang', lang);

    // Set RTL for Arabic
    if (lang === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
    }

    // Update selectors and radio buttons
    const languageSelector = document.getElementById('language-selector');
    if (languageSelector) {
        languageSelector.value = lang;
    }

    const languageRadios = document.querySelectorAll('input[name="language"]');
    languageRadios.forEach(radio => {
        radio.checked = (radio.value === lang);
    });

    // Save to localStorage
    localStorage.setItem('language', lang);

    // Apply translations if loaded
    console.log('📦 Checking if translations are loaded...');
    console.log('translations object keys:', Object.keys(translations));

    if (Object.keys(translations).length > 0) {
        console.log('✅ Translations are loaded, applying...');
        applyTranslations();
    } else {
        console.warn('⚠️ Translations not loaded yet');
    }

    console.log(`✅ Language changed to: ${lang}`);
}

// Translation functions are now in js/core/app.js - no duplication needed


// ========== MOBILE MENU TOGGLE ==========
function initializeMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    // Create overlay element
    let overlay = document.querySelector('.mobile-menu-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'mobile-menu-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s ease;
            z-index: 998;
        `;
        body.appendChild(overlay);
    }

    if (mobileToggle && navMenu) {
        // Toggle menu on button click
        mobileToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });

        // Close menu when clicking overlay
        overlay.addEventListener('click', function() {
            closeMenu();
        });

        // Close menu when clicking nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMenu();
            });
        });

        // Close menu when pressing Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMenu();
            }
        });

        function toggleMenu() {
            const isActive = navMenu.classList.contains('active');
            if (isActive) {
                closeMenu();
            } else {
                openMenu();
            }
        }

        function openMenu() {
            navMenu.classList.add('active');
            mobileToggle.classList.add('active');
            overlay.style.opacity = '1';
            overlay.style.visibility = 'visible';
            body.style.overflow = 'hidden';
        }

        function closeMenu() {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
            overlay.style.opacity = '0';
            overlay.style.visibility = 'hidden';
            body.style.overflow = '';
        }
    }
}

// ========== EXPLORE FILTERS ==========
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const exploreCards = document.querySelectorAll('.explore-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get selected category
            const category = this.getAttribute('data-category');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter cards
            exploreCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (category === 'all' || cardCategory === category) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// ========== MAP INTERACTION ==========


// ========== AI TOURIST GUIDE (Keyword-based) ==========
function initializeAIGuide() {
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const chatMessages = document.getElementById('chat-messages');
    const quickBtns = document.querySelectorAll('.quick-btn');

    // AI Knowledge Base (Simple keyword matching)
    const aiKnowledge = {
        'pyramids': {
            en: 'The Pyramids of Giza are ancient tombs built around 4,500 years ago! The Great Pyramid was the tallest structure for 3,800 years. You can visit them daily from 8 AM to 5 PM. Don\'t forget to see the Sound and Light show at night!',
            ar: 'أهرامات الجيزة هي مقابر قديمة بُنيت منذ حوالي 4500 عام! كان الهرم الأكبر أطول بناء لمدة 3800 عام. يمكنك زيارتها يومياً من 8 صباحاً حتى 5 مساءً. لا تنس مشاهدة عرض الصوت والضوء ليلاً!',
            fr: 'Les pyramides de Gizeh sont des tombes anciennes construites il y a environ 4 500 ans! La Grande Pyramide a été la plus haute structure pendant 3 800 ans. Vous pouvez les visiter tous les jours de 8h à 17h. N\'oubliez pas de voir le spectacle son et lumière la nuit!'
        },
        'weather': {
            en: 'Egypt has a hot desert climate. Summer (June-August) is very hot (35-40°C), while winter (December-February) is mild (15-25°C). The best time to visit is October-April. Bring sunscreen and stay hydrated!',
            ar: 'تتمتع مصر بمناخ صحراوي حار. الصيف (يونيو-أغسطس) حار جداً (35-40 درجة)، بينما الشتاء (ديسمبر-فبراير) معتدل (15-25 درجة). أفضل وقت للزيارة هو أكتوبر-أبريل. أحضر واقي الشمس واشرب الماء!',
            fr: 'L\'Égypte a un climat désertique chaud. L\'été (juin-août) est très chaud (35-40°C), tandis que l\'hiver (décembre-février) est doux (15-25°C). Le meilleur moment pour visiter est octobre-avril. Apportez de la crème solaire et restez hydraté!'
        },
        'food': {
            en: 'Egyptian cuisine is delicious! Try koshari (rice, lentils, pasta), ful medames (fava beans), ta\'ameya (falafel), and molokhia (green soup). Don\'t miss traditional desserts like basbousa and konafa. Street food is generally safe and tasty!',
            ar: 'المطبخ المصري لذيذ! جرب الكشري (أرز، عدس، مكرونة)، الفول المدمس، الطعمية، والملوخية. لا تفوت الحلويات التقليدية مثل البسبوسة والكنافة. طعام الشارع آمن ولذيذ بشكل عام!',
            fr: 'La cuisine égyptienne est délicieuse! Essayez le koshari (riz, lentilles, pâtes), le ful medames (fèves), le ta\'ameya (falafel) et le molokhia (soupe verte). Ne manquez pas les desserts traditionnels comme le basbousa et le konafa. La street food est généralement sûre et savoureuse!'
        },
        'safety': {
            en: 'Egypt is generally safe for tourists! Tourist areas have good security. Always keep valuables secure, drink bottled water, and follow local customs. Women should dress modestly. Emergency number: 122 (Police), 123 (Ambulance).',
            ar: 'مصر آمنة بشكل عام للسياح! المناطق السياحية لديها أمن جيد. احتفظ دائماً بالأشياء الثمينة بأمان، اشرب الماء المعبأ، واتبع العادات المحلية. يجب على النساء ارتداء ملابس محتشمة. أرقام الطوارئ: 122 (شرطة)، 123 (إسعاف).',
            fr: 'L\'Égypte est généralement sûre pour les touristes! Les zones touristiques ont une bonne sécurité. Gardez toujours vos objets de valeur en sécurité, buvez de l\'eau en bouteille et suivez les coutumes locales. Les femmes doivent s\'habiller modestement. Numéros d\'urgence: 122 (Police), 123 (Ambulance).'
        },
        'sphinx': {
            en: 'The Great Sphinx is a massive limestone statue with a lion\'s body and human head, believed to represent Pharaoh Khafre. It\'s about 73 meters long and 20 meters high. Located right next to the pyramids in Giza!',
            ar: 'أبو الهول العظيم هو تمثال ضخم من الحجر الجيري بجسم أسد ورأس إنسان، يُعتقد أنه يمثل الفرعون خفرع. يبلغ طوله حوالي 73 متراً وارتفاعه 20 متراً. يقع بجانب الأهرامات في الجيزة!',
            fr: 'Le Grand Sphinx est une statue massive en calcaire avec un corps de lion et une tête humaine, censée représenter le pharaon Khéphren. Il mesure environ 73 mètres de long et 20 mètres de haut. Situé juste à côté des pyramides à Gizeh!'
        },
        'nile': {
            en: 'The Nile River is the longest river in the world at 6,650 km! A Nile cruise is a must-do experience. You can take cruises from Cairo to Aswan, stopping at ancient sites. Felucca sailboat rides at sunset are magical!',
            ar: 'نهر النيل هو أطول نهر في العالم بطول 6650 كم! رحلة نيلية هي تجربة لا بد منها. يمكنك القيام برحلات من القاهرة إلى أسوان، مع التوقف في المواقع القديمة. رحلات الفلوكة عند الغروب ساحرة!',
            fr: 'Le Nil est le plus long fleuve du monde avec 6 650 km! Une croisière sur le Nil est une expérience incontournable. Vous pouvez faire des croisières du Caire à Assouan, en vous arrêtant sur des sites anciens. Les balades en felouque au coucher du soleil sont magiques!'
        },
        'museum': {
            en: 'The Egyptian Museum in Cairo houses over 120,000 ancient artifacts! The highlight is Tutankhamun\'s golden mask and treasures. The new Grand Egyptian Museum near the pyramids is also amazing. Plan to spend at least 3-4 hours!',
            ar: 'يضم المتحف المصري في القاهرة أكثر من 120,000 قطعة أثرية قديمة! أبرزها قناع توت عنخ آمون الذهبي وكنوزه. المتحف المصري الكبير الجديد بالقرب من الأهرامات رائع أيضاً. خطط لقضاء 3-4 ساعات على الأقل!',
            fr: 'Le Musée égyptien du Caire abrite plus de 120 000 artefacts anciens! Le point culminant est le masque d\'or de Toutânkhamon et ses trésors. Le nouveau Grand Musée égyptien près des pyramides est également incroyable. Prévoyez au moins 3-4 heures!'
        },
        'luxor': {
            en: 'Luxor is incredible! Visit the Valley of the Kings where pharaohs are buried, Karnak Temple (the largest temple complex), and Luxor Temple. Hot air balloon rides at sunrise offer breathtaking views of ancient sites!',
            ar: 'الأقصر رائعة! زر وادي الملوك حيث دُفن الفراعنة، ومعبد الكرنك (أكبر مجمع معابد)، ومعبد الأقصر. توفر رحلات المنطاد عند شروق الشمس مناظر خلابة للمواقع القديمة!',
            fr: 'Louxor est incroyable! Visitez la Vallée des Rois où les pharaons sont enterrés, le temple de Karnak (le plus grand complexe de temples) et le temple de Louxor. Les montgolfières au lever du soleil offrent des vues à couper le souffle sur les sites anciens!'
        },
        'red sea': {
            en: 'The Red Sea is a paradise for divers and beach lovers! Visit Hurghada, Sharm El-Sheikh, or Marsa Alam. The coral reefs are stunning with colorful fish and marine life. You can snorkel, dive, or just relax on beautiful beaches!',
            ar: 'البحر الأحمر جنة لعشاق الغوص والشواطئ! زر الغردقة أو شرم الشيخ أو مرسى علم. الشعاب المرجانية مذهلة مع الأسماك الملونة والحياة البحرية. يمكنك الغطس أو الغوص أو الاسترخاء على الشواطئ الجميلة!',
            fr: 'La Mer Rouge est un paradis pour les plongeurs et les amoureux de la plage! Visitez Hurghada, Sharm El-Sheikh ou Marsa Alam. Les récifs coralliens sont magnifiques avec des poissons colorés et la vie marine. Vous pouvez faire de la plongée, du snorkeling ou simplement vous détendre sur de belles plages!'
        },
        'hello': {
            en: 'Hello! I\'m your AI tourist guide. I can help you with information about Egyptian places, history, weather, food, and travel tips. What would you like to know?',
            ar: 'مرحباً! أنا دليلك السياحي الذكي. يمكنني مساعدتك بمعلومات عن الأماكن المصرية والتاريخ والطقس والطعام ونصائح السفر. ماذا تريد أن تعرف؟',
            fr: 'Bonjour! Je suis votre guide touristique IA. Je peux vous aider avec des informations sur les lieux égyptiens, l\'histoire, la météo, la nourriture et les conseils de voyage. Que souhaitez-vous savoir?'
        },
        'default': {
            en: 'I\'m a simple educational AI focused on Egypt tourism. I can tell you about: Pyramids, Sphinx, Museums, Nile River, Luxor, Red Sea, Weather, Food, and Safety. Try asking about these topics!',
            ar: 'أنا ذكاء اصطناعي تعليمي بسيط متخصص في السياحة المصرية. يمكنني إخبارك عن: الأهرامات، أبو الهول، المتاحف، نهر النيل، الأقصر، البحر الأحمر، الطقس، الطعام، والأمان. جرب السؤال عن هذه المواضيع!',
            fr: 'Je suis une IA éducative simple axée sur le tourisme égyptien. Je peux vous parler de: Pyramides, Sphinx, Musées, Nil, Louxor, Mer Rouge, Météo, Nourriture et Sécurité. Essayez de poser des questions sur ces sujets!'
        }
    };

    // Send message function
    function sendMessage(message) {
        if (!message.trim()) return;

        // Add user message
        addMessage(message, 'user');

        // Clear input
        chatInput.value = '';

        // Get AI response
        setTimeout(() => {
            const response = getAIResponse(message.toLowerCase());
            addMessage(response, 'bot');
        }, 500);
    }

    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = sender === 'bot' ? '🤖' : '👤';

        const content = document.createElement('div');
        content.className = 'message-content';

        const p = document.createElement('p');
        p.textContent = text;
        content.appendChild(p);

        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);

        chatMessages.appendChild(messageDiv);

        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // AI Response Logic (Keyword Matching)
    function getAIResponse(userMessage) {
        // Keywords for each topic
        const keywords = {
            'pyramids': ['pyramid', 'pyramids', 'giza', 'الأهرامات', 'هرم', 'الجيزة', 'pyramide'],
            'sphinx': ['sphinx', 'أبو الهول', 'ابو الهول'],
            'museum': ['museum', 'متحف', 'musée', 'tutankhamun', 'توت'],
            'nile': ['nile', 'النيل', 'nil', 'river', 'نهر', 'fleuve'],
            'weather': ['weather', 'climate', 'temperature', 'الطقس', 'المناخ', 'حرارة', 'météo', 'climat'],
            'food': ['food', 'eat', 'restaurant', 'cuisine', 'طعام', 'أكل', 'مطعم', 'nourriture', 'manger'],
            'safety': ['safe', 'safety', 'security', 'أمان', 'آمن', 'sécurité', 'sûr'],
            'luxor': ['luxor', 'الأقصر', 'louxor', 'valley', 'karnak', 'الكرنك', 'وادي'],
            'red sea': ['red sea', 'البحر الأحمر', 'mer rouge', 'diving', 'beach', 'شاطئ', 'غوص', 'plage'],
            'hello': ['hello', 'hi', 'hey', 'مرحبا', 'السلام', 'bonjour', 'salut']
        };

        // Check for keywords
        for (const [topic, words] of Object.entries(keywords)) {
            for (const word of words) {
                if (userMessage.includes(word)) {
                    return aiKnowledge[topic][currentLanguage];
                }
            }
        }

        // Default response
        return aiKnowledge['default'][currentLanguage];
    }

    // Event listeners
    if (sendBtn) {
        sendBtn.addEventListener('click', () => {
            sendMessage(chatInput.value);
        });
    }

    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage(chatInput.value);
            }
        });
    }

    // Quick question buttons
    quickBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const question = this.getAttribute('data-question');

            // Map questions to full text
            const questions = {
                'pyramids': {
                    en: 'Tell me about the Pyramids',
                    ar: 'أخبرني عن الأهرامات',
                    fr: 'Parlez-moi des Pyramides'
                },
                'weather': {
                    en: 'What\'s the weather like?',
                    ar: 'كيف الطقس؟',
                    fr: 'Quel temps fait-il?'
                },
                'food': {
                    en: 'What food should I try?',
                    ar: 'ما الطعام الذي يجب أن أجربه؟',
                    fr: 'Quelle nourriture devrais-je essayer?'
                },
                'safety': {
                    en: 'Is Egypt safe for tourists?',
                    ar: 'هل مصر آمنة للسياح؟',
                    fr: 'L\'Égypte est-elle sûre pour les touristes?'
                }
            };

            const questionText = questions[question][currentLanguage];
            sendMessage(questionText);
        });
    });
}

// ========== UTILITY FUNCTIONS ==========

// Initialize Tools Section
function initializeTools() {  // ✅ تم التصحيح
    console.log('✅ Tools section initialized');
    // Navigation is handled by initializeNavigation()
    // This function can be extended for additional tools features
}







// Log for educational purposes
console.log('✅ All JavaScript modules loaded successfully!');
console.log('📚 Features: Navigation, Theme Toggle, Language System, AI Guide, Mobile Menu');
console.log('🎓 Built with Vanilla JavaScript - No Frameworks');