<template>
  <div class="maxWidth">
    <div class="py-4 container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <div class="row">
                <div class="col-5">
                  <h5>Produtos</h5>
                </div>
                <div class="col-7">
                  <NuxtLink to="">
                    <div style="text-align: right">
                      <NuxtLink to="/admin/produtos/cadastrar-produto">
                        <button type="button" class="btn btn-outline-light">Novo Produto</button>
                      </NuxtLink>
                    </div>
                  </NuxtLink>
                </div>
              </div>
            </div>
            <div class="table-responsive">
              <div class="card-body">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th style="background-color: #00A859; color: #000" scope="col">
                        Código
                      </th>
                      <th style="background-color: #00A859; color: #000" scope="col">
                        REF
                      </th>
                      <th style="background-color: #00A859; color: #000" scope="col">
                        Nome
                      </th>
                      <th style="background-color: #00A859; color: #000" scope="col">
                        Status
                      </th>
                      <th style="background-color: #00A859; color: #000" scope="col">
                        Categoria
                      </th>
                      <th style="background-color: #00A859; color: #000" scope="col">
                        Ação
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="produto in state.produtos" :key="produto.id">
                      <td>{{ produto.id }}</td>
                      <td>{{ produto.ref }}</td>
                      <td style="  line-height: 1.1;">{{ produto.nome }}</td>
                      <td>{{ produto.status }}</td>
                      <td>{{ produto.categoria.nome }}</td>
                      <td>
                        <NuxtLink :to="'/admin/produtos/' + produto.id">
                          <button title="Alterar" class="btn btn-primary">
                            <i class="bi bi-pencil-fill"></i>
                          </button>
                        </NuxtLink>
                        <button @click="deletarProduto(produto.id)" title="Deletar" class="btn btn-danger">
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
import services from "../../../services/axios";
export default {
  setup() {
    useServerHead({
      title: "Protecty Alarmes - Produtos",
    });
    definePageMeta({
      middleware: 'auth'
    });
    const state = reactive({
      produtos: [],
    });
    const authStore = useAuthStore();
    const token = authStore.token;

    onMounted(() => {
      fetchProdutos();
    });
    async function fetchProdutos() {
      try {
        const { data } = await services.produtos.getAll({ token });
        console.log(data);
        state.produtos = data;
      } catch (error) {
        console.log(error);
      }
    }
    async function deletarProduto(id) {
      if (confirm("Deseja deletar este produto?")) {
        try {
          state.isLoading = true;
          const { data } = await services.produtos.delete({
            id: id,
            token,
          });
          console.log(data.status);
          if (data.status != 200) {
            alert("Erro ao deletar produto.");
          } else {
            fetchProdutos();
          }
        } catch (error) {
          console.log(error);
          alert(error.response.data.erro);

        }
      }
    }
    return {
      state,
      deletarProduto,
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