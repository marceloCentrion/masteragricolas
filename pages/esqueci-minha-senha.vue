<template>
  <top :tela="'ecommerce'" />
  <section>
    <div class="container">
      <div class="row">
        <div class="col-md-10 offset-md-1">
          <div class="card">
            <div class="linear">
              <form>
                <div class="row">
                  <div class="div_img_logo">
                    <img src="/images/site/logo.png" alt="Logo Comparts" style="width: 150px; margin-bottom: 1rem;" />
                  </div>
                </div>
                <p class="span_input">
                  Informe o seu e-mail abaixo para receber as instruções de como
                  criar uma nova senha.
                </p>
                <input id="input_email" type="email" class="form-control" placeholder="Seu e-mail"
                  v-model="state.email" />
                <button type="button" class="btn btn-send" title="ENVIAR" @click="sendEmail">
                  ENVIAR
                </button>
                <div class="copy">
                  <p>Master Agrícolas - 2024 © Todos os direitos reservados</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Loader :loader="state.loader" />
    <div id="toast" class="toast">Erro ao fazer login</div>
  </section>
</template>
<script>
import services from "../services/axios";
export default {
  setup() {
    definePageMeta({
      layout: "site",
    });
    useServerHead({});
    const state = reactive({
      email: "",
      loader: false,
    });
    useHead({
      title: "Máster Agrícola - Recuperar Minha Senha",
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
    async function sendEmail() {
      state.loader = true;
      await services.clientes
        .sendEmailPassword({
          email: state.email,
        })
        .then((data) => {
          if (!data.data.sucesso) {
            alert("Email não enviado!!!");
            state.loader = false;
            return;
          } else {
            alert("Email  Enviado!!!");
            state.email = "";
            state.loader = false;
          }
        })
        .catch((error) => {
          console.log(error.response.data.erro);
          showToast(error.response.data.erro);
          state.email = "";
        });
    }
    function showToast(message) {
      const toast = document.getElementById("toast");
      toast.textContent = message;
      toast.classList.add("show");
      setTimeout(() => {
        toast.classList.remove("show");
      }, 3000);
    }
    return {
      state,
      sendEmail,
      showToast,
    };
  },
};
</script>
<style scoped>
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #ff4d4d;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transform: translateY(-20px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  z-index: 10000;
  font-weight: 700;
}

.toast.show {
  opacity: 1;
  transform: translateY(0);
}

section {
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
  margin-top: 2rem;
  margin-bottom: 2rem;
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
  font-family: "Poppins", sans-serif;

}

input {
  width: 100%;
  margin-bottom: 1rem;
  font-family: "Poppins", sans-serif;

}

.btn-send {
  padding: 10px 24px;
  border-radius: 4px;
  color: rgba(255, 255, 255, 1);
  background: rgba(76, 76, 76, 1);
  text-decoration: none;
  font-weight: 700;
  font-family: "Poppins", sans-serif;
  margin-right: 10px;
  transition: 0.3s;
}

.btn-send:hover {
  padding: 10px 24px;
  border-radius: 4px;
  color: rgba(76, 76, 76, 1);
  background: rgba(197, 197, 197, 1);
  text-decoration: none;
  font-weight: 700;
  font-family: "Poppins", sans-serif;
}

.copy p {
  text-align: center;
  color: #fff;
  font-size: 12pt;
  font-weight: 500;
  font-family: "Poppins", sans-serif;
}
</style>