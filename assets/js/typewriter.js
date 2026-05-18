/* ── TYPEWRITER ──────────────────────────── */
const ROLES = [
  'computer-vision tools.',
  'full-stack platforms.',
  'AI-integrated solutions.',
  'mobile games with Unity.',
  'clean, purposeful code.',
  'things that matter.'
];

export function initTypewriter(elId = 'tw') {
  const el = document.getElementById(elId);
  if (!el) return;

  let ri = 0, ci = 0, deleting = false;

  function tick() {
    const word = ROLES[ri];
    if (deleting) {
      el.textContent = word.slice(0, --ci);
      if (ci === 0) {
        deleting = false;
        ri = (ri + 1) % ROLES.length;
        return setTimeout(tick, 400);
      }
      return setTimeout(tick, 45);
    }
    el.textContent = word.slice(0, ++ci);
    if (ci === word.length) {
      deleting = true;
      return setTimeout(tick, 2200);
    }
    setTimeout(tick, 75);
  }

  setTimeout(tick, 900);
}
