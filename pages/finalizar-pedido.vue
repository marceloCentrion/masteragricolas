<template>
  <div style="background: #fcfcfc">
    <div class="line_top p-2">
      <div class="container">
        <div class="row">
          <div class="col-sm-6">
            <div class="div_img">
              <img src="./../public/images/logos/logo_mistica_transparente.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <section id="sct_pedido">
      <div class="container">
        <div class="row">
          <div class="col-xl-4 col-md-6 mt-4">
            <div class="card">
              <h5 class="card-header">
                Informações Pessoais <i class="bi bi-person-circle"></i>
              </h5>
              <div class="card-body">
                <p class="card-text">
                  <strong>Nome:</strong> {{ state.dados.nome }}
                </p>
                <p class="card-text">
                  <strong>CPF:</strong> {{ state.dados.cpf }}
                </p>
                <p class="card-text">
                  <strong>Data de Nascimento:</strong>
                  {{ state.dados.data_nascimento }}
                </p>
                <p class="card-text">
                  <strong>E-mail:</strong>
                  {{ state.dados.email }}
                </p>
                <p class="card-text">
                  <strong>Telefone Principal:</strong>
                  {{ state.dados.telefone_principal }}
                </p>
                <p class="card-text">
                  <strong>Telefone Alternativo:</strong>
                  {{ state.dados.telefone_alternativo }}
                </p>
              </div>
            </div>
          </div>
          <div class="col-xl-4 col-md-6 mt-4">
            <div class="card">
              <h5 class="card-header">
                Endereço de Entrega <i class="bi bi-truck"></i>
              </h5>
              <div class="card-body">
                <p class="card-text">
                  <strong>CEP:</strong> {{ state.dados.enderecos[0].cep }}
                </p>
                <p class="card-text">
                  <strong>Logradouro:</strong>
                  {{ state.dados.enderecos[0].logradouro }}
                </p>
                <p class="card-text">
                  <strong>Nº:</strong> {{ state.dados.enderecos[0].numero }}
                </p>
                <p class="card-text">
                  <strong>Bairro:</strong> {{ state.dados.enderecos[0].bairro }}
                </p>
                <p class="card-text">
                  <strong>Complemento:</strong>
                  {{ state.dados.enderecos[0].complemento }}
                </p>
                <p class="card-text">
                  <strong>Cidade:</strong>
                  {{ state.dados.enderecos[0].cidades.nome }}
                </p>
                <p class="card-text">
                  <strong>Estado:</strong>
                  {{ state.dados.enderecos[0].cidades.estado.nome }}
                </p>
                <a href=""><button type="button" class="btn_gold mt-2">
                    Alterar Endereço
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div class="col-xl-4 col-md-6 mt-4">
            <div class="card">
              <h5 class="card-header">
                Resumo do Pedido <i class="bi bi-box2"></i>
              </h5>
              <div class="card-body">
                <p class="card-text" v-for="produto in state.produtos" :key="produto.id">
                  <strong>Produto:</strong> {{ produto.nome }}
                </p>
                <p class="card-text">
                  <strong>Total no Pix:</strong>
                  {{
                    state.carrinho.valor_total_pix.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })
                  }}
                </p>
                <p class="card-text" v-if="state.carrinho.valor_total_desconto != null ||
                    state.carrinho.valor_total_desconto != undefined
                    ">
                  <strong>Total com Desconto:</strong>
                  {{
                    state.carrinho.valor_total_desconto.toLocaleString(
                      "pt-br",
                      {
                        style: "currency",
                        currency: "BRL",
                      }
                    )
                  }}
                </p>
                <p class="card-text">
                  <strong>Total:</strong>
                  {{
                      state.carrinho.valor_total.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })
                    }}
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-4 offset-md-8 mt-sm-4">
            <p class="p-txt">
              <span class="text-danger">ATENÇÃO</span> Ao confirmar o pedido ele
              entrara em processo de análise assim entraremos em contato via
              WhatsApp para a ação de pagamento!
            </p>
            <button title="Finalizar Pedido" @click="fazerPedido" class="btn_transparent"
              :disabled="state.pedidoEmAndamento">
              Finalizar Pedido
            </button>
            <div v-if="state.loader">
              <loader />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-2 mt-xl-1 col-md-2 col-sm-4 mt-sm-2 mt-2">
            <div class="div_btn_endereco">
              <a href="/carrinho">
                <button title="Voltar" class="btn_transparent">Voltar</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <bot />
  </div>
</template>
<script>
import { reactive, onMounted } from "vue";
import services from "../services/axios";
import { useRouter } from "vue-router";
export default {
  setup() {
    definePageMeta({
      layout: "blank",
    });
    useHead({
      title: "Mística - Finalizar Pedido",
      link: [
        {
          href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css",
          rel: "stylesheet",
          integrity: "sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN",
          crossorigin: "anonymous"
        }],
      script: [
        {
          src: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js",
          integrity: "sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL",
          crossorigin: "anonymous"
        }
      ],
    });

    const router = useRouter();
    const carrinhoStore = useCarrinhoStore();
    const { itens, valores_produtos } = storeToRefs(carrinhoStore);
    const { limparCarrinho } = carrinhoStore;
    const clienteAuthStore = useClienteAuthStore();
    const { client_token, client_id } = storeToRefs(clienteAuthStore);
    if (!client_id.value || !client_token.value || itens.value.length == 0) {
      router.push({ name: "index" });
    }
    const state = reactive({
      endereco: { cliente: {} },
      id_endereco: "",
      dados: { enderecos: [{ cidades: { estado: {}, estado_id: "" } }], cidade_id: "" },
      carrinho: {
        valor_total: "",
        valor_total_desconto: "",
        valor_total_pix: "",
        valor_frete: "",
        valor_produtos: "",
      },
      produtos: [],
      pedidoEmAndamento: false,
      loader: false,
    });

    onMounted(() => {
      getEstados();
      fetchDataCliente();
      state.carrinho.valor_frete = 0;
      state.carrinho.valor_total_desconto = valores_produtos.value.total_desconto;
      state.carrinho.valor_total_pix = valores_produtos.value.total_pix;
      state.carrinho.valor_produtos = valores_produtos.value.total;
      state.carrinho.valor_total = valores_produtos.value.total + state.carrinho.valor_frete;
      state.produtos = itens;
    });

    async function fetchDataCliente() {
      try {
        const { data } = await services.clientes.getDataCliente({
          client_token: client_token.value,
          client_id: client_id.value,
        });
        state.dados = data;
        state.id_endereco = data.enderecos[0].id;
        var data_nascimento = data.data_nascimento;
        // formatarData(data_nascimento);
        // var estado_id = data.endereco.cidade.estado_id;
        // getCidade(estado_id);
      } catch (error) {
        console.log(error);
      }
    }

    // function formatarData(data_nascimento) {
    //   let data_americana = data_nascimento;
    //   let data_brasileira = data_americana.split("-").reverse().join("/");
    //   state.dados.data_nascimento = data_brasileira;
    // }

    async function fazerPedido() {
      try {
        state.loader = true;
        state.pedidoEmAndamento = true;
        await services.clientes
          .fazerPedido({
            client_token: client_token.value,
            dados: {
              endereco_id: state.id_endereco,
              cliente_id: client_id.value,
              produtos: state.produtos,
              ...state.carrinho,
            },
          })
          .then(() => {
            limparCarrinho();
            router.push('/');
          });
      } catch (error) {
        console.log(error);
      } finally {
        state.loader = false;
        state.pedidoEmAndamento = false;
      }
    }

    async function upEndereco() {
      try {
        await services.clientes.upEndereco({
          id_endereco: state.id_endereco,
          // endereco: state.dados.endereco,
          client_token: client_token.value,
        });
        fetchDataCliente();
      } catch (error) {
        console.log(error);
      }
      state.modalOpen = false;
    }
    async function cepAtributes() {
      var cep = state.dados.endereco.cep;
      state.dados.endereco.cep = cep.replace("-", "").replace(".", "");
      await services.cep.apiCep(state.dados.endereco.cep).then((res) => {
        console.log(res.data);
        state.dados.endereco.logradouro = res.data.logradouro;
        state.dados.endereco.bairro = res.data.bairro;
        state.dados.endereco.codigo_ibge = res.data.ibge;
      });
      getCityByCode(state.dados.endereco.codigo_ibge);
    }
    function abrirModal() {
      state.modalOpen = true;
    }
    function fecharModal() {
      state.modalOpen = false;
    }
    async function getEstados() {
      try {
        const { data } = await services.endereco.getEstados();
        state.estados = data;
        console.log(state.estados);
      } catch (error) {
        console.log("aqui:" + error);
      }
    }
    async function getCidade(estado_id) {
      try {
        const { data } = await services.endereco.getCidade(estado_id);
        state.cidades = data;
        console.log(state.cidades);
      } catch (error) {
        console.log("aqui:" + error);
      }
    }
    async function getCityByCode(cod_ibge) {
      try {
        const { data } = await services.endereco.getCityByCode(cod_ibge);
        await getCidade(data.estado_id);
        state.dados.endereco.cidade.estado_id = data.estado_id;
        state.dados.endereco.cidade_id = data.id;
        console.log("código IBGE:" + cod_ibge);
      } catch (error) {
        console.log("aqui:" + error);
      }
    }
    return {
      getCidade,
      getEstados,
      fazerPedido,
      upEndereco,
      cepAtributes,
      fecharModal,
      abrirModal,
      state,
    };
  },
};
</script>
<style scoped>
.btn_save {
  padding: 5px;
  width: 100px;
  background: #00a000;
  border: solid 2px #000;
  border-radius: 5px;
  color: #000;
  transition: 0.2s;
}

#sct_pedido {
  margin-top: 2rem;
  margin-bottom: 2rem;
  min-height: 100vh;
}

.line_top {
  background: #000;
  border-bottom: solid 5px #CFB14E;
}

.card {
  background: #fff;
  box-shadow: 4px 4px 5px 1px rgba(0, 0, 0, 0.26);
}

.card .card-header {
  color: #CFB14E;
  background: #000;
  border-bottom: solid 2px #CFB14E;
  padding: 1rem;
}

.card-text {
  color: #000;
  margin-bottom: 5px;
}

.btn_transparent {
  font-family: 'Poppins', sans-serif;
  border-radius: 4px;
  border: 1px solid #000;
  background: transparent;
  color: #000;
  width: 240px;
  padding: 5px;
  transition: 0.5s;
}

.btn_transparent:hover {
  background: #000;
  color: #fff;
}

.p-txt {
  color: #000;
  margin-bottom: 10px;
  font-size: 12pt;
  font-weight: 500;
}

.form {
  --width-of-input: 100%;
  --border-height: 1px;
  --border-before-color: rgba(221, 221, 221, 0.39);
  --border-after-color: rgb(255, 0, 0);
  --input-hovered-color: #e049491f;
  position: relative;
  width: var(--width-of-input);
}

.input {
  color: #000;
  font-size: 12pt;
  background-color: transparent;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 5px;
  border: none;
  border-bottom: var(--border-height) solid var(--border-before-color);
}

.input-border {
  position: absolute;
  background: var(--border-after-color);
  width: 0%;
  height: 2px;
  bottom: 0;
  left: 0;
  transition: 0.3s;
}

/* Hover on Input */
.input:hover {
  background: var(--input-hovered-color);
}

.input:focus {
  outline: none;
}

.input:focus~.input-border {
  width: 100%;
}

.form label {
  font-size: 14pt;
  margin-bottom: 0;
  color: #000;
}

.div_btn {
  text-align: right;
}

#togglePass {
  background: transparent;
  border: none;
}

#togglePass:hover {
  background: var(--input-hovered-color);
}

.btn_gold {
  font-family: 'Poppins', sans-serif;
  border-radius: 4px;
  border: 1px solid #CFB14E;
  background: transparent;
  color: #CFB14E;
  width: 200px;
  padding: 4px;
  transition: 0.5s;
}

.btn_gold:hover {
  background: #CFB14E;
  color: #000;
}
</style>