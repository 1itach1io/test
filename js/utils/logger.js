/* ==========================================
   DISCOVER EGYPT - LOGGER SYSTEM
   نظام محسّن للتحكم في الرسائل
   ========================================== */

/**
 * نظام Logger ذكي:
 * - في التطوير: يعرض جميع الرسائل
 * - في الإنتاج: يعطل الرسائل
 * 
 * الاستخدام:
 * بدلاً من: console.log('message')
 * استخدم: logger.log('message')
 */

// تحديد البيئة (development أو production)
const isDevelopment = window.location.hostname === 'localhost' || 
                     window.location.hostname === '127.0.0.1' ||
                     window.location.search.includes('debug=true');

// نظام Logger
const logger = {
    // رسائل عادية
    log: function(...args) {
        if (isDevelopment) {
            console.log(...args);
        }
    },
    
    // رسائل تحذيرية
    warn: function(...args) {
        if (isDevelopment) {
            console.warn(...args);
        }
    },
    
    // رسائل أخطاء (تظهر دائماً)
    error: function(...args) {
        console.error(...args);
    },
    
    // معلومات (تظهر دائماً)
    info: function(...args) {
        console.info(...args);
    },
    
    // رسائل نجاح
    success: function(message) {
        if (isDevelopment) {
            console.log('%c✅ ' + message, 'color: #22c55e; font-weight: bold;');
        }
    },
    
    // رسائل ملونة للتطوير
    debug: function(message, color = '#3b82f6') {
        if (isDevelopment) {
            console.log(`%c🔍 ${message}`, `color: ${color}; font-weight: bold;`);
        }
    },
    
    // قياس الأداء
    time: function(label) {
        if (isDevelopment) {
            console.time(label);
        }
    },
    
    timeEnd: function(label) {
        if (isDevelopment) {
            console.timeEnd(label);
        }
    },
    
    // معلومات المجموعة
    group: function(label) {
        if (isDevelopment) {
            console.group(label);
        }
    },
    
    groupEnd: function() {
        if (isDevelopment) {
            console.groupEnd();
        }
    },
    
    // جدول البيانات
    table: function(data) {
        if (isDevelopment) {
            console.table(data);
        }
    }
};

// تصدير Logger للاستخدام العام
window.logger = logger;

// رسالة ترحيبية في التطوير
if (isDevelopment) {
    console.log(
        '%c🎓 Discover Egypt - Development Mode ',
        'background: #d4af37; color: #1a1a1a; font-size: 14px; padding: 8px; border-radius: 4px; font-weight: bold;'
    );
    console.log('%c📚 Logger system active - all messages will be displayed', 'color: #3b82f6;');
    console.log('%c💡 To test production mode, remove ?debug=true from URL', 'color: #f59e0b;');
} else {
    // في الإنتاج، عطّل console.log العادي
    console.log = function() {};
    console.info('%c🚀 Discover Egypt - Production Mode', 'color: #22c55e; font-weight: bold;');
    console.info('Logger: Only errors will be displayed');
}

// معالجة الأخطاء العامة
window.addEventListener('error', (event) => {
    logger.error('Global Error:', event.error);
    
    // عرض رسالة للمستخدم (اختياري)
    if (typeof showNotification === 'function') {
        showNotification('عذراً، حدث خطأ غير متوقع. يرجى تحديث الصفحة.', 'error');
    }
});

// معالجة Promise rejections
window.addEventListener('unhandledrejection', (event) => {
    logger.error('Unhandled Promise Rejection:', event.reason);
});

/**
 * دليل الاستخدام:
 * 
 * // بدلاً من:
 * console.log('Website loaded');
 * 
 * // استخدم:
 * logger.log('Website loaded');
 * logger.success('Website loaded successfully!');
 * logger.debug('User data:', userData);
 * logger.error('Failed to load data');
 * 
 * // قياس الأداء:
 * logger.time('Data Loading');
 * // ... code ...
 * logger.timeEnd('Data Loading');
 */
