/* Keith & Co — shared site JS */

/* Footer year */
const yr = document.getElementById('yr');
if (yr) yr.textContent = new Date().getFullYear();

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

/* Scroll reveal */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

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
