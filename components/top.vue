<template>
  <div>
    <nav class="navbar navbar-expand-lg" style="width: 100%">
      <div class="container">
        <a class="navbar-brand" href="/"><img src="/images/site/logo.png" /></a>
        <button
          class="navbar-toggler btn-cell"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="bi bi-list icon-cell"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <div class="container-fluid">
            <div class="div_content">
              <div class="option">
                <a href="/">
                  <div class="option_a">
                    <p>Home</p>
                  </div>
                </a>
                <a href="/produtos">
                  <div class="option_a">
                    <p>Produtos</p>
                  </div>
                </a>
                <a href="/quem-somos">
                  <div class="option_a">
                    <p>Quem Somos</p>
                  </div>
                </a>
                <a href="/contato">
                  <div class="option_a">
                    <p>Fale Conosco</p>
                  </div>
                </a>
              </div>
              <div class="icons">
                <form>
                  <button @click="buscar()" type="button" class="btn-lupa">
                    <i class="bi bi-search"></i>
                  </button>
                  <input
                    type="text"
                    placeholder="O que está procurando?"
                    v-model="state.busca"
                  />
                </form>
                <div class="div_icon">
                  <a href="/carrinho"><i class="bi bi-cart3"></i></a>
                </div>
                <div class="div_icon" v-if="!state.client_token">
                  <a href="/login"> <i class="bi bi-person"></i></a>
                </div>
                <div class="dropdown" v-else>
                  <a
                    class="dropdown-toggle"
                    role="button"
                    id="dropdownMenuLink"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span
                      ><i class="bi bi-person"></i>
                      {{ state.client_nome }}</span
                    >
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <li>
                      <a class="dropdown-item" href="/meus-pedidos"
                        ><i class="bi bi-basket i"></i> Meus Pedidos</a
                      >
                    </li>
                    <li>
                      <a class="dropdown-item" href="/minha-conta"
                        ><i class="bi bi-gear i"></i> Configuração da Conta</a
                      >
                    </li>
                    <li>
                      <a class="dropdown-item" href="" @click="deslogar"
                        ><i class="bi bi-door-open-fill"></i> Sair</a
                      >
                    </li>
                    <li></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  setup() {
    const router = useRouter();
    const storage = useClienteAuthStore();
    const state = reactive({
      client_nome: null,
      client_token: null,
      busca: "",
    });
    onMounted(() => {
      state.client_token = storage.client_token;
      state.client_nome = storage.client_nome;
    });

    async function deslogar() {
      if (confirm("Deseja realmente sair?")) {
        try {
          storage.client_id = null;
          storage.client_token = null;
          storage.client_nome = null;
          router.go(0);
          return;
        } catch (error) {
          console.log(error);
        }
      }
    }
    async function buscar() {
      state.buscando = state.busca;
      router.push("/produtos/" + state.busca);
      history.pushState({}, "", "/produtos/" + state.busca);
      state.busca = "";
    }
    return {
      state,
      deslogar,
      buscar,
    };
  },
};
</script>

<style scoped>
nav {
  background: #263c28;
}

.div_content {
  display: flex;
  justify-content: space-around;
}

.icons {
  display: flex;
  justify-content: center;
  align-items: center;
}

.div_icon i {
  font-size: 22px;
  color: #ffffff;
  transition: 0.5s;
}

.div_icon i:hover {
  font-size: 22px;
  color: #3ccf4e;
}

.div_icon {
  margin-left: 1rem;
}

.collapse {
  justify-content: center;
}

form {
  display: flex;
}

input {
  width: 100%;
  background: #3ccf4e4f;
  color: #fff;
  border-radius: 0px 4px 4px 0px;
  padding: 10px;
  outline: none;
}

.btn-lupa {
  background: #3ccf4e4f;
  border-radius: 4px 0px 0px 4px;
  color: #fff;
  padding: 10px;
}

a {
  text-decoration: none;
}

.dropdown-item:focus {
  background: #00a859;
  color: #000;
}

#dropdownMenuLink {
  color: #fff;
}
#dropdownMenuLink:hover {
  color: #00a859;
}

#dropdownMenuLink i {
  font-size: 22px;
  color: #fff;
  transition: 0.3s;
}

#dropdownMenuLink i:hover {
  font-size: 22px;
  color: #00a859;
}

.option {
  display: flex;
  justify-content: center;
  align-items: center;
}

.option_a {
  margin-left: 10px;
  margin-right: 10px;
}

.option_a p {
  font-family: "Poppins", sans-serif;
  color: #ffffff;
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 0;
  transition: 0.3s;
}

.option_a p:hover {
  color: #00a859;
}

.option_a i {
  color: #cfb14e;
  font-weight: 400;
  font-size: 16px;
}

.option_a {
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon-cell {
  color: #00a859;
  font-size: 25pt;
}

.btn-cell {
  border: solid 1px #ffffff1f;
}

@media (min-width: 992px) and (max-width: 1200px) {
  .option_a p {
    line-height: 1;
    font-size: 14px;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .option {
    padding: 15px;
  }

  .option_a p {
    line-height: 1;
  }

  .div_content {
    display: block;
  }
}

@media (min-width: 576px) and (max-width: 767px) {
  .option {
    padding: 15px;
  }

  .option_a p {
    line-height: 1;
  }

  .div_content {
    display: block;
  }
}

@media (max-width: 575px) {
  .option {
    padding: 10px;
  }

  .option_a p {
    line-height: 1;
    font-size: 14px;
  }

  .div_content {
    display: block;
  }
}
</style>