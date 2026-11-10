<!-- GERADO a partir do portfólio. Edite em daviribrito/portfolio/data/roadmap.js -->

# Containers com Docker

> Empacotar a aplicação com tudo o que ela precisa para rodar igual em qualquer lugar.

| Área | Status | Progresso |
|---|---|---|
| DevOps e CI/CD | 🟡 Estudando | `█████░░░░░` 45% |

🔗 **No portfólio:** [Containers com Docker](https://daviribrito.github.io/portfolio/topico.html?id=docker)

## Anotações

- Imagem é a receita congelada (código + dependências + runtime); container é a imagem rodando.
- Multi-stage build: uma etapa instala e compila, a imagem final leva só o necessário e fica bem menor.
- A ordem das camadas importa: copiar package*.json e instalar antes de copiar o código aproveita o cache a cada build.
- Docker Compose sobe a API, o PostgreSQL e o Redis juntos para desenvolver e testar localmente.

## Armadilhas

- ⚠️ Usar a tag latest: o deploy de amanhã pode pegar outra imagem. Marque a imagem com o SHA do commit.
- ⚠️ Rodar como root dentro do container e esquecer o .dockerignore (node_modules, .env e .git vão para a imagem).
- ⚠️ Colocar segredos no Dockerfile ou na imagem: qualquer um que baixar a imagem consegue ler.

## Código

```dockerfile
# etapa 1: instala dependências
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

# etapa 2: imagem final, só com o necessário
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY src ./src
USER node
EXPOSE 3000
CMD ["node", "src/server.js"]
```

---

[← Índice do roadmap](../README.md)
