import { useClienteAuthStore } from "~/stores/clienteAuth";

export default defineNuxtPlugin(({ $pinia }) => {
  return {
    provide: {
      store: [
        useCarrinhoStore($pinia),
        useClienteAuthStore($pinia),
      ]
    },
  };
});