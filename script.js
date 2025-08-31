(function () {
  const slidesContainer = document.querySelector('.slides');
  if (slidesContainer) {
    let slides = Array.from(slidesContainer.querySelectorAll('.slide'));
    const dotsContainer = document.querySelector('[data-dots]');
    if (slides.length > 0) {
      dotsContainer.innerHTML = '';
      slides.forEach((_, i) => {
        const d = document.createElement('button');
        d.className = 'dot';
        d.type = 'button';
        d.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(d);
      });
      let current = 0;
      let interval;
      function updateUI() {
        slides.forEach((s, i) => s.classList.toggle("active", i === current));
        Array.from(dotsContainer.children).forEach((d, i) => d.classList.toggle("active", i === current));
      }
      function prev() { current = (current - 1 + slides.length) % slides.length; updateUI(); resetAuto(); }
      function next() { current = (current + 1) % slides.length; updateUI(); resetAuto(); }
      function goTo(i) { current = i; updateUI(); resetAuto(); }
      function autoSlide() { interval = setInterval(() => { current = (current + 1) % slides.length; updateUI(); }, 5000); }
      function resetAuto() { clearInterval(interval); autoSlide(); }
      document.querySelector('[data-prev]')?.addEventListener('click', prev);
      document.querySelector('[data-next]')?.addEventListener('click', next);
      updateUI();
      autoSlide();
    const slides = document.querySelectorAll('[data-slides] .slide');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) slide.classList.add('active');
  });
}

document.querySelector('[data-next]').addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
});

document.querySelector('[data-prev]').addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
});

showSlide(currentSlide);

    
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

