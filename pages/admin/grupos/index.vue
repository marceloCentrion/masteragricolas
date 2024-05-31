<template>
  <div class="maxWidth">
    <div class="py-4 container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <div class="row">
                <div class="col-5">
                  <h5>Grupos</h5>
                </div>
                <div class="col-7">
                  <NuxtLink to="">
                    <div style="text-align: right">
                      <NuxtLink to="/admin/grupos/cadastrar-grupo">
                        <button type="button" class="btn btn-outline-light">Novo Grupo</button>
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
                        Nome
                      </th>
                      <th style="background-color: #00A859; color: #000" scope="col">
                        Status
                      </th>
                      <th style="background-color: #00A859; color: #000" scope="col">
                        URN
                      </th>
                      <th style="background-color: #00A859; color: #000" scope="col">
                        Ação
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="cat in state.categorias" :key="cat.id">
                      <td>{{ cat.id }}</td>
                      <td>{{ cat.nome }}</td>
                      <td>{{ cat.status }}</td>
                      <td>{{ cat.urn }}</td>
                      <td>
                        <NuxtLink :to="'/admin/grupos/' + cat.id">
                          <button title="Alterar" class="btn btn-primary">
                            <i class="bi bi-pencil-fill"></i>
                          </button>
                        </NuxtLink>
                        <button @click="deletarCategoria(cat.id)" title="Deletar" class="btn btn-danger">
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
import { reactive } from "vue";
import { onMounted } from "vue";
import services from "@/services/axios";
export default {
  setup() {
    useServerHead({
      title: "Protecty Alarmes - Categorias",
    });
    definePageMeta({
      middleware: "auth",
    });
    const authStore = useAuthStore();
    const token = authStore.token;
    const state = reactive({
      categorias: [],
    });
    onMounted(() => {
      fetchCategorias();
    });
    async function fetchCategorias() {
      try {
        const { data } = await services.grupos.getAll({ token });
        console.log(data);
        state.categorias = data;
      } catch (error) {
        console.log(error);
      }
    }
    async function deletarCategoria(id) {
      if (confirm("Deseja deletar esta categoria?")) {
        try {
          state.isLoading = true;
          const { data } = await services.grupos.delete({
            id: id,
            token,
          });
          console.log(data.status);
          if (data.status != 200) {
            alert("Erro ao deletar categoria.");
          } else {
            fetchCategorias();
          }
        } catch (error) {
          console.log(error);
          alert(error.response.data.message);
        }
      }
    }
    return {
      state,
      deletarCategoria,
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