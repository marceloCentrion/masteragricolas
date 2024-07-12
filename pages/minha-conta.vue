<template>
  <top :tela="'ecommerce'" />
  <section id="minha-conta">
    <div class="container">
      <div class="title mt-4 mb-4">
        <h2>Meus Dados</h2>
      </div>
      <div class="row mb-4">
        <div class="col-xl-3 col-lg-4 col-md-6">
          <label>Nome</label>
          <div class="div_data mb-4">
            <p>{{ state.dados.nome }}</p>
          </div>
        </div>
        <div class="col-xl-3 col-lg-4 col-md-6">
          <label>Email</label>
          <div class="div_data mb-4">
            <p>{{ state.dados.email }}</p>
          </div>
        </div>
        <div class="col-xl-3 col-lg-4 col-md-6">
          <div v-if="state.dados.tipo_pessoa == 'FISICA'">
            <label>CPF</label>
            <div class="div_data mb-4">
              <p>{{ state.dados.cpf }}</p>
            </div>
          </div>
          <div v-else>
            <label>CNPJ</label>
            <div class="div_data mb-4">
              <p>{{ state.dados.cnpj }}</p>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-lg-4 col-md-6">
          <label>Data de Nascimento</label>
          <div class="div_data mb-4">
            <p>{{ state.dados.data_nascimento }}</p>
          </div>
        </div>
        <div class="col-xl-3 col-lg-4 col-md-6">
          <label>Telefone Principal</label>
          <div class="div_data mb-4">
            <p>{{ state.dados.telefone_principal }}</p>
          </div>
        </div>
        <div class="col-xl-3 col-lg-4 col-md-6">
          <div v-if="state.dados.telefone_alternativo">
            <label>Telefone Secundário</label>
            <div class="div_data mb-md-4">
              <p>{{ state.dados.telefone_alternativo }}</p>
            </div>
          </div>
        </div>
        <div class="col-xl-2 offset-xl-2 mt-xl-4 col-lg-3 offset-md-6 col-md-3 col-sm-4 offset-sm-3 mt-sm-2 mt-2">
          <div class="div_edit">
            <NuxtLink to="/editar-meus-dados">
              <button title="Editar Dados" class="btn_transparent" type="button">
                Editar dados
              </button>
            </NuxtLink>
          </div>
        </div>
        <div class="col-xl-2 mt-xl-4 col-lg-3 col-md-3 col-sm-5 mt-sm-2 mt-2">
          <div class="div_btn_endereco">
            <button @click="irParaEnd()" title="Ver endereço" class="btn_transparent">
              Meus Endereços
            </button>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-2 mt-xl-1 col-md-2 col-sm-3 mt-sm-2 mt-2">
          <div class="div_btn_endereco">
            <NuxtLink to="/">
              <button title="Voltar" class="btn_transparent">Voltar</button></NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import services from "../services/axios";
export default {
  setup() {
    useHead({
      title: "Minha Conta",
    });
    definePageMeta({
      layout: "site",
    });

    const state = reactive({
      dados: { enderecos: { cidade_id: "" } },
      tipo_senha: "password",
      id_endereco: "",
    });

    const router = useRouter();
    const clienteAuthStore = useClienteAuthStore();
    const { client_token, client_id } = storeToRefs(clienteAuthStore);
    onMounted(() => {
      fetchDataCliente();
    });

    async function fetchDataCliente() {
      try {
        const { data } = await services.clientes.getDataCliente({
          client_token: client_token.value,
          client_id: client_id.value,
        });
        state.dados = data;
        state.id_endereco = data.enderecos[0].id;
        var data_nascimento = data.data_nascimento;
        formatarData(data_nascimento);
        // var estado_id = data.enderecos.cidade.estado_id;
        // getCidade(estado_id);
      } catch (error) {
        console.log(error);
      }
    }
    function irParaEnd() {
      router.push('/meus-enderecos')
    }
   
    function formatarData(data_nascimento) {
      let data_americana = data_nascimento;
      let data_brasileira = data_americana.split("-").reverse().join("/");
      state.dados.data_nascimento = data_brasileira;
    }
    return {
      state,
      irParaEnd,
    };
  },
};
</script>
<style scoped>
.title h2 {
  color: #000;
  font-size: 32px;
}

.div_data {
  border-bottom: solid 3px rgba(197, 197, 197, 1);
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
  --border-after-color: rgb(255, 0, 0);
  --input-hovered-color: #e049491f;
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
}


.btn_transparent {
  font-family: 'Poppins', sans-serif;
  border-radius: 4px;
  border: 1px solid rgba(197, 197, 197, 1);
  background: transparent;
  color: rgb(0, 0, 0);
  width: 200px;
  padding: 6px;
  transition: 0.5s;
}

.btn_transparent:hover {
  background: rgba(197, 197, 197, 1);
  color: #000;
}
</style>