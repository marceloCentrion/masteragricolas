<template>
  <div>
    <section id="footer">
      <div class="footer-high">
        <!-- <div>
          <NuxtLink to ="/"> <img src="/images/site/logo.png" alt="Logo Footer" /></NuxtLink>
        </div> -->
        <div class="div_copy">
          <p>Master Agrícolas - 2024 © Todos os direitos reservados</p>
        </div>
        <!-- <div class="icons">
          <i class="bi bi-whatsapp"></i>
          <a target="_blank" :href="state.empresa.facebook"> <i class="bi bi-facebook"></i></a>
          <a target="_blank" :href="state.empresa.instagram"> <i class="bi bi-instagram"></i></a>
          <i class="bi bi-linkedin"></i>
        </div> -->
      </div>
      <div class="footer-low">
        <!-- <div>
          <img src="/images/site/logo.png" alt="Logo Footer" />
        </div> -->
        <div class="div_copy">
          <p>Master Agrícolas - 2024 © Todos os direitos reservados</p>
        </div>
        <!-- <div class="icons">
          <i class="bi bi-whatsapp"></i>
          <a target="_blank" :href="state.empresa.facebook"> <i class="bi bi-facebook"></i></a>
          <a target="_blank" :href="state.empresa.instagram"> <i class="bi bi-instagram"></i></a>
          <i class="bi bi-linkedin"></i>
        </div> -->
      </div>
    </section>
  </div>
</template>


<script setup>
import axios from "./../services/axios";
const state = reactive({
  empresa: {
    instagram: '',
    facebook: '',
  }
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
#footer {
  background: #3CCF4E;
  padding-bottom: 2rem;
  padding-top: 2rem;
}

.footer-high {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.footer-low {
  display: none;
}

.div_copy p {
  font-family: 'Poppins', sans-serif;
  margin-bottom: 0;
  color: rgb(255, 255, 255);
  font-size: 12pt;
  font-weight: 100;
}

.icons i {
  font-size: 20pt;
  color: rgba(76, 76, 76, 1);
  margin: 10px;
}

@media (min-width: 992px) and (max-width: 1200px) {}

@media (min-width: 768px) and (max-width: 991px) {}

@media (min-width: 576px) and (max-width: 767px) {
  .footer-high {
    display: none;
  }

  .footer-low {
    display: block;
    text-align: center;
  }

  #footer {
    height: auto;
    padding-bottom: 1rem;
    padding-top: 1rem;
  }
}

@media (max-width: 575px) {
  .footer-high {
    display: none;
  }

  .footer-low {
    display: block;
    text-align: center;
  }
  .div_copy p {
    font-size: 8pt;
  }
}
</style>