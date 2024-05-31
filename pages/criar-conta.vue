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
                            <label for="tel" class="label">Telefone Principal <span style="color: red;">*</span></label>
                            <input required type="text" name="tel" id="tel"
                              v-model="state.nova_conta.telefone_principal" v-maska 
                              data-maska="[ '(##) ####-####','(##) # ####-####' ]" /></span>
                        </div>
                        <div class="col-lg-6">
                          <span class="input-span">
                            <label for="telefone_alternativo" class="label">Telefone Alternativo <span
                                style="color: red;">*</span></label>
                            <input required type="text" name="telefone_alternativo" id="telefone_alternativo"
                              v-model="state.nova_conta.telefone_alternativo" v-maska
                              data-maska="['(##) ####-####', '(##) # ####-####' ]" /></span>
                        </div>
                        <div class="col-lg-6">
                          <span class="input-span">
                            <label for="email" class="label">E-mail <span style="color: red;">*</span></label>
                            <input required type="email" name="email" id="email"
                              v-model="state.nova_conta.email" /></span>
                        </div>
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
                            <label for="senha" class="label">Senha <span style="color: red;">*</span></label>
                            <input required type="password" name="senha" id="senha"
                              v-model="state.nova_conta.password" /></span>
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
})
const router = useRouter();
const state = reactive({
  nova_conta: {
    nome: '',
    telefone_principal: '',
    telefone_alternativo: '',
    email: '',
    cep: '',
    logradouro: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
    password: '',
    data_nascimento: '',
    tipo_pessoa: 'FISICA',
    cpf: '',
    cnpj: '',
  }
})

cepAtributes();

async function cepAtributes() {
  var cep = state.nova_conta.cep;
  state.nova_conta.cep = cep.replace("-", "").replace(".", "");
  await services.cep.apiCep(state.nova_conta.cep).then((res) => {
    console.log(res.data);
    state.nova_conta.logradouro = res.data.logradouro;
    state.nova_conta.bairro = res.data.bairro;
    state.nova_conta.cidade = res.data.localidade;
    // state.nova_conta.uf = res.data.uf;
    // state.nova_conta.codigo_ibge = res.data.ibge;
  });
}
async function novaConta() {
  try {
    await services.clientes.novaConta(state.nova_conta);
    router.push('/login')
  } catch (error) {
    alert(error.response.data.message);
  }
}

</script>

<style scoped>
#sct_1{
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
  height: 36rem;
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