<template>
  <div>
    <a href="#"><img id="whatsapp" src="/public/images/site/whatsapp.png" alt="whatsapp" /></a>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
#whatsapp {
  width: 70px;
  height: 70px;
  position: fixed;
  right: 50px;
  bottom: 10px;
  opacity: 0.5;
  z-index: 100;
}
@media (max-width: 575px) {
  #whatsapp {
    right: 5px;
  }
}
</style>