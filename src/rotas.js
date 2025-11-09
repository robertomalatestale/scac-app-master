import React from 'react';

import ListagemModelos from './views/listagem-modelos';
import ListagemClientes from './views/listagem-clientes';
import ListagemProdutos from './views/listagem-produtos';
import ListagemMarcas from './views/listagem-marcas';
import ListagemConsertos from './views/listagem-consertos';
import ListagemFuncionarios from './views/listagem-funcionarios';
import ListagemDispositivos from './views/listagem-dispositivos';
import ListagemTipoProdutos from './views/listagem-tipoProdutos';

import Login from './views/login';
import CadastroDispositivos from './views/cadastro-dispositivos';

import CadastroClientes from './views/cadastro-clientes';
import CadastroMarcas from './views/cadastro-marcas';
import CadastroFuncionarios from './views/cadastro-funcionarios';
import CadastroTipoProdutos from './views/cadastro-tipoProdutos';
import CadastroModelos from './views/cadastro-modelos';
import CadastroConsertos from './views/cadastro-consertos';
import CadastroProdutos from './views/cadastro-produtos';

import { Route, Routes, BrowserRouter } from 'react-router-dom';


function Rotas(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />}
        />
        <Route path='/cadastro-modelos/:idParam?' element={<CadastroModelos />} />
        <Route path='/cadastro-clientes/:idParam?' element={<CadastroClientes />} />
        <Route path='/cadastro-marcas/:idParam?' element={<CadastroMarcas />} />
        <Route path='/cadastro-dispositivos/:idParam?' element={<CadastroDispositivos />} />
        <Route path='/cadastro-produtos/:idParam?' element={<CadastroProdutos />} />
        <Route path='/cadastro-tipoProdutos/:idParam?' element={<CadastroTipoProdutos />} />
        <Route path='/cadastro-funcionarios/:idParam?' element={<CadastroFuncionarios />} />
        <Route path='/cadastro-consertos/:idParam?' element={<CadastroConsertos />} />
        
        <Route path='/listagem-Modelos' element={<ListagemModelos />} />
        <Route path='/listagem-clientes' element={<ListagemClientes />} />
        <Route path='/listagem-marcas' element={<ListagemMarcas />} />
        <Route path='/listagem-dispositivos' element={<ListagemDispositivos />} />
        <Route path='/listagem-produtos' element={<ListagemProdutos />} />
        <Route path='/listagem-tipoProdutos' element={<ListagemTipoProdutos />} />
        <Route path='/listagem-funcionarios' element={<ListagemFuncionarios />} />
        <Route path='/listagem-consertos' element={<ListagemConsertos />} />



      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;
