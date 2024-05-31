import vuetify from "vite-plugin-vuetify";
export default defineNuxtConfig({
  modules: ['nuxt-icon', '@pinia/nuxt'],
  ssr: false,
  typescript: {
    shim: false,
  },
  app: {
    head: {
      title:
        "MASTER",
    },
  },
  build: {
    transpile: ["vuetify"],
  },
  nitro: {
    serveStatic: true,
  },
  sourcemap: { server: false, client: false },
  devServerHandlers: [],
});
