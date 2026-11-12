<!-- GERADO a partir do portfólio. Estrutura em daviribrito/portfolio/data/roadmap.js, estudos em data/estudos.js -->

# 07 · Engenharia Backend e desenvolvimento de APIs

> APIs, autenticação, idempotência, concorrência, integrações e mensageria.

**Objetivo:** Construir serviços corretos sob concorrência, falhas externas e requisições repetidas.

**Nível recomendado:** N1–N4 · **Prioridade:** Essencial · **Progresso:** `░░░░░░░░░░` 0%

🔗 [Abrir no portfólio](https://daviribrito.github.io/portfolio/area.html?id=backend)

**Pré-requisitos:** [03 Linguagens de programação e runtime](../linguagem/README.md) · [05 Redes de computadores e comunicação](../redes/README.md) · [06 Banco de dados e persistência](../banco/README.md)

**Relação com:** [08 Engenharia de software e arquitetura](../engenharia/README.md) · [09 Segurança, observabilidade e confiabilidade](../confiabilidade/README.md) · [11 Sistemas distribuídos e System Design](../distribuidos/README.md)

## Critérios de conclusão

- [ ] Entregar uma API REST documentada, com autenticação, validação e tratamento de erros.
- [ ] Garantir idempotência em operações críticas e testar concorrência.
- [ ] Integrar serviços externos e filas com resiliência e sem perda de mensagens.

## N1 · Fundamentos

| Tópico | Grupo | Importância | Status |
|---|---|---|---|
| [Arquitetura cliente-servidor e ciclo da requisição](be-cliente-servidor.md) | Fundamentos backend | Essencial | ⚪ Não iniciado |
| [Controllers, services, repositories, DTOs e entities](be-camadas.md) | Fundamentos backend | Essencial | ⚪ Não iniciado |
| [HTTP para APIs: métodos, status, headers e parâmetros](be-http.md) | HTTP e APIs | Essencial | ⚪ Não iniciado |

## N2 · Intermediário

| Tópico | Grupo | Importância | Status |
|---|---|---|---|
| [Validação e tratamento de erros](be-validacao-erros.md) | Fundamentos backend | Essencial | ⚪ Não iniciado |
| [Integração com banco: JDBC e JPA](be-persistencia.md) | Fundamentos backend | Essencial | ⚪ Não iniciado |
| [Design de APIs REST](be-rest.md) | HTTP e APIs | Essencial | ⚪ Não iniciado |
| [OpenAPI e documentação de APIs](be-openapi.md) | HTTP e APIs | Importante | ⚪ Não iniciado |
| [Sessões, cookies e hashing de senhas](be-sessoes-senhas.md) | Autenticação e autorização | Essencial | ⚪ Não iniciado |
| [JWT, access e refresh tokens](be-tokens.md) | Autenticação e autorização | Essencial | ⚪ Não iniciado |
| [Autorização: RBAC, ABAC e permissões](be-autorizacao.md) | Autenticação e autorização | Essencial | ⚪ Não iniciado |
| [Processamento síncrono e assíncrono](be-sync-async.md) | Concorrência e processamento | Essencial | ⚪ Não iniciado |
| [Race conditions e thread safety](be-thread-safety.md) | Concorrência e processamento | Essencial | ⚪ Não iniciado |
| [Consumo de APIs externas e HTTP clients](be-http-clients.md) | Integrações | Essencial | ⚪ Não iniciado |
| [Webhooks](be-webhooks.md) | Integrações | Importante | ⚪ Não iniciado |
| [Brokers, filas e pub/sub](be-mensageria.md) | Mensageria | Essencial | ⚪ Não iniciado |
| [RabbitMQ](be-rabbitmq.md) | Mensageria | Importante | ⚪ Não iniciado |

## N3 · Avançado

| Tópico | Grupo | Importância | Status |
|---|---|---|---|
| [OAuth 2.0 e OpenID Connect](be-oauth.md) | Autenticação e autorização | Importante | ⚪ Não iniciado |
| [Idempotência](be-idempotencia.md) | Idempotência | Essencial | ⚪ Não iniciado |
| [Executors, thread pools e CompletableFuture](be-executors.md) | Concorrência e processamento | Essencial | ⚪ Não iniciado |
| [Virtual threads e processamento paralelo](be-virtual-threads.md) | Concorrência e processamento | Importante | ⚪ Não iniciado |
| [Retry, circuit breaker, fallback e bulkhead](be-resiliencia.md) | Integrações | Essencial | ⚪ Não iniciado |
| [Apache Kafka](be-kafka.md) | Mensageria | Importante | ⚪ Não iniciado |
| [Arquitetura orientada a eventos](be-eventos.md) | Mensageria | Importante | ⚪ Não iniciado |
| [Transactional outbox](be-outbox.md) | Mensageria | Essencial | ⚪ Não iniciado |

## N4 · Especialização

| Tópico | Grupo | Importância | Status |
|---|---|---|---|
| [Backpressure e controle de carga](be-backpressure.md) | Concorrência e processamento | Importante | ⚪ Não iniciado |
| [Event sourcing e CQRS](be-event-sourcing-cqrs.md) | Mensageria | Complementar | ⚪ Não iniciado |
| [Saga pattern](be-saga.md) | Mensageria | Importante | ⚪ Não iniciado |

---

[← Índice do roadmap](../README.md)
