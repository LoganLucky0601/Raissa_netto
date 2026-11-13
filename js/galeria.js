// Instantes congelados: fotos, títulos, categorias e legendas ficam no index.html.
// Este arquivo controla apenas as interações do carrossel e a ampliação das imagens.
document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('#memories-track');
  const modal = document.querySelector('#memory-modal');
  if (!track || !modal) return;

  const cards = [...track.querySelectorAll('.memory-card')];
  if (!cards.length) return;
  const dots = document.querySelector('#memories-dots');
  const count = document.querySelector('#memories-count');
  const prev = document.querySelector('#memories-prev');
  const next = document.querySelector('#memories-next');
  if (!dots || !count || !prev || !next) return;

  // Exibe o espaço reservado caso a foto ainda não esteja na pasta do projeto.
  function prepareImages(container) {
    container.querySelectorAll('.memory-media img').forEach(img => {
      const ready = () => img.parentElement?.classList.add('has-image');
      const failed = () => {
        img.parentElement?.classList.remove('has-image');
        img.remove();
      };
      img.addEventListener('load', ready, { once: true });
      img.addEventListener('error', failed, { once: true });
      if (img.complete) {
        if (img.naturalWidth) ready();
        else failed();
      }
    });
  }
  prepareImages(track);

  dots.innerHTML = cards.map((_, i) =>
    '<button type="button" class="memories-dot" data-index="' + i +
    '" aria-label="Ir para fotografia ' + (i + 1) + '"></button>'
  ).join('');

  const dotButtons = [...dots.querySelectorAll('.memories-dot')];
  let current = 0;

  function update(index) {
    current = Math.max(0, Math.min(cards.length - 1, index));
    count.textContent = String(current + 1).padStart(2, '0') +
      ' / ' + String(cards.length).padStart(2, '0');
    dotButtons.forEach((dot, i) => dot.setAttribute('aria-current', String(i === current)));
    prev.disabled = current === 0;
    next.disabled = current === cards.length - 1;
  }

  function go(index) {
    const nextIndex = Math.max(0, Math.min(cards.length - 1, index));
    track.scrollTo({
      left: cards[nextIndex].offsetLeft - cards[0].offsetLeft,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    });
    update(nextIndex);
  }

  prev.addEventListener('click', () => go(current - 1));
  next.addEventListener('click', () => go(current + 1));
  dots.addEventListener('click', event => {
    const button = event.target.closest('[data-index]');
    if (button) go(Number(button.dataset.index));
  });

  track.addEventListener('scroll', () => {
    const left = track.scrollLeft;
    let nearest = 0;
    let distance = Infinity;
    cards.forEach((card, i) => {
      const difference = Math.abs(card.offsetLeft - cards[0].offsetLeft - left);
      if (difference < distance) {
        nearest = i;
        distance = difference;
      }
    });
    update(nearest);
  }, { passive: true });

  track.addEventListener('click', event => {
    const button = event.target.closest('.memory-open');
    if (!button) return;
    const card = button.closest('.memory-card');
    const originalMedia = card?.querySelector('.memory-media');
    if (!originalMedia) return;

    const expandedMedia = modal.querySelector('.memory-modal-media');
    expandedMedia.replaceChildren(...[...originalMedia.children].map(node => node.cloneNode(true)));
    prepareImages(modal);
    modal.querySelector('.memory-modal-category').textContent =
      card.querySelector('.memory-category')?.textContent || '';
    modal.querySelector('.memory-modal-title').textContent =
      card.querySelector('h3')?.textContent || '';
    modal.querySelector('.memory-modal-description').textContent =
      card.querySelector('.memory-detail')?.textContent ||
      card.querySelector('.memory-description')?.textContent || '';

    if (typeof modal.showModal === 'function') modal.showModal();
  });

  modal.querySelector('.memory-modal-close').addEventListener('click', () => modal.close());
  modal.addEventListener('click', event => {
    if (event.target === modal) modal.close();
  });

  update(0);
});
