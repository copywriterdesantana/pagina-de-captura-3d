#!/usr/bin/env node
// Monta a página de captura em 3D a partir de um conteudo.json.
// Uso: node montar-pagina.js conteudo.json [--saida pagina-3d/index.html]
// Confere os campos, avisa o que falta e grava um único arquivo HTML. Não usa internet.

const fs = require('fs');
const path = require('path');

const a = process.argv.slice(2);
let entrada = null, saida = null;
for (let i = 0; i < a.length; i++) {
  if (a[i] === '--saida') saida = a[++i];
  else if (!entrada) entrada = a[i];
}
if (!entrada) {
  console.error('Uso: node montar-pagina.js conteudo.json [--saida pagina-3d/index.html]');
  process.exit(1);
}
entrada = path.resolve(entrada);
saida = path.resolve(saida || path.join(path.dirname(entrada), 'index.html'));

let P;
try { P = JSON.parse(fs.readFileSync(entrada, 'utf8')); }
catch (e) { console.error('O conteudo.json não é um JSON válido: ' + e.message); process.exit(1); }

const erros = [], avisos = [];
const txt = (v) => typeof v === 'string' && v.trim().length > 0;
const cor = (v) => typeof v === 'string' && /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(v);

if (!txt(P.link) || !/^(https:\/\/|http:\/\/|mailto:)/i.test(P.link)) erros.push('link: precisa começar com https:// (WhatsApp: https://wa.me/55...), http:// ou mailto:');
if (!P.topo || !txt(P.topo.titulo)) erros.push('topo.titulo está vazio');
if (!P.topo || !txt(P.topo.subtitulo)) erros.push('topo.subtitulo está vazio');
if (!P.topo || !txt(P.topo.botao)) erros.push('topo.botao está vazio');
if (P.topo && txt(P.topo.titulo) && P.topo.titulo.trim().split(/\s+/).length > 12) avisos.push('topo.titulo tem mais de 12 palavras');
if (!Array.isArray(P.cenas) || P.cenas.length < 3 || P.cenas.length > 5) erros.push('cenas: precisa de 3 a 5 cenas');
else P.cenas.forEach((c, i) => { if (!txt(c.titulo) || !txt(c.texto)) erros.push(`cenas[${i}]: falta titulo ou texto`); });
if (!Array.isArray(P.beneficios) || P.beneficios.length !== 3) avisos.push('beneficios: o modelo foi pensado para 3');
if (!Array.isArray(P.perguntas) || P.perguntas.length !== 3) avisos.push('perguntas: o modelo foi pensado para 3');
if (!P.fim || !txt(P.fim.titulo) || !txt(P.fim.botao)) erros.push('fim: falta titulo ou botao');
if (P.cores) for (const k of ['fundo', 'destaque', 'destaque2', 'texto']) if (P.cores[k] && !cor(P.cores[k])) erros.push(`cores.${k}: use o formato #RRGGBB`);
if (P.forma && !['cristal', 'anel', 'ondas'].includes(P.forma)) erros.push('forma: use cristal, anel ou ondas');
if (P.fonte && !/^[A-Za-z0-9 ]{2,40}$/.test(P.fonte)) erros.push('fonte: use só o nome da fonte do Google Fonts, como "Sora"');

// Travessão e marcadores [..] pendentes.
const tudo = JSON.stringify(P);
if (/\u2014/.test(tudo)) avisos.push('tem travessão (—) no texto');
const marcadores = [...new Set((tudo.match(/\[[^\]"]{2,80}\]/g) || []))];

if (erros.length) {
  console.error('Não montei a página. Corrija:\n- ' + erros.join('\n- '));
  process.exit(1);
}

const modelo = fs.readFileSync(path.join(__dirname, '..', 'assets', 'modelo.html'), 'utf8');
const escAttr = (s) => String(s || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// JSON dentro de <script>: protege contra fechar a tag.
const json = JSON.stringify(P, null, 2).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
const fonte = (P.fonte || 'Inter').trim();

let html = modelo
  // Substituição por função: "R$" e outros "$" do texto não viram padrão especial.
  .replace(/\/\*CONFIG-INICIO\*\/[\s\S]*?\/\*CONFIG-FIM\*\//, () => '/*CONFIG-INICIO*/\nconst PAGINA = ' + json + ';\n/*CONFIG-FIM*/')
  .replace('__TITULO__', () => escAttr(P.tituloAba || P.topo.titulo))
  .replace('__DESCRICAO__', () => escAttr(P.topo.subtitulo))
  .replace('__FONTE_URL__', () => encodeURIComponent(fonte).replace(/%20/g, '+'));

fs.mkdirSync(path.dirname(saida), { recursive: true });
fs.writeFileSync(saida, html, 'utf8');
console.log('Página: ' + saida);
if (avisos.length) console.log('Avisos:\n- ' + avisos.join('\n- '));
if (marcadores.length) console.log('Marcadores para preencher: ' + marcadores.join(', '));
