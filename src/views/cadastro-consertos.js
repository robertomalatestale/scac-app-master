import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
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

  function inicializar() {
    if (idParam == null) {
      setIdCliente();
      setIdDispositivo();
      setIdFuncionario();
      setObservacoes();
      setValor();
      setDataEsperada();

    } else {
      setIdCliente(dados.idCliente);
      setIdDispositivo(dados.idDispositivo);
      setIdFuncionario(dados.idFuncionario);
      setObservacoes(dados.observacoes);
      setValor(dados.valor);
      setDataEsperada(dados.dataEsperada);
    }
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
          navigate(`/listagem-conserto`);
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

  if (!dados) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Conserto'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='id Cliente:' htmlFor='inputIdCliente'>
                <input
                  type='int'
                  id='inputIdCliente'
                  value={idCliente}
                  className='form-control'
                  name='idCliente'
                  onChange={(e) => setIdCliente(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='id Dispositivo:' htmlFor='inputIdDispositivo'>
                <input
                  type='int'
                  id='inputIdDispositivo'
                  value={idDispositivo}
                  className='form-control'
                  name='idDispositivo'
                  onChange={(e) => setIdDispositivo(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='id Funcionario:' htmlFor='inputIdFuncionario'>
                <input
                  type='int'
                  id='inputIdFuncionario'
                  value={idFuncionario}
                  className='form-control'
                  name='idFuncionario'
                  onChange={(e) => setIdFuncionario(e.target.value)}
                />
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

export default CadastroConsertos;
