export default httpClient => ({
  logarSistema: async ({ email, senha }) => {
    const response = await httpClient.post('/admin/login', {
      email,
      password: senha
    })
    let errors = null
    if (!response.data) {
      errors = {
        status: response.request.status,
        statusText: response.request.statusText
      }
    }
    return {
      data: response.data,
      errors
    }
  },
  verificaToken: async (token) => {
    let headers = {
      "Authorization": "Bearer " + token
    }
    const response = await httpClient.get('/admin/verifica-token', {
      headers
    })

    let errors = null

    if (!response.data) {
      errors = {
        status: response.request.status,
        statusText: response.request.statusText
      }
    }
    return {
      data: response.data,
      errors
    }
  },
  logarCliente: async ({ email, password }) => {
    const response = await httpClient.post('/clientes/login', {
      email,
      password
    })
    let errors = null
    if (!response.data) {
      errors = {
        status: response.request.status,
        statusText: response.request.statusText
      }
    }
    return {
      data: response.data,
      errors
    }
  },
  verificaTokenClientes: async ({ client_token }) => {
    console.log('Aqui é o verfica token cliente  ' + client_token)
    let headers = {
      "Authorization": "Bearer " + client_token
    }
    const response = await httpClient.get('/clientes/verifica-token', {
      headers
    })
    let errors = null
    if (!response.data) {
      errors = {
        status: response.request.status,
        statusText: response.request.statusText
      }
    }
    return {
      data: response.data,
      errors
    }
  },
})
