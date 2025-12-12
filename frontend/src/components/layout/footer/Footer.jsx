import { Link } from "react-router-dom";
import {AiOutlineMail} from "react-icons/ai";
import {HiOutlineHashtag} from "react-icons/hi"
import {LuClock} from "react-icons/lu"

function Footer()
{
    return(
        <div className=" bg-cinza-900 text-branco-100 mt-40 h-96 grid grid-cols-3 ps-10 pt-10">
            <article className="space-y-5">
                <div className="flex items-center gap-2 flex-wrap">
                    <img src="/image/footer.webp" alt="IPIL" className="w-20 h-16 object-cover" />
                    <h1 className="text-2xl">Biblioteca IPIL</h1>
                </div>
                <div>
                    <p>
                        A Biblioteca IPIL é um espaço acadêmico, dedicado à promoção do conhecimento e da investigação,
                        oferecendo um vasto acervo de recursos bibliográficos para apoiar a comunidade comunicativa
                    </p>
                </div>
 
            </article>

            <article className="space-y-5  ms-5">
                <h1 className="text-2xl">Navegação Rápida</h1>
                <div className="flex flex-col space-y-4">
                    <Link to="/home">Home</Link>
                    <Link to="/catalogo">Catálogo</Link>
                    <Link to="/reservas">Reservas</Link>
                    <Link to="/exposicoes">Exposições</Link>
                    <Link to="/institucional">Institucional</Link>
                </div>
            </article>

            <article className="space-y-5">
                <h1 className="text-2xl">Contactos</h1>
                <div>
                    <label className="flex items-center  gap-2">
                        <AiOutlineMail size={25} className="text-laranja-500"/>
                        <span>
                            <p className="text-lg">Email:</p>
                        </span>
                    </label>
                    <p className="text-sm ms-9">biblioteca@ipil.ao</p>
                </div>
                <div>
                    <label className="flex items-center gap-2">
                        <HiOutlineHashtag size={25} className="text-laranja-500"/>
                        <span>
                            <p className="text-lg">Telefone:</p>
                        </span>
                    </label>
                    <p className="text-sm ms-9">974107262</p>
                </div>
                <div>
                    <label className="flex items-center gap-2">
                        <HiOutlineHashtag size={25} className="text-laranja-500"/>
                        <span>
                            <p className="text-lg">Localização:</p>
                        </span>
                    </label>    
                    <p className="text-sm ms-9">Istituto Politécnico Industrial de Luanda</p>
                </div>
                <div>
                    <label className="flex items-center gap-2">
                        <LuClock size={25} className="text-laranja-500"/>
                        <span>
                            <p className="text-lg">Horário de Atendimento:</p>
                        </span>
                    </label>
                    <p className="text-sm ms-9">Segunda à Sexta: 08h00 - 18h00 <br />
                            Sábado: 08h00 - 13h00
                    </p>
                </div>
            </article>
        </div>
    );
}
export default Footer;