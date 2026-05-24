/* ── i18n — Bilingual support (EN / TR) ──── */

const TRANSLATIONS = {
  en: {
    /* Navbar */
    'nav.about':      'About',
    'nav.experience': 'Experience',
    'nav.skills':     'Skills',
    'nav.work':       'Work',
    'nav.contact':    'Contact',

    /* Hero */
    'hero.badge':    'Available for opportunities',
    'hero.greeting': "Hi, I'm",
    'hero.cta.work': 'View my work ↓',
    'hero.cta.talk': "Let's talk →",
    'hero.desc':     'Computer Programming student at İzmir University of Economics — building full-stack platforms, AI/CV tools, and mobile games. I care about writing clean code that solves real problems.',
    'hero.scroll':   'Scroll',

    /* About */
    'about.eyebrow':      'About me',
    'about.title':        'Building software that actually works.',
    'about.p1':           "I'm a Computer Programming student at İzmir University of Economics with a hands-on mindset. I've shipped production-ready software through internships and personal projects — ranging from AI-integrated chatbots to full-stack reservation platforms and computer-vision tools.",
    'about.p2':           "I speak Turkish (native), English (B2), and French (B1). When I'm not coding I'm probably designing a new game mechanic in Unity or optimising a dataset pipeline.",
    'about.stat.roles':   'Professional roles',
    'about.stat.projects':'Projects shipped',
    'about.stat.tech':    'Technologies',
    'about.stat.langs':   'Languages spoken',
    'about.edu.title':    'Education',
    'about.lang.title':   'Languages',
    'about.cv':           'Download CV ↓',
    'cv.en':              'In English',
    'cv.tr':              'Türkçe',

    /* Experience */
    'exp.eyebrow': 'Career',
    'exp.title':   'Experience',

    /* Skills */
    'skills.eyebrow': 'My arsenal',
    'skills.title':   'Tech I work with',

    /* Projects */
    'projects.eyebrow': 'Selected work',
    'projects.title':   "Things I've built.",
    'projects.sub':     "A mix of personal projects, freelance work, and internship deliverables — each one taught me something new.",

    /* Contact */
    'contact.eyebrow': 'Get in touch',
    'contact.title':   'Have a project?<br>Let\'s build it <span class="gtxt">together.</span>',
    'contact.sub':     "I'm open to internships, collaborations, and full-time opportunities. Drop me a message — I respond within 24 hours.",

    /* Footer */
    'footer.copy':     '© 2025 Kaan Özdemir — Built with vanilla HTML, CSS & JS',
    'footer.location': 'İzmir, Turkey',
  },

  tr: {
    /* Navbar */
    'nav.about':      'Hakkımda',
    'nav.experience': 'Deneyim',
    'nav.skills':     'Yetenekler',
    'nav.work':       'Projeler',
    'nav.contact':    'İletişim',

    /* Hero */
    'hero.badge':    'Fırsatlara açığım',
    'hero.greeting': 'Merhaba, ben',
    'hero.cta.work': 'Projelerimi gör ↓',
    'hero.cta.talk': 'Konuşalım →',
    'hero.desc':     'İzmir Ekonomi Üniversitesi Bilgisayar Programcılığı öğrencisiyim — full-stack platformlar, YZ/CV araçları ve mobil oyunlar geliştiriyorum. Gerçek sorunları çözen temiz kod yazmaya önem veriyorum.',
    'hero.scroll':   'Kaydır',

    /* About */
    'about.eyebrow':       'Hakkımda',
    'about.title':         'Gerçekten çalışan yazılımlar geliştiriyorum.',
    'about.p1':            "İzmir Ekonomi Üniversitesi'nde Bilgisayar Programcılığı okuyan, uygulamaya odaklı bir geliştiriciyim. Stajlar ve kişisel projeler aracılığıyla — YZ destekli chatbot'lardan full-stack rezervasyon platformlarına ve bilgisayar görüntüsü araçlarına kadar — production'a hazır yazılımlar geliştirdim.",
    'about.p2':            "Türkçe (anadil), İngilizce (B2) ve Fransızca (B1) konuşuyorum. Kod yazmadığım zamanlarda büyük ihtimalle Unity'de yeni bir oyun mekaniği tasarlıyor ya da veri seti pipeline'ı optimize ediyorum.",
    'about.stat.roles':    'Profesyonel rol',
    'about.stat.projects': 'Tamamlanan proje',
    'about.stat.tech':     'Teknoloji',
    'about.stat.langs':    'Konuşulan dil',
    'about.edu.title':     'Eğitim',
    'about.lang.title':    'Diller',
    'about.cv':            'CV İndir ↓',
    'cv.en':               'İngilizce',
    'cv.tr':               'Türkçe',

    /* Experience */
    'exp.eyebrow': 'Kariyer',
    'exp.title':   'Deneyim',

    /* Skills */
    'skills.eyebrow': 'Araç setim',
    'skills.title':   'Kullandığım teknolojiler',

    /* Projects */
    'projects.eyebrow': 'Seçilmiş çalışmalar',
    'projects.title':   'Yaptıklarım.',
    'projects.sub':     'Kişisel projeler, freelance işler ve staj çıktılarının karışımı — her biri bana yeni bir şey öğretti.',

    /* Contact */
    'contact.eyebrow': 'İletişime geç',
    'contact.title':   'Bir projen mi var?<br>Hadi birlikte <span class="gtxt">yapalım.</span>',
    'contact.sub':     'Staj, iş birliği ve tam zamanlı fırsatlara açığım. Mesaj gönder — 24 saat içinde yanıt veririm.',

    /* Footer */
    'footer.copy':     '© 2025 Kaan Özdemir — Vanilla HTML, CSS & JS ile yapıldı',
    'footer.location': 'İzmir, Türkiye',
  }
};

/* ── Core apply function ─────────────────── */
function applyLang(lang) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  /* Plain text nodes */
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (!(key in t)) return;
    /* Some keys contain HTML (contact.title) */
    if (key === 'contact.title') {
      el.innerHTML = t[key];
    } else {
      el.textContent = t[key];
    }
  });

  /* innerHTML nodes (explicit opt-in) */
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.dataset.i18nHtml;
    if (key in t) el.innerHTML = t[key];
  });

  /* Persist & flag */
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;

  /* Update switcher button label */
  const btn = document.getElementById('lang-switcher-btn');
  if (btn) btn.textContent = lang.toUpperCase();
}

/* ── Dropdown toggle logic ───────────────── */
function initLangSwitcher() {
  const wrapper = document.getElementById('lang-switcher');
  const btn     = document.getElementById('lang-switcher-btn');
  if (!wrapper || !btn) return;

  btn.addEventListener('click', e => {
    e.stopPropagation();
    const open = wrapper.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });

  wrapper.querySelectorAll('[data-lang]').forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      applyLang(item.dataset.lang);
      wrapper.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', () => {
    wrapper.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  });
}

/* ── CV dropdown logic ───────────────────── */
function initCvDropdowns() {
  document.querySelectorAll('.cv-dropdown').forEach(wrapper => {
    const btn = wrapper.querySelector('.cv-dropdown-btn');
    if (!btn) return;
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const open = wrapper.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
    });
  });
  document.addEventListener('click', () => {
    document.querySelectorAll('.cv-dropdown.open').forEach(w => {
      w.classList.remove('open');
      const b = w.querySelector('.cv-dropdown-btn');
      if (b) b.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ── Init ────────────────────────────────── */
export function initI18n() {
  initLangSwitcher();
  initCvDropdowns();
  const saved = localStorage.getItem('lang') || 'en';
  applyLang(saved);
}
