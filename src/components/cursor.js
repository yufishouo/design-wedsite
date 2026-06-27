export function initCursor() {
  // Only enable custom cursor on desktop
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function render() {
    // Linear interpolation (lerp) for smooth follow
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  // Add hover effect to interactive elements
  const addHoverEffect = () => {
    const interactables = document.querySelectorAll('a, button, .masonry-item, .custom-option label, input, .timeline-step');
    interactables.forEach(el => {
      if (el.dataset.cursorBound) return;
      el.addEventListener('mouseenter', () => cursor.classList.add('is-hovering'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('is-hovering'));
      el.dataset.cursorBound = "true";
    });
  };

  addHoverEffect();
  
  // Re-bind after DOM changes (e.g., CMS load) with debounce
  let debounceTimer = null;
  const observer = new MutationObserver(() => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(addHoverEffect, 300);
  });
  observer.observe(document.body, { childList: true, subtree: true });
}
