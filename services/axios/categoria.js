export default httpClient => ({
  save: async (categoria, token) => {
    const headers = { "Authorization": "Bearer " + token }
    const response = await httpClient.post('/categorias', categoria, { headers });
    return {
      data: response.data
    }
  },
  update: async (categoria, token) => {
    const headers = { "Authorization": "Bearer " + token }
    const response = await httpClient.put('/categorias/' + categoria.id, categoria, { headers });
    return {
      data: response.data
    }
  },
  getById: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/categorias/' + id, { headers });
    return {
      data: response.data
    }
  },
  getAll: async ({ token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/categorias', { headers });
    return {
      data: response.data
    }
  },
  delete: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.delete('/categorias/' + id, { headers });
    return {
      data: response
    }
  },
  getAllSite: async () => {
    const response = await httpClient.get('/categorias-ativas');
    return {
      data: response.data
    }
  },
});