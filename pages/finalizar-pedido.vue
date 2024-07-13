<template>
  <top :tela="'ecommerce'" />
  <div style="background: #fcfcfc">
    <div class="line_top p-2">
      <div class="container">
        <div class="row">
          <div class="col-sm-6">
            <div class="div_img">
              <!--  <img src="./../public/images/logos/logo_mistica_transparente.png" /> -->
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

            <div class="card card_endereco">
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
                  {{ state.dados.enderecos[0].cidade.nome }}
                </p>
                <p class="card-text">
                  <strong>Estado:</strong>
                  {{ state.dados.enderecos[0].cidade.estado.nome }}
                </p>
                <a href=""
                  ><button type="button" class="btn_gold mt-2">
                    Alterar Endereço
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div class="col-xl-4 col-md-6 mt-4">
            <div class="card">
              <h5 class="card-header">
                <i class="bi bi-cash-stack"></i>
                Pagamento
              </h5>
              <div class="card-body">
                <div class="div_titulos_pagamento">
                  <input
                    type="radio"
                    id="radio_cartao_credito"
                    value="CARTAO"
                    class="radio"
                    v-model="state.tipo_pagamento"
                  />
                  <label for="radio_cartao_credito">
                    <i class="bi bi-credit-card"></i>
                    Cartão de Crédito</label
                  >
                </div>
                <div
                  class="card_tipo_pagamento"
                  v-if="state.tipo_pagamento == 'CARTAO'"
                >
                  <div>
                    <label for="nome">Quantidade de Parcelas</label>
                    <select class="form-select" v-model="state.parcelas">
                      <option
                        v-for="(parcela, index) in state.parcelas"
                        :key="index"
                        :value="parcela"
                      >
                        {{ parcela.parcela }}x {{ parcela.juros }}
                        {{ parcela.valor }}
                      </option>
                    </select>
                  </div>
                  <div>
                    <label for="nome">Número do Cartão</label>
                    <input
                      type="text"
                      id="numero_cartao"
                      class="form-control"
                      v-model="state.cartao.numero.value"
                    />
                  </div>
                  <div>
                    <label for="nome">Nome no Cartão</label>
                    <input
                      type="text"
                      id="nome_cartao"
                      class="form-control"
                      v-model="state.cartao.nome.value"
                    />
                  </div>

                  <div>
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="row">
                          <div class="col-sm-12">
                            <label for="nome">Validade</label>
                            <div class="row">
                              <div class="col-sm-6" style="padding-right: 0px">
                                <select
                                  class="form-select"
                                  v-model="state.cartao.mes.value"
                                >
                                  <option selected value="">Mes</option>
                                  <option
                                    v-for="(month, index) in 12"
                                    :key="index"
                                    :value="index"
                                  >
                                    {{ month }}
                                  </option>
                                </select>
                              </div>
                              <div class="col-sm-6">
                                <input
                                  type="number"
                                  class="form-control"
                                  v-model="state.cartao.ano.value"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <label>Código de Segurança</label>
                        <input
                          type="text"
                          id="nome_cartao"
                          class="form-control"
                          v-model="state.cartao.cvv.value"
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    class="btn_comprar mt-2"
                    @click="fazerPedido('CARTAO')"
                  >
                    Finalizar Compra
                  </button>
                </div>
                <hr />
                <div class="div_titulos_pagamento">
                  <input
                    type="radio"
                    id="radio_pix"
                    class="radio"
                    value="PIX"
                    v-model="state.tipo_pagamento"
                  />
                  <label for="radio_pix">
                    <img src="/images/site/pix_icon.png" style="width: 15px" />
                    Pix</label
                  >
                </div>
                <div
                  class="card_tipo_pagamento"
                  v-if="state.tipo_pagamento == 'PIX'"
                >
                  <p>
                    Pagamento via PIX:
                    <span class="bold">{{
                      state.carrinho.valor_total_pix.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })
                    }}</span>
                  </p>
                  <p>
                    O QR Code será exibido logo após a sua confirmação de
                    compra.
                  </p>

                  <p class="bold">Importante:</p>
                  <p>
                    Após Finalizar a Compra, o PIX gerado fica disponível por 6
                    horas aguardando o seu pagamento, após isso, ele irá expirar
                    e seu pedido será cancelado.
                  </p>

                  <p>
                    O pedido é aprovado em até 1 dia útil após a realização do
                    pagamento.
                  </p>
                  <p>
                    O pagamento via PIX pode ser efetuado pelos aplicativos de
                    internet banking usando o QRCode ou a opção de "Copia e
                    Cola" disponibilizados no App!
                  </p>
                  <button
                    type="button"
                    class="btn_comprar mt-2"
                    @click="fazerPedido('PIX')"
                  >
                    Finalizar Compra
                  </button>
                </div>
                <hr />
                <div class="div_titulos_pagamento">
                  <input
                    type="radio"
                    id="radio_boleto"
                    value="BOLETO"
                    class="radio"
                    v-model="state.tipo_pagamento"
                  />
                  <label for="radio_boleto">
                    <img
                      src="/images/site/boleto_icon.png"
                      style="width: 25px"
                    />
                    Boleto Bancário</label
                  >
                </div>

                <div
                  class="card_tipo_pagamento"
                  v-if="state.tipo_pagamento == 'BOLETO'"
                >
                  <p>
                    Pagamento no boleto bancário:
                    <span class="bold">{{
                      state.carrinho.valor_total_desconto.toLocaleString(
                        "pt-br",
                        {
                          style: "currency",
                          currency: "BRL",
                        }
                      )
                    }}</span>
                  </p>
                  <p>
                    O boleto será exibido logo após a sua confirmação de compra.
                  </p>
                  <p class="bold">Importante:</p>
                  <p>
                    O pedido é aprovado em até 2 dias úteis após a realização do
                    pagamento. O pagamento do boleto pode ser efetuado pela
                    internet, utilizando o código de barras, ou diretamente em
                    bancos, lotéricas e correios, apresentando o boleto
                    impresso.
                  </p>
                  <button
                    type="button"
                    class="btn_comprar mt-2"
                    @click="fazerPedido('BOLETO')"
                  >
                    Finalizar Compra
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-4 col-md-6 mt-4">
            <div class="card">
              <h5 class="card-header">
                Resumo do Pedido <i class="bi bi-box2"></i>
              </h5>
              <div class="card-body">
                <p class="card-text">
                  <strong>Produtos:</strong>
                  <carousel :items-to-show="1">
                    <slide v-for="produto in state.produtos" :key="produto.id">
                      <div class="div_produto">
                        <img
                          id="img"
                          src="/images/site/produto-sem-imagem-fundo.webp"
                          style="
                            width: 100%;
                            height: 200px;
                            background-color: gray;
                            object-fit: contain;
                          "
                          v-if="
                            produto.imagem == null ||
                            produto.imagem == undefined ||
                            produto.imagem.length < 0
                          "
                        />
                        <img
                          :src="produto.imagem"
                          style="
                            width: 100%;
                            height: 200px;
                            object-fit: contain;
                          "
                          v-else
                        />

                        <div>
                          {{ produto.nome }}
                        </div>
                      </div>
                    </slide>
                    <template #addons>
                      <navigation />
                      <pagination />
                    </template>
                  </carousel>
                </p>

                <p class="card-text">
                  <strong>Valor Total:</strong>
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
        </div>
        <div class="row">
          <div class="col-xl-2 mt-xl-1 col-md-2 col-sm-4 mt-sm-2 mt-2">
            <div class="div_btn_endereco mt-3 mb-3">
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
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

export default {
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },

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
          integrity:
            "sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN",
          crossorigin: "anonymous",
        },
      ],
      script: [
        {
          src: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js",
          integrity:
            "sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL",
          crossorigin: "anonymous",
        },
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
      endereco: {
        cliente: {},
      },
      id_endereco: "",
      cartao: {
        numero: {
          value: null,
          messageError: false,
        },
        nome: {
          value: null,
          messageError: false,
        },
        mes: {
          value: null,
          messageError: false,
        },
        ano: {
          value: null,
          messageError: false,
        },
        cvv: {
          value: null,
          messageError: false,
        },
      },
      dados: {
        enderecos: [{ cidade: { estado: {}, estado_id: "" } }],
        cidade_id: "",
      },
      carrinho: {
        valor_total: "",
        valor_total_desconto: "",
        valor_total_pix: "",
        valor_frete: "",
        valor_produtos: "",
      },
      tipo_pagamento: "CARTAO",
      produtos: [],
      pedidoEmAndamento: false,
      loader: false,
    });

    onMounted(() => {
      getEstados();
      fetchDataCliente();
      fetchParcelas();
      state.carrinho.valor_frete = 0;
      state.carrinho.valor_total_desconto =
        valores_produtos.value.total_desconto;
      state.carrinho.valor_total_pix = valores_produtos.value.total_pix;
      state.carrinho.valor_produtos = valores_produtos.value.total;
      state.carrinho.valor_total =
        valores_produtos.value.total + state.carrinho.valor_frete;
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
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchParcelas() {
      try {
        const { data } = await services.parcelas.getAllSite({
          client_token: client_token.value,
        });
        var array_parcelas = [];
        for (let i = 1; i <= 12; i++) {
          if (i <= 1) {
            var pr = {};
            var valor = state.carrinho.valor_total / i;

            pr.valor = valor.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            });
            pr.parcela = i;
            pr.juros = "sem juros";
            array_parcelas.push(pr);
            continue;
          }
          for (let i2 = 0; i2 < data.length; i2++) {
            if (i == data[i2].parcelas) {
              var pr = {};
              var valor_acrecimo =
                state.carrinho.valor_total * (data[i2].taxas / 100);
              var valor = state.carrinho.valor_total + valor_acrecimo;

              pr.valor = valor.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              });
              pr.juros = "com juros";
              pr.parcela = i;
              array_parcelas.push(pr);
            }
          }
        }
        state.parcelas = array_parcelas;
        console.log(array_parcelas);
      } catch (error) {
        console.log(error);
      }
    }

    async function fazerPedido() {
      try {
        state.loader = true;
        state.pedidoEmAndamento = true;

        var dados = {
          endereco_id: state.id_endereco,
          cliente_id: client_id.value,
          produtos: state.produtos,
          tipo_pagamento: state.tipo_pagamento,
          ...state.carrinho,
        };
        await services.clientes
          .fazerPedido({
            client_token: client_token.value,
            dados,
          })
          .then(() => {
            adicionarPedido(dataPedido.data);
            limparCarrinho();
            router.push("/pedido-realizado");
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
      state,
      Carousel,
      Slide,
      Pagination,
      Navigation,
    };
  },
};
</script>
<style scoped>
.card_endereco {
  margin-top: 1rem;
}

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
  background: #263c28;
  border-bottom: solid 5px #00a000;
}

.card {
  background: #fff;
  box-shadow: 4px 4px 5px 1px rgba(0, 0, 0, 0.26);
}

.card .card-header {
  color: #fff;
  background: #263c28;
  border-bottom: solid 2px #00a000;
  padding: 1rem;
}

.card-text {
  color: #000;
  margin-bottom: 5px;
}

.btn_transparent {
  font-family: "Poppins", sans-serif;
  border-radius: 4px;

  border: 1px solid #263c28;
  background: transparent;
  color: #263c28;
  width: 240px;
  padding: 5px;
  transition: 0.5s;
}

.div_titulos_pagamento {
  padding: 10px 0px;
}

.card_tipo_pagamento {
  padding: 10px;
  border: #dee2e6 solid 1px;
  border-radius: 10px;
  font-size: 10pt;
}

.radio {
  margin-right: 10px;
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

.input:focus ~ .input-border {
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

.card_tipo_pagamento p {
  margin-bottom: 0.2rem;
}

.card_tipo_pagamento select,
.card_tipo_pagamento input {
  font-size: 10pt;
}

.bold {
  font-weight: bold;
}

#sct_pedido {
  margin-top: 2rem;
  margin-bottom: 0;
}

.line_top {
  background: #263c28;
  border-bottom: solid 5px #00a000;
}

.btn_transparent:hover {
  background: #263c28;
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

.btn_comprar {
  font-family: "Poppins", sans-serif;
  border-radius: 4px;
  border: 1px solid #263c28;
  background-color: #263c28;
  color: #fff;
  width: 100%;
  padding: 8px;
  transition: 0.5s;
  font-weight: 500;
}

/* Hover on Input */
.input:hover {
  background: var(--input-hovered-color);
}

.input:focus {
  outline: none;
}

.input:focus ~ .input-border {
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
  font-family: "Poppins", sans-serif;
  border-radius: 4px;
  border: 1px solid #263c28;
  background: transparent;
  color: #263c28;
  width: 200px;
  padding: 4px;
  transition: 0.5s;
}

.btn_gold:hover {
  color: #fff;
  background: #263c28;
}

.btn_comprar {
  font-family: "Poppins", sans-serif;
  border-radius: 4px;
  border: 1px solid #263c28;
  background-color: #263c28;
  color: #fff;
  width: 100%;
  padding: 8px;
  transition: 0.5s;
  font-weight: 500;
}
</style>