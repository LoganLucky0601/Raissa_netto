/* galeria.js
   Interações da página. Os textos e as imagens são editados no index.html.
   Os seletores abaixo conectam os controles aos elementos do HTML.
*/
// Instantes congelados: fotos, títulos, categorias e legendas ficam no index.html.
// Este arquivo controla apenas as interações do carrossel e a ampliação das imagens.
// Responde ao evento deste controle.
document.addEventListener("DOMContentLoaded", () => { // Associa a ação ao evento deste elemento.
  const track = document.querySelector("#memories-track"); // Guarda track para esta interação.
  const modal = document.querySelector("#memory-modal"); // Guarda modal para esta interação.
  if (!track || !modal) return; // Verifica esta condição antes de continuar.

  const cards = [...track.querySelectorAll(".memory-card")]; // Guarda cards para esta interação.
  if (!cards.length) return; // Verifica esta condição antes de continuar.
  const dots = document.querySelector("#memories-dots"); // Guarda dots para esta interação.
  const count = document.querySelector("#memories-count"); // Guarda count para esta interação.
  const prev = document.querySelector("#memories-prev"); // Guarda prev para esta interação.
  const next = document.querySelector("#memories-next"); // Guarda next para esta interação.
  if (!dots || !count || !prev || !next) return; // Verifica esta condição antes de continuar.

  // Exibe o espaço reservado caso a foto ainda não esteja na pasta do projeto.
  // Função prepareImages: executa esta etapa da interação.
  function prepareImages(container) { // Inicia esta função reutilizável.
    container.querySelectorAll(".memory-media img").forEach((img) => { // Localiza o elemento correspondente no HTML.
      const ready = () => img.parentElement?.classList.add("has-image"); // Guarda ready para esta interação.
      const failed = () => { // Guarda failed para esta interação.
        img.parentElement?.classList.remove("has-image"); // Atualiza as classes usadas na aparência do elemento.
        img.remove(); // Executa esta parte da expressão ou da ação iniciada neste bloco.
      }; // Encerra o bloco ou a função acima.
      // Responde ao evento deste controle.
      img.addEventListener("load", ready, { once: true }); // Associa a ação ao evento deste elemento.
      // Responde ao evento deste controle.
      img.addEventListener("error", failed, { once: true }); // Associa a ação ao evento deste elemento.
      if (img.complete) { // Verifica esta condição antes de continuar.
        if (img.naturalWidth) ready(); // Verifica esta condição antes de continuar.
        else failed(); // Executa a alternativa à condição anterior.
      } // Encerra o bloco ou a função acima.
    }); // Encerra o bloco ou a função acima.
  } // Encerra o bloco ou a função acima.
  prepareImages(track); // Executa esta parte da expressão ou da ação iniciada neste bloco.

  dots.innerHTML = cards // Atualiza o conteúdo exibido na página.
    .map( // Executa esta parte da expressão ou da ação iniciada neste bloco.
      (_, i) => // Executa esta parte da expressão ou da ação iniciada neste bloco.
        '<button type="button" class="memories-dot" data-index="' + // Executa esta parte da expressão ou da ação iniciada neste bloco.
        i + // Executa esta parte da expressão ou da ação iniciada neste bloco.
        '" aria-label="Ir para fotografia ' + // Executa esta parte da expressão ou da ação iniciada neste bloco.
        (i + 1) + // Executa esta parte da expressão ou da ação iniciada neste bloco.
        '"></button>', // Executa esta parte da expressão ou da ação iniciada neste bloco.
    ) // Encerra a chamada iniciada acima.
    .join(""); // Executa esta parte da expressão ou da ação iniciada neste bloco.

  const dotButtons = [...dots.querySelectorAll(".memories-dot")]; // Guarda dotButtons para esta interação.
  let current = 0; // Guarda current para esta interação.

  // Função update: executa esta etapa da interação.

  function update(index) { // Inicia esta função reutilizável.
    current = Math.max(0, Math.min(cards.length - 1, index)); // Executa esta parte da expressão ou da ação iniciada neste bloco.
    count.textContent = // Atualiza o conteúdo exibido na página.
      String(current + 1).padStart(2, "0") + " / " + String(cards.length).padStart(2, "0"); // Executa esta parte da expressão ou da ação iniciada neste bloco.
    dotButtons.forEach((dot, i) => dot.setAttribute("aria-current", String(i === current))); // Executa esta parte da expressão ou da ação iniciada neste bloco.
    prev.disabled = current === 0; // Executa esta parte da expressão ou da ação iniciada neste bloco.
    next.disabled = current === cards.length - 1; // Executa esta parte da expressão ou da ação iniciada neste bloco.
  } // Encerra o bloco ou a função acima.

  // Função go: executa esta etapa da interação.

  function go(index) { // Inicia esta função reutilizável.
    const nextIndex = Math.max(0, Math.min(cards.length - 1, index)); // Guarda nextIndex para esta interação.
    track.scrollTo({ // Executa esta parte da expressão ou da ação iniciada neste bloco.
      left: cards[nextIndex].offsetLeft - cards[0].offsetLeft, // Executa esta parte da expressão ou da ação iniciada neste bloco.
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", // Executa esta parte da expressão ou da ação iniciada neste bloco.
    }); // Encerra o bloco ou a função acima.
    update(nextIndex); // Executa esta parte da expressão ou da ação iniciada neste bloco.
  } // Encerra o bloco ou a função acima.

  // Responde ao evento deste controle.

  prev.addEventListener("click", () => go(current - 1)); // Associa a ação ao evento deste elemento.
  // Responde ao evento deste controle.
  next.addEventListener("click", () => go(current + 1)); // Associa a ação ao evento deste elemento.
  // Responde ao evento deste controle.
  dots.addEventListener("click", (event) => { // Associa a ação ao evento deste elemento.
    const button = event.target.closest("[data-index]"); // Guarda button para esta interação.
    if (button) go(Number(button.dataset.index)); // Verifica esta condição antes de continuar.
  }); // Encerra o bloco ou a função acima.

  // Responde ao evento deste controle.

  track.addEventListener( // Associa a ação ao evento deste elemento.
    "scroll", // Executa esta parte da expressão ou da ação iniciada neste bloco.
    () => { // Executa esta parte da expressão ou da ação iniciada neste bloco.
      const left = track.scrollLeft; // Guarda left para esta interação.
      let nearest = 0; // Guarda nearest para esta interação.
      let distance = Infinity; // Guarda distance para esta interação.
      cards.forEach((card, i) => { // Executa esta parte da expressão ou da ação iniciada neste bloco.
        const difference = Math.abs(card.offsetLeft - cards[0].offsetLeft - left); // Guarda difference para esta interação.
        if (difference < distance) { // Verifica esta condição antes de continuar.
          nearest = i; // Executa esta parte da expressão ou da ação iniciada neste bloco.
          distance = difference; // Executa esta parte da expressão ou da ação iniciada neste bloco.
        } // Encerra o bloco ou a função acima.
      }); // Encerra o bloco ou a função acima.
      update(nearest); // Executa esta parte da expressão ou da ação iniciada neste bloco.
    }, // Encerra o bloco ou a função acima.
    { passive: true }, // Executa esta parte da expressão ou da ação iniciada neste bloco.
  ); // Encerra a chamada iniciada acima.

  // Responde ao evento deste controle.

  track.addEventListener("click", (event) => { // Associa a ação ao evento deste elemento.
    const button = event.target.closest(".memory-open"); // Guarda button para esta interação.
    if (!button) return; // Verifica esta condição antes de continuar.
    const card = button.closest(".memory-card"); // Guarda card para esta interação.
    const originalMedia = card?.querySelector(".memory-media"); // Guarda originalMedia para esta interação.
    if (!originalMedia) return; // Verifica esta condição antes de continuar.

    const expandedMedia = modal.querySelector(".memory-modal-media"); // Guarda expandedMedia para esta interação.
    expandedMedia.replaceChildren( // Executa esta parte da expressão ou da ação iniciada neste bloco.
      ...[...originalMedia.children].map((node) => node.cloneNode(true)), // Executa esta parte da expressão ou da ação iniciada neste bloco.
    ); // Encerra a chamada iniciada acima.
    prepareImages(modal); // Executa esta parte da expressão ou da ação iniciada neste bloco.
    modal.querySelector(".memory-modal-category").textContent = // Localiza o elemento correspondente no HTML.
      card.querySelector(".memory-category")?.textContent || ""; // Localiza o elemento correspondente no HTML.
    modal.querySelector(".memory-modal-title").textContent = // Localiza o elemento correspondente no HTML.
      card.querySelector("h3")?.textContent || ""; // Localiza o elemento correspondente no HTML.
    modal.querySelector(".memory-modal-description").textContent = // Localiza o elemento correspondente no HTML.
      card.querySelector(".memory-detail")?.textContent || // Localiza o elemento correspondente no HTML.
      card.querySelector(".memory-description")?.textContent || // Localiza o elemento correspondente no HTML.
      ""; // Executa esta parte da expressão ou da ação iniciada neste bloco.

    if (typeof modal.showModal === "function") modal.showModal(); // Verifica esta condição antes de continuar.
  }); // Encerra o bloco ou a função acima.

  modal // Executa esta parte da expressão ou da ação iniciada neste bloco.
    .querySelector(".memory-modal-close") // Localiza o elemento correspondente no HTML.
    // Responde ao evento deste controle.
    .addEventListener("click", () => modal.close()); // Associa a ação ao evento deste elemento.
  // Responde ao evento deste controle.
  modal.addEventListener("click", (event) => { // Associa a ação ao evento deste elemento.
    if (event.target === modal) modal.close(); // Verifica esta condição antes de continuar.
  }); // Encerra o bloco ou a função acima.

  update(0); // Executa esta parte da expressão ou da ação iniciada neste bloco.
}); // Encerra o bloco ou a função acima.

