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
                    <img src="/images/logos/logo.png" alt="Logo Comparts"
                      style="width: 150px; margin-bottom: 1rem;" />
                  </div>
                </div>
                <p class="span_input">
                  Informe sua nova senha.
                </p>
                <div class="input-group mb-3">
                  <input id="input_nova_senha" type="password" class="form-control" placeholder="Nova senha"
                    v-model="state.newPassword" />
                  <div class="input-group-append">
                    <span class="input-group-text" @click="togglePassword('input_nova_senha', 'eye_nova_senha')">
                      <i :class="state.eyeNovaSenha ? 'bi bi-eye-slash' : 'bi bi-eye'" id="eye_nova_senha"></i>
                    </span>
                  </div>
                </div>
                <div class="input-group mb-3">
                  <input id="input_confirmar_senha" type="password" class="form-control" placeholder="Confirmar senha"
                    v-model="state.confirmPassword" />
                  <div class="input-group-append">
                    <span class="input-group-text"
                      @click="togglePassword('input_confirmar_senha', 'eye_confirmar_senha')">
                      <i :class="state.eyeConfirmarSenha ? 'bi bi-eye-slash' : 'bi bi-eye'"
                        id="eye_confirmar_senha"></i>
                    </span>
                  </div>
                </div>
                <button type="button" class="btn btn-send" title="ENVIAR" @click="sendPassword">
                  ENVIAR
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="toast" class="toast">Erro ao fazer login</div>
  </section>
</template>

<script>
import services from "../services/axios";
import { useRouter } from "vue-router";

export default {
  setup() {
    definePageMeta({
      layout: "site",
    });
    const router = useRouter();
    useServerHead({});
    const state = reactive({
      newPassword: "",
      confirmPassword: "",
      eyeNovaSenha: false,
      eyeConfirmarSenha: false,
    });
    useHead({
      title: "Comparts - Recuperar Minha Senha",
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
        {
          src: "https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.js",
        },
      ],
    });
    async function sendPassword() {
      if (state.newPassword !== state.confirmPassword) {
        showToast("As senhas não coincidem");
        return;
      }
      await services.clientes
        .sendNewPassword({
          nova_senha: state.newPassword,
          confirmacao_senha: state.confirmPassword,
          token: router.currentRoute._value.params.token,
        })
        .then((data) => {
          console.log(data)
          alert("Senha Atualizada!!!");
          state.newPassword = "";
          state.confirmPassword = "";
          router.push('/login')
          return;
        })
        .catch((error) => {
          console.log(error.response.data.erro);
          showToast(error.response.data.erro);
          state.newPassword = "";
          state.confirmPassword = "";
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
    function togglePassword(inputId, eyeId) {
      const input = document.getElementById(inputId);
      const eye = document.getElementById(eyeId);
      if (input.type === "password") {
        input.type = "text";
        if (inputId === 'input_nova_senha') state.eyeNovaSenha = true;
        if (inputId === 'input_confirmar_senha') state.eyeConfirmarSenha = true;
      } else {
        input.type = "password";
        if (inputId === 'input_nova_senha') state.eyeNovaSenha = false;
        if (inputId === 'input_confirmar_senha') state.eyeConfirmarSenha = false;
      }
    }
    return {
      state,
      sendPassword,
      showToast,
      togglePassword,
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

.input-group-text {
  cursor: pointer;
  border-radius: 0px 10px 10px 0px;
  padding: 7px;
}

input {
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
</style>
