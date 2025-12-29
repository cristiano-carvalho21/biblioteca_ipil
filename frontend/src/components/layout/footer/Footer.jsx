import { Link } from "react-router-dom";
import { rotas } from "../Rotas";
import { info } from "../Info";

function Footer()
{
    return(
        <div className=" bg-cinza-900 text-branco-100 mt-40 h-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ps-10 pt-10 pb-10 space-y-5">
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

            <article className="space-y-5  md:ms-20">
                <h1 className="text-2xl">Navegação Rápida</h1>
                <div className="flex flex-col space-y-4">
                    {rotas.map(rota => (
                        <Link to={rota.rota}>{rota.label}</Link>
                    ))}
                </div>
            </article>

            <article className="space-y-5">
                <h1 className="text-2xl">Contactos</h1>
                {info.map(inf => (
                <div>
                    <label className="flex items-center  gap-2">
                        {inf.icone}
                        <span>
                            <p className="text-lg"> {inf.label} </p>
                        </span>
                    </label>
                    <p className="text-sm ms-9"> {inf.info} </p>
                </div>
                ))}

            </article>
        </div>
    );
}
export default Footer;