// Gera as notas do roadmap a partir do portfólio (daviribrito/portfolio).
//
// Fontes: data/roadmap.js (estrutura: áreas, módulos e tópicos), data/estudos.js
// (progresso e anotações) e data/config.js do portfólio.
// Para cada tópico escreve roadmap/<area>/<id>.md, mais o índice
// roadmap/README.md e a seção "Roadmap" do README principal.
//
// Arquivos gerados levam o marcador GERADO no topo. Só esses são atualizados
// ou apagados; notas escritas à mão nunca são tocadas.
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
const GERADO = "<!-- GERADO a partir do portfólio. Estrutura em " + REPO + "/data/roadmap.js, estudos em data/estudos.js -->";

const ESTADOS = { "nao-iniciado": "⚪ Não iniciado", estudo: "🟡 Em estudo", pratica: "🔵 Em prática", dominado: "🟢 Dominado", revisar: "🔁 Revisar" };
const IMPORTANCIA = { essencial: "Essencial", importante: "Importante", complementar: "Complementar" };

async function load(file, globalName, optional) {
  const res = await fetch(RAW + file + "?t=" + Date.now(), { headers: { "Cache-Control": "no-cache" } });
  if (!res.ok) {
    if (optional && res.status === 404) return null;
    throw new Error(`Não consegui baixar ${file}: HTTP ${res.status}`);
  }
  const ctx = { window: {} };
  vm.runInNewContext(await res.text(), ctx, { filename: file, timeout: 2000 });
  if (!ctx.window[globalName]) throw new Error(`${file} não definiu window.${globalName}`);
  return ctx.window[globalName];
}

const R = await load("data/roadmap.js", "ROADMAP");
const E = (await load("data/estudos.js", "ESTUDOS", true)) || {};
const cfg = await load("data/config.js", "SITE_CONFIG");
const PASTA = (cfg.techNotes && cfg.techNotes.pasta) || "roadmap";

const areas = R.areas || [];
const modulos = R.modulos || [];
const modById = Object.fromEntries(modulos.map((m) => [m.id, m]));
const status = E.status || {};
const conteudo = E.conteudo || {};
// Hierarquia: Área → Módulo → Tópico. A área do tópico vem do módulo.
const topicos = (R.topicos || []).map((t) => {
  const m = modById[t.modulo] || { area: "", numero: "", nome: "" };
  return {
    pre: [], conteudos: [], criterios: [], ...t, ...(conteudo[t.id] || {}),
    area: m.area, mod: m,
    status: ESTADOS[status[t.id]] ? status[t.id] : "nao-iniciado"
  };
});
const byId = Object.fromEntries(topicos.map((t) => [t.id, t]));
const area = (id) => areas.find((a) => a.id === id) || { id, numero: "", nome: id };
const concluido = (t) => t.status === "dominado" || t.status === "revisar";
const pct = (list) => (list.length ? Math.round((list.filter(concluido).length / list.length) * 100) : 0);
const bar = (p) => "█".repeat(Math.round(p / 10)) + "░".repeat(10 - Math.round(p / 10));
const topicUrl = (id) => SITE + "topico.html?id=" + encodeURIComponent(id);
const areaUrl = (id) => SITE + "area.html?id=" + encodeURIComponent(id);
const nivelNome = (n) => n + " · " + ((R.niveis && R.niveis[n] && R.niveis[n].nome) || "");
const modLabel = (t) => (t.mod.numero ? `${t.mod.numero} ${t.mod.nome}` : "");
const niveisDe = (list) => {
  const ns = ["N1", "N2", "N3", "N4"].filter((n) => list.some((t) => t.nivel === n));
  return ns.length ? (ns.length === 1 ? ns[0] : `${ns[0]}–${ns[ns.length - 1]}`) : "";
};

// Validação: ids únicos, no formato usado nos caminhos, e módulos existentes.
const vistos = new Set();
for (const t of topicos) {
  if (!/^[a-z0-9-]+$/.test(t.id)) throw new Error(`id inválido no roadmap: "${t.id}" (use letras minúsculas, números e hífen)`);
  if (vistos.has(t.id)) throw new Error(`id repetido no roadmap: "${t.id}"`);
  if (!modById[t.modulo]) throw new Error(`módulo inexistente no tópico "${t.id}": "${t.modulo}"`);
  vistos.add(t.id);
}

function nota(t) {
  const a = area(t.area);
  const rel = (ids) => ids.map((id) => byId[id]).filter(Boolean)
    .map((x) => `- [${x.nome}](../${x.area}/${x.id}.md) · ${modLabel(x)} · ${ESTADOS[x.status]}`);
  const libera = topicos.filter((x) => x.pre.includes(t.id)).map((x) => x.id);
  const L = [
    GERADO,
    "",
    `# ${t.nome}`,
    "",
    `> ${t.descricao}`,
    "",
    "| Área | Módulo | Nível | Prioridade | Status |",
    "|---|---|---|---|---|",
    `| [${a.numero} ${a.nome}](README.md) | ${modLabel(t)} | ${nivelNome(t.nivel)} | ${IMPORTANCIA[t.prioridade] || t.prioridade} | ${ESTADOS[t.status]} |`,
    "",
    `🔗 **No portfólio:** [${t.nome}](${topicUrl(t.id)})`,
    "",
    "## Conteúdos",
    "",
    ...t.conteudos.map((x) => `- ${x}`),
    "",
    "## Aplicação no backend",
    "",
    t.aplicacao,
    "",
    "## Critérios de conclusão",
    "",
    ...t.criterios.map((x) => `- [${concluido(t) ? "x" : " "}] ${x}`),
    "",
    "## Pré-requisitos",
    "",
    ...(t.pre.length ? rel(t.pre) : ["Nenhum: pode começar por aqui."]),
    ""
  ];
  if (libera.length) L.push("## Libera", "", ...rel(libera), "");

  const temNotas = t.anotacoes?.length || t.armadilhas?.length || t.codigo || t.links?.length;
  L.push("## Minhas anotações", "");
  if (!temNotas) L.push("_Ainda sem anotações._", "");
  if (t.anotacoes?.length) L.push(...t.anotacoes.map((x) => `- ${x}`), "");
  if (t.armadilhas?.length) L.push("### Armadilhas", "", ...t.armadilhas.map((x) => `- ⚠️ ${x}`), "");
  if (t.codigo) L.push("### Código", "", "```" + (t.linguagem || "java"), t.codigo, "```", "");
  if (t.links?.length) L.push("### Referências", "", ...t.links.map((l) => `- [${l.titulo}](${l.url})`), "");

  L.push("---", "", `[← Área ${a.numero}](README.md) · [Índice do roadmap](../README.md)`, "");
  return L.join("\n");
}

function indiceArea(a) {
  const tops = topicos.filter((t) => t.area === a.id);
  const L = [
    GERADO,
    "",
    `# ${a.numero} · ${a.nome}`,
    "",
    `> ${a.descricao}`,
    "",
    `**Objetivo:** ${a.objetivo}`,
    "",
    `**Prioridade:** ${IMPORTANCIA[a.prioridade] || a.prioridade} · **Níveis:** ${niveisDe(tops)} · **Progresso:** \`${bar(pct(tops))}\` ${pct(tops)}%`,
    ""
  ];
  if (a.nota) L.push(`**Prioridade dentro da área:** ${a.nota}`, "");
  if (a.pre?.length) L.push("**Pré-requisitos:** " + a.pre.map((x) => `[${area(x).numero} ${area(x).nome}](../${x}/README.md)`).join(" · "), "");
  L.push(`🔗 [Abrir no portfólio](${areaUrl(a.id)})`, "");
  for (const m of modulos.filter((x) => x.area === a.id)) {
    const doMod = tops.filter((t) => t.modulo === m.id);
    L.push(`## ${m.numero} ${m.nome}`, "", `${niveisDe(doMod)} · \`${bar(pct(doMod))}\` ${pct(doMod)}%`, "",
      "| Tópico | Nível | Prioridade | Status |", "|---|---|---|---|");
    for (const t of doMod) L.push(`| [${t.nome}](${t.id}.md) | ${t.nivel} | ${IMPORTANCIA[t.prioridade] || t.prioridade} | ${ESTADOS[t.status]} |`);
    L.push("");
  }
  L.push("---", "", "[← Índice do roadmap](../README.md)", "");
  return L.join("\n");
}

function indice() {
  const L = [
    GERADO,
    "",
    "# Roadmap · Backend Engineering",
    "",
    `Notas geradas a partir do [roadmap do portfólio](${SITE}roadmap.html). Hierarquia: Área → Módulo → Tópico. Cada tópico tem a sua página no portfólio e a sua nota aqui.`,
    "",
    `**Progresso geral:** \`${bar(pct(topicos))}\` ${pct(topicos)}% · ${topicos.filter(concluido).length} de ${topicos.length} tópicos dominados`,
    "",
    "| Área | Prioridade | Níveis | Módulos | Progresso | Tópicos |",
    "|---|---|---|---|---|---|"
  ];
  for (const a of areas) {
    const tops = topicos.filter((t) => t.area === a.id);
    L.push(`| [${a.numero} ${a.nome}](${a.id}/README.md) | ${IMPORTANCIA[a.prioridade] || a.prioridade} | ${niveisDe(tops)} | ${modulos.filter((m) => m.area === a.id).length} | \`${bar(pct(tops))}\` ${pct(tops)}% | ${tops.filter(concluido).length}/${tops.length} |`);
  }
  L.push("", "Estados: " + Object.values(ESTADOS).join(" · "), "");
  return L.join("\n");
}

function secaoReadme() {
  return [
    "<!-- roadmap:inicio -->",
    "## Roadmap",
    "",
    `Sincronizado com o [roadmap do portfólio](${SITE}roadmap.html): ${topicos.filter(concluido).length} de ${topicos.length} tópicos dominados (${pct(topicos)}%). Índice completo em [roadmap/](roadmap/README.md).`,
    "",
    ...areas.map((a) => `- [${a.numero} ${a.nome}](roadmap/${a.id}/README.md) · ${pct(topicos.filter((t) => t.area === a.id))}%`),
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
  let out = [], entries = [];
  try { entries = await readdir(dir, { withFileTypes: true }); } catch { return out; }
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out = out.concat(await walk(p));
    else if (e.name.endsWith(".md")) out.push(p);
  }
  return out;
}

const esperados = new Set();
for (const t of topicos) {
  const p = join(PASTA, t.area, t.id + ".md");
  esperados.add(p);
  await write(p, nota(t));
}
for (const a of areas) {
  const p = join(PASTA, a.id, "README.md");
  esperados.add(p);
  await write(p, indiceArea(a));
}
const idx = join(PASTA, "README.md");
esperados.add(idx);
await write(idx, indice());

// Remove só arquivos gerados que não fazem mais parte do roadmap.
for (const f of await walk(PASTA)) {
  if (esperados.has(f)) continue;
  const txt = await readFile(f, "utf8");
  if (txt.startsWith("<!-- GERADO")) { await rm(f); console.log("removido:", f); }
}

let readme = await readFile("README.md", "utf8");
const secao = secaoReadme();
const re = /<!-- roadmap:inicio -->[\s\S]*?<!-- roadmap:fim -->/;
readme = re.test(readme) ? readme.replace(re, secao) : readme.replace(/\s*$/, "\n\n" + secao + "\n");
await write("README.md", readme);

console.log(`ok: ${topicos.length} tópicos em ${areas.length} áreas, pasta ${PASTA}/`);
