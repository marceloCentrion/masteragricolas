<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h4>Cadastrar Categoria</h4>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-3">
            <label for="nome">Nome</label>
            <input id="nome" type="text" class="form-control" placeholder="Digite um nome:"
              v-model="state.categoria.nome" />
          </div>
          <div class="col-md-3">
            <label for="nome">URN</label>
            <input id="nome" type="text" class="form-control" placeholder="Digite uma urn:"
              v-model="state.categoria.urn" />
          </div>

          <div class="col-md-3">
            <label for="status">Grupo</label>
            <select v-model="state.categoria.grupo_id" class="form-select">
              <option v-for="grupo in state.grupos" :key="grupo.id" :value="grupo.id">
                {{ grupo.nome }}
              </option>
            </select>
          </div>
          <div class="col-md-3">
            <label for="status">Status</label>
            <select v-model="state.categoria.status" class="form-select">
              <option value="ATIVO">Ativo</option>
              <option value="INATIVO">Inativo</option>
            </select>
          </div>

        </div>
        <div class="text-right mt-10">
          <button type="button" @click="salvarCat" class="btn btn-success mr-1">Salvar</button>
          <router-link to="/admin/categorias">
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
      title: "Protecty Alarmes - Cadastrar Categoria",
    });
    definePageMeta({
      middleware: "auth",
    });
    const router = useRouter();
    const state = reactive({
      categoria: {
        id: "",
        nome: "",
        urn: "",
        status: "ATIVO",
        grupo_id:''
      },
    });
    const authStore = useAuthStore();
    const token = authStore.token;
    onMounted(() => {
      fetchGrupo();
    });
    async function fetchGrupo() {
      try {
        const { data } = await services.grupos.getAll({ token });
        state.grupos = data;
      } catch (error) {
        console.log(error);
      }
    }
    async function salvarCat() {
      try {
        await services.categoria.save(state.categoria, token);
        router.push("/admin/categorias");
      } catch (error) {
        console.log(error);
      }
    }
    return {
      salvarCat,
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
}
</style>