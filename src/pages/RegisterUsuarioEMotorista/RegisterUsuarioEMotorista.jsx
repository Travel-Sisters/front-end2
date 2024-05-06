import React, { useState } from 'react';
import './Register.css';

import Swal from 'sweetalert2';
import axios from 'axios';
import api from '../../api';
import { useNavigate } from 'react-router-dom';
import roxo from '../../assets/img/logo-roxo.png';
import eye from '../../assets/img/eye.svg';
import eyeOff from '../../assets/img/eye-off.svg';
import bg from '../../assets/img/bg-roxo.png';
import config from '../../../config';

export default function Register() {
    const navigate = useNavigate();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cpf, setCPF] = useState('');
    const [nascimento, setNascimento] = useState('');
    const [senha, setSenha] = useState('');

    const [cnh, setCnh] = useState('');
    const [placaVan, setPlacaVan] = useState('');
    const [fkEmpresa, setFkEmpresa] = useState('');

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
    const togglePassword = () => {
        setPasswordVisible((prev) => !prev);
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
            senha
        };

        const motorista = {
            telefone,
            cnh,
            placaVan,
            fkEmpresa,
        };


        try {
            //const responseUsuario = await api.post('http://localhost:8080/usuarios/cadastrar', usuario);
            const responseUsuario = await api.post(`/usuarios/cadastrar`, usuario);
            console.log('Resposta do servidor (Usuário):', responseUsuario.data);

            if (responseUsuario.data.id != null) {
                console.log('Id usuário: ', responseUsuario.data.id);

                const idUsuario = responseUsuario.data.id;
                //const responseMotorista = await api.post(`http://localhost:8080/motoristas/cadastrar/${idUsuario}`, motorista);
                const responseMotorista = await api.post(`/motoristas/cadastrar/${idUsuario}`, motorista);
                console.log('Resposta do servidor (Motorista):', responseMotorista.data.id);

                Swal.fire({
                    title: 'Cadastro efetuado com sucesso!',
                    icon: 'ok',
                    confirmButtonText: 'OK'
                });
                navigate('/login');
            } else {
                Swal.fire({
                    title: 'Erro ao cadastrar usuário, verifique os dados e tente novamente.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            console.error('Erro ao cadastrar o usuário: ', error);
            //alert('OPS! Alguma coisa deu errado!');
            Swal.fire({
                title: 'OPS! Alguma coisa deu errado!',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };


    /* const handleFormSubmitMotorista = async (evento) => {
        evento.preventDefault();
        const motorista = {
            cnh,
            placaVan,
            fkEmpresa,
            fkUsuario
        };

        try {
            console.log(response.data.userId)
            setFkUsuario(response.data.userId)

            const response = await api.post('http://localhost:8080/motoristas/cadastrar', motorista);
            console.log('Resposta do servidor:', response.data);
            alert('Usuário foi cadastrado com sucesso!');
            setCnh('');
            setPlacaVan('');
            setFkEmpresa('');

            navigate('/login');
        } catch (error) {
            console.error('Erro ao cadastrar o usuário:', error);
            alert('OPS! Alguma coisa deu errado!');
        }
    };*/

    return (
        <div id="page-moto-user" className="flex">
            <div>
                <header>
                    <img src={roxo}
                        alt="" />
                </header>
                <main>
                    <div className="headline">
                        <h1>criar uma conta como motorista</h1>
                        <p>
                            faça login ou registre-se para começar a para trilhar seu caminho
                            ainda hoje.
                        </p>
                    </div>
                    <form>
                        <div className="input-wrapper">
                            <label htmlFor="text">nome completo</label>
                            <input id="nome" type="text" name="nome"
                                value={
                                    nome.nome
                                }
                                onChange={
                                    (e) => setNome(e.target.value)
                                }
                                required
                                placeholder="digite seu nome completo" />
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="email">e-mail</label>
                            <input id="email" type="email" name="email"
                                value={
                                    email.email
                                }
                                onChange={
                                    (e) => setEmail(e.target.value)
                                }
                                required
                                placeholder="digite seu e-mail" />
                        </div>
                        
                        <div className="input-wrapper">
                            <label htmlFor="telefone">telefone</label>
                            <input id="telefone" type="telefone" name="telefone"
                                value={
                                    telefone.telefone
                                }
                                onChange={
                                    (e) => setTelefone(e.target.value)
                                }
                                required
                                placeholder="digite seu telefone" />
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="number">CPF</label>
                            <input id="cpf" name="cpf"
                                value={
                                    cpf.cpf
                                }
                                onChange={
                                    (e) => setCPF(e.target.value)
                                }
                                required
                                placeholder="digite seu CPF" />
                        </div>

                        <div className="input-wrapper">
                            <label className='custom-date-input' htmlFor="date">data de nascimento</label>
                            <input id="date" name="data"
                                value={
                                    nascimento
                                }
                                onChange={
                                    handleDateChange
                                }
                                required
                                placeholder="digite sua data de nascimento" />
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="text">CNH</label>
                            <input id="cnh" name="cnh"
                                value={
                                    cnh.cnh
                                }
                                onChange={
                                    (e) => setCnh(e.target.value)
                                }
                                required
                                placeholder="digite o número de sua CNH" />
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="placaVan">placa da Van</label>
                            <input id="placaVan" name="placaVan"
                                value={
                                    placaVan.placaVan
                                }
                                onChange={
                                    (e) => setPlacaVan(e.target.value)
                                }
                                required
                                placeholder="digite o número da placa" />
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="number">código da empresa</label>
                            <input id="fkEmpresa" name="fkEmpresa"
                                value={
                                    fkEmpresa.fkEmpresa
                                }
                                onChange={
                                    (e) => setFkEmpresa(e.target.value)
                                }
                                required
                                placeholder="digite seu código de empresa" />
                        </div>

                        <div className="input-wrapper">
                            <div className="label-wrapper flex">
                                <label htmlFor="senha">senha</label>
                                {/* <a href="#">esqueceu a senha?</a> */} </div>

                            <input type={
                                passwordVisible ? 'text' : 'password'
                            }
                                id="senha"
                                value={
                                    senha.senha
                                }
                                onChange={
                                    (e) => setSenha(e.target.value)
                                }
                                placeholder="digite sua senha" />

                            <img onClick={togglePassword}
                                className={
                                    `eye ${passwordVisible ? 'hide' : ''
                                    }`
                                }
                                src={eyeOff}
                                alt="" />
                            <img onClick={togglePassword}
                                className={
                                    `eye ${passwordVisible ? '' : 'hide'
                                    }`
                                }
                                src={eye}
                                alt="" />
                        </div>

                        <button type="submit"
                            onClick={handleFormSubmit}>criar</button>

                        <div className="create-account">
                            <p>já possui uma conta?</p><a href="#"> entrar</a>
                        </div>
                    </form>
                </main>
            </div>
            <img src={bg} alt="" />
        </div>
    );
}
