# Portfólio pessoal — Logan Lucky

Portfólio acadêmico de uma página desenvolvido com **HTML5 e CSS3**, inspirado na primeira versão do repositório [`Portifolio_pessoal`](https://github.com/LoganLucky0601/Portifolio_pessoal). O visual usa fundo escuro e detalhes laranja.

## Informações para preencher antes da entrega

- **Nome completo:** Logan Lucky *(confirme seu nome completo oficial)*
- **Turma:** `[PREENCHER TURMA]`
- **Repositório da entrega:** `[INSERIR LINK DO REPOSITÓRIO CHAMADO portfolio]`
- **Site publicado no GitHub Pages:** `[INSERIR LINK DO SITE PUBLICADO]`
- **E-mail:** substituir `loganlucky0629@gmail.com` no `index.html`.
- **LinkedIn:** substituir `https://www.linkedin.com/` pelo link do seu perfil.
- **Formação e experiências:** completar com dados verdadeiros; os textos atuais são genéricos.
- **Projetos 2–4:** exemplos *fictícios*, não projetos publicados; troque os links `mailto:` e as descrições quando tiver projetos reais.
- **Foto:** o arquivo `img/avatar.svg` é uma ilustração, não uma foto pessoal. Substitua por sua foto se quiser.

## Capturas de tela

Adicione capturas **reais** após abrir o site, nos tamanhos desktop e mobile, por exemplo:

![Versão desktop — adicionar captura real](docs/desktop.png)
![Versão mobile — adicionar captura real](docs/mobile.png)

> As imagens acima não estão incluídas inicialmente: crie `docs/desktop.png` e `docs/mobile.png` após testar o site.

## Onde usei CSS Grid (linhas e colunas)

- `.hero`: Grid de duas colunas com `grid-template-areas` (`intro` e `portrait`).
- `.about-layout`: apresentação Sobre mim em duas colunas.
- `.skills-grid`: cards de habilidades com `repeat()`, `fr` e `gap`.
- `.projects-grid`: galeria de quatro projetos em duas colunas, `repeat(2, minmax(0, 1fr))` e `gap`.
- `.journey-grid`: cards de formação e experiência.

## Onde usei Flexbox (alinhamento dos elementos)

- `.header-inner` e `.menu`: distribuição e alinhamento da navegação.
- `.hero-actions` e `.hero-tags`: botões e etiquetas em linha.
- `.project-card` e `.project-body`: imagem, título, texto e link em coluna, com link alinhado na base.
- `.contact-links`: alinhamento dos links de contato.
- `.footer-inner` e `.footer-inner nav`: rodapé e links rápidos.
- Nos breakpoints, Flexbox muda de **linha para coluna** quando a tela diminui.

## Responsividade e acessibilidade

- Breakpoints em **980px**, **680px** e **380px**.
- HTML semântico com `header`, `nav`, `main`, `section`, `article` e `footer`.
- Um único `h1`, imagens com `alt`, link para pular ao conteúdo, foco visível no teclado e suporte a redução de movimento.
- CSS externo em `css/style.css`, com variáveis `:root` e comentários por seção.

## Executar localmente

Abra `index.html` no navegador. O projeto não exige instalação de dependências.

## Publicar no GitHub Pages

1. Crie um repositório público chamado `portfolio` na sua conta.
2. Envie todos os arquivos do conteúdo desta pasta para a **raiz** do repositório.
3. No GitHub, acesse **Settings → Pages**.
4. Em **Build and deployment**, escolha **Deploy from a branch**, branch `main` e pasta `/ (root)`.
5. Salve e abra o endereço exibido no GitHub Pages. Confirme se imagens e links funcionam.
6. Faça pelo menos cinco commits *reais* e descritivos ao longo de sua edição, e registre os dois links no AVA.

## Uso de inteligência artificial

Foi utilizada inteligência artificial (ChatGPT, OpenAI) como apoio na elaboração e organização do HTML, do CSS, das imagens ilustrativas e da documentação. O conteúdo deve ser revisado, entendido e personalizado pelo estudante antes da entrega.

## Estrutura

```text
portfolio/
├── index.html
├── README.md
├── css/
│   └── style.css
└── img/
    ├── avatar.svg
    ├── projeto-1.jpg
    ├── projeto-2.jpg
    ├── projeto-3.jpg
    └── projeto-4.jpg
```

## Entendendo o código

O `index.html` contém o conteúdo do site. O `css/style.css` define as cores, os tamanhos, as colunas e os alinhamentos. Procure os comentários numerados no CSS para encontrar cada parte.
