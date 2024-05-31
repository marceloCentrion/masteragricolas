<template>
  <div class="maxWidth">
    <div class="py-4 container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <div class="row">
                <div class="col-md-6">
                  <h5>Categorias Banner</h5>
                </div>
                <div class="col-md-6">
                  <NuxtLink to="">
                    <div style="text-align: right">
                      <!--  <button id="btn_new_user">Novo cat</button>-->
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
                        Dimensões
                      </th>
                      <th style="background-color: #00A859; color: #000" scope="col">
                        Ação
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="cat in state.categorias" :key="cat.id">
                      <td>{{ cat.id }}</td>
                      <td style="line-height: 1.1;">{{ cat.nome }}</td>
                      <td style="line-height: 1.1;">{{ cat.dimensoes }}</td>
                      <td>
                        <NuxtLink :to="'/admin/categoria-banners/' + cat.id">
                          <button title="Alterar" class="btn btn-primary">
                            <i class="bi bi-pencil-fill"></i></button>
                        </NuxtLink>
                        <button @click="deleteCat(cat.id)" title="Deletar" class="btn btn-danger">
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
import services from "../../services/axios";
export default {
  setup() {
    useServerHead({
      title: "Protecty Alarmes - categorias Banners",
    });
    definePageMeta({
      middleware: 'auth'
    });
    const state = reactive({
      categorias: [],
    });
    onMounted(() => {
      fetchCat();
    });
    const authStore = useAuthStore();
    const token = authStore.token;

    async function fetchCat() {
      try {
        const { data } = await services.banners.getAllCat({ token });
        state.categorias = data;
      } catch (error) {
        console.log(error);
      }
    }
    async function deleteCat(id) {
      if (confirm("Deseja deletar esse cat?")) {
        try {
          state.isLoading = true;
          const { data } = await services.banners.deleteCat({
            id: id,
            token,
          });
          console.log(data.status);
          if (data.status != 200) {
            alert("Erro ao deletar cat.");
          } else {
            fetchCat();
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return {
      state,
      deleteCat,
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