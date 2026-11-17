/**
 * Gallery & Minimalist Slider Component
 * RCCG Abundant Life Area, Oyo
 */

const churchPhotos = [
  {
    id: 1,
    src: 'images/c1_20261117_22073999.jpeg',
    title: 'Glorious Worship & Praise',
    category: 'worship',
    categoryName: 'Worship Experience',
    orientation: 'landscape',
    description: 'Congregation uplifting their hands in heartfelt worship and adoration of the Almighty King.'
  },
  {
    id: 2,
    src: 'images/c1_20261117_22074027.jpeg',
    title: 'Sunday Celebration Service',
    category: 'celebration',
    categoryName: 'Sunday Service',
    orientation: 'landscape',
    description: 'A vibrant gathering of believers rejoicing in the presence of God during our weekly Sunday Celebration.'
  },
  {
    id: 3,
    src: 'images/c1_20261117_22074060.jpeg',
    title: 'Ministration of the Word',
    category: 'fellowship',
    categoryName: 'Ministration',
    orientation: 'landscape',
    description: 'Proclamation of the uncompromised Word of God bringing light, salvation, and divine direction.'
  },
  {
    id: 4,
    src: 'images/c1_20261117_22074087.jpeg',
    title: 'Abundant Fellowship & Community',
    category: 'fellowship',
    categoryName: 'Fellowship',
    orientation: 'landscape',
    description: 'Warm fellowship, welcoming smiles, and brotherly love in the family of God at Sabo, Oyo.'
  },
  {
    id: 5,
    src: 'images/c1_20261117_22074119.jpeg',
    title: 'Intercession & Spiritual Encounter',
    category: 'prayer',
    categoryName: 'Faith Clinic & Prayer',
    orientation: 'landscape',
    description: 'Fervent prayer atmosphere where chains are broken and breakthroughs are birthed.'
  },
  {
    id: 6,
    src: 'images/c1_20261117_22074144.jpeg',
    title: 'Choir & Musical Ministration',
    category: 'worship',
    categoryName: 'Choir Ministration',
    orientation: 'landscape',
    description: 'The sweet melody of worship led by the Abundant Life Choir uplifting the sanctuary.'
  },
  {
    id: 7,
    src: 'images/c1_20261117_22074178.jpeg',
    title: 'Generations of Grace & Family',
    category: 'celebration',
    categoryName: 'Church Family',
    orientation: 'landscape',
    description: 'Fostering godly homes and nurturing every soul into their divine destiny in Christ.'
  },
  {
    id: 8,
    src: 'images/c1_20261117_22074212.jpeg',
    title: 'Thanksgiving & Victory Moments',
    category: 'celebration',
    categoryName: 'Thanksgiving',
    orientation: 'landscape',
    description: 'Rejoicing over testimonies, answered prayers, and the marvelous wonders of God.'
  }
];

let currentSlideIndex = 0;
let currentLightboxIndex = 0;
let autoPlayTimer = null;
let filteredPhotos = [...churchPhotos];

document.addEventListener('DOMContentLoaded', () => {
  initSlider();
  initGalleryGrid();
  initLightbox();
});

/* ==========================================================
   1. Minimalist Carousel / Slider
   ========================================================== */
function initSlider() {
  const track = document.getElementById('sliderTrack');
  const prevBtn = document.getElementById('sliderPrev');
  const nextBtn = document.getElementById('sliderNext');
  const dotsContainer = document.getElementById('sliderDots');
  const counterEl = document.getElementById('sliderCounter');
  const captionTitleEl = document.getElementById('sliderCaptionTitle');
  const captionDescEl = document.getElementById('sliderCaptionDesc');
  const tagEl = document.getElementById('sliderTag');

  if (!track) return;

  // Build slides dynamically
  track.innerHTML = '';
  churchPhotos.forEach((photo, idx) => {
    const slide = document.createElement('div');
    slide.className = 'slider-slide flex-shrink-0 w-full relative h-[260px] xs:h-[320px] sm:h-[460px] md:h-[560px] bg-slate-900 overflow-hidden cursor-pointer';
    slide.setAttribute('data-index', idx);
    slide.innerHTML = `
      <img 
        src="${photo.src}" 
        alt="${photo.title}" 
        loading="${idx === 0 ? 'eager' : 'lazy'}"
        class="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent pointer-events-none"></div>
    `;

    slide.addEventListener('click', () => {
      openLightbox(idx);
    });

    track.appendChild(slide);
  });

  // Build dots
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    churchPhotos.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `slider-dot h-2 rounded-full transition-all duration-300 ${idx === 0 ? 'w-8 bg-amber-500' : 'w-2.5 bg-slate-400/40 hover:bg-slate-300'}`;
      dot.setAttribute('aria-label', `Go to slide ${idx + 1}`);
      dot.addEventListener('click', () => goToSlide(idx));
      dotsContainer.appendChild(dot);
    });
  }

  function updateSlide(animate = true) {
    track.style.transition = animate ? 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)' : 'none';
    track.style.transform = `translateX(-${currentSlideIndex * 100}%)`;

    // Update dots
    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.slider-dot');
      dots.forEach((dot, idx) => {
        if (idx === currentSlideIndex) {
          dot.className = 'slider-dot h-2 rounded-full transition-all duration-300 w-8 bg-amber-500';
        } else {
          dot.className = 'slider-dot h-2 rounded-full transition-all duration-300 w-2.5 bg-slate-400/40 hover:bg-slate-300';
        }
      });
    }

    // Update counter
    if (counterEl) {
      counterEl.textContent = `${String(currentSlideIndex + 1).padStart(2, '0')} / ${String(churchPhotos.length).padStart(2, '0')}`;
    }

    // Update dynamic caption
    const photo = churchPhotos[currentSlideIndex];
    if (captionTitleEl) captionTitleEl.textContent = photo.title;
    if (captionDescEl) captionDescEl.textContent = photo.description;
    if (tagEl) tagEl.textContent = photo.categoryName;
  }

  function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % churchPhotos.length;
    updateSlide();
  }

  function prevSlide() {
    currentSlideIndex = (currentSlideIndex - 1 + churchPhotos.length) % churchPhotos.length;
    updateSlide();
  }

  function goToSlide(index) {
    currentSlideIndex = index;
    updateSlide();
    resetAutoPlay();
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoPlay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoPlay();
    });
  }

  // Touch Swipe Support
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) nextSlide();
      else prevSlide();
      resetAutoPlay();
    }
  }

  // Autoplay
  function startAutoPlay() {
    autoPlayTimer = setInterval(nextSlide, 5000);
  }

  function stopAutoPlay() {
    if (autoPlayTimer) clearInterval(autoPlayTimer);
  }

  function resetAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
  }

  const container = document.querySelector('.slider-container');
  if (container) {
    container.addEventListener('mouseenter', stopAutoPlay);
    container.addEventListener('mouseleave', startAutoPlay);
  }

  updateSlide(false);
  startAutoPlay();
}

/* ==========================================================
   2. Interactive Gallery Grid & Filter Tabs
   ========================================================== */
function initGalleryGrid() {
  const grid = document.getElementById('galleryGrid');
  const filterButtons = document.querySelectorAll('.gallery-filter-btn');

  if (!grid) return;

  function renderGrid(photos) {
    grid.innerHTML = '';
    photos.forEach((photo, index) => {
      const card = document.createElement('div');
      card.className = 'group relative rounded-2xl overflow-hidden bg-slate-100 shadow-sm border border-slate-200/60 hover-lift cursor-pointer transition-all duration-300';
      
      // Responsive height aspect ratio
      const aspectClass = photo.orientation === 'portrait' ? 'aspect-[3/4]' : 'aspect-[4/3]';

      card.innerHTML = `
        <div class="relative w-full ${aspectClass} overflow-hidden bg-slate-900">
          <img 
            src="${photo.src}" 
            alt="${photo.title}" 
            loading="lazy" 
            class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity"></div>
          
          <!-- Category Tag -->
          <div class="absolute top-4 left-4 z-10">
            <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/90 text-slate-800 backdrop-blur-md shadow-sm">
              ${photo.categoryName}
            </span>
          </div>

          <!-- Bottom Info Overlay -->
          <div class="absolute bottom-0 inset-x-0 p-5 text-white transform transition-transform duration-300">
            <h3 class="text-lg font-bold leading-snug tracking-tight text-white group-hover:text-amber-300 transition-colors">
              ${photo.title}
            </h3>
            <p class="text-xs text-slate-300 line-clamp-2 mt-1.5 opacity-90">
              ${photo.description}
            </p>
          </div>

          <!-- Zoom Icon Action -->
          <div class="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 text-white backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
            </svg>
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        const fullIndex = churchPhotos.findIndex(p => p.id === photo.id);
        openLightbox(fullIndex !== -1 ? fullIndex : index);
      });

      grid.appendChild(card);
    });
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.remove('bg-slate-900', 'text-white', 'shadow-md');
        b.classList.add('bg-white', 'text-slate-700', 'hover:bg-slate-100');
      });
      btn.classList.add('bg-slate-900', 'text-white', 'shadow-md');
      btn.classList.remove('bg-white', 'text-slate-700', 'hover:bg-slate-100');

      const filter = btn.dataset.filter;
      if (filter === 'all') {
        filteredPhotos = [...churchPhotos];
      } else {
        filteredPhotos = churchPhotos.filter(p => p.category === filter);
      }
      renderGrid(filteredPhotos);
    });
  });

  renderGrid(churchPhotos);
}

/* ==========================================================
   3. Fullscreen Lightbox Modal
   ========================================================== */
function initLightbox() {
  const modal = document.getElementById('lightboxModal');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');

  if (!modal) return;

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', prevLightbox);
  if (nextBtn) nextBtn.addEventListener('click', nextLightbox);

  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('lightbox-backdrop')) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextLightbox();
    if (e.key === 'ArrowLeft') prevLightbox();
  });
}

function openLightbox(index) {
  const modal = document.getElementById('lightboxModal');
  if (!modal) return;

  currentLightboxIndex = index;
  updateLightboxContent();

  modal.classList.remove('closed');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const modal = document.getElementById('lightboxModal');
  if (!modal) return;

  modal.classList.remove('open');
  modal.classList.add('closed');
  document.body.style.overflow = '';
}

function nextLightbox() {
  currentLightboxIndex = (currentLightboxIndex + 1) % churchPhotos.length;
  updateLightboxContent();
}

function prevLightbox() {
  currentLightboxIndex = (currentLightboxIndex - 1 + churchPhotos.length) % churchPhotos.length;
  updateLightboxContent();
}

function updateLightboxContent() {
  const imgEl = document.getElementById('lightboxImg');
  const titleEl = document.getElementById('lightboxTitle');
  const descEl = document.getElementById('lightboxDesc');
  const categoryEl = document.getElementById('lightboxCategory');
  const counterEl = document.getElementById('lightboxCounter');

  const photo = churchPhotos[currentLightboxIndex];
  if (!photo) return;

  if (imgEl) {
    imgEl.style.opacity = '0';
    imgEl.src = photo.src;
    imgEl.alt = photo.title;
    imgEl.onload = () => {
      imgEl.style.opacity = '1';
    };
  }

  if (titleEl) titleEl.textContent = photo.title;
  if (descEl) descEl.textContent = photo.description;
  if (categoryEl) categoryEl.textContent = photo.categoryName;
  if (counterEl) {
    counterEl.textContent = `${currentLightboxIndex + 1} of ${churchPhotos.length}`;
  }
}
