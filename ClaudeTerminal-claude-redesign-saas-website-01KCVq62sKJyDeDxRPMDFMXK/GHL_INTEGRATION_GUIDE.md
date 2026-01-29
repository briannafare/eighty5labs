# Go High Level Integration Guide

This guide explains how to integrate your Go High Level forms, calendars, and other custom components into the new website.

## 📋 Table of Contents

1. [Calendar Integration](#calendar-integration)
2. [Form Integration](#form-integration)
3. [Trigger Links](#trigger-links)
4. [Custom Scripts](#custom-scripts)
5. [Styling GHL Components](#styling-ghl-components)

---

## 🗓️ Calendar Integration

### Location in HTML
Find this section in `index.html` (around line 470):

```html
<div class="hl-calendar-embed" id="hl-calendar-embed">
    <!-- Replace this div with your Go High Level calendar embed code -->
    <div class="placeholder-form">
        <p class="placeholder-text">📅 Go High Level Calendar Integration Here</p>
        <p class="placeholder-instruction">Replace this section with your GHL calendar embed code</p>
    </div>
</div>
```

### How to Replace

1. **Get your GHL Calendar embed code** from your Go High Level dashboard
2. **Remove the placeholder div** (the entire `<div class="placeholder-form">...</div>`)
3. **Paste your GHL calendar embed code** inside the `<div class="hl-calendar-embed">` container

**Example:**
```html
<div class="hl-calendar-embed" id="hl-calendar-embed">
    <!-- Your GHL Calendar Code Here -->
    <script src="https://link.msgsndr.com/js/calendar-embed.js"></script>
    <div class="hl-calendar-widget" data-calendar-id="YOUR_CALENDAR_ID"></div>
</div>
```

---

## 📝 Form Integration

### Adding Contact Forms

You can add GHL forms anywhere in the website. Here are recommended locations:

1. **Hero Section** - Replace the "Book a Free Systems Audit" button
2. **Final CTA Section** - Already has a placeholder
3. **Custom Section** - Create a new section for lead capture

### Method 1: Inline Form Embed

```html
<div class="ghl-form-container">
    <!-- Paste your GHL form embed code here -->
    <script src="https://link.msgsndr.com/js/form_embed.js"></script>
    <iframe src="YOUR_FORM_URL" width="100%" height="600px"></iframe>
</div>
```

### Method 2: Popup/Modal Form

To trigger a GHL form as a popup when clicking a button:

```html
<a href="#" class="btn btn-primary ghl-form-trigger" data-form-id="YOUR_FORM_ID">
    Book Your Free Audit
</a>

<!-- Add this script at the bottom of the page -->
<script>
    document.querySelectorAll('.ghl-form-trigger').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            // Trigger GHL popup
            if (window.GHLFormPopup) {
                window.GHLFormPopup.open(this.dataset.formId);
            }
        });
    });
</script>
```

---

## 🔗 Trigger Links

### Calendar Booking Links

All buttons with the class `ghl-calendar-trigger` are ready to be linked to your calendar:

```html
<a href="YOUR_CALENDAR_BOOKING_URL" class="btn btn-primary ghl-calendar-trigger">
    Book Your Free Audit
</a>
```

**Or use a popup trigger:**

```html
<a href="#" class="btn btn-primary" onclick="GHL.openCalendar('YOUR_CALENDAR_ID'); return false;">
    Book Your Free Audit
</a>
```

### Current Trigger Buttons in the Site:

1. Navigation - "Book Free Audit"
2. Hero Section - "Book a Free Systems Audit"
3. Multiple CTAs throughout sections
4. Final CTA - "Book Your Free Audit"

---

## 🎨 Styling GHL Components

### Maintaining Design Consistency

The CSS includes styles for GHL components. To ensure your forms and calendars match the site design:

```css
/* Add to styles.css if needed */

/* GHL Form Styling */
.hl-form-container iframe {
    border: none;
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-lg);
}

/* GHL Calendar Styling */
.hl-calendar-widget {
    background: var(--color-white);
    border-radius: var(--border-radius-lg);
    padding: var(--spacing-lg);
}

/* Override GHL default colors to match brand */
.hl-calendar-widget .primary-color {
    background-color: #2563eb !important;
}

.hl-form-field input,
.hl-form-field textarea {
    border-radius: var(--border-radius-md) !important;
    border: 2px solid var(--color-gray-300) !important;
}

.hl-form-field input:focus,
.hl-form-field textarea:focus {
    border-color: var(--color-primary) !important;
    outline: none !important;
}
```

---

## 📊 Tracking & Analytics

### Built-in Event Tracking

The JavaScript file includes tracking functions ready for integration:

```javascript
// Track calendar views
trackEvent('calendar_viewed', {
    page: window.location.pathname
});

// Track form submissions
trackEvent('form_submitted', {
    form_type: 'contact_form'
});

// Track button clicks
trackEvent('cta_click', {
    button_text: 'Book Your Free Audit',
    button_location: 'hero'
});
```

### Integrating with GHL Analytics

Add this to your GHL forms/calendars:

```html
<script>
    // When form is submitted
    document.addEventListener('ghl-form-submit', function(e) {
        window.handleGHLFormSubmit(e.detail);
    });

    // When calendar is loaded
    document.addEventListener('ghl-calendar-ready', function() {
        window.initGHLCalendar();
    });
</script>
```

---

## 🔧 Custom Scripts

### Adding GHL Scripts to the Site

Add your GHL tracking scripts before the closing `</body>` tag in `index.html`:

```html
    <!-- Go High Level Scripts -->
    <script src="https://link.msgsndr.com/js/YOUR_SCRIPT.js"></script>

    <!-- GHL Tracking Pixel -->
    <script>
        (function(w,d,t,r,u) {
            w[u]=w[u]||[];w[u].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});
        })(window,document,'script','dataLayer','ghlDataLayer');
    </script>

    <!-- Your other scripts -->
    <script src="script.js"></script>
</body>
</html>
```

---

## ✅ Integration Checklist

- [ ] Replace calendar placeholder with actual GHL calendar embed
- [ ] Update all "Book Free Audit" buttons with calendar links
- [ ] Add GHL form embed code (if using inline forms)
- [ ] Configure popup triggers (if using modal forms)
- [ ] Add GHL tracking scripts
- [ ] Test form submissions
- [ ] Test calendar bookings
- [ ] Verify mobile responsiveness
- [ ] Check analytics tracking
- [ ] Test on Go High Level platform

---

## 🆘 Support

If you encounter issues:

1. Check GHL documentation: https://help.gohighlevel.com
2. Verify embed codes are copied correctly
3. Check browser console for JavaScript errors
4. Ensure GHL scripts are loaded before using triggers

---

## 📱 Mobile Optimization

The site is fully responsive. GHL components will automatically adapt, but you may need to adjust:

```css
@media (max-width: 768px) {
    .hl-calendar-embed {
        padding: var(--spacing-md);
    }

    .hl-form-container iframe {
        min-height: 500px;
    }
}
```

---

**Need Help?** Contact your GHL support team or refer to the GHL developer documentation.
