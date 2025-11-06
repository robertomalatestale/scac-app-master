import React from 'react';

import ListagemModelos from './views/listagem-modelos';
import ListagemClientes from './views/listagem-clientes';
import ListagemProdutos from './views/listagem-produtos';
import ListagemMarcas from './views/listagem-marcas';
import ListagemConsertos from './views/listagem-consertos';
import ListagemFuncionarios from './views/listagem-funcionarios';
import ListagemDispositivos from './views/listagem-dispositivos';
import ListagemTipoProdutos from './views/listagem-tipoProdutos';
import AcompanhamentoAtividadesComplementares from './views/acompanhamento-atividades-complementares';

import Login from './views/login';
import CadastroUsuario from './views/cadastro-usuario';
import CadastroCurso from './views/cadastro-curso';
import CadastroProfessor from './views/cadastro-professor';
import CadastroModelos  from './views/cadastro-modelos';
import CadastroCategoria from './views/cadastro-categoria';
import CadastroAtividadeComplementar from './views/cadastro-atividade-complementar';

import { Route, Routes, BrowserRouter } from 'react-router-dom';

function Rotas(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route
          path='/cadastro-usuarios/:idParam?'
          element={<CadastroUsuario />}
        />
        <Route path='/cadastro-cursos/:idParam?' element={<CadastroCurso />} />
        <Route
          path='/cadastro-professores/:idParam?'
          element={<CadastroProfessor />}
        />
        <Route path='/cadastro-modelos/:idParam?' element={<CadastroModelos />} />
        <Route
          path='/cadastro-categorias/:idParam?'
          element={<CadastroCategoria />}
        />
        <Route
          path='/cadastro-atividades-complementares/:idParam?'
          element={<CadastroAtividadeComplementar />}
        />
        <Route path='/listagem-Modelos' element={<ListagemModelos />} />
        <Route path='/listagem-clientes' element={<ListagemClientes />} />
        <Route path='/listagem-produtos' element={<ListagemProdutos />} />
        <Route path='/listagem-marcas' element={<ListagemMarcas />} />
        <Route path='/listagem-dispositivos' element={<ListagemDispositivos />} />
        <Route path='/listagem-consertos' element={<ListagemConsertos />} />
        <Route path='/listagem-tipoProdutos' element={<ListagemTipoProdutos />} />
        <Route path='/listagem-funcionarios' element={<ListagemFuncionarios />} />
        
        <Route
          path='/acompanhamento-atividades-complementares'
          element={<AcompanhamentoAtividadesComplementares />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;
