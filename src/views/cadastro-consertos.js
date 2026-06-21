import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL, BASE_URL2 } from '../config/axios';

function CadastroConsertos() {
  const { idParam } = useParams();
  const navigate = useNavigate();

  const baseURL = `${BASE_URL2}/consertos`;

  // Estados do Formulário
  const [id, setId] = useState('');
  const [idCliente, setIdCliente] = useState('');
  const [idDispositivo, setIdDispositivo] = useState('');
  const [idFuncionario, setIdFuncionario] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [valor, setValor] = useState('');
  const [dataEsperada, setDataEsperada] = useState('');

  // Estados das Listas Auxiliares (iniciadas como arrays vazios para evitar quebra no .map)
  const [dadosClientes, setDadosClientes] = useState([]);
  const [dadosDispositivos, setDadosDispositivos] = useState([]);
  const [dadosFuncionarios, setDadosFuncionarios] = useState([]);
  const [dadosMarcas, setDadosMarcas] = useState([]);
  const [dadosModelos, setDadosModelos] = useState([]);

  function cancelar() {
    navigate('/listagem-consertos');
  }

  async function salvar() {
    // Adicionado o idCliente que estava faltando no seu payload original
    let data = { id, idCliente, idDispositivo, idFuncionario, observacoes, valor, dataEsperada };
    data = JSON.stringify(data);
    
    if (!idParam) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Conserto cadastrado com sucesso!`);
          navigate(`/listagem-consertos`);
        })
        .catch(function (error) {
          mensagemErro(error.response?.data || 'Erro ao cadastrar');
        });
    } else {
      await axios
        .put(`${baseURL}/${idParam}`, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Conserto alterado com sucesso!`);
          navigate(`/listagem-consertos`);
        })
        .catch(function (error) {
          mensagemErro(error.response?.data || 'Erro ao alterar');
        });
    }
  }

  useEffect(() => {
    // 1. Busca todas as listas auxiliares em paralelo
    axios.get(`${BASE_URL}/clientes`).then((response) => setDadosClientes(response.data)).catch(() => setDadosClientes([]));
    axios.get(`${BASE_URL}/dispositivos`).then((response) => setDadosDispositivos(response.data)).catch(() => setDadosDispositivos([]));
    axios.get(`${BASE_URL}/funcionarios`).then((response) => setDadosFuncionarios(response.data)).catch(() => setDadosFuncionarios([]));
    axios.get(`${BASE_URL2}/marcas`).then((response) => setDadosMarcas(response.data)).catch(() => setDadosMarcas([]));
    axios.get(`${BASE_URL}/modelos`).then((response) => setDadosModelos(response.data)).catch(() => setDadosModelos([]));

    // 2. Se tiver um idParam (Modo Edição), busca os dados específicos do Conserto
    if (idParam) {
      axios.get(`${baseURL}/${idParam}`)
        .then((response) => {
          // Extrai a resposta diretamente, resolvendo o bug de assincronicidade do React
          const conserto = response.data;
          setId(conserto.id || '');
          setIdCliente(conserto.idCliente || '');
          setIdDispositivo(conserto.idDispositivo || '');
          setIdFuncionario(conserto.idFuncionario || '');
          setObservacoes(conserto.observacoes || '');
          setValor(conserto.valor || '');
          setDataEsperada(conserto.dataEsperada || '');
        })
        .catch((error) => {
          mensagemErro('Não foi possível carregar os dados deste conserto.');
        });
    }
    // eslint-disable-next-line
  }, [idParam]);

  return (
    <div className='container'>
      <Card title={idParam ? 'Edição de Conserto' : 'Cadastro de Conserto'}>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              
              <FormGroup label='Cliente: *' htmlFor='selectCliente'>
                <select
                  className='form-select'
                  id='selectCliente'
                  value={idCliente}
                  name='idCliente'
                  onChange={(e) => setIdCliente(Number(e.target.value))}
                >
                  <option key='0' value='0'></option>
                  {dadosClientes.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nomeCompleto}
                    </option>
                  ))}
                </select>
              </FormGroup>

              <FormGroup label='Dispositivo: *' htmlFor='selectDispositivo'>
                <select
                  className='form-select'
                  id='selectDispositivo'
                  value={idDispositivo}
                  name='idDispositivo'
                  onChange={(e) => setIdDispositivo(e.target.value)}
                  disabled={!idCliente || idCliente === '0'} // Bloqueia se não tiver cliente selecionado
                >
                  <option key='0' value='0'></option>
                  {Number(idCliente) > 0 &&
                    (() => {
                      const dispositivosFiltrados = dadosDispositivos.filter(
                        (d) => Number(d.idCliente) === Number(idCliente)
                      );

                      return dispositivosFiltrados.map((disp) => {
                        const modelo = dadosModelos.find((m) => m.id === disp.idModelo);
                        const marca = dadosMarcas.find((m) => m.id === disp.idMarca);

                        const dispositivoFormatado = `[${marca?.nomeMarca || 'Sem Marca'}] ${modelo?.nomeModelo || 'Sem Modelo'} - ${disp.ano}`;

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

              <FormGroup label='Funcionário: *' htmlFor='selectFuncionario'>
                <select
                  className='form-select'
                  id='selectFuncionario'
                  value={idFuncionario}
                  name='idFuncionario'
                  onChange={(e) => setIdFuncionario(e.target.value)}
                >
                  <option key='0' value='0'></option>
                  {dadosFuncionarios.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nomeCompleto}
                    </option>
                  ))}
                </select>
              </FormGroup>

              <FormGroup label='Observações:' htmlFor='inputObservacoes'>
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
                  type='number' // Alterado para number
                  step="0.01"
                  id='inputValor'
                  value={valor}
                  className='form-control'
                  name='Valor'
                  onChange={(e) => setValor(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Data Esperada:' htmlFor='inputDataEsperada'>
                <input
                  type='date' // Alterado de int para date (assumindo que seja data)
                  id='inputDataEsperada'
                  value={dataEsperada}
                  className='form-control'
                  name='dataEsperada'
                  onChange={(e) => setDataEsperada(e.target.value)}
                />
              </FormGroup>

              <Stack spacing={1} padding={1} direction='row' marginTop={2}>
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