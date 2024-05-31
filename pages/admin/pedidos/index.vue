<template>
  <div class="maxWidth">
    <div class="py-4 container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <div class="row">
                <div class="col-md-6">
                  <h5>Pedidos</h5>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th style="background-color: #00A859; color: #000" scope="col">

                        Código
                      </th>
                      <th style="background-color: #00A859; color: #000" scope="col">

                        Nome
                      </th>
                      <th style="background-color: #00A859; color: #000" scope="col">

                        Staus
                      </th>
                      <th style="background-color: #00A859; color: #000" scope="col">

                        Email
                      </th>
                      <th style="background-color: #00A859; color: #000" scope="col">

                        Tipo Pessoa
                      </th>
                      <th style="background-color: #00A859; color: #000" scope="col">

                        Telefone Principal
                      </th>
                      <th style="background-color: #00A859; color: #000" scope="col">

                        Ação
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="pedido in state.pedidos" :key="pedido.id">
                      <td>{{ pedido.id }}</td>
                      <td>{{ pedido.nome }}</td>
                      <td>{{ pedido.status }}</td>
                      <td>{{ pedido.email }}</td>
                      <td>{{ pedido.tipo_pessoa }}</td>
                      <td>{{ pedido.telefone_principal }}</td>
                      <td class="td_flex">
                        <a :href="'visualizar-pedido/' + pedido.id">
                          <button title="Endereço" class="btn btn-secondary">
                            <i class="bi bi-eye"></i></button></a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import services from "../../../services/axios";
export default {
  setup() {
    useServerHead({
      title: "Protecty Alarmes - Pedidos",
    });
    definePageMeta({
      middleware: "auth",
    });
    const state = reactive({
      pedidos: [],
    });
    onMounted(() => {
      fetchPedidos();
    });
    const authStore = useAuthStore();
    const token = authStore.token;

    async function fetchPedidos() {
      try {
        const { data } = await services.clientes.getPedidos({ token });
        console.log(data);
        state.pedidos = data;
      } catch (error) {
        console.log(error);
      }
    }
    // async function deletarCliente(id) {
    //   if (confirm("Deseja deletar este pedido?")) {
    //     try {
    //       state.isLoading = true;
    //       const { data } = await services.clientes.delete({
    //         id: id,
    //         token,
    //       });
    //       console.log(data.status);
    //       if (data.status != 200) {
    //         alert("Erro ao deletar pedido.");
    //       } else {
    //         fetchPedidos();
    //       }
    //     } catch (error) {
    //       console.log(error);
    //       alert(error.response.data.msg);

    //     }
    //   }
    // }
    return {
      state,
      // deletarCliente,
    };
  },
};
</script>

<style scoped>
h5 {
  color: #fff;
}

th {
  border-bottom: solid 1px #000 !important;
}

tr {
  text-align: center;

}

td {
  border-bottom: solid 1px #000 !important;
}

.card-header {
  background-color: #000;
  border-radius: 0px;

}

.card {
  border: solid 1px #000;
  border-radius: 5px;
  background-color: #fff;
}

.table-hover>tbody>tr:hover>* {
  color: rgb(0, 0, 0);
  background-color: rgb(225, 225, 225);
}

.btn {
  margin: 5px;
}
</style>