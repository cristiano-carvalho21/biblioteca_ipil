import { dados } from "./Rotulo";

function Rotulos()
{
    return(
        
        <section className="flex flex-wrap w-full justify-between mt-10 p-10 gap-5">
             
             { dados.map(dado => (       
                <div className="flex gap-2 p-7 rounded-lg bg-branco-100">
                    <button className="bg-laranja-100 text-laranja-500 p-3 rounded-lg"> {dado.icone} </button>
                    <span>
                    <p className="text-lg">{dado.valor}</p>
                    <p> {dado.label} </p>
                    </span>
                </div>
             ))
             }    
                 
        </section>
    );
}
export default Rotulos;