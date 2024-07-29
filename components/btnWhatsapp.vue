<template>
  <div>
    <a
    target="_blank"
      :href="'https://wa.me/55'+state.empresa.telefone+'?text=Ol%C3%A1!%20Venho%20atrav%C3%A9s%20do%20site%20MASTER%20PE%C3%87A%20AGR%C3%8DCOLAS.%20Gostaria%20de%20saber%20mais%20sobre%20seus%20produtos.'"><img
        id="whatsapp" src="/public/images/site/whatsapp.png" alt="whatsapp" /></a>
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
  } catch (error) {
    console.log(error);
  }
}
</script>

<style scoped>
#whatsapp {
  width: 70px;
  height: 70px;
  position: fixed;
  right: 50px;
  bottom: 60px;
  opacity: 0.5;
  z-index: 100;
}

@media (max-width: 575px) {
  #whatsapp {
    right: 5px;
  }
}
</style>