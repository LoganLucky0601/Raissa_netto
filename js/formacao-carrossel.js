/* formacao-carrossel.js
   Interações da página. Os textos e as imagens são editados no index.html.
   Os seletores abaixo conectam os controles aos elementos do HTML.
*/
/* Carrosséis de formação e experiência.
   Cada grupo controla seus próprios cards e botões. */
document.querySelectorAll(".journey-group").forEach((grupo) => {
  const carrossel = grupo.querySelector(".journey-carousel");
  const controles = grupo.querySelector(".journey-controls");
  if (!carrossel || !controles) return;

  const cards = Array.from(carrossel.querySelectorAll(".journey-card"));
  if (cards.length < 2) return;

  const anterior = controles.querySelector('[data-step="-1"]');
  const proximo = controles.querySelector('[data-step="1"]');
  const contador = controles.querySelector(".journey-position");

  // Função distancia: executa esta etapa da interação.

  function distancia(card) {
    return card.getBoundingClientRect().left - carrossel.getBoundingClientRect().left;
  }

  // Função posicaoAtual: executa esta etapa da interação.

  function posicaoAtual() {
    return cards.reduce((maisProximo, card, indice) => {
      return Math.abs(distancia(card)) < Math.abs(distancia(cards[maisProximo]))
        ? indice
        : maisProximo;
    }, 0);
  }

  // Função atualizar: executa esta etapa da interação.

  function atualizar() {
    const atual = posicaoAtual();
    const noInicio = carrossel.scrollLeft <= 1;
    const noFim = carrossel.scrollLeft >= carrossel.scrollWidth - carrossel.clientWidth - 1;

    anterior.disabled = noInicio;
    proximo.disabled = noFim;
    cards.forEach((card, indice) => {
      card.classList.toggle("is-current", indice === atual);
    });

    contador.textContent = (noFim ? cards.length : atual + 1) + " de " + cards.length;
  }

  // Função navegar: executa esta etapa da interação.

  function navegar(passo) {
    const atual = posicaoAtual();
    const destino = cards[atual + passo];
    if (!destino) return;

    const movimentoReduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    carrossel.scrollBy({
      left: distancia(destino),
      behavior: movimentoReduzido ? "auto" : "smooth",
    });
  }

  // Responde ao evento deste controle.

  anterior.addEventListener("click", () => navegar(-1));
  // Responde ao evento deste controle.
  proximo.addEventListener("click", () => navegar(1));
  // Responde ao evento deste controle.
  carrossel.addEventListener("scroll", atualizar, { passive: true });
  // Responde ao evento deste controle.
  window.addEventListener("resize", atualizar);

  controles.hidden = false;
  atualizar();
});
