import { useLocalStorage } from "@vueuse/core";

export const useCarrinhoStore = defineStore("carrinho", {
    state: () => ({
        itens: useLocalStorage("carrinho", []),
        valores_produtos: useLocalStorage("valores_pedido", {
            total: 0,
            total_pix: 0,
            total_desconto: 0
        }),
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
        }
    },
    hydrate(state, initialState) {
        state.itens = useLocalStorage("carrinho", []);
        state.valores_produtos = useLocalStorage("valores_pedido", {
            total: 0,
            total_pix: 0,
            total_desconto: 0
        });
    }
})