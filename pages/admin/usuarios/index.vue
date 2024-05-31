<template>
  <div class="maxWidth">
    <div class="py-4 container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <div class="row">
                <div class="col-5">
                  <h5>Usuários</h5>
                </div>
                <div class="col-7">
                  <div style="text-align: right">
                    <NuxtLink to="/admin/usuarios/cadastrar-usuario">
                      <button type="button" class="btn btn-outline-light">Novo Usuário</button>
                    </NuxtLink>
                  </div>
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
                        Email
                      </th>
                      <th style="background-color: #00A859; color: #000" scope="col">
                        Ação
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="usuario in state.usuarios" :key="usuario.id">
                      <td>{{ usuario.id }}</td>
                      <td>{{ usuario.nome }}</td>
                      <td>{{ usuario.email }}</td>
                      <td>
                        <NuxtLink :to="'/admin/usuarios/' + usuario.id"><button title="Alterar" class="btn btn-primary">
                            <i class="bi bi-pencil-fill"></i></button></NuxtLink>
                        <button @click="deletarUsuario(usuario.id)" title="Deletar" class="btn btn-danger">
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
import services from "../../services/axios";

export default {
  setup() {
    useServerHead({
      title: "Protecty Alarmes - Usuários",
    });
    definePageMeta({
      middleware: "auth",
    });
    const state = reactive({
      usuarios: [],
    });
    const authStore = useAuthStore();
    const token = authStore.token;
    onMounted(() => {
      fetchUsuario();
    });
    async function fetchUsuario() {
      try {
        const { data } = await services.usuarios.getAll({ token });
        console.log(data);
        state.usuarios = data;
      } catch (error) {
        console.log(error);
      }
    }
    async function deletarUsuario(id) {
      if (confirm("Deseja deletar o usuário?")) {
        try {
          state.isLoading = true;
          const { data } = await services.usuarios.delete({
            id: id,
            token,
          });
          console.log(data.status);
          if (data.status != 200) {
            alert("Erro ao deletar usuario.");
          } else {
            fetchUsuario();
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return {
      state,
      deletarUsuario,
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