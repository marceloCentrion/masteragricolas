import { useSessionStorage } from "@vueuse/core";
export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: useSessionStorage("token", null),
    id: useSessionStorage("id", null),
    nome: useSessionStorage("nome", null),
  }),
  hydrate(state, initialState) {
    state.id = useSessionStorage('id', null);
    state.nome = useSessionStorage('nome', null);
    state.token = useSessionStorage('token', null);
  }
})