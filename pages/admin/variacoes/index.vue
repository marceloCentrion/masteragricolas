<template>
  <div class="maxWidth">
    <div class="py-4 container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <div class="row">
                <div class="col-5">
                  <h5>Variações</h5>
                </div>
                <div class="col-7">
                  <NuxtLink to="">
                    <div style="text-align: right">
                      <NuxtLink to="/admin/variacoes/cadastrar-variacao">
                        <button type="button" class="btn btn-outline-light">Nova Variação</button>
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
                        Ação
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="vari in state.variacoes" :key="vari.id">
                      <td>{{ vari.id }}</td>
                      <td>{{ vari.nome }}</td>
                      <td>
                        <NuxtLink :to="'/admin/variacoes/' + vari.id">
                          <button title="Alterar" class="btn btn-primary">
                            <i class="bi bi-pencil-fill"></i>
                          </button>
                        </NuxtLink>
                        <button @click="deletarVari(vari.id)" title="Deletar" class="btn btn-danger">
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
      title: "Protecty Alarmes - variacoes",
    });
    definePageMeta({
      middleware: "auth",
    });
    const authStore = useAuthStore();
    const token = authStore.token;
    const state = reactive({
      variacoes: [],
    });
    onMounted(() => {
      fetchVariacoes();
    });
    async function fetchVariacoes() {
      try {
        const { data } = await services.variacoes.getAll({ token });
        console.log(data);
        state.variacoes = data;
      } catch (error) {
        console.log(error);
      }
    }
    async function deletarVari(id) {
      if (confirm("Deseja deletar esta variação?")) {
        try {
          state.isLoading = true;
          const { data } = await services.variacoes.delete({
            id: id,
            token,
          });
          console.log(data.status);
          if (data.status != 200) {
            alert("Erro ao deletar variação.");
          } else {
            fetchVariacoes();
          }
        } catch (error) {
          console.log(error);
          alert(error.response.data.message);
        }
      }
    }
    return {
      state,
      deletarVari,
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