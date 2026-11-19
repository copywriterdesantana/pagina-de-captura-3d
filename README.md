# Página de captura em 3D · skill grátis para o Claude

Você responde 4 perguntas e o Claude te entrega uma página de captura com animação em 3D que conta a história da sua oferta enquanto a pessoa rola a tela. O botão leva para o seu WhatsApp, o seu formulário ou o seu checkout.

## As 4 perguntas

1. Quem é você e o que você vende?
2. Quem é o seu público e qual problema ele quer resolver agora?
3. O que a pessoa ganha quando clica no botão?
4. Para onde o botão leva e quais são as suas cores?

## O que você recebe

Uma pasta `pagina-3d/` com:
- `index.html`: a página inteira num arquivo só, pronta para subir em qualquer hospedagem;
- `conteudo.json`: todo o texto, as cores e a forma 3D, para ajustar e montar de novo.

A página tem topo com a promessa, a história em 3 a 5 cenas (uma por tela), 3 benefícios, 3 perguntas frequentes e o botão de novo no fim. O 3D fica visível o tempo todo, o texto fica sempre legível e tudo funciona primeiro no celular.

Três formas para escolher: **cristal**, **anel** e **ondas**.

Ela **não inventa prova**: depoimento, número ou prazo que você não informou vira um marcador para você preencher.

Veja um exemplo em [`exemplos/`](exemplos/): abra o `index.html` no navegador.

## Instalação

**No Claude Code**

Baixe este repositório e copie a pasta para a pasta de skills do Claude com o nome `pagina-de-captura-3d`:

- Windows: `%USERPROFILE%\.claude\skills\pagina-de-captura-3d`
- Mac e Linux: `~/.claude/skills/pagina-de-captura-3d`

A página é montada pelo `scripts/montar-pagina.js`, que usa o Node. Sem internet e sem instalar mais nada.

**No claude.ai**

Compacte a pasta num `.zip` e envie na área de Skills das configurações. Lá a página aparece como artifact, e você clica em **Publicar** para ter o link.

## Como usar

Peça do jeito que você falaria:

- "Cria uma página de captura em 3D para a minha aula grátis"
- "Quero uma página bonita para a minha isca, com botão para o WhatsApp"
- "Troca a forma para anel e deixa o título mais curto"

## Colocar no ar

É um arquivo só. Qualquer hospedagem de site estático serve: arrastar a pasta para o Netlify Drop, subir no GitHub Pages, ou colar no seu servidor.

## O que ela não faz

Não publica a página por você, não cria o formulário nem o checkout e não liga a página à sua ferramenta de e-mail.

## Versão completa

A skill monta a página. A versão completa é um app de páginas feito para o seu negócio: você troca o texto, escolhe o modelo e publica no seu domínio, sem mexer em código e sem precisar de mim a cada página nova.

Fale comigo no direct: [@copywriterdesantana](https://ig.me/m/copywriterdesantana).

## Licença

MIT. Pode usar, adaptar e distribuir, inclusive em projetos comerciais. Veja [`LICENSE`](LICENSE).

Feito por [@copywriterdesantana](https://instagram.com/copywriterdesantana).
