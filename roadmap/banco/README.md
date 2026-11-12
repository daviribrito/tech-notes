<!-- GERADO a partir do portfólio. Estrutura em daviribrito/portfolio/data/roadmap.js, estudos em data/estudos.js -->

# 06 · Banco de dados e persistência

> Modelagem, SQL, índices, transações, concorrência, NoSQL e operação de bancos.

**Objetivo:** Modelar, consultar e otimizar dados com segurança, entendendo transações e concorrência a fundo.

**Nível recomendado:** N1–N4 · **Prioridade:** Essencial · **Progresso:** `░░░░░░░░░░` 0%

🔗 [Abrir no portfólio](https://daviribrito.github.io/portfolio/area.html?id=banco)

**Pré-requisitos:** [02 Ciência da Computação e fundamentos computacionais](../computacao/README.md)

**Relação com:** [07 Engenharia Backend e desenvolvimento de APIs](../backend/README.md) · [11 Sistemas distribuídos e System Design](../distribuidos/README.md) · [09 Segurança, observabilidade e confiabilidade](../confiabilidade/README.md)

## Critérios de conclusão

- [ ] Modelar um domínio real até a forma normal adequada.
- [ ] Escrever consultas com joins, CTEs e window functions e otimizá-las pelo plano de execução.
- [ ] Explicar e reproduzir anomalias de concorrência e escolher o nível de isolamento certo.

## N1 · Fundamentos

| Tópico | Grupo | Importância | Status |
|---|---|---|---|
| [SGBD e modelo relacional](db-fundamentos.md) | Fundamentos e modelagem | Essencial | ⚪ Não iniciado |
| [SQL: consulta e manipulação de dados](db-sql-basico.md) | SQL | Essencial | ⚪ Não iniciado |

## N2 · Intermediário

| Tópico | Grupo | Importância | Status |
|---|---|---|---|
| [Modelagem de dados](db-modelagem.md) | Fundamentos e modelagem | Essencial | ⚪ Não iniciado |
| [Normalização e desnormalização](db-normalizacao.md) | Fundamentos e modelagem | Essencial | ⚪ Não iniciado |
| [Joins, agregações e subqueries](db-sql-joins.md) | SQL | Essencial | ⚪ Não iniciado |
| [Índices](db-indices.md) | Índices e otimização | Essencial | ⚪ Não iniciado |
| [Transações e ACID](db-acid.md) | Transações e concorrência | Essencial | ⚪ Não iniciado |
| [Modelos NoSQL e MongoDB](db-nosql.md) | Bancos não relacionais | Importante | ⚪ Não iniciado |
| [Redis](db-redis.md) | Bancos não relacionais | Essencial | ⚪ Não iniciado |
| [Migrations e evolução de schema](db-migrations.md) | Administração e operação | Essencial | ⚪ Não iniciado |
| [Connection pooling](db-pool.md) | Administração e operação | Essencial | ⚪ Não iniciado |

## N3 · Avançado

| Tópico | Grupo | Importância | Status |
|---|---|---|---|
| [Modelagem de histórico e auditoria](db-historico.md) | Fundamentos e modelagem | Importante | ⚪ Não iniciado |
| [SQL avançado: CTEs, window functions, views e procedures](db-sql-avancado.md) | SQL | Importante | ⚪ Não iniciado |
| [Planos de execução e otimização de consultas](db-otimizacao.md) | Índices e otimização | Essencial | ⚪ Não iniciado |
| [Níveis de isolamento e anomalias](db-isolamento.md) | Transações e concorrência | Essencial | ⚪ Não iniciado |
| [Locks, MVCC e deadlocks](db-locks-mvcc.md) | Transações e concorrência | Essencial | ⚪ Não iniciado |
| [Replicação, read replicas e sharding na prática](db-replicacao.md) | Bancos não relacionais | Importante | ⚪ Não iniciado |
| [Backup, monitoramento e recuperação](db-operacao.md) | Administração e operação | Importante | ⚪ Não iniciado |

## N4 · Especialização

| Tópico | Grupo | Importância | Status |
|---|---|---|---|
| [Write-Ahead Logging e durabilidade](db-wal.md) | Transações e concorrência | Importante | ⚪ Não iniciado |

---

[← Índice do roadmap](../README.md)
