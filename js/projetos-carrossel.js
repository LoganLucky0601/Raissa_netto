/* projetos-carrossel.js
   Interações da página. Os textos e as imagens são editados no index.html.
   Os seletores abaixo conectam os controles aos elementos do HTML.
*/
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

  // Função distancia: executa esta etapa da interação.

  function distancia(projeto) {
    const quadro = carrossel.getBoundingClientRect();
    const cartao = projeto.getBoundingClientRect();
    return cartao.left - quadro.left;
  }

  // Função atualizar: executa esta etapa da interação.

  function atualizar() {
    atual = projetos.reduce(
      (maisProximo, projeto, indice) =>
        Math.abs(distancia(projeto)) < Math.abs(distancia(projetos[maisProximo]))
          ? indice
          : maisProximo,
      0,
    );
    projetos.forEach((projeto, indice) => projeto.classList.toggle("is-current", indice === atual));
    anterior.disabled = carrossel.scrollLeft <= 1;
    proximo.disabled = carrossel.scrollLeft >= carrossel.scrollWidth - carrossel.clientWidth - 1;
    const texto = (proximo.disabled ? projetos.length : atual + 1) + " de " + projetos.length;
    if (posicao.textContent !== texto) posicao.textContent = texto;
  }

  // Função navegar: executa esta etapa da interação.

  function navegar(passo) {
    const projeto = projetos[atual + passo];
    if (!projeto) return;
    const reduzirMovimento = matchMedia("(prefers-reduced-motion: reduce)").matches;
    carrossel.scrollBy({
      left: distancia(projeto),
      behavior: reduzirMovimento ? "instant" : "smooth",
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
})();
