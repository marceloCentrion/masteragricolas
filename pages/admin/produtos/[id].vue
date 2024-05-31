<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h5>Alterar Produto</h5>
      </div>

      <div class="card-body">
        <div>
          <input
            type="radio"
            id="produto_com_preco"
            v-model="state.produto.sob_consulta"
            value="NAO"
          />
          <label for="produto_com_preco" style="margin-right: 10px"
            >Produto com preço</label
          >
          <input
            type="radio"
            id="produto_sob_consulta"
            v-model="state.produto.sob_consulta"
            value="SIM"
            @change="limparPreco()"
          />
          <label for="produto_sob_consulta">Preço sob consulta</label><br />
        </div>
        <div class="row">
          <div class="col-md-2">
            <label for="nome">REF</label>
            <input
              id="nome"
              type="text"
              class="form-control"
              v-model="state.produto.ref"
            />
          </div>
          <div class="col-md-3">
            <label for="status">Categoria</label>
            <select v-model="state.produto.categoria_id" class="form-select">
              <option
                v-for="categoria in state.categorias"
                :key="categoria.id"
                :value="categoria.id"
              >
                {{ categoria.nome }}
              </option>
            </select>
          </div>
          <div class="col-md-4">
            <label for="nome">Nome</label>
            <input
              id="nome"
              type="text"
              class="form-control"
              v-model="state.produto.nome"
              @blur="carregarURN($event.target.value)"
            />
          </div>
          <div class="col-md-3">
            <label for="urn">URN</label>
            <input
              id="urn"
              type="text"
              class="form-control"
              v-model="state.produto.urn"
            />
          </div>
        </div>
        <h4>Preços praticados</h4>
        <div>
          <br />
          <input
            @change="
              if ($event.target.checked) {
                state.produto.tem_desconto = 'SIM';
                state.produto.preco_desconto = '';
              } else state.produto.tem_desconto = 'NAO';
            "
            type="checkbox"
            id="tem_desconto"
            v-model="state.produto.check_tem_desconto"
          /><label for="tem_desconto"
            >Produto com desconto.
            <button
              title="Marque se o produto tiver desconto."
              for="tem_desconto"
            >
              (?)
            </button></label
          >
        </div>
        <div class="row">
          <div class="col-md-3">
            <label for="urn"
              >Preço
              <button title="Preço normal do produto.">(?)</button></label
            >
            <input
              :disabled="state.produto.sob_consulta == 'SIM'"
              id="urn"
              type="text"
              class="form-control"
              v-maska
              data-maska="0,99"
              data-maska-tokens="0:\d:multiple|9:\d:optional"
              v-model="state.produto.preco"
            />
          </div>
          <div class="col-md-3">
            <label for="urn"
              >Preço Desconto
              <button title="Preço do produto com desconto.">(?)</button></label
            >
            <input
              :disabled="
                state.produto.sob_consulta == 'SIM' ||
                !state.produto.check_tem_desconto
              "
              id="urn"
              type="text"
              class="form-control"
              v-maska
              data-maska="0,99"
              data-maska-tokens="0:\d:multiple|9:\d:optional"
              v-model="state.produto.preco_desconto"
            />
          </div>
        </div>
        <h4>Preços praticados</h4>
        <div class="row">
          <div class="col-md-3">
            <label for="urn">Peso (kg)</label>
            <input
              id="urn"
              type="text"
              class="form-control"
              v-model="state.produto.peso"
            />
          </div>
          <div class="col-md-3">
            <label for="urn">Altura (cm)</label>
            <input
              id="urn"
              type="text"
              class="form-control"
              v-model="state.produto.medida_altura"
            />
          </div>
          <div class="col-md-3">
            <label for="urn">Largura (cm)</label>
            <input
              id="urn"
              type="text"
              class="form-control"
              v-model="state.produto.medida_largura"
            />
          </div>
          <div class="col-md-3">
            <label for="urn">Profundidade (cm)</label>
            <input
              id="urn"
              type="text"
              class="form-control"
              v-model="state.produto.medida_profundidade"
            />
          </div>
          <div class="col-md-12">
            <label for="status">Descrição</label>
            <textarea
              class="form-control"
              style="width: 100%"
              v-model="state.produto.descricao"
            ></textarea>
          </div>
          <div class="col-md-2">
            <label for="status">Status</label>
            <select v-model="state.produto.status" class="form-select">
              <option value="ATIVO">Ativo</option>
              <option value="INATIVO">Inativo</option>
            </select>
          </div>
          <div class="col-md-2">
            <label for="status">Destaques da Semana</label>
            <select v-model="state.produto.destaque1" class="form-select">
              <option value="SIM">Sim</option>
              <option value="NAO">Não</option>
            </select>
          </div>
          <div class="col-md-2">
            <label for="status">Lançamentos</label>
            <select v-model="state.produto.destaque2" class="form-select">
              <option value="SIM">Sim</option>
              <option value="NAO">Não</option>
            </select>
          </div>
          <div class="col-md-2">
            <label for="status">Mais Vendidos</label>
            <select v-model="state.produto.destaque3" class="form-select">
              <option value="SIM">Sim</option>
              <option value="NAO">Não</option>
            </select>
          </div>
          <div class="col-md-4">
            <div class="input_img">
              <label>Imagem</label>
              <input
                type="file"
                class="form-control"
                @change="adicionarImagens"
              />
              <span v-if="state.erro_imagem" class="text-danger"
                >Este campo é obrigatório</span
              >
            </div>
          </div>
          <div class="col-md-12" v-if="state.imagens.length > 0">
            <div class="row">
              <div
                class="col-md-2"
                v-for="(objImagem, index) in state.imagens"
                :key="objImagem"
                style="display: flex"
              >
                <img :src="objImagem.imagem" class="imagem" />
                <div class="div_btn_x mt-4">
                  <button class="btn_remover" @click="removerImagem(index)">
                    <i class="bi bi-x-lg"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="text-right mt-10">
          <button
            type="button"
            @click="salvarProduto"
            class="btn btn-success mr-1"
          >
            Salvar
          </button>
          <router-link to="/admin/produtos">
            <button type="button" class="btn btn-danger">
              Cancelar
            </button></router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import services from "../../services/axios";
export default {
  components: {},
  setup() {
    definePageMeta({
      middleware: "auth",
    });
    const router = useRouter();
    const state = reactive({
      produto: {
        id: "",
        marca_id: "",
        categoria_id: "",
        nome: "",
        ref: "",
        url: "",
        genero: "",
        status: "ATIVO",
        destaque1: "NAO",
        destaque2: "NAO",
        destaque3: "NAO",
        atributo: [{}],
        sob_consulta: "NAO",
        tem_desconto: "NAO",
        check_tem_desconto: false,
      },
      atributo: {
        nome: "",
        valor: "",
      },
      produto_id: "",
      array_atributo: [],
      atributo: {},

      imagem: {},
      imagens: [],
      imagens_deletar: [],
    });
    const authStore = useAuthStore();
    const token = authStore.token;
    onMounted(() => {
      fetchCategoria();
      if (router.currentRoute._value.params.id != undefined) {
        fetchProduto();
      }
    });
    function carregarURN(nome) {
      var urn = nome.replace(/\s/g, "-");
      state.produto.urn = urn.toLowerCase();
    }
    function limparPreco() {
      state.preco.value = null;
      state.preco_desconto.value = null;
      state.preco_pix.value = null;
      state.preco_desconto_pix.value = null;
    }
    async function fetchCategoria() {
      try {
        const { data } = await services.categoria.getAll({ token });
        state.categorias = data;
      } catch (error) {
        console.log(error);
      }
    }
    async function fetchProduto() {
      try {
        const { data } = await services.produtos.getById({
          id: router.currentRoute._value.params.id,
          token,
        });
        state.produto = data.id;
        state.produto = data;
        state.array_atributo = data.atributos;
        state.imagens = data.imagens;
      } catch (error) {
        console.log(error);
      }
    }
    async function salvarProduto() {
      console.log(
        "Qtd de imagens para deletar: " + state.imagens_deletar.length
      );
      if (state.imagens_deletar.length > 0) {
        try {
          console.log(token);
          const { data } = await services.produtos.deletarImagens({
            imagens: state.imagens_deletar,
            token,
          });
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      }
      services.produtos
        .update({ produto: state.produto, token })
        .then((data_produto) => {
          for (let i = 0; i < state.imagens.length; i++) {
            if (
              state.imagens[i].file != undefined &&
              state.imagens[i].file != null
            ) {
              var formImagem = new FormData();
              formImagem.append("produto_id", data_produto.data.id);
              formImagem.append("imagem", state.imagens[i].file);
              services.produtos
                .salvarImagem({ formImagem, token })
                .then((data) => {
                  console.log(data);
                })
                .catch((error) => {
                  console.log(error);
                  return;
                });
            }
          }
          router.push("/admin/produtos");
        })
        .catch((error) => {
          console.log(error);
          var valores = Object.values(error.response.data.errors);
          valores.forEach((element) => {
            element.forEach((element2) => {
              console.log(element2);
            });
          });
        });
    }
    async function adicionarImagens(event) {
      for (let index = 0; index < event.target.files.length; index++) {
        const element = event.target.files[index];
        var objImagem = new Object();
        objImagem.id = index + 1;
        objImagem.file = element;
        objImagem.imagem = URL.createObjectURL(element);
        state.imagens.push(objImagem);
        console.log(objImagem);
      }
    }
    async function removerImagem(index_imagem) {
      //  console.log(state.imagens[index_imagem].id);
      if (state.imagens[index_imagem].id != undefined) {
        state.imagens_deletar.push(state.imagens[index_imagem].id);
      }
      console.log(state.imagens_deletar);
      state.imagens.splice(index_imagem, 1);
      document.querySelector('input[type="file"]').value = null;
    }

    //FUNÇÕES ADD ATRIBUTOS
    async function addTributo() {
      var atributo = {};
      atributo.nome = state.atributo.nome;
      atributo.valor = state.atributo.valor;
      state.array_atributo.push(atributo);
    }
    async function deletarPlano(atributo_i) {
      state.array_atributo.splice(atributo_i, 1);
    }
    async function saveAtributo() {
      console.log(state.array_atributo);
      try {
        await services.atributos.save({
          produto_id: state.produto_id,
          atributos: state.array_atributo,
          token,
        });
      } catch (error) {
        console.log(error);
        var valores = Object.values(error.response.data.errors);
        alert(valores);
      }
    }
    return {
      salvarProduto,
      adicionarImagens,
      removerImagem,
      router,
      state,
      saveAtributo,
      deletarPlano,
      addTributo,
      carregarURN,
      limparPreco,
    };
  },
};
</script>
<style scoped>
.nav-tabs .nav-item.show .nav-link,
.nav-tabs .nav-link.active {
  color: #cfb14e;
  font-weight: 600;
}

.nav-tabs .nav-link {
  color: #000;
  font-weight: 600;
}

h4 {
  color: #000;
}

h5 {
  color: #fff;
}

.card-header {
  background-color: #000;
  color: #fff;
  border-radius: 0px;
}

label {
  color: #000;
  font-size: 12pt;
  margin-bottom: 0;
  margin-top: 5px;
}

input {
  border: solid 1px #000;
}

textarea {
  border: solid 1px #000;
  resize: none;
}

select {
  border: solid 1px #000;
}

.card {
  border: solid 1px #000;
  border-radius: 5px;
  background-color: #fff;
}

.imagem {
  width: 100%;
  object-fit: cover;
  margin-top: 1em;
  height: auto;
}

.btn_remover {
  border: none;
  outline: none;
  background-color: #ff0000;
  padding: 5px 10px;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  border-radius: 5px;
  transition: all ease 0.1s;
  box-shadow: 0px 5px 0px 0px #f57171;
}

.btn_remover:active {
  transform: translateY(5px);
  box-shadow: 0px 0px 0px 0px #f57171;
}

.div_btn_x {
  margin-left: 10px;
}
</style>