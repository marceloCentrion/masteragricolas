<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h4>Dados do Pedido</h4>
        <div class="row">
          <div class="col-md-6">
            <p>
              Pedido feito por: <span>{{ state.pedido.cliente.nome }}</span>
            </p>
            <p>
              Pedido criado: <span>{{ state.pedido.data_criado }}</span>
            </p>
            <p>Valor Total: {{ state.pedido.valor_total }}</p>
            <p>Valor do Frete: {{ state.pedido.valor_frete }}</p>
            <p>Valor dos Produtos: {{ state.pedido.valor_produtos }}</p>
          </div>
          <div class="col-md-3 offset-md-3">
            <labe style="text-align: left !important">Status</labe>
            <select v-model="state.pedido.status" class="form-select">
              <option value="PENDENTE">Pendente</option>
              <option value="CANCELADO">Cancelado</option>
              <option value="ENVIADO">Enviado</option>
              <option value="ENCERRADO">Encerrado</option>
            </select>
            <button @click="upStatus" class="btn btn-success mt-2">
              Salvar
            </button>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="endereco mb-4">
          <p class="title_table">Endereço</p>
          <div class="row">
            <div class="col-md-4 mb-2">
              <label>Logradouro:</label>
              <div class="div">
                <p>{{ state.pedido.endereco.logradouro }}</p>
              </div>
            </div>
            <div class="col-md-4 mb-2">
              <label>Número:</label>
              <div class="div">
                <p>{{ state.pedido.endereco.numero }}</p>
              </div>
            </div>
            <div class="col-md-4 mb-2">
              <label>Complemento:</label>
              <div class="div">
                <p>{{ state.pedido.endereco.complemento }}</p>
              </div>
            </div>
            <div class="col-md-4 mb-2">
              <label>Bairro:</label>
              <div class="div">
                <p>{{ state.pedido.endereco.bairro }}</p>
              </div>
            </div>
            <div class="col-md-4 mb-2">
              <label>Cidade:</label>
              <div class="div">
                <p>{{ state.pedido.endereco.cidade.nome }}</p>
              </div>
            </div>
            <div class="col-md-4 mb-2">
              <label>CEP:</label>
              <div class="div">
                <input readonly v-model="state.pedido.endereco.cep" />
              </div>
            </div>
          </div>
        </div>
        <span class="title_table">Tabela de Produtos</span>
        <table class="table table-hover">
          <thead class="table-danger">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Código</th>
              <th scope="col">Produto</th>
              <th scope="col">Preço</th>
              <th scope="col">Desconto</th>
              <th scope="col">Quantidade</th>
              <th scope="col">Ver Produto</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="produto in state.pedido.produtos" :key="produto.id">
              <td scope="row">{{ produto.id }}</td>
              <td>{{ produto.codigo }}</td>
              <td>{{ produto.nome }}</td>
              <td>{{ produto.preco }}</td>
              <td>{{ produto.preco_desconto }}</td>
              <td>{{ produto.pivot.quantidade }}</td>
              <td>
                <a title="Ver Produto" class="btn btn_ver" target="_blank" :href="'/produto/' + produto.urn"><i
                    class="bi bi-eye-fill"></i></a>
              </td>
            </tr>
          </tbody>
        </table>
        <span class="span_total">Total: {{ state.pedido.valor_total }}</span>
        <div class="btns_right">
          <router-link to="/admin/pedidos">
            <button type="button" class="btn_cancel">Voltar</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import services from "../../services/axios";
export default {
  setup() {
    definePageMeta({
      middleware: "auth",
    });
    const router = useRouter();
    const state = reactive({
      pedido: {
        status: "",
        cliente: {},
        endereco: { cidade: {} },
        produtos: [{ pivot: {} }],
      },
    });
    onMounted(() => {
      fetchpedido();
    });
    const authStore = useAuthStore();
    const token = authStore.token;

    async function fetchpedido() {
      try {
        const { data } = await services.clientes.getPedidosId({
          id: router.currentRoute._value.params.id,
          token,
        });
        state.pedido = data;
      } catch (error) {
        console.log(error);
      }
    }
    async function upStatus() {
      try {
        const { response } = await services.clientes.upPedido({
          id: router.currentRoute._value.params.id,
          pedido: state.pedido,
          token,
        });
        if (response.status !== 200) {
          alert('Erro ao atualizar pedido!')
        } else {
          alert('Status do pedido atualizado com sucesso!')
        }
      } catch (error) {
        console.log(error);
      }
    }
    return {
      router,
      state,
      upStatus,
    };
  },
};
</script>
<style scoped>
.table {
  margin-bottom: 0;
}

span {
  color: #000;
}

h4 {
  color: #000;
  margin-bottom: 0;
}

label {
  color: #000;
  font-size: 12pt;
  margin-bottom: 0;
  margin-top: 0;
  margin-left: 0;
}

input:focus {
  border: none;
  outline: none;
}

input {
  border: none;
  cursor: default;
}

select {
  border: solid 1px #000;
}

select:focus {
  border: solid 1px #8b0000;
}

.btns_right {
  text-align: right;
  margin-top: 1em;
}

.btn_save {
  padding: 5px;
  width: 100px;
  background: #00a000;
  border: solid 2px #000;
  border-radius: 5px;
  transition: 0.2s;
}

.btn_save:hover {
  background: #008000;
}

.btn_cancel {
  padding: 5px;
  width: 100px;
  background: #c4342d;
  border: solid 2px #000;
  border-radius: 5px;
  margin-left: 10px;
  transition: 0.2s;
  color: #000;
}

.btn_cancel:hover {
  background: #8f0303;
}

.card {
  border: solid 2px #000;
  border-radius: 10px;
  background-color: #fff;
}

tr {
  text-align: center;
}

th {
  border-bottom: solid 2px #000 !important;
}

td {
  border-bottom: solid 1px #000 !important;
  color: #000;
}

.table-hover>tbody>tr:hover>* {
  color: rgb(0, 0, 0);
  background-color: rgb(225, 225, 225);
}

.title_table {
  color: #000;
  font-size: 14pt;
  font-weight: 700;
}

.btn_ver {
  background: #000;
  margin-bottom: 0;
  color: #fff;
}

.span_total {
  color: #000;
  font-size: 14pt;
  font-weight: 500;
}

.div {
  border-bottom: solid 2px #fdd7de;
  height: 30px;
}

.div p {
  margin-bottom: 0;
  color: black;
  font-size: 12pt;
  font-weight: 500;
  text-align: justify;
}

.card-header p {
  margin-bottom: 0;
  color: #000;
  font-size: 12pt;
}

.card-header {
  font-size: 14pt;
  color: #000;
  font-weight: 600;
}

.card-header span {
  font-size: 14pt;
  color: #000;
  font-weight: 600;
}
</style>