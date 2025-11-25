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
  const [idMarca, setIdMarca] = useState(0);
  const [idModelo, setIdModelo] = useState('');
  const [ano, setAno] = useState('');


  const [dados, setDados] = useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setIdMarca(0);
      setIdModelo('');
      setAno('');
    } else {
      setId(dados.id);
      setIdMarca(dados.idMarca);
      setIdModelo(dados.idModelo);
      setAno(dados.ano);

    }
  }

  async function salvar() {
    let data = { id, idMarca, idModelo, ano };
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

  const [dadosMarcas, setDadosMarcas] = React.useState(null);
  const [dadosModelos, setDadosModelos] = React.useState(null);

  async function buscar() {
    await axios.get(`${baseURL}/${idParam}`).then((response) => {
      setDados(response.data);
    });
    setId(dados.id);
    setIdMarca(dados.idMarca);
    setIdModelo(dados.idModelo);
    setAno(dados.ano);
  }

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

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
  if (!dadosMarcas) return null;
  if (!dadosModelos) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Dispositivo'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Marca: *' htmlFor='selectMarca'>
                <select
                  class='form-select'
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
                      {dado.nome}
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
                  onClick={inicializar}
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
