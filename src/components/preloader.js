export function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  // Full intro only once per session — repeat visits get a quick fade instead
  const alreadySeen = sessionStorage.getItem('dj-intro-seen');
  if (alreadySeen) {
    preloader.classList.add('is-instant', 'is-loaded');
    setTimeout(() => preloader.remove(), 500);
    return;
  }

  // Disable scrolling while loading
  document.body.style.overflow = 'hidden';

  const hidePreloader = () => {
    // Add a small artificial delay for the premium feel
    setTimeout(() => {
      preloader.setAttribute('aria-hidden', 'true');
      preloader.classList.add('is-loaded');
      document.body.style.overflow = '';
      sessionStorage.setItem('dj-intro-seen', '1');

      // Remove element after transition finishes
      setTimeout(() => {
        preloader.remove();
      }, 1200);
    }, 600);
  };

  // When window is fully loaded (all images, etc.)
  if (document.readyState === 'complete') {
    hidePreloader();
  } else {
    window.addEventListener('load', hidePreloader);
  }
}
