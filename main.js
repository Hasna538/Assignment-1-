/* ========== script.js ========== */
/* Theme toggle, mobile menu, smooth scroll offset, contact form UI */

// DOM elements
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.querySelectorAll('a[href^="#"]');
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

// ---- Theme: remember preference ----
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  body.classList.add('light');
  themeIcon.textContent = '☀️';
  themeToggle.setAttribute('aria-pressed','true');
} else {
  // default dark-like look
  themeIcon.textContent = '🌙';
  themeToggle.setAttribute('aria-pressed','false');
}

themeToggle.addEventListener('click', () => {
  const isLight = body.classList.toggle('light');
  themeIcon.textContent = isLight ? '☀️' : '🌙';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  themeToggle.setAttribute('aria-pressed', String(isLight));
});

// ---- Mobile menu toggle ----
menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  if (!expanded) {
    mobileMenu.hidden = false;
    mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
  } else {
    mobileMenu.style.maxHeight = 0;
    setTimeout(() => mobileMenu.hidden = true, 300);
  }
});

// Close mobile menu when clicking a link
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menuToggle.click();
}));

// ---- Smooth scroll with offset for sticky header ----
function scrollToHash(e){
  if (!this.hash) return;
  e.preventDefault();
  const target = document.querySelector(this.hash);
  if (!target) return;
  const header = document.getElementById('site-header');
  const headerHeight = header ? header.offsetHeight : 0;
  const targetY = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 12;
  window.scrollTo({top: targetY, behavior: 'smooth'});
}
navLinks.forEach(link => {
  link.addEventListener('click', scrollToHash);
});

// ---- Simple contact form UI validation (no backend) ----
contactForm.addEventListener('submit', function(e){
  e.preventDefault();
  // clear errors
  document.getElementById('err-name').textContent = '';
  document.getElementById('err-email').textContent = '';
  document.getElementById('err-message').textContent = '';
  formStatus.textContent = '';

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  let ok = true;

  if (name.length < 2) {
    document.getElementById('err-name').textContent = 'Please enter your name.';
    ok = false;
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    document.getElementById('err-email').textContent = 'Please enter a valid email.';
    ok = false;
  }
  if (message.length < 8) {
    document.getElementById('err-message').textContent = 'Please write a short message.';
    ok = false;
  }

  if (!ok) return;

  // show success message (no real submit)
  formStatus.textContent = 'Message ready to send (UI only) ✔';
  formStatus.style.color = '#9ee7b7';

  // small animation and reset
  setTimeout(() => {
    contactForm.reset();
    formStatus.textContent = 'Thanks! Form cleared. You can attach this UI to a backend if needed.';
    formStatus.style.color = '';
  }, 1600);
});