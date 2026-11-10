<!-- GERADO a partir do portfólio. Edite em daviribrito/portfolio/data/roadmap.js -->

# Pirâmide de testes

> Muitos testes rápidos na base, poucos testes lentos no topo.

| Área | Status | Progresso |
|---|---|---|
| Testes e qualidade | 🟡 Estudando | `██████░░░░` 60% |

🔗 **No portfólio:** [Pirâmide de testes](https://daviribrito.github.io/portfolio/topico.html?id=piramide-testes)

## Anotações

- Unitários: testam uma função ou regra isolada, rodam em milissegundos e formam a maior parte da suíte.
- Integração: testam a conversa com o que é real (banco, fila, outra API). Menos numerosos, pegam erro de SQL, de migração e de configuração.
- Ponta a ponta (E2E): sobem o sistema inteiro e simulam o usuário. Poucos, só para os fluxos que não podem quebrar (login, checkout).
- Cada teste segue Arrange, Act, Assert: prepara os dados, executa uma ação e confere um resultado.

## Armadilhas

- ⚠️ Pirâmide invertida (muitos E2E, poucos unitários): a suíte fica lenta, frágil e ninguém confia quando ela falha.
- ⚠️ Testar a implementação em vez do comportamento: qualquer refatoração quebra o teste sem que nada tenha quebrado de verdade.
- ⚠️ Cobertura alta não é qualidade: 100% de linhas executadas sem nenhum assert útil não prova nada.

## Código

```js
// regra de negócio pura: fácil de testar
function aplicarCupom(total, cupom, agora = new Date()) {
  if (cupom.expiraEm < agora) throw new Error("cupom expirado");
  return Math.max(0, total - cupom.valor);
}

test("aplica o desconto do cupom", () => {
  const cupom = { valor: 20, expiraEm: new Date("2099-01-01") };   // Arrange
  const total = aplicarCupom(100, cupom);                           // Act
  expect(total).toBe(80);                                           // Assert
});

test("rejeita cupom expirado", () => {
  const cupom = { valor: 20, expiraEm: new Date("2020-01-01") };
  expect(() => aplicarCupom(100, cupom)).toThrow("cupom expirado");
});
```

---

[← Índice do roadmap](../README.md)
