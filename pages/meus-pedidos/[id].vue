<template>
  <top />
  <div>
    <div class="container">
      <div class="title mt-4 mb-2">
        <h2>Pedido</h2>
      </div>
      <div class="card">
        <div class="row">
          <div class="col-md-6">
            <div class="informacao">
              <h5>Pedido feito: {{ state.pedido.data_criacao }}</h5>
              <h5>Valor total: {{ state.pedido.valor_total }}</h5>
              <h5>Valor do frete: {{ state.pedido.valor_frete }}</h5>
              <h5>Valor dos produtos: {{ state.pedido.valor_produtos }}</h5>
            </div>
          </div>
          <div class="col-md-6">
            <h5 style="color: #000; text-align: right">
              Status: {{ state.pedido.status }}
            </h5>
          </div>
        </div>
        <div class="div_endereco">
          <h5>
            Pedido Enviado para: {{ state.pedido.endereco.logradouro }}, N°{{
              state.pedido.endereco.numero
            }}, Bairro: {{ state.pedido.endereco.bairro }}
          </h5>
          <h5>Cidade: {{ state.pedido.endereco.cidade.nome }}</h5>
        </div>
      </div>
      <div class="div_itens">
        <h3>Itens</h3>
      </div>
      <div class="row">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Código</th>
              <th scope="col">Produto</th>
              <th scope="col">Título</th>
              <th scope="col">Preço</th>
              <th scope="col">Quantidade</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="produto in state.pedido.produtos" :key="produto.id">
              <td>{{ produto.ref }}</td>
              <td><img id="img-table" :src="produto.imagens[0].imagem" /></td>
              <td>{{ produto.nome }}</td>
              <td>R${{ produto.preco }}</td>
              <td>{{ produto.pivot.quantidade }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mt-3">
      <NuxtLink to="/meus-pedidos"><button class="btn_transparent">Voltar</button></NuxtLink>
      </div>
    </div>
  </div>
</template>
<script>
import services from "../../services/axios";
export default {
  setup() {
    useServerHead({
      title: "Protecty Alarmes - Ver Pedidos",
    });
    definePageMeta({
      layout: "site",
    });
    const router = useRouter();
    const clienteAuthStore = useClienteAuthStore();
    const { client_token } = storeToRefs(clienteAuthStore);

    const state = reactive({
      pedido: {
        produtos: [{ imagens: [{ imagem: "" }], pivot: {} }],
        endereco: { cidade: {} },
      },
    });
    onMounted(() => {
      fetchPedidos();
    });
    async function fetchPedidos() {
      try {
        const { data } = await services.clientes.getPedidoSite({
          client_token: client_token.value,
          id: router.currentRoute._value.params.id,
        });
        state.pedido = data;
      } catch (error) {
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
.btn_transparent {
  font-family: "Poppins", sans-serif;
  border-radius: 4px;
  border: 1px solid #000;
  background: transparent;
  color: #000;
  width: auto;
  padding: 10px 40px;
  transition: 0.5s;
}

.btn_transparent:hover {
  background: #000;
  color: #fff;
}

tr th {
  color: #fff;
  font-weight: 900;
  background: #000;
}

tr td {
  color: #000;
  font-weight: 700;
}

td,
th {
  text-align: center;
}

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

.div_nome p {
  color: #666;
  font-size: 16px;
  font-style: normal;
  line-height: normal;
  margin-bottom: 0;
}

.btn-red {
  border-radius: 4px;
  background: var(--Color-primary, #e13229);
  width: 100%;
  padding: 5px 10px;
  justify-content: center;
  align-items: center;
  border: none;
  color: #fff;
  margin-top: 45px;
}

.title h2 {
  color: #000;
  font-size: 32px;
}

.informacao h5 {
  color: #000;
}

.div_itens {
  margin-top: 2rem;
}

.div_itens h3 {
  color: #000;
}

.card {
  border-radius: 8px;
  border: 1.5px solid #dadae3;
  background: #fff;
  padding: 20px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}

.card-text {
  margin-bottom: 0;
  color: #000;
}

#img-table {
  width: 50px;
  height: 50px;
  object-fit: cover;
}

.div_endereco h5 {
  color: #000;
  margin-bottom: 0;
}

.table-striped>tbody>tr:nth-of-type(2n + 1)>* {
  color: #000;
}

@media (min-width: 768px) and (max-width: 991px) {}
</style>