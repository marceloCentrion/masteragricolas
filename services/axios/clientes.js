export default httpClient => ({
  save: async (cliente, token) => {
    const headers = { "Authorization": "Bearer " + token }
    const response = await httpClient.post('/clientes', cliente, { headers });
    return {
      data: response.data
    }
  },
  update: async (cliente, token) => {
    const headers = { "Authorization": "Bearer " + token }
    const response = await httpClient.put('/clientes/' + cliente.id, cliente, { headers });
    return {
      data: response.data
    }
  },
  getById: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/clientes/' + id, { headers });
    return {
      data: response.data
    }
  },
  getAll: async (token) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/clientes', { headers });
    return {
      data: response.data
    }
  },
  delete: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.delete('/clientes/' + id, { headers });
    return {
      data: response
    }
  },
  novaConta: async (nova_conta) => {
    const response = await httpClient.post('/nova-conta', nova_conta);
    return {
      data: response.data
    }
  },
  getPedidos: async ({ token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/pedidos', { headers });
    return {
      data: response.data
    }
  },
  getPedidosId: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/pedidos/' + id, { headers });
    return {
      data: response.data
    }
  },
  upPedido: async ({ id, token, pedido }) => {
    const headers = { "Authorization": "Bearer " + token }
    const response = await httpClient.put('/pedidos/' + id, pedido, { headers });
    return {
      data: response.data
    }
  },
  getMeusPedidos: async ({ id, client_token }) => {
    const headers = { "Authorization": "Bearer " + client_token, "Accept": "application/json" }
    const response = await httpClient.get('/pedidos-por-cliente/' + id, { headers });
    return {
      data: response.data
    }
  },
  getPedidoSite: async ({ id, client_token }) => {
    const headers = { "Authorization": "Bearer " + client_token, "Accept": "application/json" }
    const response = await httpClient.get('/clientes/pedidos/' + id, { headers });
    return {
      data: response.data
    }
  },
  getDataCliente: async ({ client_id, client_token }) => {
    const headers = { "Authorization": "Bearer " + client_token, "Accept": "application/json" }
    const response = await httpClient.get('/clientes/' + client_id, { headers });
    return {
      data: response.data
    }
  },
  upCliente: async ({ dados, client_token, client_id }) => {
    const headers = { "Authorization": "Bearer " + client_token }
    const response = await httpClient.put('/clientes/' + client_id, dados, { headers });
    return {
      data: response.data
    }
  },
  upEndereco: async ({ endereco, client_token, id_endereco }) => {
    const headers = { "Authorization": "Bearer " + client_token }
    const response = await httpClient.put('/enderecos/' + id_endereco, endereco, { headers });
    return {
      data: response.data
    }
  },
  sendEmailPassword: async ({ email }) => {
    const response = await httpClient.post('/clientes/esqueci-minha-senha', { email });
    return {
      data: response.data
    }
  },
  sendNewPassword: async ({ nova_senha, confirmacao_senha, token }) => {
    const response = await httpClient.post('/clientes/recuperar-senha/' + token, { nova_senha, confirmacao_senha });
    return {
      data: response.data
    }
  },
  getEndereco: async ({ client_id, client_token }) => {
    const headers = { "Authorization": "Bearer " + client_token, "Accept": "application/json" }
    const response = await httpClient.get('/enderecos-por-cliente/' + client_id, { headers });
    return {
      data: response.data
    }
  },
  fazerPedido: async ({ pedido, client_token }) => {
    const headers = { "Authorization": "Bearer " + client_token, "Accept": "application/json" }
    const response = await httpClient.post('/fazer-pedido', pedido, { headers });
    return {
      data: response.data
    }
  },
});