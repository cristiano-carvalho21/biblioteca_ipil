//import './App.css'
import Header from "./components/layout/header/Header.jsx"
import Footer from "./components/layout/footer/Footer.jsx"
import Home from "./components/pages/home/Home.jsx"
import Catalogo from "./components/pages/catalogo/Catalogo.jsx"
import Reservas from "./components/pages/reservas/Reservas.jsx"
import Exposicoes from "./components/pages/exposicoes/Exposicoes.jsx"
import MeuPerfil from "./components/pages/meuperfil/MeuPerfil.jsx"
import Institucional from "./components/pages/institucional/Institucional.jsx"
import Detalhes from "./components/extra/Detalhes.jsx"
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
          </Routes>
          
          <Footer />
        </Router>
      </div>
  )
}

export default App
