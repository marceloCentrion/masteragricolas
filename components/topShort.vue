<template>
  <div>
    <div class="div_line">
      <div class="container-fluid">
        <div class="div">
          <div class="div_2">
            <a target="_blank" :href="state.empresa.facebook">
              <i class="bi bi-facebook"></i
            ></a>
            <a target="_blank" :href="state.empresa.instagram">
              <i class="bi bi-instagram"></i
            ></a>
            <p>
              Bem vindo a Master Peças Agrícolas, um site de vendas de peças
              agrícolas feito para você!
            </p>
          </div>
          <div class="div_2">
            <i class="bi bi-envelope-fill"></i>
            <p>{{ state.empresa.email }}</p>
            <i class="bi bi-telephone-fill"></i>
            <p>atendimento 9:00 ate 18:00</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "./../services/axios";
const state = reactive({
  empresa: {
    instagram: "",
    facebook: "",
  },
});
fetchEmpresa();
async function fetchEmpresa() {
  try {
    const { data } = await axios.empresa.getSite();
    state.empresa = data;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
</script>

<style scoped>
.div {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.div_2 {
  display: flex;
  align-items: center;
  justify-content: center;
}

i {
  color: rgba(255, 255, 255, 1);
  margin-right: 10px;
}

.div_line {
  background: rgba(76, 76, 76, 1);
  padding: 5px 0px;
}

.div_2 p {
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
  font-weight: 400;
  font-family: "Roboto", sans-serif;
  margin-bottom: 0;
  font-weight: 500;
  margin-right: 10px;
}

@media (min-width: 992px) and (max-width: 1200px) {
}

@media (min-width: 768px) and (max-width: 991px) {
  .div {
    display: block;
  }
}

@media (min-width: 576px) and (max-width: 767px) {
  .div {
    display: block;
  }
}

@media (max-width: 575px) {
  .div {
    display: block;
    text-align: center;
  }

  .div_2 {
    display: flex;
    text-align: center;
  }

  .bi-facebook,
  .bi-instagram {
    display: none;
  }
}
</style>