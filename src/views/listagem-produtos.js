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
import { BASE_URL2 } from '../config/axios';

const baseURL = `${BASE_URL2}/produtos`;

function ListagemProdutos() {
  const navigate = useNavigate();

  const formatarMoedaBRL = (valor) => {
    if (valor == null || valor === '') return '';

    const numero = Number(valor);
    if (Number.isNaN(numero)) return valor;

    return numero.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const cadastrar = () => {
    navigate(`/cadastro-produtos`);
  };

  const editar = (id) => {
    navigate(`/cadastro-produtos/${id}`);
  };

  const [dados, setDados] = React.useState(null);
  const [dadosTipos, setDadosTipos] = React.useState(null);

  async function excluir(id) {
    let data = JSON.stringify({ id });
    let url = `${baseURL}/${id}`;
    console.log(url);
    await axios
      .delete(url, data, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(function (response) {
        mensagemSucesso(`Produto excluído com sucesso!`);
        setDados(
          dados.filter((dado) => {
            return dado.id !== id;
          })
        );
      })
      .catch(function (error) {
        const errorMessage = error.response?.data || 'Erro ao excluir o produto';
        mensagemErro(errorMessage);
      });
  }

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setDados(response.data);
    });

    axios.get(`${BASE_URL2}/tipoProdutos`).then((response) => {
      setDadosTipos(response.data);
    });
  }, []);

  if (!dados) return null;
  if (!dadosTipos) return null;

  const tipoProdutosPorId = dadosTipos.reduce((acc, tipo) => {
    acc[tipo.id] = tipo.nomeTipo;
    return acc;
  }, {});

  return (
    <div className='container'>
      <Card title='Listagem de Produto'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button
                type='button'
                className='btn btn-warning'
                onClick={() => cadastrar()}
              >
                Novo Produto
              </button>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Nome</th>
                    <th scope='col'>Preço</th>
                    <th scope='col'>Marca</th>
                    <th scope='col'>Tipo</th>
                    <th scope='col'>Cor</th>
                    <th scope='col'>Quantidade</th>
                    <th scope='col'>Ações</th>

                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.nome}</td>
                      <td>{formatarMoedaBRL(dado.preco)}</td>
                      <td>{dado.marca?.nomeMarca || dado.idMarca}</td>
                      <td>{tipoProdutosPorId[dado.idTipoProduto] || `Tipo #${dado.idTipoProduto}`}</td>
                      <td>{dado.cor}</td>
                      <td>{dado.quantidade}</td>
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

export default ListagemProdutos;
