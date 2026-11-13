/* tema.js
   Interações da página. Os textos e as imagens são editados no index.html.
   Os seletores abaixo conectam os controles aos elementos do HTML.
*/
/* Alternância entre tema escuro e claro, com preferência salva no navegador. */
(() => { // Executa esta parte da expressão ou da ação iniciada neste bloco.
  const botao = document.querySelector("#theme-toggle"); // Guarda botao para esta interação.
  if (!botao) return; // Verifica esta condição antes de continuar.

  const raiz = document.documentElement; // Guarda raiz para esta interação.
  const chave = "portfolio-tema"; // Guarda chave para esta interação.

  // Função lerPreferencia: executa esta etapa da interação.

  function lerPreferencia() { // Inicia esta função reutilizável.
    try { // Executa esta parte da expressão ou da ação iniciada neste bloco.
      return localStorage.getItem(chave); // Encerra esta etapa e devolve o resultado indicado.
    } catch (erro) { // Encerra o bloco ou a função acima.
      return null; // Encerra esta etapa e devolve o resultado indicado.
    } // Encerra o bloco ou a função acima.
  } // Encerra o bloco ou a função acima.

  // Função salvarPreferencia: executa esta etapa da interação.

  function salvarPreferencia(tema) { // Inicia esta função reutilizável.
    try { // Executa esta parte da expressão ou da ação iniciada neste bloco.
      localStorage.setItem(chave, tema); // Executa esta parte da expressão ou da ação iniciada neste bloco.
    } catch (erro) { // Encerra o bloco ou a função acima.
      // O botão continua funcionando mesmo sem armazenamento.
    } // Encerra o bloco ou a função acima.
  } // Encerra o bloco ou a função acima.

  // Função aplicarTema: executa esta etapa da interação.

  function aplicarTema(tema) { // Inicia esta função reutilizável.
    const claro = tema === "light"; // Guarda claro para esta interação.
    raiz.dataset.theme = claro ? "light" : "dark"; // Executa esta parte da expressão ou da ação iniciada neste bloco.
    botao.setAttribute("aria-pressed", String(claro)); // Executa esta parte da expressão ou da ação iniciada neste bloco.
    botao.setAttribute("aria-label", claro ? "Ativar modo escuro" : "Ativar modo claro"); // Executa esta parte da expressão ou da ação iniciada neste bloco.
    botao.title = claro ? "Ativar modo escuro" : "Ativar modo claro"; // Executa esta parte da expressão ou da ação iniciada neste bloco.

    const texto = botao.querySelector(".theme-label"); // Guarda texto para esta interação.
    if (texto) texto.textContent = claro ? "Escuro" : "Claro"; // Verifica esta condição antes de continuar.

    const cor = document.querySelector('meta[name="theme-color"]'); // Guarda cor para esta interação.
    if (cor) cor.content = claro ? "#f6f7fa" : "#0b0d12"; // Verifica esta condição antes de continuar.
  } // Encerra o bloco ou a função acima.

  aplicarTema(lerPreferencia() === "light" ? "light" : "dark"); // Executa esta parte da expressão ou da ação iniciada neste bloco.

  // Responde ao evento deste controle.

  botao.addEventListener("click", () => { // Associa a ação ao evento deste elemento.
    const novoTema = raiz.dataset.theme === "light" ? "dark" : "light"; // Guarda novoTema para esta interação.
    aplicarTema(novoTema); // Executa esta parte da expressão ou da ação iniciada neste bloco.
    salvarPreferencia(novoTema); // Executa esta parte da expressão ou da ação iniciada neste bloco.
  }); // Encerra o bloco ou a função acima.
})(); // Encerra o bloco ou a função acima.

