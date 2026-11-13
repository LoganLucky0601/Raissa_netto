/* voltar-topo.js
   Interações da página. Os textos e as imagens são editados no index.html.
   Os seletores abaixo conectam os controles aos elementos do HTML.
*/
/* Faz a logo e o link do rodapé voltarem ao topo em qualquer situação. */
document
  .querySelectorAll('.logo[href="#inicio"], .site-footer a[href="#inicio"]')
  .forEach((link) => {
    // Responde ao evento deste controle.
    link.addEventListener("click", (evento) => {
      evento.preventDefault();

      const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: reduzirMovimento ? "auto" : "smooth",
      });

      // Remove a âncora antiga para a navegação continuar consistente.
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    });
  });
