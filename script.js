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
    <script>
(function () {
  const slidesContainer = document.querySelector('.slides');
  if (!slidesContainer) return;

  const slides = Array.from(slidesContainer.querySelectorAll('.slide'));

  // Create dots navigation
  const dotsContainer = document.createElement('div');
  dotsContainer.className = 'dots';
  slidesContainer.appendChild(dotsContainer);

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot';
    dot.type = 'button';
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  // Create Prev/Next buttons
  const prevBtn = document.createElement('button');
  prevBtn.className = 'prev';
  prevBtn.innerHTML = '&#10094;';
  const nextBtn = document.createElement('button');
  nextBtn.className = 'next';
  nextBtn.innerHTML = '&#10095;';
  slidesContainer.appendChild(prevBtn);
  slidesContainer.appendChild(nextBtn);

  let current = 0;
  let interval;

  function updateUI() {
    slides.forEach((s, i) => s.classList.toggle('active', i === current));
    Array.from(dotsContainer.children).forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function goToSlide(i) {
    current = i;
    updateUI();
    resetAutoSlide();
  }

  function prevSlide() {
    current = (current - 1 + slides.length) % slides.length;
    updateUI();
    resetAutoSlide();
  }

  function nextSlide() {
    current = (current + 1) % slides.length;
    updateUI();
  }

  function startAutoSlide() {
    interval = setInterval(nextSlide, 5000);
  }

  function resetAutoSlide() {
    clearInterval(interval);
    startAutoSlide();
  }

  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);

  // Initialize
  updateUI();
  startAutoSlide();

})();
</script>

})();


