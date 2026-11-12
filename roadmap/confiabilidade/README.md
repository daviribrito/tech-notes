<!-- GERADO a partir do portfólio. Estrutura em daviribrito/portfolio/data/roadmap.js, estudos em data/estudos.js -->

# 09 · Segurança, observabilidade e confiabilidade

> Proteger o sistema, enxergar o que acontece em produção e manter o serviço de pé.

**Objetivo:** Construir serviços seguros por padrão, observáveis e com metas de confiabilidade claras.

**Nível recomendado:** N1–N4 · **Prioridade:** Essencial · **Progresso:** `░░░░░░░░░░` 0%

🔗 [Abrir no portfólio](https://daviribrito.github.io/portfolio/area.html?id=confiabilidade)

**Pré-requisitos:** [07 Engenharia Backend e desenvolvimento de APIs](../backend/README.md)

**Relação com:** [10 DevOps, infraestrutura e Cloud](../devops/README.md) · [11 Sistemas distribuídos e System Design](../distribuidos/README.md)

## Critérios de conclusão

- [ ] Revisar uma API contra o OWASP API Security Top 10.
- [ ] Instrumentar logs, métricas e traces e criar alertas úteis.
- [ ] Definir SLOs e conduzir uma análise de causa raiz.

## N1 · Fundamentos

| Tópico | Grupo | Importância | Status |
|---|---|---|---|
| [Fundamentos de segurança da informação](sec-fundamentos.md) | Segurança | Essencial | ⚪ Não iniciado |

## N2 · Intermediário

| Tópico | Grupo | Importância | Status |
|---|---|---|---|
| [Criptografia e hashing](sec-cripto.md) | Segurança | Essencial | ⚪ Não iniciado |
| [OWASP Top 10 e OWASP API Security](sec-owasp.md) | Segurança | Essencial | ⚪ Não iniciado |
| [SQL injection, XSS, CSRF e SSRF](sec-ataques.md) | Segurança | Essencial | ⚪ Não iniciado |
| [Broken access control e CORS](sec-acesso.md) | Segurança | Essencial | ⚪ Não iniciado |
| [Rate limiting e proteção contra abuso](sec-rate-limit.md) | Segurança | Essencial | ⚪ Não iniciado |
| [Gestão de segredos](sec-secrets.md) | Segurança | Essencial | ⚪ Não iniciado |
| [Logging estruturado, correlation ID e trace ID](obs-logs.md) | Observabilidade | Essencial | ⚪ Não iniciado |
| [Métricas, monitoramento e alertas](obs-metricas.md) | Observabilidade | Essencial | ⚪ Não iniciado |
| [Health checks](obs-health.md) | Observabilidade | Essencial | ⚪ Não iniciado |

## N3 · Avançado

| Tópico | Grupo | Importância | Status |
|---|---|---|---|
| [Threat modeling e desenvolvimento seguro](sec-desenvolvimento-seguro.md) | Segurança | Importante | ⚪ Não iniciado |
| [Distributed tracing e OpenTelemetry](obs-tracing.md) | Observabilidade | Importante | ⚪ Não iniciado |
| [Resiliência, tolerância a falhas e degradação](conf-resiliencia.md) | Confiabilidade | Essencial | ⚪ Não iniciado |
| [SLA, SLO, SLI e error budget](conf-slo.md) | Confiabilidade | Importante | ⚪ Não iniciado |
| [Backup e disaster recovery](conf-dr.md) | Confiabilidade | Importante | ⚪ Não iniciado |
| [Incidentes e root cause analysis](conf-rca.md) | Confiabilidade | Importante | ⚪ Não iniciado |

---

[← Índice do roadmap](../README.md)
