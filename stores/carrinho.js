import { useLocalStorage } from "@vueuse/core";

export const useCarrinhoStore = defineStore("carrinho", {
  state: () => ({
    fretes: useLocalStorage("fretes", {}),
    obj_frete: useLocalStorage("obj_frete", {}),
    metodo_frete: useLocalStorage("metodo_frete", "CORREIOS"),
    itens: useLocalStorage("carrinho", []),
    pedido: useLocalStorage("pedido", {}),
    valores_produtos: useLocalStorage("valores_pedido", {
      total: 0,
      total_pix: 0,
      total_desconto: 0
    }),
    frete_selecionado: useLocalStorage("valor_frete", {
      valor_frete: 0,
      metodo: "PAC"
    }),
    valor_total: useLocalStorage("valor_total", 0),
  }),
  actions: {
    addItem(item) {
      if (this.itemExists(item.produtos_id)) this.addQtd(item.produtos_id);
      else this.itens.push(item);
      this.sumTotal();
    },
    addQtd(itemId) {
      const item = this.itens.find((i) => i.produtos_id === itemId);
      if (!item) return;
      item.quantidade++;
      this.sumSubtotal(itemId);
      this.sumTotal();
    },
    removeItem(itemId) {
      this.itens = this.itens.filter((i) => i.produtos_id !== itemId);
      this.sumTotal();
    },
    adicionarPedido(pedido) {
      this.pedido = pedido;
    },
    removeQtd(itemId) {
      const item = this.itens.find((i) => i.produtos_id === itemId);
      if (!item) return;
      if (item.quantidade > 1) {
        item.quantidade--;
        this.sumSubtotal(itemId);
      } else {
        this.removeItem(itemId);
      }
      this.sumTotal();
    },
    setQtd(itemId, qtd) {
      const item = this.itens.find((i) => i.produtos_id === itemId);
      if (!item) return;
      item.quantidade = qtd;
      this.sumSubtotal(itemId);
      this.sumTotal();
    },
    sumSubtotal(itemId) {
      const item = this.itens.find((i) => i.produtos_id === itemId);
      item.subtotal = item.preco * item.quantidade;
      item.subtotal_pix = item.preco_pix * item.quantidade;
      item.subtotal_desconto = item.preco_desconto * item.quantidade;
    },
    sumTotal() {
      this.valores_produtos.total = 0;
      this.valores_produtos.total_pix = 0;
      this.valores_produtos.total_desconto = 0;
      for (let item of this.itens) {
        const quantidade = item.quantidade;
        this.valores_produtos.total += item.preco * quantidade;
        this.valores_produtos.total_pix += item.preco_pix * quantidade;
        this.valores_produtos.total_desconto += item.preco_desconto * quantidade;
      }
    },
    itemExists(itemId) {
      return this.itens.find((i) => i.produtos_id === itemId);
    },
    limparCarrinho() {
      this.itens = [];
      this.valores_produtos = {
        total: 0,
        total_pix: 0,
        total_desconto: 0
      };
    },
    freteSimples(frete, valor_frete) {
      this.sumTotal();
      this.fretes = {};
      this.obj_frete = {};
      var frete = {};
      frete.valor_frete = valor_frete;
      this.obj_frete = frete;
      this.frete_selecionado = frete;
      this.metodo_frete = frete;
      this.valores_produtos.total = parseFloat(this.valores_produtos.total) + parseFloat(valor_frete);
      this.valores_produtos.total_pix = parseFloat(this.valores_produtos.total_pix) + parseFloat(valor_frete);
      this.valores_produtos.total_desconto = parseFloat(this.valores_produtos.total_desconto) + parseFloat(valor_frete);
      this.valor_total = parseFloat(this.valor_total) + parseFloat(valor_frete);
      this.valor_total_desconto = parseFloat(this.valor_total_desconto) + parseFloat(valor_frete);
      this.valor_total_pix = parseFloat(this.valor_total_pix) + parseFloat(valor_frete);
    },
    limparFrete() {
      this.sumTotal();
      this.fretes = {};
      this.obj_frete = {};
    },
    adicionaFrete(fretes, frete) {
      var valor_frete = frete.preco
      var frete = {};
      frete.valor_frete = valor_frete;
      //  this.valores_produtos.total = this.valores_produtos.total + frete.valor_frete;

      this.frete_selecionado = frete;
      this.valores_produtos.total = parseFloat(this.valores_produtos.total) + parseFloat(valor_frete);
      this.valores_produtos.total_pix = parseFloat(this.valores_produtos.total_pix) + parseFloat(valor_frete);
      this.valores_produtos.total_desconto = parseFloat(this.valores_produtos.total_desconto) + parseFloat(valor_frete);
      this.valor_total = parseFloat(this.valor_total) + parseFloat(valor_frete);
      this.valor_total_desconto = parseFloat(this.valor_total_desconto) + parseFloat(valor_frete);
      this.valor_total_pix = parseFloat(this.valor_total_pix) + parseFloat(valor_frete);
      this.fretes = fretes;
      this.obj_frete = frete;
    },
  },
  hydrate(state, initialState) {
    state.itens = useLocalStorage("carrinho", []);
    state.valores_produtos = useLocalStorage("valores_pedido", {
      total: 0,
      total_pix: 0,
      total_desconto: 0
    });
    state.pedido = useLocalStorage("pedido", {});
    state.valor_total = useLocalStorage("valor_total", 0);
    state.fretes = useLocalStorage("fretes", {});
    state.obj_frete = useLocalStorage("obj_frete", {});
    state.pedido = useLocalStorage("pedido", {});
  }
})