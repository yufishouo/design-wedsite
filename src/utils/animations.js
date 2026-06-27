let globalObserver = null;

export function initAnimations() {
  // Only select elements that haven't been animated yet
  const fadeElements = document.querySelectorAll('.fade-up:not(.is-visible), .img-reveal:not(.is-visible)');
  
  if (!globalObserver) {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15 // Trigger when 15% visible
    };

    globalObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // Only animate once
        }
      });
    }, observerOptions);
  }

  // Observe newly found elements
  fadeElements.forEach(el => globalObserver.observe(el));
}
