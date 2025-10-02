// Google Analytics Event Tracking
// This file handles custom event tracking for Google Analytics 4

const Analytics = {
    // Check if GA4 is loaded
    isGALoaded() {
        return typeof gtag !== 'undefined';
    },

    // Track button clicks
    trackButtonClick(buttonName, buttonLocation) {
        if (this.isGALoaded()) {
            gtag('event', 'button_click', {
                'button_name': buttonName,
                'button_location': buttonLocation,
                'timestamp': new Date().toISOString()
            });
            console.log(`📊 GA4: Button clicked - ${buttonName} at ${buttonLocation}`);
        }
    },

    // Track project views
    trackProjectView(projectId, projectTitle) {
        if (this.isGALoaded()) {
            gtag('event', 'view_project', {
                'project_id': projectId,
                'project_title': projectTitle,
                'timestamp': new Date().toISOString()
            });
            console.log(`📊 GA4: Project viewed - ${projectTitle}`);
        }
    },

    // Track project filter changes
    trackProjectFilter(category) {
        if (this.isGALoaded()) {
            gtag('event', 'filter_projects', {
                'category': category,
                'timestamp': new Date().toISOString()
            });
            console.log(`📊 GA4: Projects filtered by - ${category}`);
        }
    },

    // Track pagination
    trackPagination(currentPage, totalPages) {
        if (this.isGALoaded()) {
            gtag('event', 'page_navigation', {
                'current_page': currentPage,
                'total_pages': totalPages,
                'timestamp': new Date().toISOString()
            });
            console.log(`📊 GA4: Navigated to page ${currentPage} of ${totalPages}`);
        }
    },

    // Track form submission
    trackFormSubmit(formName, success = true) {
        if (this.isGALoaded()) {
            gtag('event', 'form_submission', {
                'form_name': formName,
                'success': success,
                'timestamp': new Date().toISOString()
            });
            console.log(`📊 GA4: Form ${formName} ${success ? 'submitted successfully' : 'failed'}`);
        }
    },

    // Track CV download
    trackDownload(fileName) {
        if (this.isGALoaded()) {
            gtag('event', 'file_download', {
                'file_name': fileName,
                'file_type': 'CV/Resume',
                'timestamp': new Date().toISOString()
            });
            console.log(`📊 GA4: File downloaded - ${fileName}`);
        }
    },

    // Track social media clicks
    trackSocialClick(platform, location) {
        if (this.isGALoaded()) {
            gtag('event', 'social_click', {
                'platform': platform,
                'location': location,
                'timestamp': new Date().toISOString()
            });
            console.log(`📊 GA4: Social link clicked - ${platform} at ${location}`);
        }
    },

    // Track section views (scroll-based)
    trackSectionView(sectionName) {
        if (this.isGALoaded()) {
            gtag('event', 'section_view', {
                'section_name': sectionName,
                'timestamp': new Date().toISOString()
            });
            console.log(`📊 GA4: Section viewed - ${sectionName}`);
        }
    },

    // Track theme toggle
    trackThemeChange(theme) {
        if (this.isGALoaded()) {
            gtag('event', 'theme_change', {
                'theme': theme,
                'timestamp': new Date().toISOString()
            });
            console.log(`📊 GA4: Theme changed to ${theme}`);
        }
    },

    // Track mobile gestures
    trackMobileGesture(gestureType, action) {
        if (this.isGALoaded()) {
            gtag('event', 'mobile_gesture', {
                'gesture_type': gestureType,
                'action': action,
                'timestamp': new Date().toISOString()
            });
            console.log(`📊 GA4: Mobile gesture - ${gestureType} (${action})`);
        }
    },

    // Track external link clicks
    trackExternalLink(url, linkText) {
        if (this.isGALoaded()) {
            gtag('event', 'external_link', {
                'url': url,
                'link_text': linkText,
                'timestamp': new Date().toISOString()
            });
            console.log(`📊 GA4: External link clicked - ${linkText}`);
        }
    },

    // Track user engagement time
    trackEngagement(duration, sectionName) {
        if (this.isGALoaded()) {
            gtag('event', 'user_engagement', {
                'duration': duration,
                'section': sectionName,
                'timestamp': new Date().toISOString()
            });
            console.log(`📊 GA4: User engagement - ${duration}s in ${sectionName}`);
        }
    }
};

// Auto-track page views on SPA navigation
let lastPath = window.location.pathname;
setInterval(() => {
    if (window.location.pathname !== lastPath) {
        lastPath = window.location.pathname;
        if (Analytics.isGALoaded()) {
            gtag('config', 'G-XXXXXXXXXX', {
                'page_path': lastPath
            });
            console.log(`📊 GA4: Page view tracked - ${lastPath}`);
        }
    }
}, 1000);

// Make Analytics available globally
window.Analytics = Analytics;

console.log('✅ Analytics module loaded');
