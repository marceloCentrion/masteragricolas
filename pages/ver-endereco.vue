<template>
  <div class="container">
    <h2 class="title">Meus Dados</h2>
    <div class="row">
      <div class="col-xl-4 col-lg-6 mb-4 mt-4">
        <div class="form">
          <label>Telefone:</label>
          <input v-model="state.dados.telefone" class="input" type="text" v-maska
            data-maska="['(##) ####-####','(##) # ####-####']" />
          <span class="input-border"></span>
        </div>
      </div>
      <div class="col-xl-4 col-lg-6 mb-4 mt-4">
        <div class="form">
          <label>Cep:</label>
          <input v-model="state.dados.cep" class="input" type="text" @blur="cepAtributes" v-maska
            data-maska="#####-###" />
          <span class="input-border"></span>
        </div>
      </div>
      <div class="col-xl-4 col-lg-6 mb-4 mt-4">
        <div class="form">
          <label>Logradouro:</label>
          <input v-model="state.dados.logradouro" class="input" type="text" />
          <span class="input-border"></span>
        </div>
      </div>
      <div class="col-xl-4 col-lg-6 mb-4 mt-4">
        <div class="form">
          <label>Número:</label>
          <input v-model="state.dados.numero" class="input" type="text" />
          <span class="input-border"></span>
        </div>
      </div>
      <div class="col-xl-4 col-lg-6 mb-4 mt-4">
        <div class="form">
          <label>Bairro:</label>
          <input v-model="state.dados.bairro" class="input" type="text" />
          <span class="input-border"></span>
        </div>
      </div>
      <div class="col-xl-4 col-lg-6 mb-4 mt-4">
        <div class="form">
          <label>Complemento:</label>
          <input v-model="state.dados.complemento" class="input" type="text" />
          <span class="input-border"></span>
        </div>
      </div>
      <div class="col-xl-4 col-lg-6 mb-4 mt-4">
        <div class="form">
          <label>Estado:</label>
          <select v-model="state.dados.cidades.estado_id" class="input" type="text"
            @change="getCidade($event.target.value)">
            <option v-for="estado in state.estados" :key="estado.id" :value="estado.id">
              {{ estado.nome }}
            </option>
          </select>
          <span class="input-border"></span>
        </div>
      </div>
      <div class="col-xl-4 col-lg-6 mb-4 mt-4">
        <div class="form">
          <label>Cidade:</label>
          <select v-model="state.dados.cidade_id" class="input" type="text">
            <option v-for="cidade in state.cidades" :key="cidade.id" :value="cidade.id">
              {{ cidade.nome }}
            </option>
          </select>
          <span class="input-border"></span>
        </div>
      </div>
    </div>
    <div class="div_btn">
      <a href="/minha-conta"><button class="btn_transparent" type="button" title="Cancelar">
          Cancelar
        </button>
      </a>
      <button @click="upEndereco" class="btn_gold" type="button">
        Salvar
      </button>
    </div>
  </div>
</template>
<script setup>
import { reactive, onMounted } from "vue";
import services from "../services/axios";
import { useRouter } from "vue-router";
definePageMeta({
  layout: "site",
});
useHead({
  title: "Mística - Ver Endereço",
  link: [
    {
      href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css",
      rel: "stylesheet",
      integrity: "sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN",
      crossorigin: "anonymous"
    }],
  script: [
    {
      src: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js",
      integrity: "sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL",
      crossorigin: "anonymous"
    }
  ],
});

const router = useRouter();
const clienteAuthStore = useClienteAuthStore();
const { client_token, client_id } = storeToRefs(clienteAuthStore);
if (!client_id.value || !client_token.value) {
  router.push({ name: "index" });
}
const state = reactive({
  id_endereco: "",
  dados: { cidade_id: '', cidades: { estado_id: '', estado: {} } },
  estados: "",
  cidades: [{}],
  estado_id: '',
});

onMounted(() => {
  getEstados();
  fetchDataCliente();
});

async function fetchDataCliente() {
  try {
    const { data } = await services.clientes.getDataCliente({
      client_token: client_token.value,
      client_id: client_id.value,
    });
    state.dados = data.enderecos[0];
    state.id_endereco = data.enderecos[0].id;
    state.estado_id = data.enderecos[0].cidades.estado_id;
    getCidade(state.estado_id);
  } catch (error) {
    console.log(error);
  }
}
async function upEndereco() {
  console.log(state.id_endereco)
  console.log(state.dados)
  try {
    await services.clientes.upEndereco({
      id_endereco: state.id_endereco,
      endereco: state.dados,
      client_token: client_token.value,
    });
    fetchDataCliente();
  } catch (error) {
    console.log(error);
  }
  router.push('/minha-conta')
}
async function cepAtributes() {
  var cep = state.dados.cep;
  state.dados.cep = cep.replace("-", "").replace(".", "");
  await services.cep.apiCep(state.dados.cep).then((res) => {
    console.log(res.data);
    state.dados.logradouro = res.data.logradouro;
    state.dados.bairro = res.data.bairro;
    state.dados.codigo_ibge = res.data.ibge;
  });
}
async function getEstados() {
  try {
    const { data } = await services.endereco.getEstados();
    state.estados = data;
    console.log(state.estados);
  } catch (error) {
    console.log("aqui:" + error);
  }
}
async function getCidade(estado_id) {
  try {
    const { data } = await services.endereco.getCidade(estado_id);
    state.cidades = data;
    console.log(state.cidades);
  } catch (error) {
    console.log("aqui:" + error);
  }
}
</script>
<style scoped>
.title {
  color: #000;
  font-size: 32px;
  font-weight: 600;
  font-family: 'Poppins';
  margin-top: 2rem;

}

.div_data {
  border-bottom: solid 3px #CFB14E;
  background-color: #c4c4c483;
  padding: 5px 5px;
  border-radius: 5px 5px 0px 0px;
}

.div_data p {
  color: #000;
  font-size: 16px;
  margin-bottom: 0;
  font-family: 'Poppins';

}

label {
  color: #000;
  font-size: 18px;
  margin-bottom: 0;
  font-family: 'Poppins';

}

.div_edit {
  text-align: right;
}

.form {
  --width-of-input: 100%;
  --border-height: 1px;
  --border-before-color: rgba(221, 221, 221, 0.39);
  --border-after-color: #CFB14E;
  --input-hovered-color: #0000001f;
  position: relative;
  width: var(--width-of-input);
}

.input {
  color: #000;
  font-size: 12pt;
  background-color: transparent;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 5px;
  border: none;
  border-bottom: var(--border-height) solid var(--border-before-color);
}

.input-border {
  position: absolute;
  background: var(--border-after-color);
  width: 0%;
  height: 2px;
  bottom: 0;
  left: 0;
  transition: 0.3s;
}

/* Hover on Input */
input:hover {
  background: var(--input-hovered-color);
}

input:focus {
  outline: none;
}

input:focus~.input-border {
  width: 100%;
}

.form label {
  font-size: 14pt;
  margin-bottom: 0;
}

.div_btn {
  text-align: right;
  margin-bottom: 2rem;
}

.btn_transparent {
  font-family: 'Poppins', sans-serif;
  border-radius: 4px;
  border: 1px solid #000;
  background: transparent;
  color: #000;
  width: 200px;
  padding: 6px;
  transition: 0.5s;
  margin-right: 1rem;
}

.btn_transparent:hover {
  background: #000;
  color: #fff;
}

.btn_gold {
  font-family: 'Poppins', sans-serif;
  border-radius: 4px;
  border: 1px solid #CFB14E;
  background: transparent;
  color: #CFB14E;
  width: 200px;
  padding: 6px;
  transition: 0.5s;
}

.btn_gold:hover {
  background: #CFB14E;
  color: #000;
}

@media (max-width: 575px) {
  .btn_gold {
    margin-top: 5px;
  }

  .btn_transparent {
    margin-right: 0;
  }
}
</style>