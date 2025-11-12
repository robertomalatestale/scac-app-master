import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';

import { BASE_URL } from '../config/axios';

function CadastroClientes() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/clientes`;

  const [id, setId] = useState('');
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefoneCelular, setTelefoneCelular] = useState('');
  const [email, setEmail] = useState('');
  
  const [dados, setDados] = useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setNomeCompleto('');
      setCpf('');
      setTelefoneCelular('');
      setEmail('');
      
    } else {
      setId(dados.id);
      setNomeCompleto(dados.nomeCompleto);
      setCpf(dados.cpf);
      setTelefoneCelular(dados.telefoneCelular);
      setEmail(dados.email);
    }
  }

  async function salvar() {
    let data = { id, nomeCompleto, cpf, telefoneCelular, email};
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Cliente ${nomeCompleto} cadastrado com sucesso!`);
          navigate(`/listagem-clientes`);
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
          mensagemSucesso(`Cliente ${nomeCompleto} alterado com sucesso!`);
          navigate(`/listagem-clientes`);
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
      setNomeCompleto(dados.nomeCompleto);
      setCpf(dados.cpf);
      setTelefoneCelular(dados.telefoneCelular);
      setEmail(dados.email);
  }

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Cliente'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Nome Completo ' htmlFor='inputNomeCompleto'>
                <input
                  type='text'
                  id='inputNomeCompleto'
                  value={nomeCompleto}
                  className='form-control'
                  name='nomeCompleto'
                  onChange={(e) => setNomeCompleto(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='CPF: *' htmlFor='inputCpf'>
                <input
                  type='text'
                  maxLength='11'
                  id='inputCpf'
                  value={cpf}
                  className='form-control'
                  name='cpf'
                  onChange={(e) => setCpf(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Telefone/Celular' htmlFor='inputTelefoneCelular'>
                <input
                  type='tel'
                  maxLength='11'
                  id='inputTelefoneCelular'
                  value={telefoneCelular}
                  className='form-control'
                  name='telefoneCelular'
                  onChange={(e) => setTelefoneCelular(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Email' htmlFor='inputEmail'>
                <input
                  type='text'
                  id='inputEmail'
                  value={email}
                  className='form-control'
                  name='email'
                  onChange={(e) => setEmail(e.target.value)}
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

export default CadastroClientes;
