import axios from 'axios';
import AuthService from './auth'
import LoginService from './login';
import ClientesService from './clientes';
import UsuariosService from './usuarios';
import CasesService from './cases';
import MidiasSociaisService from './midias_sociais';
import ContatoService from './contato';
import EmpresaService from './empresa';
import PaginaService from './pagina';
import BannersService from './banners';
import CategoriaService from './categoria';
import GruposServices from './grupos';
import ProdutosServices from './produtos';
import NewslettersServices from './newsletters';
import EnderecoService from './endereco';
import ProjetosService from './projetos';
import coresService from './cores';
import coresProdutosService from './cores_podutos';
import tamanhosService from './tamanhos';
import representantesService from './representantes';
import marcasService from './marcas';
import variacoesService from './variacoes';
import atributosService from './atributos';
import cepService from './cep';
const API_ENVS = {
  production: '',
  development: '',
  local: 'https://backend.masterpecasagricolas.com.br/api',
  cep: 'http://viacep.com.br/ws/',
}
const httpClient = axios.create({
  baseURL: API_ENVS.local
})
const httpCep = axios.create({
  baseURL: API_ENVS.cep
})
export default {
  auth: AuthService(httpClient),
  login: LoginService(httpClient),
  clientes: ClientesService(httpClient),
  usuarios: UsuariosService(httpClient),
  cases: CasesService(httpClient),
  midias_sociais: MidiasSociaisService(httpClient),
  contato: ContatoService(httpClient),
  empresa: EmpresaService(httpClient),
  pagina: PaginaService(httpClient),
  banners: BannersService(httpClient),
  categoria: CategoriaService(httpClient),
  grupos: GruposServices(httpClient),
  produtos: ProdutosServices(httpClient),
  newsletters: NewslettersServices(httpClient),
  endereco: EnderecoService(httpClient),
  projetos: ProjetosService(httpClient),
  cores: coresService(httpClient),
  coresProdutos: coresProdutosService(httpClient),
  tamanhos: tamanhosService(httpClient),
  representantes: representantesService(httpClient),
  variacoes: variacoesService(httpClient),
  atributos: atributosService(httpClient),
  cep: cepService(httpCep),
  marcas: marcasService(httpClient),
}