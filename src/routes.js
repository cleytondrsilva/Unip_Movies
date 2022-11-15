import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Filme from './pages/Filme';
import Favoritos from './pages/Favoritos';


import Erro from './pages/Erro';

import Header from './components/Header';
import Pesquisa from './pages/pesquisa/pesquisa';

function RoutesApp(){
  return(
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/filme/:id" element={ <Filme/> } />
        <Route path="/favoritos" element={ <Favoritos/> } />
        <Route path="/pesquisa" element={ <Pesquisa/> } />
        
        <Route path="*" element={ <Erro/> } />
      </Routes>
    </BrowserRouter>
  )
}

export default RoutesApp;