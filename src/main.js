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

  // Back to Top Button
  const backToTop = document.createElement('a');
  backToTop.href = '#top';
  backToTop.className = 'back-to-top';
  backToTop.innerText = 'Top';
  document.body.appendChild(backToTop);
  
  backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    lenisInstance.scrollTo(0, { duration: 1.5 });
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 800) {
      backToTop.classList.add('is-visible');
    } else {
      backToTop.classList.remove('is-visible');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();
  initPreloader();
  initCursor();
  initHeader();
  initFooter();
  initAnimations();
});
