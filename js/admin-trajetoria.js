(() => {
  const url = "https://rktomfeerscfgrlpwwke.supabase.co";
  const chave = "sb_publishable_eH1ZfBkzd8zGwMmg1wHPlQ_bOn8oaVF";
  const login = document.querySelector("#login");
  const acesso = document.querySelector("#acesso");
  const redefinir = document.querySelector("#redefinir");
  const painel = document.querySelector("#painel");
  const formulario = document.querySelector("#registro");
  const lista = document.querySelector("#registros");
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
  }

  function sair() {
    token = "";
    lista.replaceChildren();
    painel.hidden = true;
    acesso.hidden = false;
    redefinir.hidden = true;
    login.hidden = false;
    novo();
  }

  const tabela = "/rest/v1/trajetoria";
  async function atualizar() {
    const registros = await requisicao(tabela + "?select=*&order=inicio.desc,id.asc");
    lista.replaceChildren();
    for (const registro of registros) {
      const item = document.createElement("li");
      item.textContent = registro.titulo + (registro.publicado ? " · Publicado " : " · Rascunho ");
      const editar = document.createElement("button");
      editar.textContent = "Editar";
      editar.onclick = () => {
        if (ocupado) return;
        editando = registro.id;
        modo.textContent = "Editar registro";
        for (const campo of Object.keys({"tipo":"<select name=\"tipo\"><option value=\"formacao\">Formação</option><option value=\"trabalho\">Trabalho</option></select>","titulo":"<input name=\"titulo\" required>","local":"<input name=\"local\" required>","inicio":"<input name=\"inicio\" type=\"date\" required>","fim":"<input name=\"fim\" type=\"date\">","nivel":"<input name=\"nivel\">","horas":"<input name=\"horas\" type=\"number\" min=\"1\">","modalidade":"<select name=\"modalidade\"><option value=\"\">Selecione</option><option>Formal (CLT)</option><option>Informal</option><option>PJ</option><option>Autônomo e Freelancer</option><option>Trabalho Temporário</option><option>Estágio</option><option>Voluntário</option></select>","responsabilidades":"<textarea name=\"responsabilidades\"></textarea>","publicado":"<input name=\"publicado\" type=\"checkbox\">"})) {
          const controle = formulario.elements.namedItem(campo);
          if (campo === "publicado") controle.checked = registro.publicado;
          else if (campo === "responsabilidades") controle.value = registro.responsabilidades.join("\n");
          else controle.value = registro[campo] ?? "";
        }
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
      lista.append(item);
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