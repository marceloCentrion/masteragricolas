<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h4>Alterar Categoria</h4>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-3">
            <label for="nome">Nome</label>
            <input id="nome" type="text" class="form-control" v-model="state.cat.nome" />
          </div>
          <div class="col-md-3">
            <label for="nome">Dimensões</label>
            <input id="nome" type="text" class="form-control" v-model="state.cat.dimensoes" />
          </div>
        </div>
        <div class="text-right mt-10">
          <button type="button" @click="salvarCat" class="btn btn-success mr-1">Salvar</button>
          <router-link to="/admin/categoria-banners">
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
    definePageMeta({
      middleware: 'auth'
    });
    const router = useRouter();
    const state = reactive({
      cat: {
        id: "",
        nome: "",
        dimensoes: "",
      },
    });
    const authStore = useAuthStore();
    const token = authStore.token;

    onMounted(() => {
      if (router.currentRoute._value.params.id != undefined) {
        fetchCat();
      }
    });

    async function fetchCat() {
      try {
        const { data } = await services.banners.getByIdCat({
          id: router.currentRoute._value.params.id,
          token,
        });
        state.cat.id = data.id;
        state.cat.nome = data.nome;
        state.cat.dimensoes = data.dimensoes;
      } catch (error) {
        console.log(error);
      }
    }
    async function salvarCat() {
      try {
        await services.banners.updateCat(state.cat, token);
        router.push("/admin/categoria-banners");
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