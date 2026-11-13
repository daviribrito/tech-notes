<!-- GERADO a partir do portfólio. Estrutura em daviribrito/portfolio/data/roadmap.js, estudos em data/estudos.js -->

# Transactional Outbox

> Gravar no banco e publicar o evento sem perder nenhum dos dois.

| Área | Módulo | Nível | Prioridade | Status |
|---|---|---|---|---|
| [07 Engenharia Backend](README.md) | 7.7 Mensageria | N3 · Avançado | Essencial | ⚪ Não iniciado |

🔗 **No portfólio:** [Transactional Outbox](https://daviribrito.github.io/portfolio/topico.html?id=msg-outbox)

## Conteúdos

- Problema da escrita dupla
- Tabela outbox na mesma transação
- Relay de publicação

## Aplicação no backend

Garantir que todo dado salvo gere o seu evento.

## Critérios de conclusão

- [ ] Implementar o padrão outbox com relay e consumidor idempotente.

## Pré-requisitos

- [Message Brokers, Queues, Producers e Consumers](../backend/msg-fundamentos.md) · 7.7 Mensageria · ⚪ Não iniciado
- [ACID, Commit e Rollback](../banco/tx-acid.md) · 6.4 Transações e concorrência · ⚪ Não iniciado

## Libera

- [Exactly-once Effect e as suas limitações](../backend/idem-exactly-once.md) · 7.4 Idempotência · ⚪ Não iniciado
- [Saga Pattern](../backend/msg-saga.md) · 7.7 Mensageria · ⚪ Não iniciado

## Minhas anotações

_Ainda sem anotações._

---

[← Área 07](README.md) · [Índice do roadmap](../README.md)
