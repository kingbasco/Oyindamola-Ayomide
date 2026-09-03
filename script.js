/* =========================================================
   ORE & DANIEL WEDDING - script.js
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  /* ---------------------------------------------------------
     1. PRELOADER + BACKGROUND AUDIO
  --------------------------------------------------------- */
  const preloader = document.getElementById('preloader');
  const bgAudio = document.getElementById('bgAudio');

  const attemptAudioPlayback = () => {
    if (!bgAudio) return;
    bgAudio.loop = true;
    bgAudio.play().catch(() => {
      // Browsers can still block autoplay; we try again on user interaction.
    });
  };

  attemptAudioPlayback();
  document.addEventListener('pointerdown', attemptAudioPlayback, { once: true });
  document.addEventListener('keydown', attemptAudioPlayback, { once: true });

  window.addEventListener('load', () => {
    const logoRevealVideo = document.getElementById('logoRevealVideo');
    const preloaderBg = document.getElementById('preloaderBg');
    
    // Set random background images on preloader for desktop/tablet (non-mobile)
    if (preloaderBg && window.innerWidth >= 768) {
      const journeyImages = [
        '13.jpg',
        '25.jpg',
        '21.jpg',
        '5.jpg',
        '20.jpg',
        '22.jpg',
        '4.jpg',
        '23.jpg',
        '11.jpg',
        '3.jpg',
        '1.jpg',
        '18.jpg',
        '6.jpg',
        '26.jpg'
      ];

      const proposalImages = [
        '30.jpg',
        '31.jpg',
        '32.jpg',
        '33.jpg',
        '34.jpg',
        '35.jpg',
        '36.jpg',
        '37.jpg',
        '38.jpg',
        '39.jpg',
        '40.jpg',
        '41.jpg',
        '42.jpg',
        '43.jpg',
        '44.jpg'
      ];
      
      const leftImg = journeyImages[Math.floor(Math.random() * journeyImages.length)];
      const rightImg = proposalImages[Math.floor(Math.random() * proposalImages.length)];
      
      const leftSide = document.createElement('div');
      leftSide.className = 'preloader-side preloader-left';
      leftSide.style.backgroundImage = `url('pictures/journey/${leftImg}')`;
      
      const rightSide = document.createElement('div');
      rightSide.className = 'preloader-side preloader-right';
      rightSide.style.backgroundImage = `url('pictures/proposal/${rightImg}')`;
      
      preloaderBg.appendChild(leftSide);
      preloaderBg.appendChild(rightSide);
    }
    
    if (logoRevealVideo) {
      // Hide preloader when video ends or after 7000ms (whichever comes first)
      const hidePreloader = () => {
        if (preloader) preloader.classList.add('hidden');
        document.body.style.overflow = '';
        triggerHeroReveal();
        attemptAudioPlayback();
      };
      
      logoRevealVideo.addEventListener('ended', hidePreloader, { once: true });
      setTimeout(hidePreloader, 7000);
    } else {
      // Fallback if video doesn't load
      setTimeout(() => {
        if (preloader) preloader.classList.add('hidden');
        document.body.style.overflow = '';
        triggerHeroReveal();
        attemptAudioPlayback();
      }, 7000);
    }
  });

  document.body.style.overflow = 'hidden';

  /* ---------------------------------------------------------
     2. WEDDING PARTY + MEDIA GROUPS
  --------------------------------------------------------- */
  const PARTY_DATA = {
    bridesmaids: [
      { file: 'Adelekun Roseline.jpeg', name: 'Name Name', role: 'Bridesmaid' },
      { file: 'Adeyeye Peace.jpeg', name: 'Name Name', role: 'Bridesmaid' },
      { file: 'Akinojo Motunrayo Chief Bridesmaid.jpeg', name: 'Name Name', role: 'Chief Bridesmaid' },
      { file: 'Ayodele Eunice.jpeg', name: 'Name Name', role: 'Bridesmaid' },
      { file: 'Familua Oluwadamilola.jpeg', name: 'Name Name', role: 'Bridesmaid' },
      { file: 'Mayowa Adewale.jpeg', name: 'Name Name', role: 'Bridesmaid' },
      { file: 'Tommy Catherine.jpeg', name: 'Name Name', role: 'Bridesmaid' }
    ],
    groomsmen: [
      { file: 'Agboola Sola.jpeg', name: 'Name Name', role: 'Groomsman' },
      { file: 'Ayomide Ogunmola.jpeg', name: 'Name Name', role: 'Groomsman' },
      { file: 'Idowu Oladimeji.jpeg', name: 'Name Name', role: 'Groomsman' },
      { file: 'Kehinde Olatunde.jpeg', name: 'Name Name', role: 'Groomsman' },
      { file: 'Oluwatoba Dada.jpeg', name: 'Name Name', role: 'Groomsman' }
    ]
  };

  const JOURNEY_FILES = [
    '13.jpg',
    '25.jpg',
    '21.jpg',
    '5.jpg',
    '20.jpg',
    '22.jpg',
    '4.JPG',
    '23.jpg',
    '11.jpg',
    '3.jpg',
    '1.jpg',
    '18.jpg',
    '6.jpg',
    '26.jpg'
  ];

  const PROPOSAL_FILES = [
    '30.jpg',
    '31.jpg',
    '32.jpg',
    '33.jpg',
    '34.jpg',
    '35.jpg',
    '36.jpg',
    '37.jpg',
    '38.jpg',
    '39.jpg',
    '40.jpg',
    '41.jpg',
    '42.jpg',
    '43.jpg',
    '44.jpg'
  ];

  const INTRODUCTION_FILES = [
    '51.jpg',
    '52.jpg',
    '53.jpg',
    '54.jpg',
    '55.jpg',
    '56.jpg',
    '57.jpg',
    '58.jpg'
  ];

  const COURT_WEDDING_FILES = [
    'WhatsApp Image 2026-05-28 at 9.15.55 AM.jpeg',
    'WhatsApp Image 2026-05-28 at 9.15.56 AM.jpeg',
    'WhatsApp Image 2026-05-28 at 9.15.59 AM.jpeg',
    'WhatsApp Image 2026-05-28 at 9.15.59 AM (1).jpeg',
    'WhatsApp Image 2026-05-28 at 9.15.59 AM (2).jpeg',
    'WhatsApp Image 2026-05-28 at 9.16.01 AM.jpeg'
  ];

  const encodeAsset = (folder, file) => encodeURI(`pictures/${folder}/${file}`);
  const fileBaseName = (file) => file.replace(/\.[^.]+$/, '');

  const escapeHtml = (value) =>
    String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

  const renderPartyCards = () => {
    const bridesmaidGrid = document.getElementById('bridesmaidGrid');
    const groomsmenGrid = document.getElementById('groomsmenGrid');

    if (bridesmaidGrid) {
      const displayBridesmaids = PARTY_DATA.bridesmaids.slice(0, 4);
      const hasMoreBridesmaids = PARTY_DATA.bridesmaids.length > 4;

      let bridesmaidHtml = displayBridesmaids
        .map((person, index) => {
          const src = encodeAsset('bridesmaid', person.file);
          return `
            <article class="party-card reveal" data-delay="${index * 60}">
              <div class="party-frame">
                <img class="lightboxable" data-lightbox-group="party" src="${src}" alt="${escapeHtml(person.name)}" loading="lazy"/>
              </div>
              <div class="party-card-copy">
                <p class="party-role">${escapeHtml(person.role)}</p>
                <h4>${escapeHtml(person.name)}</h4>
              </div>
            </article>
          `;
        })
        .join('');

      if (hasMoreBridesmaids) {
        bridesmaidHtml += `
          <div class="view-more-wrapper reveal">
            <button class="view-more-btn" data-gallery="bridesmaids" data-folder="bridesmaid" data-party-type="bridesmaids">
              View More Bridesmaids (${PARTY_DATA.bridesmaids.length - 4} more)
            </button>
          </div>
        `;
      }

      bridesmaidGrid.innerHTML = bridesmaidHtml;
    }

    if (groomsmenGrid) {
      const displayGroomsmen = PARTY_DATA.groomsmen.slice(0, 4);
      const hasMoreGroomsmen = PARTY_DATA.groomsmen.length > 4;

      let groomsmenHtml = displayGroomsmen
        .map((person, index) => {
          const src = encodeAsset('groomsmen', person.file);
          return `
            <article class="party-card reveal" data-delay="${index * 60}">
              <div class="party-frame">
                <img class="lightboxable" data-lightbox-group="party" src="${src}" alt="${escapeHtml(person.name)}" loading="lazy"/>
              </div>
              <div class="party-card-copy">
                <p class="party-role">${escapeHtml(person.role)}</p>
                <h4>${escapeHtml(person.name)}</h4>
              </div>
            </article>
          `;
        })
        .join('');

      if (hasMoreGroomsmen) {
        groomsmenHtml += `
          <div class="view-more-wrapper reveal">
            <button class="view-more-btn" data-gallery="groomsmen" data-folder="groomsmen" data-party-type="groomsmen">
              View More Groomsmen (${PARTY_DATA.groomsmen.length - 4} more)
            </button>
          </div>
        `;
      }

      groomsmenGrid.innerHTML = groomsmenHtml;
    }
  };

  const renderMasonryGrid = (container, folder, files, groupName) => {
    if (!container) return;

    const displayFiles = files.slice(0, 4);
    const hasMore = files.length > 4;

    let html = displayFiles
      .map((file, index) => {
        const src = encodeAsset(folder, file);
        const tall = index % 4 === 0 ? ' media-card--tall' : '';
        const delay = index * 70;
        return `
          <article class="media-card${tall} reveal" data-delay="${delay}">
            <img class="lightboxable" data-lightbox-group="${groupName}" src="${src}" alt="${escapeHtml(fileBaseName(file))}" loading="lazy"/>
          </article>
        `;
      })
      .join('');

    if (hasMore) {
      html += `
        <div class="view-more-wrapper reveal">
          <button class="view-more-btn" data-gallery="${groupName}" data-folder="${folder}">
            View More Images (${files.length - 4} more)
          </button>
        </div>
      `;
    }

    container.innerHTML = html;
  };

  const renderJourney = () => {
    const journeyGrid = document.getElementById('journeyGrid');
    renderMasonryGrid(journeyGrid, 'journey', JOURNEY_FILES, 'journey');
  };

  const renderProposal = () => {
    const proposalGrid = document.getElementById('proposalGrid');
    renderMasonryGrid(proposalGrid, 'proposal', PROPOSAL_FILES, 'proposal');
  };

  const renderIntroduction = () => {
    const introductionGrid = document.getElementById('introductionGrid');
    renderMasonryGrid(introductionGrid, 'introduction', INTRODUCTION_FILES, 'introduction');
  };

  const renderCourtWedding = () => {
    const courtWeddingGrid = document.getElementById('courtWeddingGrid');
    renderMasonryGrid(courtWeddingGrid, 'court wedding', COURT_WEDDING_FILES, 'court wedding');
  };

  renderPartyCards();
  renderJourney();
  renderIntroduction();
  renderProposal();
  renderCourtWedding();

  /* ---------------------------------------------------------
     GALLERY MODAL - View More Images
  --------------------------------------------------------- */
  // Create gallery modal if it doesn't exist
  let galleryModal = document.getElementById('galleryModal');
  if (!galleryModal) {
    galleryModal = document.createElement('div');
    galleryModal.id = 'galleryModal';
    galleryModal.className = 'gallery-modal';
    galleryModal.innerHTML = `
      <div class="gallery-modal-backdrop" data-close-gallery></div>
      <div class="gallery-modal-content">
        <button class="gallery-modal-close" data-close-gallery aria-label="Close gallery">&times;</button>
        <div class="gallery-modal-grid" id="galleryModalGrid"></div>
      </div>
    `;
    document.body.appendChild(galleryModal);
  }

  // Map of file arrays for each gallery
  const galleryFileMap = {
    'journey': JOURNEY_FILES,
    'introduction': INTRODUCTION_FILES,
    'proposal': PROPOSAL_FILES,
    'court wedding': COURT_WEDDING_FILES,
    'bridesmaids': PARTY_DATA.bridesmaids.map(p => p.file),
    'groomsmen': PARTY_DATA.groomsmen.map(p => p.file)
  };

  const partyNameMap = {
    'bridesmaids': PARTY_DATA.bridesmaids,
    'groomsmen': PARTY_DATA.groomsmen
  };

  // Handle "View More Images" button clicks
  document.addEventListener('click', (e) => {
    const viewMoreBtn = e.target.closest('.view-more-btn');
    if (!viewMoreBtn) return;

    const gallery = viewMoreBtn.dataset.gallery;
    const folder = viewMoreBtn.dataset.folder;
    const partyType = viewMoreBtn.dataset.partyType;
    const files = galleryFileMap[gallery];

    if (files) {
      const modalGrid = document.getElementById('galleryModalGrid');
      
      if (partyType && partyNameMap[partyType]) {
        // Render party cards with names and roles
        const partyMembers = partyNameMap[partyType];
        modalGrid.innerHTML = partyMembers
          .map((person) => {
            const src = encodeAsset(folder, person.file);
            return `
              <article class="gallery-modal-party-card">
                <div class="gallery-modal-party-frame">
                  <img src="${src}" alt="${escapeHtml(person.name)}" loading="lazy" data-lightbox-group="party"/>
                </div>
                <div class="gallery-modal-party-info">
                  <p class="gallery-modal-party-role">${escapeHtml(person.role)}</p>
                  <p class="gallery-modal-party-name">${escapeHtml(person.name)}</p>
                </div>
              </article>
            `;
          })
          .join('');
      } else {
        // Render regular gallery images
        modalGrid.innerHTML = files
          .map((file) => {
            const src = encodeAsset(folder, file);
            return `
              <article class="gallery-modal-card">
                <img src="${src}" alt="${escapeHtml(fileBaseName(file))}" loading="lazy" data-lightbox-group="${gallery}"/>
              </article>
            `;
          })
          .join('');
      }

      galleryModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });

  // Close gallery modal
  const closeGalleryModal = () => {
    if (galleryModal) {
      galleryModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-close-gallery]')) {
      closeGalleryModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeGalleryModal();
    }
  });

  /* ---------------------------------------------------------
     2. HERO STAGGERED REVEAL
  --------------------------------------------------------- */
  function triggerHeroReveal() {
    const heroItems = document.querySelectorAll('#hero .reveal');
    heroItems.forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 180);
    });
  }

  /* ---------------------------------------------------------
     3. NAVBAR - scroll behaviour + hamburger
  --------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');

  const setMenuState = (isOpen) => {
    if (!hamburger || !navLinks || !navbar) return;
    hamburger.classList.toggle('open', isOpen);
    navLinks.classList.toggle('open', isOpen);
    navbar.classList.toggle('menu-open', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
    if (isOpen) {
      attemptAudioPlayback();
    }
  };

  window.addEventListener(
    'scroll',
    () => {
      if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
      }
    },
    { passive: true }
  );

  if (hamburger && navLinks && navbar) {
    hamburger.addEventListener('click', () => {
      setMenuState(!navLinks.classList.contains('open'));
    });

    navLinks.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => setMenuState(false));
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks && navLinks.classList.contains('open')) {
      setMenuState(false);
    }
  });

  /* ---------------------------------------------------------
     4. SCROLL REVEAL (IntersectionObserver)
  --------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal:not(#hero .reveal)');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const delay = parseInt(entry.target.dataset.delay, 10) || 0;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach((el) => observer.observe(el));

  /* ---------------------------------------------------------
     5. COUNTDOWN TIMER
  --------------------------------------------------------- */
  const weddingDate = new Date('2026-06-26T09:00:00');

  function updateCountdown() {
    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minsEl = document.getElementById('cd-mins');
    const secsEl = document.getElementById('cd-secs');

    if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

    const now = new Date();
    const diff = weddingDate - now;

    if (diff <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minsEl.textContent = '00';
      secsEl.textContent = '00';
      return;
    }

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);

    const pad = (n) => String(n).padStart(2, '0');

    daysEl.textContent = pad(days);
    hoursEl.textContent = pad(hours);
    minsEl.textContent = pad(mins);
    secsEl.textContent = pad(secs);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ---------------------------------------------------------
     6. STORY MODAL
  --------------------------------------------------------- */
  const storyData = {
    'how-we-met': {
      title: 'How We Met',
      date: '2017',
      body: [
        `Our story here.`,
        `Our story here.`
      ]
    },
    'the-courtship': {
      title: 'The Courtship',
      date: '1st March 2024',
      body: [
        `Our story here.`,
        `Our story here.`,
        `Our story here.`,
        `Our story here.`
      ]
    },
    'the-proposal': {
      title: 'The Proposal',
      date: '1st March 2026',
      body: [
        `Our story here.`,
        `Our story here.`,
        `Our story here.`,
        `Our story here.`
      ]
    },
    'forever-after': {
      title: 'Forever After',
      date: '21st November 2026',
      body: [
        `Today, the dynamic that brought us together is stronger than ever. We are still enjoying our deep, daily Bible studies, continuously learning from one another, and purposefully growing in love.`,
        `The girl who once plotted to frustrate him in the ushering unit is now completely obsessed, and the guy who just wanted to "mentor" her found his lifetime partner. As we look toward our big day on 21st November 2026, we couldn't be more excited to spend the rest of our lives building a beautiful, God-centered marriage.`
      ]
    }
  };

  const storyModal = document.getElementById('storyModal');
  const storyModalTitle = document.getElementById('storyModalTitle');
  const storyModalDate = document.getElementById('storyModalDate');
  const storyModalBody = document.getElementById('storyModalBody');
  const storyButtons = document.querySelectorAll('[data-story-target]');
  const storyCloseButtons = document.querySelectorAll('[data-story-close]');

  const renderStory = (id) => {
    const story = storyData[id];
    if (!story || !storyModal || !storyModalTitle || !storyModalDate || !storyModalBody) return;

    storyModalTitle.textContent = story.title;
    storyModalDate.textContent = story.date;
    storyModalBody.innerHTML = story.body.map((paragraph) => `<p>${paragraph}</p>`).join('');
  };

  const openStoryModal = (id) => {
    renderStory(id);
    if (!storyModal) return;
    storyModal.classList.add('open');
    storyModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeStoryModal = () => {
    if (!storyModal) return;
    storyModal.classList.remove('open');
    storyModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  storyButtons.forEach((button) => {
    button.addEventListener('click', () => openStoryModal(button.dataset.storyTarget));
  });

  storyCloseButtons.forEach((button) => {
    button.addEventListener('click', closeStoryModal);
  });

  if (storyModal) {
    storyModal.addEventListener('click', (e) => {
      if (e.target === storyModal || e.target.hasAttribute('data-story-close')) {
        closeStoryModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && storyModal && storyModal.classList.contains('open')) {
      closeStoryModal();
    }
  });

  /* ---------------------------------------------------------
     7. GALLERY LIGHTBOX
  --------------------------------------------------------- */
  const galleryItems = document.querySelectorAll('.lightboxable');
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbClose = document.getElementById('lbClose');
  const lbPrev = document.getElementById('lbPrev');
  const lbNext = document.getElementById('lbNext');
  const lbCounter = document.getElementById('lbCounter');

  if (
    galleryItems.length &&
    lightbox &&
    lbImg &&
    lbClose &&
    lbPrev &&
    lbNext &&
    lbCounter
  ) {
    const images = Array.from(galleryItems);

    let currentIndex = 0;

    function openLightbox(index) {
      currentIndex = index;
      lbImg.src = images[index].src;
      lbImg.alt = images[index].alt || 'Wedding image';
      lbCounter.textContent = `${index + 1} / ${images.length}`;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }

    function navigate(dir) {
      currentIndex = (currentIndex + dir + images.length) % images.length;
      lbImg.style.opacity = '0';
      lbImg.style.transform = 'scale(0.97)';
      setTimeout(() => {
        lbImg.src = images[currentIndex].src;
        lbImg.alt = images[currentIndex].alt || 'Wedding image';
        lbCounter.textContent = `${currentIndex + 1} / ${images.length}`;
        lbImg.style.opacity = '1';
        lbImg.style.transform = 'scale(1)';
      }, 200);
    }

    lbImg.style.transition = 'opacity 0.2s, transform 0.2s';

    galleryItems.forEach((item, i) => {
      item.addEventListener('click', () => openLightbox(i));
    });

    lbClose.addEventListener('click', closeLightbox);
    lbPrev.addEventListener('click', () => navigate(-1));
    lbNext.addEventListener('click', () => navigate(1));

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
    });

    let touchStartX = 0;
    lightbox.addEventListener(
      'touchstart',
      (e) => {
        touchStartX = e.touches[0].clientX;
      },
      { passive: true }
    );

    lightbox.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 50) navigate(dx < 0 ? 1 : -1);
    });

    images.forEach((img, index) => {
      img.addEventListener('click', () => openLightbox(index));
      img.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(index);
        }
      });
      img.tabIndex = 0;
      img.setAttribute('role', 'button');
      img.setAttribute('aria-label', `Open image ${index + 1}`);
    });
  }

  /* ---------------------------------------------------------
     8. VIDEO PLAYER CUSTOM CONTROL
  --------------------------------------------------------- */
  const video = document.getElementById('weddingVideo');
  const playBtn = document.getElementById('videoPlayBtn');

  if (video && playBtn) {
    function togglePlay() {
      if (video.paused) {
        video.play();
        playBtn.classList.add('hidden');
      } else {
        video.pause();
        playBtn.classList.remove('hidden');
      }
    }

    playBtn.addEventListener('click', togglePlay);
    video.addEventListener('click', togglePlay);
    video.addEventListener('ended', () => playBtn.classList.remove('hidden'));
    video.addEventListener('pause', () => playBtn.classList.remove('hidden'));
    video.addEventListener('play', () => playBtn.classList.add('hidden'));

    if (bgAudio) {
      video.addEventListener('play', () => bgAudio.pause());
      video.addEventListener('pause', () => {
        attemptAudioPlayback();
      });
      video.addEventListener('ended', () => {
        attemptAudioPlayback();
      });
    }
  }

  /* ---------------------------------------------------------
     9. RSVP FORM
  --------------------------------------------------------- */
  const rsvpSubmit = document.getElementById('rsvpSubmit');
  const rsvpForm = document.getElementById('rsvpForm');
  const rsvpSuccess = document.getElementById('rsvpSuccess');

  if (rsvpSubmit && rsvpForm && rsvpSuccess) {
    rsvpSubmit.addEventListener('click', async (e) => {
      e.preventDefault();

      const nameEl = document.getElementById('fname');
      const emailEl = document.getElementById('femail');
      const attendEl = document.getElementById('fattend');
      const guestsEl = document.getElementById('fguests');
      const messageEl = document.getElementById('fmessage');

      if (!nameEl || !emailEl || !attendEl) return;

      const name = nameEl.value.trim();
      const email = emailEl.value.trim();
      const attend = attendEl.value;
      const guests = guestsEl ? guestsEl.value : '1';
      const message = messageEl ? messageEl.value.trim() : '';

      if (!name) {
        shake(nameEl);
        return;
      }

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        shake(emailEl);
        return;
      }

      if (!attend) {
        shake(attendEl);
        return;
      }

      rsvpSubmit.textContent = 'Sending...';
      rsvpSubmit.disabled = true;

      try {
        const response = await fetch('/api/rsvp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fname: name,
            femail: email,
            fattend: attend,
            fguests: guests,
            fmessage: message,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          rsvpForm.classList.add('hidden');
          rsvpSuccess.classList.remove('hidden');
        } else {
          shake(rsvpSubmit);
          alert(data.error || 'Failed to submit RSVP. Please try again.');
          rsvpSubmit.textContent = 'Send RSVP';
          rsvpSubmit.disabled = false;
        }
      } catch (error) {
        console.error('RSVP submission error:', error);
        shake(rsvpSubmit);
        alert('Network error. Please check your connection and try again.');
        rsvpSubmit.textContent = 'Send RSVP';
        rsvpSubmit.disabled = false;
      }
    });
  }

  function shake(el) {
    el.style.borderColor = '#c0392b';
    el.animate(
      [
        { transform: 'translateX(0)' },
        { transform: 'translateX(-8px)' },
        { transform: 'translateX(8px)' },
        { transform: 'translateX(-5px)' },
        { transform: 'translateX(0)' }
      ],
      { duration: 400, easing: 'ease-in-out' }
    );
    el.addEventListener(
      'focus',
      () => {
        el.style.borderColor = '';
      },
      { once: true }
    );
  }

  /* ---------------------------------------------------------
     10. SMOOTH ACTIVE NAV LINK HIGHLIGHT
  --------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const navAs = document.querySelectorAll('.nav-links a');

  if (sections.length && navAs.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          navAs.forEach((a) => {
            a.style.color = '';
            if (a.getAttribute('href') === '#' + entry.target.id) {
              a.style.color = 'var(--gold)';
            }
          });
        });
      },
      { threshold: 0.4 }
    );

    sections.forEach((sec) => sectionObserver.observe(sec));
  }

  /* ---------------------------------------------------------
     11. PARALLAX - hero leaves subtle float
  --------------------------------------------------------- */
  const heroLeaves = document.querySelectorAll('.hero-leaves');

  window.addEventListener(
    'scroll',
    () => {
      const y = window.scrollY;
      heroLeaves.forEach((leaf, i) => {
        const dir = i === 0 ? -1 : 1;
        leaf.style.transform = `translateY(${y * 0.12 * dir}px)`;
      });
    },
    { passive: true }
  );
});
