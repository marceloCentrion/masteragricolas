<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h4>Endereço</h4>
      </div>
      <div class="card-body">
        <div>
          <div class="row">
            <div class="col-md-4">
              <label for="nome">CEP</label>
              <input id="nome" type="text" class="form-control" v-model="state.endereco.cep" />
            </div>
            <div class="col-md-4">
              <label for="endereco">Endereço</label>
              <input id="endereco" type="text" class="form-control" v-model="state.endereco.logradouro" />
            </div>
            <div class="col-md-4">
              <label for="numero">Número</label>
              <input id="numero" type="text" class="form-control" v-model="state.endereco.numero" />
            </div>
            <div class="col-md-4">
              <label for="bairro">Bairro</label>
              <input id="bairro" type="text" class="form-control" v-model="state.endereco.bairro" />
            </div>
            <div class="col-md-4">
              <label for="cidade">Cidade</label>
              <input id="cidade" type="text" class="form-control" v-model="state.endereco.cidade.nome" />
            </div>
            <div class="col-md-4">
              <label for="cidade">Estado</label>
              <input id="cidade" type="text" class="form-control" v-model="state.endereco.cidade.estado.nome" />
            </div>
            <div class="col-md-4">
              <label for="cidade">Complemento</label>
              <input id="cidade" type="text" class="form-control" v-model="state.endereco.complemento" />
            </div>
          </div>
        </div>
        <div class="btns_right">
          <router-link to="/admin/clientes">
            <button type="button" class="btn btn-danger">Voltar</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import services from "./../../services/axios"
export default {
  setup() {
    definePageMeta({
      middleware: 'auth'
    });
    const router = useRouter();
    const state = reactive({
      endereco: {
        cidade: {
          nome: "",
          estado: { nome: "" }
        }
      },
    });
    onMounted(() => {
      if (router.currentRoute._value.params.id != undefined) {
        fetchEndereco();
      }
    });
    const authStore = useAuthStore();
    const token = authStore.token;

    async function fetchEndereco() {
      try {
        const { data } = await services.clientes.getById({
          id: router.currentRoute._value.params.id,
          token
        });
        state.endereco = data.enderecos;
      } catch (error) {
        console.log(error);
      }
    }
    return {
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

input:focus {
  outline: none;
}

select {
  border: solid 1px #000;
}

select:focus {
  outline: none !important;
}

textarea {
  resize: none;
  border: solid 1px #000;
}

textarea:focus {
  border: solid 1px #f89c1c;
  outline: 0;
}

.btns_right {
  text-align: right;
  margin-top: 5rem;
}


.card-header {
  border-bottom: none;
  background-color: #000;
  color: #fff;
}

.card {
  border: solid 2px #000;
  border-radius: 10px;
  background-color: #fff;
}
</style>