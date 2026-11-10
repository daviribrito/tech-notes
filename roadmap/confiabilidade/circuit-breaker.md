<!-- GERADO a partir do portfólio. Edite em daviribrito/portfolio/data/roadmap.js -->

# Circuit breaker

> Parar de chamar um serviço que está falhando e dar tempo para ele voltar.

| Área | Status | Progresso |
|---|---|---|
| Confiabilidade | 🟡 Estudando | `██████░░░░` 60% |

🔗 **No portfólio:** [Circuit breaker](https://daviribrito.github.io/portfolio/topico.html?id=circuit-breaker) (com laboratório interativo)

## Anotações

- Fechado: as chamadas passam e as falhas são contadas.
- Aberto: depois de N falhas, as chamadas falham na hora, sem esperar o timeout.
- Meio-aberto: depois de um tempo, deixa passar uma chamada de teste. Se der certo, fecha; se falhar, abre de novo.

## Armadilhas

- ⚠️ Contar falhas por janela de tempo, não só em sequência, para não abrir com um único pico.
- ⚠️ No meio-aberto, limitar as chamadas de teste; deixar todas passarem derruba o serviço que estava se recuperando.

## Código

```js
class Disjuntor {
  estado = "fechado"; falhas = 0; abertoEm = 0;

  async chamar(fn) {
    if (this.estado === "aberto") {
      if (Date.now() - this.abertoEm < 3000) throw new Error("circuito aberto");
      this.estado = "meio-aberto";
    }
    try {
      const r = await fn();
      this.estado = "fechado"; this.falhas = 0;
      return r;
    } catch (e) {
      if (this.estado === "meio-aberto" || ++this.falhas >= 3) {
        this.estado = "aberto"; this.abertoEm = Date.now();
      }
      throw e;
    }
  }
}
```

---

[← Índice do roadmap](../README.md)
