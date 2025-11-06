import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroAluno() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/modelos`;

  const [id, setId] = useState('');
  const [idMarca, setIdMarca] = useState(0);
  const [nomeModelo, setNomeModelo] = useState('');

  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setIdMarca(0);
      setNomeModelo('');
    } else {
      setId(dados.id);
      setIdMarca(dados.idMarca);
      setNomeModelo(dados.nomeModelo);
    }
  }

  async function salvar() {
    let data = { id, idMarca, nomeModelo};
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Modelo ${nomeModelo} cadastrado com sucesso!`);
          navigate(`/listagem-modelos`);
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
          mensagemSucesso(`Modelo ${nomeModelo} alterado com sucesso!`);
          navigate(`/listagem-modelos`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    }
  }

  async function buscar() {
    await axios.get(`${baseURL}/${idParam}`).then((response) => {
      setDados(response.data);
    });
    setId(dados.id);
    setIdMarca(dados.idMarca);
    setNomeModelo(dados.nomeModelo);
  }

  const [dadosModelos, setDadosModelos] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/modelos`).then((response) => {
      setDadosModelos(response.data);
    });
  }, []);

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;
  if (!dadosModelos) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Modelo'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='idMarca: *' htmlFor='inputIdMarca'>
                <input
                  type='text'
                  id='inputIdMarca'
                  value={idMarca}
                  className='form-control'
                  name='idMarca'
                  onChange={(e) => setIdMarca(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='NomeModelo: *' htmlFor='inputNomeModelo'>
                <input
                  type='text'
                  id='inputNomeModelo'
                  value={nomeModelo}
                  className='form-control'
                  name='nomeModelo'
                  onChange={(e) => setNomeModelo(e.target.value)}
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

export default CadastroAluno;
