# Formato do conteudo.json

```json
{
  "tituloAba": "Texto que aparece na aba do navegador (opcional; se faltar, usa o título)",
  "link": "https://wa.me/55DDDNUMERO?text=Mensagem%20pronta",
  "fonte": "Sora",
  "forma": "cristal",
  "cores": { "fundo": "#0b0d12", "destaque": "#7c5cff", "destaque2": "#20c4a0", "texto": "#f3f4f7" },
  "topo": { "pretitulo": "...", "titulo": "...", "subtitulo": "...", "botao": "..." },
  "cenas": [ { "titulo": "...", "texto": "..." } ],
  "tituloBeneficios": "O que você leva",
  "beneficios": [ { "titulo": "...", "texto": "..." } ],
  "perguntas": [ { "pergunta": "...", "resposta": "..." } ],
  "fim": { "titulo": "...", "botao": "...", "urgencia": "" },
  "rodape": "Nome ou @ da pessoa"
}
```

O que o script exige (recusa se faltar):
- `link` começando com `https://`, `http://` ou `mailto:`;
- `topo.titulo`, `topo.subtitulo` e `topo.botao`;
- de 3 a 5 `cenas`, cada uma com `titulo` e `texto`;
- `fim.titulo` e `fim.botao`;
- cores no formato `#RRGGBB`, forma `cristal`, `anel` ou `ondas`, fonte só com letras, números e espaço.

O que ele só avisa: título com mais de 12 palavras, quantidade de benefícios ou perguntas diferente de 3, travessão no texto e marcadores `[...]` pendentes.

Link do WhatsApp: `https://wa.me/` + 55 + DDD + número, só dígitos. A mensagem pronta vai depois de `?text=`, com espaço trocado por `%20`.

Aspas dentro do texto precisam de barra antes: `"texto": "Você responde \"quanto custa?\" sem medo."`

O texto entra na página como texto puro: tag HTML escrita no JSON aparece como texto, não vira código.
