import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import azul from '../../assets/img/logo-azul.png';
import eye from '../../assets/img/eye.svg';
import eyeOff from '../../assets/img/eye-off.svg';
import bg from '../../assets/img/bg-azul.png';
import { analyze } from 'eslint-scope';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import config from '../../../config';

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePassword = () => {
        setPasswordVisible((prev) => !prev);
    };

    const handleFormSubmit = async (evento) => {
        evento.preventDefault();
        const usuario = {
            email,
            senha,
        };
        if (!email || !senha) {
            Swal.fire({
                title: 'Preencha todos os campos!',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        try {
            //const response = await axios.post('http://localhost:8080/usuarios/entrar', usuario);
            axios.get(`${config.API_URL}/usuarios/entrar`, usuario);

            if (response.status === 200) {
                const token = response.data.token;

                sessionStorage.setItem('authToken', token);
                sessionStorage.setItem('usuario', response.data.nome);
                sessionStorage.setItem('idUsuario', response.data.userId);

                console.log('Resposta do servidor:', response.data);
                //alert('Usuário encontrado!');
                Swal.fire({
                    title: 'Usuário encontrado!',
                    icon: 'ok',
                    confirmButtonText: 'OK'
                });
                setEmail('');
                setSenha('');

                navigate('/cadastro-motorista');
            } else {
                throw new Error('Ops! Ocorreu um erro interno.');
            }
        } catch (error) {
            console.error('Erro ao encontrar usuário:', error);
            Swal.fire({
                title: 'E-mail ou senha incorretos',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            document.getElementById('senha').value = '';
        }
    };

    return (
        <>
            <div id="page-moto" className="flex" >

                <div>
                    <header >
                        <img src={azul} alt="" />
                    </header>
                    <main>
                        <br /><br /><br />
                        <div className="headline">
                            <h1>acesse a plataforma</h1>
                            <p>faça login primeiro pra te redirecionarmos ao cadastro de motorista.</p>
                        </div>
                        <form>
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
                                <div className="label-wrapper flex">
                                    <label htmlFor="senha">senha</label>
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

                            <button type="submit" onClick={handleFormSubmit}>entrar</button>
                        </form>

                    </main>
                </div>
                <img src={bg} alt="" />
            </div>
        </>
    )
}