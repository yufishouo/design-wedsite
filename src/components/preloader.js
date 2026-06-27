export function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;
  
  // Disable scrolling while loading
  document.body.style.overflow = 'hidden';
  
  const hidePreloader = () => {
    // Add a small artificial delay for the premium feel
    setTimeout(() => {
      preloader.classList.add('is-loaded');
      document.body.style.overflow = '';
      
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
