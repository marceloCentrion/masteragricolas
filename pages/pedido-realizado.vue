<template>
  <div>
    <top />
    <section class="mt-5">
      <div class="container">
        <div style="background-color: #fff; border-radius: 10px; padding: 20px">
          <div style="text-align: center">
            <!-- <img src="/images/site/check.png" style="width: 100px" />-->
            <p style="font-size: 18pt">
              Parabéns! Seu pedido foi realizado com sucesso!
            </p>
            <p style="font-size: 12pt" v-if="
              state.pedido.tipo_pagamento == 'PIX' ||
              state.pedido.tipo_pagamento == 'BOLETO'
            ">
              Agora só falta finalizar o pagamento
            </p>
            <p style="font-size: 12pt" v-else>
              Você receberá um e-mail com os dados do pedido e pagamento
            </p>
          </div>
          <div class="row" v-if="state.pedido.tipo_pagamento == 'PIX'">
            <div class="col-sm-3">
              <div class="div_qr_code" style="
                    border: #f2f2f2 solid 1px;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0px 0px 10px #f2f2f2;
                  ">
                <img :src="state.pedido.pix_qr_code" style="width: 100%" />
              </div>
            </div>
            <div class="col-sm-9">
              <div class="div_qr_code" style="
                    border: #f2f2f2 solid 1px;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0px 0px 10px #f2f2f2;
                  ">
                <p class="bold">Instruções</p>
                <p>
                  1. Abra o app do seu banco ou instituição financeira e entre
                  na Área PIX.
                </p>
                <p>
                  2. Escolha a opção Pagar com QR Code ou Pix Copia e Cola.3.
                </p>
                <p>Confira os dados do pagamento, confirme e pronto!</p>
              </div>
              <div class="div_qr_code" style="
                    border: #f2f2f2 solid 1px;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0px 0px 10px #f2f2f2;
                    margin-top: 10px;
                  ">
                <p class="bold">Atenção</p>
                Informação Importante Após Finalizar a Compra, o PIX gerado
                fica disponível por 6 horas aguardando o seu pagamento, após
                este prazo ele expira e seu pedido será cancelado.
              </div>

              <div class="div_qr_code" style="
                    border: #f2f2f2 solid 1px;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0px 0px 10px #f2f2f2;
                    margin-top: 10px;
                  ">
                <p class="bold">Pedido</p>
                <p>Detalhes do pedido:</p>
                <p>Pedido {{ state.pedido.id }}</p>
                Pagamento Pix Prazo de Entrega 11 dias úteis
                <!-- Valor Total
                {{ state.pedido.valor_total }} -->
              </div>
            </div>
          </div>
          <div class="row" v-if="state.pedido.tipo_pagamento == 'BOLETO'">
            <div class="col-sm-3">
              <div class="div_pdf" style="">
                <a :href="state.pedido.pdf" target="_blank">
                  <img src="/images/pdf.png" style="width: 100%" />
                  Link para o boleto!
                </a>
              </div>
            </div>
            <div class="col-sm-9">
              <div class="div_qr_code" style="
                    border: #f2f2f2 solid 1px;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0px 0px 10px #f2f2f2;
                  ">
                <p class="bold">Instruções</p>

                <p>
                  Boleto Gerado: Você pode imprimi-lo ou salvá-lo em PDF para
                  pagamento.
                </p>

                <p>
                  Como Pagar: O boleto pode ser pago em qualquer agência
                  bancária, casa lotérica ou pelo internet banking.
                </p>

                <p>
                  Prazo de Pagamento: Verifique a data de vencimento no boleto
                  para evitar atrasos. O prazo de pagamento geralmente é de 1
                  a 3 dias úteis.
                </p>

                <p>
                  Confirmação do Pagamento: A compensação pode levar até 3
                  dias úteis. Você será notificado por e-mail quando o
                  pagamento for confirmado, e seu pedido será liberado para
                  envio.
                </p>

                <p>
                  Lembre-se de pagar dentro do prazo para garantir a rápida
                  liberação do seu pedido. Se o boleto vencer, será necessário
                  refazer a compra para gerar um novo boleto.
                </p>

                <p>
                  1. Abra o app do seu banco ou instituição financeira e entre
                  na Área PIX.
                </p>
                <p>
                  2. Escolha a opção Pagar com QR Code ou Pix Copia e Cola.3.
                </p>
                <p>Confira os dados do pagamento, confirme e pronto!</p>
              </div>

              <div class="div_qr_code" style="
                    border: #f2f2f2 solid 1px;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0px 0px 10px #f2f2f2;
                    margin-top: 10px;
                  ">
                <p class="bold">Pedido</p>
                Detalhes do pedido Pedido 0012405531310 Pagamento Pix Prazo de
                Entrega 11 dias úteis Valor Total R$ 46,98
              </div>
            </div>
          </div>
          <div style="width: 100%; text-align: center">
            <a href="/">
              <button type="button" class="btn btn-success"
                style="padding: 10px 20px; font-size: 16pt; margin-top: 10px">
                Voltar para Home
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
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

    // const router = useRouter();
    const carrinhoStore = useCarrinhoStore();
    const { itens, valores_produtos, pedido } = storeToRefs(carrinhoStore);
    const clienteAuthStore = useClienteAuthStore();
    const { client_token, client_id } = storeToRefs(clienteAuthStore);
    console.log(pedido.value);
    const state = reactive({
      endereco: { cliente: {} },
      id_endereco: "",
      dados: {
        enderecos: [{ cidades: { estado: {}, estado_id: "" } }],
        cidade_id: "",
      },
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

      pedido: {},
    });

    onMounted(() => {
      state.pedido = pedido.value;
      console.log(pedido.value);
      state.carrinho.valor_frete = 0;
      state.carrinho.valor_total_desconto = valores_produtos.value.total_desconto;
      state.carrinho.valor_total_pix = valores_produtos.value.total_pix;
      state.carrinho.valor_produtos = valores_produtos.value.total;
      state.carrinho.valor_total = valores_produtos.value.total + state.carrinho.valor_frete;
      state.produtos = itens;
    });

    function abrirModal() {
      state.modalOpen = true;
    }
    function fecharModal() {
      state.modalOpen = false;
    }

    return {
      fecharModal,
      abrirModal,
      state,
    };
  },
};
</script>
<style scoped>
.sct_finalizar {}

.bold {
  font-weight: bold;
}

.div_pdf {
  border: #f2f2f2 solid 1px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px #f2f2f2;
  text-align: center;
}
</style>