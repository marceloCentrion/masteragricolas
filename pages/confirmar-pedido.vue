<template>
  <div style="background: #fcfcfc">
    <div class="container">
      <div class="title mt-4 mb-sm-4">
        <h2 style="font-weight: bold">Confirmar Pedido</h2>
      </div>
      <div class="row">
        <div class="col-md-10 offset-md-1">
          <div class="row">
            <div class="table-responsive">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Produto</th>
                    <th scope="col">Título</th>
                    <th scope="col">Preço</th>
                    <th scope="col">Quantidade</th>
                    <th scope="col" style="text-align: center;">Ver Produto</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="produto in state.carrinho" :key="produto.id">
                    <td><img id="img-table" :src="produto.imagem" /></td>
                    <td>{{ produto.nome }}</td>
                    <td>{{ produto.preco }}</td>
                    <td>{{ produto.quantidade }}</td>
                    <td style="text-align: center;"> <a :href="'/produto/' + produto.urn"><button
                          class="btn btn-dark"><i class="bi bi-eye"></i></button></a></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-2 col-sm-4 mb-6 mt-6">
          <div class="div_btn_endereco">
            <a href="/carrinho">
              <button title="Voltar" class="btn_transparent">Voltar</button>
            </a>
          </div>
        </div>
        <div class="col-lg-2 col-sm-4 offset-lg-8 offset-sm-4 mb-6 mt-sm-6">
          <div class="div_btn_endereco">
            <a href="/finalizar-pedido">
              <button title="Voltar" class="btn_transparent">Finalizar Pedido</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, reactive } from "vue";
//import services from "./../services/axios";
export default {
  setup() {
    const carrinhoStore = useCarrinhoStore();
    const { itens, valores_produtos } = storeToRefs(carrinhoStore);

    useServerHead({
      title: "Protecty Alarmes - Confirmar Pedido",
    });
    definePageMeta({
      layout: "site",
    });
    const state = reactive({
    });
    state.carrinho = itens;
    state.valores_produtos = valores_produtos;
    console.log(state.carrinho)
    onMounted(() => {
    });

    return {
      state,
    };
  },
};
</script>
<style scoped>
.title h2 {
  color: #000;
  font-size: 32px;
}

#img-table {
  width: 50px;
  height: 50px;
  object-fit: cover;
}

.btn_transparent {
  font-family: 'Poppins', sans-serif;
  border-radius: 4px;
  border: 1px solid #000;
  background: transparent;
  color: #000;
  width: 230px;
  padding: 10px;
  transition: 0.5s;
}

.btn_transparent:hover {
  background: #000;
  color: #fff;
}

@media (min-width: 992px) and (max-width: 1200px) {
  .btn_transparent {
    width: 100%;
    font-size: 11pt;
  }

}

@media (min-width: 768px) and (max-width: 991px) {
  .btn_transparent {
    width: 100%;
    font-size: 11pt;
  }
}

@media (min-width: 576px) and (max-width: 767px) {
  .btn_transparent {
    width: 100%;
    font-size: 11pt;

  }
}

@media (max-width: 575px) {
  .btn_transparent {
    width: 160px;
    padding: 5px;
    font-size: 11pt;

  }
}
</style>