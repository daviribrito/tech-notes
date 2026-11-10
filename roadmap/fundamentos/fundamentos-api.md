<!-- GERADO a partir do portfólio. Edite em daviribrito/portfolio/data/roadmap.js -->

# APIs REST com Node.js e PostgreSQL

> A base: rotas, validação, transações e migrações.

| Área | Status | Progresso |
|---|---|---|
| Fundamentos de backend | ✅ Dominado | `██████████` 100% |

🔗 **No portfólio:** [APIs REST com Node.js e PostgreSQL](https://daviribrito.github.io/portfolio/topico.html?id=fundamentos-api)

## Anotações

- Validar a entrada na borda da rota e responder 400 com o campo que falhou, antes de tocar no banco.
- Operações que mexem em mais de uma tabela vão numa transação: BEGIN, as queries no mesmo client e COMMIT, ou ROLLBACK no erro.
- Sempre consultas parametrizadas ($1, $2): nunca concatenar texto do usuário no SQL.
- O schema muda só por migrações versionadas no repositório, aplicadas na mesma ordem em todo ambiente.

## Armadilhas

- ⚠️ Usar pool.query() dentro de uma transação: cada chamada pode pegar outra conexão do pool, e o BEGIN fica numa conexão diferente do resto.
- ⚠️ Esquecer o client.release() no finally: o pool esgota e a API para de responder sem erro aparente.

## Código

```js
async function criarPedido(req, res) {
  const { clienteId, itens } = req.body;
  if (!clienteId || !Array.isArray(itens) || itens.length === 0) {
    return res.status(400).json({ erro: "clienteId e itens são obrigatórios" });
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const { rows } = await client.query(
      "INSERT INTO pedidos (cliente_id) VALUES ($1) RETURNING id",
      [clienteId]
    );
    for (const item of itens) {
      await client.query(
        "INSERT INTO itens_pedido (pedido_id, produto_id, qtd) VALUES ($1, $2, $3)",
        [rows[0].id, item.produtoId, item.qtd]
      );
    }
    await client.query("COMMIT");
    res.status(201).json({ id: rows[0].id });
  } catch (erro) {
    await client.query("ROLLBACK");
    throw erro;
  } finally {
    client.release();
  }
}
```

---

[← Índice do roadmap](../README.md)
