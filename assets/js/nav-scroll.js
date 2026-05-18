/* ── NAVBAR SCROLL + ACTIVE SECTION SPY ─── */
export function initNavScroll() {
  const nav   = document.getElementById('navbar');
  const links = document.querySelectorAll('.nav-links a[href^="#"]');

  // Scrolled class
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
    updateActive();
  }, { passive: true });

  // Initial
  updateActive();

  function updateActive() {
    const mid = window.innerHeight / 2;
    let current = '';
    document.querySelectorAll('section[id]').forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= mid && rect.bottom >= mid) current = sec.id;
    });
    links.forEach(a => {
      a.classList.toggle('is-active', a.getAttribute('href') === '#' + current);
    });
  }
}
