(() => {
  const url = "https://rktomfeerscfgrlpwwke.supabase.co";
  const chave = "sb_publishable_eH1ZfBkzd8zGwMmg1wHPlQ_bOn8oaVF";
  const login = document.querySelector("#login");
  const acesso = document.querySelector("#acesso");
  const redefinir = document.querySelector("#redefinir");
  const painel = document.querySelector("#painel");
  const formulario = document.querySelector("#registro");
  const listas = {
    formacao: document.querySelector("#formacao"),
    trabalho: document.querySelector("#trabalho")
  };
  const tipo = formulario.elements.namedItem("tipo");
  const horas = formulario.elements.namedItem("horas");
  const camposPorTipo = formulario.querySelectorAll("[data-tipo]");

  function atualizarDuracao() {
    const carga = horas.valueAsNumber;
    document.querySelector("#duracao").textContent =
      !(carga > 0) ? "" : carga <= 40 ? "Curta duração" :
      carga <= 200 ? "Média duração" : carga <= 800 ? "Longa duração" : "Acima de 800 h";
  }

  function atualizarCampos() {
    const formacao = tipo.value === "formacao";
    document.querySelector("#rotulo-titulo").textContent = formacao ? "Nome do curso" : "Cargo ou função";
    document.querySelector("#rotulo-local").textContent = formacao ? "Nome da instituição" : "Nome da empresa";
    for (const campo of camposPorTipo) {
      campo.hidden = campo.dataset.tipo !== tipo.value;
      campo.querySelector("input, select, textarea").disabled = campo.hidden;
    }
    atualizarDuracao();
  }

  tipo.addEventListener("change", atualizarCampos);
  horas.addEventListener("input", atualizarDuracao);
  atualizarCampos();
  const status = document.querySelector("#status");
  const modo = document.querySelector("#modo");
  let token = "";
  let editando = null;
  let ocupado = false;

  async function requisicao(caminho, metodo = "GET", dados) {
    const headers = { apikey: chave, "Content-Type": "application/json" };
    if (token) headers.Authorization = "Bearer " + token;
    if (caminho.startsWith("/rest/") && metodo !== "GET") headers.Prefer = "return=representation";
    const resposta = await fetch(url + caminho, { method: metodo, headers, body: JSON.stringify(dados) });
    if (resposta.status === 401 && token) {
      sair();
      throw new Error("Sessão expirada. Entre novamente.");
    }
    if (resposta.status === 400 && caminho.startsWith("/auth/v1/token")) throw new Error("Confira o e-mail e a senha ou use Esqueci minha senha.");
    if (!resposta.ok) throw new Error("Não foi possível concluir a operação. Confira os dados e tente novamente.");
    return resposta.json();
  }

  async function executar(acao) {
    if (ocupado) return;
    ocupado = true;
    status.textContent = "Aguarde…";
    try {
      status.textContent = await acao();
    } catch (erro) {
      status.textContent = erro.message;
    } finally {
      ocupado = false;
    }
  }

  function novo() {
    editando = null;
    formulario.reset();
    modo.textContent = "Novo registro";
    atualizarCampos();
  }

  function sair() {
    token = "";
    Object.values(listas).forEach(lista => lista.replaceChildren());
    painel.hidden = true;
    acesso.hidden = false;
    redefinir.hidden = true;
    login.hidden = false;
    novo();
  }

  const tabela = "/rest/v1/trajetoria";
  async function atualizar() {
    const registros = await requisicao(tabela + "?select=*&order=inicio.desc,id.asc");
    Object.values(listas).forEach(lista => lista.replaceChildren());
    for (const registro of registros) {
      const item = document.createElement("li");
      item.textContent = registro.titulo + (registro.publicado ? " · Publicado " : " · Rascunho ");
      const editar = document.createElement("button");
      editar.textContent = "Editar";
      editar.onclick = () => {
        if (ocupado) return;
        editando = registro.id;
        modo.textContent = "Editar registro";
        for (const campo of ["tipo","titulo","local","inicio","fim","nivel","horas","modalidade","responsabilidades","publicado"]) {
          const controle = formulario.elements.namedItem(campo);
          if (campo === "publicado") controle.checked = registro.publicado;
          else if (campo === "responsabilidades") controle.value = registro.responsabilidades.join("\n");
          else controle.value = registro[campo] ?? "";
        }
        atualizarCampos();
        formulario.elements.namedItem("titulo").focus();
      };
      const remover = document.createElement("button");
      remover.textContent = "Excluir";
      remover.onclick = () => {
        if (ocupado || !confirm("Excluir este registro?")) return;
        executar(async () => {
          const resultado = await requisicao(tabela + "?id=eq." + registro.id, "DELETE");
          if (!resultado.length) throw new Error("Registro indisponível. Atualize a lista.");
          if (editando === registro.id) novo();
          await atualizar();
          return "Registro excluído.";
        });
      };
      item.append(editar, " ", remover);
      listas[registro.tipo].append(item);
    }
  }

  login.onsubmit = (evento) => {
    evento.preventDefault();
    executar(async () => {
      const dados = Object.fromEntries(new FormData(login));
      try {
        const sessao = await requisicao("/auth/v1/token?grant_type=password", "POST", dados);
        if (sessao.user.app_metadata.portfolio_admin !== true) throw new Error("Esta conta não tem acesso ao painel.");
        token = sessao.access_token;
        await atualizar();
        login.hidden = true;
        painel.hidden = false;
        acesso.hidden = true;
        return "Sessão iniciada.";
      } catch (erro) {
        sair();
        throw erro;
      } finally {
        login.reset();
      }
    });
  };

  const email = login.elements.namedItem("email");
  document.querySelector("#recuperar").onclick = () => {
    if (!email.reportValidity()) return;
    executar(async () => {
      const destino = window.location.origin + window.location.pathname;
      await requisicao("/auth/v1/recover?redirect_to=" + encodeURIComponent(destino), "POST", { email: email.value.trim() });
      return "Confira sua caixa de entrada e o spam para redefinir a senha.";
    });
  };

  const retorno = new URLSearchParams(window.location.hash.slice(1));
  if (retorno.get("type") === "recovery" && retorno.has("access_token")) {
    token = retorno.get("access_token");
    history.replaceState(null, "", window.location.pathname + window.location.search);
    login.hidden = true;
    redefinir.hidden = false;
    status.textContent = "Defina sua nova senha.";
  }

  if (retorno.has("error")) {
    history.replaceState(null, "", window.location.pathname + window.location.search);
    status.textContent = "O acesso não foi concluído. Tente entrar novamente.";
  }

  redefinir.onsubmit = (evento) => {
    evento.preventDefault();
    executar(async () => {
      const dados = new FormData(redefinir);
      if (dados.get("senha") !== dados.get("confirmacao")) throw new Error("As senhas precisam ser iguais.");
      await requisicao("/auth/v1/user", "PUT", { password: dados.get("senha") });
      redefinir.reset();
      sair();
      return "Senha atualizada. Entre com a nova senha.";
    });
  };

  formulario.onsubmit = (evento) => {
    evento.preventDefault();
    executar(async () => {
      const dados = Object.fromEntries(new FormData(formulario));
      dados.fim ||= null;
      if (dados.fim && dados.fim < dados.inicio) throw new Error("A data final deve ser igual ou posterior ao início.");
      dados.publicado = formulario.elements.namedItem("publicado").checked;
      const formacao = dados.tipo === "formacao";
      dados.nivel = formacao ? dados.nivel.trim() || null : null;
      dados.horas = formacao && dados.horas ? Number(dados.horas) : null;
      dados.modalidade = formacao ? null : dados.modalidade || null;
      dados.responsabilidades = formacao ? [] : dados.responsabilidades.split("\n").map(linha => linha.trim()).filter(Boolean);
      const resultado = await requisicao(editando ? tabela + "?id=eq." + editando : tabela, editando ? "PATCH" : "POST", dados);
      if (!resultado.length) throw new Error("Registro indisponível. Atualize a lista.");
      novo();
      await atualizar();
      return "Registro salvo.";
    });
  };
  document.querySelector("#novo").onclick = () => { if (!ocupado) novo(); };
  document.querySelector("#sair").onclick = () => { if (!ocupado) { sair(); status.textContent = "Sessão encerrada nesta página."; } };
})();