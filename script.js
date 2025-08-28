
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
          s.style.display = i === current ? 'flex' : 'none';
          s.setAttribute('aria-hidden', String(i !== current));
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
      slidesContainer.addEventListener('touchmove', (e) => {
      
        if (!isTouch || !e.touches || e.touches.length === 0) return;
        const dx = Math.abs(e.touches[0].clientX - startX);
        const dy = Math.abs(e.touches[0].clientY - startY);
        if (dx > dy) e.preventDefault();
      }, { passive: false });
      slidesContainer.addEventListener('touchend', (e) => {
        if (!isTouch) return; isTouch = false;
        const endX = (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0].clientX : startX;
        const dx = endX - startX;
        if (Math.abs(dx) > 40) { if (dx > 0) prev(); else next(); }
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
    document.body.style.overflow = '';
  }
  posterThumb?.addEventListener('click', openModal);
  modalCloseBtn?.addEventListener('click', closeModal);
  posterModal?.addEventListener('click', (e) => { if (e.target === posterModal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });


  document.querySelectorAll('a[href="projects.html#iot"]').forEach(a => {
    a.addEventListener('click', (e) => {
   
      setTimeout(() => { location.hash = 'iot'; }, 200);
    });
  });


  (function projectsInit() {
    const search = document.getElementById('project-search');
    const grid = document.getElementById('projects-grid');
    const tagFilters = document.getElementById('tag-filters');
    const cards = grid ? Array.from(grid.querySelectorAll('.project-card')) : [];

    function normalize(s) { return (s || '').toLowerCase().trim(); }

    function filterProjects() {
      const q = normalize(search?.value);
      const activeTagBtn = (tagFilters && tagFilters.querySelector('.tag-btn.active')) || document.querySelector('#tag-filters .tag-btn.active');
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


    const tagContainer = document.getElementById('tag-filters') || document.querySelector('#tag-filters');
    if (tagContainer) {
      tagContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.tag-btn');
        if (!btn) return;
        tagContainer.querySelectorAll('.tag-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterProjects();

        const tag = btn.dataset.tag || 'all';
        if (tag && tag !== 'all') history.replaceState(null, '', '#' + tag);
        else history.replaceState(null, '', location.pathname);
      });
    }


    grid?.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-share]');
      if (!btn) return;
      const text = btn.dataset.share;
      if (navigator.share) {
        navigator.share({ title: 'Synapse Project', text }).catch(()=>{});
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(()=> alert('Project info copied to clipboard.'));
      } else {
        prompt('Copy project info', text);
      }
    });


    if (location.hash) {
      const hash = location.hash.replace('#', '').toLowerCase();
      setTimeout(() => {
        const btn = document.querySelector(`.tag-btn[data-tag="${hash}"]`);
        if (btn) {
          (document.getElementById('tag-filters') || document.querySelector('#tag-filters')).querySelectorAll('.tag-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        }
        filterProjects();
      }, 50);
    }

    filterProjects();
  })();

})();            
