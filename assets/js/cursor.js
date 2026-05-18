/* ── CUSTOM CURSOR + RIPPLE ──────────────── */
export function initCursor() {
  // Touch devices — skip
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const dot  = document.getElementById('cdot');
  const ring = document.getElementById('cring');
  if (!dot || !ring) return;

  let mx = -200, my = -200, rx = -200, ry = -200;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  (function animRing() {
    rx += (mx - rx) * .12;
    ry += (my - ry) * .12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  })();

  // Expand ring over interactive elements
  const INTERACTIVE = 'a, button, .pc, .stat-card, .sk-cat, .tl-item, .soc, .pob';
  document.querySelectorAll(INTERACTIVE).forEach(attachHover);

  // Observe future DOM additions (project cards injected by loader)
  const mo = new MutationObserver(records => {
    records.forEach(r => r.addedNodes.forEach(node => {
      if (node.nodeType !== 1) return;
      node.querySelectorAll?.(INTERACTIVE).forEach(attachHover);
      if (node.matches?.(INTERACTIVE)) attachHover(node);
    }));
  });
  mo.observe(document.body, { childList: true, subtree: true });

  // Click ripple
  document.addEventListener('click', e => {
    const r = document.createElement('div');
    r.className = 'ripple';
    r.style.left = e.clientX + 'px';
    r.style.top  = e.clientY + 'px';
    document.body.appendChild(r);
    r.addEventListener('animationend', () => r.remove());
  });

  function attachHover(el) {
    el.addEventListener('mouseenter', () => {
      ring.style.width  = '52px';
      ring.style.height = '52px';
      dot.style.transform = 'translate(-50%,-50%) scale(0)';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.width  = '32px';
      ring.style.height = '32px';
      dot.style.transform = 'translate(-50%,-50%) scale(1)';
    });
  }
}
