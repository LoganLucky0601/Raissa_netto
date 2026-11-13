/* formacao-carrossel.js
   Interações da página. Os textos e as imagens são editados no index.html.
   Os seletores abaixo conectam os controles aos elementos do HTML.
*/
/* Carrosséis de formação e experiência.
   Cada grupo controla seus próprios cards e botões. */
document.querySelectorAll(".journey-group").forEach((grupo) => { // Localiza o elemento correspondente no HTML.
  const carrossel = grupo.querySelector(".journey-carousel"); // Guarda carrossel para esta interação.
  const controles = grupo.querySelector(".journey-controls"); // Guarda controles para esta interação.
  if (!carrossel || !controles) return; // Verifica esta condição antes de continuar.

  const cards = Array.from(carrossel.querySelectorAll(".journey-card")); // Guarda cards para esta interação.
  if (cards.length < 2) return; // Verifica esta condição antes de continuar.

  const anterior = controles.querySelector('[data-step="-1"]'); // Guarda anterior para esta interação.
  const proximo = controles.querySelector('[data-step="1"]'); // Guarda proximo para esta interação.
  const contador = controles.querySelector(".journey-position"); // Guarda contador para esta interação.

  // Função distancia: executa esta etapa da interação.

  function distancia(card) { // Inicia esta função reutilizável.
    return card.getBoundingClientRect().left - carrossel.getBoundingClientRect().left; // Encerra esta etapa e devolve o resultado indicado.
  } // Encerra o bloco ou a função acima.

  // Função posicaoAtual: executa esta etapa da interação.

  function posicaoAtual() { // Inicia esta função reutilizável.
    return cards.reduce((maisProximo, card, indice) => { // Encerra esta etapa e devolve o resultado indicado.
      return Math.abs(distancia(card)) < Math.abs(distancia(cards[maisProximo])) // Encerra esta etapa e devolve o resultado indicado.
        ? indice // Executa esta parte da expressão ou da ação iniciada neste bloco.
        : maisProximo; // Executa esta parte da expressão ou da ação iniciada neste bloco.
    }, 0); // Encerra o bloco ou a função acima.
  } // Encerra o bloco ou a função acima.

  // Função atualizar: executa esta etapa da interação.

  function atualizar() { // Inicia esta função reutilizável.
    const atual = posicaoAtual(); // Guarda atual para esta interação.
    const noInicio = carrossel.scrollLeft <= 1; // Guarda noInicio para esta interação.
    const noFim = carrossel.scrollLeft >= carrossel.scrollWidth - carrossel.clientWidth - 1; // Guarda noFim para esta interação.

    anterior.disabled = noInicio; // Executa esta parte da expressão ou da ação iniciada neste bloco.
    proximo.disabled = noFim; // Executa esta parte da expressão ou da ação iniciada neste bloco.
    cards.forEach((card, indice) => { // Executa esta parte da expressão ou da ação iniciada neste bloco.
      card.classList.toggle("is-current", indice === atual); // Atualiza as classes usadas na aparência do elemento.
    }); // Encerra o bloco ou a função acima.

    contador.textContent = (noFim ? cards.length : atual + 1) + " de " + cards.length; // Atualiza o conteúdo exibido na página.
  } // Encerra o bloco ou a função acima.

  // Função navegar: executa esta etapa da interação.

  function navegar(passo) { // Inicia esta função reutilizável.
    const atual = posicaoAtual(); // Guarda atual para esta interação.
    const destino = cards[atual + passo]; // Guarda destino para esta interação.
    if (!destino) return; // Verifica esta condição antes de continuar.

    const movimentoReduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches; // Guarda movimentoReduzido para esta interação.

    carrossel.scrollBy({ // Executa esta parte da expressão ou da ação iniciada neste bloco.
      left: distancia(destino), // Executa esta parte da expressão ou da ação iniciada neste bloco.
      behavior: movimentoReduzido ? "auto" : "smooth", // Executa esta parte da expressão ou da ação iniciada neste bloco.
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
}); // Encerra o bloco ou a função acima.

