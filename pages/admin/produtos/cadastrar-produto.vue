<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h3>Cadastrar Produto</h3>
      </div>

      <div class="card-body">
        <div>
          <input type="radio" id="produto_com_preco" v-model="state.sob_consulta" value="NAO" />
          <label for="produto_com_preco" style="margin-right: 10px">Produto com preço</label>
          <input type="radio" id="produto_sob_consulta" v-model="state.sob_consulta" value="SIM"
            @change="limparPreco()" />
          <label for="produto_sob_consulta">Preço sob consulta</label><br />
        </div>
        <div class="row">
          <div class="col-md-2">
            <label for="nome">REF</label>
            <input id="nome" type="text" class="form-control" v-model="state.ref.value" />
            <span v-if="state.ref.errorMessage" class="block font-medium txt_vermelho">
              Preencha este campo
            </span>
          </div>
          <div class="col-md-3">
            <label for="status">Categoria</label>
            <select v-model="state.categoria.value" class="form-select">
              <option v-for="categoria in state.categorias" :key="categoria.id" :value="categoria.id">
                {{ categoria.nome }}
              </option>
            </select>
            <span v-if="state.categoria.errorMessage" class="block font-medium txt_vermelho">
              Preencha este campo
            </span>
          </div>
          <!--
          <div class="col-md-2">
            <label for="status">Marca</label>
            <select v-model="state.marca.value" class="form-select">
              <option
                v-for="marca in state.marcas"
                :key="marca.id"
                :value="marca.id"
              >
                {{ marca.nome }}
              </option>
            </select>
            <span
              v-if="state.marca.errorMessage"
              class="block font-medium txt_vermelho"
            >
              Preencha este campo
            </span>
          </div>
          -->
          <div class="col-md-4">
            <label for="nome">Nome</label>
            <input id="nome" type="text" class="form-control" @blur="carregarURN($event.target.value)"
              v-model="state.nome.value" />
            <span v-if="state.nome.errorMessage" class="block font-medium txt_vermelho">
              Preencha este campo
            </span>
          </div>
          <div class="col-md-3">
            <label for="urn">URN</label>
            <input id="urn" type="text" class="form-control" v-model="state.urn.value" />
            <span v-if="state.urn.errorMessage" class="block font-medium txt_vermelho">
              Preencha este campo
            </span>
          </div>
        </div>
        <h4>Preços Praticados</h4>
        <div>
          <br />
          <input @change="
              if ($event.target.checked) {
            state.tem_desconto = 'SIM';
            state.preco_desconto.value = '';
          } else state.tem_desconto = 'NAO';
            " type="checkbox" id="tem_desconto" v-model="state.check_tem_desconto" /><label for="tem_desconto">Produto
            com desconto.
            <button title="Marque se o produto tiver desconto." for="tem_desconto">
              (?)
            </button></label>
        </div>
        <div class="row">
          <div class="col-md-3">
            <label for="urn">Preço
              <button title="Preço normal do produto.">(?)</button></label>
            <input id="urn" type="text" class="form-control" v-model="state.preco.value" v-maska
              :readonly="state.sob_consulta == 'SIM'" :class="state.sob_consulta == 'SIM' ? 'cor_desabled' : ''"
              data-maska="0,99" data-maska-tokens="0:\d:multiple|9:\d:optional" />
            <span v-if="state.preco.errorMessage" class="block font-medium txt_vermelho">
              Preencha este campo
            </span>
          </div>
          <div class="col-md-3">
            <label for="urn">Preço Desconto
              <button title="Preço do produto com desconto.">(?)</button></label>
            <input id="urn" type="text" class="form-control" v-model="state.preco_desconto.value"
              :class="state.sob_consulta == 'SIM' ? 'cor_desabled' : ''" v-maska data-maska="0,99"
              data-maska-tokens="0:\d:multiple|9:\d:optional" :disabled="state.sob_consulta == 'SIM' || !state.check_tem_desconto
                " />
            <span v-if="state.preco_desconto.errorMessage" class="block font-medium txt_vermelho">
              Preencha este campo
            </span>
          </div>
          <!--
          <div class="col-md-2">
            <label for="urn"
              >Preço Pix
              <button title="Preço do produto no Pix.">(?)</button></label
            >
            <input
              id="urn"
              type="text"
              class="form-control"
              :class="state.sob_consulta == 'SIM' ? 'cor_desabled' : ''"
              v-model="state.preco_pix.value"
              :readonly="state.sob_consulta == 'SIM'"
              v-maska
              data-maska="0,99"
              data-maska-tokens="0:\d:multiple|9:\d:optional"
            />
            <span
              v-if="state.preco_pix.errorMessage"
              class="block font-medium txt_vermelho"
            >
              Preencha este campo
            </span>
          </div>

          <div class="col-md-2">
            <label for="status"
              >Parcelas
              <button title="Quantidade de parcelas aceitas no cartão.">
                (?)
              </button></label
            >
            <select v-model="state.parcelas" class="form-select">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="2">3</option>
              <option value="3">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </div>          -->
        </div>
        <h4>Medidas</h4>
        <div class="row">
          <div class="col-md-3">
            <label for="urn">Peso (kg)</label>
            <input id="urn" type="text" class="form-control" v-model="state.peso.value" />
            <span v-if="state.peso.errorMessage" class="block font-medium txt_vermelho">
              Preencha este campo
            </span>
          </div>
          <div class="col-md-3">
            <label for="urn">Altura (cm)</label>
            <input id="urn" type="text" class="form-control" v-model="state.medida_altura.value" />
            <span v-if="state.medida_altura.errorMessage" class="block font-medium txt_vermelho">
              Preencha este campo
            </span>
          </div>
          <div class="col-md-3">
            <label for="urn">Largura (cm)</label>
            <input id="urn" type="text" class="form-control" v-model="state.medida_largura.value" />
            <span v-if="state.medida_largura.errorMessage" class="block font-medium txt_vermelho">
              Preencha este campo
            </span>
          </div>
          <div class="col-md-3">
            <label for="urn">Profundidade (cm)</label>
            <input id="urn" type="text" class="form-control" v-model="state.medida_profundidade.value" />
            <span v-if="state.medida_profundidade.errorMessage" class="block font-medium txt_vermelho">
              Preencha este campo
            </span>
          </div>
          <div class="col-md-12 mt-10">
            <label for="">Descrição</label>
            <editor v-model="state.descricao" />
          </div>
          <div class="col-md-2">
            <label for="status">Status</label>
            <select v-model="state.status" class="form-select ">
              <option value="ATIVO">Ativo</option>
              <option value="INATIVO">Inativo</option>
            </select>
          </div>
          <div class="col-md-2">
            <label for="status">Destaques da Semana</label>
            <select v-model="state.destaque1" class="form-select">
              <option value="SIM">Sim</option>
              <option value="NAO">Não</option>
            </select>
          </div>
          <div class="col-md-2">
            <label for="status">Lançamentos</label>
            <select v-model="state.destaque2" class="form-select">
              <option value="SIM">Sim</option>
              <option value="NAO">Não</option>
            </select>
          </div>
          <div class="col-md-2">
            <label for="status">Mais Vendidos</label>
            <select v-model="state.destaque3" class="form-select">
              <option value="SIM">Sim</option>
              <option value="NAO">Não</option>
            </select>
          </div>
          <div class="col-md-4">
            <div class="input_img">
              <label>Imagem</label>
              <input type="file" class="form-control" @change="adicionarImagens" />
              <span v-if="state.erro_imagem" class="text-danger">Este campo é obrigatório</span>
            </div>
          </div>
          <div class="col-md-12" v-if="state.imagens.length > 0">
            <div class="row">
              <div class="col-md-2" v-for="(objImagem, index) in state.imagens" :key="objImagem" style="display: flex">
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
          <button type="button" @click="salvarProduto" class="btn btn-success mr-1">
            Salvar
          </button>
          <router-link to="/admin/produtos">
            <button type="button" class="btn btn-danger">
              Cancelar
            </button></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import services from "../../services/axios";
export default {
  setup() {
    definePageMeta({
      middleware: "auth",
    });
    const router = useRouter();
    const authStore = useAuthStore();
    const token = authStore.token;
    const state = reactive({
      categoria: {
        value: "",
        errorMessage: false,
      },
      nome: {
        value: "",
        errorMessage: false,
      },
      ref: {
        value: "",
        errorMessage: false,
      },
      urn: {
        value: "",
        errorMessage: false,
      },
      peso: {
        value: "",
        errorMessage: false,
      },
      preco: {
        value: "",
        errorMessage: false,
      },
      preco_desconto: {
        value: "",
        errorMessage: false,
      } /*
      preco_pix: {
        value: "",
        errorMessage: false,
      },
      preco_desconto_pix: {
        value: "",
        errorMessage: false,
      },*/,
      medida_altura: {
        value: "",
        errorMessage: false,
      },
      medida_largura: {
        value: "",
        errorMessage: false,
      },
      medida_profundidade: {
        value: "",
        errorMessage: false,
      },
      descricao: "",
      status: "ATIVO",
      destaque1: "NAO",
      destaque2: "NAO",
      destaque3: "NAO",
      sob_consulta: "NAO",
      tem_desconto: "NAO",
      imagem: {},
      imagens: [],
      imagens_deletar: [],
      atributo: {
        nome: "",
        valor: "",
      },
      produto_id: null,
      array_atributo: [],
      atributo: {},
    });
    onMounted(() => {
      fetchCategoria();
      fetchMarca();
    });

    function carregarURN(nome) {
      var urn = nome.replace(/\s/g, "-");
      state.urn.value = urn.toLowerCase();
    }
    function limparPreco() {
      state.preco.value = null;
      state.preco_desconto.value = null;
      //state.preco_pix.value = null;
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
    async function fetchMarca() {
      try {
        const { data } = await services.marcas.getAll({ token });
        state.marcas = data;
      } catch (error) {
        console.log(error);
      }
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
    async function salvarProduto() {
      var erro = false;

      if (!state.ref.value) {
        state.ref.errorMessage = true;
        erro = true;
      }

      if (!state.categoria.value) {
        state.categoria.errorMessage = true;
        erro = true;
      }

      if (!state.nome.value) {
        state.nome.errorMessage = true;
        erro = true;
      }

      if (!state.urn.value) {
        state.urn.errorMessage = true;
        erro = true;
      }

      if (state.sob_consulta == "NAO") {
        if (!state.preco.value) {
          state.preco.errorMessage = true;
          erro = true;
        }
        /* if (!state.preco_pix.value) {
          state.preco_pix.errorMessage = true;
          erro = true;
        }*/
        if (state.tem_desconto == "SIM") {
          if (!state.preco_desconto.value) {
            state.preco_desconto.errorMessage = true;
            erro = true;
          }
        }
      }
      /*
      if (!state.parcelas.value) {
        state.parcelas.errorMessage = true;
        erro = true;
      }*/

      if (!state.peso.value) {
        state.peso.errorMessage = true;
        erro = true;
      }

      if (!state.medida_altura.value) {
        state.medida_altura.errorMessage = true;
        erro = true;
      }

      if (!state.medida_largura.value) {
        state.medida_largura.errorMessage = true;
        erro = true;
      }

      if (!state.medida_profundidade.value) {
        state.medida_profundidade.errorMessage = true;
        erro = true;
      }
      if (erro) return;

      var produto_req = {};
      produto_req.ref = state.ref.value;
      produto_req.categoria_id = state.categoria.value;
      produto_req.marca_id = 1;
      produto_req.nome = state.nome.value;
      produto_req.urn = state.urn.value;
      produto_req.preco = state.preco.value;
      produto_req.preco_desconto = state.preco_desconto.value;
      produto_req.preco_pix = state.preco.value; //state.preco_pix.value;
      produto_req.parcelas = 1; //state.parcelas;
      produto_req.peso = state.peso.value;
      produto_req.medida_altura = state.medida_altura.value;
      produto_req.medida_largura = state.medida_largura.value;
      produto_req.medida_profundidade = state.medida_profundidade.value;
      produto_req.descricao = state.descricao;
      produto_req.status = state.status;
      produto_req.destaque1 = state.destaque1;
      produto_req.destaque2 = state.destaque2;
      produto_req.destaque3 = state.destaque3;
      produto_req.ncm = state.ncm;
      produto_req.ean = state.ean;
      produto_req.sob_consulta = state.sob_consulta;
      produto_req.tem_desconto = state.tem_desconto;

      services.produtos
        .save({ produto: produto_req, token })
        .then((data_produto) => {
          for (let i = 0; i < state.imagens.length; i++) {
            var formImagem = new FormData();
            state.produto_id = data_produto.data.produto.id;
            formImagem.append("produto_id", data_produto.data.produto.id);
            formImagem.append("imagem", state.imagens[i].file);
            services.produtos
              .salvarImagem({ formImagem, token })
              .then((data) => {
                console.log(data);
              });
          }
          router.push("/admin/produtos");
        })
        .catch((error) => {
          console.log(error);
          var valores = Object.values(error.response.data.errors);
          valores.forEach((element) => {
            element.forEach((element2) => {
              alert(element2);
            });
          });
        });
    }
    async function verficaProdutoId() {
      if (!state.produto_id) {
        alert(
          "Produto não cadastrado. Cadastre um produto antes de adicionar atributos."
        );
      } else {
        // Lógica para quando o produtoId existe
        // ...
        // Navegue para a aba de atributos apenas se o produtoId existir
        router.push({ name: "atributos-tab" });
      }
    }
    //FUNÇÕES ADD ATRIBUTOS
    // async function addTributo() {
    //   var atributo = {};
    //   atributo.nome = state.atributo.nome;
    //   atributo.valor = state.atributo.valor;
    //   state.array_atributo.push(atributo);
    // }
    // async function deletarPlano(atributo_i) {
    //   state.array_atributo.splice(atributo_i, 1);
    // }
    // async function saveAtributo() {
    //   console.log(state.array_atributo);
    //   try {
    //     await services.atributos.save({
    //       produto_id: state.produto_id,
    //       atributos: state.array_atributo,
    //       token,
    //     });
    //   } catch (error) {
    //     console.log(error);
    //     var valores = Object.values(error.response.data.errors);
    //     alert(valores);
    //   }
    // }

    //FUNÇÕES ADD VARIACOES
    // async function fetchVairacoes() {
    //   try {
    //     const { data } = await services.variacoes.getAll({ token });
    //     console.log(data)
    //     state.variacoes = data;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    // function setNomeVari(valor) {
    //   state.vari_nome_selecionado = valor;
    // }
    // async function addVari() {
    //   var obj_variacao = {};
    //   obj_variacao.valor_variacao_id = state.variacao_id;
    //   obj_variacao.nome = state.vari_nome_selecionado;
    //   console.log(obj_variacao)
    //   state.array_variacao.push(obj_variacao);
    // }
    // async function deleVari(tamanho_i) {
    //   state.array_variacao.splice(tamanho_i, 1);
    // }
    // async function salvarVariacao() {
    //   console.log('Click'); console.log(state.produto_id); console.log(state.array_variacao)
    //   await services.variacoes.saveVariacaoId({
    //     produto_id: state.produto_id,
    //     variacoes: state.array_variacao,
    //     token,
    //   }).then((data) => {
    //     console.log(data);
    //     //router.push('/admin/produtos');
    //   }).catch((error) => {
    //     console.log(error);
    //     var valores = Object.values(error.response.data.errors);
    //     alert(valores);
    //   })
    // }
    return {
      salvarProduto,
      adicionarImagens,
      removerImagem,
      router,
      state,
      verficaProdutoId,
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

.txt_vermelho {
  color: #dc3545;
}

.nav-tabs .nav-link {
  color: #000;
  font-weight: 600;
}

h4 {
  color: #000;
}

.cor_desabled {
  background-color: #ccc;
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