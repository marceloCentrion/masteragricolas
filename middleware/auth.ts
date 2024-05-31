import service from './../services/axios';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const storage = useAuthStore();
  var token = storage.token;
  try {
    const response = await service.login.verificaToken(token);
    console.log(response.data.token);
    if (response.data.token) {
      return;
      console.log('caiu no if')
    } else {
      return navigateTo('/login');
      console.log('caiu no else')
    }
  } catch (error) {
    console.error("Erro na solicitação Axios:", error);
    if (to.name !== 'login-sistema') return navigateTo('/login');
  }
});
