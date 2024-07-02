<template>
  <div class="card-card">
    <div id="card">
      <div id="div_img" v-if="produto.imagens.length <= 0">
        <img id="img" src="/images/site/produto-sem-imagem-fundo.webp" style="padding: 10%" />
      </div>
      <div id="div_img" v-else>
        <img id="img" :src="produto.imagens[0].imagem" />
      </div>
      <div id="div-titulo">
        <p id="titulo">{{ produto.nome }}</p>
      </div>
      <hr />
      <div class="div-preco" v-if="produto.sob_consulta !== 'NAO'">
        <p id="preco">R$ {{ produto.preco }}</p>
        <!-- <p id="parcelas">ou <span class="spn-parcelas">{{ produto.parcelas }}x</span> de <span class="valor-parcela"> {{ valorTotal }} </span> sem juros</p> -->
      </div>
      <div class="div-preco" v-else>
        <p id="preco">SOB CONSULTA</p>
      </div>
      <a :href="'/produto/' + produto.urn">
        <button class="btn_details" type="button">COMPRAR</button>
      </a>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    produto: { type: Object, required: false },
  },
  setup() { },
};
</script>

<style scoped>
hr {
  background: #fff;
  height: 2px;
}

#card {
  width: 100%;
  padding: 25px;
  background: #263c28;
  margin-bottom: 1rem;
  border: solid 1px #263c28;
  border-radius: 10px;
}

#titulo {
  line-height: 1;
  font-size: 16px;
  font-weight: semibold;
  letter-spacing: 0px;
  text-align: left;
  color: #ffffff;
  font-family: "Poppins", sans-serif;
}

#img {
  width: 100%;
  height: 200px;
  object-fit: contain;
}

#div_img {
  text-align: center;
  padding: 10;
}

#div-titulo {
  height: 2.2em;
  margin-bottom: 5px;
  margin-top: 10px;
}

.btn_details {
  background: #3ccf4e;
  color: rgba(255, 255, 255, 1);
  width: 100%;
  padding: 8px;
  font-weight: 700;
  border-radius: 4px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  transition: 0.5s;
  font-family: "Poppins", sans-serif;
  margin-top: 10px;
}

.btn_details:hover {
  background: #2f9c3c;
}

#preco {
  color: #3ccf4e;
  font-family: "Poppins", sans-serif;
  font-weight: bold;
  font-size: 16pt;
  margin-bottom: 0;
}

@media (min-width: 992px) and (max-width: 1200px) {
  #img {
    width: 100%;
    height: 150px;
  }

  #desconto {
    font-size: 20px;
  }

  #card {
    padding: 15px;
  }

  #titulo {
    font-size: 15px;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .card-card {}

  #img {
    width: 300px;
    height: 300px;
  }
}

@media (min-width: 576px) and (max-width: 767px) {
  .card-card {
    margin-right: 4em;
    margin-left: 4em;
    margin-bottom: 1em;
  }

  #img {
    width: 300px;
    height: 300px;
  }
}

@media (max-width: 575px) {
  .card-card {
    margin-right: 1em;
    margin-left: 1em;
    margin-bottom: 1em;
  }

  #img {
    width: 100%;
    height: 200px;
    object-fit: contain;
  }
}
</style>