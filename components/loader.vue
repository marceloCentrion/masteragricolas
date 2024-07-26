<template>
  <div v-if="loader" class="overlay">
    <div class="loader"></div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

// Define the props
const props = defineProps({
  loader: {
    type: Boolean,
    required: true
  }
});
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5); /* Fundo escurecido */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999; /* Alta prioridade de empilhamento */
}

.loader {
  width: 60px;
  height: 60px;
  border: 10px solid #1cd42550;
  border-top-color: #1cd425;
  animation: spin013151 1s linear infinite;
  border-radius: 100%;
}

@keyframes spin013151 {
  to {
    transform: rotate(360deg);
  }
}
</style>
