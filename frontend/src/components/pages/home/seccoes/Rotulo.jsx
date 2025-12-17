import {livros} from "../../../../data/bd.json"
import {LuClock, LuStar} from "react-icons/lu"
import { HiOutlineTrendingUp } from "react-icons/hi";

const livrosDisponiveis = livros.filter(livro => livro.estado === "Disponível");
const qtdLivrosDisponiveis = livrosDisponiveis.length;

const livrosReservados = livros.filter(livro => livro.estado === "Reservado" || livro.estado === "Pendente");
const qtdLivrosReservados = livrosReservados.length;

const totalLivros = livros.length;

export const dados = [
    {icone: <HiOutlineTrendingUp size={35}/>, label:"Livros Disponíveis", valor: qtdLivrosDisponiveis},
    {icone: <LuClock size={35}/>, label:"Minhas Reservas", valor: qtdLivrosReservados},
    {icone: <LuStar size={35}/>, label:"Total no Acervo", valor: totalLivros}
];