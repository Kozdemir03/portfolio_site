/* ── PROJECT CARD LOADER ─────────────────── */
export async function loadProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  let projects;
  try {
    const res = await fetch('data/projects.json');
    projects  = await res.json();
  } catch {
    console.warn('Could not load projects.json');
    return;
  }

  projects.forEach((p, idx) => {
    const isFeat  = p.featured;
    const isDev   = p.status === 'in-development';
    const numStr  = String(idx + 1).padStart(2, '0');

    const card = document.createElement('article');
    card.className = 'pc rv' + (isFeat ? ' feat' : '') + (idx > 0 ? ` d${Math.min(idx, 3)}` : '');
    card.dataset.projectId = p.id;

    const overlayBtns = `
      <a href="${p.detailPage}" class="pob">View Details</a>
      ${p.github ? `<a href="${p.github}" target="_blank" rel="noopener" class="pob">GitHub →</a>` : ''}
    `;

    const tags = (p.tags || []).map((t, i) => `<span class="tag ${p.tagColors?.[i] || 'tv'}">${t}</span>`).join('');
    const devBadge = isDev ? `<div class="dev-badge">⚙ In Development</div>` : '';

    const thumbInner = p.image
      ? `<img src="${p.image}" alt="${p.title} preview" style="width:100%;height:100%;object-fit:cover;display:block;"
             onerror="this.parentElement.style.background='${p.gradient}';this.outerHTML='<span style=\\'font-size:3rem\\'>${p.emoji}</span>'">`
      : `<span style="font-size:${isFeat ? '4' : '3'}rem">${p.emoji}</span>`;

    card.innerHTML = `
      <div class="pt">
        <div class="pti" style="background:${p.gradient};">${thumbInner}</div>
        <div class="pov">${overlayBtns}</div>
      </div>
      <div class="pb">
        <div class="pnum" style="font-size:${isFeat?'4':'2.5'}rem">${numStr}</div>
        ${devBadge}
        <div class="ptags">${tags}</div>
        <h3 class="ptitle">${p.title}</h3>
        <p class="pdesc">${p.summary}</p>
      </div>
    `;

    // 3D tilt
    attachTilt(card);
    grid.appendChild(card);
  });
}

function attachTilt(card) {
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform .08s linear, border-color .3s, box-shadow .3s';
  });
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - .5;
    const y = (e.clientY - r.top)  / r.height - .5;
    card.style.transform = `perspective(900px) rotateY(${x*7}deg) rotateX(${-y*7}deg) translateY(-5px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transition = 'transform .5s cubic-bezier(.4,0,.2,1), border-color .3s, box-shadow .3s';
    card.style.transform  = 'perspective(900px) rotateY(0) rotateX(0) translateY(0)';
  });
}
