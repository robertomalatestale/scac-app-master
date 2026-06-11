import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';
import { BASE_URL2 } from '../config/axios';

function CadastroConsertos() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL2}/consertos`;

  const [id, setId] = useState('');
  const [idCliente, setIdCliente] = useState('');
  const [idDispositivo, setIdDispositivo] = useState('');
  const [idFuncionario, setIdFuncionario] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [valor, setValor] = useState('');
  const [dataEsperada, setDataEsperada] = useState('');

  const [dados, setDados] = React.useState([]);


  function cancelar() {
    navigate('/listagem-consertos');
  }
  
  async function salvar() {
    let data = { id, idDispositivo, idFuncionario, observacoes, valor, dataEsperada };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Conserto ${id} cadastrado com sucesso!`);
          navigate(`/listagem-conserto`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    } else {
      await axios
        .put(`${baseURL}/${idParam}`, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Conserto ${id} alterado com sucesso!`);
          navigate(`/listagem-consertos`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    }
  }

    const [dadosClientes, setDadosClientes] = React.useState(null);
    const [dadosDispositivos, setDadosDispositivos] = React.useState(null);
    const [dadosFuncionarios, setDadosFuncionarios] = React.useState(null);
    const [dadosMarcas, setDadosMarcas] = React.useState(null);
    const [dadosModelos, setDadosModelos] = React.useState(null);


  async function buscar() {
    await axios.get(`${baseURL}/${idParam}`).then((response) => {
      setDados(response.data);
    });
      setIdCliente(dados.idCliente);
      setIdDispositivo(dados.idDispositivo);
      setIdFuncionario(dados.idFuncionario);
      setObservacoes(dados.observacoes);
      setValor(dados.valor);
      setDataEsperada(dados.dataEsperada);
  }

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

    useEffect(() => {
    axios.get(`${BASE_URL}/clientes`).then((response) => {
      setDadosClientes(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`${BASE_URL}/dispositivos`).then((response) => {
      setDadosDispositivos(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`${BASE_URL}/funcionarios`).then((response) => {
      setDadosFuncionarios(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`${BASE_URL2}/marcas`).then((response) => {
      setDadosMarcas(response.data);
    });
  }, []);

  useEffect(() => {
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

  return (
    <div className='container'>
      <Card title='Cadastro de Conserto'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Cliente: *' htmlFor='selectCliente'>
                <select
                  class='form-select'
                  id='selectCliente'
                  value={idCliente}
                  name='idCliente'
                  onChange={(e) => setIdCliente(Number(e.target.value))}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosClientes.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nomeCompleto}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup label='Dispositivo: *' htmlFor='selectDispositivo'>
                  <select
                  class='form-select'
                  id='selectDispositivo'
                  value={idDispositivo}
                  name='idDispositivo'
                  onChange={(e) => setIdDispositivo(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                 {idCliente !== 0 &&
                  (() => {
                    const clienteSelecionado = dadosClientes.find(c => c.id === idCliente);

                    const idsDispositivosDoCliente = clienteSelecionado
                      ? Object.values(clienteSelecionado.dispositivos[0])
                      : [];

                    const dispositivosFiltrados = dadosDispositivos.filter(d =>
                      idsDispositivosDoCliente.includes(d.id)
                    );

                    return dispositivosFiltrados.map((disp) => {
                      const modelo = dadosModelos.find(m => m.id === disp.idModelo);
                      const marca = dadosMarcas.find(m => m.id === disp.idMarca);

                      const dispositivoFormatado = `[${marca?.nomeMarca}] ${modelo?.nomeModelo} - ${disp.ano}`;

                      return (
                        <option key={disp.id} value={disp.id}>
                          {dispositivoFormatado}
                        </option>
                      );
                    });
                  })()
                }
                </select>
              </FormGroup>
              <FormGroup label='Funcionario: *' htmlFor='selectFuncionario'>
                  <select
                  class='form-select'
                  id='selectFuncionario'
                  value={idFuncionario}
                  name='idFuncionario'
                  onChange={(e) => setIdFuncionario(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosFuncionarios.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nomeCompleto}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup label='Observacoes:' htmlFor='inputObservacoes'>
                <input
                  type='text'
                  id='inputObservacoes'
                  value={observacoes}
                  className='form-control'
                  name='Observacoes'
                  onChange={(e) => setObservacoes(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Valor:' htmlFor='inputValor'>
                <input
                  type='text'
                  id='inputValor'
                  value={valor}
                  className='form-control'
                  name='Valor'
                  onChange={(e) => setValor(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Data Esperada:' htmlFor='inputDataEsperada'>
                <input
                  type='int'
                  id='inputDataEsperada'
                  value={dataEsperada}
                  className='form-control'
                  name='dataEsperada'
                  onChange={(e) => setDataEsperada(e.target.value)}
                />
              </FormGroup>
              <Stack spacing={1} padding={1} direction='row'>
                <button
                  onClick={salvar}
                  type='button'
                  className='btn btn-success'
                >
                  Salvar
                </button>
                <button
                  onClick={cancelar}
                  type='button'
                  className='btn btn-danger'
                >
                  Cancelar
                </button>
              </Stack>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default CadastroConsertos;