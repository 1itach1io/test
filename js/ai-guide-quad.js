/* ═══════════════════════════════════════════════════════════════════
   INTELLIGENT QUAD AI GUIDE - 2026 EDITION
   مرشد مصر الذكي - نظام التبادل الرباعي المتكامل
   مع الطقس والخطط المحفوظة والمحادثات السابقة والمقارنة الشاملة
   ═══════════════════════════════════════════════════════════════════ */

(function() {
    'use strict';
    
    console.log('🌟 تحميل المرشد الذكي المتكامل - نظام 2026');
    
    /* ═══════════════════════════════════════════════════════════════════
       CONFIGURATION - الإعدادات المتقدمة
       ═══════════════════════════════════════════════════════════════════ */
    
    const AI_ENGINES = {
        GEMINI: {
            id: 'gemini',
            name: 'Gemini 2.5 Flash',
            nameAr: 'جيميني 2.5',
            emoji: '🔮',
            icon: '✨',
            apiKey: window.API_KEYS?.gemini || 'DEMO_KEY',
            endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
            color: '#4285f4',
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            strengths: ['الفهم العميق للسياق', 'السرعة الفائقة', 'دقة المعلومات'],
            weaknesses: ['قد يكون مختصراً أحياناً'],
            bestFor: ['الأسئلة السريعة', 'المعلومات السياحية', 'التوصيات الفورية'],
            avgResponseTime: 2.5,
            costPerRequest: 0.00015,
            qualityScore: 95,
            maxTokens: 8192,
            supportsArabic: true,
            enabled: true,
            priority: 1
        },
        
        GROQ: {
            id: 'groq',
            name: 'Groq Llama 3.3',
            nameAr: 'جروك لاما',
            emoji: '⚡',
            icon: '🚀',
            apiKey: window.API_KEYS?.groq || 'DEMO_KEY',
            endpoint: 'https://api.groq.com/openai/v1/chat/completions',
            model: 'llama-3.3-70b-versatile',
            color: '#f97316',
            gradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
            strengths: ['سرعة استجابة خيالية', 'إجابات مفصلة', 'استدلال منطقي قوي'],
            weaknesses: ['قد يطيل أحياناً'],
            bestFor: ['الشرح التفصيلي', 'التخطيط للرحلات', 'الأسئلة المعقدة'],
            avgResponseTime: 1.8,
            costPerRequest: 0.00010,
            qualityScore: 92,
            maxTokens: 8000,
            supportsArabic: true,
            enabled: true,
            priority: 2
        },
        
        COHERE: {
            id: 'cohere',
            name: 'Cohere Command-A',
            nameAr: 'كوهير كوماند',
            emoji: '🎯',
            icon: '💎',
            apiKey: window.API_KEYS?.cohere || 'DEMO_KEY',
            endpoint: 'https://api.cohere.com/v2/chat',
            model: 'command-a-03-2025',
            color: '#d946ef',
            gradient: 'linear-gradient(135deg, #d946ef 0%, #a21caf 100%)',
            strengths: ['تحليل عميق', 'إبداع في الاقتراحات', 'دقة لغوية عالية'],
            weaknesses: ['وقت استجابة أطول قليلاً'],
            bestFor: ['اقتراحات إبداعية', 'تحليل الخيارات', 'المقارنات التفصيلية'],
            avgResponseTime: 3.2,
            costPerRequest: 0.00020,
            qualityScore: 94,
            maxTokens: 4096,
            supportsArabic: true,
            enabled: true,
            priority: 3
        },
        
        MISTRAL: {
            id: 'mistral',
            name: 'Mistral Large 3',
            nameAr: 'ميسترال لارج',
            emoji: '🌟',
            icon: '⭐',
            apiKey: window.API_KEYS?.mistral || 'DEMO_KEY',
            endpoint: 'https://api.mistral.ai/v1/chat/completions',
            model: 'mistral-large-latest',
            color: '#8b5cf6',
            gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
            strengths: ['توازن مثالي', 'شمولية المعلومات', 'موثوقية عالية'],
            weaknesses: ['أقل سرعة من Groq'],
            bestFor: ['المعلومات الشاملة', 'البحث التاريخي', 'الإجابات المتوازنة'],
            avgResponseTime: 2.8,
            costPerRequest: 0.00018,
            qualityScore: 93,
            maxTokens: 8192,
            supportsArabic: true,
            enabled: true,
            priority: 4
        }
    };
    
    const CONFIG = {
        // نظام التبادل الذكي
        ROTATION: {
            mode: 'adaptive', // 'sequential' | 'adaptive' | 'performance' | 'cost'
            adaptiveEnabled: true,
            fallbackEnabled: true,
            maxRetries: 4,
            retryDelay: 1000,
            skipFailedTemporarily: true,
            resetFailedAfter: 300000 // 5 دقائق
        },
        
        // نظام المقارنة الشاملة
        COMPARISON: {
            enabled: true,
            autoCompare: false,
            compareAfterRequests: 5,
            showRealtimeMetrics: true,
            detailedAnalysis: true,
            visualCharts: true
        },
        
        // التكامل مع مميزات التطبيق
        INTEGRATION: {
            weather: true,
            savedPlans: true,
            chatHistory: true,
            userProfile: true,
            egyptianPlaces: true
        },
        
        // نظام توفير التكلفة
        COST_OPTIMIZATION: {
            enabled: true,
            strategy: 'balanced', // 'aggressive' | 'balanced' | 'quality'
            dailyBudget: 2.0,
            alertThreshold: 0.8,
            preferLowerCost: false
        },
        
        // نظام المحادثة المتقدم
        CONVERSATION: {
            maxHistory: 50, // زيادة الحد الأقصى للمحادثات المحفوظة
            contextWindow: 20, // زيادة نافذة السياق المرسلة للمحرك
            saveToStorage: true,
            compressionEnabled: false, // تعطيل الضغط للحفاظ على التفاصيل
            smartSummarization: false // تعطيل التلخيص للحفاظ على الذاكرة الكاملة
        },
        
        // الإعدادات العامة
        TIMEOUT: 30000,
        DEBUG: window.location.search.includes('debug=true'),
        LANGUAGE: 'ar'
    };
    
    /* ═══════════════════════════════════════════════════════════════════
       STATE MANAGEMENT - إدارة الحالة المتقدمة
       ═══════════════════════════════════════════════════════════════════ */
    
    const state = {
        // المحادثة
        conversationHistory: [],
        currentSession: null,
        
        // المحركات
        currentEngineIndex: 0,
        lastUsedEngine: null,
        failedEngines: new Map(),
        engineStats: {},
        
        // الإحصائيات
        sessionStats: {
            startTime: Date.now(),
            requestCount: 0,
            successCount: 0,
            failureCount: 0,
            totalCost: 0,
            totalResponseTime: 0
        },
        
        // المقارنة
        comparisonData: [],
        engineComparisons: [],
        
        // التكامل
        currentWeather: null,
        userPlans: [],
        egyptData: null,
        userProfile: null,
        
        // الحالة
        isProcessing: false,
        initialized: false
    };
    
    /* ═══════════════════════════════════════════════════════════════════
       SYSTEM PROMPT - البرومبت الذكي
       ═══════════════════════════════════════════════════════════════════ */
    
    function buildSystemPrompt() {
        const userName = state.userProfile?.displayName || state.userProfile?.email?.split('@')[0] || 'المسافر';
        const currentLocation = state.userProfile?.city || 'القاهرة';
        const userEmail = state.userProfile?.email || '';
        
        // الحصول على تاريخ اليوم
        const today = new Date();
        const dateStr = today.toLocaleDateString('ar-EG', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        let prompt = `أنت "مرشد مصر الذكي" 🏛️ - مساعد سياحي ذكي متخصص في السياحة المصرية

🤖 من أنا:
أنا مرشد سياحي ذكي مُصمم خصيصاً لمساعدة السياح في اكتشاف مصر. أعمل ضمن موقع "Discover Egypt" وأستطيع:
• تذكر جميع محادثاتنا السابقة وأخذها بعين الاعتبار
• الوصول إلى خططك السياحية المحفوظة ومساعدتك في تطويرها
• معرفة حالة الطقس الحالية وتقديم النصائح المناسبة
• فهم تفضيلاتك واهتماماتك لتقديم اقتراحات مخصصة
• تذكر أسئلتك السابقة وبناء إجاباتي عليها

📋 معلوماتك الشخصية:
• الاسم: ${userName}
${userEmail ? `• البريد: ${userEmail}` : ''}
• الموقع الحالي: ${currentLocation}
• اللغة المفضلة: العربية
• التاريخ: ${dateStr}
`;

        // إضافة معلومات الطقس بشكل تفصيلي
        if (state.currentWeather) {
            const weatherAdvice = getWeatherAdvice(state.currentWeather);
            prompt += `
🌡️ حالة الطقس الحالية في ${state.currentWeather.city}:
• درجة الحرارة: ${state.currentWeather.temp}°م (${state.currentWeather.description})
• الرطوبة: ${state.currentWeather.humidity}%
• سرعة الرياح: ${state.currentWeather.windSpeed} كم/س
💡 نصيحة الطقس: ${weatherAdvice}
`;
        }
        
        // إضافة الخطط المحفوظة بتفاصيل أكثر
        if (state.userPlans && state.userPlans.length > 0) {
            prompt += `
📅 خططك السياحية المحفوظة (${state.userPlans.length} خطة):
`;
            state.userPlans.slice(0, 5).forEach((plan, i) => {
                const destinations = plan.destinations || [];
                const destList = destinations.length > 0 
                    ? destinations.slice(0, 3).map(d => d.name || d).join('، ')
                    : 'غير محدد';
                prompt += `${i + 1}. "${plan.title || 'خطة بدون عنوان'}"
   • المدة: ${plan.duration || 'غير محدد'}
   • الوجهات (${destinations.length}): ${destList}${destinations.length > 3 ? '...' : ''}
   • الميزانية: ${plan.budget || 'غير محددة'}
`;
            });
            
            if (state.userPlans.length > 5) {
                prompt += `   ... وهناك ${state.userPlans.length - 5} خطط أخرى\n`;
            }
        } else {
            prompt += `
📅 لا توجد خطط سياحية محفوظة حتى الآن.
💡 يمكنني مساعدتك في إنشاء خطة سياحية مخصصة!
`;
        }
        
        // إضافة سياق المحادثة السابقة
        if (state.conversationHistory.length > 2) {
            const recentTopics = extractConversationTopics(state.conversationHistory);
            if (recentTopics.length > 0) {
                prompt += `
💬 مواضيع محادثاتنا السابقة:
${recentTopics.map((topic, i) => `${i + 1}. ${topic}`).join('\n')}
📌 تذكر: استخدم هذه المعلومات لتقديم إجابات أكثر تخصيصاً وترابطاً.
`;
            }
        }
        
        prompt += `
🎯 مهامي الأساسية كمرشد ذكي:

1️⃣ **الذاكرة والسياق**:
   • أتذكر جميع محادثاتنا السابقة وأربط بينها
   • إذا سألتني عن شيء ذكرناه من قبل، سأشير إليه
   • أبني على إجاباتي السابقة ولا أكررها حرفياً
   • أتذكر تفضيلاتك واهتماماتك

2️⃣ **معرفة الخطط المحفوظة**:
   • أعرف جميع خططك السياحية المحفوظة
   • أستطيع مساعدتك في تطوير خططك الحالية
   • أقترح إضافات أو تعديلات بناءً على خبرتي
   • أربط بين خططك والطقس الحالي

3️⃣ **الوعي بالطقس**:
   • أراعي حالة الطقس الحالية في نصائحي
   • أقترح الأنشطة المناسبة للطقس الحالي
   • أحذر من الأوقات غير المناسبة للزيارة

4️⃣ **التخصيص والذكاء**:
   • أقدم اقتراحات مخصصة بناءً على:
     - محادثاتنا السابقة
     - خططك المحفوظة
     - موقعك الحالي
     - الطقس الحالي
     - تفضيلاتك الظاهرة

📍 معلومات شاملة عن مصر (أعرفها جيداً):

🗺️ **المحافظات (27 محافظة)**:
• القاهرة، الجيزة، الإسكندرية، الأقصر، أسوان
• البحر الأحمر، جنوب سيناء، شمال سيناء، مرسى مطروح
• الدقهلية، الشرقية، القليوبية، المنوفية، الغربية
• وجميع المحافظات الأخرى بتفاصيلها

🏛️ **المعالم السياحية الرئيسية**:
• الأهرامات الثلاثة وأبو الهول (الجيزة)
• معابد الكرنك والأقصر (الأقصر)
• معبد أبو سمبل (أسوان)
• المتحف المصري الكبير (الجيزة)
• دير سانت كاترين (سيناء)
• واحات الصحراء الغربية
• شواطئ البحر الأحمر والمنتجعات

🏨 **أنواع الإقامة**:
• فنادق 5 نجوم فاخرة
• فنادق متوسطة (3-4 نجوم)
• بيوت ضيافة وشقق مفروشة
• منتجعات شاملة كل شيء
• أماكن إقامة اقتصادية

🍽️ **المطبخ المصري**:
• الكشري، الفول، الطعمية
• الكبدة الإسكندراني، السمك
• الفتة، المحشي، الملوخية
• الحلويات: الكنافة، البسبوسة، القطايف

🚗 **وسائل النقل**:
• مترو الأنفاق (القاهرة والإسكندرية)
• أوبر وكريم (متوفر في كل مكان)
• القطارات بين المدن
• الحافلات السياحية
• تأجير السيارات

💰 **الميزانية التقديرية** (للفرد يومياً):
• اقتصادية: 500-1000 جنيه (15-30 دولار)
• متوسطة: 1000-2500 جنيه (30-75 دولار)
• فاخرة: 2500+ جنيه (75+ دولار)

📅 **أفضل أوقات الزيارة**:
• الشتاء (أكتوبر - أبريل): معتدل ومثالي
• الصيف (مايو - سبتمبر): حار جداً خاصة في الصعيد
• الأعياد والمواسم: أسعار أعلى وازدحام أكثر

✨ **أسلوب ردودي**:

✅ **افعل**:
• استخدم اللغة العربية الفصحى البسيطة والواضحة
• كن ودوداً ومتحمساً ومشجعاً
• اشر للمحادثات أو الخطط السابقة عند الصلة
• قدم معلومات دقيقة ومحدثة ومفصلة
• اقترح خيارات متنوعة (3-5 خيارات)
• راعِ ميزانية المستخدم واهتماماته
• استخدم الإيموجي بذكاء وبدون مبالغة
• قدم نصائح عملية وواقعية
• اذكر الأسعار التقريبية عند الحاجة
• قدم بدائل اقتصادية دائماً

❌ **تجنب**:
• المعلومات المضللة أو القديمة أو غير الدقيقة
• الإطالة الزائدة (كن موجزاً ومفيداً)
• التكرار الحرفي (أعد صياغة الأفكار المتشابهة)
• التعقيد اللغوي أو المصطلحات الصعبة
• نسيان السياق أو المحادثات السابقة
• تجاهل الخطط المحفوظة عند السؤال عنها
• التعامل مع كل سؤال كأنه الأول

🎭 **شخصيتي**:
• مرشد سياحي محترف وودود
• خبير بكل تفاصيل السياحة المصرية
• متحمس لمساعدة السياح
• صبور ومستعد للإجابة على أي سؤال
• أتذكر كل شيء نتحدث عنه
• أبني علاقة مستمرة مع كل مستخدم

🌟 **هدفي النهائي**:
مساعدتك في قضاء أفضل رحلة ممكنة في مصر، مع مراعاة:
• ميزانيتك
• وقتك المتاح
• اهتماماتك الخاصة
• راحتك وأمانك
• خططك المستقبلية

الآن، أنا جاهز تماماً لمساعدتك! 🇪🇬✨`;

        return prompt;
    }
    
    // دالة مساعدة للحصول على نصيحة الطقس
    function getWeatherAdvice(weather) {
        const temp = weather.temp;
        const desc = weather.description?.toLowerCase() || '';
        
        if (temp > 35) {
            return 'حار جداً! يُنصح بالأنشطة الداخلية أو السباحة، وتجنب التجول وقت الظهيرة';
        } else if (temp > 30) {
            return 'حار! ارتدِ ملابس خفيفة واحمِ نفسك من الشمس';
        } else if (temp > 25) {
            return 'معتدل ومثالي للسياحة! استمتع بجميع الأنشطة';
        } else if (temp > 20) {
            return 'لطيف! ممتاز للتجول والاستكشاف';
        } else if (temp > 15) {
            return 'بارد نسبياً، أحضر سترة خفيفة';
        } else {
            return 'بارد! ارتدِ ملابس دافئة خاصة في المساء';
        }
        
        if (desc.includes('rain') || desc.includes('مطر')) {
            return 'ممطر! خطط لأنشطة داخلية أو أحضر مظلة';
        }
        
        return 'طقس جيد للسياحة!';
    }
    
    // دالة مساعدة لاستخراج مواضيع المحادثة
    function extractConversationTopics(history) {
        const topics = [];
        const userMessages = history.filter(m => m.role === 'user').slice(-5);
        
        userMessages.forEach(msg => {
            const content = msg.content?.substring(0, 60) || '';
            if (content) {
                topics.push(content + (content.length >= 60 ? '...' : ''));
            }
        });
        
        return topics;
    }
    
    /* ═══════════════════════════════════════════════════════════════════
       ENGINE SELECTION - نظام اختيار المحرك الذكي المتقدم
       ═══════════════════════════════════════════════════════════════════ */
    
    function getNextEngine() {
        const now = Date.now();
        
        // تنظيف المحركات الفاشلة المؤقتة
        for (const [engineKey, failTime] of state.failedEngines.entries()) {
            if (now - failTime > CONFIG.ROTATION.resetFailedAfter) {
                state.failedEngines.delete(engineKey);
                console.log(`✅ إعادة تفعيل المحرك: ${AI_ENGINES[engineKey].nameAr}`);
            }
        }
        
        // الحصول على المحركات المتاحة
        const availableEngines = Object.entries(AI_ENGINES)
            .filter(([key, engine]) => 
                engine.enabled && 
                !state.failedEngines.has(key) &&
                engine.apiKey
            );
        
        if (availableEngines.length === 0) {
            console.error('❌ لا توجد محركات متاحة!');
            state.failedEngines.clear();
            return null;
        }
        
        let selectedEngine;
        
        switch (CONFIG.ROTATION.mode) {
            case 'sequential':
                selectedEngine = selectSequential(availableEngines);
                break;
                
            case 'performance':
                selectedEngine = selectByPerformance(availableEngines);
                break;
                
            case 'cost':
                selectedEngine = selectByCost(availableEngines);
                break;
                
            case 'adaptive':
            default:
                selectedEngine = selectAdaptive(availableEngines);
                break;
        }
        
        return selectedEngine;
    }
    
    function selectSequential(engines) {
        const engine = engines[state.currentEngineIndex % engines.length];
        state.currentEngineIndex++;
        return engine;
    }
    
    function selectByPerformance(engines) {
        return engines.reduce((best, current) => {
            const bestScore = calculatePerformanceScore(best[0]);
            const currentScore = calculatePerformanceScore(current[0]);
            return currentScore > bestScore ? current : best;
        });
    }
    
    function selectByCost(engines) {
        return engines.reduce((best, current) => {
            const bestEngine = AI_ENGINES[best[0]];
            const currentEngine = AI_ENGINES[current[0]];
            return currentEngine.costPerRequest < bestEngine.costPerRequest ? current : best;
        });
    }
    
    function selectAdaptive(engines) {
        const now = Date.now();
        const strategy = CONFIG.COST_OPTIMIZATION.strategy;
        
        return engines.reduce((best, current) => {
            const [bestKey, bestEngine] = best;
            const [currentKey, currentEngine] = current;
            
            const bestStats = state.engineStats[bestKey];
            const currentStats = state.engineStats[currentKey];
            
            let bestScore = 0;
            let currentScore = 0;
            
            // 1. معدل النجاح (35%)
            const bestSuccessRate = bestStats?.requestCount > 0 
                ? bestStats.successCount / bestStats.requestCount 
                : 1;
            const currentSuccessRate = currentStats?.requestCount > 0 
                ? currentStats.successCount / currentStats.requestCount 
                : 1;
            
            bestScore += bestSuccessRate * 35;
            currentScore += currentSuccessRate * 35;
            
            // 2. السرعة (25%)
            const bestSpeed = bestStats?.avgResponseTime || bestEngine.avgResponseTime;
            const currentSpeed = currentStats?.avgResponseTime || currentEngine.avgResponseTime;
            
            bestScore += (10000 / bestSpeed) * 0.25;
            currentScore += (10000 / currentSpeed) * 0.25;
            
            // 3. الجودة (25%)
            bestScore += (bestEngine.qualityScore / 100) * 25;
            currentScore += (currentEngine.qualityScore / 100) * 25;
            
            // 4. التكلفة (10%)
            if (strategy === 'aggressive' || CONFIG.COST_OPTIMIZATION.preferLowerCost) {
                bestScore += (1 / bestEngine.costPerRequest) * 0.01;
                currentScore += (1 / currentEngine.costPerRequest) * 0.01;
            } else {
                bestScore += 10;
                currentScore += 10;
            }
            
            // 5. التوزيع العادل (5%)
            const bestLastUsed = bestStats?.lastUsed || 0;
            const currentLastUsed = currentStats?.lastUsed || 0;
            const bestTimeSince = (now - bestLastUsed) / 60000;
            const currentTimeSince = (now - currentLastUsed) / 60000;
            
            bestScore += Math.min(bestTimeSince / 2, 5);
            currentScore += Math.min(currentTimeSince / 2, 5);
            
            return currentScore > bestScore ? current : best;
        });
    }
    
    function calculatePerformanceScore(engineKey) {
        const engine = AI_ENGINES[engineKey];
        const stats = state.engineStats[engineKey];
        
        if (!stats || stats.requestCount === 0) {
            return engine.qualityScore;
        }
        
        const successRate = stats.successCount / stats.requestCount;
        const speedScore = 10000 / (stats.avgResponseTime || engine.avgResponseTime);
        const qualityScore = engine.qualityScore / 100;
        
        return (successRate * 40) + (speedScore * 0.3) + (qualityScore * 30);
    }
    
    /* ═══════════════════════════════════════════════════════════════════
       API CALLS - استدعاءات المحركات المحسنة
       ═══════════════════════════════════════════════════════════════════ */
    
    async function callEngine(engineKey, messages) {
        const engine = AI_ENGINES[engineKey];
        const startTime = Date.now();
        
        try {
            let response;
            
            switch (engineKey) {
                case 'GEMINI':
                    response = await callGemini(messages, engine);
                    break;
                case 'GROQ':
                    response = await callGroq(messages, engine);
                    break;
                case 'COHERE':
                    response = await callCohere(messages, engine);
                    break;
                case 'MISTRAL':
                    response = await callMistral(messages, engine);
                    break;
                default:
                    throw new Error('محرك غير معروف');
            }
            
            const responseTime = Date.now() - startTime;
            
            return {
                success: true,
                response: response,
                responseTime: responseTime,
                cost: engine.costPerRequest
            };
            
        } catch (error) {
            const responseTime = Date.now() - startTime;
            
            return {
                success: false,
                error: error.message,
                responseTime: responseTime,
                cost: 0
            };
        }
    }
    
    async function callGemini(messages, engine) {
        const systemPrompt = buildSystemPrompt();
        
        const contents = [
            {
                role: 'user',
                parts: [{ text: systemPrompt }]
            },
            ...messages.map(msg => ({
                role: msg.role === 'user' ? 'user' : 'model',
                parts: [{ text: msg.content }]
            }))
        ];
        
        const url = `${engine.endpoint}?key=${engine.apiKey}`;
        
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), CONFIG.TIMEOUT);
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: contents,
                    generationConfig: {
                        temperature: 0.8,
                        maxOutputTokens: engine.maxTokens,
                        topP: 0.95,
                        topK: 40
                    },
                    safetySettings: [
                        {
                            category: "HARM_CATEGORY_HARASSMENT",
                            threshold: "BLOCK_NONE"
                        }
                    ]
                }),
                signal: controller.signal
            });
            
            clearTimeout(timeout);
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(`Gemini API Error: ${error.error?.message || response.status}`);
            }
            
            const data = await response.json();
            return data.candidates[0].content.parts[0].text;
            
        } catch (error) {
            clearTimeout(timeout);
            throw error;
        }
    }
    
    async function callGroq(messages, engine) {
        const systemPrompt = buildSystemPrompt();
        
        const formattedMessages = [
            { role: 'system', content: systemPrompt },
            ...messages
        ];
        
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), CONFIG.TIMEOUT);
        
        try {
            const response = await fetch(engine.endpoint, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${engine.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: engine.model,
                    messages: formattedMessages,
                    temperature: 0.8,
                    max_tokens: engine.maxTokens,
                    top_p: 0.95
                }),
                signal: controller.signal
            });
            
            clearTimeout(timeout);
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(`Groq API Error: ${error.error?.message || response.status}`);
            }
            
            const data = await response.json();
            return data.choices[0].message.content;
            
        } catch (error) {
            clearTimeout(timeout);
            throw error;
        }
    }
    
    async function callCohere(messages, engine) {
        const systemPrompt = buildSystemPrompt();
        
        const formattedMessages = [
            { role: 'system', content: systemPrompt },
            ...messages
        ];
        
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), CONFIG.TIMEOUT);
        
        try {
            const response = await fetch(engine.endpoint, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${engine.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: engine.model,
                    messages: formattedMessages
                }),
                signal: controller.signal
            });
            
            clearTimeout(timeout);
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(`Cohere API Error: ${error.message || response.status}`);
            }
            
            const data = await response.json();
            return data.message.content[0].text;
            
        } catch (error) {
            clearTimeout(timeout);
            throw error;
        }
    }
    
    async function callMistral(messages, engine) {
        const systemPrompt = buildSystemPrompt();
        
        const formattedMessages = [
            { role: 'system', content: systemPrompt },
            ...messages
        ];
        
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), CONFIG.TIMEOUT);
        
        try {
            const response = await fetch(engine.endpoint, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${engine.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: engine.model,
                    messages: formattedMessages,
                    temperature: 0.8,
                    max_tokens: engine.maxTokens
                }),
                signal: controller.signal
            });
            
            clearTimeout(timeout);
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(`Mistral API Error: ${error.message || response.status}`);
            }
            
            const data = await response.json();
            return data.choices[0].message.content;
            
        } catch (error) {
            clearTimeout(timeout);
            throw error;
        }
    }
    
    /* ═══════════════════════════════════════════════════════════════════
       QUAD ROTATION ENGINE - المحرك الرئيسي للتبادل الرباعي
       ═══════════════════════════════════════════════════════════════════ */
    
    async function processWithQuadRotation(userMessage) {
        if (state.isProcessing) {
            throw new Error('جاري معالجة طلب آخر...');
        }
        
        state.isProcessing = true;
        const sessionStart = Date.now();
        
        try {
            // إضافة رسالة المستخدم
            const userMsg = {
                role: 'user',
                content: userMessage,
                timestamp: sessionStart
            };
            
            state.conversationHistory.push(userMsg);
            
            // الحصول على سياق المحادثة
            const contextMessages = getContextMessages();
            
            let response = null;
            let usedEngine = null;
            let attempts = 0;
            const attemptDetails = [];
            
            // محاولة الحصول على رد من المحركات
            while (!response && attempts < CONFIG.ROTATION.maxRetries) {
                attempts++;
                
                const selectedEngine = getNextEngine();
                if (!selectedEngine) {
                    throw new Error('لا توجد محركات متاحة حالياً');
                }
                
                const [engineKey, engineConfig] = selectedEngine;
                
                console.log(`🔄 محاولة ${attempts}: ${engineConfig.nameAr} ${engineConfig.emoji}`);
                
                const result = await callEngine(engineKey, contextMessages);
                
                attemptDetails.push({
                    engine: engineKey,
                    engineName: engineConfig.nameAr,
                    success: result.success,
                    responseTime: result.responseTime,
                    error: result.error
                });
                
                if (result.success) {
                    response = result.response;
                    usedEngine = { key: engineKey, config: engineConfig };
                    
                    // تحديث الإحصائيات - نجاح
                    updateEngineStats(engineKey, true, result.responseTime, result.cost);
                    
                    console.log(`✅ نجح ${engineConfig.nameAr} في ${result.responseTime}ms`);
                    
                } else {
                    // تحديث الإحصائيات - فشل
                    updateEngineStats(engineKey, false, result.responseTime, 0);
                    
                    // إضافة للمحركات الفاشلة مؤقتاً
                    if (CONFIG.ROTATION.skipFailedTemporarily) {
                        state.failedEngines.set(engineKey, Date.now());
                    }
                    
                    console.warn(`❌ فشل ${engineConfig.nameAr}: ${result.error}`);
                    
                    // انتظار قبل المحاولة التالية
                    if (attempts < CONFIG.ROTATION.maxRetries) {
                        await new Promise(resolve => 
                            setTimeout(resolve, CONFIG.ROTATION.retryDelay)
                        );
                    }
                }
            }
            
            if (!response) {
                throw new Error('فشلت جميع المحركات في الاستجابة');
            }
            
            // إضافة رد المحرك
            const assistantMsg = {
                role: 'assistant',
                content: response,
                engine: usedEngine.key,
                engineName: usedEngine.config.nameAr,
                timestamp: Date.now()
            };
            
            state.conversationHistory.push(assistantMsg);
            
            // حفظ المحادثة
            saveConversationToStorage();
            
            // تحديث إحصائيات الجلسة
            const totalTime = Date.now() - sessionStart;
            state.sessionStats.requestCount++;
            state.sessionStats.successCount++;
            state.sessionStats.totalResponseTime += totalTime;
            
            // حفظ بيانات المقارنة
            if (CONFIG.COMPARISON.enabled) {
                saveComparisonData(usedEngine, totalTime, attempts, attemptDetails);
            }
            
            // التحقق من الميزانية
            checkBudgetAlert();
            
            state.lastUsedEngine = usedEngine.key;
            
            return {
                success: true,
                response: response,
                engine: usedEngine,
                totalTime: totalTime,
                attempts: attempts,
                attemptDetails: attemptDetails
            };
            
        } catch (error) {
            state.sessionStats.requestCount++;
            state.sessionStats.failureCount++;
            
            console.error('❌ خطأ في معالجة الرسالة:', error);
            
            throw error;
            
        } finally {
            state.isProcessing = false;
        }
    }
    
    function getContextMessages() {
        const maxContext = CONFIG.CONVERSATION.contextWindow;
        const history = state.conversationHistory;
        
        // إذا كانت المحادثة قصيرة، أرسل كل شيء
        if (history.length <= maxContext) {
            return history.map(msg => ({
                role: msg.role,
                content: msg.content
            }));
        }
        
        // للمحادثات الطويلة، استخدم استراتيجية ذكية
        // احتفظ بـ: أول رسالتين + آخر (maxContext - 2) رسالة
        // هذا يحافظ على سياق البداية + المحادثة الأخيرة
        
        const firstMessages = history.slice(0, 2); // أول رسالتين (سياق البداية)
        const recentMessages = history.slice(-(maxContext - 2)); // آخر رسائل
        
        // إذا كان هناك فجوة، أضف ملخص
        if (history.length > maxContext + 2) {
            const skippedCount = history.length - maxContext;
            const summaryMessage = {
                role: 'user',
                content: `[تم تخطي ${skippedCount} رسالة من المحادثة للاختصار]`
            };
            
            return [
                ...firstMessages.map(msg => ({ role: msg.role, content: msg.content })),
                summaryMessage,
                ...recentMessages.map(msg => ({ role: msg.role, content: msg.content }))
            ];
        }
        
        // إذا لم يكن هناك فجوة كبيرة
        return history.slice(-maxContext).map(msg => ({
            role: msg.role,
            content: msg.content
        }));
    }
    
    /* ═══════════════════════════════════════════════════════════════════
       STATISTICS & COMPARISON - الإحصائيات والمقارنة
       ═══════════════════════════════════════════════════════════════════ */
    
    function updateEngineStats(engineKey, success, responseTime, cost) {
        if (!state.engineStats[engineKey]) {
            state.engineStats[engineKey] = {
                requestCount: 0,
                successCount: 0,
                failureCount: 0,
                totalResponseTime: 0,
                avgResponseTime: 0,
                totalCost: 0,
                lastUsed: null,
                errorHistory: [],
                responseTimeHistory: []
            };
        }
        
        const stats = state.engineStats[engineKey];
        
        stats.requestCount++;
        stats.lastUsed = Date.now();
        
        if (success) {
            stats.successCount++;
            stats.totalResponseTime += responseTime;
            stats.avgResponseTime = stats.totalResponseTime / stats.successCount;
            stats.totalCost += cost;
            stats.responseTimeHistory.push(responseTime);
            
            // الاحتفاظ بآخر 50 وقت استجابة فقط
            if (stats.responseTimeHistory.length > 50) {
                stats.responseTimeHistory.shift();
            }
            
            state.sessionStats.totalCost += cost;
            
        } else {
            stats.failureCount++;
            stats.errorHistory.push({
                timestamp: Date.now(),
                message: 'Request failed'
            });
            
            // الاحتفاظ بآخر 20 خطأ فقط
            if (stats.errorHistory.length > 20) {
                stats.errorHistory.shift();
            }
        }
        
        // حفظ الإحصائيات
        saveStatsToStorage();
    }
    
    function saveComparisonData(engine, totalTime, attempts, attemptDetails) {
        const comparison = {
            timestamp: Date.now(),
            engineKey: engine.key,
            engineName: engine.config.nameAr,
            totalTime: totalTime,
            attempts: attempts,
            attemptDetails: attemptDetails,
            cost: engine.config.costPerRequest
        };
        
        state.comparisonData.push(comparison);
        
        // الاحتفاظ بآخر 100 مقارنة فقط
        if (state.comparisonData.length > 100) {
            state.comparisonData.shift();
        }
        
        // حفظ بيانات المقارنة
        try {
            localStorage.setItem('ai_comparison_data', JSON.stringify(state.comparisonData));
        } catch (error) {
            console.warn('فشل حفظ بيانات المقارنة');
        }
    }
    
    function getDetailedComparison() {
        const comparison = {};
        
        Object.entries(AI_ENGINES).forEach(([key, engine]) => {
            const stats = state.engineStats[key] || {
                requestCount: 0,
                successCount: 0,
                failureCount: 0,
                avgResponseTime: 0,
                totalCost: 0
            };
            
            const successRate = stats.requestCount > 0
                ? (stats.successCount / stats.requestCount) * 100
                : 0;
            
            const avgTime = stats.avgResponseTime || engine.avgResponseTime;
            
            const score = calculatePerformanceScore(key);
            
            comparison[key] = {
                // معلومات المحرك
                id: engine.id,
                name: engine.name,
                nameAr: engine.nameAr,
                emoji: engine.emoji,
                icon: engine.icon,
                color: engine.color,
                gradient: engine.gradient,
                enabled: engine.enabled,
                
                // النقاط القوية والضعيفة
                strengths: engine.strengths,
                weaknesses: engine.weaknesses,
                bestFor: engine.bestFor,
                
                // الإحصائيات
                stats: {
                    requests: stats.requestCount,
                    success: stats.successCount,
                    failures: stats.failureCount,
                    successRate: successRate.toFixed(1) + '%',
                    avgResponseTime: avgTime.toFixed(0) + 'ms',
                    totalCost: '$' + stats.totalCost.toFixed(4),
                    costPerRequest: '$' + engine.costPerRequest.toFixed(5),
                    lastUsed: stats.lastUsed 
                        ? new Date(stats.lastUsed).toLocaleString('ar-EG')
                        : 'لم يستخدم بعد'
                },
                
                // تقييم الأداء
                performance: {
                    score: score.toFixed(1),
                    rating: getPerformanceRating(score),
                    qualityScore: engine.qualityScore,
                    speedRating: getSpeedRating(avgTime),
                    costRating: getCostRating(engine.costPerRequest)
                },
                
                // البيانات التاريخية
                history: {
                    responseTimes: stats.responseTimeHistory || [],
                    errors: stats.errorHistory || []
                }
            };
        });
        
        return comparison;
    }
    
    function getPerformanceRating(score) {
        if (score >= 90) return 'ممتاز';
        if (score >= 80) return 'جيد جداً';
        if (score >= 70) return 'جيد';
        if (score >= 60) return 'مقبول';
        return 'ضعيف';
    }
    
    function getSpeedRating(avgTime) {
        if (avgTime < 2000) return 'سريع جداً ⚡';
        if (avgTime < 3000) return 'سريع 🚀';
        if (avgTime < 4000) return 'متوسط ⏱️';
        return 'بطيء 🐢';
    }
    
    function getCostRating(cost) {
        if (cost < 0.00015) return 'اقتصادي جداً 💚';
        if (cost < 0.00020) return 'اقتصادي 💛';
        if (cost < 0.00025) return 'متوسط 🟡';
        return 'مكلف 🔴';
    }
    
    function checkBudgetAlert() {
        const { totalCost } = state.sessionStats;
        const { dailyBudget, alertThreshold } = CONFIG.COST_OPTIMIZATION;
        
        if (totalCost >= dailyBudget * alertThreshold) {
            console.warn(`⚠️ تحذير: وصلت إلى ${(totalCost/dailyBudget*100).toFixed(0)}% من الميزانية اليومية`);
            
            if (totalCost >= dailyBudget) {
                console.error('🚫 تجاوزت الميزانية اليومية!');
            }
        }
    }
    
    /* ═══════════════════════════════════════════════════════════════════
       INTEGRATION - التكامل مع مميزات التطبيق
       ═══════════════════════════════════════════════════════════════════ */
    
    async function loadWeatherData() {
        if (!CONFIG.INTEGRATION.weather) return;
        
        try {
            const city = state.userProfile?.city || 'القاهرة';
            
            // محاولة الحصول على بيانات الطقس من التطبيق
            if (window.weatherAPI && typeof window.weatherAPI.getCurrentWeather === 'function') {
                const weather = await window.weatherAPI.getCurrentWeather(city);
                state.currentWeather = {
                    city: city,
                    temp: weather.temp,
                    description: weather.description,
                    humidity: weather.humidity,
                    windSpeed: weather.windSpeed
                };
                
                console.log('🌡️ تم تحميل بيانات الطقس');
            }
        } catch (error) {
            console.warn('تعذر تحميل بيانات الطقس:', error);
        }
    }
    
    async function loadUserPlans() {
        if (!CONFIG.INTEGRATION.savedPlans) return;
        
        try {
            // محاولة الحصول على الخطط المحفوظة من عدة مصادر
            
            // 1. من localStorage مباشرة
            const plansFromStorage = localStorage.getItem('saved_travel_plans');
            if (plansFromStorage) {
                const plans = JSON.parse(plansFromStorage);
                if (Array.isArray(plans) && plans.length > 0) {
                    state.userPlans = plans;
                    console.log(`📅 تم تحميل ${plans.length} خطة سياحية من التخزين المحلي`);
                    return;
                }
            }
            
            // 2. من النظام العالمي إذا كان متوفراً
            if (window.savedPlans && Array.isArray(window.savedPlans)) {
                state.userPlans = window.savedPlans;
                console.log(`📅 تم تحميل ${window.savedPlans.length} خطة من النظام العالمي`);
                return;
            }
            
            // 3. من مدير الخطط إذا كان متوفراً
            if (window.SavedPlansManager && typeof window.SavedPlansManager.getPlans === 'function') {
                const plans = window.SavedPlansManager.getPlans();
                if (Array.isArray(plans) && plans.length > 0) {
                    state.userPlans = plans;
                    console.log(`📅 تم تحميل ${plans.length} خطة من مدير الخطط`);
                    return;
                }
            }
            
            console.log('📅 لا توجد خطط سياحية محفوظة');
            state.userPlans = [];
            
        } catch (error) {
            console.warn('تعذر تحميل الخطط المحفوظة:', error);
            state.userPlans = [];
        }
    }
    
    async function loadUserProfile() {
        if (!CONFIG.INTEGRATION.userProfile) return;
        
        try {
            // 1. من Firebase Auth (الأولوية)
            if (window.firebase && firebase.auth && firebase.auth().currentUser) {
                const user = firebase.auth().currentUser;
                state.userProfile = {
                    displayName: user.displayName || user.email?.split('@')[0] || 'المستخدم',
                    email: user.email,
                    photoURL: user.photoURL,
                    uid: user.uid,
                    city: 'القاهرة' // افتراضي
                };
                console.log('👤 تم تحميل بيانات المستخدم من Firebase');
                return;
            }
            
            // 2. من localStorage
            const profileFromStorage = localStorage.getItem('user_profile');
            if (profileFromStorage) {
                state.userProfile = JSON.parse(profileFromStorage);
                console.log('👤 تم تحميل بيانات المستخدم من التخزين المحلي');
                return;
            }
            
            // 3. من النظام العالمي
            if (window.currentUser) {
                state.userProfile = window.currentUser;
                console.log('👤 تم تحميل بيانات المستخدم من النظام العالمي');
                return;
            }
            
            // 4. إنشاء ملف افتراضي
            state.userProfile = {
                displayName: 'الزائر',
                city: 'القاهرة'
            };
            console.log('👤 تم إنشاء ملف مستخدم افتراضي');
            
        } catch (error) {
            console.warn('تعذر تحميل بيانات المستخدم:', error);
            state.userProfile = { displayName: 'الزائر', city: 'القاهرة' };
        }
    }
    
    /* ═══════════════════════════════════════════════════════════════════
       STORAGE - التخزين المحلي
       ═══════════════════════════════════════════════════════════════════ */
    
    function saveConversationToStorage() {
        if (!CONFIG.CONVERSATION.saveToStorage) return;
        
        try {
            const maxHistory = CONFIG.CONVERSATION.maxHistory;
            const historyToSave = state.conversationHistory.slice(-maxHistory);
            
            localStorage.setItem('ai_conversation_history', JSON.stringify(historyToSave));
        } catch (error) {
            console.warn('فشل حفظ المحادثة:', error);
        }
    }
    
    function loadConversationFromStorage() {
        try {
            const saved = localStorage.getItem('ai_conversation_history');
            if (saved) {
                state.conversationHistory = JSON.parse(saved);
                console.log(`💬 تم تحميل ${state.conversationHistory.length} رسالة سابقة`);
            }
        } catch (error) {
            console.warn('فشل تحميل المحادثة:', error);
        }
    }
    
    function saveStatsToStorage() {
        try {
            localStorage.setItem('ai_engine_stats', JSON.stringify(state.engineStats));
            localStorage.setItem('ai_session_stats', JSON.stringify(state.sessionStats));
        } catch (error) {
            console.warn('فشل حفظ الإحصائيات:', error);
        }
    }
    
    function loadStatsFromStorage() {
        try {
            const engineStats = localStorage.getItem('ai_engine_stats');
            if (engineStats) {
                state.engineStats = JSON.parse(engineStats);
            }
            
            const sessionStats = localStorage.getItem('ai_session_stats');
            if (sessionStats) {
                const saved = JSON.parse(sessionStats);
                // إعادة تعيين بعض القيم لجلسة جديدة
                state.sessionStats = {
                    ...saved,
                    startTime: Date.now()
                };
            }
            
            const comparisonData = localStorage.getItem('ai_comparison_data');
            if (comparisonData) {
                state.comparisonData = JSON.parse(comparisonData);
            }
        } catch (error) {
            console.warn('فشل تحميل الإحصائيات:', error);
        }
    }
    
    function clearAllData() {
        state.conversationHistory = [];
        state.engineStats = {};
        state.comparisonData = [];
        state.failedEngines.clear();
        
        state.sessionStats = {
            startTime: Date.now(),
            requestCount: 0,
            successCount: 0,
            failureCount: 0,
            totalCost: 0,
            totalResponseTime: 0
        };
        
        initEngineStats();
        
        try {
            localStorage.removeItem('ai_conversation_history');
            localStorage.removeItem('ai_engine_stats');
            localStorage.removeItem('ai_session_stats');
            localStorage.removeItem('ai_comparison_data');
        } catch (error) {
            console.warn('فشل حذف البيانات:', error);
        }
        
        console.log('🗑️ تم حذف جميع البيانات');
    }
    
    /* ═══════════════════════════════════════════════════════════════════
       PUBLIC API - الواجهة البرمجية العامة
       ═══════════════════════════════════════════════════════════════════ */
    
    window.QuadAIGuide = {
        // إرسال رسالة
        async sendMessage(message) {
            return await processWithQuadRotation(message);
        },
        
        // الحصول على المقارنة التفصيلية
        getComparison() {
            return getDetailedComparison();
        },
        
        // الحصول على الإحصائيات
        getStats() {
            return {
                engines: getDetailedComparison(),
                session: {
                    ...state.sessionStats,
                    duration: Date.now() - state.sessionStats.startTime,
                    avgResponseTime: state.sessionStats.successCount > 0
                        ? state.sessionStats.totalResponseTime / state.sessionStats.successCount
                        : 0
                },
                conversation: {
                    length: state.conversationHistory.length,
                    userMessages: state.conversationHistory.filter(m => m.role === 'user').length,
                    aiMessages: state.conversationHistory.filter(m => m.role === 'assistant').length
                },
                userData: {
                    profile: state.userProfile,
                    plans: state.userPlans.length,
                    weather: state.currentWeather
                }
            };
        },
        
        // تصدير البيانات
        exportData() {
            const data = {
                timestamp: new Date().toISOString(),
                engines: getDetailedComparison(),
                session: state.sessionStats,
                conversation: state.conversationHistory,
                comparison: state.comparisonData,
                userData: {
                    profile: state.userProfile,
                    plans: state.userPlans,
                    weather: state.currentWeather
                }
            };
            
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `egypt-ai-guide-data-${Date.now()}.json`;
            a.click();
            URL.revokeObjectURL(url);
        },
        
        // إعادة تعيين البيانات
        reset() {
            clearAllData();
        },
        
        // مسح المحادثة فقط
        clearConversation() {
            state.conversationHistory = [];
            saveConversationToStorage();
            
            // إعادة تحميل الصفحة لإظهار رسالة الترحيب
            const chatMessages = document.getElementById('chat-messages');
            if (chatMessages) {
                location.reload();
            }
        },
        
        // تحديث الإعدادات
        updateConfig(newConfig) {
            Object.assign(CONFIG, newConfig);
            console.log('⚙️ تم تحديث الإعدادات');
        },
        
        // تحديث مفاتيح API
        updateAPIKeys(keys) {
            Object.entries(keys).forEach(([engine, key]) => {
                if (AI_ENGINES[engine]) {
                    AI_ENGINES[engine].apiKey = key;
                }
            });
            console.log('🔑 تم تحديث مفاتيح API');
        },
        
        // الحصول على المحرك التالي
        getNextEngine() {
            const engine = getNextEngine();
            return engine ? {
                key: engine[0],
                ...engine[1]
            } : null;
        },
        
        // الحصول على الحالة
        getState() {
            return {
                isProcessing: state.isProcessing,
                lastUsedEngine: state.lastUsedEngine,
                conversationLength: state.conversationHistory.length,
                failedEngines: Array.from(state.failedEngines.keys()),
                userData: {
                    hasProfile: !!state.userProfile,
                    userName: state.userProfile?.displayName,
                    plansCount: state.userPlans.length,
                    hasWeather: !!state.currentWeather
                }
            };
        },
        
        // إعادة تحميل بيانات المستخدم
        async refreshUserData() {
            console.log('🔄 إعادة تحميل بيانات المستخدم...');
            await Promise.all([
                loadWeatherData(),
                loadUserPlans(),
                loadUserProfile()
            ]);
            console.log('✅ تم تحديث البيانات');
            return {
                profile: state.userProfile,
                plans: state.userPlans.length,
                weather: !!state.currentWeather
            };
        },
        
        // الحصول على بيانات المستخدم الحالية
        getUserData() {
            return {
                profile: state.userProfile,
                plans: state.userPlans,
                weather: state.currentWeather,
                conversationTopics: extractConversationTopics(state.conversationHistory)
            };
        },
        
        // تحديث بيانات المستخدم يدوياً
        updateUserData(data) {
            if (data.profile) {
                state.userProfile = { ...state.userProfile, ...data.profile };
                console.log('👤 تم تحديث ملف المستخدم');
            }
            if (data.plans) {
                state.userPlans = data.plans;
                console.log(`📅 تم تحديث الخطط: ${data.plans.length} خطة`);
            }
            if (data.weather) {
                state.currentWeather = data.weather;
                console.log('🌡️ تم تحديث بيانات الطقس');
            }
        }
    };
    
    /* ═══════════════════════════════════════════════════════════════════
       INITIALIZATION - التهيئة
       ═══════════════════════════════════════════════════════════════════ */
    
    function initEngineStats() {
        Object.keys(AI_ENGINES).forEach(key => {
            if (!state.engineStats[key]) {
                state.engineStats[key] = {
                    requestCount: 0,
                    successCount: 0,
                    failureCount: 0,
                    totalResponseTime: 0,
                    avgResponseTime: 0,
                    totalCost: 0,
                    lastUsed: null,
                    errorHistory: [],
                    responseTimeHistory: []
                };
            }
        });
    }
    
    async function initialize() {
        console.log('🚀 تهيئة المرشد الذكي المتكامل...');
        
        // تهيئة الإحصائيات
        initEngineStats();
        
        // تحميل البيانات المحفوظة
        loadStatsFromStorage();
        
        if (CONFIG.CONVERSATION.saveToStorage) {
            loadConversationFromStorage();
        }
        
        // تحميل البيانات المدمجة
        await Promise.all([
            loadWeatherData(),
            loadUserPlans(),
            loadUserProfile()
        ]);
        
        // إضافة مراقبين للتحديثات التلقائية
        setupDataWatchers();
        
        state.initialized = true;
        
        console.log('✅ المرشد الذكي جاهز!');
        console.log('📊 الإحصائيات:', {
            engines: Object.keys(AI_ENGINES).length,
            conversation: state.conversationHistory.length,
            plans: state.userPlans.length,
            weather: !!state.currentWeather,
            user: state.userProfile?.displayName || 'غير محدد'
        });
    }
    
    // إعداد مراقبين للبيانات
    function setupDataWatchers() {
        // مراقبة تغيير الخطط المحفوظة
        const originalSetItem = localStorage.setItem;
        localStorage.setItem = function(key, value) {
            originalSetItem.apply(this, arguments);
            
            if (key === 'saved_travel_plans') {
                try {
                    const plans = JSON.parse(value);
                    if (Array.isArray(plans)) {
                        state.userPlans = plans;
                        console.log(`🔄 تم تحديث الخطط: ${plans.length} خطة`);
                    }
                } catch (e) {}
            }
            
            if (key === 'user_profile') {
                try {
                    const profile = JSON.parse(value);
                    state.userProfile = profile;
                    console.log('🔄 تم تحديث ملف المستخدم');
                } catch (e) {}
            }
        };
        
        // مراقبة تغييرات Firebase Auth
        if (window.firebase && firebase.auth) {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    state.userProfile = {
                        displayName: user.displayName || user.email?.split('@')[0] || 'المستخدم',
                        email: user.email,
                        photoURL: user.photoURL,
                        uid: user.uid,
                        city: state.userProfile?.city || 'القاهرة'
                    };
                    console.log('🔄 تم تحديث بيانات المستخدم من Firebase');
                }
            });
        }
        
        // مراقبة تحديثات الطقس
        const weatherUpdateInterval = setInterval(() => {
            loadWeatherData();
        }, 300000); // كل 5 دقائق
        
        // تنظيف عند إغلاق الصفحة
        window.addEventListener('beforeunload', () => {
            clearInterval(weatherUpdateInterval);
        });
    }
    
    // التهيئة عند تحميل الصفحة
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
    
    // تصدير للاستخدام العام
    window.AI_ENGINES = AI_ENGINES;
    window.AI_CONFIG = CONFIG;
    
    console.log('🎉 تم تحميل نظام المرشد الذكي بنجاح!');
    
})();
