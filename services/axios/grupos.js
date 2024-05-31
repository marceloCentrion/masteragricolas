export default httpClient => ({
  save: async (dados, token) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json", "Content-Type": "multipart/form-data" }
    const response = await httpClient.post('/grupos', dados, { headers });
    console.log(dados)
    return {
      data: response.data
    }
  },
  update: async (dados, token) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json", "Content-Type": "multipart/form-data" }
    const response = await httpClient.post('/grupos/' + dados.get('id'), dados, { headers });
    return {
      data: response.data
    }
  },
  getById: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/grupos/' + id, { headers });
    return {
      data: response.data
    }
  },
  getAll: async ({ token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/grupos', { headers });
    return {
      data: response.data
    }
  },
  delete: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.delete('/grupos/' + id, { headers });
    return {
      data: response
    }
  },

  getGruposAtivos: async ({ token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/grupos', { headers });
    return {
      data: response.data
    }
  },
  getGruposAtivos: async () => {
    const response = await httpClient.get('/grupos');
    return {
      data: response.data
    }
  },
  getGrupoUm: async () => {
    const response = await httpClient.get('/grupos-destaque1');
    return {
      data: response.data
    }
  },
  getGrupoDois: async () => {
    const response = await httpClient.get('/grupos-destaque2');
    return {
      data: response.data
    }
  },

});