import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importando o nosso bloqueador de rotas
import RotaPrivada from './RotaPrivada';

// --- Importação das Telas (Views) ---
import Login from './views/login';

import ListagemConsertos from './views/listagem-consertos';
import CadastroConsertos from './views/cadastro-consertos';

import ListagemMarcas from './views/listagem-marcas';
import CadastroMarcas from './views/cadastro-marcas';

import ListagemModelos from './views/listagem-modelos';
import CadastroModelos from './views/cadastro-modelos';

import ListagemClientes from './views/listagem-clientes';
import CadastroClientes from './views/cadastro-clientes';

import ListagemDispositivos from './views/listagem-dispositivos';
import CadastroDispositivos from './views/cadastro-dispositivos';

import ListagemProdutos from './views/listagem-produtos';
import CadastroProdutos from './views/cadastro-produtos';

import ListagemTipoProdutos from './views/listagem-tipoProdutos';
import CadastroTipoProdutos from './views/cadastro-tipoProdutos';

import ListagemFuncionarios from './views/listagem-funcionarios';
import CadastroFuncionarios from './views/cadastro-funcionarios';

function Rotas() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />

      <Route path="/listagem-consertos" element={<RotaPrivada><ListagemConsertos /></RotaPrivada>} />
      <Route path="/cadastro-consertos" element={<RotaPrivada><CadastroConsertos /></RotaPrivada>} />
      <Route path="/cadastro-consertos/:idParam" element={<RotaPrivada><CadastroConsertos /></RotaPrivada>} />

      <Route path="/listagem-marcas" element={<RotaPrivada><ListagemMarcas /></RotaPrivada>} />
      <Route path="/cadastro-marcas" element={<RotaPrivada><CadastroMarcas /></RotaPrivada>} />
      <Route path="/cadastro-marcas/:idParam" element={<RotaPrivada><CadastroMarcas /></RotaPrivada>} />

      <Route path="/listagem-modelos" element={<RotaPrivada><ListagemModelos /></RotaPrivada>} />
      <Route path="/cadastro-modelos" element={<RotaPrivada><CadastroModelos /></RotaPrivada>} />
      <Route path="/cadastro-modelos/:idParam" element={<RotaPrivada><CadastroModelos /></RotaPrivada>} />

      <Route path="/listagem-clientes" element={<RotaPrivada><ListagemClientes /></RotaPrivada>} />
      <Route path="/cadastro-clientes" element={<RotaPrivada><CadastroClientes /></RotaPrivada>} />
      <Route path="/cadastro-clientes/:idParam" element={<RotaPrivada><CadastroClientes /></RotaPrivada>} />

      <Route path="/listagem-dispositivos" element={<RotaPrivada><ListagemDispositivos /></RotaPrivada>} />
      <Route path="/cadastro-dispositivos" element={<RotaPrivada><CadastroDispositivos /></RotaPrivada>} />
      <Route path="/cadastro-dispositivos/:idParam" element={<RotaPrivada><CadastroDispositivos /></RotaPrivada>} />

      <Route path="/listagem-produtos" element={<RotaPrivada><ListagemProdutos /></RotaPrivada>} />
      <Route path="/cadastro-produtos" element={<RotaPrivada><CadastroProdutos /></RotaPrivada>} />
      <Route path="/cadastro-produtos/:idParam" element={<RotaPrivada><CadastroProdutos /></RotaPrivada>} />

      <Route path="/listagem-tipoProdutos" element={<RotaPrivada><ListagemTipoProdutos /></RotaPrivada>} />
      <Route path="/cadastro-tipoProdutos" element={<RotaPrivada><CadastroTipoProdutos /></RotaPrivada>} />
      <Route path="/cadastro-tipoProdutos/:idParam" element={<RotaPrivada><CadastroTipoProdutos /></RotaPrivada>} />

      <Route path="/listagem-funcionarios" element={
        <RotaPrivada exigeAdmin={true}>
          <ListagemFuncionarios />
        </RotaPrivada>
      } />
      <Route path="/cadastro-funcionarios" element={
        <RotaPrivada exigeAdmin={true}>
          <CadastroFuncionarios />
        </RotaPrivada>
      } />
      <Route path="/cadastro-funcionarios/:idParam" element={
        <RotaPrivada exigeAdmin={true}>
          <CadastroFuncionarios />
        </RotaPrivada>
      } />
    </Routes>
  );
}

export default Rotas;