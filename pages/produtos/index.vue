<template>
  <div>
    <top :tela="'ecommerce'" />
    <div class="container">
      <div class="row">
        <div class="col-md-4 col-lg-3">
          <!-- <nav style="--bs-breadcrumb-divider: '>'" aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a class="a-bread" href="/">Home</a>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Produtos
              </li>
            </ol>
          </nav> -->
          <div class="quad_filtro">
            <h2 class="h2_side">Filtros de Pesquisa</h2>
            <hr />
            <ul>
              <li class="item-nav" v-for="categoria in state.categorias" :key="categoria.id">
                <!-- <span class="">{{ categoria.nome }}</span> -->
                <!-- <input type="checkbox" /> -->
                <a @click="filtrados(categoria.urn)" style="cursor: pointer" class="nav-link px-0" :class="{
                  'nav-link-selected': categoria.urn == state.categoria_urn,
                }">
                  <span class="">{{ categoria.nome }}</span>
                </a>
                <!-- <hr /> -->
              </li>
            </ul>
            <!-- <hr /> -->
            <!-- <div class="div_cores" @click="menuShow()">
              <h2 class="h2-cores">Cores</h2>
              <button class="btn-list"><i class="bi bi-caret-up" id="caret-icon"></i></button>
            </div>
            <div class="div_tds_cores" id="div_tds_cores">
              <h1>Teste</h1>
            </div> -->
            <h2 class="h2_side">Faixa de Preço</h2>
            <div class="row mb-6">
              <div class="col-md-6">
                <label class="label_valor">R$</label>
                <input class="input_valor" type="text" placeholder="MIN" v-model="state.preco_inicial" />
              </div>
              <div class="col-md-6">
                <label class="label_valor">R$</label>
                <input class="input_valor" type="text" placeholder="MÁX" v-model="state.preco_final" />
              </div>
            </div>
            <div class="col-md-2">
              <div>
                <button class="btn_transparent" type="button" @click="filtraPorPreco()" title="Aplicar Faixa de Preço">
                  Aplicar
                </button>
              </div>
            </div>
            <!-- <h2 class="h2_side">Ferramentas de Adivinhação</h2>
            <ul>
              <li class="item-nav" v-for="categoria in state.categorias" :key="categoria.id">
                 <span class="">{{ categoria.nome }}</span> 
                 <input type="checkbox" /> 
                <a @click="filtrados(categoria.urn)" style="cursor: pointer" class="nav-link px-0"
                  :class="{ 'nav-link-selected': categoria.urn == state.categoria_urn, }">
                  <span class="">{{ categoria.nome }}</span>
                </a>
                 <hr /> 
              </li>
            </ul> -->
            <div class="div-btn-trash">
              <button @click="fetchAllProdutos" title="Limpar Filtro" type="button" class="btn-trash">
                <i class="bi bi-trash3"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="col-md-8 col-lg-9">
          <div class="py-md-5">
            <div class="row">
              <div class="col-md-6">
                <p v-if="state.buscando" class="buscando">
                  Buscando por: {{ state.buscando }}
                </p>
                <p v-else class="buscando">Buscando por: Todos</p>
              </div>
              <div class="col-md-6">
                <p class="qtd">Exibindo todos os {{ state.qtd }} resultados</p>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-4 offset-lg-0 py-2" v-for="produto in state.produtos" :key="produto.id">
                <cardAllProdutos :produto="produto" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <loader :loader="state.loader" />
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { reactive } from "vue";
import { asyncServices } from "../../services/fetch";
import { ref, onMounted } from "vue";
import services from "./../services/axios";
import top from "~/components/top.vue";

export default {
  components: { top },
  setup() {
    const checkboxState = ref("todos");
    const handleCheckbox = (value) => {
      if (value === "todos") {
        state.checkbox = [];
      } else {
        state.checkbox = [value];
      }
    };
    definePageMeta({
      layout: "site",
    });
    onMounted(() => {
      fetchEmpresa();
      checkboxState.value = "todos";
    });

    const router = useRouter();
    const state = reactive({
      produtos: [],
      busca: "",
      empresa: {},
      categoria_urn: "",
      checkbox: ["todos"],
      preco_final: "",
      preco_inicial: "",
      loader: false,
    });

    fetchCategoria();
    if (router.currentRoute._value.params.urn != undefined) {
      state.categoria_urn = router.currentRoute._value.params.urn;
      filtrados(state.categoria_urn);
    } else {
      fetchAllProdutos();
    }

    async function fetchCategoria() {
      try {
        const { data } = await asyncServices.categoria.getCatAtivas();
        state.categorias = data;
      } catch (error) {
        console.log(error);
      }
    }
    async function fetchAllProdutos() {
      try {
        state.loader = true,
        state.categoria_urn = null;
        const { data } = await asyncServices.produtos.getAllProduto();
        state.produtos = data;
        var qtd = state.produtos;
        state.qtd = qtd.length;
        history.pushState({}, "", "/produtos");
        state.buscando = "";
        state.busca = "";
        state.loader = false
      } catch (error) {
        console.log(error);
      } finally {
        state.loader = false
      }
    }
    async function filtrados(categoria_urn) {
      state.categoria_urn = categoria_urn;
      try {
        state.loader = true
        const { data } = await services.produtos.getAllProdutoCat(
          categoria_urn
        );
        state.produtos = data;
        var qtd = state.produtos;
        state.qtd = qtd.length;
        history.pushState({}, "", "/produtos/" + categoria_urn);
        state.buscando = categoria_urn;
        state.loader = false

      } catch (error) {
        console.log(error);
      } finally {
        state.loader = false
      }
    }
    async function buscar() {
      await services.produtos
        .buscarProduto({ nome: state.busca })
        .then((res) => {
          state.produtos = res.data;
          var qtd = state.produtos;
          state.qtd = qtd.length;
          state.buscando = state.busca;
          history.pushState({}, "", "/produtos/" + state.busca);
          state.busca = "";
        });
    }
    function menuShow() {
      let menuMobile = document.querySelector(".div_cores");
      let divTdsCores = document.getElementById("div_tds_cores");
      let caretIcon = document.getElementById("caret-icon");
      if (menuMobile.classList.contains("open")) {
        menuMobile.classList.remove("open");
        divTdsCores.style.display = "none";
        caretIcon.classList.replace("bi-caret-down", "bi-caret-up");
      } else {
        menuMobile.classList.add("open");
        divTdsCores.style.display = "block";
        caretIcon.classList.replace("bi-caret-up", "bi-caret-down");
      }
    }
    async function fetchEmpresa() {
      try {
        const { data } = await services.empresa.getSite();
        state.empresa = data;
      } catch (error) {
        console.log(error);
      }
    }
    async function filtraPorPreco() {
      try {
        const { data } = await services.produtos.porFaixaPreco({
          preco_inicial: state.preco_inicial,
          preco_final: state.preco_final,
        });
        state.produtos = data;
      } catch {
        alert("Erro ao filtrar por faixa de preço");
      }
    }

    return {
      state,
      filtrados,
      fetchAllProdutos,
      buscar,
      menuShow,
      checkboxState,
      handleCheckbox,
      filtraPorPreco,
    };
  },
};
</script>

<style scoped>
.nav-link {
  color: #252b42;
  font-weight: 600;
  font-family: "Poppins", sans-serif;
  margin-bottom: 1rem;
}

.nav-link:hover {
  color: #3ccf4e !important;
}

.nav-link-selected {
  color: #3ccf4e !important;
}

.div_line {
  background: #016938;
}

.div_top {
  background: #334b35;
  margin-bottom: 2rem;
}

ol {
  background: transparent;
  font-family: "Livvic", sans-serif;
}

.a-bread {
  color: #525259;
  text-decoration: none;
  font-family: "Livvic", sans-serif;
}

.a-bread:hover {
  color: #3ccf4e;
}

.h2_side {
  color: #fff;
  font-size: 18px;
  background: #263c28;
  padding: 8px 12px;
}

hr {
  width: 100%;
  height: 1px;
  background: #e4e4eb;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.nav.nav-pills {
  background: #fcfcfc !important;
}

ul {
  padding-left: 0;
}

.qtd {
  color: var(--Color-text-2, #525259);
  font-size: 16px;
  letter-spacing: 0.16px;
  text-align: right;
}

.buscando {
  color: var(--Color-text-2, #000);
  font-size: 16px;
  letter-spacing: 0.16px;
  text-align: left;
  font-weight: 700;
}

.div-btn-trash {
  text-align: right;
  margin-top: 1em;
}

.btn-trash {
  background: #e13229;
  border: solid 1px #e13229;
  color: #fff;
  border-radius: 3px;
  width: 30px;
  height: 30px;
  transition: 0.2s;
}

.btn-trash:hover {
  background: #ba2921;
  border: solid 1px #ba2921;
}

.item-nav {
  display: flex;
  justify-content: space-between;
}

/* .item-nav span {
  color: #737373;
  font-weight: 400;
  font-family: 'Livvic', sans-serif;

} */

.quad_filtro {
  padding: 20px 24px 20px 24px;
  margin-top: 3rem;
}

.div_cores {
  display: flex;
  justify-content: space-between;
}

.h2-cores {
  color: #252b42;
  font-weight: 400;
  font-size: 22px;
  font-family: "Livvic", sans-serif;
}

.div_tds_cores {
  display: none;
  /* Oculta por padrão */
}

.open .div_tds_cores {
  display: block;
  /* Exibe quando a classe open está presente */
}

.nav-pagination {
  display: flex;
  justify-content: center;
}

.page-link {
  color: #737373;
}

.div_line {}

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
  color: #f7c35f;
  font-size: 12pt;
  margin-right: 1rem;
}

.btn_transparent {
  background: transparent;
  border: solid 2px #334b35;
  font-family: "Livvic", sans-serif;
  color: #334b35;
  font-weight: 600;
  padding: 5px 20px;
  border-radius: 5px;
}

.div_local span {
  color: #ffffff;
  font-size: 12pt;
}

.label_valor {
  font-family: "Poppins";
  font-size: 16px;
  font-weight: 600;
  line-height: 1;
  text-align: left;
  color: #252b42;
}

.input_valor {
  background: #e4e4eb;
  width: 100%;
  font-family: "Poppins";
  font-size: 14px;
  font-weight: 400;
  padding: 10px;
  border-radius: 4px;
}

@media (min-width: 992px) and (max-width: 1200px) {

  .h2_side,
  .h2-cores {
    font-size: 13pt;
  }

  #menu {
    width: 100%;
  }

  #submenu1 {
    width: 100%;
  }

  .input-all {
    width: 100%;
  }

  hr {
    width: 100%;
  }
}

@media (min-width: 768px) and (max-width: 991px) {

  .h2_side,
  .h2-cores {
    font-size: 12pt;
  }

  hr {
    width: 100%;
  }

  .input-all {
    width: 170px;
  }
}

@media (min-width: 576px) and (max-width: 767px) {
  .div_local span {
    font-size: 9pt;
  }

  .h2_side,
  .h2-cores {
    font-size: 15pt;
  }

  .input-all {
    width: 300px;
  }

  hr {
    width: 100%;
  }

  .div-btn-trash {
    text-align: left;
  }
}

@media (max-width: 575px) {
  .div_local span {
    font-size: 8pt;
  }

  .input-all {
    width: 100%;
    height: 45px;
  }

  hr {
    width: 100%;
  }

  .btn-all {
    height: 45px;
  }
}
</style>