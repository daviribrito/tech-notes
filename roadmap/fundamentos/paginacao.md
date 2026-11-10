<!-- GERADO a partir do portfólio. Edite em daviribrito/portfolio/data/roadmap.js -->

# Paginação por cursor

> Paginar tabelas grandes sem OFFSET.

| Área | Status | Progresso |
|---|---|---|
| Fundamentos de backend | ✅ Dominado | `██████████` 100% |

🔗 **No portfólio:** [Paginação por cursor](https://daviribrito.github.io/portfolio/topico.html?id=paginacao)

## Anotações

- OFFSET 100000 obriga o banco a ler e descartar 100 mil linhas.
- Com cursor (WHERE (criado_em, id) < ($1, $2) ORDER BY criado_em DESC, id DESC), o índice vai direto ao ponto.

## Armadilhas

- ⚠️ O cursor precisa de uma ordenação única: inclua o id como desempate.

---

[← Índice do roadmap](../README.md)
