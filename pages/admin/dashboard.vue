<template>
  <div>

    <div class="row">
      <div class="col-md-3">
        <div class="quad_icon">
          <div class="content">
            <i class="bi bi-basket" style="color: red;"></i>
            <p class="number">{{state.novos_pedidos}}</p>
            <p class="text">Novos Pedidos</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="quad_icon">
          <div class="content">
            <i class="bi bi-people-fill"></i>
            <p class="number">{{ state.clientes_ativos }}</p>
            <p class="text">Total de Clientes</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="quad_icon">
          <div class="content">
            <i class="bi bi-box-seam" style="color: blue;"></i>
            <p class="number">{{ state.produtos_ativos }}</p>
            <p class="text">Total de Produtos</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="quad_icon">
          <div class="content">
            <i class="bi bi-envelope-arrow-down-fill" style="color: purple;"></i>
            <p class="number">{{ state.contatos_pendentes }}</p>
            <p class="text">Contatos Não Lidos</p>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-lg-12 mb-lg">
        <!-- line chart -->
        <div class="card z-index-2" style="border-radius: 10px">
          <div class="dashboard-banner">
            <div class="quad"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import service from "../../services/axios";

const authStore = useAuthStore();
const token = authStore.token;

definePageMeta({
  middleware: 'auth'
});
useServerHead({
  title: "Protecty Alarmes - Dashboard",
});

onMounted(() => {
  fetchInfo();
})
const state = reactive({
  novos_pedidos: "",
  produtos_ativos: "",
  clientes_ativos: "",
  contatos_pendentes: "",
  total_projetos: "",
  contatos_pendentes: "",
});

async function fetchInfo() {
  try {
    const { data } = await service.empresa.getInfos({ token });
    state.novos_pedidos = data.novos_pedidos;
    state.produtos_ativos = data.produtos_ativos;
    state.clientes_ativos = data.clientes_ativos;
    state.contatos_pendentes = data.contatos_pendentes;
  } catch (error) {
    console.log(error);
  }
}
</script>

<style scoped>
.dashboard-banner {
  background-image: url("/images/admin/farm.jpg");
  background-size: cover;
  height: 70vh;
  border-radius: 10px;
  background-position: top;
}

.quad {
  height: 70vh;
  background: #1a1b216d;
  border-radius: 10px;
}

.quad_icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: #fff;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
  border: solid 1px #97979721;
  border-radius: 8px;
  padding: 2rem;
}

.content {
  text-align: center;
}

.content i {
  font-size: 26pt;
}

.content .number {
  margin-bottom: 0;
  font-size: 18pt;
  font-weight: 900;
  color: gray;
}

.content .text {
  margin-bottom: 0;
  font-size: 16pt;
  font-weight: 500;
  color: black;
}
</style>