<!-- GERADO a partir do portfólio. Edite em daviribrito/portfolio/data/roadmap.js -->

# Transactional outbox

> Gravar no banco e publicar o evento sem perder nenhum dos dois.

| Área | Status | Progresso |
|---|---|---|
| Sistemas distribuídos | 🟡 Estudando | `███░░░░░░░` 30% |

🔗 **No portfólio:** [Transactional outbox](https://daviribrito.github.io/portfolio/topico.html?id=outbox) (com laboratório interativo)

## Anotações

- Escrita dupla (salvar no banco e depois publicar na fila) quebra se o processo cair entre os dois passos.
- Com outbox, o evento é gravado numa tabela na mesma transação do pedido. Ou os dois existem, ou nenhum.
- Um relay lê a tabela outbox e publica. A entrega é pelo menos uma vez, então o consumidor precisa ser idempotente.

## Armadilhas

- ⚠️ Vários relays lendo a mesma tabela: use SELECT ... FOR UPDATE SKIP LOCKED.
- ⚠️ A tabela outbox cresce para sempre se ninguém limpar as linhas publicadas.

## Código

```js
await db.tx(async (t) => {
  const pedido = await t.one(
    "INSERT INTO pedidos (cliente_id, total) VALUES ($1, $2) RETURNING *", [cliente, total]);
  await t.none(
    "INSERT INTO outbox (tipo, payload) VALUES ('pedido.criado', $1)", [pedido]);
}); // um commit só: pedido e evento juntos

// relay, em outro processo
const linhas = await db.any(
  "SELECT * FROM outbox WHERE publicado_em IS NULL ORDER BY id LIMIT 100 FOR UPDATE SKIP LOCKED");
```

---

[← Índice do roadmap](../README.md)
