<template>
  <section id="carrinho">
    <top :tela="'ecommerce'" />
    <div class="container">
      <div class="pl-5 pr-5 mt-12">
        <div class="row">
          <div class="col-lg-8">
            <div class="title mt-4 mb-sm-4">
              <h2 style="font-weight: bold">Carrinho de Compras</h2>
              <div class="line"></div>
            </div>
            <div class="row">
              <div class="col-md-5 title_desc d-none d-md-block">
                <p style="text-align: left; font-weight: bold">Item</p>
              </div>
              <div class="col-md-2 title_desc d-none d-md-block">
                <p style="font-weight: bold">Preço</p>
              </div>
              <div class="col-md-2 title_desc d-none d-md-block">
                <p style="font-weight: bold">Qtd</p>
              </div>
              <div class="col-md-1 title_desc d-none d-md-block"></div>
            </div>
            <div v-if="state.carrinho.length > 0">
              <div v-for="produto in state.carrinho" :key="produto.produtos_id">
                <div class="row">
                  <div class="col-sm-12 mb-sm-4 col-md-5 d-flex">
                    <div class="img">
                      <img :src="produto.imagem" id="img_produto" v-if="produto.imagem" />
                      <img v-else id="img_produto" :src="'/images/site/produto_sem_foto.png'" />
                      <p class="mt-3 w-75 ml-3">{{ produto.nome }}</p>
                    </div>
                  </div>
                  <div class="col-8 col-sm-8 col-md-2 d-flex">
                    <div class="col-md-2 title_desc d-block d-md-none d-lg-none d-xl-none">
                      <p style="font-weight: bold">Preço:</p>
                    </div>
                    <div class="element_produto mt-md-3">
                      <p style="font-weight: bold">
                        {{
                          produto.preco.toLocaleString("pt-br", {
                            style: "currency",
                            currency: "BRL",
                          })
                        }}
                      </p>
                    </div>
                  </div>
                  <div class="col-4 col-sm-4 col-md-2 mt-md-3">
                    <div class="div_qtd">
                      <input class="qtd_text" type="text" @change="
                        checkNumberInput(
                          produto.produtos_id,
                          $event.target.value
                        )
                        " :value="produto.quantidade" />
                      <div class="btns_qtd">
                        <button type="button" @click="adicionarQtd(produto.produtos_id)" class="btn_qtd">
                          <i class="bi bi-chevron-up" style="font-size: 14px"></i>
                        </button>
                        <button type="button" @click="removerQtd(produto.produtos_id)" class="btn_qtd"
                          :disabled="produto.quantidade === 1">
                          <i class="bi bi-chevron-down" style="font-size: 14px"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-2"></div>
                  <div class="d-flex col-md-1 icon_remove_div mt-2">
                    <button id="btn_remove" @click="removeItem(produto.produtos_id)">
                      <i id="trashicon" class="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="btns">
              <a href="/produtos">
                <button title="Continuar Comprando" class="btn_transparent">
                  Continuar Comprando
                </button></a>
              <button title="Limpar Carrinho" @click="limparCarrinho" class="btn_gold" v-if="state.carrinho.length > 0">
                Limpar Carrinho
              </button>
            </div>
          </div>
          <div class="col-lg-4 mb-4 mb-sm-4 mb-md-4 mt-5">
            <div class="quad">
              <h2 style="font-weight: bold">Resumo</h2>
              <h4>Estimativa Frete</h4>
              <p>Coloque cep seu para uma estimativa de frete</p>
              <div v-if="!state.frete">
                <label>CEP</label>
                <div>
                  <input class="input_frete" type="text" id="cep" v-model="state.cep" />
                  <button type="button" @click="calcularFrete" style="
                      width: 20%;
                      border: #fff solid 1px;
                      padding: 7px;
                      border-radius: 5px;
                    ">
                    OK
                  </button>
                </div>
              </div>
              <hr />

              <div style="display: flex; justify-content: space-between" v-if="state.frete">
                <div>
                  <p style="font-weight: bold; margin-bottom: 0">FRETE</p>
                </div>
                <div v-if="state.frete.fretes != undefined">
                  <div style="font-weight: bold" v-if="state.frete.fretes[0].error">
                    {{
                      parseFloat(state.frete.fretes[1].preco).toLocaleString(
                        "pt-br",
                        {
                          style: "currency",
                          currency: "BRL",
                        }
                      )
                    }}
                  </div>
                </div>
                <div style="font-weight: bold" v-else>
                  <div v-if="state.frete.fretes != undefined">
                    {{
                      parseFloat(state.frete.fretes[0].preco).toLocaleString(
                        "pt-br",
                        {
                          style: "currency",
                          currency: "BRL",
                        }
                      )
                    }}
                  </div>
                </div>
              </div>
              <div style="display: flex; justify-content: space-between" v-if="state.frete">
                <div>
                  <p>
                    Entrega em
                    <span style="font-weight: bold">{{ state.frete.localidade }} - {{ state.frete.uf }}</span>
                  </p>
                </div>

                <div>
                  <button style="
                      color: #fff;
                      background: transparent;
                      border: #fff solid 1px;
                      border-radius: 5px;
                      padding: 2px 10px;
                    " @click="btnAlterarFrete">
                    Alterar
                  </button>
                </div>
              </div>
              <div v-if="state.frete" class="class_prazo">
                <div>
                  <p v-if="state.frete.fretes != undefined">
                    Prazo de
                    <span style="font-weight: bold" v-if="state.frete.fretes[0].preco">
                      {{ state.frete.fretes[0].dias_entrega }} dias</span>
                    <span style="font-weight: bold" v-else>
                      {{ state.frete.fretes[1].dias_entrega }} dias</span>
                  </p>
                </div>
              </div>
              <div v-if="state.frete">
                <!-- <button type="button" style="
                  font-size: 11px;
                  font-weight: bold;
                  text-decoration: underline;
                ">
                Ver outras opções de frete
              </button> -->
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
                  <div class="card-transparent card-body" v-for="(tipo_frete, i) in state.frete.fretes"
                    :key="tipo_frete.id">
                    <div v-if="!state.frete.fretes[i].error">
                      <input type="radio" class="radio_frete" :id="'radio_frete_' + i"
                        v-model="state.tipo_frete_selecionado" :value="tipo_frete.id"
                        @change="alterarFrete(tipo_frete)" />
                      <label :for="'radio_frete_' + i">
                        {{
                          parseFloat(tipo_frete.preco).toLocaleString("pt-br", {
                            style: "currency",
                            currency: "BRL",
                          })
                        }}
                        (<span v-if="tipo_frete.nome == '.Package'">JadLog</span>
                        <span v-else>{{ tipo_frete.nome }}</span>)</label>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-6">
                  <div>
                    <p style="font-weight: bold">Frete</p>
                  </div>
                  <div>
                    <p style="font-weight: bold">Total</p>
                  </div>
                </div>
                <div style="text-align: right" class="col-6">
                  <div v-if="state.carrinho.length > 0">
                    <div v-if="state.frete != undefined && state.frete != null">
                      <p style="font-weight: bold" v-if="state.frete.fretes">
                        {{
                          parseFloat(
                            state.frete.fretes[0].preco
                          ).toLocaleString("pt-br", {
                            style: "currency",
                            currency: "BRL",
                          })
                        }}
                      </p>
                    </div>
                    <div v-else>Calcule o frete</div>
                    <p style="font-weight: bold">
                      {{
                        state.valor_total.toLocaleString("pt-br", {
                          style: "currency",
                          currency: "BRL",
                        })
                      }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="div_btn_quad">
                <button type="button" @click="fazerPedido()" class="btn_pedido" v-if="state.carrinho.length > 0"
                  :disabled="state.loading">
                  <div class="d-flex align-items-center" v-if="state.loading">
                    <strong role="status">Carregando Pedido...</strong>
                    <div class="spinner-border ms-auto" aria-hidden="true"></div>
                  </div>
                  <span v-if="!state.loading">Comprar</span>
                </button>
                <a href="/produtos" v-else>
                  <button type="button" class="btn_pedido">
                    Adicione algum produto
                  </button> </a><!--
                <a href="/ver-endereco">
                  <button type="button" class="btn_endereco" v-if="client_id">
                    Checar meu Endereço
                  </button>
                </a>-->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <loader :loader="state.loader" />
  </section>
  <div class="toast toast-center" id="errorToast" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-header">
      <i class="bi bi-exclamation-circle-fill"></i>
      <strong class="me-auto">Erro</strong>
      <small class="text-dark">Agora</small>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">
      Ocorreu um erro ao realizar o pedido. Por favor, tente novamente.
    </div>
  </div>
  <!-- Modal -->
  <div class="modal modal-lg" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title text-danger" id="exampleModalLabel">
            ATENÇÃO
          </h1>
        </div>
        <div class="modal-body">
          Seu pedido foi
          <strong class="text-success text-decoration-underline">finalizado com sucesso</strong>
          e foi encaminhado aos nossos consultores. Logo entraremos em contato
          via WhatsApp ou email.
        </div>
        <div class="modal-footer">
          <nuxt-link to="/">
            <button type="button" class="btn-ok" data-bs-dismiss="modal">
              Ir para Home
            </button>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import services from "../services/axios";
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
// import endereco from "~/services/axios/endereco";
export default {
  setup() {
    definePageMeta({
      layout: "site",
    });
    useServerHead({
      title: "Protecty Alarmes - Carrinho",
    });

    const router = useRouter();
    const carrinhoStore = useCarrinhoStore();
    const {
      itens,
      valores_produtos,
      frete_selecionado,
      valor_total,
      fretes,
      obj_frete,
    } = storeToRefs(carrinhoStore);
    const {
      limparCarrinho,
      addQtd,
      removeQtd,
      setQtd,
      removeItem,
      adicionaFrete,
      freteSimples,
      limparFrete,
    } = carrinhoStore;
    const authClienteStore = useClienteAuthStore();
    const { client_token, client_id } = storeToRefs(authClienteStore);

    const state = reactive({
      loading: false,
      carrinho: [],
      valores_produtos: {
        total: 0,
        total_pix: 0,
        total_desconto: 0,
      },
      carrinho: {
        valor_total: "",
        valor_total_desconto: "",
        valor_total_pix: "",
        valor_frete: "",
        valor_produtos: "",
      },
      dados: { enderecos: { cidade: { estado: {} } } },
      obj_frete_selecionado: {},
      pedido: {},
      frete: null,
      tipo_frete_selecionado: null,
      metodo_frete: null,
      fretes: [],
      loader: false,
    });

    state.carrinho = itens;
    state.valores_produtos = valores_produtos;
    state.carrinho.valor_frete = 0;
    state.carrinho.valor_total_desconto = valores_produtos.value.total_desconto;
    state.carrinho.valor_total_pix = valores_produtos.value.total_pix;
    state.carrinho.valor_produtos = valores_produtos.value.total;
    state.carrinho.valor_total =
      valores_produtos.value.total + state.carrinho.valor_frete;
    state.frete_selecionado = frete_selecionado;
    state.valor_total = valor_total;
    //  console.log(state.carrinho.valor_total);
    state.produtos = itens;

    onMounted(() => {
      fetchDataCliente(client_id.value, client_token.value);
      const isEmpty = (obj) => {
        return Object.keys(obj).length === 0;
      };
      if (!isEmpty(fretes.value)) {
        console.log("entrou aqui");
        state.frete = fretes.value;
        state.cep = state.frete.cep;
      }
    });

    function checkNumberInput(itemId, qtd) {
      if (isNaN(qtd) || qtd < 1) qtd = 1;
      setQtd(itemId, qtd);
    }

    function adicionarQtd(produto_id) {
      addQtd(produto_id);
      calcularFrete();
    }

    function removerQtd(produto_id) {
      removeQtd(produto_id);
      calcularFrete();
    }

    async function fetchDataCliente(id, token) {
      try {
        state.loader = true;
        const { data } = await services.clientes.getDataCliente({
          client_id: id,
          client_token: token,
        });
        state.loader = false;
        state.dados = data;
        state.id_endereco = data.enderecos[0].id;
      } catch (error) {
        console.log(error);
      } finally {
        state.loader = false;
      }
    }

    async function cepAtributes() {
      var cep = state.dados.enderecos.cep;
      state.dados.enderecos.cep = cep.replace("-", "").replace(".", "");
      await services.cep.apiCep(state.dados.enderecos.cep).then((res) => {
        console.log(res.data);
        state.dados.enderecos.logradouro = res.data.logradouro;
        state.dados.enderecos.bairro = res.data.bairro;
        state.dados.enderecos.cidade.nome = res.data.localidade;
        state.dados.enderecos.cidade.estado.uf = res.data.uf;
        state.dados.enderecos.codigo_ibge = res.data.ibge;
      });
    }

    async function fazerPedido() {
      try {
        state.loader = true;
        if (!client_id.value) {
          localStorage.setItem(
            "destinoUrl",
            router.currentRoute.value.fullPath
          );
          router.push("/login");
        } else {
          if (state.id_endereco) {
            /*var qtd_parcelas = await services.pedido.verificarParcelas({
              itens: state.carrinho,
            });*/
            router.push("/finalizar-pedido");
          } else {
            if (
              confirm(
                "Ops, vimos que não poussí endereço cadastrado, gostaria de adicionar um novo endereço?"
              )
            ) {
              router.push("/criar-endereco/novo");
            }
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        state.loader = false;
      }

      /*
      try {
        if (state.dados.id) {
          state.loading = true;
          await services.clientes
            .fazerPedido({
              client_token: client_token.value,
              pedido: {
                cliente_id: state.dados.id,
                endereco_id: state.id_endereco,
                valor_total: state.carrinho.valor_total,
                valor_frete: state.carrinho.valor_frete,
                valor_total_desconto: state.carrinho.valor_total_desconto,
                valor_total_pix: state.carrinho.valor_total_pix,
                valor_produtos: state.carrinho.valor_produtos,
                produtos: state.carrinho,
              },
            })
            .then(() => {
              limparCarrinho();
              // Exibe o modal de sucesso
              const myModal = new bootstrap.Modal(
                document.getElementById("exampleModal")
              );
              myModal.show();
            })
            .finally(() => {
              state.loading = false;
            });
        } else {
          localStorage.setItem(
            "destinoUrl",
            router.currentRoute.value.fullPath
          );
          console.log(router.currentRoute.value.fullPath);
          router.push("/login");
        }
      } catch (error) {
        console.log(error);
        // Exibe o toast de erro
        const errorToast = new bootstrap.Toast(
          document.getElementById("errorToast")
        );
        errorToast.show();
      }
      */
    }

    async function btnAlterarFrete() {
      state.frete = null;
      limparFrete();
    }

    async function alterarFrete(frete) {
      limparFrete();
      state.obj_frete_selecionado = frete;
      adicionaFrete(state.fretes, frete);
      state.frete.preco = frete.preco;
      state.frete.prazo_frete = frete.dias_entrega;
      state.tipo_frete_selecionado = frete.id;
      state.prazo_frete = frete.dias_entrega;
      state.frete.prazo_frete = frete.dias_entrega;
      state.prazo_frete = frete.dias_entrega;
    }

    async function calcularFrete() {
      var produtos_req = [];
      state.carrinho.forEach((item) => {
        var produto = {};
        produto.id = item.id;
        produto.qtd = item.quantidade;
        produtos_req.push(produto);
      });

      var cep_sem_traco = state.cep.replace("-", "");
      try {
        state.loader = true;

        const { data } = await services.pedido.calcularFrete({
          produtos_req,
          cep_destinatario: cep_sem_traco,
        });
        state.frete = {};
        if (data.fretes[0].error) {
          adicionaFrete(data, data.fretes[1]);
          state.obj_frete_selecionado = data.fretes[1];
          state.frete.preco = data.fretes[1].preco;
          state.frete.prazo_frete = data.fretes[1].dias_entrega;
          state.tipo_frete_selecionado = data.fretes[1].id;
          state.prazo_frete = data.fretes[1].dias_entrega;
          data.fretes = [data.fretes[1]];
        } else {
          state.fretes = data.fretes;
          adicionaFrete(data, data.fretes[0]);
          state.obj_frete_selecionado = data.fretes[0];
          state.frete.preco = data.fretes[0].preco;
          state.frete.prazo_frete = data.fretes[0].dias_entrega;
          state.tipo_frete_selecionado = data.fretes[0].id;
          state.prazo_frete = data.fretes[0].dias_entrega;
        }
        console.log(data.fretes);
        //  state.tipo_frete_selecionado = data.fretes[0].nome;
        state.loader = false;
        state.frete = data;
      } catch (error) {
        console.log(error);
      } finally {
        state.loader = false;
      }
    }

    return {
      fazerPedido,
      state,
      cepAtributes,
      limparCarrinho,
      addQtd,
      removeQtd,
      removeItem,
      checkNumberInput,
      client_id,
      calcularFrete,
      btnAlterarFrete,
      alterarFrete,
      adicionarQtd,
      removerQtd,
    };
  },
};
</script>

<style scoped>
.input_frete {
  width: 80%;
  background: rgba(110, 108, 108, 0.74);
  border-radius: 4px;
  border: solid 1px rgba(110, 108, 108, 0.74);
  color: #fff;
  outline: none;
  padding: 5px 5px;
}

#carrinho {
  min-height: 90vh;
}

#trashicon {
  color: red;
  font-size: 14pt;
}

.icon_div {
  display: flex;
  justify-content: center;
  align-items: center;
}

.content_i {
  margin-left: 1rem;
  line-height: 1.2;
}

.content_i p {
  margin-bottom: 0;
  font-weight: 600;
  font-size: 14px;
  color: #252b42;
  font-family: "Montserrat";
}

.content_i span {
  margin-bottom: 0;
  font-weight: 400;
  font-size: 12px;
  color: #737373;
  font-family: "Montserrat";
}

.title h2 {
  color: #000;
  font-size: 32px;
}

#img_produto {
  width: 120px;
  height: 120px;
  object-fit: cover;
}

.img {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.desc_produto {
  width: 100%;
}

.desc_produto p {
  color: #000;
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 0;
  width: 100%;
  margin-left: 2rem;
}

.line {
  height: 2px;
  width: 100%;
  background: #cacdd8;
  margin: 15px 0 15px 0;
}

.title_desc p {
  margin-bottom: 0;
  color: #000;
  font-size: 14px;
  font-weight: 600;
}

.element_produto p {
  color: #000;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  margin-bottom: 0;
  line-height: normal;
}

.div_qtd {
  width: 55%;
  border-radius: 5px;
  background: var(--Color---1, #f5f7ff);
  border: solid 2px #f5f7ff;
  border: none;
  padding: 5px;
  text-align: center;
  display: flex;
  flex-direction: row;
}

.qtd_text {
  align-self: center;
  background-color: transparent;
  appearance: textfield;
  -webkit-appearance: none;
  -moz-appearance: textfield;
  width: 17px;
  margin-left: 5px;
}

.btns_qtd {
  display: flex;
  flex-direction: column;
  align-self: center;
  margin-left: 10px;
}

.div_qtd:focus {
  border: solid 2px #d0d6f1;
  outline: none;
}

.icon_remove_div {
  align-self: flex-start;
}

.icon_remove {
  color: #a2a6b0;
  font-size: 27px;
}

.btn_transparent {
  font-family: "Poppins", sans-serif;
  border-radius: 4px;
  border: 1px solid #000;
  background: transparent;
  color: #000;
  width: 230px;
  padding: 10px;
  transition: 0.5s;
}

.btn_transparent:hover {
  background: #000;
  color: #fff;
}

.btn_gold {
  font-family: "Poppins", sans-serif;
  border-radius: 4px;
  border: 1px solid #263c28;
  background: #263c28;
  color: #fff;
  width: 230px;
  padding: 10px;
  margin-left: 10px;
  transition: 0.5s;
}

.btn_gold:hover {
  color: #fff;
}

.btn_qtd {
  margin: 0 5px;
}

.btn_qtd:hover {
  cursor: pointer;
}

.btn_qtd:disabled {
  cursor: default;
  opacity: 0.3;
}

.btns {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.quad {
  border-radius: 20px;
  background: #0e130e;
  padding: 30px;
  color: #fff;
}

.quad h2 {
  color: rgb(60, 207, 78);
  font-size: 24px;
  font-family: "Poppins", sans-serif;
}

.btn_endereco {
  font-family: "Poppins", sans-serif;
  border-radius: 4px;
  border: 1px solid #fff;
  background: transparent;
  color: #fff;
  width: 100%;
  padding: 10px;
}

.btn_endereco:hover {
  font-family: "Poppins", sans-serif;
  border-radius: 4px;
  border: 1px solid #000;
  background: #fff;
  color: #000;
  width: 100%;
  padding: 10px;
  transition: 0.3s;
}

.btn_pedido {
  font-family: "Poppins", sans-serif;
  margin-bottom: 1rem;
  border-radius: 4px;
  border: 1px solid #263c28;
  background: #263c28;
  color: #fff;
  width: 100%;
  padding: 10px;
  transition: 0.3s;
}

.btn_pedido:hover {
  border: 1px solid rgb(122, 122, 122);
  background: rgb(122, 122, 122);
}

.quad h4 {
  color: rgb(60, 207, 78);
  font-family: "Poppins", sans-serif;
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

.title_modal {
  color: red;
}

.btn-ok {
  font-family: "Poppins", sans-serif;
  margin-bottom: 1rem;
  border-radius: 4px;
  border: 1px solid rgba(76, 76, 76, 1);
  background: rgba(76, 76, 76, 1);
  color: #fff;
  width: 200px;
  padding: 5px;
  transition: 0.3s;
}

.btn-ok:hover {
  border: 1px solid rgb(122, 122, 122);
  background: rgb(122, 122, 122);
}

.modal-title {
  font-size: 18pt;
  font-weight: bold;
}

.modal-footer {
  border-top: none;
}

.modal-body {
  padding: 15px;
  font-size: 12pt;
  font-weight: 400;
  font-family: "Poppins", sans-serif;
  margin-bottom: 0;
}

.toast-center {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1055;
}

.toast-header {
  font-size: 14pt;
  font-family: "Poppins", sans-serif;
  color: red;
}

.toast-header i {
  margin-right: 5px;
}

.toast-body {
  font-size: 12pt;
  font-family: "Poppins", sans-serif;
}

.toast {
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}

@media (min-width: 992px) and (max-width: 1200px) {
  .desc_produto p {
    padding: 5px;
    margin-left: 0;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .desc_produto p {
    padding: 5px;
    margin-left: 0;
  }

  .icon_div {
    margin-top: 2rem;
  }
}

@media (min-width: 576px) and (max-width: 767px) {
  .element_produto {
    margin-left: 10px;
  }

  .btn_gold {
    margin-left: 0px;
    margin-top: 10px;
  }

  .icon_div {
    margin-top: 2rem;
  }

  .icon_remove_div {
    border-bottom: solid 1px rgba(150, 150, 150, 0.5);
  }

  .img {
    margin-top: 1rem;
  }

  #btn_remove {
    margin-bottom: 1rem;
  }
}

@media (max-width: 575px) {
  .icon_div {
    margin-top: 2rem;
  }

  #img_produto {
    width: 120px;
    height: 120px;
  }

  .title h2 {
    font-size: 25px;
  }

  .element_produto {
    margin-left: 10px;
  }

  .btn_gold {
    margin-left: 0px;
    margin-top: 10px;
  }

  .d-flex {
    align-items: center;
  }

  .icon_div {
    margin-top: 2rem;
  }

  .icon_remove_div {
    border-bottom: solid 1px rgba(150, 150, 150, 0.5);
  }

  .img {
    margin-top: 1rem;
  }

  #btn_remove {
    margin-bottom: 1rem;
  }
}

@media (max-width: 450px) {
  .div_qtd {
    width: 100%;
  }
}
</style>