/* voltar-topo.js
   Interações da página. Os textos e as imagens são editados no index.html.
   Os seletores abaixo conectam os controles aos elementos do HTML.
*/
/* Faz a logo e o link do rodapé voltarem ao topo em qualquer situação. */
document // Executa esta parte da expressão ou da ação iniciada neste bloco.
  .querySelectorAll('.logo[href="#inicio"], .site-footer a[href="#inicio"]') // Localiza o elemento correspondente no HTML.
  .forEach((link) => { // Executa esta parte da expressão ou da ação iniciada neste bloco.
    // Responde ao evento deste controle.
    link.addEventListener("click", (evento) => { // Associa a ação ao evento deste elemento.
      evento.preventDefault(); // Executa esta parte da expressão ou da ação iniciada neste bloco.

      const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches; // Guarda reduzirMovimento para esta interação.

      window.scrollTo({ // Executa esta parte da expressão ou da ação iniciada neste bloco.
        top: 0, // Executa esta parte da expressão ou da ação iniciada neste bloco.
        left: 0, // Executa esta parte da expressão ou da ação iniciada neste bloco.
        behavior: reduzirMovimento ? "auto" : "smooth", // Executa esta parte da expressão ou da ação iniciada neste bloco.
      }); // Encerra o bloco ou a função acima.

      // Remove a âncora antiga para a navegação continuar consistente.
      if (window.location.hash) { // Verifica esta condição antes de continuar.
        window.history.replaceState(null, "", window.location.pathname + window.location.search); // Executa esta parte da expressão ou da ação iniciada neste bloco.
      } // Encerra o bloco ou a função acima.
    }); // Encerra o bloco ou a função acima.
  }); // Encerra o bloco ou a função acima.

