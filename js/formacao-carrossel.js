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

    function distancia(card) {
        return card.getBoundingClientRect().left -
               carrossel.getBoundingClientRect().left;
    }

    function posicaoAtual() {
        return cards.reduce((maisProximo, card, indice) => {
            return Math.abs(distancia(card)) < Math.abs(distancia(cards[maisProximo]))
                ? indice : maisProximo;
        }, 0);
    }

    function atualizar() {
        const atual = posicaoAtual();
        const noInicio = carrossel.scrollLeft <= 1;
        const noFim = carrossel.scrollLeft >=
                      carrossel.scrollWidth - carrossel.clientWidth - 1;

        anterior.disabled = noInicio;
        proximo.disabled = noFim;
        cards.forEach((card, indice) => {
            card.classList.toggle("is-current", indice === atual);
        });

        contador.textContent = (noFim ? cards.length : atual + 1) +
                               " de " + cards.length;
    }

    function navegar(passo) {
        const atual = posicaoAtual();
        const destino = cards[atual + passo];
        if (!destino) return;

        const movimentoReduzido = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        carrossel.scrollBy({
            left: distancia(destino),
            behavior: movimentoReduzido ? "auto" : "smooth"
        });
    }

    anterior.addEventListener("click", () => navegar(-1));
    proximo.addEventListener("click", () => navegar(1));
    carrossel.addEventListener("scroll", atualizar, { passive: true });
    window.addEventListener("resize", atualizar);

    controles.hidden = false;
    atualizar();
});
