/* ═══════════════════════════════════════════════════════════════════
   ENHANCED AI TOURIST GUIDE
   Multi-language intelligent chatbot for Egypt tourism
   ═══════════════════════════════════════════════════════════════════ */

'use strict';

// ========== AI Knowledge Base (Enhanced) ==========
const AI_KNOWLEDGE = {
    'pyramids': {
        en: 'The Pyramids of Giza are ancient tombs built around 4,500 years ago! The Great Pyramid was the tallest structure for 3,800 years. Visit daily 8 AM-5 PM. Tickets: ~240 EGP. Don\'t miss the Sound & Light show at night!',
        ar: 'أهرامات الجيزة هي مقابر قديمة بُنيت منذ 4500 عام! كان الهرم الأكبر أطول مبنى لمدة 3800 عام. الزيارة: 8 صباحاً-5 مساءً. التذاكر: ~240 جنيه. لا تفوت عرض الصوت والضوء ليلاً!',
        fr: 'Les pyramides de Gizeh sont des tombes anciennes construites il y a 4 500 ans! La Grande Pyramide était la plus haute structure pendant 3 800 ans. Visite: 8h-17h. Billets: ~240 EGP. Ne manquez pas le spectacle son et lumière!'
    },
    'weather': {
        en: 'Egypt has hot desert climate. Summer (Jun-Aug): 35-40°C, Winter (Dec-Feb): 15-25°C. Best time: Oct-Apr. Bring sunscreen, hat, and stay hydrated!',
        ar: 'مصر لديها مناخ صحراوي حار. الصيف (يونيو-أغسطس): 35-40°م، الشتاء (ديسمبر-فبراير): 15-25°م. أفضل وقت: أكتوبر-أبريل. أحضر واقي شمس وقبعة واشرب ماء!',
        fr: 'L\'Égypte a un climat désertique chaud. Été (juin-août): 35-40°C, Hiver (déc-fév): 15-25°C. Meilleure période: oct-avr. Apportez crème solaire, chapeau et restez hydraté!'
    },
    'food': {
        en: 'Try Egyptian cuisine! Must-try: Koshari (rice/lentils/pasta), Ful Medames (fava beans), Ta\'meya (falafel), Molokhia, Hawawshi. Desserts: Basbousa, Konafa, Om Ali. Street food is safe and delicious!',
        ar: 'جرب المطبخ المصري! يجب تجربة: كشري، فول مدمس، طعمية، ملوخية، حواوشي. حلويات: بسبوسة، كنافة، أم علي. طعام الشارع آمن ولذيذ!',
        fr: 'Essayez la cuisine égyptienne! Incontournables: Koshari, Ful Medames, Ta\'meya (falafel), Molokhia, Hawawshi. Desserts: Basbousa, Konafa, Om Ali. Street food est sûr et délicieux!'
    },
    'safety': {
        en: 'Egypt is generally safe for tourists! Tourist areas have good security. Keep valuables secure, drink bottled water, follow local customs. Women: dress modestly. Emergency: 122 (Police), 123 (Ambulance), 180 (Tourist Police).',
        ar: 'مصر آمنة للسياح! المناطق السياحية لديها أمن جيد. احتفظ بالأشياء الثمينة آمنة، اشرب ماء معبأ، اتبع العادات المحلية. للنساء: ملابس محتشمة. الطوارئ: 122 (شرطة)، 123 (إسعاف)، 180 (شرطة السياحة).',
        fr: 'L\'Égypte est généralement sûre pour les touristes! Les zones touristiques ont une bonne sécurité. Gardez les objets de valeur en sécurité, buvez de l\'eau en bouteille, suivez les coutumes locales. Femmes: habillez-vous modestement. Urgence: 122 (Police), 123 (Ambulance), 180 (Police touristique).'
    },
    'sphinx': {
        en: 'The Great Sphinx: limestone statue with lion body & human head (Pharaoh Khafre). 73m long, 20m high. Located next to Giza Pyramids. Ages: ~4,500 years!',
        ar: 'أبو الهول العظيم: تمثال حجري بجسم أسد ورأس إنسان (الفرعون خفرع). طول 73م، ارتفاع 20م. بجانب أهرامات الجيزة. العمر: ~4500 عام!',
        fr: 'Le Grand Sphinx: statue calcaire avec corps de lion et tête humaine (Pharaon Khéphren). 73m long, 20m haut. Près des Pyramides de Gizeh. Âge: ~4 500 ans!'
    },
    'nile': {
        en: 'The Nile: World\'s longest river (6,650 km)! Nile cruises are must-do experiences. Cruises: Cairo to Aswan, stopping at ancient sites. Felucca rides at sunset are magical! Price: ~$300-800 for 3-4 days.',
        ar: 'النيل: أطول نهر في العالم (6650 كم)! الرحلات النيلية تجربة لا بد منها. الرحلات: القاهرة-أسوان، مع التوقف في المواقع القديمة. رحلات الفلوكة عند الغروب ساحرة! السعر: ~300-800$ لـ3-4 أيام.',
        fr: 'Le Nil: Plus long fleuve du monde (6 650 km)! Les croisières sur le Nil sont incontournables. Croisières: Le Caire à Assouan, arrêts aux sites anciens. Balades en felouque au coucher du soleil magiques! Prix: ~300-800$ pour 3-4 jours.'
    },
    'museum': {
        en: 'Egyptian Museum Cairo: 120,000+ ancient artifacts! Highlight: Tutankhamun\'s golden mask & treasures. Grand Egyptian Museum (near Pyramids): opening soon, world\'s largest archaeological museum! Plan 3-4 hours minimum.',
        ar: 'المتحف المصري بالقاهرة: 120,000+ قطعة أثرية! النجم: قناع توت عنخ آمون الذهبي وكنوزه. المتحف المصري الكبير (قرب الأهرامات): افتتاح قريباً، أكبر متحف أثري في العالم! خطط لـ3-4 ساعات على الأقل.',
        fr: 'Musée égyptien du Caire: 120 000+ artefacts anciens! Point culminant: masque d\'or de Toutânkhamon et trésors. Grand Musée égyptien (près Pyramides): ouverture bientôt, plus grand musée archéologique du monde! Prévoyez 3-4 heures minimum.'
    },
    'luxor': {
        en: 'Luxor: World\'s greatest open-air museum! Must-see: Valley of the Kings (pharaohs\' tombs), Karnak Temple (largest temple complex), Luxor Temple, Hatshepsut Temple. Hot air balloon rides at sunrise: unforgettable! Best: Oct-Apr.',
        ar: 'الأقصر: أعظم متحف مفتوح في العالم! يجب رؤية: وادي الملوك (مقابر الفراعنة)، معبد الكرنك (أكبر مجمع معابد)، معبد الأقصر، معبد حتشبسوت. رحلات المنطاد عند الشروق: لا تُنسى! الأفضل: أكتوبر-أبريل.',
        fr: 'Louxor: Plus grand musée à ciel ouvert du monde! Incontournables: Vallée des Rois (tombes des pharaons), Temple de Karnak (plus grand complexe), Temple de Louxor, Temple d\'Hatchepsout. Montgolfières au lever du soleil: inoubliable! Meilleur: oct-avr.'
    },
    'red sea': {
        en: 'Red Sea: Paradise for divers & beach lovers! Top spots: Hurghada, Sharm El-Sheikh, Marsa Alam, Dahab. Stunning coral reefs, colorful fish, marine life. Activities: snorkeling, diving (PADI courses available), windsurfing. Best: Sep-May.',
        ar: 'البحر الأحمر: جنة للغواصين ومحبي الشواطئ! أفضل الأماكن: الغردقة، شرم الشيخ، مرسى علم، دهب. شعاب مرجانية مذهلة، أسماك ملونة، حياة بحرية. أنشطة: غطس، غوص (دورات PADI متاحة)، ركوب الأمواج. الأفضل: سبتمبر-مايو.',
        fr: 'Mer Rouge: Paradis pour plongeurs et amoureux de plage! Meilleurs spots: Hurghada, Sharm El-Sheikh, Marsa Alam, Dahab. Récifs coralliens magnifiques, poissons colorés, vie marine. Activités: snorkeling, plongée (cours PADI disponibles), planche à voile. Meilleur: sep-mai.'
    },
    'hello': {
        en: 'Hello! 👋 I\'m your AI tourist guide for Egypt. I can help with: Places to visit, History, Weather, Food, Safety, Travel tips, Budget planning. What would you like to know?',
        ar: 'مرحباً! 👋 أنا مرشدك السياحي الذكي لمصر. يمكنني المساعدة في: الأماكن للزيارة، التاريخ، الطقس، الطعام، الأمان، نصائح السفر، تخطيط الميزانية. ماذا تريد أن تعرف؟',
        fr: 'Bonjour! 👋 Je suis votre guide touristique IA pour l\'Égypte. Je peux aider avec: Lieux à visiter, Histoire, Météo, Nourriture, Sécurité, Conseils de voyage, Planification budgétaire. Que souhaitez-vous savoir?'
    },
    'budget': {
        en: 'Egypt budget guide: Budget: $30-50/day (hostels, street food, public transport). Mid-range: $50-100/day (3-star hotels, restaurants, some tours). Luxury: $150+/day (5-star, fine dining, private tours). Use our Budget Calculator for detailed estimates!',
        ar: 'دليل ميزانية مصر: اقتصادي: 30-50$/يوم (نُزل، طعام شارع، مواصلات عامة). متوسط: 50-100$/يوم (فنادق 3 نجوم، مطاعم، بعض الجولات). فاخر: 150+$/يوم (5 نجوم، مطاعم راقية، جولات خاصة). استخدم حاسبة الميزانية للتقديرات التفصيلية!',
        fr: 'Guide budget Égypte: Économique: 30-50$/jour (auberges, street food, transport public). Moyen: 50-100$/jour (hôtels 3 étoiles, restaurants, quelques tours). Luxe: 150+$/jour (5 étoiles, gastronomie, tours privés). Utilisez notre calculateur de budget pour estimations détaillées!'
    },
    'transport': {
        en: 'Transport in Egypt: Metro (Cairo): cheap & efficient (~5 EGP). Uber/Careem: widely available, safe. Trains: Cairo-Luxor (~150 EGP), Cairo-Aswan (~200 EGP). Domestic flights: faster for long distances. Always negotiate taxi fares before!',
        ar: 'المواصلات في مصر: المترو (القاهرة): رخيص وفعال (~5 جنيه). أوبر/كريم: متاح بكثرة، آمن. القطارات: القاهرة-الأقصر (~150 جنيه)، القاهرة-أسوان (~200 جنيه). الطيران الداخلي: أسرع للمسافات الطويلة. فاوض دائماً على أجرة التاكسي قبل!',
        fr: 'Transport en Égypte: Métro (Le Caire): bon marché et efficace (~5 EGP). Uber/Careem: largement disponible, sûr. Trains: Le Caire-Louxor (~150 EGP), Le Caire-Assouan (~200 EGP). Vols intérieurs: plus rapide pour longues distances. Négociez toujours le prix du taxi avant!'
    },
    'default': {
        en: 'I\'m your AI guide for Egypt! I can tell you about: 🏛️ Pyramids, Sphinx, Luxor, Aswan, 🏖️ Red Sea, beaches, 🍽️ Egyptian food, 🌤️ Weather & best times, 💰 Budget & costs, 🚗 Transportation, 🛡️ Safety tips. Ask me anything!',
        ar: 'أنا مرشدك الذكي لمصر! يمكنني إخبارك عن: 🏛️ الأهرامات، أبو الهول، الأقصر، أسوان، 🏖️ البحر الأحمر، الشواطئ، 🍽️ الطعام المصري، 🌤️ الطقس وأفضل الأوقات، 💰 الميزانية والتكاليف، 🚗 المواصلات، 🛡️ نصائح الأمان. اسألني أي شيء!',
        fr: 'Je suis votre guide IA pour l\'Égypte! Je peux vous parler de: 🏛️ Pyramides, Sphinx, Louxor, Assouan, 🏖️ Mer Rouge, plages, 🍽️ Cuisine égyptienne, 🌤️ Météo et meilleures périodes, 💰 Budget et coûts, 🚗 Transport, 🛡️ Conseils sécurité. Demandez-moi n\'importe quoi!'
    }
};

// ========== Initialize AI Guide ==========
function initializeAIGuide() {
    console.log('🤖 Initializing enhanced AI Guide...');
    
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const chatMessages = document.getElementById('chat-messages');
    const quickBtns = document.querySelectorAll('.quick-btn');

    if (!chatInput || !sendBtn || !chatMessages) {
        console.error('AI Guide elements not found');
        return;
    }

    // Send message on button click
    sendBtn.addEventListener('click', () => {
        sendMessage(chatInput.value);
    });

    // Send message on Enter key
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(chatInput.value);
        }
    });

    // Quick buttons
    quickBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const question = btn.getAttribute('data-question');
            if (question) {
                chatInput.value = question;
                sendMessage(question);
            }
        });
    });

    console.log('✅ AI Guide initialized');
}

// ========== Send Message ==========
function sendMessage(message) {
    if (!message || !message.trim()) return;

    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    
    if (!chatMessages || !chatInput) return;

    // Add user message
    addMessage(message, 'user');

    // Clear input
    chatInput.value = '';

    // Get AI response after short delay
    setTimeout(() => {
        const response = getAIResponse(message.toLowerCase());
        addMessage(response, 'bot');
    }, 500);
}

// ========== Add Message to Chat ==========
function addMessage(text, sender) {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;

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

// ========== Get AI Response ==========
function getAIResponse(query) {
    const lang = getCurrentLanguage();
    const searchQuery = query.toLowerCase().trim();
    
    console.log('🤖 AI Guide - Processing query:', searchQuery, 'Language:', lang);
    
    // Enhanced keyword matching with multi-language support
    const topicKeywords = {
        pyramids: ['pyramid', 'pyramids', 'هرم', 'أهرامات', 'pyramide', 'pyramides', 'giza', 'جيزة', 'gizeh'],
        sphinx: ['sphinx', 'أبو الهول', 'ابو الهول', 'سفينكس', 'sfinks'],
        nile: ['nile', 'النيل', 'نهر', 'cruise', 'رحلة نيلية', 'كروز', 'croisière', 'felucca', 'فلوكة'],
        weather: ['weather', 'طقس', 'climate', 'مناخ', 'température', 'temperature', 'حرارة', 'hot', 'cold', 'حار', 'بارد', 'chaud', 'froid'],
        food: ['food', 'eat', 'restaurant', 'طعام', 'أكل', 'مطعم', 'كشري', 'koshari', 'فول', 'nourriture', 'manger', 'cuisine', 'dish', 'طبق'],
        safety: ['safe', 'safety', 'security', 'أمان', 'أمن', 'آمن', 'sécurité', 'sûr', 'danger', 'خطر', 'secure', 'آمنة'],
        museum: ['museum', 'متحف', 'musée', 'tutankhamun', 'توت عنخ آمون', 'toutânkhamon', 'tutankhamen', 'artifact', 'أثري'],
        luxor: ['luxor', 'الأقصر', 'اقصر', 'louxor', 'valley of kings', 'وادي الملوك', 'karnak', 'الكرنك', 'hatshepsut', 'حتشبسوت'],
        'red sea': ['red sea', 'البحر الأحمر', 'بحر احمر', 'mer rouge', 'hurghada', 'الغردقة', 'غردقة', 'sharm', 'شرم', 'diving', 'غوص', 'plongée', 'coral', 'مرجان', 'dahab', 'دهب', 'marsa alam', 'مرسى علم'],
        budget: ['budget', 'cost', 'price', 'money', 'ميزانية', 'تكلفة', 'سعر', 'فلوس', 'argent', 'prix', 'coût', 'expensive', 'cheap', 'غالي', 'رخيص'],
        transport: ['transport', 'taxi', 'uber', 'metro', 'train', 'مواصلات', 'تاكسي', 'مترو', 'قطار', 'أوبر', 'bus', 'أتوبيس', 'careem', 'كريم', 'flight', 'طيران'],
        hello: ['hello', 'hi', 'hey', 'مرحبا', 'مرحباً', 'السلام', 'أهلا', 'bonjour', 'salut', 'help', 'مساعدة', 'aide', 'start', 'ابدأ', 'commencer']
    };
    
    // Find best matching topic
    let bestMatch = 'default';
    let maxMatches = 0;
    
    for (const [topic, keywords] of Object.entries(topicKeywords)) {
        let matchCount = 0;
        for (const keyword of keywords) {
            if (searchQuery.includes(keyword)) {
                matchCount++;
            }
        }
        
        if (matchCount > maxMatches) {
            maxMatches = matchCount;
            bestMatch = topic;
        }
    }
    
    console.log('✅ Best match:', bestMatch, '(', maxMatches, 'keyword matches)');
    
    // Get response in current language with fallback
    const response = AI_KNOWLEDGE[bestMatch] 
        ? (AI_KNOWLEDGE[bestMatch][lang] || AI_KNOWLEDGE[bestMatch]['en'] || AI_KNOWLEDGE['default'][lang])
        : AI_KNOWLEDGE['default'][lang];
    
    return response;
}

// ========== Helper Functions ==========
function getCurrentLanguage() {
    return localStorage.getItem('language') || 'en';
}

// ========== Initialize on Load ==========
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAIGuide);
} else {
    initializeAIGuide();
}
