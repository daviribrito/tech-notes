<!-- GERADO a partir do portfólio. Edite em daviribrito/portfolio/data/roadmap.js -->

# Pipeline de CI/CD

> Cada push passa por lint, testes e build antes de chegar em produção.

| Área | Status | Progresso |
|---|---|---|
| DevOps e CI/CD | 🟡 Estudando | `█████░░░░░` 50% |

🔗 **No portfólio:** [Pipeline de CI/CD](https://daviribrito.github.io/portfolio/topico.html?id=ci-pipeline) (com laboratório interativo)

## Anotações

- CI (integração contínua): a cada push ou pull request o código é verificado automaticamente. O dev descobre o erro em minutos, não no deploy.
- CD (entrega/implantação contínua): o que passou no CI vira um artefato que segue sozinho para staging e produção.
- Falhar rápido: as etapas mais baratas vêm primeiro (lint, unitários); build e deploy só rodam se tudo antes passou.
- O pipeline é código versionado junto com o projeto (.github/workflows), revisado em PR como qualquer outro arquivo.
- Construir o artefato uma vez e promover a mesma imagem entre ambientes; não recompilar para produção.

## Armadilhas

- ⚠️ Segredos impressos no log ou expostos para PRs de forks: use os secrets do repositório e nunca dê echo neles.
- ⚠️ Versões diferentes entre a máquina e o CI ("na minha máquina funciona"): fixe a versão do Node e use npm ci com o lockfile.
- ⚠️ Pipeline lento sem cache de dependências: o time passa a evitar o CI.

## Código

```yaml
# .github/workflows/ci.yml
name: CI
on:
  pull_request:
  push:
    branches: [main]

jobs:
  testes:
    runs-on: ubuntu-latest
    services:
      postgres:                       # banco real para os testes de integração
        image: postgres:16
        env:
          POSTGRES_PASSWORD: teste
        ports: ["5432:5432"]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run lint             # falha rápido: o mais barato primeiro
      - run: npm test
        env:
          DATABASE_URL: postgres://postgres:teste@localhost:5432/postgres

  build:
    needs: testes                     # só roda se os testes passarem
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: docker build -t app:${{ github.sha }} .
```

---

[← Índice do roadmap](../README.md)
