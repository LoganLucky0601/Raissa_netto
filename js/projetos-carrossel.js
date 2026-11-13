/* projetos-carrossel.js
   Interações da página. Os textos e as imagens são editados no index.html.
   Os seletores abaixo conectam os controles aos elementos do HTML.
*/
(() => { // Executa esta parte da expressão ou da ação iniciada neste bloco.
  const carrossel = document.querySelector(".projects-carousel"); // Guarda carrossel para esta interação.
  const controles = document.querySelector(".projects-controls"); // Guarda controles para esta interação.
  if (!carrossel || !controles) return; // Verifica esta condição antes de continuar.

  const projetos = Array.from(carrossel.querySelectorAll(".project-card")); // Guarda projetos para esta interação.
  if (projetos.length < 2) return; // Verifica esta condição antes de continuar.

  const anterior = controles.querySelector('[data-step="-1"]'); // Guarda anterior para esta interação.
  const proximo = controles.querySelector('[data-step="1"]'); // Guarda proximo para esta interação.
  const posicao = controles.querySelector(".projects-position"); // Guarda posicao para esta interação.
  let atual = 0; // Guarda atual para esta interação.

  // Função distancia: executa esta etapa da interação.

  function distancia(projeto) { // Inicia esta função reutilizável.
    const quadro = carrossel.getBoundingClientRect(); // Guarda quadro para esta interação.
    const cartao = projeto.getBoundingClientRect(); // Guarda cartao para esta interação.
    return cartao.left - quadro.left; // Encerra esta etapa e devolve o resultado indicado.
  } // Encerra o bloco ou a função acima.

  // Função atualizar: executa esta etapa da interação.

  function atualizar() { // Inicia esta função reutilizável.
    atual = projetos.reduce( // Executa esta parte da expressão ou da ação iniciada neste bloco.
      (maisProximo, projeto, indice) => // Executa esta parte da expressão ou da ação iniciada neste bloco.
        Math.abs(distancia(projeto)) < Math.abs(distancia(projetos[maisProximo])) // Executa esta parte da expressão ou da ação iniciada neste bloco.
          ? indice // Executa esta parte da expressão ou da ação iniciada neste bloco.
          : maisProximo, // Executa esta parte da expressão ou da ação iniciada neste bloco.
      0, // Executa esta parte da expressão ou da ação iniciada neste bloco.
    ); // Encerra a chamada iniciada acima.
    projetos.forEach((projeto, indice) => projeto.classList.toggle("is-current", indice === atual)); // Atualiza as classes usadas na aparência do elemento.
    anterior.disabled = carrossel.scrollLeft <= 1; // Executa esta parte da expressão ou da ação iniciada neste bloco.
    proximo.disabled = carrossel.scrollLeft >= carrossel.scrollWidth - carrossel.clientWidth - 1; // Executa esta parte da expressão ou da ação iniciada neste bloco.
    const texto = (proximo.disabled ? projetos.length : atual + 1) + " de " + projetos.length; // Guarda texto para esta interação.
    if (posicao.textContent !== texto) posicao.textContent = texto; // Verifica esta condição antes de continuar.
  } // Encerra o bloco ou a função acima.

  // Função navegar: executa esta etapa da interação.

  function navegar(passo) { // Inicia esta função reutilizável.
    const projeto = projetos[atual + passo]; // Guarda projeto para esta interação.
    if (!projeto) return; // Verifica esta condição antes de continuar.
    const reduzirMovimento = matchMedia("(prefers-reduced-motion: reduce)").matches; // Guarda reduzirMovimento para esta interação.
    carrossel.scrollBy({ // Executa esta parte da expressão ou da ação iniciada neste bloco.
      left: distancia(projeto), // Executa esta parte da expressão ou da ação iniciada neste bloco.
      behavior: reduzirMovimento ? "instant" : "smooth", // Executa esta parte da expressão ou da ação iniciada neste bloco.
    }); // Encerra o bloco ou a função acima.
  } // Encerra o bloco ou a função acima.

  // Responde ao evento deste controle.

  anterior.addEventListener("click", () => navegar(-1)); // Associa a ação ao evento deste elemento.
  // Responde ao evento deste controle.
  proximo.addEventListener("click", () => navegar(1)); // Associa a ação ao evento deste elemento.
  // Responde ao evento deste controle.
  carrossel.addEventListener("scroll", atualizar, { passive: true }); // Associa a ação ao evento deste elemento.
  // Responde ao evento deste controle.
  window.addEventListener("resize", atualizar); // Associa a ação ao evento deste elemento.
  controles.hidden = false; // Executa esta parte da expressão ou da ação iniciada neste bloco.
  atualizar(); // Executa esta parte da expressão ou da ação iniciada neste bloco.
})(); // Encerra o bloco ou a função acima.

