# RCCG Abundant Life Area - Official Website

A modern, minimalist, responsive website designed and developed for **The Redeemed Christian Church of God (RCCG), Abundant Life Area Headquarters**, Sabo, Oyo, Oyo State, Nigeria.

---

## 📍 Church Location
**Apata Landlord, Along Oke Mogi, Sabo, Oyo, Oyo State, Nigeria**

---

## 🌟 Key Highlights & Features

1. **Home Page (`index.html`)**:
   - Modern subtle hero section with gradient mesh, scripture motto (*John 10:10*), and immediate call-to-actions.
   - **Interactive Live Service Countdown**: Automatically calculates remaining time until the next upcoming service (Sunday Celebration @ 8:00 AM, Tuesday Digging Deep @ 5:30 PM, or Thursday Faith Clinic @ 5:30 PM).
   - Weekly service showcase cards with specific meeting times.
   - RCCG Worldwide connection banner highlighting Redemption City programmes.
   - Photo preview grid and WhatsApp community join banner.

2. **About Page (`about.html`)**:
   - Church vision, history, and local foundation in Sabo, Oyo.
   - The 4 core RCCG Global Vision and Mission Statements.
   - Departmental and fellowship ministries (Choir, YAYA, Good Women, Men of Faith, Junior Church, Media/Sound).
   - Pastoral welcome message.

3. **Gallery Page (`gallery.html`)**:
   - **Minimalist Touch Slider**: Responsive carousel supporting desktop drag / mobile swipe, autoplay with pause-on-hover, dot indicators, and slide counters.
   - **Adaptive Aspect Ratio Grid**: Accommodates both landscape and portrait photography with clean aspect ratios and tag overlays.
   - **Interactive Category Filters**: All, Worship & Praise, Sunday Celebrations, Fellowship & Community, Prayer & Clinic.
   - **Fullscreen Lightbox**: Keyboard navigation (Arrow keys, Esc), zoom-in modal with titles and captions.
   - Utilizes all 8 church photographs from `website/images/`.

4. **Events Page (`events.html`)**:
   - Filterable schedule: Weekly Gatherings, RCCG National (Redemption City), Special Conferences, and Past Celebrations.
   - Covers Monthly Holy Ghost Service (1st Friday), Annual Convention (August), Holy Ghost Congress (December), and Divine Encounter.
   - Direct link to WhatsApp for study outlines and service notifications.

5. **Contact & Location Page (`contact.html`)**:
   - Direct Church WhatsApp group invitation cards.
   - Social media handles (Facebook, YouTube Livestream, Instagram, Twitter/X).
   - Interactive Contact Form with simulated feedback toast notification.
   - Dedicated **Prayer Request Altar form** for Thursday Faith Clinic intercession.
   - Embedded interactive Google Map and turn-by-turn route directions from Sabo roundabout.
   - First-time visitor FAQ section.

---

## 📁 Directory Structure

```text
website/
├── index.html          # Main Home page
├── about.html          # About Church, Mission & Leadership
├── gallery.html        # Minimalist Slider & Filterable Photo Gallery
├── events.html         # Past & Upcoming Events
├── contact.html        # Contact, WhatsApp, Socials & Directions
├── README.md           # Documentation
├── css/
│   └── style.css       # Custom design system, glassmorphism, animations
├── js/
│   ├── main.js         # Mobile drawer, countdown timer, scroll reveal, forms
│   └── gallery.js      # Slider logic, masonry grid, fullscreen lightbox
└── images/
    ├── logo.jpg / .png # Church Area logo
    └── c1_*.jpeg       # High-resolution gallery photographs
```

---

## 🚀 How to Run & Preview

This website requires **no build step** and **no runtime dependencies**.

- Simply open `website/index.html` in any modern web browser (Google Chrome, Microsoft Edge, Firefox, Safari).
- Or serve using any static web server:
  - VS Code Live Server extension
  - GitHub Pages / Vercel / Netlify (drag and drop the `website` folder)
