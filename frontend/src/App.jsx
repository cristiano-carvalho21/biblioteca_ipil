//import './App.css'
import Header from "./components/layout/header/Header.jsx"
import Footer from "./components/layout/footer/Footer.jsx"
import Home from "./components/pages/home/Home.jsx"
import Catalogo from "./components/pages/catalogo/Catalogo.jsx"
import Reservas from "./components/pages/reservas/Reservas.jsx"
import Exposicoes from "./components/pages/exposicoes/Exposicoes.jsx"
import MeuPerfil from "./components/pages/meuperfil/MeuPerfil.jsx"
import Institucional from "./components/pages/institucional/Institucional.jsx"
import Detalhes from "./components/pages/extra/Detalhes.jsx"
import Admin from "./components/pages/admin/Admin.jsx"
import Dashboard from "./components/pages/dashboard/Dashboard.jsx"
import GestaoLivros from "./components/pages/gestao/GestaoLivros.jsx"
import Estudantes from "./components/pages/estudantes/Estudantes.jsx"
import Emprestimos from "./components/pages/emprestimos/Emprestimos.jsx"
import Acervo from "./components/pages/acervo/Acervo.jsx"
import CategoriasAutores from "./components/pages/categorias_autores/CategoriasAutores.jsx"
import Relatorios from "./components/pages/relatorios/Relatorios.jsx"
import Configuracoes from "./components/pages/configuracoes/Configuracoes.jsx"
import Admins from "./components/pages/admins/Admins.jsx"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {

  return (
      <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
        <Router>
          <Header/>
          <Routes>
            <Route path = "/home"
              element={<Home/>}
            />
            <Route path="/catalogo"
              element={<Catalogo/>}
            />
            <Route path="/reservas"
              element={<Reservas/>}   
            />
            <Route path="/exposicoes"
              element={<Exposicoes/>} 
            />
            <Route path="/meuperfil"
              element={<MeuPerfil/>}
            />
            <Route path="/institucional"
            element={<Institucional/>}
            />
            <Route path = "/livros/:id"
              element={<Detalhes/>}
            />
            <Route path = "/admin" element={<Admin/>}>
              <Route index element={<Dashboard/>}/>
              <Route path="dashboard" element={<Dashboard/>}/>
              <Route path = "gestao" element={<GestaoLivros/>}/>
              <Route path = "estudantes" element={<Estudantes/>}/>
              <Route path = "emprestimos" element={<Emprestimos/>}/>
              <Route path = "acervo" element={<Acervo/>}/>
              <Route path = "categorias_autores" element={<CategoriasAutores/>}/>
              <Route path = "relatorios" element={<Relatorios/>}/>
              <Route path = "configuracoes" element={<Configuracoes/>}/>
              <Route path = "admins" element={<Admins/>}/>
            </Route>          
          </Routes>
          <Footer />
        </Router>
      </div>
  )
}

export default App
