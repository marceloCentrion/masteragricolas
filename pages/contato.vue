<template>
  <div>
    <section id="section_contato">
      <top />
      <div class="linear">
        <div class="container">
          <form>
            <div class="card">
              <div class="row">
                <div class="col-md-10 offset-md-1">
                  <div class="title">
                    <NuxtLink to="/"> <img src="/images/site/logo.png" alt="Logo Footer" /></NuxtLink>
                    <h1>Entre em Contato Conosco</h1>
                  </div>
                  <div class="inputs">
                    <div class="form">
                      <input class="input" placeholder="Seu Nome:" required="" v-model="state.contato.nome" type="text">
                      <span class="input-border"></span>
                    </div>
                    <div class="form">
                      <input class="input" placeholder="Seu E-mail:" required="" v-model="state.contato.email"
                        type="email">
                      <span class="input-border"></span>
                    </div>
                    <div class="form">
                      <input class="input" placeholder="Seu Telefone:" required="" v-model="state.contato.telefone"
                        type="text" v-maska data-maska="['(##) ####-####','(##) # ####-####']">
                      <span class="input-border"></span>
                    </div>
                    <div class="form">
                      <textarea class="input" placeholder="Sua Mensagem:" required=""
                        v-model="state.contato.mensagem"></textarea>
                      <span class="input-border"></span>
                    </div>
                  </div>
                  <div class="load-row" v-if="state.loader">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div class="div_button">
                    <button type="button" @click="enviar">Enviar</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup>
import { reactive } from "vue";
import services from "./../services/axios";
const state = reactive({
  contato: {
    nome: "",
    email: "",
    telefone: "",
    mensagem: "",
  },
  loader: false,
});
useHead({
  title: "Master Contato",
})

definePageMeta({
  layout: 'site'
})
async function enviar() {
  state.loader = true;
  await services.contato
    .enviar({ contato: state.contato })
    .then((data) => {
      if (data.data.id == null || data.data.id == undefined || data.data.id == "") {
        alert("Email não enviado!!!");
        return;
      } else {
        alert("Email  enviado!!!");
      }
      state.contato.nome = "";
      state.contato.email = "";
      state.contato.telefone = "";
      state.contato.mensagem = "";
      state.loader = false;
    })
    .catch((error) => {
      state.loader = false;
      var valores = Object.values(error.response.data.errors);
      valores.forEach((element) => {
        element.forEach((element2) => {
          alert(element2);
        });
        state.contato.nome = "";
        state.contato.email = "";
        state.contato.telefone = "";
        state.contato.mensagem = "";
        return;
      });
    });
}
</script>
<style scoped>
#section_contato {
  height: 100vh;
  background-image: url('/images/site/tractor_ctt.jpg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.linear {
  background-color: #000000c4;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  background: #00000054;
  border: none;
  border-radius: 6px;
}

.title {
  text-align: center;
  margin-top: 2rem;
}

.title h1 {
  font-family: "Livvic", sans-serif;
  color: #3CCF4E;
  font-size: 45px;
  font-weight: 900;
  line-height: 1.5;
  letter-spacing: 0.02em;

}

#img_ctt {
  width: 100%;
  height: 700px;
  object-fit: cover;
}

.inputs {
  padding: 2rem;
}

.form {
  --border-height: 1px;
  --border-before-color: rgba(221, 221, 221, 0.39);
  --border-after-color: #3CCF4E;
  --input-hovered-color: #ffffff1a;
  position: relative;
  margin-bottom: 1rem;
}

textarea {
  outline: none;
  resize: none;
  height: 200px;
}

.input {
  color: #fff;
  font-family: 'Poppins';
  font-size: 16px;
  background-color: transparent;
  box-sizing: border-box;
  padding-inline: 0.5em;
  padding-block: 0.7em;
  border: none;
  border-bottom: var(--border-height) solid var(--border-before-color);
  width: 100%;
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

input:hover {
  background: var(--input-hovered-color);
}

input:focus {
  outline: none;
}

input:focus~.input-border {
  width: 100%;
}

textarea:hover {
  background: var(--input-hovered-color);
}

textarea:focus {
  outline: none;
}

textarea:focus~.input-border {
  width: 100%;
}

.div_button {
  text-align: center;
  margin-bottom: 1rem;
}

button {
  font-family: "Livvic", sans-serif;
  font-weight: 700;
  position: relative;
  background-color: transparent;
  border-radius: 4px;
  padding: 8px;
  cursor: pointer;
  width: 200px;
  color: #3CCF4E;
  border: solid 2px #3CCF4E;
  font-size: 20px;
  transition: all 0.3s ease-in-out;
  z-index: 1;
  overflow: hidden;
}

button::before {
  content: "";
  background-color: #3CCF4E;
  width: 0;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  transition: width 700ms ease-in-out;
  display: inline-block;
}

button:hover {
  color: #000;
}

button:hover::before {
  width: 100%;
}

@keyframes up-down6 {
  0% {
    transform: translateY(-10px);

  }

  100% {
    transform: translateY(10px);
  }
}

.load-row {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
}

.load-row span {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #3CCF4E;
  border-radius: 50px;
  animation: up-down6 0.5s ease-in infinite alternate;
}

.load-row span:nth-child(2) {
  background: #2d9b39;
  animation-delay: 0.16s;
}

.load-row span:nth-child(3) {
  background: #206b28;
  animation-delay: 0.32s;
}

.load-row span:nth-child(4) {
  background: #123b16;
  animation-delay: 0.48s;
}

@media (min-width: 992px) and (max-width: 1200px) {
  #img_ctt {
    height: 600px;
  }

  .title h1 {
    font-size: 33px;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  #img_ctt {
    height: 565px;
  }

  .title h1 {
    font-size: 22px;
  }

  textarea {
    outline: none;
    resize: none;
    height: 150px;
  }
}

@media (min-width: 576px) and (max-width: 767px) {
  .div_img {
    display: none;
  }

  .title h1 {
    font-size: 33px;
  }

  .div_button {
    margin-bottom: 1rem;
  }
}

@media (max-width: 575px) {
  #section_contato {
    height: auto;
  }

  .div_img {
    display: none;
  }

  .title h1 {
    font-size: 28px;
  }

  .div_button {
    margin-bottom: 1rem;
  }
}
</style>