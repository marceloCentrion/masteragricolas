<template>
  <top :tela="'ecommerce'" />
  <div class="container">
    <div class="quem-somos mt-5">
      <h1>Quem Somos</h1>
      <section class="introducao">
        <div class="row">
          <div class="col-sm-9">
            <p>
              Em tempos de tecnologia avançada e compras online, os agricultores
              foram se adequando as novas tecnologias tanto em maquinário e se
              aperfeiçoando no desenvolvimento para sempre produzir mais e
              melhor, sempre buscando facilitar o seu dia-a-dia diminuindo
              custo.
            </p>
            <p>
              Nasce a Master Peças Agrícolas, uma loja com atendimento online,
              que busca facilitar as compras de peças agrícolas do plantio à
              colheita, reduzindo o custo na manutenção de máquinas, com valores
              significativamente mais baixos e entrega para todo o Brasil.
            </p>
            <p>
              A Master Peças Agricolas trabalha com uma ampla linha de peças
              para plantadeira, colheitadeiras, pulverizadores de linhas
              conceituadas no mercado Alternativo , visando a qualidade e
              durabilidade das peças. Desenvolvendo e buscando sempre novos
              itens no mercado para melhor atender nosso cliente de uma forma
              rápida e eficaz.
            </p>
            <p>
              O setor comercial da Master Peças Agrícolas é altamente treinado e
              sempre disposto a atender para tirar dúvidas da melhor forma
              possível para que nossos clientes sintam-se satisfeitos e
              confiantes , assim nos tornando, juntos, um comércio de parceria e
              confiança. São essas características que garantem o crescimento da
              empresa e permite que possamos oferecer aos clientes total
              segurança, produtos com extrema qualidade seguindo as tendências
              do mercado, além da plena capacidade de rápido atendimento.
            </p>
            <p>
              Missão: Se tornar uma empresa de referência no ramo de peças, pela
              ótima parceria de negócios, pronto atendimento e produtos com alto
              padrão de qualidade, proporcionando aos nossos clientes satisfação
              na compra, garantindo assim sustentabilidade e crescimento futuro.
              Visão: Ser uma empresa atuante na distribuição de peças e
              reconhecida pela excelência de seus produtos e serviços e pronto
              atendimento.
            </p>
            <p>Valores: Qualidade , Excelência e Competência.</p>
          </div>
          <div class="col-sm-3">
            <img
              src="/images/image.png"
              alt="Imagem de Login"
              style="width: 100%"
            />
            <img
              src="/images/john-deer.jpg"
              alt="Imagem de Login"
              style="width: 100%; margin-top: 5px"
            />
          </div>
        </div>
      </section>
    </div>
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
  margin-top: 15px;
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
