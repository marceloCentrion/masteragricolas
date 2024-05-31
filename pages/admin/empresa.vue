<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h4>Empresa</h4>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-4">
            <label for="face">Facebook</label>
            <input id="face" type="text" class="form-control" placeholder="Insira um link:" v-model="state.facebook" />
          </div>
          <div class="col-md-4">
            <label for="insta">Instagram</label>
            <input id="insta" type="text" class="form-control" placeholder="Insira um link:"
              v-model="state.instagram" />
          </div>
          <div class="col-md-4">
            <label for="email">Email</label>
            <input id="email" type="email" class="form-control" placeholder="Insira um email:" v-model="state.email" />
          </div>
          <div class="col-md-4">
            <label for="endereco">Logradouro</label>
            <input id="endereco" type="text" class="form-control" placeholder="Insira um endereço:"
              v-model="state.endereco" />
          </div>
          <div class="col-md-4">
            <label for="num">Número</label>
            <input id="num" type="text" class="form-control" placeholder="Número de endereço:" v-model="state.numero" />
          </div>
          <div class="col-md-4">
            <label for="cep">CEP</label>
            <input v-maska data-maska="#####-###" id="cep" type="text" class="form-control" placeholder="Insira um cep:"
              v-model="state.cep" />
          </div>
          <div class="col-md-4">
            <label for="cidade">Cidade</label>
            <input id="cidade" type="text" class="form-control" placeholder="Insira uma cidade:"
              v-model="state.cidade" />
          </div>
          <!-- <div class="col-md-4">
            <label for="estado">Estado</label>
            <input id="estado" type="text" class="form-control" placeholder="Insira um estado:" v-model="state.estado" />
          </div> -->
          <div class="col-md-4">
            <label for="tel">Telefone Empresa</label>
            <input id="tel" type="text" class="form-control" placeholder="Insira um telefone:" v-model="state.telefone"
              v-maska data-maska="[
                        '(##) ####-####',
                        '(##) # ####-####'
                      ]" />
          </div>
        </div>
        <div class="btns_right">
          <button @click="upEmpresa" type="button" class="btn btn-success">
            Salvar
          </button>
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
      title: "Protecty Alarmes - Empresa",
    });
    definePageMeta({
      middleware: 'auth'
    });
    const state = reactive({
      id: "",
      endereco: "",
      numero: "",
      cep: "",
      cidade: "",
      estado: "",
      telefone: "",
      facebook: "",
      instagram: "",
      email: "",
    });
    const authStore = useAuthStore();
    const token = authStore.token;

    onMounted(() => {
      fetchEmpresa();
    });
    async function fetchEmpresa() {
      try {
        const { data } = await services.empresa.getEmpresa({ token });
        state.id = data.id;
        state.endereco = data.endereco;
        state.numero = data.numero;
        state.cep = data.cep;
        state.cidade = data.cidade_uf;
        state.estado = data.estado;
        state.telefone = data.telefone;
        state.facebook = data.facebook;
        state.instagram = data.instagram;
        state.email = data.email;
      } catch (error) {
        console.log(error);
      }
    }
    async function upEmpresa() {
      let telefoneFormatado = state.telefone.replace(/[\s()-]/g, '');
      let dados = {
        id: state.id,
        endereco: state.endereco,
        numero: state.numero,
        cep: state.cep,
        cidade_uf: state.cidade,
        estado: state.estado,
        telefone: telefoneFormatado,
        facebook: state.facebook,
        instagram: state.instagram,
        email: state.email,
      };
      try {
        await services.empresa.update({ dados, token });
        alert('Empresa atualizada com sucesso')
      } catch (error) {
        alert('Erro ao atualizar empresa')
        console.log(error);
      }
    }

    return {
      upEmpresa,
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