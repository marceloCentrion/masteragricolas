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
                  <strong>E-mail:</strong>
                  {{ state.dados.email }}
                </p>
              </div>
            </div>
            <div class="card card_endereco">
              <h5 class="card-header">
                <i class="bi bi-truck"></i> Endereço de Entrega
              </h5>
              <div class="card-body" v-if="state.enderecos.length > 0">
                <div class="mb-2" v-for="endereco in state.enderecos" :key="endereco.id">
                  <div class="form-check">
                    <input class="form-check-input" type="radio" :id="'endereco_' + endereco.id" :value="endereco.id"
                      v-model="state.endereco_id" name="endereco" @change="setEnderecoSelecionado(endereco)" />
                    <label class="form-check-label" :for="'endereco_' + endereco.id">
                      <p class="endereco_principal">
                        <strong>
                          {{ endereco.nome }}
                        </strong>
                      </p>

                      {{ endereco.logradouro }}, {{ endereco.numero }},
                      {{ endereco.complemento }}, {{ endereco.bairro }}
                      <br />
                      {{ endereco.cidade.nome }} |
                      {{ endereco.cidade.estado.nome }} | {{ endereco.cep }}
                    </label>
                  </div>
                </div>
              </div>
              <div class="card-body" v-else>
                <p>Nenhum endereço principal encontrado.</p>
              </div>
              <div class="card-body">
                <button type="button" class="btn-end" @click="openModal()">
                  <i class="bi bi-house-add"></i> Adicionar Endereço
                </button>
              </div>
            </div>
            <div class="card card_endereco">
              <h5 class="card-header"><i class="bi bi-truck"></i> Frete</h5>
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <div>
                    Frete: {{ state.obj_frete.nome }} - entrega em
                    {{ state.obj_frete.dias_entrega }} dias
                  </div>

                  <div>
                    {{
                      parseFloat(state.obj_frete.preco).toLocaleString(
                        "pt-br",
                        {
                          style: "currency",
                          currency: "BRL",
                        }
                      )
                    }}
                  </div>
                </div>
                <p>
                  <a style="
                      font-size: 11px;
                      font-weight: bold;
                      text-decoration: underline;
                    " data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false"
                    aria-controls="collapseExample">
                    Ver outras opções de frete
                  </a>
                </p>
                <div class="collapse" id="collapseExample">
                  <div class="" v-for="(tipo_frete, i) in state.frete.fretes" :key="tipo_frete.id">
                    <div v-if="!state.frete.fretes[i].error">
                      <input type="radio" class="radio_frete" :id="'radio_frete_' + i"
                        v-model="state.tipo_frete_selecionado" :value="tipo_frete.id" @change="alterarFrete(tipo_frete)"
                        style="margin-right: 5px" />
                      <label :for="'radio_frete_' + i">
                        {{
                          parseFloat(tipo_frete.preco).toLocaleString("pt-br", {
                            style: "currency",
                            currency: "BRL",
                          })
                        }}
                        <span>{{ tipo_frete.nome }}</span></label>
                    </div>
                  </div>
                </div>
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
                  <input type="radio" id="radio_cartao_credito" value="CARTAO" class="radio"
                    v-model="state.tipo_pagamento" />
                  <label for="radio_cartao_credito">
                    <i class="bi bi-credit-card"></i>
                    Cartão de Crédito</label>
                </div>
                <div class="card_tipo_pagamento" v-if="state.tipo_pagamento == 'CARTAO'">
                  <div>
                    <label for="nome">Quantidade de Parcelas</label>
                    <select class="form-select" v-model="state.parcela">
                      <option v-for="(parcela, index) in state.parcelas" :key="index" :value="parcela.parcela">
                        {{ parcela.parcela }}x {{ parcela.juros }}
                        {{ parcela.valor }}
                      </option>
                    </select>
                  </div>
                  <div>
                    <label for="nome">Número do Cartão</label>
                    <input type="text" id="numero_cartao" class="form-control" placeholder="0000 0000 0000 0000"
                      v-model="state.cartao.numero.value" v-maska data-maska="#### #### #### ####" />
                  </div>
                  <div>
                    <label for="nome">Nome no Cartão</label>
                    <input type="text" id="nome_cartao" class="form-control" v-model="state.cartao.nome.value" />
                  </div>
                  <div>
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="row">
                          <div class="col-sm-12">
                            <label for="nome">Validade</label>
                            <div class="row">
                              <div class="col-sm-6" style="padding-right: 0px">
                                <select class="form-select" v-model="state.cartao.mes.value">
                                  <option selected>Mês</option>
                                  <option v-for="(month, index) in 12" :key="index" :value="index">
                                    {{ month }}
                                  </option>
                                </select>
                              </div>
                              <div class="col-sm-6">
                                <select class="form-select" v-model="state.cartao.ano.value">
                                  <option value="">Ano</option>
                                  <option v-for="(ano, index) in state.anos" :key="index" :value="ano.ano">
                                    {{ ano.anoResumido }}
                                  </option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <label>Código de Segurança</label>
                        <input type="text" id="nome_cartao" class="form-control" v-model="state.cartao.cvv.value"
                          v-maska data-maska="###" placeholder="cvv" />
                      </div>
                    </div>
                  </div>
                  <button type="button" class="btn_comprar mt-2" @click="fazerPedido('CARTAO')">
                    Finalizar Compra
                  </button>
                </div>
                <hr />
                <div class="div_titulos_pagamento">
                  <input type="radio" id="radio_pix" class="radio" value="PIX" v-model="state.tipo_pagamento" />
                  <label for="radio_pix">
                    <img src="/images/site/pix_icon.png" style="width: 15px" />
                    Pix</label>
                </div>
                <div class="card_tipo_pagamento" v-if="state.tipo_pagamento == 'PIX'">
                  <p>
                    Pagamento via PIX:
                    <span class="bold">{{
                      state.carrinho.valor_total.toLocaleString("pt-br", {
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
                  <button type="button" class="btn_comprar mt-2" @click="fazerPedido('PIX')">
                    Finalizar Compra
                  </button>
                </div>
                <hr />
                <div class="div_titulos_pagamento">
                  <input type="radio" id="radio_boleto" value="BOLETO" class="radio" v-model="state.tipo_pagamento" />
                  <label for="radio_boleto">
                    <img src="/images/site/boleto_icon.png" style="width: 25px" />
                    Boleto Bancário</label>
                </div>

                <div class="card_tipo_pagamento" v-if="state.tipo_pagamento == 'BOLETO'">
                  <p>
                    Pagamento no boleto bancário:
                    <span class="bold">{{
                      state.carrinho.valor_total.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })
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
                  <button type="button" class="btn_comprar mt-2" @click="fazerPedido('BOLETO')">
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
                        <img :src="produto.imagem" style="
                            width: 100%;
                            height: 200px;
                            object-fit: contain;
                          " />
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
                <!--
                <p class="card-text">
                  <strong>Total Produtos:</strong>
                  {{ state.carrinho.valor_produtos }}
                </p>-->
                <p class="card-text">
                  <strong>Frete:</strong>
                  {{
                    parseFloat(
                      state.frete_selecionado.valor_frete
                    ).toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })
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
        <div class="modal_endereco" tabindex="-1" v-if="state.isModalVisible">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title" v-if="state.selectedEndereco.id">
                  Alterar Endereço <i class="bi bi-house-door"></i>
                </h4>
                <h4 class="modal-title" v-else>
                  Adicionar Endereço <i class="bi bi-house-door"></i>
                </h4>
              </div>
              <div class="modal-body">
                <form @submit.prevent="upEndereco">
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="mb-3">
                        <label for="nome" class="form-label">Quem irá Receber</label>
                        <input type="text" class="form-control" v-model="state.selectedEndereco.nome" id="nome" />
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="mb-3">
                        <label for="tel" class="form-label">Telefone</label>
                        <input type="text" class="form-control" v-model="state.selectedEndereco.telefone" id="tel"
                          v-maska data-maska="[ '(##) ####-####','(##) # ####-####' ]" />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-4">
                      <div class="mb-3">
                        <label for="cep" class="form-label">Cep</label>
                        <input type="text" class="form-control" v-model="state.selectedEndereco.cep" id="cep" v-maska
                          data-maska="#####-###" @blur="cepAtributes" />
                      </div>
                    </div>
                    <div class="col-sm-4">
                      <div class="mb-3">
                        <label for="estado" class="form-label">Estado</label>
                        <select class="form-select" @change="getCidade($event.target.value)"
                          v-model="state.selectedEndereco.cidade.estado_id">
                          <option v-for="estado in state.estados" :key="estado.id" :value="estado.id">
                            {{ estado.nome }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-4">
                      <div class="mb-3">
                        <label for="cidade" class="form-label">Cidade</label>
                        <select v-model="state.selectedEndereco.cidade_id" class="form-select">
                          <option v-for="cidade in state.cidades" :key="cidade.id" :value="cidade.id">
                            {{ cidade.nome }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-sm-9">
                      <div class="mb-3">
                        <label for="logradouro" class="form-label">Logradouro</label>
                        <input type="text" class="form-control" v-model="state.selectedEndereco.logradouro"
                          id="logradouro" />
                      </div>
                    </div>
                    <div class="col-sm-3">
                      <div class="mb-3">
                        <label for="numero" class="form-label">Número</label>
                        <input type="text" class="form-control" v-model="state.selectedEndereco.numero" id="numero" />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="mb-3">
                        <label for="bairro" class="form-label">Bairro</label>
                        <input type="text" class="form-control" v-model="state.selectedEndereco.bairro" id="bairro" />
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="mb-3">
                        <label for="complemento" class="form-label">Complemento</label>
                        <input type="text" class="form-control" v-model="state.selectedEndereco.complemento"
                          id="complemento" />
                      </div>
                    </div>
                  </div>
                  <div class="mb-3">
                    <div>
                      <input type="checkbox" id="check_principal" v-model="state.selectedEndereco.principal" />
                      <label for="check_principal" class="lbl_end_principal">Endereço Principal</label>
                    </div>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn_transparent mr-1 w-auto" @click="closeModal">
                  Cancelar
                </button>
                <button type="submit" class="btn-gold" @click="upEndereco">
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <loader :loader="state.loader" />
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
      title: "Comparts - Finalizar Pedido",
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
    const { itens, valores_produtos, frete_selecionado, fretes, obj_frete } = storeToRefs(carrinhoStore);
    const { limparCarrinho, adicionarPedido, adicionaFrete, limparFrete } = carrinhoStore;
    const clienteAuthStore = useClienteAuthStore();
    const { client_token, client_id } = storeToRefs(clienteAuthStore);

    if (!client_id.value || !client_token.value || itens.value.length == 0) {
      router.push({ name: "index" });
    }
    const state = reactive({
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
      frete_selecionado: {
        valor_frete: 0,
      },
      dados: {
        enderecos: [{ cidade: { estado: {}, estado_id: "" } }],
        cidade_id: "",
      },
      carrinho: {
        valor_total: "",
        valor_frete: "",
        valor_produtos: "",
      },
      tipo_pagamento: "CARTAO",
      produtos: [],
      pedidoEmAndamento: false,
      loader: false,
      endereco: { cliente: {} },
      endereco_id: null,
      enderecos: [],
      fretes: [],
      frete: {
        fretes: [],
      },
      obj_frete: {},
      selectedEndereco: {
        nome: "",
        telefone: "",
        cep: "",
        logradouro: "",
        numero: "",
        bairro: "",
        complemento: "",
        principal: false,
        cidade: {
          estado_id: null,
        },
        cidade_id: null,
      },
    });

    onMounted(() => {
      const anos = [];

      for (let ano = 2024; ano <= 2040; ano++) {
        anos.push({
          ano: ano,
          anoResumido: ano.toString().slice(-2),
        });
      }
      state.anos = anos;
      state.frete_selecionado = frete_selecionado.value;
      const script = document.createElement("script");
      script.src =
        "https://assets.pagseguro.com.br/checkout-sdk-js/rc/dist/browser/pagseguro.min.js";
      script.async = true;
      document.body.appendChild(script);
      state.carrinho.valor_frete = 0;
      state.carrinho.valor_total_desconto =
        valores_produtos.value.total_desconto;
      state.carrinho.valor_produtos = valores_produtos.value.total;
      state.carrinho.valor_total =
        valores_produtos.value.total + state.carrinho.valor_frete;
      state.produtos = itens;
      getEstados();
      fetchDataCliente();
      fetchParcelas();
      const principal = state.enderecos.find(
        (endereco) => endereco.principal === "SIM"
      );

      //OBJ FRETE CHAMANDO AQUI LOGO ABAIXO
      state.obj_frete = obj_frete;

      state.tipo_frete_selecionado = obj_frete.value.id;

      if (principal) {
        state.endereco_id = principal.id;
      }
      const isEmpty = (obj) => {
        return Object.keys(obj).length === 0;
      };
      if (!isEmpty(fretes.value)) {
        state.frete = fretes.value;
        state.cep = state.frete.cep;
      }
    });

    async function fetchDataCliente() {
      try {
        const { data } = await services.clientes.getDataCliente({
          client_token: client_token.value,
          client_id: client_id.value,
        });
        state.dados = data;
        state.enderecos = data.enderecos;
        const principal = state.enderecos.find(
          (endereco) => endereco.principal === "SIM"
        );
        if (principal) {
          state.endereco_id = principal.id;
          calcularFrete(principal.cep);
        } else if (state.enderecos.length > 0) {
          state.endereco_id = state.enderecos[0].id;
          calcularFrete(state.enderecos[0].cep);
        }
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

    async function setEnderecoSelecionado(endereco) {
      console.log(endereco.cep);
      calcularFrete(endereco.cep);
    }

    async function alterarFrete(frete) {
      limparFrete();
      //fretes declarado aqui embaixo
      adicionaFrete(state.fretes, frete);
      state.frete_selecionado = frete;
      state.frete_selecionado.valor_frete = frete.preco;
      state.frete.preco = frete.preco;
      state.frete.prazo_frete = frete.dias_entrega;
      state.tipo_frete_selecionado = frete.id;
      state.prazo_frete = frete.dias_entrega;
      state.frete.prazo_frete = frete.dias_entrega;
      state.prazo_frete = frete.dias_entrega;
      state.carrinho.valor_total = valores_produtos.value.total;

      //  state.frete_selecionado.valor_frete = data.fretes[1].preco;
    }

    async function calcularFrete(cep) {
      var produtos_req = [];
      console.log(state.produtos);
      state.produtos.forEach((item) => {
        var produto = {};
        produto.id = item.id;
        produto.qtd = item.quantidade;
        produtos_req.push(produto);
      });
      limparFrete();

      var cep_sem_traco = cep.replace("-", "");
      try {
        state.loader = true;

        const { data } = await services.pedido.calcularFrete({
          produtos_req,
          cep_destinatario: cep_sem_traco,
        });

        //fretes declarado aqui embaixo
        state.frete = {};
        if (data.fretes[0].error) {
          adicionaFrete(data, data.fretes[1]);
          state.obj_frete_selecionado = data.fretes[1];
          state.frete.preco = data.fretes[1].preco;
          state.frete.prazo_frete = data.fretes[1].dias_entrega;
          state.tipo_frete_selecionado = data.fretes[1].id;
          state.prazo_frete = data.fretes[1].dias_entrega;
          data.fretes = [data.fretes[1]];
          state.frete_selecionado.valor_frete = data.fretes[1].preco;
          // state.carrinho.valor_total =
          //   valores_produtos.value.total// + parseFloat(data.fretes[1].preco);
        } else {

          //fretes declarado aqui embaixo
          state.fretes = data.fretes;
          adicionaFrete(data, data.fretes[0]);
          state.obj_frete_selecionado = data.fretes[0];
          state.frete.preco = data.fretes[0].preco;
          state.frete.prazo_frete = data.fretes[0].dias_entrega;
          state.tipo_frete_selecionado = data.fretes[0].id;
          state.prazo_frete = data.fretes[0].dias_entrega;
          state.frete_selecionado.valor_frete = data.fretes[0].preco;
          //    state.carrinho.valor_total =
          //      valores_produtos.value.total;// + parseFloat(data.fretes[0].preco);
        }
        console.log(data.fretes);
        //  state.tipo_frete_selecionado = data.fretes[0].nome;
        state.loader = false;

        //fretes declarado aqui embaixo
        state.frete = data;
        state.frete.fretes = state.fretes;
        state.carrinho.valor_total = valores_produtos.value.total;
      } catch (error) {
        console.log(error);
      } finally {
        state.loader = false;
      }
    }

    async function fazerPedido(tipo_pagamento) {
      try {
        state.loader = true;
        state.pedidoEmAndamento = true;
        for (let i = 0; i < state.produtos.length; i++) {
          const prod = state.produtos[i];
          state.produtos[i].preco = formatarMoeda(prod.preco);
          state.produtos[i].subtotal = formatarMoeda(prod.subtotal);
          state.produtos[i].valor = formatarMoeda(prod.valor);
        }

        var dados = {
          endereco_id: state.endereco_id,
          cliente_id: client_id.value,
          produtos: state.produtos,
          tipo_pagamento: state.tipo_pagamento,
          ...state.carrinho,
        };

        if (tipo_pagamento === "CARTAO") {
          const numberFormat = state.cartao.numero.value.replace(/\s+/g, "");
          const card = PagSeguro.encryptCard({
            publicKey:
              "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxemPaSDzCYiW159GGdaq/vg3Vc3ffBlvOznkEFfNkGMw991TzA9Cjj+X1EYABBp1BcOeG9DZZRVXOhDsK8jS48HxlQdhg4i43bbGY+MeLNM0RHCuu0sYuWjrn67h5JVAG0A/27yaAm80h0U6PW6tHZPwmZy2rAPOq9zKpn2o36jrAc0GbjMsOncLRU6vOaX1o5V6bFZsC8JP76LMmefZt8RJHTyPAJDBsNNPkrIz0BjCVhgc8ElNT2HTNa5mhE1NW6+md3/cLnJ5R/N3RdmPwBVsJQygCs75nflQUztAL5bGuth4cLhA/iSEL/4mow6Y+Bly0/VHCUwpNfVrRi2SAQIDAQAB",

            holder: state.cartao.nome.value,
            number: numberFormat,
            expMonth: state.cartao.mes.value,
            expYear: state.cartao.ano.value,
            securityCode: state.cartao.cvv.value,
          });
          //  (dados.parcela = state.parcela),
          //    (dados.encrypted = card.encryptedCard);
          console.log(card.encryptedCard);
          dados.encrypted = card.encryptedCard;
          const hasErrors = card.hasErrors;
          const errors = card.errors;

          dados.parcela = state.parcela;

          console.log("Cartão Token: " + dados.encrypted);
          console.log("hasErrors:" + hasErrors);
          console.log("errors:" + errors);
          console.log(errors);
        }
        var dataPedido = await services.clientes.fazerPedido({
          client_token: client_token.value,
          dados,
        });
        adicionarPedido(dataPedido.data);
        limparCarrinho();
        router.push("/pedido-realizado");
      } catch (error) {
        alert("Erro ao realizar o pedido, tente novamente");
      } finally {
        state.loader = false;
        state.pedidoEmAndamento = false;
      }
    }

    async function upEndereco() {
      try {
        state.loader = true;
        const enderecoData = {
          ...state.selectedEndereco,
          principal: state.selectedEndereco.principal ? "SIM" : "NAO",
        };
        if (enderecoData.cidade) {
          delete enderecoData.cidade;
        }
        if (state.selectedEndereco.id) {
          state.loader = true;
          await services.clientes.upEndereco({
            id_endereco: state.selectedEndereco.id,
            endereco: enderecoData,
            client_token: client_token.value,
          });
          state.loader = false;
        } else {
          state.loader = true;
          enderecoData.cliente_id = client_id.value;
          await services.clientes.createEndereco({
            endereco: enderecoData,
            client_token: client_token.value,
            client_id: client_id.value,
          });
          state.loader = false;
        }
        calcularFrete(endereco.cep);
        state.isModalVisible = false;
        fetchDataCliente();
      } catch (error) {
        console.log(error);
      } finally {
        state.loader = false;
      }
    }

    function openModal(endereco = null) {
      state.isModalVisible = true;
      if (endereco) {
        state.selectedEndereco = {
          ...endereco,
          principal: endereco.principal === "SIM", // Converte para booleano
          cidade: endereco.cidade || { estado_id: null },
          cidade_id: endereco.cidade ? endereco.cidade.id : null,
        };
      } else {
        state.selectedEndereco = {
          telefone: "",
          cep: "",
          logradouro: "",
          numero: "",
          bairro: "",
          complemento: "",
          principal: false,
          cidade: {
            estado_id: null,
          },
          cidade_id: null,
        };
      }
    }

    function closeModal() {
      state.isModalVisible = false;
    }

    function formatarMoeda(valor) {
      return valor.toLocaleString("pt-BR", {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }

    async function cepAtributes() {
      try {
        const cep = state.selectedEndereco.cep
          .replace("-", "")
          .replace(".", "");
        state.selectedEndereco.cep = cep;
        const res = await services.cep.apiCep(cep);
        state.selectedEndereco.logradouro = res.data.logradouro;
        state.selectedEndereco.bairro = res.data.bairro;
        state.selectedEndereco.codigo_ibge = res.data.ibge;
        state.selectedEndereco.ibge = res.data.ibge;
        getCityByCode(state.selectedEndereco.ibge);
      } catch (error) {
        console.log(error);
      }
    }

    async function getCityByCode(cod_ibge) {
      try {
        const { data } = await services.endereco.getCityByCode(cod_ibge);
        state.selectedEndereco.cidade.estado_id = data.estado_id;
        state.selectedEndereco.cidade_id = data.id;
        getCidade(state.selectedEndereco.cidade.estado_id);
      } catch (error) {
        console.log("aqui:" + error);
      }
    }

    async function getEstados() {
      try {
        const { data } = await services.endereco.getEstados();
        state.estados = data;
      } catch (error) {
        console.log("Erro ao buscar estados:", error);
      }
    }

    async function getCidade(estado_id) {
      try {
        const { data } = await services.endereco.getCidade(estado_id);
        state.cidades = data;
      } catch (error) {
        console.log("Erro ao buscar cidades:", error);
      }
    }

    return {
      getCidade,
      getEstados,
      fazerPedido,
      upEndereco,
      cepAtributes,
      closeModal,
      openModal,
      state,
      Carousel,
      Slide,
      Pagination,
      Navigation,
      setEnderecoSelecionado,
      alterarFrete,
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

.modal_endereco {
  display: flex;
  /* Usa flexbox para centralização */
  align-items: center;
  /* Centraliza verticalmente */
  justify-content: center;
  /* Centraliza horizontalmente */
  position: fixed;
  /* Fixa a posição em relação à viewport */
  top: 0;
  /* Começa do topo */
  left: 0;
  /* Começa da esquerda */
  width: 100%;
  /* Ocupa toda a largura da viewport */
  height: 100%;
  /* Ocupa toda a altura da viewport */
  background: rgba(0, 0, 0, 0.5);
  /* Fundo semitransparente para o efeito de overlay */
  z-index: 1050;
  /* Coloca o modal acima de outros elementos */
}

.modal-dialog {
  position: relative;
  /* Posição relativa para conter o conteúdo do modal */
  width: 100%;
  /* Ajusta a largura automaticamente */
  margin: 10px;
  /* Margem para espaçamento */
  pointer-events: none;
  /* Desabilita interação com o conteúdo fora do modal */
  max-width: 700px;
  /* Limita a largura máxima do modal */
}

.modal-content {
  position: relative;
  /* Posição relativa para conter os elementos */
  display: flex;
  /* Flexbox para a disposição dos elementos */
  flex-direction: column;
  /* Disposição vertical */
  width: 100%;
  /* Ocupa toda a largura disponível */
  pointer-events: auto;
  /* Habilita interação com o conteúdo do modal */
  background-color: #fff;
  /* Cor de fundo branca */
  background-clip: padding-box;
  /* Ajusta o recorte de fundo */
  border: 1px solid rgba(0, 0, 0, 0.2);
  /* Borda leve */
  border-radius: 0.3rem;
  /* Borda arredondada */
  outline: 0;
  /* Remove o contorno */
}

.modal-header {
  display: flex;
  /* Flexbox para a disposição dos elementos */
  align-items: center;
  /* Alinhamento vertical centralizado */
  justify-content: space-between;
  /* Espaço entre os elementos */
  padding: 1rem;
  /* Espaçamento interno */
  border-bottom: 1px solid #dee2e6;
  /* Linha divisória inferior */
  border-top-left-radius: 0.3rem;
  /* Bordas arredondadas nos cantos superiores */
  border-top-right-radius: 0.3rem;
}

.modal-title {
  margin-bottom: 0;
  /* Remove a margem inferior */
  line-height: 1.5;
  /* Ajusta a altura da linha */
}

.btn-close {
  padding: 0.5rem;
  /* Espaçamento interno */
  margin: -0.5rem -0.5rem -0.5rem auto;
  /* Margens negativas para ajuste */
}

.modal-body {
  position: relative;
  /* Posição relativa para conter os elementos */
  flex: 1 1 auto;
  /* Flexbox para ajuste automático */
  padding: 1rem;
  /* Espaçamento interno */
}

.btn-end {
  font-family: "Poppins", sans-serif;
  background: transparent;
  color: #000;
  width: auto;
  transition: 0.5s;
  font-size: 10pt;
}

.btn-end:hover {
  background: transparent;
  color: #000000;
  text-decoration: underline;
}

.btn-gold {
  font-family: "Poppins", sans-serif;
  border-radius: 4px;
  border: 1px solid gray;
  background: transparent;
  color: gray;
  width: auto;
  padding: 5px 10px;
  transition: 0.5s;
}

.btn-gold:hover {
  background: gray;
  color: #000;
}

.endereco_principal {
  color: #000000;
  margin-bottom: 0;
  font-weight: 600;
}

.modal-footer {
  display: flex;
  /* Flexbox para a disposição dos elementos */
  align-items: center;
  /* Alinhamento vertical centralizado */
  justify-content: flex-end;
  /* Alinhamento dos botões à direita */
  padding: 0.75rem;
  /* Espaçamento interno */
  border-top: 1px solid #dee2e6;
  /* Linha divisória superior */
  border-bottom-right-radius: 0.3rem;
  /* Bordas arredondadas nos cantos inferiores */
  border-bottom-left-radius: 0.3rem;
}
</style>