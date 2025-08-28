
(() => {
  const slidesContainer = document.querySelector('.slides');
  if (!slidesContainer) return;


  let rawSlides = Array.from(slidesContainer.querySelectorAll('.slide'));


  rawSlides.forEach(s => {
    const content = s.querySelector('.slide-content');
    const visual = s.querySelector('.slide-visual');
    const hasText = content && content.textContent && content.textContent.trim().length > 3;
    const hasVisual = visual && visual.innerHTML && visual.innerHTML.trim().length > 3;
    if (!hasText && !hasVisual) {
      s.remove();
    }
  });

  let slides = Array.from(slidesContainer.querySelectorAll('.slide'));


  slides.forEach(s => {
    const content = s.querySelector('.slide-content');
    const visual = s.querySelector('.slide-visual');
    const hasText = content && content.textContent && content.textContent.trim().length > 3;
    const hasVisualImage = visual && visual.querySelector('img');
    if (!hasText && hasVisualImage) {
      s.classList.add('visual-only');
    }
  });


  const controls = document.querySelector('.controls');
  const dotsContainer = controls ? controls.querySelector('[data-dots]') : null;


  if (dotsContainer) dotsContainer.innerHTML = '';

  let current = 0;
  const total = slides.length;

  function buildDots() {
    if (!dotsContainer) return;
    slides.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = 'dot';
      dot.dataset.index = i;
      dot.addEventListener('click', () => goTo(parseInt(dot.dataset.index, 10)));
      dotsContainer.appendChild(dot);
    });
  }

  function update() {
    slides.forEach((s, i) => {
      if (i === current) {
        s.classList.add('active');
      } else {
        s.classList.remove('active');
      }
    });

    if (dotsContainer) {
      const dots = Array.from(dotsContainer.children);
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }
  }

  function prev() {
    current = (current - 1 + slides.length) % slides.length;
    update();
  }
  function next() {
    current = (current + 1) % slides.length;
    update();
  }
  function goTo(i) {
    if (i < 0 || i >= slides.length) return;
    current = i;
    update();
  }


  const btnPrev = document.querySelector('[data-prev]');
  const btnNext = document.querySelector('[data-next]');
  btnPrev && btnPrev.addEventListener('click', prev);
  btnNext && btnNext.addEventListener('click', next);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });

  buildDots();

  if (slides.length === 0) {
    controls && (controls.style.display = 'none');
    return;
  }
  update();


  const posterThumb = document.getElementById('poster-thumb');
  const posterModal = document.getElementById('poster-modal');
  const modalClose = document.getElementById('modal-close');

  if (posterThumb && posterModal) {
    posterThumb.addEventListener('click', () => {
      posterModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }
  if (modalClose && posterModal) {
    modalClose.addEventListener('click', () => {
      posterModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
  if (posterModal) {
    posterModal.addEventListener('click', (e) => {
      if (e.target === posterModal) {
        posterModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && posterModal && posterModal.classList.contains('active')) {
      posterModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

})();