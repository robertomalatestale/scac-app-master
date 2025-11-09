import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL2 } from '../config/axios';

function CadastroMarcas() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL2}/marcas`;

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  

  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setNome('');
      
    } else {
      setId(dados.id);
      setNome(dados.nome);
    }
  }

  async function salvar() {
    let data = { id, nome};
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Marca ${nome} cadastrada com sucesso!`);
          navigate(`/listagem-marcas`);
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
          mensagemSucesso(`Marca ${nome} alterada com sucesso!`);
          navigate(`/listagem-marcas`);
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
    setNome(dados.nome);
  }

  const [dadosMarcas, setDadosMarcas] = React.useState(null);

  
    useEffect(() => {
    axios.get(`${BASE_URL2}/marcas`).then((response) => {
      setDadosMarcas(response.data);
    });
  }, []);

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;
  if (!dadosMarcas) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Marca'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              
              <FormGroup label='Nome: *' htmlFor='inputNome'>
                <input
                  type='text'
                  id='inputNome'
                  value={nome}
                  className='form-control'
                  name='nome'
                  onChange={(e) => setNome(e.target.value)}
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

export default CadastroMarcas;
