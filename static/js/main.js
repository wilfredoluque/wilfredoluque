document.addEventListener("DOMContentLoaded", function () {

  // ---------------- MENU RESPONSIVE ----------------
  const nav = document.getElementById('primary-nav');
  const navToggle = document.getElementById('nav-toggle');

  document.addEventListener('click', (e) => {
    if (!nav) return;
    if (!nav.contains(e.target) && navToggle && !navToggle.contains(e.target)) {
      nav.classList.remove('open');
      if(navToggle) navToggle.setAttribute('aria-expanded', 'false');
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


  // ---------------- SCROLL TOP BUTTON ----------------
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


  // ---------------- MODAL PROYECTOS ----------------
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalGallery = document.getElementById('modal-gallery');
  const modalLink = document.getElementById('modal-link');
  const closeBtn = modal.querySelector('.close');

  const projectButtons = document.querySelectorAll('.open-modal');
  projectButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const project = btn.closest('.portfolio__project');
      const title = project.dataset.title;
      const desc = project.dataset.desc;
      const images = project.dataset.images.split(',');
      const link = project.dataset.link;

      modalTitle.textContent = title;
      modalDesc.textContent = desc;

      modalGallery.innerHTML = '';
      images.forEach(src => {
        const img = document.createElement('img');
        img.src = src.trim();
        img.alt = title;
        img.style.maxWidth = '100%';
        img.style.marginBottom = '10px';
        modalGallery.appendChild(img);
      });

      modalLink.href = link;
      modal.style.display = 'block';
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });

});
