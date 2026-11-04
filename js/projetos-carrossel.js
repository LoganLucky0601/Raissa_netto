(() => {
    const carrossel = document.querySelector(".projects-carousel");
    const controles = document.querySelector(".projects-controls");
    if (!carrossel || !controles) return;

    const projetos = Array.from(carrossel.querySelectorAll(".project-card"));
    if (projetos.length < 2) return;

    const anterior = controles.querySelector('[data-step="-1"]');
    const proximo = controles.querySelector('[data-step="1"]');
    const posicao = controles.querySelector(".projects-position");
    let atual = 0;

    function distancia(projeto) {
        const quadro = carrossel.getBoundingClientRect();
        const cartao = projeto.getBoundingClientRect();
        return cartao.left - quadro.left;
    }

    function atualizar() {
        atual = projetos.reduce((maisProximo, projeto, indice) =>
            Math.abs(distancia(projeto)) < Math.abs(distancia(projetos[maisProximo]))
                ? indice : maisProximo, 0);
        projetos.forEach((projeto, indice) => projeto.classList.toggle("is-current", indice === atual));
        anterior.disabled = carrossel.scrollLeft <= 1;
        proximo.disabled = carrossel.scrollLeft >= carrossel.scrollWidth - carrossel.clientWidth - 1;
        const texto = (proximo.disabled ? projetos.length : atual + 1) + " de " + projetos.length;
        if (posicao.textContent !== texto) posicao.textContent = texto;
    }

    function navegar(passo) {
        const projeto = projetos[atual + passo];
        if (!projeto) return;
        const reduzirMovimento = matchMedia("(prefers-reduced-motion: reduce)").matches;
        carrossel.scrollBy({ left: distancia(projeto), behavior: reduzirMovimento ? "instant" : "smooth" });
    }

    anterior.addEventListener("click", () => navegar(-1));
    proximo.addEventListener("click", () => navegar(1));
    carrossel.addEventListener("scroll", atualizar, { passive: true });
    window.addEventListener("resize", atualizar);
    controles.hidden = false;
    atualizar();
})();
