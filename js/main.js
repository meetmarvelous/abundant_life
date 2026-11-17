/**
 * Main Interactive Application Logic
 * RCCG Abundant Life Area, Oyo
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initHeaderScroll();
  initScrollReveal();
  initServiceCountdown();
  initPrayerAndContactForms();
  initBackToTop();
});

/* ==========================================================
   1. Mobile Navigation & Drawer
   ========================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const closeBtn = document.getElementById('mobileMenuClose');
  const menuDrawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('mobileOverlay');

  if (!toggleBtn || !menuDrawer) return;

  function openMenu() {
    menuDrawer.classList.remove('translate-x-full');
    menuDrawer.classList.add('translate-x-0');
    if (overlay) {
      overlay.classList.remove('hidden');
      setTimeout(() => overlay.classList.add('opacity-100'), 10);
    }
    document.body.style.overflow = 'hidden';
    toggleBtn.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    menuDrawer.classList.remove('translate-x-0');
    menuDrawer.classList.add('translate-x-full');
    if (overlay) {
      overlay.classList.remove('opacity-100');
      setTimeout(() => overlay.classList.add('hidden'), 300);
    }
    document.body.style.overflow = '';
    toggleBtn.setAttribute('aria-expanded', 'false');
  }

  toggleBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menuDrawer.classList.contains('translate-x-full')) {
      closeMenu();
    }
  });

  // Close when tapping link inside drawer
  menuDrawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* ==========================================================
   2. Header Scroll Effect
   ========================================================== */
function initHeaderScroll() {
  const header = document.getElementById('mainHeader');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('shadow-sm', 'bg-white/95', 'backdrop-blur-md');
      header.classList.remove('bg-transparent');
    } else {
      header.classList.remove('shadow-sm');
      if (header.dataset.transparent === 'true') {
        header.classList.remove('bg-white/95', 'backdrop-blur-md');
        header.classList.add('bg-transparent');
      }
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================
   3. Intersection Observer for Scroll Reveals
   ========================================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal-on-scroll');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  reveals.forEach(el => observer.observe(el));
}

/* ==========================================================
   4. Dynamic Church Service Countdown
   Calculates time to next upcoming service:
   - Sunday Celebration Service (Sunday 8:00 AM)
   - Tuesday Digging Deep (Tuesday 5:30 PM)
   - Thursday Faith Clinic (Thursday 5:30 PM)
   ========================================================== */
function initServiceCountdown() {
  const daysEl = document.getElementById('countDays');
  const hoursEl = document.getElementById('countHours');
  const minsEl = document.getElementById('countMins');
  const secsEl = document.getElementById('countSecs');
  const serviceNameEl = document.getElementById('upcomingServiceName');
  const serviceTimeEl = document.getElementById('upcomingServiceTime');

  if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

  function getNextService() {
    const now = new Date();
    // Schedule targets: day of week (0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat)
    const services = [
      { day: 0, hour: 8, minute: 0, name: 'Glorious Sunday Celebration', timeStr: 'Sunday @ 8:00 AM' },
      { day: 2, hour: 17, minute: 30, name: 'Digging Deep (Bible Study)', timeStr: 'Tuesday @ 5:30 PM' },
      { day: 4, hour: 17, minute: 30, name: 'Faith Clinic (Miracle & Prayer)', timeStr: 'Thursday @ 5:30 PM' }
    ];

    let upcoming = null;
    let shortestDiff = Infinity;

    for (const s of services) {
      let target = new Date(now);
      let dayDiff = s.day - now.getDay();
      if (dayDiff < 0 || (dayDiff === 0 && (now.getHours() > s.hour || (now.getHours() === s.hour && now.getMinutes() >= s.minute)))) {
        dayDiff += 7;
      }
      target.setDate(now.getDate() + dayDiff);
      target.setHours(s.hour, s.minute, 0, 0);

      const diff = target.getTime() - now.getTime();
      if (diff > 0 && diff < shortestDiff) {
        shortestDiff = diff;
        upcoming = { ...s, date: target };
      }
    }

    return upcoming;
  }

  function update() {
    const next = getNextService();
    if (!next) return;

    if (serviceNameEl) serviceNameEl.textContent = next.name;
    if (serviceTimeEl) serviceTimeEl.textContent = next.timeStr;

    const diff = next.date.getTime() - new Date().getTime();
    if (diff <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minsEl.textContent = '00';
      secsEl.textContent = '00';
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / 1000 / 60) % 60);
    const s = Math.floor((diff / 1000) % 60);

    daysEl.textContent = String(d).padStart(2, '0');
    hoursEl.textContent = String(h).padStart(2, '0');
    minsEl.textContent = String(m).padStart(2, '0');
    secsEl.textContent = String(s).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

/* ==========================================================
   5. Interactive Contact & Prayer Request Forms
   ========================================================== */
function initPrayerAndContactForms() {
  const forms = ['contactForm', 'prayerForm'];

  forms.forEach(formId => {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg> Submitting...
        `;
      }

      // Simulate sending to ministry team
      setTimeout(() => {
        form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
        showToast(formId === 'prayerForm' 
          ? 'Hallelujah! Your prayer request has been received. Our ministerial team will uphold you in prayers.' 
          : 'Thank you! Your message has been received. We will get in touch with you shortly.');
      }, 900);
    });
  });
}

/* ==========================================================
   6. Minimalist Toast Notification
   ========================================================== */
function showToast(message, duration = 4500) {
  let toast = document.getElementById('toastMessage');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastMessage';
    toast.className = 'fixed bottom-6 right-6 z-50 max-w-md bg-slate-900 text-white px-5 py-4 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-700/50';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <div class="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
    </div>
    <div class="text-sm font-medium pr-2">${message}</div>
    <button onclick="this.parentElement.classList.remove('show')" class="text-slate-400 hover:text-white ml-auto">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
    </button>
  `;

  toast.classList.add('show');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}

/* ==========================================================
   7. Back to Top Button
   ========================================================== */
function initBackToTop() {
  const btn = document.getElementById('backToTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.remove('opacity-0', 'pointer-events-none');
      btn.classList.add('opacity-100', 'pointer-events-auto');
    } else {
      btn.classList.add('opacity-0', 'pointer-events-none');
      btn.classList.remove('opacity-100', 'pointer-events-auto');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Copy address utility
window.copyChurchAddress = function() {
  const address = "RCCG Abundant Life Area, Apata Landlord, Along Oke Mogi, Sabo, Oyo, Oyo State, Nigeria";
  navigator.clipboard.writeText(address).then(() => {
    showToast("Address copied to clipboard!");
  }).catch(() => {
    showToast(address);
  });
};
