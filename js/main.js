/* Keith & Co — shared site JS */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* The CSS `@view-transition{navigation:auto}` cross-fade is aborted by the
   browser if the viewport is resized mid-navigation (most often seen while
   resizing DevTools' device toolbar during a page load) — harmless, the
   navigation still completes, but it logs an unhandled promise rejection.
   Silence only that specific rejection so it doesn't clutter the console. */
window.addEventListener('unhandledrejection', (e) => {
  if (e.reason && e.reason.name === 'InvalidStateError' && /[Tt]ransition/.test(e.reason.message)) {
    e.preventDefault();
  }
});

/* Footer year */
const yr = document.getElementById('yr');
if (yr) yr.textContent = new Date().getFullYear();

/* Sticky header goes from a light translucent bar to a stronger frosted
   blur once real content has scrolled up underneath it. */
const siteHeader = document.querySelector('header.site');
if (siteHeader) {
  const setScrolled = () => siteHeader.classList.toggle('is-scrolled', window.scrollY > 40);
  window.addEventListener('scroll', setScrolled, { passive: true });
  setScrolled();
}

/* Cursor-following glow on the dark navy hero/CTA bands — a soft light
   that trails the pointer, only visible on hover (CSS opacity), so it
   costs nothing on touch devices that never fire pointermove here. */
document.querySelectorAll('.page-hero, .cta-band').forEach((el) => {
  el.addEventListener('pointermove', (e) => {
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  });
});

/* Subtle parallax on the services-page photo breaks (.sd-media/.sd-gallery)
   — each photo drifts slightly slower than the page scroll instead of
   gliding flush with the text around it. Skipped entirely under
   prefers-reduced-motion since, unlike the CSS transitions elsewhere,
   this sets inline transforms directly on scroll with no transition to
   collapse — the site's blanket reduced-motion rule can't reach it, so it
   has to be handled here explicitly. */
const parallaxLayers = [...document.querySelectorAll('.sd-gallery')];
if (parallaxLayers.length && !prefersReducedMotion) {
  let parallaxTicking = false;
  const updateParallax = () => {
    const viewportCenter = window.innerHeight / 2;
    parallaxLayers.forEach((el) => {
      const rect = el.parentElement.getBoundingClientRect();
      const elCenter = rect.top + rect.height / 2;
      el.style.transform = `translateY(${(elCenter - viewportCenter) * -0.06}px)`;
    });
    parallaxTicking = false;
  };
  window.addEventListener('scroll', () => {
    if (!parallaxTicking) {
      requestAnimationFrame(updateParallax);
      parallaxTicking = true;
    }
  }, { passive: true });
  updateParallax();
}

/* Scroll-linked drift on the decorative background diamonds (page-hero,
   the homepage hero, the achievements section) — layered on top of their
   existing time-based idle animation via --sx/--sy custom properties,
   which the diamondDrift / pageHeroDiamond keyframes already fold into
   their own transform through calc(). Kept small (max ~14px) since this
   rides on top of motion that's already there, not replacing it. */
const diamondSections = [...document.querySelectorAll('.page-hero, .hero, .achieve')];
if (diamondSections.length && !prefersReducedMotion) {
  let diamondTicking = false;
  const updateDiamondDrift = () => {
    const viewportCenter = window.innerHeight / 2;
    diamondSections.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const progress = (rect.top + rect.height / 2 - viewportCenter) / viewportCenter;
      el.style.setProperty('--sx', `${(progress * 10).toFixed(2)}px`);
      el.style.setProperty('--sy', `${(progress * -14).toFixed(2)}px`);
    });
    diamondTicking = false;
  };
  window.addEventListener('scroll', () => {
    if (!diamondTicking) {
      requestAnimationFrame(updateDiamondDrift);
      diamondTicking = true;
    }
  }, { passive: true });
  updateDiamondDrift();
}

/* Magnetic buttons — a subtle pull toward the cursor while hovering,
   composed with the existing hover-lift/press CSS via --btn-x/--btn-y
   custom properties rather than overwriting `transform` directly, so it
   never fights with .btn:hover / .btn:active. Kept on the .45s spring
   transition (no enter/leave toggling like the tilt below) since a little
   elastic lag reads as "magnetic," not laggy, at this small a range. */
if (finePointer && !prefersReducedMotion) {
  document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('pointermove', (e) => {
      const rect = btn.getBoundingClientRect();
      const relX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const relY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      btn.style.setProperty('--btn-x', `${relX * 6}px`);
      btn.style.setProperty('--btn-y', `${relY * 6}px`);
    });
    btn.addEventListener('pointerleave', () => {
      btn.style.setProperty('--btn-x', '0px');
      btn.style.setProperty('--btn-y', '0px');
    });
  });
}

/* 3D pointer-tilt on gallery photos and service cards — rotates toward
   the cursor like a physical object, rather than a flat hover. Unlike the
   magnetic buttons, this tracks the cursor 1:1 (transition off) while
   hovering so it feels responsive, then springs back flat on leave
   (transition restored just for that). Desktop/mouse only — .g-item and
   .svc already have a CSS :hover lift for touch/keyboard, this simply
   never attaches there to override it. */
if (finePointer && !prefersReducedMotion) {
  document.querySelectorAll('.g-item, .svc').forEach((card) => {
    const maxTilt = 6;
    card.addEventListener('pointerenter', () => { card.style.transition = 'none'; });
    card.addEventListener('pointermove', (e) => {
      const rect = card.getBoundingClientRect();
      const relX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const relY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      card.style.transform = `perspective(900px) rotateX(${(-relY * maxTilt).toFixed(2)}deg) rotateY(${(relX * maxTilt).toFixed(2)}deg) translateY(-6px) scale(1.015)`;
    });
    card.addEventListener('pointerleave', () => {
      card.style.transition = 'transform .5s var(--ease-spring), box-shadow .45s var(--ease-spring)';
      card.style.transform = '';
    });
  });
}

/* Count-up on the homepage stats strip ("10+", "7", "5+", "100%") — animates
   from 0 once scrolled into view instead of appearing static. */
const statNums = document.querySelectorAll('.stat .num');
if (statNums.length) {
  const statIO = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      statIO.unobserve(el);
      const match = el.textContent.trim().match(/^(\d+)(.*)$/);
      if (!match || prefersReducedMotion) return;
      const target = parseInt(match[1], 10);
      const suffix = match[2];
      const duration = 2200;
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.5 });
  statNums.forEach((el) => statIO.observe(el));
}

/* Pre-select the enquiry form's service dropdown when arriving via
   contact.html?service=<slug> (linked from each service's "Enquire about
   this service" button on services.html) */
const serviceSelect = document.getElementById('sv');
if (serviceSelect) {
  const slug = new URLSearchParams(location.search).get('service');
  if (slug) {
    const match = [...serviceSelect.options].find(o => o.dataset.slug === slug);
    if (match) serviceSelect.value = match.value;
  }
}

/* Hero slider (index.html only) — background texture and headline/copy
   crossfade together, driven off the same index. */
const slides = document.querySelectorAll('.slide');
const heroCopySlides = document.querySelectorAll('.hero-copy-stage .h-slide');
const dots = document.querySelectorAll('.slider-dots button');
if (slides.length) {
  let cur = 0, timer;
  const show = (i) => {
    slides[cur].classList.remove('active');
    heroCopySlides[cur]?.classList.remove('active');
    heroCopySlides[cur]?.setAttribute('aria-hidden', 'true');
    dots[cur]?.classList.remove('active');
    cur = i;
    slides[cur].classList.add('active');
    heroCopySlides[cur]?.classList.add('active');
    heroCopySlides[cur]?.setAttribute('aria-hidden', 'false');
    dots[cur]?.classList.add('active');
  };
  const next = () => show((cur + 1) % slides.length);
  const start = () => { timer = setInterval(next, 6000); };
  dots.forEach((d, i) => d.addEventListener('click', () => {
    clearInterval(timer); show(i); start();
  }));
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) start();
}

/* Testimonial carousel — click/tap or Enter/Space pauses the crossfade so
   a reader can finish a slide before it moves on; same action resumes it.
   Each slide's text is clamped to a consistent height (so short and long
   testimonials read as one design, not a tall box next to a mostly-empty
   one) with a "Read more" toggle that reveals the rest and forces a pause,
   only added where the clamp actually hides something. */
const tStage = document.querySelector('.t-stage');
if (tStage) {
  const tSlides = tStage.querySelectorAll('.t-slide');

  /* The CSS clamp (.t-text{max-height:100px}) is a flat pixel cutoff, so
     it doesn't land on a line boundary — it can slice a line in half, or
     stop just inside the gap above a later paragraph, leaving a faded
     sliver of the next line floating on its own. This walks the rendered
     paragraphs and rounds the clamp down to the nearest complete line
     (never entering a paragraph without room for at least one full line
     of it), so the collapsed box always ends on a clean edge. */
  const snapToLineBoundary = (container, budget) => {
    let used = 0;
    let firstLineHeight = 0;
    for (const child of container.children) {
      const style = getComputedStyle(child);
      const marginTop = parseFloat(style.marginTop) || 0;
      const lineHeight = parseFloat(style.lineHeight) || child.getBoundingClientRect().height;
      const childHeight = child.getBoundingClientRect().height;
      if (!firstLineHeight) firstLineHeight = lineHeight;

      if (used + marginTop + childHeight <= budget) {
        used += marginTop + childHeight;
        continue;
      }
      const wholeLines = Math.floor((budget - used - marginTop) / lineHeight);
      if (wholeLines > 0) used += marginTop + wholeLines * lineHeight;
      break;
    }
    return Math.max(used, firstLineHeight);
  };

  const addReadMore = () => {
    tSlides.forEach((slide) => {
      const text = slide.querySelector('.t-text');
      if (!text || text.scrollHeight <= text.clientHeight + 2) return;

      const budget = parseFloat(getComputedStyle(text).maxHeight) || text.clientHeight;
      const collapsedHeight = snapToLineBoundary(text, budget);
      text.style.maxHeight = `${collapsedHeight}px`;
      text.classList.add('has-more');

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 't-more';
      btn.textContent = 'Read more';
      btn.setAttribute('aria-expanded', 'false');
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const expanded = slide.classList.toggle('expanded');
        btn.textContent = expanded ? 'Show less' : 'Read more';
        btn.setAttribute('aria-expanded', String(expanded));
        text.style.maxHeight = expanded ? `${text.scrollHeight}px` : `${collapsedHeight}px`;
        if (expanded) {
          tStage.classList.add('paused');
          tStage.setAttribute('aria-pressed', 'true');
        }
      });
      text.after(btn);
    });
  };
  document.fonts ? document.fonts.ready.then(addReadMore) : addReadMore();

  if (tSlides.length > 1) {
    tStage.classList.add('interactive');
    tStage.tabIndex = 0;
    tStage.setAttribute('role', 'button');
    tStage.setAttribute('aria-pressed', 'false');
    tStage.setAttribute('aria-label', 'Pause testimonial rotation');
    const toggleTPause = () => {
      const paused = tStage.classList.toggle('paused');
      tStage.setAttribute('aria-pressed', String(paused));
    };
    tStage.addEventListener('click', toggleTPause);
    tStage.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleTPause(); }
    });
  }
}

/* Mobile menu */
const toggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('mainnav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
    document.body.classList.toggle('nav-open', open);
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.classList.remove('open');
    document.body.classList.remove('nav-open');
  }));
}

/* Highlight current page in nav */
const here = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('nav.main a').forEach(a => {
  if (a.getAttribute('href') === here) a.classList.add('active');
});

/* Scroll reveal, staggered by position within each parent so a row of
   cards (service grid, gallery grid) cascades in rather than every card
   appearing on the same frame. Grouping by parentElement means this needs
   no per-page markup changes — it just falls out of how .reveal is
   already used everywhere. */
const revealGroups = new Map();
document.querySelectorAll('.reveal').forEach((el) => {
  const parent = el.parentElement;
  const i = revealGroups.get(parent) || 0;
  el.dataset.revealDelay = prefersReducedMotion ? 0 : Math.min(i * 70, 350);
  revealGroups.set(parent, i + 1);
});
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('in'), Number(e.target.dataset.revealDelay) || 0);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* Gallery filter + lightbox (gallery.html only). Lightbox prev/next walks
   only the currently-filtered items, so switching to "Custom Stands" and
   opening a photo never steps into a Marquee shot mid-browse. */
const gGrid = document.querySelector('.g-grid');
if (gGrid) {
  const gTabs = document.querySelectorAll('.g-tab');
  const gItems = [...gGrid.querySelectorAll('.g-item')];
  const gEmpty = document.querySelector('.g-empty');

  /* Each category shows PAGE_SIZE photos first, with a "Show N more" button
     for the rest — at 20+ photos in a category, showing everything at once
     made the mobile page 12+ screens of scrolling. Re-applied on every
     filter change so switching tabs always starts back at the first page. */
  const PAGE_SIZE = 8;
  const gMoreWrap = document.querySelector('.g-more-wrap');
  const gMoreBtn = document.querySelector('.g-more');
  const gMoreCount = document.querySelector('.g-more-count');

  const applyFilter = (cat) => {
    const matching = [];
    gItems.forEach((item) => {
      const match = cat === 'all' || item.dataset.cat === cat;
      item.classList.toggle('hidden', !match);
      item.classList.remove('more-hidden');
      if (match) matching.push(item);
    });
    gEmpty?.classList.toggle('show', matching.length === 0);

    const extra = matching.length - PAGE_SIZE;
    if (extra > 0) {
      matching.slice(PAGE_SIZE).forEach((item) => item.classList.add('more-hidden'));
      gMoreCount.textContent = extra;
      gMoreWrap.hidden = false;
    } else {
      gMoreWrap.hidden = true;
    }
  };

  gTabs.forEach((btn) => btn.addEventListener('click', () => {
    gTabs.forEach((b) => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');
    applyFilter(btn.dataset.filter);
  }));

  gMoreBtn.addEventListener('click', () => {
    gItems.forEach((item) => item.classList.remove('more-hidden'));
    gMoreWrap.hidden = true;
  });

  applyFilter('all');

  const lb = document.getElementById('lightbox');
  const lbImg = lb.querySelector('.lb-img');
  const lbName = lb.querySelector('.lb-name');
  const lbCat = lb.querySelector('.lb-cat');
  const visibleItems = () => gItems.filter((i) => !i.classList.contains('hidden') && !i.classList.contains('more-hidden'));
  let lbIndex = 0;
  let lastFocused = null;

  const renderLightbox = (list) => {
    const item = list[lbIndex];
    const img = item.querySelector('img');
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbName.textContent = item.querySelector('.g-name').textContent;
    lbCat.textContent = item.querySelector('.g-cat').textContent;
  };

  const openLightbox = (item) => {
    const list = visibleItems();
    lbIndex = list.indexOf(item);
    lastFocused = document.activeElement;
    renderLightbox(list);
    lb.classList.add('open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
    lb.querySelector('.lb-close').focus();
  };

  const closeLightbox = () => {
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
    lastFocused?.focus();
  };

  const step = (dir) => {
    const list = visibleItems();
    if (!list.length) return;
    lbIndex = (lbIndex + dir + list.length) % list.length;
    renderLightbox(list);
  };

  gItems.forEach((item) => item.addEventListener('click', () => openLightbox(item)));
  lb.querySelector('.lb-close').addEventListener('click', closeLightbox);
  lb.querySelector('.lb-prev').addEventListener('click', () => step(-1));
  lb.querySelector('.lb-next').addEventListener('click', () => step(1));
  lb.addEventListener('click', (e) => { if (e.target === lb) closeLightbox(); });
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });
}

/* Enquiry form — submits to Formspree via fetch for an inline response;
   falls back to a normal POST (Formspree's own redirect) if JS fails. */
const form = document.querySelector('form.enquiry');
if (form) {
  const btn = form.querySelector('button[type="submit"]');
  const note = form.querySelector('.form-note');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    btn.disabled = true;
    btn.textContent = 'Sending…';

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    }).then((res) => {
      if (res.ok) {
        form.reset();
        if (note) {
          note.textContent = 'We typically respond within one business day.';
          note.classList.remove('is-error', 'is-success');
        }
        form.classList.add('is-sent');
        setTimeout(() => form.classList.remove('is-sent'), 3600);
      } else {
        throw new Error('Form submission failed');
      }
    }).catch(() => {
      if (note) {
        note.textContent = `Something went wrong sending that. Please call 081 767 2224 or email info@keithandco.co.za directly.`;
        note.classList.remove('is-success');
        note.classList.add('is-error');
      }
    }).finally(() => {
      btn.disabled = false;
      btn.textContent = 'Send enquiry';
    });
  });
}
