<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="col-md-10 offset-md-1">
          <div class="card">
            <div class="linear">
              <form>
                <div class="row">
                  <div class="div_img_logo"></div>
                </div>
                <p class="span_input">Digite sua nova senha.</p>
                <input
                  id="input_email"
                  type="password"
                  class="form-control"
                  placeholder="Seu e-mail"
                  v-model="state.senha"
                />
                <button
                  type="button"
                  class="btn btn-send"
                  title="ENVIAR"
                  @click="sendEmail"
                >
                  ENVIAR
                </button>
                <div class="copy">
                  <p>Mística © 2024 - todos os direitos reservados.</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { reactive } from "vue";
import services from "../../services/axios";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const state = reactive({
      senha_um: "",
      senha_dois: "",
    });
    useHead({
      title: "Mística - Recuperar Minha Senha",
      link: [
        {
          href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css",
          rel: "stylesheet",
          integrity:
            "sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN",
          crossorigin: "anonymous",
        },
      ],
      script: [
        {
          src: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js",
          integrity:
            "sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL",
          crossorigin: "anonymous",
        },
      ],
    });
    definePageMeta({
      layout: "blank",
    });
    async function sendEmail() {
      await services.clientes
        .sendNewPassword({
          token: router.currentRoute._value.params.token,
          nova_senha: state.senha_um,
          confirmacao_senha: state.senha_dois,
        })
        .then((data) => {
          if (!data.data.sucesso) {
            alert("Falha ao alterar senha!!!");
            return;
          } else {
            alert("Senha alterado com sucesso!!!");
          }
        })
        .catch((error) => {
          var valores = Object.values(error.response.data.errors);
          valores.forEach((element) => {
            element.forEach((element2) => {
              alert(element2);
            });
          });
        });
    }
    return {
      state,
      sendEmail,
    };
  },
};
</script>
<style scoped>
section {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #69696977;
}

.card {
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.49);
  background-image: url("/images/site/back_pass.jpg");
  background-size: cover;
  height: 80vh;
  border: solid 2px #000;
}

.linear {
  height: 80vh;
  background: #000000d0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.div_img_logo {
  text-align: center;
}

.span_input {
  text-align: center;
  color: #fff;
  font-size: 14pt;
  font-weight: 600;
}

input {
  width: 100%;
  margin-bottom: 1rem;
}

.btn-send {
  background: #cfb14e;
  font-family: "Roboto";
  font-size: 16px;
  font-weight: 700;
  color: #313131;
  padding: 6px 20px;
  border-radius: 4px;
  transition: 0.3s;
}

.btn-send:hover {
  background: #a8903f;
}

.copy p {
  text-align: center;
  color: #fff;
  font-size: 12pt;
  font-weight: 500;
}
</style>