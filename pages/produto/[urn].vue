<template>
  <div>
    <div class="container" v-if="!state.notFound">
      <div class="container mt-12">
      </div>
      <div class="row">
        <div class="col-md-8">
          <!-- <nav style="--bs-breadcrumb-divider: '>'" aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a class="a-bread" href="/">Início</a>
              </li>
              <li class="breadcrumb-item">
                <a class="a-bread" href="/produtos">Produtos</a>
              </li>
              <li class="breadcrumb-item">
                <a class="a-bread" :href="'/produtos/' + state.produto.categoria.urn">
                  {{ state.produto.categoria.nome }}
                </a>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                {{ state.produto.nome }}
              </li>
            </ol>
          </nav> -->
        </div>
      </div>
      <div class="row mt-8">
        <div class="col-md-8">
          <div class="row">
            <div class="col-md-2">
              <div class="div-flex">
                <div class="div_margin" v-for="imagem in state.produto.imagens" :key="imagem.id">
                  <div
                    :class="{ 'card-select': state.img_select === imagem.id, 'card-list': state.img_select !== imagem.id }">
                    <a type="button" @click="verImg(imagem.id)">
                      <img class="imgs-produtos" :src="imagem.imagem" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-9 offset-sm-1">
              <img class="img-principal" :src="state.img_principal" />
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <span class="ref">REF: {{ state.produto.ref }}</span>
          <div class="title-produto mt-12">
            <h3>{{ state.produto.nome }}</h3>
          </div>
          <hr />
          <div>
            <h2 id="preco">
              R$ {{ state.produto.preco.toLocaleString("pt-br", { style: "currency", currency: "BRL", }) }}
            </h2>
            <div class="div-preco">
              <p id="parcelas">ou <span class="spn-parcelas">{{ state.produto.parcelas }}x</span> de <span
                  class="valor-parcela"> {{ valorTotal }} </span> sem juros</p>
            </div>
          </div>
          <div class="">
            <!-- <div class="div_btn_qtd">
              <a @click="removeQtd" class="btn_qtd"><i class="bi bi-dash"></i></a><span class="qtd">{{ state.qtd
              }}</span><a @click="addQtd" class="btn_qtd"><i class="bi bi-plus"></i></a>
            </div> -->
            <div>
              <button type="button" class="btn btn_comprar" title="Comprar" @click="addProduto()">
                <strong>COMPRAR</strong>
              </button>
            </div>
          </div>
          <!-- <p style="color: #011627">
            Vendido e entregue:
            <span style="color: #011627; font-weight: bolder">Protecty alarmes
            </span>
          </p>  -->
        </div>
      </div>
      <div class="quad_desc">
        <h1 class="descricao">Descrição</h1>
        <div>
          <p class="p-descricao" v-html="state.produto.descricao"></p>
        </div>
      </div>
      <hr />
      <div class="row">
        <h2 class="h2-relacionados">Produtos em Lançamentos</h2>
        <div class="col-lg-3 col-md-6" v-for="(produto, index) in state.produtos_lancamento.destaque1"
          :key="produto.id">
          <cardDia v-if="index <= 3" :produto="produto" />
        </div>
      </div>
    </div>
    <div class="container mt-5" v-else>
      <h2 style="font-weight: bolder">Produto não encontrado!</h2>
      <div class="mb-5 mt-5">
        <a href="/" class="btn btn-secondary mr-3">Voltar para Home</a>
        <a href="/produtos" class="btn btn-success">Voltar para Produtos</a>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { asyncServices } from "../../services/fetch"
import services from "@/services/axios";
export default {
  setup() {
    definePageMeta({
      layout: "site",
    });
    useServerHead({
      title: "Produto",
    });
    const router = useRouter();
    const state = reactive({
      relacionados: [],
      produto: {
        categoria: {},
        preco: 0,
        preco_desconto: 0,
        preco_pix: 0,
        imagens: [{}],
        tamanhos: [{}],
        cores: [{}],
      },
      qtd: 1,
      notFound: false,
      img_principal: '',
      img_select: '',
      produtos_lancamento: [],
    });
    onMounted(() => { });
    fetchProduto();

    const valorTotal = computed(() => {
      const precoNumerico = parseFloat(state.produto.preco);
      if (!isNaN(precoNumerico) && typeof state.produto.parcelas === 'number') {
        const resultado = precoNumerico / state.produto.parcelas;
        return resultado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      } else {
        return 'R$ 0,00';
      }
    });

    async function fetchProduto() {
      try {
        const { data } = await asyncServices.produtos.getProdutoSite({
          urn: router.currentRoute._value.params.urn,
        });
        if (!data.value.id) {
          console.log('Produto não encontrado');
        }
        state.produto = data;
        state.img_select = data.value.imagens[0].id
        state.img_principal = state.produto.imagens[0].imagem;

      } catch (error) {
        state.notFound = true;
      }
    }

    function addQtd() {
      state.qtd = state.qtd + 1;
    }

    function removeQtd() {
      if (state.qtd > 1) {
        state.qtd = state.qtd - 1;
      }
    }

    function addProduto() {
      const carrinhoStore = useCarrinhoStore();
      const { addItem } = carrinhoStore;
      if (state.produto.imagens.length > 0) {
        var img = state.produto.imagens[0].imagem;
      } else {
        var img = null;
      }
      var produto = {
        id: state.produto.id,
        produtos_id: state.produto.id,
        nome: state.produto.nome,
        valor: parseFloat(state.produto.preco),
        preco: parseFloat(state.produto.preco),
        preco_desconto: parseFloat(state.produto.preco_desconto),
        preco_pix: parseFloat(state.produto.preco_pix),
        urn: state.produto.urn,
        imagem: img,
        quantidade: state.qtd,
        subtotal: parseFloat(state.produto.preco) * state.qtd,
        subtotal_desconto: parseFloat(state.produto.preco_desconto) * state.qtd,
        subtotal_pix: parseFloat(state.produto.preco_pix) * state.qtd,
      };
      addItem(produto);
      router.push("/carrinho");
    }

    function verImg(imagem_id) {
      state.img_select = imagem_id
      const imagemSelecionada = state.produto.imagens.find(imagem => imagem.id === imagem_id);
      if (imagemSelecionada) {
        state.img_principal = imagemSelecionada.imagem;
      }
    }

    fetchProdutos();

    async function fetchProdutos() {
      try {
        const { data } = await asyncServices.produtos.getProdutosHome();
        state.produtos_lancamento = data;
      } catch (error) {
        console.log(error);
      }
    }

    return {
      addQtd,
      removeQtd,
      addProduto,
      verImg,
      state,
      valorTotal,
    };
  },
};
</script>

<style scoped>
.ref {
  background: #000;
  color: #fff;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 11pt;
}

#parcelas {
  color: #737373;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-size: 11pt;
}

#parcelas .spn-parcelas {
  color: #00c21a;
  font-family: 'Poppins', sans-serif;
  margin-bottom: 0;
  font-weight: 400;
  font-size: 11pt;
}

#parcelas .valor-parcela {
  color: #252B42;
  font-family: 'Poppins', sans-serif;
  margin-bottom: 0;
  font-weight: 700;
  font-size: 11pt;
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
  color: #252B42;
  font-family: 'Montserrat';
}

.content_i span {
  margin-bottom: 0;
  font-weight: 400;
  font-size: 12px;
  color: #737373;
  font-family: 'Montserrat';
}

.div_line {
  background: #016938;
}

.div_top {
  background: #334B35;
  margin-bottom: 2rem;
}

.div_line_icon {
  align-items: center;
  justify-content: center;
  display: flex;
  height: 40px;

}

.div_line_icon i {
  color: #fff;
  font-size: 12pt;
  margin-right: 1rem;
}

.div_local {
  align-items: center;
  justify-content: center;
  display: flex;
  height: 40px;

}

.div_local i {
  color: #F7C35F;
  font-size: 12pt;
  margin-right: 1rem;

}

.div_local span {
  color: #FFFFFF;
  font-size: 12pt;
}

.btn_comprar {
  background: #0000004d;
  color: #000;
  transition: 0.5s;
  width: 80%;
  padding: 10px;
}

.btn_comprar:hover {
  background: #0000004d;
  color: #fff;
}

ol {
  background: transparent;
}

.a-bread {
  color: #525259;

  text-decoration: none;
}

.a-bread:hover {
  color: #016938;

}

.div-code {
  text-align: left;
}

.code {
  color: var(--Color-text-2, #525259);
  font-size: 16px;
  margin-bottom: 0;
}

.descricao {
  font-size: 24px;
  font-weight: 600;
  line-height: 1;
  letter-spacing: 0em;
  font-family: 'Livvic', sans-serif;
}

.div-h1-descricao {
  margin-top: 3em;
}

.p-descricao {
  font-size: 16px;
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0em;
  text-align: left;
  font-family: 'Livvic', sans-serif;
  color: #737373;
}

.tamanho {
  background: #F0EEED;
  background: #F0EEED;
  border-radius: 100px;
  width: 35px;
  height: 35px;
  text-align: center;
  padding: 5px;
  margin-bottom: 1rem;
}

.tamanho p {
  font-family: 'Livvic', sans-serif;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0em;
}

.title-produto h3 {
  color: #252B42;
  font-weight: 700;
  font-size: 32px;
  font-family: 'Livvic', sans-serif;


}

.cat_garantia span {
  color: #737373;
  font-weight: 400;
  font-size: 16px;
  font-family: 'Livvic', sans-serif;
}

.genero h3 {
  color: #737373;
  font-weight: 600;
  font-size: 16px;
  font-family: 'Livvic', sans-serif;

}

.genero p {
  color: #737373;
  font-weight: 400;
  font-size: 16px;
  font-family: 'Livvic', sans-serif;

}

#preco {
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  margin-bottom: 1px;
  font-size: 32px;
}

#por {
  color: #011627;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 0.16px;
}

#desconto {
  color: #00a75d;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 0.24px;
}

.card-select {
  width: 100%;
  height: auto;
  padding: 10px;
  border: solid 2px #1F1F1F;
  border-radius: 10px;
}

.card-list {
  width: 100%;
  height: auto;
  padding: 10px;
  border: solid 2px #d4d4d4;
  border-radius: 10px;
}

.imgs-produtos {
  width: 100%;
  height: 100px;
  object-fit: cover;
}

.img-principal {
  width: 400px;
  height: 400px;
  object-fit: contain;
  margin-top: 1em;
}

.div_btn_qtd {
  display: flex;
  margin-right: 2em;
}

.btn_qtd {
  color: rgb(0, 0, 0);
  width: 40px;
  height: 40px;
  text-align: center;
  font-size: 18pt;
  border: solid 1px gray;
  cursor: pointer;
}

.qtd {
  color: rgb(0, 0, 0);
  width: 40px;
  height: 40px;
  text-align: center;
  font-size: 16pt;
  border: solid 1px gray;
}


#pix {
  color: #011627;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 0.16px;
  margin-bottom: 1em;
}

.h2-relacionados {
  color: #252B42;
  font-weight: 600;
  font-size: 24px;
  font-family: 'Livvic', sans-serif;
}

.color-preview {
  width: 30px;
  height: 30px;
  border-radius: 50%;

}

.div_cor {
  margin-bottom: 1rem;
}

.quad_desc {
  background: #252B420A;
  padding: 24px;
  margin-top: 2rem;
}

.div_margin {
  margin-bottom: 10px;
}

@media (min-width: 992px) and (max-width: 1200px) {
  .title-produto h3 {
    font-size: 20pt;
  }

  .imgs-produtos {
    height: 70px;
  }

  .img-principal {
    width: 300px;
    height: 300px;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .card-list {
    padding: 5px;
  }

  .title-produto h3 {
    font-size: 20pt;
  }

  .imgs-produtos {
    height: 60px;
  }

  .img-principal {
    width: 300px;
    height: 300px;
  }
}

@media (min-width: 576px) and (max-width: 767px) {
  .imgs-produtos {
    width: 80px;
    height: 80px;
  }

  .div-flex {
    display: flex;
  }

  .card-list {
    margin-top: 0;
    width: auto;
  }

  .img-principal {
    margin-bottom: 2em;
  }

  .div_local span {
    font-size: 9pt;
  }

  .div_margin {
    margin: 10px;
    margin-bottom: 0;
  }
}

@media (max-width: 575px) {
  .div-flex {
    display: flex;
  }

  .card-list {
    margin-top: 0;
    width: auto;
    margin-right: 10px;
  }

  .card-select {
    margin-top: 0;
    width: auto;
    margin-right: 10px;
  }

  .img-principal {
    margin-bottom: 2em;
    height: 350px;
    width: 100%;
  }

  .imgs-produtos {
    width: 80px;
    height: 80px;
  }

  .div_local span {
    font-size: 8pt;
  }
}
</style>