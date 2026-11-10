<!-- GERADO a partir do portfólio. Edite em daviribrito/portfolio/data/roadmap.js -->

# Rate limiting

> Aceitar só o volume que o sistema aguenta, de forma justa.

| Área | Status | Progresso |
|---|---|---|
| Confiabilidade | 🟡 Estudando | `█████░░░░░` 45% |

🔗 **No portfólio:** [Rate limiting](https://daviribrito.github.io/portfolio/topico.html?id=rate-limiting) (com laboratório interativo)

## Anotações

- Token bucket: o balde enche a uma taxa fixa; cada requisição gasta uma ficha. Permite rajadas curtas até a capacidade do balde.
- Sem ficha, a resposta é 429 com Retry-After, e o cliente faz backoff.
- Em vários servidores, o balde precisa ficar num lugar compartilhado (Redis) e a operação precisa ser atômica.

## Armadilhas

- ⚠️ Limitar por IP pune quem está atrás do mesmo NAT; prefira limitar por chave de API ou por usuário.
- ⚠️ Janela fixa permite o dobro do limite na virada da janela.

## Código

```js
function criarBalde({ capacidade, porSegundo }) {
  let fichas = capacidade, ultimo = Date.now();
  return function permitir() {
    const agora = Date.now();
    fichas = Math.min(capacidade, fichas + ((agora - ultimo) / 1000) * porSegundo);
    ultimo = agora;
    if (fichas < 1) return false; // 429
    fichas -= 1;
    return true;
  };
}
```

---

[← Índice do roadmap](../README.md)
