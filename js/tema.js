/* tema.js
   Interações da página. Os textos e as imagens são editados no index.html.
   Os seletores abaixo conectam os controles aos elementos do HTML.
*/
/* Alternância entre tema escuro e claro, com preferência salva no navegador. */
(() => {
  const botao = document.querySelector("#theme-toggle");
  if (!botao) return;

  const raiz = document.documentElement;
  const chave = "portfolio-tema";

  // Função lerPreferencia: executa esta etapa da interação.

  function lerPreferencia() {
    try {
      return localStorage.getItem(chave);
    } catch (erro) {
      return null;
    }
  }

  // Função salvarPreferencia: executa esta etapa da interação.

  function salvarPreferencia(tema) {
    try {
      localStorage.setItem(chave, tema);
    } catch (erro) {
      // O botão continua funcionando mesmo sem armazenamento.
    }
  }

  // Função aplicarTema: executa esta etapa da interação.

  function aplicarTema(tema) {
    const claro = tema === "light";
    raiz.dataset.theme = claro ? "light" : "dark";
    botao.setAttribute("aria-pressed", String(claro));
    botao.setAttribute("aria-label", claro ? "Ativar modo escuro" : "Ativar modo claro");
    botao.title = claro ? "Ativar modo escuro" : "Ativar modo claro";

    const texto = botao.querySelector(".theme-label");
    if (texto) texto.textContent = claro ? "Escuro" : "Claro";

    const cor = document.querySelector('meta[name="theme-color"]');
    if (cor) cor.content = claro ? "#f6f7fa" : "#0b0d12";
  }

  aplicarTema(lerPreferencia() === "light" ? "light" : "dark");

  // Responde ao evento deste controle.

  botao.addEventListener("click", () => {
    const novoTema = raiz.dataset.theme === "light" ? "dark" : "light";
    aplicarTema(novoTema);
    salvarPreferencia(novoTema);
  });
})();
