<template>
  <div class="maxWidth">
    <div class="py-4 container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <div class="row">
                <div class="col-md-6">
                  <h5>Clientes</h5>
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

                        Status
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
                    <tr v-for="cliente in state.clientes" :key="cliente.id">
                      <td data-label="Código">{{ cliente.id }}</td>
                      <td data-label="Nome">{{ cliente.nome }}</td>
                      <td data-label="Status">{{ cliente.status }}</td>
                      <td data-label="Tipo Pessoa">{{ cliente.tipo_pessoa }}</td>
                      <td data-label="Telefone Principal">{{ cliente.telefone_principal }}</td>
                      <td class="td_flex" data-label="Ação">
                        <NuxtLink :to="'/admin/clientes/' + cliente.id">
                          <button title="Alterar" class="btn btn-primary">
                            <i class="bi bi-pencil-fill"></i>
                          </button>
                        </NuxtLink>
                        <NuxtLink :to="'/admin/endereco/' + cliente.id">
                          <button title="Endereço" class="btn btn-warning">
                            <i class="bi bi-list-columns-reverse"></i>
                          </button>
                        </NuxtLink>
                        <button @click="deletarCliente(cliente.id)" title="Deletar" class="btn btn-danger">
                          <i class="bi bi-trash"></i>
                        </button>
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
import services from "./../../services/axios";
export default {
  setup() {
    useServerHead({
      title: "Protecty Alarmes - Clientes",
    });
    definePageMeta({
      middleware: "auth",
    });
    onMounted(() => {
      fetchClientes(token);
    });
    const authStore = useAuthStore();
    const token = authStore.token;

    const state = reactive({
      clientes: [],
    });
    async function fetchClientes() {
      try {
        const { data } = await services.clientes.getAll(token);
        console.log(data);
        state.clientes = data;
      } catch (error) {
        console.log(error);
      }
    }
    async function deletarCliente(id) {
      console.log(token)
      if (confirm("Deseja deletar este cliente?")) {
        try {
          state.isLoading = true;
          const { data } = await services.clientes.delete({
            id: id,
            token
          });
          console.log(data.status);
          if (data.status != 200) {
            alert("Erro ao deletar cliente.");
          } else {
            fetchClientes();
          }
        } catch (error) {
          alert(error.response.data.msg)
          console.log(error.response.data.msg);
        }
      }
    }
    return {
      state,
      deletarCliente,
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