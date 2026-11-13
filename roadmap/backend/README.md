<!-- GERADO a partir do portfólio. Estrutura em daviribrito/portfolio/data/roadmap.js, estudos em data/estudos.js -->

# 07 · Engenharia Backend

> APIs, autenticação, idempotência, concorrência, integrações e mensageria: o que se usa para construir aplicações.

**Objetivo:** Construir serviços corretos sob concorrência, falhas externas e requisições repetidas.

**Prioridade:** Essencial · **Níveis:** N1–N4 · **Progresso:** `░░░░░░░░░░` 0%

**Pré-requisitos:** [03 Linguagem de programação e Java](../linguagem/README.md) · [05 Redes e protocolos de comunicação](../redes/README.md) · [06 Banco de dados e persistência](../banco/README.md)

🔗 [Abrir no portfólio](https://daviribrito.github.io/portfolio/area.html?id=backend)

## 7.1 Fundamentos backend

N1–N2 · `░░░░░░░░░░` 0%

| Tópico | Nível | Prioridade | Status |
|---|---|---|---|
| [Cliente-servidor, Request e Response](be-cliente-servidor.md) | N1 | Essencial | ⚪ Não iniciado |
| [Controllers, Services, Repositories, DTOs e Entities](be-camadas.md) | N1 | Essencial | ⚪ Não iniciado |
| [Regras de negócio e validação](be-regras-validacao.md) | N2 | Essencial | ⚪ Não iniciado |
| [Tratamento de erros](be-erros.md) | N2 | Essencial | ⚪ Não iniciado |
| [Persistência na aplicação](be-persistencia.md) | N2 | Essencial | ⚪ Não iniciado |

## 7.2 HTTP e APIs

N1–N2 · `░░░░░░░░░░` 0%

| Tópico | Nível | Prioridade | Status |
|---|---|---|---|
| [Métodos HTTP, Status Codes, Headers e parâmetros](api-http.md) | N1 | Essencial | ⚪ Não iniciado |
| [REST, RESTful APIs e API Design](api-rest.md) | N2 | Essencial | ⚪ Não iniciado |
| [Versionamento, paginação, filtragem e ordenação](api-colecoes.md) | N2 | Essencial | ⚪ Não iniciado |
| [OpenAPI e Swagger](api-openapi.md) | N2 | Importante | ⚪ Não iniciado |

## 7.3 Autenticação e autorização

N2–N3 · `░░░░░░░░░░` 0%

| Tópico | Nível | Prioridade | Status |
|---|---|---|---|
| [Sessions, Cookies e hashing de senhas](auth-sessoes.md) | N2 | Essencial | ⚪ Não iniciado |
| [JWT, Access e Refresh Tokens](auth-tokens.md) | N2 | Essencial | ⚪ Não iniciado |
| [OAuth 2.0 e OpenID Connect](auth-oauth.md) | N3 | Importante | ⚪ Não iniciado |
| [RBAC, ABAC e controle de permissões](auth-autorizacao.md) | N2 | Essencial | ⚪ Não iniciado |

## 7.4 Idempotência

N2–N4 · `░░░░░░░░░░` 0%

| Tópico | Nível | Prioridade | Status |
|---|---|---|---|
| [Conceito, finalidade e idempotência em HTTP](idem-conceito.md) | N2 | Essencial | ⚪ Não iniciado |
| [Idempotency Keys e prevenção de duplicidade](idem-chaves.md) | N3 | Essencial | ⚪ Não iniciado |
| [Concorrência e atomicidade](idem-concorrencia.md) | N3 | Essencial | ⚪ Não iniciado |
| [Idempotência em pagamentos](idem-pagamentos.md) | N3 | Essencial | ⚪ Não iniciado |
| [Filas, webhooks, deduplicação e retry seguro](idem-mensagens.md) | N3 | Essencial | ⚪ Não iniciado |
| [Exactly-once Effect e as suas limitações](idem-exactly-once.md) | N4 | Importante | ⚪ Não iniciado |

## 7.5 Concorrência e processamento

N2–N4 · `░░░░░░░░░░` 0%

| Tópico | Nível | Prioridade | Status |
|---|---|---|---|
| [Processamento síncrono e assíncrono](conc-sync-async.md) | N2 | Essencial | ⚪ Não iniciado |
| [Multithreading, race conditions e Thread Safety](conc-thread-safety.md) | N2 | Essencial | ⚪ Não iniciado |
| [Locks e Synchronization em Java](conc-locks.md) | N3 | Essencial | ⚪ Não iniciado |
| [Executors, Thread Pools, Futures e CompletableFuture](conc-executors.md) | N3 | Essencial | ⚪ Não iniciado |
| [Virtual Threads e Parallel Processing](conc-virtual-threads.md) | N3 | Importante | ⚪ Não iniciado |
| [Backpressure](conc-backpressure.md) | N4 | Importante | ⚪ Não iniciado |

## 7.6 Integrações

N2–N3 · `░░░░░░░░░░` 0%

| Tópico | Nível | Prioridade | Status |
|---|---|---|---|
| [APIs externas, HTTP Clients e Timeouts](int-clientes.md) | N2 | Essencial | ⚪ Não iniciado |
| [Webhooks](int-webhooks.md) | N2 | Importante | ⚪ Não iniciado |
| [Retry, Exponential Backoff, Circuit Breaker, Fallback e Bulkhead](int-resiliencia.md) | N3 | Essencial | ⚪ Não iniciado |
| [Compatibilidade de contratos](int-contratos.md) | N3 | Importante | ⚪ Não iniciado |

## 7.7 Mensageria

N2–N4 · `░░░░░░░░░░` 0%

| Tópico | Nível | Prioridade | Status |
|---|---|---|---|
| [Message Brokers, Queues, Producers e Consumers](msg-fundamentos.md) | N2 | Essencial | ⚪ Não iniciado |
| [RabbitMQ](msg-rabbitmq.md) | N2 | Importante | ⚪ Não iniciado |
| [Kafka e Consumer Groups](msg-kafka.md) | N3 | Importante | ⚪ Não iniciado |
| [Event-Driven Architecture](msg-eda.md) | N3 | Importante | ⚪ Não iniciado |
| [Transactional Outbox](msg-outbox.md) | N3 | Essencial | ⚪ Não iniciado |
| [Event Sourcing e CQRS](msg-event-sourcing.md) | N4 | Complementar | ⚪ Não iniciado |
| [Saga Pattern](msg-saga.md) | N4 | Importante | ⚪ Não iniciado |

---

[← Índice do roadmap](../README.md)
