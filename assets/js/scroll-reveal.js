/* ── SCROLL REVEAL + SKILL BAR ANIMATION ─── */
export function initScrollReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('on');

      // Animate skill bars when their card is revealed
      if (e.target.classList.contains('sk-cat')) {
        e.target.querySelectorAll('.sk-fill').forEach(bar => {
          setTimeout(() => { bar.style.width = bar.dataset.w + '%'; }, 300);
        });
      }
      obs.unobserve(e.target);
    });
  }, { threshold: .12 });

  document.querySelectorAll('.rv').forEach(el => obs.observe(el));

  // Re-observe any elements added dynamically
  const mo = new MutationObserver(() => {
    document.querySelectorAll('.rv:not(.on)').forEach(el => obs.observe(el));
  });
  mo.observe(document.body, { childList: true, subtree: true });
}
