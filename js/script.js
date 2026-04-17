const cursorGlow = document.querySelector('.cursor-glow');
document.addEventListener('pointermove', (event) => {
  if (!cursorGlow) return;
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    siteNav.classList.toggle('open');
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const target = button.dataset.tab;
    tabButtons.forEach((btn) => {
      btn.classList.remove('active');
      btn.setAttribute('aria-selected', 'false');
    });
    tabPanels.forEach((panel) => panel.classList.remove('active'));
    button.classList.add('active');
    button.setAttribute('aria-selected', 'true');
    document.getElementById(target)?.classList.add('active');
  });
});

const slides = document.querySelectorAll('.quote');
const dots = document.querySelectorAll('.dot');
let activeSlide = 0;

function showSlide(index) {
  slides.forEach((slide, slideIndex) => slide.classList.toggle('active', slideIndex === index));
  dots.forEach((dot, dotIndex) => dot.classList.toggle('active', dotIndex === index));
  activeSlide = index;
}

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => showSlide(index));
});

if (slides.length > 1) {
  setInterval(() => {
    const next = (activeSlide + 1) % slides.length;
    showSlide(next);
  }, 5500);
}

const lightbox = document.getElementById('lightbox');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxCopy = document.getElementById('lightbox-copy');
const lightboxClose = document.querySelector('.lightbox-close');

document.querySelectorAll('.gallery-card').forEach((card) => {
  card.addEventListener('click', () => {
    if (!lightbox || !lightboxTitle || !lightboxCopy) return;
    lightboxTitle.textContent = card.dataset.title || 'Gallery image';
    lightboxCopy.textContent = card.dataset.copy || '';
    lightbox.showModal();
  });
});

lightboxClose?.addEventListener('click', () => lightbox?.close());
lightbox?.addEventListener('click', (event) => {
  const bounds = lightbox.getBoundingClientRect();
  const isInDialog = (
    bounds.top <= event.clientY &&
    event.clientY <= bounds.top + bounds.height &&
    bounds.left <= event.clientX &&
    event.clientX <= bounds.left + bounds.width
  );
  if (!isInDialog) lightbox.close();
});

const revealElements = document.querySelectorAll('.section .glass-panel, .gallery-card');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

revealElements.forEach((element) => {
  element.classList.add('reveal');
  observer.observe(element);
});
