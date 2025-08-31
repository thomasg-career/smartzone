(function () {
  const slidesContainer = document.querySelector('.slides');
  if (slidesContainer) {
    let slides = Array.from(slidesContainer.querySelectorAll('.slide'));
    slides = slides.filter(s => s && s.textContent.trim().length > 0);
    if (slides.length > 0) {
      const dotsContainer = document.querySelector('[data-dots]');
      if (dotsContainer) {
        dotsContainer.innerHTML = '';
        slides.forEach((_, i) => {
          const d = document.createElement('button');
          d.className = 'dot';
          d.type = 'button';
          d.setAttribute('aria-label', `Go to slide ${i + 1}`);
          d.addEventListener('click', () => goTo(i));
          dotsContainer.appendChild(d);
        });
      }
      let current = 0;
      function updateUI() {
        slides.forEach((s, i) => {
          s.classList.toggle('active', i === current);
        });
        const dots = dotsContainer ? Array.from(dotsContainer.children) : [];
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
      }
      function prev() { current = (current - 1 + slides.length) % slides.length; updateUI(); }
      function next() { current = (current + 1) % slides.length; updateUI(); }
      function goTo(i) { if (i < 0 || i >= slides.length) return; current = i; updateUI(); }

      document.querySelector('[data-prev]')?.addEventListener('click', prev);
      document.querySelector('[data-next]')?.addEventListener('click', next);

      let startX = 0, startY = 0, isTouch = false;
      slidesContainer.addEventListener('touchstart', (e) => {
        if (!e.touches || e.touches.length === 0) return;
        startX = e.touches[0].clientX; startY = e.touches[0].clientY; isTouch = true;
      }, { passive: true });
      slidesContainer.addEventListener('touchend', (e) => {
        if (!isTouch) return;
        isTouch = false;
        if (!e.changedTouches || !e.changedTouches.length) return;
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const dx = endX - startX;
        const dy = endY - startY;
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
          if (dx > 0) prev(); else next();
        }
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prev();
        if (e.key === 'ArrowRight') next();
      });

      updateUI();
    }
  }

  const posterThumb = document.getElementById('poster-thumb');
  const posterModal = document.getElementById('poster-modal');
  const modalCloseBtn = document.getElementById('modal-close');

  function openModal() {
    if (!posterModal) return;
    posterModal.classList.add('active');
    posterModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    if (!posterModal) return;
    posterModal.classList.remove('active');
    posterModal.setAttribute('aria-hidden', 'true');
    if (!document.body.classList.contains('homepage')) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }
  posterThumb?.addEventListener('click', openModal);
  modalCloseBtn?.addEventListener('click', closeModal);
  posterModal?.addEventListener('click', (e) => { if (e.target === posterModal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  (function projectsInit() {
    const search = document.getElementById('project-search');
    const grid = document.getElementById('projects-grid');
    const tagFilters = document.getElementById('tag-filters');
    const cards = grid ? Array.from(grid.querySelectorAll('.project-card')) : [];
    function normalize(s) { return (s || '').toLowerCase().trim(); }
    function filterProjects() {
      const q = normalize(search?.value);
      const activeTagBtn = (tagFilters && tagFilters.querySelector('.tag-btn.active'));
      const tag = activeTagBtn ? activeTagBtn.dataset.tag : 'all';
      cards.forEach(card => {
        const title = normalize(card.querySelector('.project-title')?.textContent);
        const desc = normalize(card.querySelector('.project-desc')?.textContent);
        const tags = normalize(card.dataset.tags || '');
        const matchesText = q === '' || title.includes(q) || desc.includes(q) || tags.includes(q);
        const matchesTag = tag === 'all' || tags.split(' ').includes(tag);
        card.style.display = (matchesText && matchesTag) ? 'flex' : 'none';
      });
    }
    if (search) search.addEventListener('input', filterProjects);
    if (tagFilters) {
      tagFilters.addEventListener('click', (e) => {
        const btn = e.target.closest('.tag-btn');
        if (!btn) return;
        tagFilters.querySelectorAll('.tag-btn').forEach(b => b.classList.remove('active'));
        btn.classList.remove('active');
        void btn.offsetWidth;
        btn.classList.add('active');
        filterProjects();
        const tag = btn.dataset.tag || 'all';
        if (tag && tag !== 'all') history.replaceState(null, '', '#' + tag);
        else history.replaceState(null, '', location.pathname);
      });
    }
    filterProjects();
  })();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.contact-card, .project-card').forEach(card => observer.observe(card));
})();
