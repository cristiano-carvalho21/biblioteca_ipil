import { FiSettings } from "react-icons/fi";

function CardConfiguracoes()
{

    return(
        <main className="h-screen ms-5">
            <section className="flex items-center gap-5 ">
                <FiSettings size={30} className="text-laranja-500 ms-5"/> <h1 className="text-2xl">Configurações da Conta</h1>
            </section>
            <section className=" mt-5 ms-5 space-y-16">
                <article className="space-y-2">
                    <h1 className="text-lg">Alterar Senha</h1>
                    <p className="text-cinza-900">Atualize sua senha de acesso</p>
                </article>
                <article className="space-y-2">
                    <h1 className="text-lg">Notificações</h1>
                    <p className="text-cinza-900">Gerencie suas preferência de notificações</p>
                </article>
                <article className="space-y-2">
                    <h1 className="text-lg">Privacidade</h1>
                    <p className="text-cinza-900">Configurações de privacidade de dados</p>
                </article>
            </section>
        </main>
    );
}
export default CardConfiguracoes;