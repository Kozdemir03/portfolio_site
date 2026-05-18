/* ── CANVAS BACKGROUNDS ──────────────────── */
import { pA, pB } from './theme-toggle.js';

/* Shared color helpers */
function lerp3(a, b, t) {
  return [(a[0]+(b[0]-a[0])*t)|0, (a[1]+(b[1]-a[1])*t)|0, (a[2]+(b[2]-a[2])*t)|0];
}
function rgba(c, a) { return `rgba(${c[0]},${c[1]},${c[2]},${a})`; }

/* ─────────────────────────────────────────
   SWIRL CANVAS  (fixed, full-page background)
───────────────────────────────────────── */
export function initSwirlCanvas() {
  const cvs = document.getElementById('swirl-canvas');
  if (!cvs) return;
  const ctx = cvs.getContext('2d');

  function resize() { cvs.width = window.innerWidth; cvs.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);

  class SwirlDot {
    constructor() { this.birth(true); }
    birth(rand) {
      const maxR = Math.min(cvs.width, cvs.height) * .44;
      this.angle = Math.random() * Math.PI * 2;
      this.r  = rand ? 28 + Math.random() * (maxR - 28) : maxR * (.8 + Math.random() * .2);
      this.dr = -(0.09 + Math.random() * .16);
      this.sz = Math.random() * 1.8 + .3;
      this.al = 0;
      this.tal= Math.random() * .55 + .15;
      this.t  = Math.random();
      this.ts = (Math.random() * .003 + .001) * (Math.random() > .5 ? 1 : -1);
    }
    step() {
      this.r += this.dr;
      this.angle += 1.6 / Math.sqrt(this.r + 6) * .04;
      this.al = this.r > 22
        ? Math.min(this.al + .012, this.tal)
        : this.al - .025;
      if (this.al <= 0) this.birth(false);
      this.t += this.ts;
      if (this.t < 0) this.t += 1;
      if (this.t > 1) this.t -= 1;
      this.x = cvs.width  / 2 + Math.cos(this.angle) * this.r;
      this.y = cvs.height / 2 + Math.sin(this.angle) * this.r;
    }
    draw() {
      if (this.al <= 0) return;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.sz, 0, Math.PI * 2);
      ctx.fillStyle = rgba(lerp3(pA, pB, this.t), this.al);
      ctx.fill();
    }
  }

  const dots = Array.from({ length: 280 }, () => new SwirlDot());

  (function animate() {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    dots.forEach(d => { d.step(); d.draw(); });
    requestAnimationFrame(animate);
  })();
}

/* ─────────────────────────────────────────
   HERO CANVAS  (particle + trail system)
───────────────────────────────────────── */
export function initHeroCanvas() {
  const cvs  = document.getElementById('hero-canvas');
  const hero = document.getElementById('hero');
  if (!cvs || !hero) return;
  const ctx = cvs.getContext('2d');

  let hW, hH;
  function resize() {
    hW = cvs.width  = hero.offsetWidth;
    hH = cvs.height = hero.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  let hmx = window.innerWidth / 2;
  let hmy = window.innerHeight / 2;
  hero.addEventListener('mousemove', e => {
    const r = cvs.getBoundingClientRect();
    hmx = e.clientX - r.left;
    hmy = e.clientY - r.top;
  });

  // Particles
  const N = 180;
  const px   = new Float32Array(N), py   = new Float32Array(N);
  const pvx  = new Float32Array(N), pvy  = new Float32Array(N);
  const plife= new Float32Array(N), pmaxL= new Float32Array(N);
  const psize= new Float32Array(N), pspd = new Float32Array(N);
  const palph= new Float32Array(N), pcol = new Uint8Array(N);

  function resetP(i) {
    const a = Math.random() * Math.PI * 2, d = Math.random() * Math.min(hW, hH) * .44;
    px[i] = hW / 2 + Math.cos(a) * d; py[i] = hH / 2 + Math.sin(a) * d;
    pvx[i] = pvy[i] = 0;
    plife[i]= Math.random() * .3; pmaxL[i]= .55 + Math.random() * .45;
    psize[i]= .7 + Math.random() * 2.1; pspd[i]= .4 + Math.random() * 1.1;
    palph[i]= 0; pcol[i] = Math.floor(Math.random() * 2);
  }
  for (let i = 0; i < N; i++) resetP(i);

  // Trails
  const HT = 6, PT = 10;
  const tx = Array.from({ length: HT }, () => new Float32Array(PT));
  const ty = Array.from({ length: HT }, () => new Float32Array(PT));
  const tLen= new Uint8Array(HT), tPtr= new Uint8Array(HT);
  const tOff= Float32Array.from({ length: HT }, () => (Math.random()-.5)*90);
  const tPhs= Float32Array.from({ length: HT }, () => Math.random()*Math.PI*2);
  const tSpd= Float32Array.from({ length: HT }, () => .45 + Math.random()*.65);
  const tW  = Float32Array.from({ length: HT }, () => .5 + Math.random()*1.1);
  const tCol= Uint8Array.from ({  length: HT }, () => Math.floor(Math.random()*2));
  let t = 0;

  (function animate() {
    ctx.clearRect(0, 0, hW, hH);
    t += .016;

    // Trails
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    for (let i = 0; i < HT; i++) {
      const a = t * tSpd[i] + tPhs[i];
      const nx = hmx + Math.cos(a) * tOff[i];
      const ny = hmy + Math.sin(a * 1.4) * tOff[i];
      tx[i][tPtr[i]] = nx; ty[i][tPtr[i]] = ny;
      tPtr[i] = (tPtr[i] + 1) % PT;
      if (tLen[i] < PT) tLen[i]++;
      const len = tLen[i]; if (len < 4) continue;
      ctx.strokeStyle = rgba(lerp3(pA, pB, tCol[i]), 1);
      ctx.globalAlpha = .16; ctx.lineWidth = tW[i];
      ctx.beginPath();
      const s = (tPtr[i] - len + PT) % PT;
      ctx.moveTo(tx[i][s], ty[i][s]);
      for (let j = 1; j < len; j++) ctx.lineTo(tx[i][(s+j)%PT], ty[i][(s+j)%PT]);
      ctx.stroke();
    }

    // Particles update
    for (let i = 0; i < N; i++) {
      const dx = hmx - px[i], dy = hmy - py[i];
      const dist = Math.sqrt(dx*dx + dy*dy) + 1;
      const sa = Math.atan2(dy, dx) + 1.5708;
      pvx[i] += Math.cos(sa)*(100/dist)*.07 + (Math.random()-.5)*.13;
      pvy[i] += Math.sin(sa)*(100/dist)*.07 + (Math.random()-.5)*.13;
      pvx[i] += dx*.0008; pvy[i] += dy*.0008;
      pvx[i] *= .95; pvy[i] *= .95;
      px[i] += pvx[i]*pspd[i]; py[i] += pvy[i]*pspd[i];
      plife[i] += .005;
      if (plife[i] > pmaxL[i]) { palph[i] -= .04; if (palph[i] <= 0) resetP(i); }
      else palph[i] = Math.min(palph[i]+.022, .28);
      if (px[i]<-80||px[i]>hW+80||py[i]<-80||py[i]>hH+80) resetP(i);
    }

    // Draw particles batched by color
    const TWO_PI = Math.PI * 2;
    for (let c = 0; c < 2; c++) {
      ctx.fillStyle = rgba(lerp3(pA, pB, c), 1);
      ctx.beginPath();
      for (let i = 0; i < N; i++) {
        if (pcol[i] !== c || palph[i] <= 0) continue;
        ctx.globalAlpha = palph[i];
        ctx.moveTo(px[i]+psize[i], py[i]);
        ctx.arc(px[i], py[i], psize[i], 0, TWO_PI);
      }
      ctx.fill();
    }

    // Mouse glow
    const gc  = lerp3(pA, pB, .35);
    const mg  = ctx.createRadialGradient(hmx, hmy, 0, hmx, hmy, 80);
    mg.addColorStop(0, rgba(gc, .1));
    mg.addColorStop(1, rgba(gc, 0));
    ctx.globalAlpha = 1;
    ctx.fillStyle = mg;
    ctx.beginPath(); ctx.arc(hmx, hmy, 80, 0, Math.PI*2); ctx.fill();
    ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;

    requestAnimationFrame(animate);
  })();
}
