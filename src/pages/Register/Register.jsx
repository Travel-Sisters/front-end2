import React, { useState } from 'react';
import './Register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import rosa from '../../assets/img/logo-rosa.png';
import eye from '../../assets/img/eye.svg';
import eyeOff from '../../assets/img/eye-off.svg';
import bg from '../../assets/img/bg.jpg';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import config from '../../../config';
import api from '../../api';

export default function Register() {
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCPF] = useState('');
    const [nascimento, setNascimento] = useState('');
    const [senha, setSenha] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [nascimentoForBackend, setNascimentoForBackend] = useState('');
    

    const formatInputDate = (dateString, forBackend = false) => {
        if (forBackend) {
            // formato "AAAA-MM-DD"
            return dateString.replace(/(\d{2})(\d{2})(\d{4})/, '$3-$2-$1');
        } else {
            // formato "DD-MM-AAAA"
            return dateString.replace(/(\d{2})(\d{2})(\d{4})/, '$1-$2-$3');
        }
    };

    // const fetchVerifcaCpf = async () => {
    //     const response = await axios.get('http://localhost:8080/usuarios/listar');
    //     console.log("DADOS RECEBIDOS >> ", response.data)
    //     const resposta = response.data
    //     for (let index = 0; index < resposta.length; index++) {
    //       if (resposta[index].cpf == valorInputCpf ? true : false) {
    //         return false;
    //       }
    //     }
    //   }

    const togglePassword = () => {
        setPasswordVisible((prev) => !prev);
    };

    const handleNumberChange = (event, setStateFunction) => {
        const cleanedValue = event.target.value.replace(/\D/g, '');
        setStateFunction(cleanedValue);
    };

    const handleDateChange = (event) => {
        const inputDate = event.target.value;
        const cleanedValue = inputDate.replace(/\D/g, '');
        const formattedDateForDisplay = formatInputDate(cleanedValue, false);
        const formattedDateForBackend = formatInputDate(cleanedValue, true);
    
        setNascimento(formattedDateForDisplay);
        setNascimentoForBackend(formattedDateForBackend);
    };

    const handleFormSubmit = async (evento) => {
        evento.preventDefault();
        const usuario = {
            nome,
            email,
            cpf,
            nascimento: nascimentoForBackend,
            senha,
        };


        const dataNascimento = new Date(nascimento);
        const anoNascimento = dataNascimento.getFullYear();
        const anoAtual = new Date().getFullYear();

        if (!nome.trim() || !email.trim() || !cpf.trim() || !nascimento.trim() || !senha.trim()) {
            Swal.fire({
                title: 'Preencha todos os campos!',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        // Regex para validar tudo do e-mail: const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailRegex = /@/;
        if (!emailRegex.test(email.trim())) {
            Swal.fire({
                title: 'E-mail inválido!',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        const cpfNumerico = cpf.replace(/\D/g, '');
        const cpfRegex = /^\d{11}$/;
        if (!cpfRegex.test(cpfNumerico)) {
            Swal.fire({
                title: 'CPF inválido!',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }
        if (anoAtual - anoNascimento < 18) {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Você deve ter pelo menos 18 anos para se cadastrar.',
            });
            return;
        }

        // if (fetchVerifcaCpf == true) {
        //     Swal.fire({
        //         title: 'CPF já cadastrado',
        //         icon: 'error',
        //         confirmButtonText: 'OK'
        //     });
        // }

        try { 
            //const response = await axios.post('http://localhost:8080/usuarios/cadastrar', usuario);
            const response = await api.post(`/usuarios/cadastrar`, usuario);
            console.log('Resposta do servidor:', response.data);
            Swal.fire({
                title: 'Cadastro efetuado com sucesso!!',
                icon: 'ok',
                confirmButtonText: 'OK'
            });
            setNome('');
            setEmail('');
            setCPF('');
            setNascimento('');
            setSenha('');
            navigate('/login');

        } catch (error) {
            console.error('Erro ao cadastrar o usuário:', error);
            Swal.fire({
                title: 'Erro ao cadastrar usuário',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            document.getElementById('senha').value = '';
        }
    };
    
    // try{
    //     const teste = await axios.get('http://localhost:8080/usuarios/listar', cpf);

    // }

    return (
        <div id="page-register" className="flex">
            <div>
                <header>
                    <img src={rosa} alt="" />
                </header>
                <main>
                    <div className="headline">
                        <h1>criar uma conta como passageira</h1>
                        <p> faça login ou registre-se para começar.</p>
                    </div>

                    <form>
                        <div className="input-wrapper">
                            <label htmlFor="text">nome completo</label>
                            <input
                                id="nome"
                                type="text"
                                name="nome"
                                value={nome.nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                                placeholder="digite seu nome completo"
                            />
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="email">e-mail</label>
                            <input

                                id="email"
                                type="email"
                                name="email"
                                value={email.email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="digite seu e-mail"
                            />
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="number">CPF</label>
                            <input
                                id="cpf"
                                name="cpf"
                                value={cpf}
                                onChange={(e) => {
                                    setCPF(e.target.value);
                                    handleNumberChange(e, setCPF);
                                }}
                                required
                                placeholder="digite seu CPF"
                            />

                        </div>

                        <div className="input-wrapper">
                            <label className='custom-date-input' htmlFor="date">data de nascimento</label>
                            <input
                                id="date"
                                name="data"
                                value={nascimento}
                                onChange= { handleDateChange}
                                required
                                placeholder="digite sua data de nascimento"
                            />
                        </div>

                        <div className="input-wrapper">
                            <div className="label-wrapper flex">
                                <label htmlFor="senha">senha</label>
                                {/* <a href="#">esqueceu a senha?</a> */}
                            </div>

                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                id="senha"
                                value={senha.senha}
                                onChange={(e) => setSenha(e.target.value)}
                                placeholder="digite sua senha"
                            />

                            <img
                                onClick={togglePassword}
                                className={`eye ${passwordVisible ? 'hide' : ''}`}
                                src={eyeOff}
                                alt=""
                            />
                            <img
                                onClick={togglePassword}
                                className={`eye ${passwordVisible ? '' : 'hide'}`}
                                src={eye}
                                alt=""
                            />
                        </div>

                        <button type="submit" onClick={handleFormSubmit}>criar</button>

                        <div className="create-account">
                            <p>já possui uma conta?</p><a><span onClick={() => navigate('/login')}> entrar</span></a>
                        </div>
                    </form>

                </main>
            </div>
            <img src={bg} alt="" />
        </div>
    );
}

