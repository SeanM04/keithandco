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

/* Hero slider (index.html only) */
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.slider-dots button');
if (slides.length) {
  let cur = 0, timer;
  const show = (i) => {
    slides[cur].classList.remove('active');
    dots[cur]?.classList.remove('active');
    cur = i;
    slides[cur].classList.add('active');
    dots[cur]?.classList.add('active');
  };
  const next = () => show((cur + 1) % slides.length);
  const start = () => { timer = setInterval(next, 6000); };
  dots.forEach((d, i) => d.addEventListener('click', () => {
    clearInterval(timer); show(i); start();
  }));
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) start();
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
