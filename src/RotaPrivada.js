import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

function RotaPrivada({ children, exigeAdmin }) {
  const { usuarioLogado } = useContext(AuthContext);

  if (!usuarioLogado) {
    return <Navigate to="/listagem-consertos" replace />;
  }

  if (exigeAdmin && !usuarioLogado.admin) {
    return <Navigate to="/listagem-consertos" replace />;
  }

  return children;
}

export default RotaPrivada;