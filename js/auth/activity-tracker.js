/**
 * Activity Tracking System
 * ========================
 * Enterprise-grade user activity logging for Firestore
 * Scalable, extensible, and privacy-conscious
 */

class ActivityTracker {
  constructor() {
    this.db = window.firebaseDB;
    this.auth = window.firebaseAuth;
    this.sessionId = this.generateSessionId();
    this.deviceInfo = this.getDeviceInfo();
  }
  
  /**
   * Generate unique session ID
   */
  generateSessionId() {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  
  /**
   * Get device and browser information
   */
  getDeviceInfo() {
    const ua = navigator.userAgent;
    return {
      browser: this.getBrowserInfo(),
      os: this.getOSInfo(),
      device: this.getDeviceType(),
      screen: `${window.screen.width}x${window.screen.height}`,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
  }
  
  /**
   * Detect browser
   */
  getBrowserInfo() {
    const ua = navigator.userAgent;
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Chrome')) return 'Chrome';
    if (ua.includes('Safari')) return 'Safari';
    if (ua.includes('Edge')) return 'Edge';
    return 'Unknown';
  }
  
  /**
   * Detect OS
   */
  getOSInfo() {
    const ua = navigator.userAgent;
    if (ua.includes('Windows')) return 'Windows';
    if (ua.includes('Mac')) return 'MacOS';
    if (ua.includes('Linux')) return 'Linux';
    if (ua.includes('Android')) return 'Android';
    if (ua.includes('iOS')) return 'iOS';
    return 'Unknown';
  }
  
  /**
   * Detect device type
   */
  getDeviceType() {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  }
  
  /**
   * Track user activity
   * @param {string} actionType - Type of action (login, logout, etc.)
   * @param {object} payload - Additional data
   * @param {string} category - Category (auth, plan, favorite, etc.)
   */
  async track(actionType, payload = {}, category = 'general') {
    try {
      const user = this.auth.currentUser;
      
      // Base activity object
      const activity = {
        // User info
        userId: user ? user.uid : 'anonymous',
        userEmail: user ? user.email : null,
        
        // Action details
        actionType,
        category,
        payload,
        
        // Session info
        sessionId: this.sessionId,
        
        // Timing
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        localTime: new Date().toISOString(),
        
        // Device context
        device: this.deviceInfo,
        
        // Page context
        page: {
          url: window.location.href,
          path: window.location.pathname,
          referrer: document.referrer
        }
      };
      
      // Store in Firestore
      await this.db.collection('activities').add(activity);
      
      // Also update user's last activity
      if (user) {
        await this.updateUserLastActivity(user.uid, actionType);
      }
      
      console.log(`✅ Activity tracked: ${actionType}`);
      return true;
      
    } catch (error) {
      console.error('❌ Activity tracking error:', error);
      return false;
    }
  }
  
  /**
   * Update user's last activity timestamp
   */
  async updateUserLastActivity(userId, action) {
    try {
      const userRef = this.db.collection('users').doc(userId);
      await userRef.update({
        lastActivity: firebase.firestore.FieldValue.serverTimestamp(),
        lastAction: action
      });
    } catch (error) {
      console.warn('Could not update last activity:', error);
    }
  }
  
  /**
   * Shortcut methods for common actions
   */
  
  // Authentication actions
  async trackLogin(method, userData = {}) {
    return this.track('login', {
      method, // 'email', 'google'
      ...userData
    }, 'auth');
  }
  
  async trackLogout() {
    return this.track('logout', {}, 'auth');
  }
  
  async trackSignup(method, userData = {}) {
    return this.track('signup', {
      method,
      ...userData
    }, 'auth');
  }
  
  async trackPasswordReset(email) {
    return this.track('password_reset', { email }, 'auth');
  }
  
  // Plan actions
  async trackPlanCreated(planData) {
    return this.track('plan_created', planData, 'plan');
  }
  
  async trackPlanViewed(planId) {
    return this.track('plan_viewed', { planId }, 'plan');
  }
  
  async trackPlanEdited(planId, changes) {
    return this.track('plan_edited', { planId, changes }, 'plan');
  }
  
  async trackPlanDeleted(planId) {
    return this.track('plan_deleted', { planId }, 'plan');
  }
  
  // Favorite actions
  async trackFavoriteAdded(itemType, itemId, itemData = {}) {
    return this.track('favorite_added', {
      itemType, // 'place', 'activity', 'restaurant'
      itemId,
      ...itemData
    }, 'favorite');
  }
  
  async trackFavoriteRemoved(itemType, itemId) {
    return this.track('favorite_removed', {
      itemType,
      itemId
    }, 'favorite');
  }
  
  // AI Chat actions
  async trackChatStarted(topic = null) {
    return this.track('chat_started', { topic }, 'chat');
  }
  
  async trackChatMessage(messageData) {
    return this.track('chat_message', messageData, 'chat');
  }
  
  async trackChatEnded(duration, messageCount) {
    return this.track('chat_ended', {
      duration,
      messageCount
    }, 'chat');
  }
  
  // Search actions
  async trackSearch(query, filters = {}) {
    return this.track('search', {
      query,
      filters
    }, 'search');
  }
  
  // Page view tracking
  async trackPageView(pageName, metadata = {}) {
    return this.track('page_view', {
      pageName,
      ...metadata
    }, 'navigation');
  }
  
  // Feature usage tracking
  async trackFeatureUsed(featureName, details = {}) {
    return this.track('feature_used', {
      featureName,
      ...details
    }, 'feature');
  }
  
  // Error tracking
  async trackError(errorType, errorMessage, errorStack = null) {
    return this.track('error', {
      errorType,
      errorMessage,
      errorStack
    }, 'error');
  }
  
  /**
   * Get user's activity history
   * @param {string} userId - User ID
   * @param {number} limit - Max number of records
   */
  async getUserActivities(userId, limit = 50) {
    try {
      const snapshot = await this.db
        .collection('activities')
        .where('userId', '==', userId)
        .orderBy('timestamp', 'desc')
        .limit(limit)
        .get();
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching activities:', error);
      return [];
    }
  }
  
  /**
   * Get activity statistics for a user
   */
  async getUserStats(userId) {
    try {
      const activities = await this.getUserActivities(userId, 1000);
      
      const stats = {
        totalActions: activities.length,
        categories: {},
        actionTypes: {},
        lastLogin: null,
        firstSeen: null,
        deviceTypes: {},
        browsers: {}
      };
      
      activities.forEach(activity => {
        // Count by category
        stats.categories[activity.category] = 
          (stats.categories[activity.category] || 0) + 1;
        
        // Count by action type
        stats.actionTypes[activity.actionType] = 
          (stats.actionTypes[activity.actionType] || 0) + 1;
        
        // Track device types
        if (activity.device?.device) {
          stats.deviceTypes[activity.device.device] = 
            (stats.deviceTypes[activity.device.device] || 0) + 1;
        }
        
        // Track browsers
        if (activity.device?.browser) {
          stats.browsers[activity.device.browser] = 
            (stats.browsers[activity.device.browser] || 0) + 1;
        }
        
        // Track login times
        if (activity.actionType === 'login' && activity.timestamp) {
          const timestamp = activity.timestamp.toDate();
          if (!stats.lastLogin || timestamp > stats.lastLogin) {
            stats.lastLogin = timestamp;
          }
        }
        
        // Track first seen
        if (activity.timestamp) {
          const timestamp = activity.timestamp.toDate();
          if (!stats.firstSeen || timestamp < stats.firstSeen) {
            stats.firstSeen = timestamp;
          }
        }
      });
      
      return stats;
    } catch (error) {
      console.error('Error getting user stats:', error);
      return null;
    }
  }
  
  /**
   * Clean up old activities (optional, for GDPR compliance)
   * @param {number} daysToKeep - Number of days to retain
   */
  async cleanupOldActivities(daysToKeep = 90) {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
      
      const snapshot = await this.db
        .collection('activities')
        .where('timestamp', '<', cutoffDate)
        .get();
      
      const batch = this.db.batch();
      snapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });
      
      await batch.commit();
      console.log(`✅ Deleted ${snapshot.size} old activities`);
      
    } catch (error) {
      console.error('❌ Error cleaning up activities:', error);
    }
  }
}

// Create global instance
window.activityTracker = new ActivityTracker();
