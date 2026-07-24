import './styles/global.css';
import './styles/components.css';
import './styles/animations.css';
import { initHeader } from './components/header.js';
import { initFooter } from './components/footer.js';
import { initAnimations } from './utils/animations.js';
import { initPreloader } from './components/preloader.js';
import { initCursor } from './components/cursor.js';
import Lenis from 'lenis';

let lenisInstance = null;

function initSmoothScroll() {
  if (lenisInstance) return; // Prevent multiple initializations

  // Motion-sensitive visitors get the browser's native scrolling
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    initBackToTop(null);
    return;
  }

  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  function raf(time) {
    lenisInstance.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  initBackToTop(lenisInstance);
}

function initBackToTop(lenis) {
  const backToTop = document.createElement('a');
  backToTop.href = '#top';
  backToTop.className = 'back-to-top';
  backToTop.innerText = 'Top';
  document.body.appendChild(backToTop);

  backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0 });
    }
  });

  const throttle = (fn, wait) => {
    let time = Date.now();
    return function() {
      if ((time + wait - Date.now()) < 0) {
        fn();
        time = Date.now();
      }
    };
  };

  window.addEventListener('scroll', throttle(() => {
    if (window.scrollY > 800) {
      backToTop.classList.add('is-visible');
    } else {
      backToTop.classList.remove('is-visible');
    }
  }, 100));
}

// Soft fade-out when navigating between internal pages
function initPageTransitions() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || link.target === '_blank') return;

    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript')) return;

    const url = new URL(link.href, location.href);
    if (url.origin !== location.origin) return;
    // Same-page anchors (e.g. /contact.html#process while on contact) scroll, don't transition
    if (url.pathname === location.pathname && url.hash) return;

    e.preventDefault();
    document.body.classList.add('page-leaving');
    setTimeout(() => { location.href = link.href; }, 220);
  });

  // Pages restored from the back/forward cache must never stay faded out
  window.addEventListener('pageshow', () => {
    document.body.classList.remove('page-leaving');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();
  initPreloader();
  initCursor();
  initHeader();
  initFooter();
  initAnimations();
  initPageTransitions();
});
