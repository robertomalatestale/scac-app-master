import React from 'react';
import 'bootswatch/dist/flatly/bootstrap.css';
import 'toastr/build/toastr.min';
import 'toastr/build/toastr.css';
import Navbar from './components/navbar.js';
import Rotas from './rotas.js';

import { AuthProvider } from './AuthContext.js';
// 1. Importe o BrowserRouter do react-router-dom
import { BrowserRouter } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      // 2. Coloque o BrowserRouter por fora de tudo
      <BrowserRouter>
        <AuthProvider>
          <div className='container'>
            <Navbar />
            <Rotas />
          </div>
        </AuthProvider>
      </BrowserRouter>
    );
  }
}

export default App;