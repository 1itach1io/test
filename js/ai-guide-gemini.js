/* ═══════════════════════════════════════════════════════════════════
   AI GUIDE - GEMINI 2.5 FLASH
   مرشد ذكي محسّن بالكامل - نظام جديد بدون أخطاء
   ═══════════════════════════════════════════════════════════════════ */

(function() {
    'use strict';
    
    console.log('🤖 Loading Gemini 2.5 Flash AI Guide...');
    
    /* ========================================
       CONFIGURATION
       ======================================== */
    
    const CONFIG = {
        // API Settings - Gemini 2.5 Flash
        GEMINI_API_KEY: 'YOUR_API_KEY_HERE', // 👈 ضع مفتاحك هنا
        GEMINI_MODEL: 'gemini-2.5-flash',
        API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
        
        // Request Settings
        TIMEOUT: 20000, // 20 seconds
        TEMPERATURE: 0.7,
        MAX_OUTPUT_TOKENS: 2048,
        TOP_P: 0.95,
        TOP_K: 40,
        
        // History
        MAX_HISTORY: 10,
        SAVE_TO_STORAGE: true,
        
        // UI
        TYPING_SPEED: 30,
        MIN_TYPING_TIME: 800,
        
        // Debug
        DEBUG: window.location.search.includes('debug=true')
    };
    
    /* ========================================
       STATE
       ======================================== */
    
    const state = {
        conversationHistory: [],
        userPlans: [],
        currentUser: null,
        isProcessing: false,
        initialized: false
    };
    
    /* ========================================
       DOM ELEMENTS
       ======================================== */
    
    let elements = {};
    
    function initElements() {
        elements = {
            chatMessages: document.getElementById('chat-messages'),
            userInput: document.getElementById('chat-input'),
            sendButton: document.getElementById('send-btn'),
            quickButtons: document.querySelectorAll('.quick-btn')
        };
        
        const allFound = elements.chatMessages && 
                        elements.userInput && 
                        elements.sendButton;
        
        if (CONFIG.DEBUG) {
            console.log('📋 Elements:', {
                chatMessages: !!elements.chatMessages,
                userInput: !!elements.userInput,
                sendButton: !!elements.sendButton,
                quickButtons: elements.quickButtons?.length || 0
            });
        }
        
        return allFound;
    }
    
    /* ========================================
       SYSTEM PROMPT
       ======================================== */
    
    function buildSystemPrompt() {
        const userName = state.currentUser?.displayName || 
                        state.currentUser?.email?.split('@')[0] || 
                        'الزائر';
        
        let prompt = `أنت مرشد سياحي ذكي متخصص في السياحة المصرية اسمك "مرشد مصر الذكي" 🏛️

معلومات أساسية:
- المستخدم: ${userName}
- تعمل في موقع "Discover Egypt" لاستكشاف مصر
- مصر لديها 27 محافظة وآلاف المعالم السياحية
- التاريخ المصري يمتد لأكثر من 7000 سنة
- أهم المعالم: الأهرامات، معبد الكرنك، أبو سمبل، البحر الأحمر، سيناء

إرشادات الرد:
✅ أجب باللغة التي يستخدمها المستخدم (عربي/إنجليزي/فرنسي)
✅ كن ودوداً ومختصراً (3-5 جمل كحد أقصى)
✅ استخدم الإيموجي بذكاء 🏛️🌴🏖️
✅ اقترح أماكن محددة بأسمائها
✅ أعطِ نصائح عملية ومفيدة
✅ اذكر الأسعار التقريبية إذا سُئلت
✅ رتب المعلومات في نقاط عند الحاجة

❌ لا تكتب ردود طويلة جداً
❌ لا تكرر نفس المعلومات`;

        // إضافة معلومات الخطط المحفوظة
        if (state.userPlans && state.userPlans.length > 0) {
            prompt += `\n\n📋 الخطط المحفوظة للمستخدم:\n`;
            state.userPlans.slice(0, 5).forEach((plan, i) => {
                prompt += `${i + 1}. ${plan.title || 'خطة سياحية'}\n`;
            });
            prompt += `يمكنك الإشارة لهذه الخطط ومساعدته في تحسينها.`;
        }
        
        return prompt;
    }
    
    /* ========================================
       LOAD USER DATA
       ======================================== */
    
    async function loadUserData() {
        try {
            // Check Firebase
            if (window.firebase?.auth && firebase.auth().currentUser) {
                const user = firebase.auth().currentUser;
                state.currentUser = user;
                
                // Load saved plans
                if (firebase.firestore) {
                    const plansSnapshot = await firebase.firestore()
                        .collection('users')
                        .doc(user.uid)
                        .collection('savedPlans')
                        .limit(10)
                        .get();
                    
                    state.userPlans = plansSnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    
                    if (CONFIG.DEBUG) {
                        console.log('✅ Loaded plans:', state.userPlans.length);
                    }
                }
            }
        } catch (error) {
            if (CONFIG.DEBUG) {
                console.warn('⚠️ Could not load user data:', error.message);
            }
        }
    }
    
    /* ========================================
       GEMINI API CALL
       ======================================== */
    
    async function callGeminiAPI(userMessage) {
        try {
            const systemPrompt = buildSystemPrompt();
            
            // Build conversation history
            let conversationText = '';
            if (state.conversationHistory.length > 0) {
                conversationText = state.conversationHistory
                    .slice(-CONFIG.MAX_HISTORY)
                    .map(msg => `${msg.role === 'user' ? 'المستخدم' : 'المرشد'}: ${msg.content}`)
                    .join('\n\n');
                conversationText += '\n\n';
            }
            
            const fullPrompt = `${systemPrompt}

${conversationText}المستخدم: ${userMessage}

المرشد:`;
            
            // API Call using axios-like structure
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), CONFIG.TIMEOUT);
            
            const response = await fetch(
                `${CONFIG.API_URL}?key=${CONFIG.GEMINI_API_KEY}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{ text: fullPrompt }]
                        }],
                        generationConfig: {
                            temperature: CONFIG.TEMPERATURE,
                            maxOutputTokens: CONFIG.MAX_OUTPUT_TOKENS,
                            topP: CONFIG.TOP_P,
                            topK: CONFIG.TOP_K
                        },
                        safetySettings: [
                            {
                                category: "HARM_CATEGORY_HARASSMENT",
                                threshold: "BLOCK_MEDIUM_AND_ABOVE"
                            },
                            {
                                category: "HARM_CATEGORY_HATE_SPEECH",
                                threshold: "BLOCK_MEDIUM_AND_ABOVE"
                            },
                            {
                                category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                                threshold: "BLOCK_MEDIUM_AND_ABOVE"
                            },
                            {
                                category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                                threshold: "BLOCK_MEDIUM_AND_ABOVE"
                            }
                        ]
                    }),
                    signal: controller.signal
                }
            );
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error?.message || `HTTP ${response.status}`);
            }
            
            const data = await response.json();
            const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text;
            
            if (!aiText) {
                throw new Error('No response text from Gemini');
            }
            
            return aiText;
            
        } catch (error) {
            console.error('❌ Gemini API Error:', error);
            
            // Error messages
            if (error.name === 'AbortError') {
                return '⏱️ انتهت مهلة الاتصال. يرجى المحاولة مرة أخرى.';
            }
            
            if (error.message.includes('API_KEY') || error.message.includes('API key not valid')) {
                return '⚠️ مفتاح API غير صحيح. يرجى التحقق من الإعدادات.';
            }
            
            if (error.message.includes('quota') || error.message.includes('QUOTA')) {
                return '⚠️ تم تجاوز حد الاستخدام اليومي. يرجى المحاولة لاحقاً.';
            }
            
            if (error.message.includes('429')) {
                return '⚠️ طلبات كثيرة. يرجى الانتظار قليلاً ثم المحاولة مرة أخرى.';
            }
            
            if (error.message.includes('404')) {
                return '⚠️ النموذج غير متوفر. يرجى التحقق من اسم النموذج في الإعدادات.';
            }
            
            return '❌ عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.';
        }
    }
    
    /* ========================================
       UI FUNCTIONS
       ======================================== */
    
    function addMessage(content, isUser = false) {
        if (!elements.chatMessages) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        avatarDiv.textContent = isUser ? '👤' : '🤖';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        // Format message (basic markdown support)
        let formattedContent = content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>');
        
        contentDiv.innerHTML = formattedContent;
        
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);
        
        elements.chatMessages.appendChild(messageDiv);
        
        // Smooth scroll
        setTimeout(() => {
            elements.chatMessages.scrollTo({
                top: elements.chatMessages.scrollHeight,
                behavior: 'smooth'
            });
        }, 100);
        
        return messageDiv;
    }
    
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.id = 'typing-indicator';
        
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        avatarDiv.textContent = '🤖';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
        
        typingDiv.appendChild(avatarDiv);
        typingDiv.appendChild(contentDiv);
        
        elements.chatMessages.appendChild(typingDiv);
        elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
        
        return typingDiv;
    }
    
    function removeTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }
    
    /* ========================================
       MESSAGE HANDLING
       ======================================== */
    
    async function handleUserMessage(message) {
        if (!message || !message.trim()) return;
        if (state.isProcessing) return;
        
        const userMessage = message.trim();
        
        // Clear input
        if (elements.userInput) {
            elements.userInput.value = '';
        }
        
        // Disable send button
        state.isProcessing = true;
        if (elements.sendButton) {
            elements.sendButton.disabled = true;
        }
        
        // Add user message
        addMessage(userMessage, true);
        
        // Save to history
        state.conversationHistory.push({
            role: 'user',
            content: userMessage,
            timestamp: Date.now()
        });
        
        // Show typing indicator
        const typingIndicator = showTypingIndicator();
        
        try {
            // Call Gemini API
            const aiResponse = await callGeminiAPI(userMessage);
            
            // Remove typing indicator
            removeTypingIndicator();
            
            // Add AI response with animation
            await new Promise(resolve => setTimeout(resolve, 300));
            addMessage(aiResponse, false);
            
            // Save to history
            state.conversationHistory.push({
                role: 'assistant',
                content: aiResponse,
                timestamp: Date.now()
            });
            
            // Save to localStorage
            if (CONFIG.SAVE_TO_STORAGE) {
                try {
                    localStorage.setItem('ai_conversation_history', 
                        JSON.stringify(state.conversationHistory.slice(-CONFIG.MAX_HISTORY * 2))
                    );
                } catch (e) {
                    console.warn('Could not save to localStorage:', e);
                }
            }
            
        } catch (error) {
            console.error('❌ Error:', error);
            removeTypingIndicator();
            addMessage('عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.', false);
            
        } finally {
            state.isProcessing = false;
            if (elements.sendButton) {
                elements.sendButton.disabled = false;
            }
            if (elements.userInput) {
                elements.userInput.focus();
            }
        }
    }
    
    /* ========================================
       EVENT LISTENERS
       ======================================== */
    
    function setupEventListeners() {
        // Send button
        if (elements.sendButton) {
            elements.sendButton.addEventListener('click', () => {
                const message = elements.userInput?.value;
                if (message) {
                    handleUserMessage(message);
                }
            });
        }
        
        // Enter key
        if (elements.userInput) {
            elements.userInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    const message = elements.userInput.value;
                    if (message) {
                        handleUserMessage(message);
                    }
                }
            });
            
            // Input validation
            elements.userInput.addEventListener('input', () => {
                if (elements.sendButton) {
                    const hasText = elements.userInput.value.trim().length > 0;
                    elements.sendButton.disabled = !hasText || state.isProcessing;
                }
            });
        }
        
        // Quick question buttons
        if (elements.quickButtons) {
            const questionMap = {
                'pyramids': 'أخبرني عن الأهرامات 🏛️',
                'weather': 'ما هو أفضل وقت لزيارة مصر؟ 🌤️',
                'food': 'ما هي أشهر الأطعمة المصرية؟ 🍽️',
                'safety': 'هل مصر آمنة للسياح؟ 🛡️'
            };
            
            elements.quickButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const q = btn.dataset.question;
                    const message = questionMap[q] || btn.textContent.trim();
                    
                    if (elements.userInput) {
                        elements.userInput.value = message;
                    }
                    
                    handleUserMessage(message);
                });
            });
        }
    }
    
    /* ========================================
       WELCOME MESSAGE
       ======================================== */
    
    function showWelcomeMessage() {
        const userName = state.currentUser?.displayName || 
                        state.currentUser?.email?.split('@')[0] || 
                        'الزائر';
        
        let welcome = `مرحباً ${userName}! 👋

أنا مرشدك السياحي الذكي المدعوم بـ **Gemini 2.5 Flash**.

اسألني عن:
🏛️ الأماكن السياحية والمعالم الأثرية
📅 تخطيط الرحلات والجولات
🍽️ المطاعم والأطعمة المصرية الشهيرة
💰 الأسعار والميزانيات
🏨 الفنادق والإقامة
🚗 وسائل النقل والمواصلات
💡 نصائح السفر والسلامة`;
        
        if (state.userPlans && state.userPlans.length > 0) {
            welcome += `\n\n📋 لديك **${state.userPlans.length}** خطة محفوظة! يمكنني مساعدتك في تحسينها.`;
        }
        
        addMessage(welcome, false);
    }
    
    /* ========================================
       CLEAR CONVERSATION
       ======================================== */
    
    window.clearAIConversation = function() {
        if (confirm('هل تريد مسح المحادثة؟')) {
            state.conversationHistory = [];
            
            if (CONFIG.SAVE_TO_STORAGE) {
                localStorage.removeItem('ai_conversation_history');
            }
            
            if (elements.chatMessages) {
                elements.chatMessages.innerHTML = '';
            }
            
            showWelcomeMessage();
            
            console.log('✅ Conversation cleared');
        }
    };
    
    /* ========================================
       INITIALIZATION
       ======================================== */
    
    async function init() {
        console.log('🚀 Initializing Gemini 2.5 Flash AI Guide...');
        
        // Wait for DOM
        if (document.readyState === 'loading') {
            await new Promise(resolve => {
                document.addEventListener('DOMContentLoaded', resolve);
            });
        }
        
        // Initialize elements
        const elementsReady = initElements();
        
        if (!elementsReady) {
            console.warn('⚠️ AI Guide elements not ready - will retry when section is shown');
            return false;
        }
        
        // Check API key
        if (CONFIG.GEMINI_API_KEY === 'YOUR_API_KEY_HERE') {
            console.error('❌ Gemini API Key not configured!');
            
            if (elements.chatMessages) {
                elements.chatMessages.innerHTML = `
                    <div class="message bot-message">
                        <div class="message-avatar">⚠️</div>
                        <div class="message-content">
                            <p><strong>مفتاح Gemini API غير مُعرّف!</strong></p>
                            <p>للحصول على مفتاح مجاني:</p>
                            <ol style="margin: 10px 0; padding-right: 20px;">
                                <li>اذهب إلى: <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener">Google AI Studio</a></li>
                                <li>سجّل دخول بحساب Google</li>
                                <li>انقر على "Create API Key"</li>
                                <li>انسخ المفتاح وأضفه في: <code>js/ai-guide-gemini.js</code> (السطر 16)</li>
                            </ol>
                            <p style="margin-top: 15px;">📝 <strong>ملاحظة:</strong> المفتاح مجاني تماماً ويدعم 15 طلب في الدقيقة!</p>
                        </div>
                    </div>
                `;
            }
            
            return false;
        }
        
        // Load user data
        await loadUserData();
        
        // Setup event listeners
        setupEventListeners();
        
        // Load conversation history
        if (CONFIG.SAVE_TO_STORAGE) {
            try {
                const saved = localStorage.getItem('ai_conversation_history');
                if (saved) {
                    state.conversationHistory = JSON.parse(saved);
                    
                    // Restore messages
                    state.conversationHistory.forEach(msg => {
                        addMessage(msg.content, msg.role === 'user');
                    });
                }
            } catch (e) {
                console.warn('Could not load conversation history:', e);
            }
        }
        
        // Show welcome message if no history
        if (state.conversationHistory.length === 0) {
            showWelcomeMessage();
        }
        
        // Listen for auth changes
        if (window.firebase?.auth) {
            firebase.auth().onAuthStateChanged(async (user) => {
                if (user && !state.currentUser) {
                    state.currentUser = user;
                    await loadUserData();
                    console.log('✅ User authenticated:', user.displayName || user.email);
                }
            });
        }
        
        state.initialized = true;
        console.log('✅ Gemini 2.5 Flash AI Guide initialized successfully!');
        
        return true;
    }
    
    /* ========================================
       AUTO-INITIALIZATION
       ======================================== */
    
    // Try to initialize immediately
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        setTimeout(init, 100);
    }
    
    // Re-initialize when AI section becomes active
    const sectionObserver = new MutationObserver(() => {
        const aiSection = document.getElementById('ai-guide');
        if (aiSection?.classList.contains('active') && !state.initialized) {
            console.log('🔄 AI section activated - initializing...');
            init();
        }
    });
    
    if (document.body) {
        sectionObserver.observe(document.body, {
            attributes: true,
            subtree: true,
            attributeFilter: ['class']
        });
    }
    
    // Export for debugging
    if (CONFIG.DEBUG) {
        window.AIGuideDebug = {
            state,
            config: CONFIG,
            elements,
            testMessage: (msg) => handleUserMessage(msg),
            clearHistory: () => window.clearAIConversation(),
            getHistory: () => state.conversationHistory
        };
        console.log('🐛 Debug mode enabled - use window.AIGuideDebug');
    }
    
})();

/* ═══════════════════════════════════════════════════════════════════
   نهاية ملف AI Guide - Gemini 2.5 Flash
   ═══════════════════════════════════════════════════════════════════ */
