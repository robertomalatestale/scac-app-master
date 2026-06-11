import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL2 } from '../config/axios';

function CadastroProdutos() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL2}/produtos`;

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [idMarca, setIdMarca] = useState('');
  const [idTipoProduto, setIdTipoProduto] = useState('');
  const [cor, setCor] = useState('');
  const [quantidade, setQuantidade] = useState('');




  const [dados, setDados] = React.useState([]);

  function cancelar() {
    navigate('/listagem-produtos');
  }

  async function salvar() {
    let data = { id, nome, preco, idMarca, idTipoProduto, cor, quantidade };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Produto ${nome} cadastrado com sucesso!`);
          navigate(`/listagem-produtos`);
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
          mensagemSucesso(`Produto ${nome} alterado com sucesso!`);
          navigate(`/listagem-produtos`);
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
    setPreco(dados.preco);
    setIdMarca(dados.idMarca);
    setIdTipoProduto(dados.idTipoProduto);
    setCor(dados.cor);
    setQuantidade(dados.quantidade);
  }

  const [dadosProdutos, setDadosProdutos] = React.useState(null);
  const [dadosMarcas, setDadosMarcas] = React.useState(null);
  const [dadosTipoProdutos, setDadosTipoProdutos] = React.useState(null);


  useEffect(() => {
    axios.get(`${BASE_URL2}/produtos`).then((response) => {
      setDadosProdutos(response.data);
    });
  }, []);

  useEffect(() => {
      axios.get(`${BASE_URL2}/marcas`).then((response) => {
        setDadosMarcas(response.data);
      });
    }, []);

  useEffect(() => {
      axios.get(`${BASE_URL2}/tipoProdutos`).then((response) => {
        setDadosTipoProdutos(response.data);
      });
    }, []);

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;
  if (!dadosProdutos) return null;
   if (!dadosMarcas) return null;
   if (!dadosTipoProdutos) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Produto'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>

              <FormGroup label='Nome:' htmlFor='inputNome'>
                <input
                  type='text'
                  id='inputNome'
                  value={nome}
                  className='form-control'
                  name='nome'
                  onChange={(e) => setNome(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Preço:' htmlFor='inputPreco'>
                <input
                  type='number'
                  id='inputPreco'
                  value={preco}
                  className='form-control'
                  name='preco'
                  onChange={(e) => setPreco(e.target.value)}
                />
              </FormGroup>
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
                      {dado.nomeMarca}
                    </option>
                  ))}

                </select>
              </FormGroup>
              <FormGroup label='Tipo de Produtos: *' htmlFor='selectTipoProduto'>
                <select
                  class='form-select'
                  id='selectTipoProduto'
                  value={idTipoProduto}                  
                  name='idTipoProduto'                  
                  onChange={(e) => setIdTipoProduto(e.target.value)}                            
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosTipoProdutos.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nomeTipo}
                    </option>
                  ))}

                </select>
              </FormGroup>
              
              <FormGroup label='Cor:' htmlFor='inputCor'>
                <input
                  type='text'
                  id='inputCor'
                  value={cor}
                  className='form-control'
                  name='cor'
                  onChange={(e) => setCor(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Quantidade:' htmlFor='inputQuantidade'>
                <input
                  type='int'
                  id='inputQuantidade'
                  value={quantidade}
                  className='form-control'
                  name='quantidade'
                  onChange={(e) => setQuantidade(e.target.value)}
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

export default CadastroProdutos;
