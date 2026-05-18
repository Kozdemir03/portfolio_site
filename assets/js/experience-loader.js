/* ── EXPERIENCE TIMELINE LOADER ─────────── */
export async function loadExperience() {
  const wrap = document.getElementById('experience-wrap');
  if (!wrap) return;

  let items;
  try {
    const res = await fetch('data/experience.json');
    items = await res.json();
  } catch {
    console.warn('Could not load experience.json');
    return;
  }

  items.forEach((job, i) => {
    const bullets = (job.bullets || []).map(b => `<li>${b}</li>`).join('');
    const tags    = (job.tags || []).map(t => `<span class="tl-tag">${t}</span>`).join('');
    const delay   = i > 0 ? ` d${Math.min(i, 3)}` : '';

    const item = document.createElement('div');
    item.className = `tl-item rv${delay}`;
    item.innerHTML = `
      <div class="tl-dot"></div>
      <div class="tl-meta">
        <span class="tl-period">${job.period}</span>
        <span class="tl-type">${job.type}</span>
      </div>
      <div class="tl-role">${job.role}</div>
      <div class="tl-company">${job.company}</div>
      <ul class="tl-bullets">${bullets}</ul>
      <div class="tl-tags">${tags}</div>
    `;
    wrap.appendChild(item);
  });
}
