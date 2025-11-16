document.addEventListener("DOMContentLoaded", function () {
  if (window.AOS) AOS.init({ duration: 700, once: true, easing: 'ease-in-out' });

  const nav = document.getElementById('primary-nav');
  const navToggle = document.getElementById('nav-toggle');

  document.addEventListener('click', (e) => {
    if (!nav) return;
    if (!nav.contains(e.target) && navToggle && !navToggle.contains(e.target)) {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  function handleFirstTab(e) {
    if (e.key === 'Tab') document.body.classList.add('user-is-tabbing');
    window.removeEventListener('keydown', handleFirstTab);
  }
  window.addEventListener('keydown', handleFirstTab);

  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  navLinks.forEach(link => link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }));

  const scrollBtn = document.createElement('button');
  scrollBtn.textContent = '⬆';
  scrollBtn.id = 'scroll-top-btn';
  scrollBtn.setAttribute('aria-label', 'Volver arriba');
  document.body.appendChild(scrollBtn);

  scrollBtn.style.cssText = `
    position: fixed; bottom: 2rem; right: 2rem; 
    background:#0078ff; color:#fff; border:none; 
    padding:0.6rem 0.9rem; border-radius:50%; 
    cursor:pointer; font-size:1.2rem; display:none; z-index:1000; 
    box-shadow:0 6px 12px rgba(0,0,0,0.2);
  `;

  scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  window.addEventListener('scroll', () => {
    scrollBtn.style.display = window.scrollY > 400 ? 'block' : 'none';
  });
});
