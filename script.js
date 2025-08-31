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
          s.classList.remove("active", "prev");
          if (i === current) {
            s.classList.add("active");
          } else if (i === (current - 1 + slides.length) % slides.length) {
            s.classList.add("prev");
          }
        });
        const dots = dotsContainer ? Array.from(dotsContainer.children) : [];
        dots.forEach((d, i) => d.classList.toggle("active", i === current));
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
})();
