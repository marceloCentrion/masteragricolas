import {
  BorderAllIcon,
  AlertCircleIcon,
  CircleDotIcon,
  BoxMultiple1Icon,
  AdjustmentsHorizontalIcon,
  LayoutDashboardIcon,
  CarCraneIcon,
  CarCrashIcon,
  GridDotsIcon,
  TagIcon,
  PictureInPictureIcon,
  PaperclipIcon,
  BuildingBankIcon,
  UserIcon,
  PlaneIcon,
  BoxIcon,
  ClipboardTextIcon,
  BasketIcon,
  VariableIcon,
  PhoneCallIcon

} from 'vue-tabler-icons';

export interface menu {
  header?: string;
  title?: string;
  icon?: any;
  to?: string;
  chip?: string;
  chipBgColor?: string;
  chipColor?: string;
  chipVariant?: string;
  chipIcon?: string;
  children?: menu[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
}

const sidebarItem: menu[] = [
  { header: 'Home' },
  {
    title: "Dashboard",
    icon: LayoutDashboardIcon,
    to: "/admin/dashboard",
  },
  { header: 'Clientes' },
  {
    title: "Clientes",
    icon: ClipboardTextIcon,
    to: "/admin/clientes",
  },
  {
    title: "Pedidos",
    icon: BasketIcon,
    to: "/admin/pedidos",
  },
  { header: 'Produtos' },
    {
    title: "Produtos",
    icon: BoxIcon,
    to: "/admin/produtos",
  },
    {
    title: "Categorias",
    icon: TagIcon,
    to: "/admin/categorias",
  },
  {
    title: "Grupos",
    icon: GridDotsIcon,
    to: "/admin/grupos",
  },
  {
    title: "Marcas",
    icon: GridDotsIcon,
    to: "/admin/marcas",
  },



  { header: 'Banners e Páginas' },

  {
    title: "Banners",
    icon: PictureInPictureIcon,
    to: "/admin/banners",
  },

  {
    title: "Categoria Banners",
    icon: PaperclipIcon,
    to: "/admin/categoria-banners",
  },
  { header: 'Outros' },

  {
    title: "Newsletters",
    icon: PlaneIcon,
    to: "/admin/newsletters",
  },
  {
    title: "Contatos",
    icon: PhoneCallIcon,
    to: "/admin/contatos",
  },
  {
    title: "Empresa",
    icon: BuildingBankIcon,
    to: "/admin/empresa",
  },
  {
    title: "Usários",
    icon: UserIcon,
    to: "/admin/usuarios",
  },
];

export default sidebarItem;
