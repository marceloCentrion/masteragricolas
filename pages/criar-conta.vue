<template>
  <div>
    <div style="background: #263C28;">
      <div class="container">
        <div class="header-login">
          <a href="/"><img id="logo-header" src="/images/site/logo.png" alt="Logo" /></a>
          <h3 style="color: #3CCF4E">Login</h3>
        </div>
      </div>
    </div>
    <div style="background-color: rgba(76, 76, 76, 1);">
      <section class="pt-12 pb-12" id="sct_1">
        <div class="container">
          <div class="row">
            <div class="col mt-n19">
              <div class="card">
                <div class="row">
                  <div class="col-lg-6 d-none d-lg-block">
                    <div>
                      <img id="img_conta" src="/images/site/tractor_criar.jpg" alt="Imagem de Login" />
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <form class="form">
                      <h2>Faça seu Cadastro</h2>
                      <p>Preencha os campos abaixo para criar uma conta.</p>
                      <div class="row">
                        <div class="col-lg-6">
                          <span class="input-span">
                            <label for="nome" class="label">Nome <span style="color: red;">*</span></label>
                            <input required type="text" name="nome" id="nome" v-model="state.nova_conta.nome" /></span>
                        </div>
                        <div class="col-lg-6">
                          <span class="input-span">
                            <label for="nome_mae" class="label">Nome da mãe
                              <span style="color: red">*</span></label>
                            <input required type="text" name="nome_mae" id="nome_mae"
                              v-model="state.nova_conta.nome_mae" /></span>
                        </div>
                        <div class="col-lg-6">
                          <span class="input-span">
                            <label for="tel" class="label">Telefone Principal <span style="color: red;">*</span></label>
                            <input required type="text" name="tel" id="tel"
                              v-model="state.nova_conta.telefone_principal" v-maska
                              data-maska="[ '(##) ####-####','(##) # ####-####' ]" /></span>
                        </div>
                        <!-- <div class="col-lg-6">
                          <span class="input-span">
                            <label for="telefone_alternativo" class="label">Telefone Alternativo <span
                                style="color: red;">*</span></label>
                            <input required type="text" name="telefone_alternativo" id="telefone_alternativo"
                              v-model="state.nova_conta.telefone_alternativo" v-maska
                              data-maska="['(##) ####-####', '(##) # ####-####' ]" /></span>
                        </div> -->

                        <div class="col-lg-6">
                          <span class="input-span">
                            <label for="nascimento" class="label">Data de Nascimento <span
                                style="color: red;">*</span></label>
                            <input required type="text" name="nascimento" id="nascimento"
                              v-model="state.nova_conta.data_nascimento" v-maska data-maska="##/##/####" /></span>
                        </div>
                        <div class="col-lg-6">
                          <span class="input-span">
                            <label for="nascimento" class="label">Pessoa <span style="color: red;">*</span></label>
                            <select v-model="state.nova_conta.tipo_pessoa">
                              <option value="FISICA">Fisíca</option>
                              <option value="JURIDICA">Jurídica</option>
                            </select>
                          </span>
                        </div>
                        <div class="col-lg-6">
                          <span class="input-span" v-if="state.nova_conta.tipo_pessoa == 'FISICA'">
                            <label for="cpf" class="label">CPF <span style="color: red;">*</span></label>
                            <input id="cpf" type="text" v-model="state.nova_conta.cpf" v-maska
                              data-maska="###.###.###-##" />
                          </span>
                          <span class="input-span" v-if="state.nova_conta.tipo_pessoa == 'JURIDICA'">
                            <label for="cnpj" class="label">CNPJ<span style="color: red;">*</span></label>
                            <input id="cnpj" type="text" v-model="state.nova_conta.cnpj" v-maska
                              data-maska="##.###.###/####-##" />
                          </span>
                        </div>
                        <div class="col-lg-6">
                          <span class="input-span">
                            <label for="email" class="label">E-mail <span style="color: red;">*</span></label>
                            <input required type="email" name="email" id="email"
                              v-model="state.nova_conta.email" /></span>
                        </div>
                        <div class="col-lg-6">
                          <span class="input-span">
                            <label for="senha" class="label">Senha <span style="color: red;">*</span></label>
                            <input required type="password" name="senha" id="senha"
                              v-model="state.nova_conta.password" /></span>
                        </div>
                        <div class="col-lg-5">
                          <span class="input-span">
                            <label for="cep" class="label">CEP <span style="color: red">*</span></label>
                            <input @blur="cepAtributes(state.nova_conta.endereco.cep)" v-maska data-maska="#####-###"
                              required type="text" name="cep" id="cep" v-model="state.nova_conta.endereco.cep" /></span>
                        </div>
                        <div class="col-md-7">
                          <span class="input-span">
                            <label for="logradouro" class="label">Logradouro
                              <span style="color: red">*</span></label>
                            <input required type="text" name="logradouro" id="logradouro"
                              v-model="state.nova_conta.endereco.logradouro" /></span>
                        </div>
                        <div class="col-md-4">
                          <span class="input-span">
                            <label for="num" class="label">Número <span style="color: red">*</span></label>
                            <input required type="text" name="num" id="num"
                              v-model="state.nova_conta.endereco.numero" /></span>
                        </div>
                        <div class="col-md-8">
                          <span class="input-span">
                            <label for="bairro" class="label">Bairro <span style="color: red">*</span></label>
                            <input required type="text" name="bairro" id="bairro"
                              v-model="state.nova_conta.endereco.bairro" /></span>
                        </div>
                        <div class="col-md-6">
                          <span class="input-span">
                            <label for="estado" class="label">Estado <span style="color: red">*</span></label>
                            <select v-model="state.nova_conta.endereco.estado_id"
                              @change="getCidades($event.target.value)">
                              <option v-for="estado in state.estados" :key="estado.id" :value="estado.id">
                                {{ estado.nome }}
                              </option>
                            </select>
                          </span>
                        </div>
                        <div class="col-md-6">
                          <span class="input-span">
                            <label for="cidade" class="label">Cidade <span style="color: red">*</span></label>
                            <select v-model="state.nova_conta.endereco.cidade_id">
                              <option v-for="cidade in state.cidades" :key="cidade.id" :value="cidade.id">
                                {{ cidade.nome }}
                              </option>
                            </select>
                          </span>
                        </div>

                      </div>
                      <button class="submit btn-entrar" type="button" title="Criar Conta" @click="novaConta()">
                        FINALIZAR CADASTRO
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import services from "~/services/axios";
definePageMeta({
  layout: "site",
});
const router = useRouter();
const state = reactive({
  nova_conta: {
    nome: "",
    nome_mae: "",
    telefone_principal: "",
    telefone_alternativo: "",
    email: "",
    password: "",
    data_nascimento: "",
    tipo_pessoa: "FISICA",
    cpf: "",
    cnpj: "",
    endereco: {
      logradouro: null,
      bairro: null,
      cep: null,
      cidade: null,
      cidade_id: null,
      estado: null,
      estado_id: null,
      uf: null,
      ibge: null,
    },
  },
});

onMounted(() => {
  getEstados();
});

async function cepAtributes(cep) {
  if (typeof cep === 'string') {
    cep = cep.replace("-", "").replace(".", "");
  } else {
    console.error("O valor do CEP não é uma string:", cep);
    return;
  }
  try {
    const res = await services.cep.apiCep(cep);
    state.nova_conta.endereco.logradouro = res.data.logradouro;
    state.nova_conta.endereco.bairro = res.data.bairro;
    state.nova_conta.endereco.cidade = res.data.localidade;
    state.nova_conta.endereco.uf = res.data.uf;
    state.nova_conta.endereco.ibge = res.data.ibge;

    getCityByCode(state.nova_conta.endereco.ibge);
  } catch (error) {
    console.error("Erro ao buscar informações do CEP:", error);
  }
}
async function getCidades(estado_id) {
  try {
    const { data } = await services.endereco.getCidade(estado_id);
    state.cidades = data;
  } catch (error) {
    console.log(error);
  }
}
async function novaConta() {
  try {
    await services.clientes.novaConta(state.nova_conta);
    router.push("/login");
  } catch (error) {
    const errors = error.response.data.errors;
    let errorMessages = [];

    if (Array.isArray(errors)) {
      errors.forEach(error => {
        errorMessages.push(error);
      });
    } else if (typeof errors === 'object') {
      for (const [field, messages] of Object.entries(errors)) {
        messages.forEach(message => {
          errorMessages.push(message);
        });
      }
    } else {
      errorMessages.push("Ocorreu um erro desconhecido.");
    }

    alert(errorMessages.join('\n'));
  }
}

async function getEstados() {
  try {
    const { data } = await services.endereco.getEstados();
    state.estados = data;
  } catch (error) {
    console.log(error);
  }
}
async function getCityByCode(cod_ibge) {
  try {
    const { data } = await services.endereco.getCityByCode(cod_ibge);
    state.nova_conta.endereco.estado_id = data.estado_id;
    state.nova_conta.endereco.cidade_id = data.id;
    getCidades(state.nova_conta.endereco.estado_id);
  } catch (error) {
    console.log("aqui:" + error);
  }
}
</script>

<style scoped>
#sct_1 {
  display: flex;
  justify-content: center;
  align-items: center;

}

.header-login {
  display: flex;
  justify-content: left;
  align-items: center;
  font-family: 'Poppins';
  font-weight: 600;
  padding: 10px;
}

.header-login h3 {
  margin-left: 10px;
}

.card {
  background: rgb(255, 255, 255);
  border-radius: 5px;
  box-shadow:
    rgba(0, 0, 0, 0.07) 0px 1px 2px,
    rgba(0, 0, 0, 0.07) 0px 2px 4px,
    rgba(0, 0, 0, 0.07) 0px 4px 8px,
    rgba(0, 0, 0, 0.07) 0px 8px 16px,
    rgba(0, 0, 0, 0.07) 0px 16px 32px,
    rgba(0, 0, 0, 0.07) 0px 32px 64px;
}


#img_conta {
  width: 100%;
  object-fit: cover;
  height: 60rem;
  border-radius: 5px 0px 0px 5px;
  filter: grayscale(50%);
}

form {
  padding: 32px 24px;
}

form h2 {
  font-family: 'Poppins', Tahoma;
  font-size: 40px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0px;
  text-align: center;
  color: #3CCF4E;
  margin-bottom: 10px;
}

form p {
  font-family: 'Poppins', Tahoma;
  font-size: 14px;
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0px;
  text-align: center;
  color: #737373;
}

form select {
  width: 100%;
  padding: 16px;
  border-radius: 4px;
  border: 1px solid #E4E4EB;
  background: #FFFFFF;
}

form input {
  width: 100%;
  padding: 16px;
  border-radius: 4px;
  border: 1px solid #E4E4EB;
  background: #FFFFFF;
}

form .btn-entrar {
  background: #000000;
  padding: 16px 10px;
  width: 100%;
  font-family: 'Poppins';
  font-size: 16px;
  font-weight: 600;
  line-height: 1;
  letter-spacing: 0px;
  text-align: center;
  color: #FFFFFF;
  border-radius: 4px;
  margin-bottom: 1rem;
  margin-top: 2rem;
  transition: 0.3s;
}

form .btn-entrar:hover {
  background: #504f4f;
}

form .btn-conta {
  background: #CFB14E;
  padding: 16px 10px;
  width: 100%;
  font-family: 'Poppins';
  font-size: 16px;
  font-weight: 600;
  line-height: 1;
  letter-spacing: 0px;
  text-align: center;
  color: #FFFFFF;
  border-radius: 4px;
  transition: 0.3s;
}

form .btn-conta:hover {
  background: #ad9443;
}

.label {
  font-family: 'Poppins';
  font-size: 14px;
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0px;
  text-align: left;
  color: #343C6A;

}

.span a {
  color: #000000;
}

.spam a:hover {
  color: #CFB14E;

}

@media (min-width: 768px) and (max-width: 991px) {
  #img_conta {
    height: 55rem;
  }
}
</style>