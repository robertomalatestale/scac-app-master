import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { mensagemErro } from '../components/toastr';

function Login() {
  // Alterado para 'loginUsuario' para não dar conflito com a função 'login'
  const [loginUsuario, setLoginUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Passa o login digitado e a senha para o contexto
      await login(loginUsuario, senha);
    } catch (error) {
      mensagemErro(error.message);
    }
  };

  return (
    <div className='container'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" // Antes era "email"
          placeholder="Usuário (Login)" 
          value={loginUsuario} 
          onChange={(e) => setLoginUsuario(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Senha" 
          value={senha} 
          onChange={(e) => setSenha(e.target.value)} 
        />
        <button type="submit" className="btn btn-primary mt-2">Entrar</button>
      </form>
    </div>
  );
}

export default Login;