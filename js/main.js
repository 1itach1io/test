/* ==========================================
   DISCOVER EGYPT - JAVASCRIPT
   Student Web Design Project - Grade 8
   ========================================== */

// ========== GLOBAL VARIABLES ==========
let currentLanguage = 'en'; // Default language
let translations = {}; // Will store all translations from JSON

// ========== INITIALIZATION ==========
// This function runs when the page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Website loaded successfully!');

    // Initialize all features
    initializeNavigation();
    initializeTheme();
    initializeLanguage();
    initializeMobileMenu();
    initializeFilters();
    initializeMap();
    initializeAIGuide();

    // Load translations from JSON file
    loadTranslations();
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

    // CTA Button - Navigate to Explore section
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // Find and click the Explore navigation link
            const exploreLink = document.querySelector('[data-section="explore"]');
            if (exploreLink) {
                exploreLink.click();
            }
        });
    }
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
    if (Object.keys(translations).length > 0) {
        applyTranslations();
    }

    console.log(`Language changed to: ${lang}`);
}

// ========== LOAD TRANSLATIONS FROM JSON ==========
function loadTranslations() {
    // For this educational project, we'll use inline translations
    // In a real project, you would fetch from data/translations.json

    translations = {
        "en": {
            "hero": {
                "title": "Welcome to Egypt",
                "subtitle": "Discover 7000 years of history and culture",
                "cta": "Start Exploring"
            },
            "stats": {
                "years": "Years of History",
                "pyramids": "Pyramids",
                "museums": "Museums",
                "visitors": "Annual Visitors"
            },
            "intro": {
                "title": "Why Visit Egypt?",
                "text": "Egypt is a land of wonders, where ancient history meets modern culture. From the majestic pyramids to the serene Nile River, every corner tells a story. Explore vibrant cities, relax on beautiful beaches, and dive into rich traditions."
            },
            "nearby": {
                "title": "Nearby Places",
                "subtitle": "Popular tourist destinations near you"
            },
            "places": {
                "pyramids": {
                    "title": "Pyramids of Giza",
                    "desc": "The last remaining wonder of the ancient world"
                },
                "sphinx": {
                    "title": "Great Sphinx",
                    "desc": "Mysterious guardian of the pyramids"
                },
                "museum": {
                    "title": "Egyptian Museum",
                    "desc": "Home to Tutankhamun's treasures"
                },
                "nile": {
                    "title": "Nile River",
                    "desc": "The longest river in the world"
                }
            },
            "explore": {
                "title": "Explore Egypt",
                "subtitle": "Browse by category",
                "all": "All",
                "ancient": "Ancient Sites",
                "modern": "Modern Cities",
                "nature": "Nature",
                "beach": "Beaches",
                "luxor": {
                    "title": "Luxor Temple",
                    "desc": "A large ancient Egyptian temple complex on the east bank of the Nile"
                },
                "karnak": {
                    "title": "Karnak Temple",
                    "desc": "The largest religious building ever constructed"
                },
                "cairo": {
                    "title": "Cairo City",
                    "desc": "The vibrant capital of Egypt with bustling markets and modern life"
                },
                "alex": {
                    "title": "Alexandria",
                    "desc": "Egypt's second-largest city and Mediterranean pearl"
                },
                "siwa": {
                    "title": "Siwa Oasis",
                    "desc": "A peaceful desert oasis with natural springs"
                },
                "redsea": {
                    "title": "Red Sea",
                    "desc": "Crystal clear waters perfect for diving and snorkeling"
                }
            },
            "map": {
                "title": "Egypt Map",
                "subtitle": "Explore locations across Egypt",
                "legend": "Map Legend",
                "cities": "Major Cities",
                "click": "Click on markers to learn more"
            },
            "ai": {
                "title": "AI Tourist Guide",
                "subtitle": "Ask me anything about Egypt tourism!",
                "disclaimer": "ℹ️ This is a simple educational AI model using keyword matching. It provides basic tourism information about Egypt.",
                "welcome": "Hello! I'm your AI tourist guide. Ask me about Egyptian places, history, culture, or travel tips!",
                "placeholder": "Type your question...",
                "q1": "Pyramids",
                "q2": "Weather",
                "q3": "Food",
                "q4": "Safety"
            },
            "settings": {
                "title": "Settings",
                "subtitle": "Customize your experience",
                "lang": {
                    "title": "Language Preferences",
                    "desc": "Choose your preferred language",
                    "auto": "Auto-detect device language"
                },
                "theme": {
                    "title": "Theme Settings",
                    "desc": "Choose your preferred color theme",
                    "light": "Light Mode",
                    "dark": "Dark Mode"
                },
                "about": {
                    "title": "About This Project",
                    "desc": "This is a student web design project for a Grade 8 school competition. Built with HTML, CSS, and JavaScript to showcase Egypt's tourism attractions.",
                    "tech": "Technologies: HTML5, CSS3, Vanilla JavaScript"
                }
            },
            "footer": {
                "tagline": "Your gateway to Egypt's wonders",
                "quick": "Quick Links",
                "contact": "Contact",
                "social": "Follow Us"
            }
        },
        "ar": {
            "hero": {
                "title": "مرحباً بك في مصر",
                "subtitle": "اكتشف 7000 عام من التاريخ والثقافة",
                "cta": "ابدأ الاستكشاف"
            },
            "stats": {
                "years": "سنة من التاريخ",
                "pyramids": "هرم",
                "museums": "متحف",
                "visitors": "زائر سنوياً"
            },
            "intro": {
                "title": "لماذا تزور مصر؟",
                "text": "مصر أرض العجائب، حيث يلتقي التاريخ القديم بالثقافة الحديثة. من الأهرامات المهيبة إلى نهر النيل الهادئ، كل ركن يحكي قصة. استكشف المدن النابضة بالحياة، واسترخ على الشواطئ الجميلة، وانغمس في التقاليد الغنية."
            },
            "nearby": {
                "title": "أماكن قريبة",
                "subtitle": "الوجهات السياحية الشهيرة بالقرب منك"
            },
            "places": {
                "pyramids": {
                    "title": "أهرامات الجيزة",
                    "desc": "آخر عجائب الدنيا السبع القديمة"
                },
                "sphinx": {
                    "title": "أبو الهول",
                    "desc": "الحارس الغامض للأهرامات"
                },
                "museum": {
                    "title": "المتحف المصري",
                    "desc": "موطن كنوز توت عنخ آمون"
                },
                "nile": {
                    "title": "نهر النيل",
                    "desc": "أطول نهر في العالم"
                }
            },
            "explore": {
                "title": "استكشف مصر",
                "subtitle": "تصفح حسب الفئة",
                "all": "الكل",
                "ancient": "المواقع الأثرية",
                "modern": "المدن الحديثة",
                "nature": "الطبيعة",
                "beach": "الشواطئ",
                "luxor": {
                    "title": "معبد الأقصر",
                    "desc": "مجمع معابد مصري قديم كبير على الضفة الشرقية للنيل"
                },
                "karnak": {
                    "title": "معبد الكرنك",
                    "desc": "أكبر مبنى ديني تم بناؤه على الإطلاق"
                },
                "cairo": {
                    "title": "مدينة القاهرة",
                    "desc": "عاصمة مصر النابضة بالحياة مع الأسواق الصاخبة والحياة الحديثة"
                },
                "alex": {
                    "title": "الإسكندرية",
                    "desc": "ثاني أكبر مدينة في مصر ولؤلؤة البحر الأبيض المتوسط"
                },
                "siwa": {
                    "title": "واحة سيوة",
                    "desc": "واحة صحراوية هادئة مع ينابيع طبيعية"
                },
                "redsea": {
                    "title": "البحر الأحمر",
                    "desc": "مياه صافية مثالية للغوص والسباحة"
                }
            },
            "map": {
                "title": "خريطة مصر",
                "subtitle": "استكشف المواقع في جميع أنحاء مصر",
                "legend": "مفتاح الخريطة",
                "cities": "المدن الرئيسية",
                "click": "انقر على العلامات لمعرفة المزيد"
            },
            "ai": {
                "title": "دليل سياحي ذكي",
                "subtitle": "اسألني أي شيء عن السياحة في مصر!",
                "disclaimer": "ℹ️ هذا نموذج ذكاء اصطناعي تعليمي بسيط يستخدم مطابقة الكلمات الرئيسية. يوفر معلومات سياحية أساسية عن مصر.",
                "welcome": "مرحباً! أنا دليلك السياحي الذكي. اسألني عن الأماكن المصرية أو التاريخ أو الثقافة أو نصائح السفر!",
                "placeholder": "اكتب سؤالك...",
                "q1": "الأهرامات",
                "q2": "الطقس",
                "q3": "الطعام",
                "q4": "الأمان"
            },
            "settings": {
                "title": "الإعدادات",
                "subtitle": "خصص تجربتك",
                "lang": {
                    "title": "تفضيلات اللغة",
                    "desc": "اختر لغتك المفضلة",
                    "auto": "كشف لغة الجهاز تلقائياً"
                },
                "theme": {
                    "title": "إعدادات المظهر",
                    "desc": "اختر مظهر الألوان المفضل لديك",
                    "light": "الوضع الفاتح",
                    "dark": "الوضع الداكن"
                },
                "about": {
                    "title": "حول هذا المشروع",
                    "desc": "هذا مشروع تصميم ويب طلابي لمسابقة مدرسية للصف الثامن. تم بناؤه باستخدام HTML و CSS و JavaScript لعرض مناطق الجذب السياحي في مصر.",
                    "tech": "التقنيات: HTML5, CSS3, Vanilla JavaScript"
                }
            },
            "footer": {
                "tagline": "بوابتك لعجائب مصر",
                "quick": "روابط سريعة",
                "contact": "اتصل بنا",
                "social": "تابعنا"
            }
        },
        "fr": {
            "hero": {
                "title": "Bienvenue en Égypte",
                "subtitle": "Découvrez 7000 ans d'histoire et de culture",
                "cta": "Commencer l'exploration"
            },
            "stats": {
                "years": "Ans d'histoire",
                "pyramids": "Pyramides",
                "museums": "Musées",
                "visitors": "Visiteurs annuels"
            },
            "intro": {
                "title": "Pourquoi visiter l'Égypte?",
                "text": "L'Égypte est une terre de merveilles, où l'histoire ancienne rencontre la culture moderne. Des pyramides majestueuses au Nil serein, chaque coin raconte une histoire. Explorez des villes dynamiques, détendez-vous sur de belles plages et plongez dans des traditions riches."
            },
            "nearby": {
                "title": "Lieux à proximité",
                "subtitle": "Destinations touristiques populaires près de chez vous"
            },
            "places": {
                "pyramids": {
                    "title": "Pyramides de Gizeh",
                    "desc": "La dernière merveille du monde ancien"
                },
                "sphinx": {
                    "title": "Grand Sphinx",
                    "desc": "Gardien mystérieux des pyramides"
                },
                "museum": {
                    "title": "Musée égyptien",
                    "desc": "Abritant les trésors de Toutânkhamon"
                },
                "nile": {
                    "title": "Fleuve Nil",
                    "desc": "Le plus long fleuve du monde"
                }
            },
            "explore": {
                "title": "Explorer l'Égypte",
                "subtitle": "Parcourir par catégorie",
                "all": "Tous",
                "ancient": "Sites anciens",
                "modern": "Villes modernes",
                "nature": "Nature",
                "beach": "Plages",
                "luxor": {
                    "title": "Temple de Louxor",
                    "desc": "Un grand complexe de temples égyptiens anciens sur la rive est du Nil"
                },
                "karnak": {
                    "title": "Temple de Karnak",
                    "desc": "Le plus grand édifice religieux jamais construit"
                },
                "cairo": {
                    "title": "Ville du Caire",
                    "desc": "La capitale animée de l'Égypte avec des marchés animés et la vie moderne"
                },
                "alex": {
                    "title": "Alexandrie",
                    "desc": "La deuxième plus grande ville d'Égypte et perle méditerranéenne"
                },
                "siwa": {
                    "title": "Oasis de Siwa",
                    "desc": "Une oasis désertique paisible avec des sources naturelles"
                },
                "redsea": {
                    "title": "Mer Rouge",
                    "desc": "Eaux cristallines parfaites pour la plongée et le snorkeling"
                }
            },
            "map": {
                "title": "Carte d'Égypte",
                "subtitle": "Explorer les emplacements en Égypte",
                "legend": "Légende de la carte",
                "cities": "Grandes villes",
                "click": "Cliquez sur les marqueurs pour en savoir plus"
            },
            "ai": {
                "title": "Guide touristique IA",
                "subtitle": "Demandez-moi n'importe quoi sur le tourisme en Égypte!",
                "disclaimer": "ℹ️ Il s'agit d'un modèle d'IA éducatif simple utilisant la correspondance de mots-clés. Il fournit des informations touristiques de base sur l'Égypte.",
                "welcome": "Bonjour! Je suis votre guide touristique IA. Posez-moi des questions sur les lieux égyptiens, l'histoire, la culture ou les conseils de voyage!",
                "placeholder": "Tapez votre question...",
                "q1": "Pyramides",
                "q2": "Météo",
                "q3": "Nourriture",
                "q4": "Sécurité"
            },
            "settings": {
                "title": "Paramètres",
                "subtitle": "Personnalisez votre expérience",
                "lang": {
                    "title": "Préférences linguistiques",
                    "desc": "Choisissez votre langue préférée",
                    "auto": "Détecter automatiquement la langue de l'appareil"
                },
                "theme": {
                    "title": "Paramètres du thème",
                    "desc": "Choisissez votre thème de couleur préféré",
                    "light": "Mode clair",
                    "dark": "Mode sombre"
                },
                "about": {
                    "title": "À propos de ce projet",
                    "desc": "Il s'agit d'un projet de conception Web étudiant pour un concours scolaire de 8e année. Construit avec HTML, CSS et JavaScript pour présenter les attractions touristiques de l'Égypte.",
                    "tech": "Technologies: HTML5, CSS3, Vanilla JavaScript"
                }
            },
            "footer": {
                "tagline": "Votre passerelle vers les merveilles de l'Égypte",
                "quick": "Liens rapides",
                "contact": "Contact",
                "social": "Suivez-nous"
            }
        }
    };

    // Apply translations immediately
    applyTranslations();
}

function applyTranslations() {
    // Get current language translations
    const langData = translations[currentLanguage];
    if (!langData) return;

    // Find all elements with data-translate attribute
    const elements = document.querySelectorAll('[data-translate]');

    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        const translation = getNestedTranslation(langData, key);

        if (translation) {
            element.textContent = translation;
        }
    });

    // Translate placeholder
    const chatInput = document.getElementById('chat-input');
    if (chatInput && langData.ai && langData.ai.placeholder) {
        chatInput.placeholder = langData.ai.placeholder;
    }
}

// Helper function to get nested translation (e.g., "hero.title")
function getNestedTranslation(obj, key) {
    return key.split('.').reduce((o, k) => (o || {})[k], obj);
}

// ========== MOBILE MENU TOGGLE ==========
function initializeMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');

            // Animate hamburger icon
            this.classList.toggle('active');
        });
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
function initializeMap() {
    const markers = document.querySelectorAll('.marker');
    const locationInfo = document.querySelector('.location-info');
    const closeBtn = locationInfo ? locationInfo.querySelector('.close-btn') : null;

    // Location data for each marker
    const locationData = {
        'cairo': {
            name: 'Cairo',
            nameAr: 'القاهرة',
            nameFr: 'Le Caire',
            desc: 'The capital and largest city of Egypt, known for its rich history and vibrant culture.',
            descAr: 'عاصمة مصر وأكبر مدنها، المعروفة بتاريخها الغني وثقافتها النابضة بالحياة.',
            descFr: 'La capitale et plus grande ville d\'Égypte, connue pour son riche histoire et sa culture vibrante.'
        },
        'giza': {
            name: 'Giza',
            nameAr: 'الجيزة',
            nameFr: 'Gizeh',
            desc: 'Home to the famous Pyramids and the Great Sphinx.',
            descAr: 'موطن الأهرامات الشهيرة وأبو الهول العظيم.',
            descFr: 'Abrite les célèbres pyramides et le Grand Sphinx.'
        },
        'luxor': {
            name: 'Luxor',
            nameAr: 'الأقصر',
            nameFr: 'Louxor',
            desc: 'Known as the world\'s greatest open-air museum with ancient temples.',
            descAr: 'تُعرف بأنها أعظم متحف مفتوح في العالم مع المعابد القديمة.',
            descFr: 'Connu comme le plus grand musée en plein air du monde avec des temples anciens.'
        },
        'aswan': {
            name: 'Aswan',
            nameAr: 'أسوان',
            nameFr: 'Assouan',
            desc: 'A beautiful city on the Nile with Nubian culture and ancient monuments.',
            descAr: 'مدينة جميلة على النيل مع الثقافة النوبية والآثار القديمة.',
            descFr: 'Une belle ville sur le Nil avec la culture nubienne et des monuments anciens.'
        },
        'alexandria': {
            name: 'Alexandria',
            nameAr: 'الإسكندرية',
            nameFr: 'Alexandrie',
            desc: 'Egypt\'s second-largest city and a major Mediterranean port.',
            descAr: 'ثاني أكبر مدينة في مصر وميناء رئيسي على البحر الأبيض المتوسط.',
            descFr: 'La deuxième plus grande ville d\'Égypte et un port méditerranéen majeur.'
        }
    };

    markers.forEach(marker => {
        marker.addEventListener('click', function() {
            const location = this.getAttribute('data-location');
            const data = locationData[location];

            if (data && locationInfo) {
                // Get correct language
                const nameKey = currentLanguage === 'ar' ? 'nameAr' : currentLanguage === 'fr' ? 'nameFr' : 'name';
                const descKey = currentLanguage === 'ar' ? 'descAr' : currentLanguage === 'fr' ? 'descFr' : 'desc';

                // Update content
                locationInfo.querySelector('.location-name').textContent = data[nameKey];
                locationInfo.querySelector('.location-description').textContent = data[descKey];

                // Show info card
                locationInfo.style.display = 'block';
            }
        });
    });

    // Close button
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            locationInfo.style.display = 'none';
        });
    }
}

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

// Smooth scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Log for educational purposes
console.log('✅ All JavaScript modules loaded successfully!');
console.log('📚 Features: Navigation, Theme Toggle, Language System, AI Guide, Mobile Menu');
console.log('🎓 Built with Vanilla JavaScript - No Frameworks');