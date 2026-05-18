/* ── MAIN ENTRY POINT ────────────────────── */
import { initTheme }       from './theme-toggle.js';
import { initCursor }      from './cursor.js';
import { initScrollReveal } from './scroll-reveal.js';
import { initNavScroll }   from './nav-scroll.js';
import { initTypewriter }  from './typewriter.js';
import { initSwirlCanvas, initHeroCanvas } from './canvas-bg.js';
import { loadProjects }    from './project-loader.js';
import { loadExperience }  from './experience-loader.js';
import { loadSkills }      from './skills-loader.js';

document.addEventListener('DOMContentLoaded', async () => {
  initTheme();
  initCursor();
  initNavScroll();
  initTypewriter();
  initSwirlCanvas();
  initHeroCanvas();

  // Load dynamic content from JSON
  await Promise.all([
    loadProjects(),
    loadExperience(),
    loadSkills()
  ]);

  // Scroll reveal must run after dynamic content is injected
  initScrollReveal();
});
