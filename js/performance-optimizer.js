/* ═══════════════════════════════════════════════════════════════════
   PERFORMANCE OPTIMIZATION & ERROR HANDLING
   تحسين الأداء ومعالجة الأخطاء
   ═══════════════════════════════════════════════════════════════════
   
   📝 Instructions / التعليمات:
   1. أضف هذا الملف في مجلد js/
   2. أضف <script src="js/performance-optimizer.js"></script> في <head>
   3. يجب أن يكون أول ملف JavaScript يتم تحميله
   
   ═══════════════════════════════════════════════════════════════════ */

(function() {
    'use strict';
    
    /* ========================================
       CONFIGURATION
       الإعدادات
       ======================================== */
    
    const CONFIG = {
        // البيئة
        isDevelopment: window.location.search.includes('debug=true') || 
                      window.location.hostname === 'localhost' ||
                      window.location.hostname === '127.0.0.1',
        
        // حدود الأداء (بالميلي ثانية)
        performanceThresholds: {
            slow: 3000,        // تحذير إذا كان التحميل أكثر من 3 ثوان
            verySlow: 5000,    // خطأ إذا كان أكثر من 5 ثوان
            cssLoad: 1000,     // تحذير لملفات CSS البطيئة
            jsLoad: 2000       // تحذير لملفات JS البطيئة
        },
        
        // معالجة الأخطاء
        errorHandling: {
            showUserNotifications: false,  // عرض رسائل للمستخدم
            logToConsole: true,            // تسجيل في Console
            reportToServer: false          // إرسال للسيرفر (مستقبلاً)
        }
    };
    
    /* ========================================
       CONSOLE LOGGER WRAPPER
       غلاف لوحة التحكم
       ======================================== */
    
    const Logger = {
        _originalConsole: { ...window.console },
        
        log: function(...args) {
            if (CONFIG.isDevelopment) {
                this._originalConsole.log(...args);
            }
        },
        
        debug: function(...args) {
            if (CONFIG.isDevelopment) {
                this._originalConsole.debug(...args);
            }
        },
        
        info: function(...args) {
            if (CONFIG.isDevelopment) {
                this._originalConsole.info(...args);
            }
        },
        
        warn: function(...args) {
            // دائماً عرض التحذيرات
            this._originalConsole.warn(...args);
        },
        
        error: function(...args) {
            // دائماً عرض الأخطاء
            this._originalConsole.error(...args);
        },
        
        group: function(...args) {
            if (CONFIG.isDevelopment) {
                this._originalConsole.group(...args);
            }
        },
        
        groupEnd: function() {
            if (CONFIG.isDevelopment) {
                this._originalConsole.groupEnd();
            }
        }
    };
    
    // استبدال console في Production
    if (!CONFIG.isDevelopment) {
        window.console = Logger;
    }
    
    /* ========================================
       PERFORMANCE MONITORING
       مراقبة الأداء
       ======================================== */
    
    const PerformanceMonitor = {
        metrics: {},
        startTime: performance.now(),
        
        init: function() {
            this.monitorPageLoad();
            this.monitorResourceLoad();
            this.monitorUserTiming();
        },
        
        monitorPageLoad: function() {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.timing;
                    const metrics = {
                        dnsLookup: perfData.domainLookupEnd - perfData.domainLookupStart,
                        tcpConnection: perfData.connectEnd - perfData.connectStart,
                        requestTime: perfData.responseStart - perfData.requestStart,
                        responseTime: perfData.responseEnd - perfData.responseStart,
                        domProcessing: perfData.domComplete - perfData.domLoading,
                        totalLoad: perfData.loadEventEnd - perfData.navigationStart
                    };
                    
                    this.metrics = metrics;
                    this.logPerformance(metrics);
                    this.checkThresholds(metrics.totalLoad);
                }, 0);
            });
        },
        
        monitorResourceLoad: function() {
            if ('PerformanceObserver' in window) {
                const observer = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        this.checkResourcePerformance(entry);
                    }
                });
                
                try {
                    observer.observe({ entryTypes: ['resource'] });
                } catch (e) {
                    Logger.warn('⚠️ PerformanceObserver not fully supported');
                }
            }
        },
        
        monitorUserTiming: function() {
            // يمكن استخدامه لقياس عمليات محددة
            window.markPerformance = (name) => {
                if ('performance' in window && performance.mark) {
                    performance.mark(name);
                }
            };
            
            window.measurePerformance = (name, startMark, endMark) => {
                if ('performance' in window && performance.measure) {
                    try {
                        performance.measure(name, startMark, endMark);
                        const measure = performance.getEntriesByName(name)[0];
                        Logger.log(`⏱️ ${name}: ${Math.round(measure.duration)}ms`);
                        return measure.duration;
                    } catch (e) {
                        Logger.warn('⚠️ Performance measurement failed:', e);
                    }
                }
            };
        },
        
        checkResourcePerformance: function(entry) {
            const loadTime = entry.responseEnd - entry.startTime;
            const threshold = entry.initiatorType === 'css' ? 
                CONFIG.performanceThresholds.cssLoad : 
                CONFIG.performanceThresholds.jsLoad;
            
            if (loadTime > threshold) {
                Logger.warn(
                    `⚠️ Slow ${entry.initiatorType} load:`,
                    entry.name.split('/').pop(),
                    `${Math.round(loadTime)}ms`
                );
            }
        },
        
        logPerformance: function(metrics) {
            Logger.group('📊 Performance Metrics');
            Logger.log('⏱️ DNS Lookup:', metrics.dnsLookup + 'ms');
            Logger.log('⏱️ TCP Connection:', metrics.tcpConnection + 'ms');
            Logger.log('⏱️ Request Time:', metrics.requestTime + 'ms');
            Logger.log('⏱️ Response Time:', metrics.responseTime + 'ms');
            Logger.log('⏱️ DOM Processing:', metrics.domProcessing + 'ms');
            Logger.log('⏱️ Total Load Time:', metrics.totalLoad + 'ms');
            Logger.groupEnd();
        },
        
        checkThresholds: function(totalTime) {
            const { slow, verySlow } = CONFIG.performanceThresholds;
            
            if (totalTime > verySlow) {
                Logger.error('🐌 Very slow page load detected!', totalTime + 'ms');
            } else if (totalTime > slow) {
                Logger.warn('⚠️ Slow page load detected!', totalTime + 'ms');
            } else {
                Logger.log('⚡ Page loaded fast!', totalTime + 'ms');
            }
        }
    };
    
    /* ========================================
       ERROR HANDLING
       معالجة الأخطاء
       ======================================== */
    
    const ErrorHandler = {
        errors: [],
        
        init: function() {
            this.setupGlobalErrorHandler();
            this.setupUnhandledRejectionHandler();
            this.setupResourceErrorHandler();
        },
        
        setupGlobalErrorHandler: function() {
            window.addEventListener('error', (event) => {
                this.handleError({
                    type: 'JavaScript Error',
                    message: event.message,
                    filename: event.filename,
                    line: event.lineno,
                    column: event.colno,
                    error: event.error,
                    timestamp: new Date().toISOString()
                });
            });
        },
        
        setupUnhandledRejectionHandler: function() {
            window.addEventListener('unhandledrejection', (event) => {
                this.handleError({
                    type: 'Unhandled Promise Rejection',
                    message: event.reason?.message || event.reason,
                    error: event.reason,
                    timestamp: new Date().toISOString()
                });
            });
        },
        
        setupResourceErrorHandler: function() {
            window.addEventListener('error', (event) => {
                if (event.target !== window) {
                    this.handleResourceError(event.target);
                }
            }, true);
        },
        
        handleError: function(errorInfo) {
            this.errors.push(errorInfo);
            
            if (CONFIG.errorHandling.logToConsole) {
                Logger.error('🚨 Error Detected:', errorInfo);
            }
            
            if (CONFIG.errorHandling.showUserNotifications) {
                this.showUserNotification(errorInfo);
            }
            
            // يمكن إضافة إرسال للسيرفر هنا
            if (CONFIG.errorHandling.reportToServer) {
                this.reportToServer(errorInfo);
            }
        },
        
        handleResourceError: function(target) {
            const resource = {
                type: target.tagName,
                src: target.src || target.href,
                timestamp: new Date().toISOString()
            };
            
            Logger.error('❌ Resource failed to load:', resource);
            this.errors.push(resource);
        },
        
        showUserNotification: function(errorInfo) {
            // يمكن تخصيص هذا حسب تصميم الموقع
            const message = this.getUserFriendlyMessage(errorInfo.type);
            console.warn('User notification:', message);
            // هنا يمكن إضافة كود لعرض toast notification
        },
        
        getUserFriendlyMessage: function(errorType) {
            const messages = {
                'JavaScript Error': 'حدث خطأ غير متوقع. يرجى تحديث الصفحة.',
                'Unhandled Promise Rejection': 'حدث خطأ في تحميل البيانات.',
                'default': 'حدث خطأ. يرجى المحاولة مرة أخرى.'
            };
            
            return messages[errorType] || messages.default;
        },
        
        reportToServer: function(errorInfo) {
            // يمكن تنفيذ هذا لاحقاً
            Logger.log('📤 Would report to server:', errorInfo);
        }
    };
    
    /* ========================================
       FIREBASE ERROR HANDLER
       معالج أخطاء Firebase
       ======================================== */
    
    window.handleFirebaseError = function(error) {
        Logger.error('🔥 Firebase Error:', error);
        
        const errorMessages = {
            'permission-denied': 'ليس لديك صلاحية للوصول لهذه البيانات',
            'unauthenticated': 'يجب تسجيل الدخول أولاً',
            'not-found': 'البيانات المطلوبة غير موجودة',
            'already-exists': 'هذه البيانات موجودة بالفعل',
            'invalid-argument': 'البيانات المدخلة غير صحيحة',
            'failed-precondition': 'لا يمكن تنفيذ العملية الآن',
            'resource-exhausted': 'تم تجاوز حد الاستخدام',
            'cancelled': 'تم إلغاء العملية',
            'data-loss': 'حدث فقدان في البيانات',
            'unknown': 'حدث خطأ غير معروف'
        };
        
        const message = errorMessages[error.code] || errorMessages.unknown;
        
        Logger.warn('📱 User-friendly message:', message);
        
        return {
            code: error.code,
            message: message,
            originalError: error
        };
    };
    
    /* ========================================
       FOUC PREVENTION
       منع Flash of Unstyled Content
       ======================================== */
    
    const FOUCPrevention = {
        init: function() {
            this.addReadyClass();
            this.monitorStylesheets();
            this.setupFallback();
        },
        
        addReadyClass: function() {
            // إضافة class عند جاهزية DOM
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => {
                    document.documentElement.classList.add('dom-ready');
                    Logger.log('✅ DOM Ready');
                });
            } else {
                document.documentElement.classList.add('dom-ready');
            }
            
            // إضافة class عند اكتمال التحميل
            window.addEventListener('load', () => {
                setTimeout(() => {
                    document.documentElement.classList.add('page-loaded');
                    Logger.log('✅ Page Loaded');
                }, 100);
            });
        },
        
        monitorStylesheets: function() {
            const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
            let loadedCount = 0;
            
            stylesheets.forEach(link => {
                link.addEventListener('load', () => {
                    loadedCount++;
                    Logger.log(`✅ CSS loaded (${loadedCount}/${stylesheets.length}):`, 
                              link.href.split('/').pop());
                    
                    if (loadedCount === stylesheets.length) {
                        document.documentElement.classList.add('styles-loaded');
                        Logger.log('✅ All stylesheets loaded');
                    }
                });
                
                link.addEventListener('error', () => {
                    Logger.error('❌ CSS failed to load:', link.href);
                });
            });
        },
        
        setupFallback: function() {
            // Fallback: إظهار المحتوى بعد 5 ثوان حتى لو لم يكتمل التحميل
            setTimeout(() => {
                if (!document.documentElement.classList.contains('page-loaded')) {
                    document.documentElement.classList.add('page-loaded', 'forced-display');
                    Logger.warn('⚠️ Forced content display after timeout');
                }
            }, 5000);
        }
    };
    
    /* ========================================
       INITIALIZATION
       التهيئة
       ======================================== */
    
    function init() {
        Logger.log('🚀 Performance Optimizer initialized');
        Logger.log('🌐 Environment:', CONFIG.isDevelopment ? 'Development' : 'Production');
        
        // تهيئة الأنظمة
        PerformanceMonitor.init();
        ErrorHandler.init();
        FOUCPrevention.init();
        
        // إضافة دوال عامة
        window.performanceOptimizer = {
            config: CONFIG,
            metrics: PerformanceMonitor.metrics,
            errors: ErrorHandler.errors,
            logger: Logger
        };
        
        Logger.log('✅ Performance Optimizer ready');
    }
    
    // تشغيل عند تحميل DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();

/* ═══════════════════════════════════════════════════════════════════
   USAGE EXAMPLES
   أمثلة الاستخدام
   ═══════════════════════════════════════════════════════════════════ */

/*
// 1. قياس أداء عملية معينة
markPerformance('data-load-start');
// ... كود تحميل البيانات
markPerformance('data-load-end');
measurePerformance('data-load', 'data-load-start', 'data-load-end');

// 2. معالجة أخطاء Firebase
try {
    await firebase.firestore()...
} catch (error) {
    const friendlyError = handleFirebaseError(error);
    console.log(friendlyError.message); // رسالة مفهومة للمستخدم
}

// 3. الوصول للإحصائيات
console.log(window.performanceOptimizer.metrics);
console.log(window.performanceOptimizer.errors);

// 4. التحكم بالـ Logger
window.performanceOptimizer.logger.log('Custom message');
*/

/* ═══════════════════════════════════════════════════════════════════
   DEPLOYMENT NOTES
   ملاحظات النشر
   ═══════════════════════════════════════════════════════════════════ */

/*
📋 التطبيق:
1. احفظ هذا الملف كـ js/performance-optimizer.js
2. أضف في <head> قبل باقي ملفات JS:
   <script src="js/performance-optimizer.js"></script>
3. للتطوير: أضف ?debug=true في URL
4. للإنتاج: أزل ?debug=true

✅ الفوائد:
- مراقبة الأداء تلقائياً
- معالجة الأخطاء بشكل احترافي
- تقليل رسائل Console في Production
- منع FOUC
- تحسين تجربة المستخدم

⚠️ ملاحظات:
- يجب أن يكون أول ملف JS يتم تحميله
- لا يؤثر على الأداء (overhead صغير جداً)
- متوافق مع جميع المتصفحات الحديثة
*/
