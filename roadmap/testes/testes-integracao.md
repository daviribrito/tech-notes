<!-- GERADO a partir do portfólio. Edite em daviribrito/portfolio/data/roadmap.js -->

# Testes de integração com banco

> Testar a API contra um PostgreSQL de verdade, sem sujar os dados entre um teste e outro.

| Área | Status | Progresso |
|---|---|---|
| Testes e qualidade | 🟡 Estudando | `████░░░░░░` 40% |

🔗 **No portfólio:** [Testes de integração com banco](https://daviribrito.github.io/portfolio/topico.html?id=testes-integracao)

## Anotações

- Banco real em container (Docker ou o service do GitHub Actions), com as mesmas migrações de produção.
- Cada teste roda dentro de uma transação que é desfeita no final: o banco volta limpo e os testes não dependem da ordem.
- Supertest chama as rotas da API sem subir servidor na rede e confere status, corpo e o que foi gravado.
- Dados de teste criados por funções (fábricas) dentro do próprio teste, não por um dump compartilhado.

## Armadilhas

- ⚠️ Mockar o banco num teste de integração: o teste passa e o SQL quebrado só aparece em produção.
- ⚠️ Testes que dependem da ordem ou de dados deixados por outro teste: passam sozinhos e falham na suíte.
- ⚠️ Usar SQLite no teste e PostgreSQL em produção: tipos, locks e funções se comportam diferente.

## Código

```js
const request = require("supertest");
const { app, pool } = require("../src/app");

let client;
beforeEach(async () => {
  client = await pool.connect();
  await client.query("BEGIN");          // tudo que o teste gravar...
  app.locals.db = client;
});
afterEach(async () => {
  await client.query("ROLLBACK");       // ...é desfeito aqui
  client.release();
});

test("POST /pedidos grava o pedido e os itens", async () => {
  const res = await request(app)
    .post("/pedidos")
    .send({ clienteId: 1, itens: [{ produtoId: 7, qtd: 2 }] });

  expect(res.status).toBe(201);
  const { rows } = await client.query("SELECT qtd FROM itens_pedido WHERE pedido_id = $1", [res.body.id]);
  expect(rows).toEqual([{ qtd: 2 }]);
});
```

---

[← Índice do roadmap](../README.md)
