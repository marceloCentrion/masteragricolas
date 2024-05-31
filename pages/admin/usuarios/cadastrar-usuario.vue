<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h4>Cadastrar Usuário</h4>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-3">
            <label for="nome">Nome</label>
            <input id="nome" type="text" class="form-control" placeholder="Digite um nome:" v-model="state.nome" />
          </div>
          <div class="col-md-3">
            <label for="email">Email</label>
            <input id="email" type="email" class="form-control" placeholder="Digite um email:" v-model="state.email" />
          </div>
          <div class="col-md-3">
            <label for="status">Status</label>
            <select v-model="state.status" class="form-select">
              <option value="ATIVO">Ativo</option>
              <option value="INATIVO">Inativo</option>
            </select>
          </div>
          <div class="col-md-3">
            <label for="senha">Senha</label>
            <input id="senha" type="senha" class="form-control" placeholder="Digite uma senha:"
              v-model="state.senha" />
          </div>
        </div>
        <div class="text-right mt-10">
          <button type="button" @click="salvarUsuario" class="btn btn-success mr-1">Salvar</button>
          <router-link to="/admin/usuarios">
            <button type="button" class="btn btn-danger">Cancelar</button></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import services from "../../services/axios";
export default {
  setup() {
    useServerHead({
      title: "Protecty Alarmes - Cadastrar Usuário",
    });
    definePageMeta({
      middleware: "auth",
    });
    const authStore = useAuthStore();
    const token = authStore.token;

    const router = useRouter();
    const state = reactive({
      id: "",
      nome: "",
      email: "",
      senha: "",
      status: "ATIVO",
    });
    onMounted(() => { });
    async function salvarUsuario() {
      let dados = {
        nome: state.nome,
        email: state.email,
        senha: state.senha,
        status: state.status,
      };
      try {
        await services.usuarios.save(dados, token);
        router.push("/admin/usuarios");
      } catch (error) {
        console.log(error);
      }
    }
    return {
      salvarUsuario,
      router,
      state,
    };
  },
};
</script>

<style scoped>
h4 {
  color: #fff;
}

.card-header {
  background-color: #000;
  color: #fff;
  border-radius: 0px;
}

label {
  color: #000;
  font-size: 12pt;
  margin-bottom: 0;
  margin-top: 5px;
}

input {
  border: solid 1px #000;
}

textarea {
  border: solid 1px #000;
  resize: none;
}

select {
  border: solid 1px #000;
}

.card {
  border: solid 1px #000;
  border-radius: 5px;
  background-color: #fff;
}

.imagem {
  width: 100%;
  object-fit: cover;
  margin-top: 1em;
  height: auto;
}

.btn_remover {
  border: none;
  outline: none;
  background-color: #ff0000;
  padding: 5px 10px;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  border-radius: 5px;
  transition: all ease 0.1s;
  box-shadow: 0px 5px 0px 0px #f57171;
}

.btn_remover:active {
  transform: translateY(5px);
  box-shadow: 0px 0px 0px 0px #f57171;
}

.div_btn_x {
  margin-left: 10px;
  margin-top: 20px;
}
</style>