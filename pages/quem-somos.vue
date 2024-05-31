<template>
  <top :tela="'ecommerce'" />

  <img src="/images/site/img_fale_conosco.jpg" class="banner" />

  <div class="quem-somos">
    <h1>Quem Somos</h1>
    <section class="introducao">
      <p>
        A Master Peças Agrícolas deu inicio em susas atividades no ano de 2015
        em Maringá / PR, Distribuindo pelas multimarcas para o mercado
        alternativo e sempre focada no compromisso com o cliente, levano
        agilidade e qualidade em seus produtos, pontualidade na entrega e com
        atendimento especial. Trabalhando com a distribuição de peças para
        máquinas agrícolas como plantadeiras, colheitadeiras, pulverizadores e
        implementos.
      </p>
    </section>
  </div>
</template>

<script>
export default {
  setup() {
    definePageMeta({
      layout: "site",
    });
    useServerHead({
      title: "MASTER - Quem Somos",
    });
  },
};
</script>

<style scoped>
.quem-somos {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  color: #333;
}

h1,
h2 {
  font-family: "Poppins", sans-serif;
  font-size: 32px;
  font-weight: bold;
  line-height: 44px;
  color: #000;
  margin-bottom: 5px;
}

.introducao,
.missao-visao-valores,
.nossa-historia,
.equipe {
  margin-bottom: 40px;
}

p {
  line-height: 1.6;
  font-family: "Poppins", sans-serif;
  color: #000;
}

ul {
  list-style-type: disc;
  padding-left: 20px;
}

ul li {
  margin-bottom: 10px;
}
.banner {
  width: 100%;
}
</style>
