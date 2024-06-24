<template>
  <div>
    <section
      id="section_1"
      class="d-none d-lg-block"
      style="position: relative"
    >
      <carousel
        :items-to-show="1"
        :items-to-scroll="1"
        :snap-align="'start'"
        :autoplay="6000"
        :transition="4000"
        :wrapAround="true"
        @mouseover="stopAutoplay"
        @mouseleave="startAutoplay"
      >
        <slide v-for="banner in state.banner_topo" :key="banner.id">
          <img id="imagem-banner" :src="banner.imagem" class="d-block w-100" />
        </slide>
      </carousel>
      <div class="div_linear_gradiant">
        <top />
        <div class="container">
          <div class="content_1">
            <div class="text-center">
              <h1>MASTER PEÇAS AGRÍCOLAS!</h1>
              <p>
                Explore nossa vasta gama de peças agrícolas para manter suas
                operações no campo funcionando sem problemas. Desde tratores até
                implementos especializados, temos tudo o que você precisa para
                otimizar seu desempenho agrícola.
              </p>
              <div class="mt-12">
                <a class="btn-explorar" href="/produtos"
                  ><i class="bi bi-search"></i> Explorar Agora</a
                >
                <a
                  class="btn-orcamento"
                  target="_blank"
                  :href="
                    'https://wa.me/55' +
                    state.empresa.telefone +
                    '?text=Ol%C3%A1%21++Cheguei+at%C3%A9+aqui+atrav%C3%A9s+do+site+Comparts+e+estou+interessado+em+fazer+um+or%C3%A7amento.+Gostaria+de+saber+mais+sobre+os+servi%C3%A7os+oferecidos+e+os+pre%C3%A7os+praticados.'
                  "
                  ><i class="bi bi-whatsapp"></i> Orçamento Rápido</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="section_1" class="d-md-block d-lg-none" style="position: relative">
      <carousel :items-to-show="1" :items-to-scroll="1" :snap-align="'start'" :autoplay="6000" :transition="4000"
        :wrapAround="true" @mouseover="stopAutoplay" @mouseleave="startAutoplay">
        <slide v-for="banner in state.banner_topo" :key="banner.id">
          <img id="imagem-banner" :src="banner.imagem_cel" class="d-block w-100" />
        </slide>
      </carousel>
      <div class="div_linear_gradiant">
        <top />
        <div class="container">
          <div class="content_1">
            <div class="text-center">
              <h1>Aumente a Eficiência da sua Operação!</h1>
              <p>
                Descubra como nossas peças de alta qualidade podem impulsionar
                sua produção. Encontre soluções para plantadeiras,
                colheitadeiras e pulverizadores aqui!
              </p>
              <div class="mt-12">
                <a class="btn-explorar" href="/produtos"><i class="bi bi-search"></i> Explorar Agora</a>
                <a class="btn-orcamento" target="_blank" :href="'https://wa.me/55' +
                  state.empresa.telefone +
                  '?text=Ol%C3%A1%21++Cheguei+at%C3%A9+aqui+atrav%C3%A9s+do+site+Comparts+e+estou+interessado+em+fazer+um+or%C3%A7amento.+Gostaria+de+saber+mais+sobre+os+servi%C3%A7os+oferecidos+e+os+pre%C3%A7os+praticados.'
                  "><i class="bi bi-whatsapp"></i> Orçamento Rápido</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <btnWhatsapp />
    <div class="container">
      <div class="row">
        <div class="col-lg-4 col-md-6">
          <div class="quad">
            <div class="div_flex">
              <div>
                <img src="./../public/images/site/Frame.png" alt="Frame" />
              </div>
              <div>
                <h3>Quer tirar dúvidas</h3>
                <p>Fale com um consultor</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 d-md-none d-lg-block">
          <div class="quad_light">
            <div class="div_flex">
              <div>
                <img src="./../public/images/site/Frame3.png" alt="Frame" />
              </div>
              <div>
                <h3>Whatsapp Exclusivo</h3>
                <p>Para Clientes Master</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6">
          <div class="quad">
            <div class="div_flex">
              <div>
                <img src="./../public/images/site/Frame2.png" alt="Frame" />
              </div>
              <div>
                <h3>Nossos Feedback</h3>
                <p>Veja o que estão falando</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6 offset-md-3 d-none d-md-block d-lg-none">
          <div class="quad_light">
            <div class="div_flex">
              <div>
                <img src="./../public/images/site/Frame3.png" alt="Frame" />
              </div>
              <div>
                <h3>Whatsapp Exclusivo</h3>
                <p>Para Clientes Master</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section id="section_2">
      <div class="container">
        <div class="content2">
          <p>LINHA COMPLETA</p>
          <h1>Semeadeiras</h1>
          <div class="row">
            <div
              class="col-lg-3 col-md-6"
              v-for="produto in displayedProdutos"
              :key="produto.id"
            >
              <cardLinha :produto="produto" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="container">
      <!--
      <div class="content_sub">
        <p>PRODUTOS</p>
        <h1>Navegue por Subcategoria</h1>
        <div class="row">
          <carousel>
            <slide>
              <div
                class="col-md-3 col-sm-4 col-6"
                v-for="grupo in state.categorias_destaque"
                :key="grupo.id"
              >
                <div class="quad_cat">
                  <img
                    :src="grupo.imagem"
                    alt="Imagem Categoria"
                    style="max-height: 150px; width: auto; margin-bottom: 10px"
                  />
                  <h4>{{ grupo.nome }}</h4>
                </div>
              </div>
            </slide>
            <template #addons>
              <navigation />
              <pagination />
            </template>
</carousel>
</div>
</div>
-->
    </div>
    <section id="section_3">
      <div class="container">
        <div class="content2">
          <p>PRODUTOS</p>
          <h1>Mais Vendidos</h1>
          <div class="row">
            <div
              class="col-lg-3 col-md-6"
              v-for="produto in displayedProdutos"
              :key="produto.id"
            >
              <cardProduto :produto="produto" />
            </div>
          </div>
          <div class="pagination">
            <button @click="previousPage" :disabled="currentPage === 1">
              <i class="bi bi-chevron-left"></i>
            </button>
            <span>{{ currentPage }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages">
              <i class="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
    <section id="section_4">
      <div class="div_lienar_truck">
        <div class="container">
          <div class="row">
            <div class="col-md-8">
              <div class="content_3">
                <div>
                  <h2>QUEM SOMOS</h2>
                  <h3>
                    A Master é líder no mercado de peças agrícolas,
                    simplificando a aquisição de componentes essenciais para o
                    ciclo agrícola.
                  </h3>
                  <p>
                    Oferecemos uma ampla gama de peças para plantadeiras,
                    colheitadeiras, pulverizadores, plataformas, grades, pontas
                    de pulverização, rolamentos, filtros, correntes e correias
                    de diversas linhas e marcas. Nosso foco está em auxiliar
                    nossos clientes a superar desafios, oferecendo preços justos
                    e qualidade superior.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="backgroud_sec_8">
      <div class="container">
        <div class="content_sec_8">
          <h1>Perguntas Frequentes</h1>
          <p>
            Navegue por esta seção informativa para encontrar soluções rápidas e
            claras para as perguntas mais comuns.
          </p>
        </div>
        <!--
        <div class="container mt-5 pb-12">
          <div @click="toggleSection(0)" class="question-answer">
            <h5 class="question">
              O risco de lesão no cross é maior?
              <i :class="expandedSection === 0 ? 'bi bi-dash' : 'bi bi-plus'" class="arrow-icon"></i>
            </h5>
            <Collapse :when="expandedSection === 0">
              <p class="response">
                O Risco de se lesionar durante uma aula é o mesmo que em qualquer modalidade, sobretudo quando
                praticada sem orientação profissional pode acontecer de você se lesionar em algum exercício. Mas o
                risco não é inevitável como muitos dizem por aí.
              </p>
            </Collapse>
          </div>
          <div @click="toggleSection(1)" class="question-answer">
            <h5 class="question">
              Qualquer um pode praticar cross?
              <i :class="expandedSection === 1 ? 'bi bi-dash' : 'bi bi-plus'" class="arrow-icon"></i>
            </h5>
            <Collapse :when="expandedSection === 1">
              <p class="response">
                Assim como outros esportes, qualquer um pode praticar, mas
                sempre respeitando seus limites.
              </p>
            </Collapse>
          </div>
          <div @click="toggleSection(2)" class="question-answer">
            <h5 class="question">
              O cross traz benefícios para a saúde?
              <i :class="expandedSection === 2 ? 'bi bi-dash' : 'bi bi-plus'" class="arrow-icon"></i>
            </h5>
            <Collapse :when="expandedSection === 2">
              <p class="response">
                A prática do Cross auxilia na melhora do condicionamento
                físico e cardiorrespiratório além de prover ganho de massa
                magra e perda de peso.
              </p>
            </Collapse>
          </div>
        </div>
-->
      </div>
    </section>
    <section id="section_form">
      <div class="div_img">
        <img src="@/public/images/site/back_form.png" alt="back_form" />
      </div>
      <div class="form-container">
        <form>
          <div class="form-title">
            <h2>FICOU COM DÚVIDA?</h2>
            <p>Preencha os campos a seguir e nos envie sua mensagem</p>
          </div>
          <div class="form-group">
            <label for="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Digite seu nome completo"
            />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Digite seu email"
            />
          </div>
          <div class="form-group">
            <label for="mensagem">Mensagem</label>
            <textarea
              id="mensagem"
              name="mensagem"
              rows="4"
              placeholder="Digite sua mensagem"
            ></textarea>
          </div>
          <div class="form-group">
            <button type="submit">ENVIAR</button>
          </div>
        </form>
      </div>
    </section>
    <div class="banner_news">
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <div class="content_news">
              <h1>fique por dentro</h1>
              <h3>das <span style="color: #3ccf4e">novidades!</span></h3>
              <p>Cadastre seu email para ficar atualizado.</p>
            </div>
          </div>
          <div class="col-md-8">
            <div class="div_input_news">
              <input
                type="text"
                class="input_news"
                placeholder="SEU E-MAIL"
                v-model="state.newsletter.email"
              />
              <button type="button" @click="envNews()">Cadastrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { asyncServices } from "./../services/fetch";
import axios from "~/services/axios";
import { Collapse } from "vue-collapsed";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

const currentPage = ref(1);
const itemsPerPage = 4;
const expandedSection = ref(null);
const toggleSection = (sectionIndex) => {
  expandedSection.value =
    expandedSection.value === sectionIndex ? null : sectionIndex;
};
const state = reactive({
  produtos_home: { destaque2: [] },
  banner_meio: [{}],
  banner_topo: [{}],
  grupo_destaque_um: [{}],
  grupo_destaque_dois: [{}],
  newsletter: { email: "" },
  loader: false,
  empresa: { telefone: "" },
});
useHead({
  title: "MASTER - Home",
});
definePageMeta({
  layout: "site",
});

fetchProdutos();
fetchBannerTopo();
fetchBannerMeio();
fetchGrupo1();
fetchEmpresa();
fetchCat();

async function fetchGrupo1() {
  try {
    const { data } = await axios.grupos.getGrupoUm();

    // Copiar o array original para não modificá-lo diretamente
    // const grupos = [...data];

    // // Embaralhar o array
    // grupos.sort(() => Math.random() - 0.5);

    // // Limitar aos dois primeiros elementos
    // state.grupo_destaque_um = grupos.slice(0, 3);
    state.grupo_destaque_um = data;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
async function fetchEmpresa() {
  try {
    const { data } = await axios.empresa.getSite();
    state.empresa = data;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
async function fetchCat() {
  try {
    const { data } = await axios.categoria.getAllSite();
    state.categorias_destaque = data;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
async function fetchProdutos() {
  try {
    const { data } = await asyncServices.produtos.getProdutosHome();
    state.produtos_home = data;
  } catch (error) {
    console.log(error);
  }
}
async function fetchBannerMeio() {
  try {
    const { data } = await asyncServices.banner.getBannerMeio();
    state.banner_meio = data;
  } catch (error) {
    console.log(error);
  }
}
async function fetchBannerTopo() {
  try {
    const { data } = await asyncServices.banner.getBannerTop();
    state.banner_topo = data;
  } catch (error) {
    console.log(error);
  }
}
async function envNews() {
  await axios.newsletters
    .enviar({ newsletter: state.newsletter })
    .then((data) => {
      if (
        data.data.id == null ||
        data.data.id == undefined ||
        data.data.id == ""
      ) {
        alert("Newsletter não enviada!!!");
        return;
      } else {
        alert("Newsletter  enviada!!!");
      }
      state.newsletter.nome = "";
      state.newsletter.email = "";
    })
    .catch((error) => {
      var valores = Object.values(error.response.data.errors);
      valores.forEach((element) => {
        element.forEach((element2) => {
          alert(element2);
        });
        state.newsletter.nome = "";
        state.newsletter.email = "";
        return;
      });
    });
}

const totalPages = computed(() =>
  Math.ceil(state.produtos_home.destaque2.length / itemsPerPage)
);
// Calcula os produtos a serem exibidos na página atual
const displayedProdutos = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return state.produtos_home.destaque2.slice(startIndex, endIndex);
});
// Funções para navegar entre as páginas
function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}
function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}
</script>
<style scoped>
#triangulo-para-direita {
  width: 0;
  height: 0;
  border-top: 0px solid transparent;
  border-bottom: 30px solid transparent;
  border-left: 500px solid rgba(197, 197, 197, 1);
}

#triangulo-para-esquerda {
  width: 100%;
  height: 0;
  border-top: 30px solid transparent;
  border-bottom: 0px solid transparent;
  border-right: 500px solid rgba(197, 197, 197, 1);
}

#section_1 {
  width: 100%;
  height: 100vh;
  background-position: center;
  position: relative;
  background-size: cover;
}

.div_linear_gradiant {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.603);
}

#imagem-banner {
  width: 100%;
  height: 100vh;
  object-fit: cover;
}

.content_1 {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

.content_1 h1 {
  color: #3ccf4e;
  font-weight: 900;
  font-size: 90px;
  font-family: "Poppins", sans-serif;
}

.content_1 p {
  color: rgba(255, 255, 255, 1);
  font-weight: 500;
  font-size: 16px;
  line-height: 1.4;
  font-family: "Poppins", sans-serif;
}

.btn-explorar {
  padding: 16px 24px;
  border-radius: 4px;
  color: rgba(255, 255, 255, 1);
  background: #3ccf4e;
  border: 1px solid #3ccf4e;
  text-decoration: none;
  font-weight: 700;
  font-family: "Poppins", sans-serif;
  margin-right: 10px;
  transition: 0.3s;
}

.btn-explorar:hover {
  padding: 16px 24px;
  border-radius: 4px;
  color: rgba(255, 255, 255, 1);
  background: #263c28;
  border: 1px solid #3ccf4e;
  text-decoration: none;
  font-weight: 700;
  font-family: "Poppins", sans-serif;
}

.btn-orcamento {
  padding: 16px 24px;
  border-radius: 4px;
  color: rgba(255, 255, 255, 1);
  background: #263c28;
  border: 1px solid #3ccf4e;
  text-decoration: none;
  font-weight: 700;
  font-family: "Poppins", sans-serif;
  transition: 0.3s;
}

.btn-orcamento:hover {
  padding: 16px 24px;
  border-radius: 4px;
  color: rgba(255, 255, 255, 1);
  background: #3ccf4e;
  border: 1px solid #3ccf4e;
  text-decoration: none;
  font-weight: 700;
  font-family: "Poppins", sans-serif;
  transition: 0.5s;
}

.quad {
  background: #263c28;
  width: 100%;
  padding: 20px;
  margin-top: 4rem;
  border-radius: 5px;
}

.quad h3 {
  color: #3ccf4e;
  font-weight: 700;
}

.quad p {
  color: #fff;
  font-weight: 600;
  margin-bottom: 0;
}

.quad_light {
  background: #3ccf4e;
  width: 100%;
  padding: 20px;
  margin-top: 4rem;
  border-radius: 5px;
}

.quad_light h3 {
  color: #263c28;
  font-weight: 700;
}

.quad_light p {
  color: #fff;
  font-weight: 600;
  margin-bottom: 5px;
}

.div_flex {
  display: flex;
  justify-content: space-around;
  alihn-items: center;
}

#section_2 {
  margin-top: 4rem;
}

.content_sub h1 {
  font-family: "Poppins", sans-serif;
  margin-bottom: 3rem;
  font-size: 32px;
  font-weight: bold;
  line-height: 44px;
  text-align: center;
  color: #3ccf4e;
}

.content_sub P {
  font-family: "Poppins", sans-serif;
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 400;
  line-height: 1;
  text-align: center;
  color: #263c28;
}

.content2 h1 {
  font-family: "Poppins", sans-serif;
  margin-bottom: 3rem;
  font-size: 32px;
  font-weight: bold;
  line-height: 44px;
  text-align: left;
  color: #3ccf4e;
}

.content2 P {
  font-family: "Poppins", sans-serif;
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 400;
  line-height: 1;
  text-align: left;
  color: #263c28;
}

.imagem_categoria {
  max-height: 150px;
  width: auto;
  margin-bottom: 10px;
}

.quad_cat {
  background: rgba(76, 76, 76, 1);
  text-align: center;
  border-radius: 15px;
  width: 100%;
  padding: 20px;
}

.quad_cat h4 {
  color: rgba(255, 255, 255, 1);
  font-weight: 600;
  font-size: 20px;
}

#section_3 {
  margin-top: 4rem;
  margin-bottom: 4rem;
}

.rectangle_cat {
  background: #263c28;
  padding: 5rem;
  margin-top: 2rem;
}

.pagination {
  justify-content: space-around;
  align-items: center;
}

.pagination button {
  background-color: #263c28;
  color: #fff;
  padding: 5px 10px;
  border-radius: 4px;
}

.pagination span {
  font-family: "Poppins", sans-serif;
  color: #f7c35f;
  font-size: 20px;
  font-weight: 700;
}

#section_4 {
  margin-top: 4rem;
  background-image: url("/public/images/site/truck.png");
  height: 80vh;
  background-size: cover;
  background-position: center;
}

.div_lienar_truck {
  background: linear-gradient(90deg, #6d8c54 19%, #1e26170a 63.72%);
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content_3 {
  display: flex;
  justify-content: left;
  align-items: center;
  height: 50vh;
}

.content_3 h2 {
  color: #263c28;
  font-weight: 500;
  margin-bottom: 2rem;
}

.content_3 h3 {
  color: rgba(255, 255, 255, 1);
  font-weight: 700;
  font-size: 50px;
}

.content_3 p {
  color: rgba(255, 255, 255, 1);
  font-weight: 500;
  font-size: 16px;
  line-height: 1.5;
}

.banner_news {
  width: 100%;
  height: 300px;
  background-color: #263c28;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content_news h1 {
  color: #fff;
  font-family: "Poppins", sans-serif;
  font-weight: bolder;
  font-size: 50px;
}

.content_news h3 {
  color: #ffffff;
  font-size: 23px;
  font-weight: bold;
  font-family: "Poppins", sans-serif;
}

.content_news h3 span {
  color: #fff;
  font-size: 23px;
  font-weight: bold;
  font-family: "Poppins", sans-serif;
}

.content_news p {
  font-family: "Poppins", sans-serif;
  color: #e4e4eb;
  font-weight: lighter;
}

.div_input_news {
  display: flex;
  margin-top: 3rem;
}

.input_news {
  background-color: #334b35;
  border-radius: 4px;
  color: #fff;
  font-weight: 600;
  padding: 10px 20px;
  width: 70%;
  outline: none;
}

.div_input_news button {
  font-family: "Poppins", sans-serif;
  color: rgb(255, 255, 255);
  font-weight: bold;
  background: #3ccf4e;
  padding: 10px 20px;
  border-radius: 4px;
  transition: 0.3s;
  margin-left: 2rem;
}

.backgroud_sec_8 {
  background-color: #263c28;
  padding-top: 3rem;
  padding-bottom: 10px;
}

.content_sec_8 h1 {
  color: #3ccf4e;
  font-weight: 700;
  font-size: 40px;
  font-family: "Livvic", sans-serif;
}

.content_sec_8 p {
  color: #ffff;
  margin-top: 1rem;
  margin-bottom: 2rem;
  font-family: "Livvic", sans-serif;
}

.question-answer {
  padding: 20px;
  border-top: 1px solid #fff;
  cursor: pointer;
}

.question {
  font-weight: bold;
  color: #fff;
  margin-bottom: 0;
}

.question i {
  color: #3ccf4e;
  float: right;
}

.response {
  margin-top: 10px;
  color: #f0f0f0;
  font-weight: 500;
}

hr {
  background-color: #fff;
  height: 2px;
  border: none;
}

#section_form {
  position: relative;
  height: 100vh;
  width: 100%;
}

.form-container {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 5px;
  width: 800px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.form-title {
  text-align: center;
  font-family: "Poppins", sans-serif;
}

.form-title h2 {
  color: #3ccf4e;
  font-weight: 700;
}

.form-title p {
  color: gray;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #000;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  font-family: "Poppins", sans-serif;
}

.form-group input:focus,
.form-group textarea:focus {
  border: 1px solid #3ccf4e;
}

.form-group textarea {
  resize: none;
}

.form-group button {
  padding: 10px 15px;
  background-color: #3ccf4e;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  width: 100%;
  font-weight: 700;
}

.form-group button:hover {
  background-color: #263c28;
}

.div_img img {
  width: 100%;
  height: 550px;
  object-fit: cover;
}

@media (min-width: 992px) and (max-width: 1200px) {
  .content_1 {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  .content_1 h1 {
    font-size: 40px;
  }

  .content_1 h3 {
    width: 60%;
    text-align: center;
  }

  .quad_cat {
    padding: 10px;
  }

  .content_3 h1 {
    font-size: 60px;
  }

  .banner_news {
    background-position: right;
  }

  .quad h3 {
    font-size: 20px;
  }

  .quad_light h3 {
    font-size: 20px;
  }

  .quad_light {
    padding: 25px;
  }

  .content_3 h3 {
    font-size: 40px;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  #section_2 {
    margin-top: 4rem;
  }

  .content_1 {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  .content_1 h1 {
    font-size: 38px;
  }

  .content_3 h1 {
    font-size: 50px;
  }

  .quad h3 {
    font-size: 20px;
  }

  .quad_light h3 {
    font-size: 20px;
  }

  .quad_light {
    padding: 25px;
    margin-top: 1rem;
  }

  .content_3 h3 {
    font-size: 40px;
  }

  .form-container {
    width: 550px;
  }

  .content_news h1 {
    font-size: 40px;
  }
}

@media (min-width: 576px) and (max-width: 767px) {
  #section_2 {
    margin-top: 4rem;
  }

  .content_1 {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  .content_1 h1 {
    font-size: 40px;
    line-height: 1;
    margin-bottom: 1rem;
  }

  .quad_cat {
    margin-top: 12px;
  }

  .div_input_news {
    margin-top: 0rem;
  }

  .quad_light,
  .quad {
    margin-top: 1rem;
  }

  .content_3 h3 {
    font-size: 30px;
  }

  .form-container {
    width: 400px;
  }
}

@media (max-width: 575px) {
  .btn-orcamento {
    display: block;
    margin-top: 10px;
  }

  .btn-explorar {
    display: block;
    margin-right: 0;
  }

  #triangulo-para-direita {
    display: none;
  }

  #triangulo-para-esquerda {
    display: none;
  }

  #section_2 {
    margin-top: 4rem;
  }

  .div_input_news {
    margin-top: 0rem;
  }

  .quad_cat {
    margin-top: 12px;
  }

  .content_1 {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  .content_1 h1 {
    font-size: 30px;
    line-height: 1;
    margin-bottom: 1rem;
    text-align: center;
  }

  .content_1 p {
    width: 100%;
    text-align: center;
    font-size: 15px;
  }

  .icon_div {
    margin-top: 1rem;
  }

  .content_1 h3 {
    font-size: 30px;
    text-align: center;
    width: 100%;
  }

  .content_rectangle h3 {
    font-size: 32px;
  }

  .content_3 {
    text-align: center;
  }

  .content_3 h1 {
    font-size: 50px;
  }

  .subsection {
    display: block;
  }

  #img_colheita {
    width: 100%;
    object-fit: cover;
    height: 400px;
  }

  .content_grenn {
    padding: 4rem;
    position: relative;
    z-index: 100;
  }

  .content_grenn h2 {
    color: #fff;
    font-size: 30px;
    font-weight: bolder;
    text-align: center;
  }

  .quad_abs {
    left: -40px;
  }

  .quad_abs2 {
    left: -5px;
    z-index: 2;
    bottom: 10px;
  }

  .content_grenn2 {
    margin-top: 2rem;
  }

  .content_grenn2 h2 {
    font-size: 30px;
  }

  .content_information h1 {
    font-size: 40px;
  }

  #img_sub2 {
    width: 100%;
  }

  .quad_light,
  .quad {
    margin-top: 1rem;
  }

  #section_4 {
    height: 50vh;
  }

  .div_lienar_truck {
    height: 50vh;
  }

  .content_3 h2 {
    margin-bottom: 15px;
  }

  .content_3 h3 {
    font-size: 12pt;
  }

  .content_3 p {
    font-size: 10pt;
  }

  .content_sec_8 h1 {
    font-size: 30px;
  }

  .question {
    font-size: 10pt;
  }

  .form-container {
    width: 90%;
  }

  .content_news h1 {
    font-size: 30px;
  }

  .div_input_news button {
    margin-left: 1rem;
    padding: 10px 10px;
  }
}
</style>