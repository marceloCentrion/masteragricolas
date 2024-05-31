//import services from '.';
// export default {

//   auth(to, from, next) {
//     const storage = useStorage();
//     var token = storage.getStorageSync("token");
//     services.login.verificaToken(token).then(data => {
//       if (data.data.token) {
//         next();

//       } else {
//         next('/admin/login');

//       }
//       //  autorizado = dat
//     }).catch(function () {
//       next('/admin/login');
//     });
//   },
//   authCliente(to, from, next) {
//     const storage = useClienteAuthStore();
//     var client_token = storage.client_token;
//     services.login.verificaTokenClientes({client_token}).then(data => {
//       if (data.data.token) {
//         next();
//       } else {
//         next('/login');
//       }
//       //  autorizado = dat
//     }).catch(function () {
//       next('/login');
//     });
//     //ajax para o backend para checar a validade do token 
//   },
// }