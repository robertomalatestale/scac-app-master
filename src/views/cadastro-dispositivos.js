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

function CadastroDispositivos() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/dispositivos`;

  const [id, setId] = useState('');
  const [idCliente, setIdCliente] = useState('');
  const [idMarca, setIdMarca] = useState(0);
  const [idModelo, setIdModelo] = useState('');
  const [ano, setAno] = useState('');


  const [dados, setDados] = useState([]);

  function cancelar() {
    navigate('/listagem-dispositivos');
  }

  async function salvar() {
    if (!idCliente || Number(idCliente) === 0) {
      mensagemErro('Selecione um cliente.');
      return;
    }

    let data = { id, idCliente: Number(idCliente), idMarca: Number(idMarca), idModelo: Number(idModelo), ano };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Dispositivo ${id} cadastrado com sucesso!`);
          navigate(`/listagem-dispositivos`);
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
          mensagemSucesso(`Dispositivo ${id} alterado com sucesso!`);
          navigate(`/listagem-dispositivos`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    }
  }

  const [dadosClientes, setDadosClientes] = React.useState(null);
  const [dadosMarcas, setDadosMarcas] = React.useState(null);
  const [dadosModelos, setDadosModelos] = React.useState(null);

  async function buscar() {
    if (idParam == null) {
      return;
    }

    await axios.get(`${baseURL}/${idParam}`).then((response) => {
      const dado = response.data;
      setDados(dado);
      setId(dado.id);
      setIdCliente(dado.idCliente);
      setIdMarca(dado.idMarca);
      setIdModelo(dado.idModelo);
      setAno(dado.ano);
    });
  }

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [idParam]);

  useEffect(() => {
    axios.get(`${BASE_URL2}/clientes`).then((response) => {
      setDadosClientes(response.data);
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
  if (!dadosMarcas) return null;
  if (!dadosModelos) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Dispositivo'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Cliente: *' htmlFor='selectCliente'>
                <select
                  className='form-select'
                  id='selectCliente'
                  value={idCliente}
                  name='idCliente'
                  onChange={(e) => setIdCliente(e.target.value)}
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
              <FormGroup label='Marca: *' htmlFor='selectMarca'>
                <select
                  className='form-select'
                  id='selectMarca'
                  value={idMarca}
                  name='idMarca'
                  onChange={(e) => setIdMarca(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosMarcas.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nomeMarca}
                    </option>
                  ))}
                </select>
              </FormGroup>
                <FormGroup label='Modelo: *' htmlFor='selectModelo'>
                <select
                  className='form-select'
                  id='selectModelo'
                  value={idModelo}
                  onChange={(e) => setIdModelo(e.target.value)}
                >
                  <option value=''></option>
                  {dadosModelos
                    .filter((m) => m.idMarca == idMarca)
                    .map((dado) => (
                      <option key={dado.id} value={dado.id}>
                        {dado.nomeModelo}
                      </option>
                    ))}
                </select>
              </FormGroup>
              <FormGroup label='Ano' htmlFor='inputAno'>
                <input
                  type='int'
                  id='inputAno'
                  value={ano}
                  className='form-control'
                  name='ano'
                  onChange={(e) => setAno(e.target.value)}
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

export default CadastroDispositivos;
