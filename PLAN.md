# Portfolio Sitesi — Modüler Yapı Planı

**Sahip:** Kaan Özdemir
**Stack:** Vanilla HTML + CSS + JS (build adımı yok)
**Yapı:** Hibrit — `index.html` one-page + `projects/*.html` detay sayfaları
**Stil:** Modern, koyu tema (light fallback), temiz, ölçülü animasyon

---

## 1. Klasör Yapısı

```
portfolio_data/
├── index.html                    # Ana sayfa (one-page)
├── projects/
│   ├── handmouse.html
│   ├── perfect-circle.html
│   ├── kampyeri.html
│   ├── mobile-app-analysis.html
│   └── ocr-system.html
├── assets/
│   ├── css/
│   │   ├── 00-reset.css
│   │   ├── 01-tokens.css         # CSS değişkenleri
│   │   ├── 02-themes.css         # light/dark
│   │   ├── 03-base.css
│   │   ├── 04-layout.css
│   │   ├── 05-cursor.css
│   │   ├── 06-animations.css
│   │   ├── components/
│   │   │   ├── navbar.css
│   │   │   ├── hero.css
│   │   │   ├── card.css
│   │   │   ├── badge.css
│   │   │   ├── timeline.css
│   │   │   ├── project-card.css
│   │   │   ├── footer.css
│   │   │   └── button.css
│   │   └── pages/
│   │       └── project-detail.css
│   ├── js/
│   │   ├── main.js               # Entry point
│   │   ├── theme-toggle.js
│   │   ├── cursor.js
│   │   ├── scroll-reveal.js
│   │   ├── nav-scroll.js
│   │   ├── typewriter.js
│   │   └── project-loader.js
│   ├── img/
│   │   ├── projects/
│   │   ├── avatar.webp
│   │   └── favicon.svg
│   └── icons/
│       └── *.svg
├── data/
│   ├── projects.json
│   ├── experience.json
│   ├── skills.json
│   └── site.json
└── Kaan_Ozdemir_CV.pdf
```

---

## 2. `index.html` — Bölüm Haritası

| Sıra | Tag | `id` | İçerik | CSS dosyası |
|------|-----|------|--------|-------------|
| 1 | `<header class="navbar">` | `#navbar` | Logo + nav linkleri + tema toggle | `navbar.css` |
| 2 | `<div class="bg-canvas">` | `#bg-canvas` | Animasyonlu arkaplan | `06-animations.css` |
| 3 | `<section class="hero">` | `#home` | İsim, başlık (typewriter), intro, CTA | `hero.css` |
| 4 | `<section class="about">` | `#about` | Summary, eğitim, diller | `card.css` |
| 5 | `<section class="experience">` | `#experience` | İş deneyimi timeline | `timeline.css` |
| 6 | `<section class="projects">` | `#projects` | Proje kartları + "In Dev" rozeti | `project-card.css` |
| 7 | `<section class="skills">` | `#skills` | Kategorili yetenek rozetleri | `badge.css` |
| 8 | `<section class="contact">` | `#contact` | İletişim bilgileri | `card.css` |
| 9 | `<footer>` | `#footer` | Telif + CV indir + sosyal | `footer.css` |

---

## 3. Tag / Class Konvansiyonu (BEM-lite)

- **Blok:** `proj-card`, `navbar`, `hero`
- **Eleman:** `proj-card__title`, `navbar__link`
- **Varyant:** `btn--ghost`, `badge--py`
- **State:** `is-active`, `is-open`, `is-visible`
- **JS hook:** `data-project-id`, `data-theme`, `data-reveal`

Örnek bileşen:
```html
<article class="proj-card" data-project-id="handmouse">
  <div class="proj-card__media">
    <img class="proj-card__img" src="..." alt="">
  </div>
  <div class="proj-card__body">
    <h3 class="proj-card__title">HandMouse</h3>
    <p class="proj-card__desc">...</p>
    <ul class="proj-card__tags">
      <li class="badge badge--py">Python</li>
    </ul>
    <a class="btn btn--ghost" href="projects/handmouse.html">Detay →</a>
  </div>
</article>
```

---

## 4. Data Katmanı

İçerik HTML'den ayrı. JSON güncelle, sayfa otomatik yenilenir.

### `data/projects.json`
```json
[
  {
    "id": "handmouse",
    "title": "HandMouse",
    "subtitle": "Hands-free mouse via webcam",
    "tags": ["Python","MediaPipe","OpenCV","PyAutoGUI"],
    "thumb": "assets/img/projects/handmouse.webp",
    "summary": "Real-time hand-gesture mouse control...",
    "detailPage": "projects/handmouse.html",
    "github": "https://github.com/Kozdemir03/handmouse",
    "featured": true,
    "inDevelopment": false
  }
]
```

### `data/experience.json`
```json
[
  {
    "company": "E.S.B.A.S.",
    "role": "Software Developer Intern",
    "period": "Jan 2026 – Feb 2026",
    "bullets": [
      "Built an AI-integrated chatbot...",
      "Implemented a live camera viewer..."
    ]
  }
]
```

### `data/skills.json`
```json
{
  "Languages":  ["C#","Python","Java","JavaScript","TypeScript"],
  "Backend":    ["ASP.NET","SQL","LINQ","PHP"],
  "Frontend":   ["HTML5","CSS3","Bootstrap","React Native"],
  "Tools":      ["Unity","MediaPipe","OpenCV","PyTorch","Pandas","Seaborn","Git"],
  "Concepts":   ["REST APIs","CRUD","OOP","Computer Vision","AI/ML Integration"]
}
```

### `data/site.json`
```json
{
  "name": "Kaan Özdemir",
  "tagline": "Software Developer",
  "location": "Izmir, Turkey",
  "email": "kaanozd03@gmail.com",
  "phone": "+90 539 686 97 89",
  "github": "https://github.com/Kozdemir03",
  "linkedin": "https://linkedin.com/in/kaan-ozdemir-540637389",
  "cv": "Kaan_Ozdemir_CV.pdf"
}
```

---

## 5. CSS Token Sistemi (`01-tokens.css`)

```css
:root {
  /* Renk — light */
  --c-bg, --c-surface, --c-text, --c-muted, --c-accent, --c-accent-l, --c-border

  /* Tipografi */
  --f-sans: 'Space Grotesk', sans-serif;
  --f-display: 'Playfair Display', serif;
  --fs-xs, --fs-sm, --fs-base, --fs-lg, --fs-xl, --fs-2xl, --fs-display

  /* Spacing (8pt) */
  --sp-1 .. --sp-24

  /* Radius / Shadow / Transition */
  --r-sm, --r-md, --r-lg, --r-full
  --sh-sm, --sh-md, --sh-lg
  --tr-fast, --tr-base, --tr-slow

  /* Z-layers */
  --z-bg, --z-content, --z-nav, --z-cursor
}
[data-theme="dark"] { /* override */ }
```

---

## 6. JS Modül Sınırları

`main.js`:
```js
import { initTheme }        from './theme-toggle.js';
import { initCursor }       from './cursor.js';
import { initScrollReveal } from './scroll-reveal.js';
import { initNavScroll }    from './nav-scroll.js';
import { initTypewriter }   from './typewriter.js';
import { loadProjects }     from './project-loader.js';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initCursor();
  initScrollReveal();
  initNavScroll();
  initTypewriter();
  loadProjects();
});
```

Her modül tek sorumlulukla kendi dosyasında. Modülü kaldırmak = `main.js`'ten bir satır sil + dosyayı çıkar.

---

## 7. Animasyon Stratejisi

- **Arkaplan:** `swirl-animation.html`'deki canvas swirl efekti `#bg-canvas`'a taşınır
- **Scroll reveal:** `data-reveal="fade-up"` attribute'u IntersectionObserver ile `.is-visible` basar
- **Hover:** Sadece butonlar / kartlar / nav linkler
- **Erişilebilirlik:** Tüm animasyonlar `@media (prefers-reduced-motion: reduce)` altında kapanır

---

## 8. Proje Detay Sayfa Şablonu

Her `projects/*.html` aynı iskelet:

```
<header class="navbar"> ... </header>
<main class="proj-detail">
  <section class="proj-hero">       ← Başlık + tag'ler + demo linki
  <section class="proj-overview">   ← Problem / çözüm
  <section class="proj-gallery">    ← Ekran görüntüleri
  <section class="proj-stack">      ← Detaylı teknolojiler
  <section class="proj-challenges"> ← Zorluklar (opsiyonel)
  <section class="proj-links">      ← GitHub / demo / indir
</main>
<footer> ... </footer>
```

---

## 9. İleride Özellik Ekleme Rehberi

| Eklemek istediğin | Dokunulacak dosyalar |
|-------------------|---------------------|
| Yeni proje | `data/projects.json` (+ opsiyonel detay sayfası) |
| Yeni bölüm (örn. Blog) | `index.html`'e `<section id="blog">` + `components/blog.css` + `data/posts.json` |
| Dil seçimi (TR/EN) | `assets/js/i18n.js` + `data/lang-*.json` + `data-i18n` attribute'leri |
| Yeni tema | `02-themes.css`'e `[data-theme="..."]` bloğu ekle |
| Yeni animasyon | `06-animations.css`'e keyframe + `data-reveal="..."` tipini destekle |
| İletişim formu | `components/form.css` + Formspree/Netlify endpoint |

---

## 10. Uygulama Sırası (Önerilen)

1. `01-tokens.css` + `02-themes.css` + `00-reset.css` + `03-base.css` — temel
2. `04-layout.css` + `index.html` iskelet (boş bölümler)
3. `navbar.css` + `nav-scroll.js`
4. `hero.css` + `typewriter.js`
5. `data/site.json`, `data/projects.json`, vb. doldur
6. `card.css` + `project-card.css` + `project-loader.js`
7. `timeline.css` (experience) + `badge.css` (skills)
8. `footer.css` + `contact` bölümü
9. `cursor.css` + `cursor.js` (mevcut koddan port)
10. `06-animations.css` + `scroll-reveal.js` + arkaplan canvas
11. `projects/*.html` detay sayfaları (şablon kopyala)
12. SEO meta tag'leri + favicon + Open Graph
