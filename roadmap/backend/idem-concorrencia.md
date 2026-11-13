<!-- GERADO a partir do portfólio. Estrutura em daviribrito/portfolio/data/roadmap.js, estudos em data/estudos.js -->

# Concorrência e atomicidade

> Duas requisições iguais ao mesmo tempo.

| Área | Módulo | Nível | Prioridade | Status |
|---|---|---|---|---|
| [07 Engenharia Backend](README.md) | 7.4 Idempotência | N3 · Avançado | Essencial | ⚪ Não iniciado |

🔗 **No portfólio:** [Concorrência e atomicidade](https://daviribrito.github.io/portfolio/topico.html?id=idem-concorrencia)

## Conteúdos

- Requisições simultâneas com a mesma chave
- Reserva atômica: SET NX e constraint única
- Estado em andamento

## Aplicação no backend

Garantir uma única execução mesmo sob corrida.

## Critérios de conclusão

- [ ] Provar com teste concorrente que duas requisições simultâneas geram um efeito só.

## Pré-requisitos

- [Idempotency Keys e prevenção de duplicidade](../backend/idem-chaves.md) · 7.4 Idempotência · ⚪ Não iniciado
- [Locks, Optimistic e Pessimistic Locking e deadlocks](../banco/tx-locks.md) · 6.4 Transações e concorrência · ⚪ Não iniciado
- [Redis](../banco/nosql-redis.md) · 6.5 Bancos NoSQL · ⚪ Não iniciado

## Libera

- [Idempotência em pagamentos](../backend/idem-pagamentos.md) · 7.4 Idempotência · ⚪ Não iniciado

## Minhas anotações

_Ainda sem anotações._

---

[← Área 07](README.md) · [Índice do roadmap](../README.md)
