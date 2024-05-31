export default httpClient => ({
  save: async (dados, token) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json", "Content-Type": "multipart/form-data" }
    const response = await httpClient.post('/marcas', dados, { headers });
    console.log(dados)
    return {
      data: response.data
    }
  },
  update: async (dados, token) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json", "Content-Type": "multipart/form-data" }
    const response = await httpClient.post('/marcas/' + dados.get('id'), dados, { headers });
    return {
      data: response.data
    }
  },
  getById: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/marcas/' + id, { headers });
    return {
      data: response.data
    }
  },
  getAll: async ({ token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/marcas', { headers });
    return {
      data: response.data
    }
  },
  delete: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.delete('/marcas/' + id, { headers });
    return {
      data: response
    }
  },

  getmarcasAtivos: async ({ token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/marcas', { headers });
    return {
      data: response.data
    }
  },
  getmarcasAtivos: async () => {
    const response = await httpClient.get('/marcas');
    return {
      data: response.data
    }
  },
  getGrupoUm: async () => {
    const response = await httpClient.get('/marcas-destaque1');
    return {
      data: response.data
    }
  },
  getGrupoDois: async () => {
    const response = await httpClient.get('/marcas-destaque2');
    return {
      data: response.data
    }
  },

});