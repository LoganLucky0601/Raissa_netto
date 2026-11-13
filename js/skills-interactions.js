// Seleção visual acessível dos cards de habilidades (sem navegar ou alterar dados).
document.addEventListener('DOMContentLoaded', () => {
  const cards = [...document.querySelectorAll('#habilidades .skill-card')];
  cards.forEach(card => {
    const label = card.querySelector('h3')?.textContent?.trim() || 'Habilidade';
    card.setAttribute('aria-label', 'Destacar ' + label);
    const toggle = () => {
      const wasSelected = card.classList.contains('is-selected');
      cards.forEach(other => {
        other.classList.remove('is-selected');
        other.setAttribute('aria-pressed', 'false');
      });
      if (!wasSelected) {
        card.classList.add('is-selected');
        card.setAttribute('aria-pressed', 'true');
      }
    };
    card.addEventListener('click', toggle);
    card.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggle();
      }
    });
  });
});
