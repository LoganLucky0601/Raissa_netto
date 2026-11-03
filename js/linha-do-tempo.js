(() => {
  const lista = document.querySelector(".trajetoria-lista");
  if (!lista || typeof trajetoria === "undefined" || !trajetoria.length) return;

  const criar = (tag, classe, texto) => {
    const elemento = document.createElement(tag);
    elemento.className = classe;
    elemento.textContent = texto;
    return elemento;
  };

  const formatarData = (data) => {
    const [ano, mes] = data.split("-");
    return mes ? `${mes}/${ano}` : ano;
  };

  const registros = [...trajetoria].sort((a, b) => b.inicio.localeCompare(a.inicio));
  for (const registro of registros) {
    const formacao = registro.tipo === "formacao";
    const item = criar("li", `trajetoria-item ${formacao ? "trajetoria-formacao" : "trajetoria-trabalho"}`, "");
    const ano = criar("span", "trajetoria-ano", registro.inicio.slice(0, 4));
    const card = criar("article", "journey-card trajetoria-card", "");
    const detalhes = formacao ? registro.nivel : registro.modalidade;
    const fim = registro.fim ? formatarData(registro.fim) : "Em andamento";

    card.append(
      criar("span", "journey-label", formacao ? "ESCOLARIDADE" : "EXPERIÊNCIA PROFISSIONAL"),
      criar("h3", "", registro.titulo),
      criar("p", "", registro.local),
      criar("p", "journey-note", `${formatarData(registro.inicio)} a ${fim}`)
    );
    if (detalhes) card.append(criar("p", "", detalhes));
    if (formacao && Number.isFinite(registro.horas) && registro.horas > 0) {
      const horas = registro.horas;
      const duracao = horas <= 40 ? "Curta duração" : horas <= 200 ? "Média duração" : horas <= 800 ? "Longa duração" : "";
      card.append(criar("p", "", duracao ? `${horas} h · ${duracao}` : `${horas} h`));
    }
    if (!formacao && registro.responsabilidades?.length) {
      const responsabilidades = criar("ul", "trajetoria-responsabilidades", "");
      for (const responsabilidade of registro.responsabilidades) {
        responsabilidades.append(criar("li", "", responsabilidade));
      }
      card.append(responsabilidades);
    }
    item.append(ano, card);
    lista.append(item);
  }
  document.querySelector(".trajetoria-vazia").hidden = true;
})();
