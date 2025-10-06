// Google Analytics Enhanced Event Tracking
// Tracks: Click Events, Form Interactions, External Links, Time on Page, Scroll Depth

(function () {
  // Wait for DOM to be ready
  function trackEvent(category, action, label, value) {
    gtag('event', action, {
      'event_category': category,
      'event_label': label,
      'value': value
    });
    console.log(`GA Event: ${category} - ${action} - ${label}`);
  }

  // 1. Track all button and link clicks
  document.addEventListener('click', function (e) {
    // Track button clicks
    const button = e.target.closest('button, a[role="button"], .btn');
    if (button) {
      const buttonText = button.textContent.trim();
      const buttonId = button.id || 'no-id';
      trackEvent('Button Click', 'click', `${buttonText} (${buttonId})`);
    }

    // Track link clicks
    const link = e.target.closest('a:not([role="button"])');
    if (link) {
      const href = link.href;
      const linkText = link.textContent.trim();

      // Track external links only
      if (href && !href.includes(window.location.hostname) && href.startsWith('http')) {
        trackEvent('External Link', 'click', href);
      }
    }
  });

  // 2. Track form interactions
  document.addEventListener('submit', function (e) {
    const form = e.target;
    const formName = form.name || form.id || 'unnamed-form';

    trackEvent('Form', 'submit', formName);

    // Track which fields were filled
    const inputs = form.querySelectorAll('input[type="text"], input[type="email"], textarea, select');
    inputs.forEach(input => {
      if (input.value) {
        const fieldName = input.name || input.id || 'unnamed-field';
        trackEvent('Form Field', 'filled', fieldName);
      }
    });
  });

  // Track form field changes (dropdowns)
  document.addEventListener('change', function (e) {
    if (e.target.tagName === 'SELECT') {
      const selectName = e.target.name || e.target.id || 'unnamed-select';
      const selectedValue = e.target.value;
      trackEvent('Form Interaction', 'dropdown_change', `${selectName}: ${selectedValue}`);
    }
  });

  // 16. Track time on page
  const startTime = Date.now();

  // Send time on page when user leaves
  window.addEventListener('beforeunload', function () {
    const timeOnPage = Math.round((Date.now() - startTime) / 1000); // in seconds
    if (timeOnPage > 0) {
      // Using sendBeacon for reliable tracking on page unload
      if (navigator.sendBeacon) {
        gtag('event', 'timing_complete', {
          'name': 'time_on_page',
          'value': timeOnPage,
          'event_category': 'Page Engagement',
          'event_label': window.location.pathname
        });
      }
    }
  });

  // Also track time intervals (every 30 seconds)
  let intervalCount = 0;
  setInterval(function () {
    intervalCount++;
    const timeSpent = intervalCount * 30;
    trackEvent('Page Engagement', 'time_interval', `${timeSpent} seconds`);
  }, 30000);

  console.log('Google Analytics Simplified Tracking Initialized (Click Events, Forms, External Links, Time on Page)');
})();