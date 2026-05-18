/* ── SKILLS LOADER ───────────────────────── */
const ACCENT_MAP = {
  accent:  { icon: 'color-mix(in srgb,var(--accent) 12%,transparent)',  bar: 'linear-gradient(to right,var(--accent),var(--accent-l))',  num: 'var(--accent-l)' },
  accent2: { icon: 'color-mix(in srgb,var(--accent2) 12%,transparent)', bar: 'linear-gradient(to right,var(--accent2),var(--accent2-l))', num: 'var(--accent2-l)' },
  amber:   { icon: 'color-mix(in srgb,var(--amber) 12%,transparent)',   bar: 'linear-gradient(to right,color-mix(in srgb,var(--amber) 60%,#000),var(--amber))', num: 'var(--amber)' }
};

export async function loadSkills() {
  const grid = document.getElementById('skills-grid');
  if (!grid) return;

  let categories;
  try {
    const res = await fetch('data/skills.json');
    categories = await res.json();
  } catch {
    console.warn('Could not load skills.json');
    return;
  }

  categories.forEach((cat, i) => {
    const colors = ACCENT_MAP[cat.accent] || ACCENT_MAP.accent;
    const delay  = i > 0 ? ` d${Math.min(i % 3, 3)}` : '';

    const rows = (cat.items || []).map((item, j) => `
      <div class="sk-row"${j === cat.items.length - 1 ? ' style="margin-bottom:0"' : ''}>
        <div class="sk-rh">
          <span class="sk-rn">${item.name}</span>
          <span class="sk-rp" style="color:${colors.num}">${item.level}%</span>
        </div>
        <div class="sk-bar">
          <div class="sk-fill" style="background:${colors.bar}" data-w="${item.level}"></div>
        </div>
      </div>
    `).join('');

    const card = document.createElement('div');
    card.className = `sk-cat rv${delay}`;
    card.innerHTML = `
      <div class="sk-head">
        <div class="sk-icon" style="background:${colors.icon}">${cat.icon}</div>
        <div>
          <div class="sk-name">${cat.category}</div>
          <div class="sk-desc">${cat.desc}</div>
        </div>
      </div>
      ${rows}
    `;
    grid.appendChild(card);
  });
}
