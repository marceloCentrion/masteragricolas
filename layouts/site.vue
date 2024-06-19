<script setup lang="ts">
useHead({
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
onMounted(() => {
  const script = document.createElement("script");
  script.src = "//code.jivosite.com/widget/iDZorhmG53";
  script.async = true;
  document.head.appendChild(script);
});
</script>
<template>
  <div
    style="
      min-height: 100vh;
      position: relative;
      margin-bottom: 0px;
      padding-bottom: 80px;
    "
  >
    <slot></slot>
    <bottom style="bottom: 0; position: absolute; width: 100%" />
  </div>
</template>

<style>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css");
@import url("https://fonts.googleapis.com/css2?family=Livvic:ital,wght@0,300;0,400;0,500;0,600;0,700;0,900;1,700&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,900;1,600&family=Roboto:ital,wght@0,400;0,500;1,400&display=swap");
</style>
