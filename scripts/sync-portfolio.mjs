// Gera as notas do roadmap a partir do portfólio (daviribrito/portfolio).
//
// Fonte única: data/roadmap.js e data/config.js do portfólio.
// Para cada tópico, escreve roadmap/<fase>/<id>.md, mais roadmap/README.md
// (índice) e a seção "Roadmap" do README principal.
//
// Arquivos gerados levam o marcador GERADO no topo. Só esses são apagados
// quando o tópico some do portfólio; notas escritas à mão nunca são tocadas.
//
// Uso: node scripts/sync-portfolio.mjs
// Variáveis opcionais: PORTFOLIO_REPO (padrão daviribrito/portfolio), PORTFOLIO_BRANCH (main).

import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import vm from "node:vm";

const REPO = process.env.PORTFOLIO_REPO || "daviribrito/portfolio";
const BRANCH = process.env.PORTFOLIO_BRANCH || "main";
const RAW = `https://raw.githubusercontent.com/${REPO}/${BRANCH}/`;
const [owner, name] = REPO.split("/");
const SITE = `https://${owner}.github.io/${name}/`;
const GERADO = "<!-- GERADO a partir do portfólio. Edite em " + REPO + "/data/roadmap.js -->";
const STATUS = { dominado: "✅ Dominado", estudando: "🟡 Estudando", proximo: "⚪ Próximo" };

async function load(file, globalName) {
  const res = await fetch(RAW + file + "?t=" + Date.now(), { headers: { "Cache-Control": "no-cache" } });
  if (!res.ok) throw new Error(`Não consegui baixar ${file}: HTTP ${res.status}`);
  const ctx = { window: {} };
  vm.runInNewContext(await res.text(), ctx, { filename: file, timeout: 2000 });
  if (!ctx.window[globalName]) throw new Error(`${file} não definiu window.${globalName}`);
  return ctx.window[globalName];
}

const topicUrl = (id) => SITE + "topico.html?id=" + encodeURIComponent(id);
const bar = (p) => "█".repeat(Math.round(p / 10)) + "░".repeat(10 - Math.round(p / 10));

function nota(R, t) {
  const fase = R.fases.find((f) => f.id === t.fase);
  const linhas = [
    GERADO,
    "",
    `# ${t.nome}`,
    "",
    `> ${t.resumo}`,
    "",
    "| Área | Status | Progresso |",
    "|---|---|---|",
    `| ${fase ? fase.nome : t.fase} | ${STATUS[t.status] || t.status} | ${t.status === "proximo" ? "—" : `\`${bar(t.progresso)}\` ${t.progresso}%`} |`,
    "",
    `🔗 **No portfólio:** [${t.nome}](${topicUrl(t.id)})` + (t.demo ? " (com laboratório interativo)" : ""),
    ""
  ];

  if (t.anotacoes && t.anotacoes.length) linhas.push("## Anotações", "", ...t.anotacoes.map((a) => `- ${a}`), "");
  if (t.armadilhas && t.armadilhas.length) linhas.push("## Armadilhas", "", ...t.armadilhas.map((a) => `- ⚠️ ${a}`), "");
  if (t.codigo) linhas.push("## Código", "", "```" + (t.linguagem || "js"), t.codigo, "```", "");
  if (!t.anotacoes?.length && !t.armadilhas?.length && !t.codigo) {
    linhas.push(t.status === "proximo"
      ? "_Este tópico ainda está na fila. As anotações entram aqui quando os estudos começarem._"
      : "_As anotações deste tópico ainda estão sendo escritas._", "");
  }

  linhas.push("---", "", `[← Índice do roadmap](../README.md)`, "");
  return linhas.join("\n");
}

function indice(R) {
  const linhas = [
    GERADO,
    "",
    "# Roadmap",
    "",
    `Notas geradas a partir do [roadmap do portfólio](${SITE}roadmap.html). Cada tópico tem a sua página no portfólio e a sua nota aqui.`,
    ""
  ];
  for (const f of R.fases) {
    const tops = R.topicos.filter((t) => t.fase === f.id);
    if (!tops.length) continue;
    linhas.push(`## ${f.nome}`, "", f.texto ? `_${f.texto}_\n` : "", "| Tópico | Status | Progresso | Portfólio |", "|---|---|---|---|");
    for (const t of tops) {
      linhas.push(`| [${t.nome}](${f.id}/${t.id}.md) | ${STATUS[t.status] || t.status} | ${t.status === "proximo" ? "—" : t.progresso + "%"} | [abrir](${topicUrl(t.id)}) |`);
    }
    linhas.push("");
  }
  return linhas.join("\n");
}

function secaoReadme(R) {
  const feitos = R.topicos.filter((t) => t.status === "dominado").length;
  return [
    "<!-- roadmap:inicio -->",
    "## Roadmap",
    "",
    `Sincronizado com o [roadmap do portfólio](${SITE}roadmap.html): ${feitos} de ${R.topicos.length} tópicos dominados. Índice completo em [roadmap/](roadmap/README.md).`,
    "",
    ...R.fases.map((f) => {
      const tops = R.topicos.filter((t) => t.fase === f.id);
      return tops.length ? `- **${f.nome}:** ` + tops.map((t) => `[${t.nome}](roadmap/${f.id}/${t.id}.md)`).join(" · ") : null;
    }).filter(Boolean),
    "<!-- roadmap:fim -->"
  ].join("\n");
}

async function write(path, content) {
  await mkdir(dirname(path), { recursive: true });
  let old = null;
  try { old = await readFile(path, "utf8"); } catch {}
  if (old !== content) { await writeFile(path, content); console.log("escrito:", path); }
}

async function walk(dir) {
  let out = [];
  let entries = [];
  try { entries = await readdir(dir, { withFileTypes: true }); } catch { return out; }
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out = out.concat(await walk(p));
    else if (e.name.endsWith(".md")) out.push(p);
  }
  return out;
}

const R = await load("data/roadmap.js", "ROADMAP");
const cfg = await load("data/config.js", "SITE_CONFIG");
const PASTA = (cfg.techNotes && cfg.techNotes.pasta) || "roadmap";

const ids = new Set();
for (const t of R.topicos) {
  if (!/^[a-z0-9-]+$/.test(t.id)) throw new Error(`id inválido no roadmap: "${t.id}" (use letras minúsculas, números e hífen)`);
  if (ids.has(t.id)) throw new Error(`id repetido no roadmap: "${t.id}"`);
  ids.add(t.id);
}

const esperados = new Set();
for (const t of R.topicos) {
  const p = join(PASTA, t.fase, t.id + ".md");
  esperados.add(p);
  await write(p, nota(R, t));
}
const idx = join(PASTA, "README.md");
esperados.add(idx);
await write(idx, indice(R));

// Remove só arquivos gerados cujo tópico saiu do portfólio.
for (const f of await walk(PASTA)) {
  if (esperados.has(f)) continue;
  const txt = await readFile(f, "utf8");
  if (txt.startsWith("<!-- GERADO")) { await rm(f); console.log("removido:", f); }
}

// Atualiza a seção do README principal entre os marcadores.
let readme = await readFile("README.md", "utf8");
const secao = secaoReadme(R);
const re = /<!-- roadmap:inicio -->[\s\S]*?<!-- roadmap:fim -->/;
readme = re.test(readme) ? readme.replace(re, secao) : readme.replace(/\s*$/, "\n\n" + secao + "\n");
await write("README.md", readme);

console.log(`ok: ${R.topicos.length} tópicos em ${PASTA}/`);
