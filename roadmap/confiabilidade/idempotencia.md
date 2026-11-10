<!-- GERADO a partir do portfólio. Edite em daviribrito/portfolio/data/roadmap.js -->

# Idempotência

> Repetir uma requisição sem repetir o efeito.

| Área | Status | Progresso |
|---|---|---|
| Confiabilidade | 🟡 Estudando | `████████░░` 80% |

🔗 **No portfólio:** [Idempotência](https://daviribrito.github.io/portfolio/topico.html?id=idempotencia) (com laboratório interativo)

## Anotações

- O cliente gera uma chave única por intenção (não por tentativa) e a envia no header Idempotency-Key.
- O servidor reserva a chave antes de processar. Se ela já existe, devolve a resposta guardada em vez de executar de novo.
- Reserva atômica no Redis com SET chave valor NX PX ttl: só uma requisição ganha a corrida.

## Armadilhas

- ⚠️ Duas requisições simultâneas com a mesma chave: sem reserva atômica, as duas processam.
- ⚠️ Mesma chave com corpo diferente deve ser rejeitada (422), não tratada como repetição.
- ⚠️ TTL curto demais faz um retry tardio virar uma cobrança nova.

## Código

```js
async function pagar(req, res) {
  const chave = req.get("Idempotency-Key");
  const reservou = await redis.set(`idem:${chave}`, "em-andamento", { NX: true, PX: 86_400_000 });

  if (!reservou) {
    const salvo = await redis.get(`idem:${chave}`);
    if (salvo === "em-andamento") return res.status(409).end();
    return res.status(200).json(JSON.parse(salvo)); // mesma resposta, nenhum efeito novo
  }

  const recibo = await cobrar(req.body);
  await redis.set(`idem:${chave}`, JSON.stringify(recibo), { PX: 86_400_000 });
  res.status(201).json(recibo);
}
```

---

[← Índice do roadmap](../README.md)
