<!-- GERADO a partir do portfólio. Edite em daviribrito/portfolio/data/roadmap.js -->

# Fluxo de testes: do TDD ao merge

> Em que momento cada teste roda, da máquina do dev até o deploy.

| Área | Status | Progresso |
|---|---|---|
| Testes e qualidade | 🟡 Estudando | `████░░░░░░` 35% |

🔗 **No portfólio:** [Fluxo de testes: do TDD ao merge](https://daviribrito.github.io/portfolio/topico.html?id=fluxo-testes)

## Anotações

- TDD em três passos: escreve um teste que falha (vermelho), faz o mínimo para passar (verde) e melhora o código com o teste protegendo (refatorar).
- Na máquina: testes unitários em modo watch enquanto codifica; hook de pre-commit roda lint e os testes rápidos.
- No pull request: o CI roda a suíte completa (unitários + integração). PR só pode ser mergeado com o pipeline verde.
- Depois do merge: build, deploy em staging, testes E2E de fumaça e só então produção.
- Bug encontrado vira primeiro um teste que reproduz o bug; a correção vem depois e o teste impede que ele volte.

## Armadilhas

- ⚠️ Teste instável (flaky) ignorado com retry automático: o time aprende a não confiar no vermelho.
- ⚠️ Suíte lenta demais para rodar antes do push: o dev pula e o CI vira o primeiro lugar onde o erro aparece.
- ⚠️ Proteção de branch desligada: alguém mergeia com o pipeline vermelho "só desta vez".

## Código

```js
// 1. Vermelho: o teste descreve o bug do cupom aplicado duas vezes
test("aplica o cupom uma vez só, mesmo se a requisição repetir", async () => {
  const pedido = await criarPedido({ total: 100 });
  await aplicarCupom(pedido.id, "DEZ");
  await aplicarCupom(pedido.id, "DEZ");               // repetição
  expect((await buscarPedido(pedido.id)).total).toBe(90);
});

// 2. Verde: a correção mínima
async function aplicarCupom(pedidoId, codigo) {
  const r = await db.query(
    "UPDATE pedidos SET total = total - 10, cupom = $2 WHERE id = $1 AND cupom IS NULL",
    [pedidoId, codigo]
  );
  return r.rowCount === 1;                             // false se já tinha cupom
}

// 3. Refatorar: com o teste verde, dá para mudar o código com segurança
```

---

[← Índice do roadmap](../README.md)
