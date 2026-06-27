export function initHeader() {
  const headerHTML = `
    <header class="site-header">
      <div class="container">
        <a href="/" class="logo">大雋工作室</a>
        <button class="menu-toggle" aria-label="Toggle Menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav class="site-nav">
          <ul class="nav-links">
            <li><a href="/portfolio.html">空間故事 Portfolio</a></li>
            <li><a href="/about.html">設計哲學 About</a></li>
            <li><a href="/contact.html#process">服務流程 Process</a></li>
            <li><a href="/contact.html#contact">預約諮詢 Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  `;

  // Inject header at the beginning of the body
  document.body.insertAdjacentHTML('afterbegin', headerHTML);

  const header = document.querySelector('.site-header');
  
  // Check if we are on a page that needs a light theme header initially (no hero image at top)
  const isLightTheme = document.body.dataset.headerTheme === 'light';
  if (isLightTheme) {
    header.classList.add('theme-light');
  }

  // Scroll listener for sticky glassmorphism effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  });

  // Mobile Menu Toggle
  const toggleBtn = header.querySelector('.menu-toggle');
  const siteNav = header.querySelector('.site-nav');
  
  if (toggleBtn && siteNav) {
    toggleBtn.addEventListener('click', () => {
      toggleBtn.classList.toggle('is-active');
      siteNav.classList.toggle('is-open');
      
      // Scroll Lock
      if (siteNav.classList.contains('is-open')) {
        document.body.style.overflow = 'hidden';
        header.classList.add('is-scrolled'); // Force glassmorphism when open
      } else {
        document.body.style.overflow = '';
        if (window.scrollY <= 50) {
          header.classList.remove('is-scrolled');
        }
      }
    });

    const navLinksList = siteNav.querySelectorAll('.nav-links a');
    navLinksList.forEach(link => {
      link.addEventListener('click', () => {
        toggleBtn.classList.remove('is-active');
        siteNav.classList.remove('is-open');
        document.body.style.overflow = '';
        if (window.scrollY <= 50) {
          header.classList.remove('is-scrolled');
        }
      });
    });
  }
}
