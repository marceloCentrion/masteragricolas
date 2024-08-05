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
    <section id="sct_login">
      <div class="linear">
        <div class="container">
          <div class="row">
            <div class="content  col-md-8 offset-md-2">
              <div class="card">
                <div class="div_logo_card">
                  <img id="logo-card" src="/images/site/logo.png" alt="Logo" />
                </div>
                <form @submit.prevent="submitForm">
                  <div>
                    <label for="email">Email:</label>
                    <input type="email" id="email" v-model="state.email" required>
                  </div>
                  <div>
                    <label for="password">Senha:</label>
                    <input type="password" id="password" v-model="state.password" required>
                  </div>
                  <a href="/criar-conta">Não possui conta?</a>
                  <a href="/esqueci-minha-senha">Esqueci minha senha!</a>
                  <div>
                    <button class="btn-login" type="submit">ENTRE</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { reactive } from "vue";
import services from "../services/axios";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const state = reactive({
      email: "",
      senha: "",
    });
    const authStorage = useClienteAuthStore();
    definePageMeta({
      layout: "site"
    });
    useHead({
      title: "MASTER - Login",
    });
    onMounted(() => {
      if (authStorage.client_token) router.push("/");
    });
    async function submitForm() {
      await services.login
        .logarCliente({
          email: state.email,
          password: state.password,
        })
        .then((results) => {
          if (results) {
            authStorage.client_token = results.data.token;
            authStorage.client_id = results.data.id;
            authStorage.client_nome = results.data.nome;
            const destinoUrl = localStorage.getItem("destinoUrl");
            if (destinoUrl) {
              console.log(destinoUrl);
              localStorage.removeItem("destinoUrl");
              router.push(destinoUrl);
            } else {
              router.push("/");
            }
          }
        })
        .catch((error) => {
          console.log(error.response.data.erro);
          var menssage = error.response.data.erro
          alert(menssage + ', Tente Novamente!');
          return;
        });
    }
    return {
      state,
      submitForm,
    };
  },
};
</script>
<style scoped>
#sct_login {
  height: 100vh;
  background-image: url("../public/images/site/back_login.jpg");
  background-size: cover;
}

.linear {
  background: linear-gradient(#263C28, #263c281c);
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}


a {
  margin: 10px;
  text-decoration: none
}


.card {
  background: rgb(255, 255, 255);
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  width: 100%;
}

#img_login {
  width: 450px;
  border-radius: 10px 0px 0px 10px;
  object-fit: cover;
  filter: drop-shadow(0 0 0.80rem rgb(0, 0, 0));
}

.div_logo_card {
  text-align: center;
  margin: 12px;
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
  color: #00A859;
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

form input {
  width: 100%;
  padding: 16px;
  border-radius: 4px;
  border: 1px solid #E4E4EB;
  background: #FFFFFF;
}

form .btn-conta {
  background: #00A859;
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
  background: #027941;
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

form .btn-login {
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

form .btn-login:hover {
  background: rgba(76, 76, 76, 1);
}

@media (min-width: 992px) and (max-width: 1199px) {
  #img_login {
    width: 350px;
  }
}
</style>