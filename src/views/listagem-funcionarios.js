import React from 'react';

import Card from '../components/card';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

const baseURL = `${BASE_URL}/funcionarios`;

function ListagemFuncionarios() {
  const navigate = useNavigate();

  const cadastrar = () => {
    navigate(`/cadastro-funcionarios`);
  };

  const editar = (id) => {
    navigate(`/cadastro-funcionarios/${id}`);
  };

  const [dados, setDados] = React.useState(null);

async function excluir(id) {
    let url = `${baseURL}/${id}`;
    
    // 1. Resgata o usuário logado para pegar o token
    const usuarioSalvo = localStorage.getItem('usuario_autenticado');
    let cabecalho = { 'Content-Type': 'application/json' };

    // 2. Se tiver um usuário, injeta o token de ADMIN na requisição
    if (usuarioSalvo) {
      const usuario = JSON.parse(usuarioSalvo);
      cabecalho['Authorization'] = `Bearer ${usuario.token}`;
    }

    // 3. Usa a sintaxe correta do axios.delete (passando a URL e os Headers)
    await axios
      .delete(url, { headers: cabecalho })
      .then(function (response) {
        mensagemSucesso(`Funcionário excluído com sucesso!`);
        
        // Atualiza a tabela removendo o funcionário excluído da tela
        setDados(
          dados.filter((dado) => {
            return dado.id !== id;
          })
        );
      })
      .catch(function (error) {
        // Agora, se der erro, ele vai te mostrar o motivo real
        const errorMessage = error.response?.data || 'Erro ao excluir o Funcionário';
        mensagemErro(errorMessage);
      });
  }

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setDados(response.data);
    });
  }, []);

  if (!dados) return null;

  return (
    <div className='container'>
      <Card title='Listagem de Funcionarios'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button
                type='button'
                className='btn btn-warning'
                onClick={() => cadastrar()}
              >
                Novo Funcionario
              </button>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Nome</th>
                    <th scope='col'>CPF</th>
                    <th scope='col'>Telefone Celular</th>
                    <th scope='col'>Email</th>
                    <th scope='col'>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.nomeCompleto}</td>
                      <td>{dado.cpf}</td>
                      <td>{dado.telefoneCelular}</td>
                      <td>{dado.email}</td>
                      <td>
                        <Stack spacing={1} padding={0} direction='row'>
                          <IconButton
                            aria-label='edit'
                            onClick={() => editar(dado.id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label='delete'
                            onClick={() => excluir(dado.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>{' '}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ListagemFuncionarios;
