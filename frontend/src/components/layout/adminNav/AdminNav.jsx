import InputGroup from "../../tags/inputs/InputGroup";
import { HiOutlineBell, HiOutlineQuestionMarkCircle } from "react-icons/hi2";

function AdminNav()
{
    return(
        <header className="flex gap-5 bg-branco-100 w-full">
            <div className="w-3/4">
                <InputGroup page="catalogo" type="text" placeholder="Busque por livros, estudantes e empréstimos" />
            </div>
            <div className="flex items-center gap-3">
                <HiOutlineBell size={30}/>
                <HiOutlineQuestionMarkCircle size={30}/>
            </div>
            <div>
                <div className="flex items-center gap-2 w-64">
                    <div className="rounded-full w-10 h-10 bg-laranja-500 text-branco-100 pt-1 text-center text-xl">CC</div>
                    <label className="text-xl">Cristiano Carvalho</label>
                </div>
                <label className="ms-12">Super Admin</label>
            </div>
        </header>
    );
}
export default AdminNav;