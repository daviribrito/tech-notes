<!-- GERADO a partir do portfólio. Edite em daviribrito/portfolio/data/roadmap.js -->

# Retry com backoff

> Tentar de novo sem derrubar quem já está caindo.

| Área | Status | Progresso |
|---|---|---|
| Confiabilidade | ✅ Dominado | `██████████` 100% |

🔗 **No portfólio:** [Retry com backoff](https://daviribrito.github.io/portfolio/topico.html?id=retry) (com laboratório interativo)

## Anotações

- Retry imediato e em intervalo fixo sincroniza os clientes: todos voltam ao mesmo tempo e o servidor recebe um pico maior que o original.
- Backoff exponencial espaça as tentativas; o jitter espalha os clientes dentro de cada janela.
- Full jitter (sleep = random(0, base * 2^n)) costuma distribuir melhor a carga que equal jitter.

## Armadilhas

- ⚠️ Só fazer retry de operações idempotentes, ou de erros que garantem que nada foi executado.
- ⚠️ Limitar o total de tentativas e respeitar o Retry-After quando o servidor mandar.

## Código

```js
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function comRetry(fn, { tentativas = 5, base = 100, teto = 5000 } = {}) {
  for (let n = 0; ; n++) {
    try {
      return await fn();
    } catch (erro) {
      if (n + 1 >= tentativas || !erro.retentavel) throw erro;
      const janela = Math.min(teto, base * 2 ** n);
      await sleep(Math.random() * janela); // full jitter
    }
  }
}
```

---

[← Índice do roadmap](../README.md)
