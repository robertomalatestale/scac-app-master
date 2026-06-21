import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const navigate = useNavigate();

  // Quando o app abrir, verifica se já tem alguém salvo no localStorage
  useEffect(() => {
    const usuarioSalvo = localStorage.getItem('usuario_autenticado');
    if (usuarioSalvo) {
      setUsuarioLogado(JSON.parse(usuarioSalvo));
    }
  }, []);

  // Modifique os parâmetros para receber o usuário ao invés do e-mail
  const login = async (loginUsuario, senha) => {
    try {
      const response = await axios.post('http://localhost:8081/api/v1/usuarios/auth', {
        login: loginUsuario, // Agora o Axios envia a chave exata que o Usuario.java espera
        senha: senha
      });

      const dadosUsuario = response.data;

      setUsuarioLogado(dadosUsuario);
      localStorage.setItem('usuario_autenticado', JSON.stringify(dadosUsuario));
      
      navigate('/listagem-consertos'); 
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao autenticar');
    }
  };

  const logout = () => {
    setUsuarioLogado(null);
    localStorage.removeItem('usuario_autenticado');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ usuarioLogado, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};