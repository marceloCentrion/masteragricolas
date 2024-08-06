<template>
  <div>
    <top :tela="'ecommerce'" />
    <div class="container">
      <div class="title mt-4 mb-4">
        <h2>Pedidos</h2>
      </div>
      <div class="row" v-if="state.pedidos.length > 0">
        <div v-if="state.pedidos.length <= 0">
          <h4>Você ainda não possui pedidos</h4>
        </div>
        <div
          class="col-lg-8 col-md-10 mb-5"
          v-for="pedido in state.pedidos"
          :key="pedido.id"
        >
          <div class="quad">
            <div class="row">
              <div class="col-lg-3 col-md-3">
                <div class="div_img">
                  <img
                    id="img_pedido"
                    :src="pedido.produtos[0].imagens[0].imagem"
                  />
                </div>
              </div>
              <loader :loader="state.loader" />
              <div class="col-lg-6 col-md-5">
                <span :class="state.arrayStatus[pedido.status]">
                  {{ pedido.status }}
                </span>
                <div
                  v-for="(produto, index) in pedido.produtos"
                  :key="produto.id"
                >
                  <div class="div_nome" v-if="index <= 4">
                    <p>{{ produto.nome }}</p>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-4">
                <div class="div_btn">
                  <a :href="'/meus-pedidos/' + pedido.id">
                    <button class="btn_transparent">Ver Pedido</button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col-md-10 offset-md-1">
          <h2 style="font-weight: bolder">
            Parece que você não possui pedidos!
          </h2>
          <div class="mb-5 mt-5">
            <a href="/" class="btn btn-secondary mr-3"
              >Voltar para a página inicial</a
            >
            <a
              href="/produtos"
              class="btn"
              style="background-color: #263c28; color: white"
              >Voltar para os produtos</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, reactive } from "vue";
import services from "../../services/axios";

export default {
  setup() {
    useServerHead({
      title: "Protecty Alarmes - Meus Pedidos",
    });
    definePageMeta({
      layout: "site",
      middleware: 'client',
    });
    const clienteAuthStore = useClienteAuthStore();
    const { client_token, client_id } = storeToRefs(clienteAuthStore);

    const state = reactive({
      pedidos: [{ produtos: [{ imagens: [{ imagem: "" }] }] }],
      arrayStatus: {
        PENDENTE: "classe_a",
        ENVIADO: "classe_b",
        CANCELADO: "classe_c",
        ENCERRADO: "classe_d",
      },
      loader: false,
    });
    onMounted(() => {
      fetchPedidos();
    });
    async function fetchPedidos() {
      state.loader = true;
      try {
        const { data } = await services.clientes.getMeusPedidos({
          client_token: client_token.value,
          id: client_id.value,
        });
        state.pedidos = data;
        state.loader = false;
      } catch (error) {
        state.loader = false;
        console.log(error);
      }
    }
    return {
      state,
    };
  },
};
</script>
<style scoped>
.div_img {
  padding: 10px;
}

.quad {
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 0px 21px 0px rgba(0, 0, 0, 0.25);
  width: 100%;
  padding: 15px;
}

#img_pedido {
  width: 100%;
  height: 100px;
  object-fit: cover;
}

.classe_a {
  color: blue;
}

.classe_b {
  color: green;
}

.classe_c {
  color: red;
}

.classe_d {
  color: yellow;
}

.div_nome p {
  color: #666;
  font-size: 16px;
  font-style: normal;
  line-height: normal;
  margin-bottom: 0;
}

.btn_transparent {
  font-family: "Poppins", sans-serif;
  border-radius: 4px;
  border: 1px solid #000;
  background: transparent;
  color: #000;
  width: auto;
  transition: 0.5s;
  padding: 5px 20px;
}

.btn_transparent:hover {
  background: #000;
  color: #fff;
}

.title h2 {
  color: #000;
  font-size: 32px;
}

.div_btn {
  justify-content: end;
  align-items: center;
  display: flex;
  height: 100%;
}

@media (min-width: 768px) and (max-width: 991px) {
  #img_pedido {
    height: 50px;
  }

  .btn-red {
    margin-top: auto;
  }
}
</style>