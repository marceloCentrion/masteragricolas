import service from './../services/axios';

export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log('caiu aq no mid')
  const storage = useClienteAuthStore();
  var client_token = storage.client_token;
  console.log(client_token);
  try {
    const response = await service.login.verificaTokenClientes({ client_token });
    console.log(response);
    if (response.data.token) {
      return;
    } else {
      return navigateTo('/login');
      console.log('caiu no else')
    }
  } catch (error) {
    console.error("Erro na solicitação Axios:", error);
    if (to.name !== 'login-sistema') return navigateTo('/login');
  }
});
