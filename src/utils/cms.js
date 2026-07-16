import projectsData from '../data/cms-mock.json';
import { initAnimations } from './animations.js';

export function initPortfolioCMS() {
  const grid = document.getElementById('portfolio-grid');
  
  if (!grid) return;

  const renderProjects = () => {
    grid.innerHTML = ''; 
    let filtered = projectsData;
    
    if (filtered.length === 0) {
      grid.innerHTML = '<p class="text-center" style="grid-column: 1/-1;">暫無專案。</p>';
      return;
    }

    filtered.forEach((project, index) => {
      const staggerClass = `stagger-${(index % 5) + 1}`;
      const card = document.createElement('a');
      card.href = `/case-study.html?id=${project.id}`;
      card.className = `portfolio-card img-hover-scale fade-up ${staggerClass}`;
      card.innerHTML = `
        <img src="${project.image}" alt="${project.title}" loading="lazy" decoding="async" />
        <div class="portfolio-card-info">
          <p class="text-sm" style="color: var(--color-accent); margin-bottom: 0.5rem;">${project.category}・${project.sizeLabel}</p>
          <h3 class="heading-small">${project.title}</h3>
        </div>
      `;
      grid.appendChild(card);
    });

    setTimeout(() => initAnimations(), 50);
  };

  renderProjects();
}

export function initCaseStudy() {
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get('id');
  const project = projectsData.find(p => p.id == idParam) || projectsData[0]; // fallback to first if not found

  if (!project) return;

  // Update Hero
  document.getElementById('cs-hero-img').src = project.heroImage;
  document.getElementById('cs-title').innerText = project.title;
  const metaEl = document.getElementById('cs-meta');
  if (metaEl) metaEl.innerText = `${project.category}・${project.sizeLabel}・${project.members}`;

  // Keep the browser tab title in sync with the project
  document.title = `${project.title}｜${project.category} | 大雋室內裝潢設計工作室`;

  // Update Split
  document.getElementById('cs-challenge').innerText = project.challenge;
  document.getElementById('cs-solution').innerText = project.solution;

  // Update Gallery (Vertical Stack) — entries are { src, caption } objects
  const gallery = document.getElementById('cs-gallery');
  if (gallery) {
    project.gallery.forEach((entry, idx) => {
      const src = entry.src || entry;
      const caption = entry.caption || '';
      const item = document.createElement('figure');
      item.className = 'cs-stack-item fade-up';
      item.innerHTML = `
        <img src="${src}" alt="${project.title} - ${caption || `空間實景 ${idx + 1}`}" loading="lazy" decoding="async" />
        ${caption ? `<figcaption class="cs-stack-caption">${caption}</figcaption>` : ''}
      `;
      gallery.appendChild(item);
    });
  }

  // Update Next Project
  const currentIndex = projectsData.findIndex(p => p.id === project.id);
  const nextProject = projectsData[currentIndex + 1] || projectsData[0];

  const nextContainer = document.getElementById('next-project-container');
  if (nextContainer) {
    nextContainer.style.cursor = 'pointer';
    nextContainer.innerHTML = `
      <div class="next-project-banner">
        <img src="${nextProject.heroImage || nextProject.image}" class="next-bg-img" loading="lazy" alt="Next Project Background" />
        <div class="next-overlay"></div>
        <div class="next-content">
          <span class="next-label text-sm">Next Project</span>
          <h2 class="next-title">
            <a href="/case-study.html?id=${nextProject.id}">${nextProject.title}</a>
          </h2>
        </div>
      </div>
    `;

    nextContainer.addEventListener('mouseenter', () => {
      const img = nextContainer.querySelector('.next-bg-img');
      const overlay = nextContainer.querySelector('.next-overlay');
      const title = nextContainer.querySelector('.next-title');
      if (img) img.style.transform = 'scale(1.05)';
      if (overlay) overlay.style.background = 'rgba(0,0,0,0.2)';
      if (title) title.style.transform = 'translateY(-10px)';
    });
    nextContainer.addEventListener('mouseleave', () => {
      const img = nextContainer.querySelector('.next-bg-img');
      const overlay = nextContainer.querySelector('.next-overlay');
      const title = nextContainer.querySelector('.next-title');
      if (img) img.style.transform = 'scale(1)';
      if (overlay) overlay.style.background = 'rgba(0,0,0,0.4)';
      if (title) title.style.transform = 'translateY(0)';
    });

    // Click handler (replaces inline onclick)
    nextContainer.addEventListener('click', () => {
      const link = nextContainer.querySelector('a');
      if (link) window.location.href = link.href;
    });
  }
}
