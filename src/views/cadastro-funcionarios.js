import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroFuncionarios() {
  const { idParam } = useParams();
  const navigate = useNavigate();
  const baseURL = `${BASE_URL}/funcionarios`;

  const [id, setId] = useState('');
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefoneCelular, setTelefoneCelular] = useState('');
  const [email, setEmail] = useState('');
  
  const [dados, setDados] = useState([]);

  // Função para pegar o token do localStorage
  const obterConfiguracaoDeCabecalho = () => {
    const usuarioSalvo = localStorage.getItem('usuario_autenticado');
    if (!usuarioSalvo) return { headers: { 'Content-Type': 'application/json' } };
    
    const usuario = JSON.parse(usuarioSalvo);
    return {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${usuario.token}` // Aqui é onde a mágica do acesso acontece!
      }
    };
  };

  function cancelar() {
    navigate('/listagem-funcionarios');
  }

  async function salvar() {
    let data = { id, nomeCompleto, cpf, telefoneCelular, email };
    data = JSON.stringify(data);
    
    const config = obterConfiguracaoDeCabecalho();

    if (idParam == null) {
      await axios
        .post(baseURL, data, config)
        .then(function (response) {
          mensagemSucesso(`Funcionário ${nomeCompleto} cadastrado com sucesso!`);
          navigate(`/listagem-funcionarios`);
        })
        .catch(function (error) {
          mensagemErro(error.response?.data || 'Erro de permissão ou validação');
        });
    } else {
      await axios
        .put(`${baseURL}/${idParam}`, data, config)
        .then(function (response) {
          mensagemSucesso(`Funcionário ${nomeCompleto} alterado com sucesso!`);
          navigate(`/listagem-funcionarios`);
        })
        .catch(function (error) {
          mensagemErro(error.response?.data || 'Erro de permissão ou validação');
        });
    }
  }

  async function buscar() {
    // Também precisa do token caso a rota GET passe a exigir no futuro
    await axios.get(`${baseURL}/${idParam}`, obterConfiguracaoDeCabecalho()).then((response) => {
      setDados(response.data);
      setId(response.data.id);
      setNomeCompleto(response.data.nomeCompleto);
      setCpf(response.data.cpf);
      setTelefoneCelular(response.data.telefoneCelular);
      setEmail(response.data.email);
    }).catch(error => {
        mensagemErro('Erro ao carregar os dados.');
    });
  }

  useEffect(() => {
    if(idParam) {
       buscar();
    }
    // eslint-disable-next-line
  }, [idParam]);

  return (
    <div className='container'>
      <Card title={idParam ? 'Edição de Funcionários' : 'Cadastro de Funcionários'}>
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

export default CadastroFuncionarios;