<template>
  <div class="maxWidth">
    <div class="py-4 container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <div class="row">
                <div class="col-5">
                  <h5>Banners</h5>
                </div>
                <div class="col-7">
                  <NuxtLink to="">
                    <div style="text-align: right">
                      <NuxtLink to="/admin/banners/criar-banner">
                        <button type="button" class="btn btn-outline-light">Novo Banner</button>
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
                        Categoria
                      </th>
                      <th style="background-color: #00A859; color: #000" scope="col">
                        Ação
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="banner in state.banners" :key="banner.id">
                      <td>{{ banner.id }}</td>
                      <td>{{ banner.nome }}</td>
                      <td>{{ banner.categoria.nome }}</td>
                      <td>
                        <NuxtLink :to="'/admin/banners/' + banner.id">
                          <button title="Alterar" class="btn btn-primary">
                            <i class="bi bi-pencil-fill"></i></button>
                        </NuxtLink>
                        <button title="Deletar" @click="deletarBanner(banner.id)" class="btn btn-danger"><i
                            class="bi bi-trash"></i></button>
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
import services from "../../services/axios";
export default {
  setup() {
    definePageMeta({
      middleware: 'auth'
    });
    useServerHead({
      title: "Protecty Alarmes - Banners",
    });
    const authStore = useAuthStore();
    const token = authStore.token;

    const state = reactive({
      banners: [],
    });
    onMounted(() => {
      fetchBanner();
    });
    async function fetchBanner() {
      try {
        const { data } = await services.banners.getAll({ token });
        console.log(data);
        state.banners = data;
      } catch (error) {
        console.log(error);
      }
    }
    async function deletarBanner(id) {
      if (confirm("Deseja deletar este banner?")) {
        try {
          state.isLoading = true;
          const { data } = await services.banners.delete(
            {
              id: id,
              token
            }
          );
          console.log(data.status);
          if (data.status != 200) {
            alert("Erro ao deletar banner!.");
          } else {
            fetchBanner();
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return {
      state,
      deletarBanner,
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