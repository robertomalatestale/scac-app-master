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

const baseURL = `${BASE_URL2}/consertos`;

function ListagemConsertos() {
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
    navigate(`/cadastro-consertos`);
  };

  const editar = (id) => {
    navigate(`/cadastro-consertos/${id}`);
  };

  const [dados, setDados] = React.useState(null);
  const [dadosClientes, setDadosClientes] = React.useState(null);
  const [dadosDispositivos, setDadosDispositivos] = React.useState(null);
  const [dadosFuncionarios, setDadosFuncionarios] = React.useState(null);
  const [dadosMarcas, setDadosMarcas] = React.useState(null);
  const [dadosModelos, setDadosModelos] = React.useState(null);

  const formatarDataBR = (valorData) => {
    if (!valorData) return '';

    const data = new Date(valorData);
    if (Number.isNaN(data.getTime())) return valorData;

    return data.toLocaleDateString('pt-BR');
  };

  const formatarDispositivo = (idDispositivo) => {
    const dispositivo = dadosDispositivos.find((d) => d.id === idDispositivo);
    if (!dispositivo) return `Dispositivo #${idDispositivo}`;

    const marca = dadosMarcas.find((m) => m.id === dispositivo.idMarca);
    const modelo = dadosModelos.find((m) => m.id === dispositivo.idModelo);

    const marcaNome = marca?.nomeMarca || `Marca #${dispositivo.idMarca}`;
    const modeloNome = modelo?.nomeModelo || `Modelo #${dispositivo.idModelo}`;

    return `[${marcaNome}] ${modeloNome} - ${dispositivo.ano}`;
  };

  async function excluir(id) {
    let data = JSON.stringify({ id });
    let url = `${baseURL}/${id}`;
    console.log(url);
    await axios
      .delete(url, data, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(function (response) {
        mensagemSucesso(`Conserto excluído com sucesso!`);
        setDados(
          dados.filter((dado) => {
            return dado.id !== id;
          })
        );
      })
      .catch(function (error) {
        const errorMessage = error.response?.data || 'Erro ao excluir o conserto';
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

    axios.get(`${BASE_URL}/dispositivos`).then((response) => {
      setDadosDispositivos(response.data);
    });

    axios.get(`${BASE_URL}/funcionarios`).then((response) => {
      setDadosFuncionarios(response.data);
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
  if (!dadosDispositivos) return null;
  if (!dadosFuncionarios) return null;
  if (!dadosMarcas) return null;
  if (!dadosModelos) return null;

  const clientesPorId = dadosClientes.reduce((acc, cliente) => {
    acc[cliente.id] = cliente.nomeCompleto;
    return acc;
  }, {});

  const funcionariosPorId = dadosFuncionarios.reduce((acc, funcionario) => {
    acc[funcionario.id] = funcionario.nomeCompleto;
    return acc;
  }, {});

  return (
    <div className='container'>
      <Card title='Listagem de Consertos'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button
                type='button'
                className='btn btn-warning'
                onClick={() => cadastrar()}
              >
                Novo conserto
              </button>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Cliente</th>
                    <th scope='col'>Dispositivo</th>
                    <th scope='col'>Funcionario</th>
                    <th scope='col'>Observações</th>
                    <th scope='col'>Valor</th>
                    <th scope='col'>Data Esperada</th>
                    <th scope='col'>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{clientesPorId[dado.idCliente] || `Cliente #${dado.idCliente}`}</td>
                      <td>{formatarDispositivo(dado.idDispositivo)}</td>
                      <td>{funcionariosPorId[dado.idFuncionario] || `Funcionário #${dado.idFuncionario}`}</td>
                      <td>{dado.observacoes}</td>
                      <td>{formatarMoedaBRL(dado.valor)}</td>
                      <td>{formatarDataBR(dado.dataEsperada)}</td>
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

export default ListagemConsertos;
