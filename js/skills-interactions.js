/* skills-interactions.js
   Interações da página. Os textos e as imagens são editados no index.html.
   Os seletores abaixo conectam os controles aos elementos do HTML.
*/
// Seleção visual acessível dos cards de habilidades (sem navegar ou alterar dados).
// Responde ao evento deste controle.
document.addEventListener("DOMContentLoaded", () => { // Associa a ação ao evento deste elemento.
  const cards = [...document.querySelectorAll("#habilidades .skill-card")]; // Guarda cards para esta interação.
  cards.forEach((card) => { // Executa esta parte da expressão ou da ação iniciada neste bloco.
    const label = card.querySelector("h3")?.textContent?.trim() || "Habilidade"; // Guarda label para esta interação.
    card.setAttribute("aria-label", "Destacar " + label); // Executa esta parte da expressão ou da ação iniciada neste bloco.
    const toggle = () => { // Guarda toggle para esta interação.
      const wasSelected = card.classList.contains("is-selected"); // Guarda wasSelected para esta interação.
      cards.forEach((other) => { // Executa esta parte da expressão ou da ação iniciada neste bloco.
        other.classList.remove("is-selected"); // Atualiza as classes usadas na aparência do elemento.
        other.setAttribute("aria-pressed", "false"); // Executa esta parte da expressão ou da ação iniciada neste bloco.
      }); // Encerra o bloco ou a função acima.
      if (!wasSelected) { // Verifica esta condição antes de continuar.
        card.classList.add("is-selected"); // Atualiza as classes usadas na aparência do elemento.
        card.setAttribute("aria-pressed", "true"); // Executa esta parte da expressão ou da ação iniciada neste bloco.
      } // Encerra o bloco ou a função acima.
    }; // Encerra o bloco ou a função acima.
    // Responde ao evento deste controle.
    card.addEventListener("click", toggle); // Associa a ação ao evento deste elemento.
    // Responde ao evento deste controle.
    card.addEventListener("keydown", (event) => { // Associa a ação ao evento deste elemento.
      if (event.key === "Enter" || event.key === " ") { // Verifica esta condição antes de continuar.
        event.preventDefault(); // Executa esta parte da expressão ou da ação iniciada neste bloco.
        toggle(); // Executa esta parte da expressão ou da ação iniciada neste bloco.
      } // Encerra o bloco ou a função acima.
    }); // Encerra o bloco ou a função acima.
  }); // Encerra o bloco ou a função acima.
}); // Encerra o bloco ou a função acima.

