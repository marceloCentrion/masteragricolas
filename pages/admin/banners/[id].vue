<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h4>Alterar Banner</h4>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-4">
            <label readonly for="status">Categoria</label>
            <select @change="arrayPosition" v-model="state.banner.categoria_id" class="form-select">
              <option disabled v-for="cat in state.categorias" :key="cat.id" :value="cat.id">
                {{ cat.nome }}
              </option>
            </select>
          </div>
          <div class="col-md-4">
            <label for="nome">Nome</label>
            <input id="nome" type="text" class="form-control" v-model="state.banner.nome" />
          </div>
          <div class="col-md-4">
            <label>Banner</label>
            <input type="file" class="form-control" @change="adicionarImagem" />
          </div>
          <div style="display: flex" class="col-md-6 offset-md-3 mt-4" v-if="state.imagem.imagem">
            <img :src="state.imagem.imagem" class="imagem" />
            <div class="div_btn_x">
              <button class="btn_remover" @click="removerImagem">
                <i class="bi bi-x-lg"></i>
              </button>
            </div>
          </div>
          <div class="col-md-4">
            <label>Banner para celular</label>
            <input type="file" class="form-control" @change="adicionarImagemCel" />
          </div>
          <div style="display: flex" class="col-md-6 offset-md-3 mt-4" v-if="state.img_cel.imagem">
            <img :src="state.img_cel.imagem" class="imagem" />
            <div class="div_btn_x">
              <button class="btn_remover" @click="removerImagemCel">
                <i class="bi bi-x-lg"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="text-right mt-10">
          <button type="button" @click="salvarBanner" class="btn btn-success mr-1">Salvar</button>
          <router-link to="/admin/banners">
            <button type="button" class="btn btn-danger">Cancelar</button></router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import services from "../../services/axios";
export default {
  setup() {
    definePageMeta({
      middleware: "auth",
    });
    const router = useRouter();
    const state = reactive({
      banner: {
        id: "",
        categoria_id: "",
        nome: "",
        dimensoes: "",
      },
      imagem: {},
      img_cel: {},
    });
    const authStore = useAuthStore();
    const token = authStore.token;
    onMounted(() => {
      fetchCat();
      if (router.currentRoute._value.params.id != undefined) {
        fetchBanner();
      }
    });
    async function fetchBanner() {
      try {
        const { data } = await services.banners.getById({
          id: router.currentRoute._value.params.id,
          token,
        });
        state.banner.id = data.id;
        state.banner.categoria_id = data.categoria_id;
        state.banner.nome = data.nome;
        state.banner.dimensoes = data.dimensoes;
        if (data.imagem != null) {
          state.imagem.imagem = data.imagem;
        }
        if (data.imagem_cel != null) {
          state.img_cel.imagem = data.imagem_cel;
        }
      } catch (error) {
        console.log(error);
      }
    }
    async function fetchCat() {
      try {
        const { data } = await services.banners.getAllCat({ token });
        console.log(data);
        state.categorias = data;
      } catch (error) {
        console.log(error);
      }
    }
    async function salvarBanner() {
      let dados = new FormData();
      dados.append("categoria_id", state.banner.categoria_id);
      dados.append("nome", state.banner.nome);
      dados.append("dimensoes", state.banner.dimensoes);
      if (state.imagem.file != null) {
        dados.append("imagem", state.imagem.file);
      }
      if (state.img_cel.file != null) {
        console.log(state.img_cel.file);
        dados.append("imagem_cel", state.img_cel.file);
      }
      dados.append("id", state.banner.id);
      dados.append("_method", "PATCH");
      if (state.imagem.imagem == undefined) {
        try {
          await services.banners.deletarImagem({
            id: dados.get("id"),
            token,
          });
        } catch (error) {
          console.log(error);
        }
      }
      console.log(dados);
      try {
        await services.banners.update(dados, token);
        router.push("/admin/banners");
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
    async function adicionarImagemCel(event) {
      var img_cel = event.target.files[0];
      var objImagemCel = new Object();
      objImagemCel.file = img_cel;
      objImagemCel.imagem = URL.createObjectURL(img_cel);
      state.img_cel = objImagemCel;
    }
    async function removerImagemCel() {
      state.img_cel = {};
      document.querySelector('input[type="file"]').value = null;
    }
    return {
      salvarBanner,
      removerImagem,
      adicionarImagem,
      adicionarImagemCel,
      removerImagemCel,
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
}

select {
  border: solid 1px #000;
}

.card {
  border: solid 1px #000;
  border-radius: 5px;
  background-color: #fff;
}

.card-header {
  border-radius: 0px;
  background-color: #181818;
  color: #fff;
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

.imagem {
  width: 100%;
}

.div_btn_x {
  margin-left: 10px;
}
</style>
