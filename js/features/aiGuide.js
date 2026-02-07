/* ==========================================
   DISCOVER EGYPT - AIGUIDE.JS
   AI chat system
   ========================================== */

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
