import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL2 } from '../config/axios';

function CadastroTipoProdutos() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL2}/tipoProdutos`;

  const [id, setId] = useState('');
  const [nomeTipo, setNomeTipo] = useState('');
  

  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setNomeTipo('');
      
    } else {
      setId(dados.id);
      setNomeTipo(dados.nomeTipo);
    }
  }

  async function salvar() {
    let data = { id, nomeTipo };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Tipo de Produto ${nomeTipo} cadastrado com sucesso!`);
          navigate(`/listagem-tipoProdutos`);
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
          mensagemSucesso(`Tipo de Produto ${nomeTipo} alterado com sucesso!`);
          navigate(`/listagem-tipoProdutos`);
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
    setNomeTipo(dados.nomeTipo);
  }

  const [dadosTipoProdutos, setDadosTipoProdutos] = React.useState(null);

  
    useEffect(() => {
    axios.get(`${BASE_URL2}/tipoProdutos`).then((response) => {
      setDadosTipoProdutos(response.data);
    });
  }, []);

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;
  if (!dadosTipoProdutos) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Tipo de Produto'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              
              <FormGroup label='Nome: *' htmlFor='inputNome'>
                <input
                  type='text'
                  id='inputNome'
                  value={nomeTipo}
                  className='form-control'
                  name='nomeTipo'
                  onChange={(e) => setNomeTipo(e.target.value)}
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

export default CadastroTipoProdutos;
