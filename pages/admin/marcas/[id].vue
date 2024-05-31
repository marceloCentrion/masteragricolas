<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h4>Alterar Marca</h4>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-3">
            <label for="nome">Nome</label>
            <input
              id="nome"
              type="text"
              class="form-control"
              placeholder="Digite um nome:"
              v-model="state.marca.nome"
            />
          </div>
          <div class="col-md-2">
            <label for="status">Status</label>
            <select v-model="state.marca.status" class="form-select">
              <option value="ATIVO">Ativo</option>
              <option value="INATIVO">Inativo</option>
            </select>
          </div>
        </div>
        <div class="text-right mt-10">
          <button type="button" @click="upMarca" class="btn btn-success mr-1">
            Salvar
          </button>
          <router-link to="/admin/marcas">
            <button type="button" class="btn btn-danger">
              Cancelar
            </button></router-link
          >
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
      middleware: "auth",
    });
    const router = useRouter();
    const state = reactive({
      marca: {
        id: "",
        nome: "",
        urn: "",
        status: "ATIVO",
        destaque1: "",
        destaque2: "",
      },
      imagem: {},
    });
    const authStore = useAuthStore();
    const token = authStore.token;

    onMounted(() => {
      if (router.currentRoute._value.params.id != undefined) {
        fetchMarca();
      }
    });
    async function fetchMarca() {
      try {
        const { data } = await services.marcas.getById({
          id: router.currentRoute._value.params.id,
          token,
        });
        state.marca.id = data.id;
        state.marca.nome = data.nome;
        state.marca.urn = data.urn;
        state.marca.status = data.status;
        state.marca.destaque1 = data.destaque1;
        state.marca.destaque2 = data.destaque2;
        state.imagem.imagem = data.imagem;
      } catch (error) {
        console.log(error);
      }
    }
    async function upMarca() {
      let dados = new FormData();
      dados.append("id", state.marca.id);
      dados.append("nome", state.marca.nome);
      dados.append("urn", state.marca.urn);
      dados.append("status", state.marca.status);
      dados.append("destaque1", state.marca.destaque1);
      dados.append("destaque2", state.marca.destaque2);
      if (state.imagem.file != null) {
        dados.append("imagem", state.imagem.file);
      }
      dados.append("id", state.marca.id);
      dados.append("_method", "PATCH");
      if (state.imagem.imagem == undefined) {
        try {
          await services.cases.deletarImagem({
            id: dados.get("id"),
            token,
          });
        } catch (error) {
          console.log(error);
        }
      }
      try {
        await services.marcas.update(dados, token);
        router.push("/admin/marcas");
      } catch (error) {
        console.log(error);
      }
    }
    async function adicionarImagem(event) {
      var img = event.target.files[0];
      var objImagem = new Object();
      objImagem.file = img;
      objImagem.imagem = URL.createObjectURL(img);
      state.imagem = objImagem;
    }
    async function removerImagem() {
      state.imagem = {};
      document.querySelector('input[type="file"]').value = null;
    }
    return {
      adicionarImagem,
      removerImagem,
      upMarca,
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