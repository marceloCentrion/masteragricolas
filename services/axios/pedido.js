export default httpClient => ({
  calcularFrete: async ({ cep_destinatario, produtos_req, }) => {
    const headers = { "Accept": "application/json" }
    const response = await httpClient.post('/calcular-frete', {
      cep_destinatario,
      produtos_req
    }, { headers });
    return {
      data: response.data
    }
  },
  
  save: async (dados, token) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json", "Content-Type": "multipart/form-data" }
    const response = await httpClient.post('/projetos', dados, { headers });
    return {
      data: response.data
    }
  },

  update: async (dados, token) => {
    const headers = { "Authorization": "Bearer " + token }
    const response = await httpClient.post('/projetos/' + dados.get('id'), dados, { headers });
    return {
      data: response.data
    }
  },

  getById: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/pedidos/' + id, { headers });
    return {
      data: response.data
    }
  },

  getAll: async ({ token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/pedidos', { headers });
    return {
      data: response.data
    }
  },

  delete: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.delete('/projetos/' + id, { headers });
    return {
      data: response
    }
  },

});