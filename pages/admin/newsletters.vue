<template>
  <div class="maxWidth">
    <div class="py-4 container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <div class="row">
                <div class="col-md-6">
                  <h5>Newsletters</h5>
                </div>
                <div class="col-md-6"></div>
              </div>
            </div>
            <div class="card-body">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th style="background-color: #00A859; color: #000" scope="col">
                      Código
                    </th>
                    <th style="background-color: #00A859; color: #000" scope="col">
                      Email
                    </th>
                    <th style="background-color: #00A859; color: #000" scope="col">
                      Ação
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="letter in state.newsletter" :key="letter.id">
                    <td>{{ letter.id }}</td>
                    <td>{{ letter.email }}</td>
                    <td>
                      <!-- <button title="Alterar" class="btn btn-primary">
                        <i class="bi bi-pencil-fill"></i>
                      </button> -->
                      <button @click="deletarLetter(letter.id)" title="Deletar" class="btn btn-danger">
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
</template>

<script>
import services from "../../services/axios";
export default {
  setup() {
    useServerHead({
      title: "Protecty Alarmes - Newsletters",
    });
    definePageMeta({
      middleware: 'auth'
    });
    const state = reactive({
      newsletter: [],
    });
    onMounted(() => {
      fetchLetter();
    });
    const authStore = useAuthStore();
    const token = authStore.token;
    async function fetchLetter() {
      try {
        const { data } = await services.newsletters.getAll({ token });
        console.log(data);
        state.newsletter = data;
      } catch (error) {
        console.log(error);
      }
    }
    async function deletarLetter(id) {
      if (confirm("Deseja deletar esta New?")) {
        try {
          state.isLoading = true;
          const { data } = await services.newsletters.delete({
            id: id,
            token,
          });
          console.log(data.status);
          if (data.status != 200) {
            alert("Erro ao deletar New!!!.");
          } else {
            fetchLetter();
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return {
      state,
      deletarLetter,
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