export default httpClient => ({
  save: async ({ produto, token }) => {
    const headers = { "Authorization": "Bearer " + token }
    const response = await httpClient.post('/produtos', produto, { headers });
    return {
      data: response.data
    }
  },
  update: async ({ produto, token }) => {
    const headers = { "Authorization": "Bearer " + token }
    const response = await httpClient.put('/produtos/' + produto.id, produto, { headers });
    return {
      data: response.data
    }
  },
  getById: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/produtos/' + id, { headers });
    return {
      data: response.data
    }
  },
  getAll: async ({ token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/produtos', { headers });
    return {
      data: response.data
    }
  },
  delete: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.delete('/produtos/' + id, { headers });
    return {
      data: response
    }
  },
  salvarImagem: async ({ token, formImagem }) => {
    let headers = { "Authorization": "Bearer " + token, "Content-Type": "multipart/form-data" }
    const response = httpClient.post('/imagens-produtos', formImagem, { headers })
    return {
      data: response.data,
    }
  },
  deletarImagens: async ({ token, imagens }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.post('/deletar-imagens-produto', { imagens }, { headers })
    return { data: response }
  },
  getAllSite: async () => {
    const response = await httpClient.get('/produtos-home');
    return {
      data: response.data
    }
  },
  getProdutoSite: async ({ urn }) => {
    const response = await httpClient.get('/produto/' + urn);
    return {
      data: response.data
    }
  },
  getAllProduto: async () => {
    const response = await httpClient.get('/todos-produtos');
    return {
      data: response.data
    }
  },
  getProdutosAtivos: async () => {
    const response = await httpClient.get('/produtos-ativos');
    return {
      data: response.data
    }
  },
  getAllProdutoCat: async (categoria_urn) => {
    const response = await httpClient.get('/produtos-por-categoria/' + categoria_urn);
    return {
      data: response.data
    }
  },
  buscarProduto: async (nome) => {
    const response = await httpClient.post('/produtos/pesquisa', nome);
    return {
      data: response.data
    }
  },
  // buscarProduto: async ({ element }) => {
  //   const response = await httpClient.get('/produtos/' + element);
  //   return {
  //     data: response.data
  //   }
  // },
  porFaixaPreco: async ({ preco_inicial, preco_final }) => {
    const response = await httpClient.post('/produtos-por-faixa-preco', { preco_inicial, preco_final });
    return {
      data: response.data
    }
  },

});