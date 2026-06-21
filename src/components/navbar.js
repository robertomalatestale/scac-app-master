import React, { useContext } from 'react';
import 'bootswatch/dist/flatly/bootstrap.css';

import NavbarItem from './navbarItem';

// Importando o contexto para saber se está logado e se é ADMIN
import { AuthContext } from '../AuthContext';

function Navbar(props) {
  const { usuarioLogado, logout } = useContext(AuthContext);

  // 1. Função que dispara a tela de confirmação antes de deslogar
  const handleLogout = () => {
    const confirmar = window.confirm("Tem certeza que deseja sair?");
    if (confirmar) {
      logout();
    }
  };

  return (
    <div className='navbar navbar-expand-lg fixed-top navbar-dark bg-primary'>
      <div className='container'>
        <a href='/' className='navbar-brand'>
           Center Cell
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarResponsive'
          aria-controls='navbarResponsive'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarResponsive'>
          
          <ul className='navbar-nav w-100'>
            
            {/* 2. Bloqueio absoluto: Só renderiza as abas comuns se o usuário ESTIVER logado */}
            {usuarioLogado && (
              <>
                <NavbarItem render='true' href='/listagem-modelos' label='Modelos' />
                <NavbarItem render='true' href='/listagem-clientes' label='Clientes' />
                <NavbarItem render='true' href='/listagem-marcas' label='Marcas' />
                <NavbarItem render='true' href='/listagem-dispositivos' label='Dispositivos' />
                <NavbarItem render='true' href='/listagem-produtos' label='Produtos' />
                <NavbarItem render='true' href='/listagem-tipoProdutos' label='Tipos de Produtos' />
                <NavbarItem render='true' href='/listagem-consertos' label='Consertos' />
              </>
            )}
            
            {/* 3. Bloqueio duplo: Só renderiza Funcionarios se estiver logado E tiver a flag admin == true */}
            {usuarioLogado && usuarioLogado.admin && (
              <NavbarItem render='true' href='/listagem-funcionarios' label='Funcionarios' />
            )}

            {/* --- ÁREA DOS BOTÕES CHAMATIVOS --- */}
            <div className="d-flex ms-auto ml-auto">
              {!usuarioLogado ? (
                <NavbarItem render='true' href='/login' label='Entrar' />
              ) : (
                <li className='nav-item list-unstyled'>
                  {/* Substituímos o onClick direto para a nossa função com a tela de confirmação */}
                  <button 
                    onClick={handleLogout} 
                    className='nav-link btn btn-link btn-sair-chamativo' 
                    style={{ textDecoration: 'none' }}
                  >
                    Sair
                  </button>
                </li>
              )}
            </div>

          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;