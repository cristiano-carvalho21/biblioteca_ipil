import {HiOutlineSquares2X2, HiOutlineBookOpen, HiOutlineUsers, HiOutlineArrowPath, HiOutlineCalendarDays,
HiOutlineFolder, HiOutlineChartBar, HiOutlineCog6Tooth, HiOutlineShieldCheck, HiOutlineArrowRightEndOnRectangle} from "react-icons/hi2"



    export const camposMain = [
        {icone:<HiOutlineSquares2X2 size={30} />, caminho:"dashboard", label:"Dashboard"},
        {icone:<HiOutlineBookOpen size={30} />, caminho:"gestao", label:"Gestão de livros"},
        {icone:<HiOutlineUsers size={30} />, caminho:"estudantes", label:"Estudantes"},
        {icone:<HiOutlineArrowPath size={30} />, caminho:"emprestimos", label:"Empréstimos"},
        {icone:<HiOutlineCalendarDays size={30} />, caminho:"acervo", label:"Reservas"},
        {icone:<HiOutlineFolder size={30} />, caminho:"categorias_autores", label:"Categórias & Autores"},
        {icone:<HiOutlineChartBar size={30} />, caminho:"relatorios", label:"Relatórios"}
    ];

    export const camposBotton = [
        {icone:<HiOutlineCog6Tooth size={30} />, caminho:"configuracoes", label:"Configurações"},
        {icone:<HiOutlineShieldCheck size={30} />, caminho:"admins", label:"Administradores"},
        {icone:<HiOutlineArrowRightEndOnRectangle size={30} />, caminho:"dashboard", label:"Sair"}
    ];