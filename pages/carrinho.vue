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
              <div class="col-md-2 title_desc d-none d-md-block">
                <p style="font-weight: bold">Subtotal</p>
              </div>
              <div class="col-md-1 title_desc d-none d-md-block"></div>
            </div>
            <div v-if="state.carrinho.length > 0">
              <div v-for="produto in state.carrinho" :key="produto.produtos_id">
                <div class="row">
                  <div class="col-sm-12 mb-sm-4 col-md-5 d-flex">
                    <div class="img">
                      <img :src="produto.imagem" id="img_produto" v-if="produto.imagem" />
                      <img v-else id="img_produto" src="/images/site/produto-sem-imagem.webp" style="width: 100px" />
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
                        <button type="button" @click="addQtd(produto.produtos_id)" class="btn_qtd">
                          <i class="bi bi-chevron-up" style="font-size: 14px"></i>
                        </button>
                        <button type="button" @click="removeQtd(produto.produtos_id)" class="btn_qtd"
                          :disabled="produto.quantidade === 1">
                          <i class="bi bi-chevron-down" style="font-size: 14px"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex col-md-2">
                    <div class="col-md-2 title_desc d-block d-md-none d-lg-none d-xl-none">
                      <p>Subtotal:</p>
                    </div>
                    <div class="element_produto mt-md-3">
                      <p style="font-weight: bold">
                        {{
                          produto.subtotal.toLocaleString("pt-br", {
                            style: "currency",
                            currency: "BRL",
                          })
                        }}
                      </p>
                    </div>
                  </div>
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
              <p>Coloque seu para estimativa de frete</p>
              <hr />
              <div class="row">
                <div class="col-6">
                  <div>
                    <p style="font-weight: bold">Subtotal</p>
                  </div>
                  <div>
                    <p style="font-weight: bold">Frete</p>
                  </div>
                  <div>
                    <p style="font-weight: bold">Total</p>
                  </div>
                  <div>
                    <p style="font-weight: bold">Total Com Desconto</p>
                  </div>
                  <div>
                    <p style="font-weight: bold">Total No Pix</p>
                  </div>
                </div>
                <div style="text-align: right" class="col-6">
                  <div v-if="state.carrinho.length > 0">
                    <p style="font-weight: bold">
                      {{
                        state.carrinho.valor_total.toLocaleString("pt-br", {
                          style: "currency",
                          currency: "BRL",
                        })
                      }}
                    </p>
                    <div>
                      <p style="font-weight: bold">Frete</p>
                    </div>
                    <p style="font-weight: bold">
                      {{
                        state.carrinho.valor_total.toLocaleString("pt-br", {
                          style: "currency",
                          currency: "BRL",
                        })
                      }}
                    </p>
                    <p style="font-weight: bold">
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
                    <p style="font-weight: bold">
                      {{
                        state.carrinho.valor_total_pix.toLocaleString("pt-br", {
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
                  <span v-if="!state.loading">Continuar</span>
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
import produtos from "~/services/axios/produtos";
// import endereco from "~/services/axios/endereco";
export default {
  setup() {
    definePageMeta({
      layout: "site",
    });
    useServerHead({
      title: "MASTER - Carrinho",
    });

    const router = useRouter();
    const carrinhoStore = useCarrinhoStore();
    const { itens, valores_produtos } = storeToRefs(carrinhoStore);
    const { limparCarrinho, addQtd, removeQtd, setQtd, removeItem } =
      carrinhoStore;

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
        id: "",
        valor_total: "",
        valor_total_desconto: "",
        valor_total_pix: "",
        valor_frete: "",
        valor_produtos: "",
      },
      dados: { enderecos: { cidade: { estado: {} } } },
      pedido: {},
      produtos: [],
    });
    state.carrinho = itens;
    state.valores_produtos = valores_produtos;

    state.carrinho.valor_frete = 0;
    state.carrinho.valor_total_desconto = valores_produtos.value.total_desconto;
    state.carrinho.valor_total_pix = valores_produtos.value.total_pix;
    state.carrinho.valor_produtos = valores_produtos.value.total;
    state.carrinho.valor_total =
      valores_produtos.value.total + state.carrinho.valor_frete;
    //  console.log(state.carrinho.valor_total);
    state.produtos = itens;

    onMounted(() => {
      fetchDataCliente(client_id.value, client_token.value);
    });

    function checkNumberInput(itemId, qtd) {
      if (isNaN(qtd) || qtd < 1) qtd = 1;
      setQtd(itemId, qtd);
    }
    async function fetchDataCliente(id, token) {
      try {
        const { data } = await services.clientes.getDataCliente({
          client_id: id,
          client_token: token,
        });
        state.dados = data;
        state.id_endereco = data.enderecos[0].id;
      } catch (error) {
        console.log(error);
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
      }*/
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
    };
  },
};
</script>

<style scoped>
#carrinho {
  min-height: 91vh;
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
  width: 70%;
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
  width: 30px;
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
  color: #3ccf4e;
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
  background: #000;
  padding: 30px;
  color: #fff;
}

.quad h2 {
  color: #3ccf4e;
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
  color: #3ccf4e;
}

.quad h4 {
  color: #3ccf4e;
  font-family: "Poppins", sans-serif;
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

.title_modal {
  color: red;
}

#togglePass {
  background: transparent;
  border: none;
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

  .div_qtd {
    width: 90%;
    border-radius: 5px;
    background: var(--Color---1, #f5f7ff);
    border: solid 2px #f5f7ff;
    border: none;
    padding: 5px;
    text-align: center;
    display: flex;
    flex-direction: row;
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

  .div_qtd {
    width: 90%;
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

  .div_qtd {
    width: 60%;
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

  .div_qtd {
    width: 60%;
  }
}

@media (max-width: 450px) {
  .div_qtd {
    width: 100%;
  }
}
</style>