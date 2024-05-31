import { useSessionStorage } from "@vueuse/core";

export const useClienteAuthStore = defineStore("clienteAuth", {
    state: () => ({
        client_token: useSessionStorage("client_token", null),
        client_id: useSessionStorage("client_id", null),
        client_nome: useSessionStorage("client_nome", null),
    }),
    hydrate(state, initialState) {
        state.client_id = useSessionStorage("client_id", null);
        state.client_nome = useSessionStorage("client_nome", null);
        state.client_token = useSessionStorage("client_token", null);
    }
})