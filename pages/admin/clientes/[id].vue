<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h4>Alterar Cliente</h4>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-4">
            <label for="nome">Nome</label>
            <input id="nome" type="text" class="form-control" v-model="state.cliente.nome" />
          </div>
          <div class="col-md-4">
            <label for="ano">Email</label>
            <input id="ano" type="text" class="form-control" v-model="state.cliente.email" />
          </div>
          <div class="col-md-4" v-if="state.cliente.tipo_pessoa != 'JURIDICA'">
            <label for="cpf">CPF</label>
            <input id="cpf" type="text" class="form-control" v-model="state.cliente.cpf" />
          </div>
          <div class="col-md-4" v-else>
            <label for="cpf">CNPJ</label>
            <input id="cpf" type="text" class="form-control" v-model="state.cliente.cnpj" />
          </div>
          <div class=" col-md-4">
            <label for="status">Tipo Pessoa</label>
            <select class="form-select" v-model="state.cliente.tipo_pessoa">
              <option value="FISICA">Física</option>
              <option value="JURIDICA">Jurídaca</option>
            </select>
          </div>
          <div class=" col-md-4">
            <label for="status">Status</label>
            <select class="form-select" v-model="state.cliente.status">
              <option value="ATIVO">Ativo</option>
              <option value="INATIVO">Inativo</option>
            </select>
          </div>
          <div class="col-md-4">
            <label for="data">Data de Nascimente</label>
            <input id="data" type="text" class="form-control" v-model="state.cliente.data_nascimento" />
          </div>
          <div class="col-md-4">
            <label for="tel">Telefone Principal</label>
            <input id="tel" type="text" class="form-control" v-model="state.cliente.telefone_principal" />
          </div>
          <div class="col-md-4">
            <label for="tel2">Telefone Alternativo</label>
            <input id="tel2" type="text" class="form-control" v-model="state.cliente.telefone_alternativo" />
          </div>
          <div class="col-md-4">
            <label for="senha">Senha</label>
            <input id="senha" type="password" class="form-control" />
          </div>
        </div>
        <div class="text-right mt-10">
          <button type="button" @click="atualizarCliente()" class="btn btn-success mr-1">Salvar</button>
          <router-link to="/admin/clientes">
            <button type="button" class="btn btn-danger">Cancelar</button></router-link>
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
    onMounted(() => {
      fetchCliente();
    });
    const authStore = useAuthStore();
    const token = authStore.token;

    const router = useRouter();
    const state = reactive({
      cliente: {
        id: "",
        nome: "",
        email: "",
        status: "",
        tipo_pessoa: "",
        cpf: "",
        cnpj: "",
        telefone_alternativo: "",
        telefone_principal: "",
      }
    });
    async function fetchCliente() {
      try {
        const { data } = await services.clientes.getById({
          id: router.currentRoute._value.params.id,
          token
        });
        state.cliente.id = data.id
        state.cliente.nome = data.nome;
        state.cliente.email = data.email;
        state.cliente.status = data.status;
        state.cliente.tipo_pessoa = data.tipo_pessoa;
        state.cliente.cpf = data.cpf;
        state.cliente.cnpj = data.cnpj;
        state.cliente.data_nascimento = data.data_nascimento;
        state.cliente.telefone_principal = data.telefone_principal;
        state.cliente.telefone_alternativo = data.telefone_alternativo;
      } catch (error) {
        console.log(error);
      }
    }
    async function atualizarCliente() {
      try {
        const { data } = await services.clientes.update(state.cliente, token);
        console.log(data)
        router.push('/admin/clientes');
      } catch (error) {
        console.log(error);
      }
    }
    return {
      state, atualizarCliente
    }
  },
}
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