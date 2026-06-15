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
import { BASE_URL2 } from '../config/axios';

const baseURL = `${BASE_URL}/dispositivos`;

function ListagemDispositivos() {
  const navigate = useNavigate();

  const cadastrar = () => {
    navigate(`/cadastro-dispositivos`);
  };

  const editar = (id) => {
    navigate(`/cadastro-dispositivos/${id}`);
  };

  const [dados, setDados] = React.useState(null);
  const [dadosClientes, setDadosClientes] = React.useState(null);
  const [dadosMarcas, setDadosMarcas] = React.useState(null);
  const [dadosModelos, setDadosModelos] = React.useState(null);

  async function excluir(id) {
    let data = JSON.stringify({ id });
    let url = `${baseURL}/${id}`;
    console.log(url);
    await axios
      .delete(url, data, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(function (response) {
        mensagemSucesso(`Dispositivo excluído com sucesso!`);
        setDados(
          dados.filter((dado) => {
            return dado.id !== id;
          })
        );
      })
      .catch(function (error) {
        const errorMessage = error.response?.data || 'Erro ao excluir o dispositivo';
        mensagemErro(errorMessage);
      });
  }

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setDados(response.data);
    });

    axios.get(`${BASE_URL}/clientes`).then((response) => {
      setDadosClientes(response.data);
    });

    axios.get(`${BASE_URL2}/marcas`).then((response) => {
      setDadosMarcas(response.data);
    });

    axios.get(`${BASE_URL}/modelos`).then((response) => {
      setDadosModelos(response.data);
    });
  }, []);

  if (!dados) return null;
  if (!dadosClientes) return null;
  if (!dadosMarcas) return null;
  if (!dadosModelos) return null;

  const clientesPorId = dadosClientes.reduce((acc, cliente) => {
    acc[cliente.id] = cliente.nomeCompleto;
    return acc;
  }, {});

  const marcasPorId = dadosMarcas.reduce((acc, marca) => {
    acc[marca.id] = marca.nomeMarca;
    return acc;
  }, {});

  const modelosPorId = dadosModelos.reduce((acc, modelo) => {
    acc[modelo.id] = modelo.nomeModelo;
    return acc;
  }, {});

  return (
    <div className='container'>
      <Card title='Listagem de Dispositivos'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button
                type='button'
                className='btn btn-warning'
                onClick={() => cadastrar()}
              >
                Novo Dispositivo
              </button>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Cliente</th>
                    <th scope='col'>Marca</th>
                    <th scope='col'>Modelo</th>
                    <th scope='col'>Ano</th>
                    <th scope='col'>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{clientesPorId[dado.idCliente] || `Cliente #${dado.idCliente}`}</td>
                      <td>{marcasPorId[dado.idMarca] || `Marca #${dado.idMarca}`}</td>
                      <td>{modelosPorId[dado.idModelo] || `Modelo #${dado.idModelo}`}</td>
                      <td>{dado.ano}</td>
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

export default ListagemDispositivos;
