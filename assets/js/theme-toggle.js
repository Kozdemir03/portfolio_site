/* ── THEME TOGGLE ────────────────────────── */
export const PALETTES = {
  light: { a: [96, 165, 250],   b: [251, 146, 60]  },
  dark:  { a: [245, 240, 232],  b: [244, 63,  94]  }
};

export let pA = PALETTES.light.a;
export let pB = PALETTES.light.b;
export let currentTheme = 'light';

export function initTheme() {
  const btn   = document.getElementById('ttog');
  const root  = document.documentElement;
  const saved = localStorage.getItem('kaan-theme') || 'dark';

  applyTheme(saved, root, btn);

  btn.addEventListener('click', () => {
    const next = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(next, root, btn);
    localStorage.setItem('kaan-theme', next);
  });
}

function applyTheme(t, root, btn) {
  currentTheme = t;
  root.setAttribute('data-theme', t);
  btn.textContent = t === 'light' ? '🌙' : '☀️';
  pA = PALETTES[t].a;
  pB = PALETTES[t].b;
}
