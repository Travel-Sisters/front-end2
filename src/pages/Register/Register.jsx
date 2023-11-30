import React, { useState } from 'react';
import './Register.css';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import rosa from '../../assets/img/logo-rosa.png';
import eye from '../../assets/img/eye.svg';
import eyeOff from '../../assets/img/eye-off.svg';
import bg from '../../assets/img/bg.jpg';

export default function Register() {
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCPF] = useState('');
    const [nascimento, setNascimento] = useState('');
    const [senha, setSenha] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePassword = () => {
        setPasswordVisible((prev) => !prev);
    };

    const handleFormSubmit = async (evento) => {
        evento.preventDefault();
        const usuario = {
            nome,
            email,
            cpf,
            nascimento,
            senha,
        };

        try {
            const response = await axios.post('http://localhost:8080/usuarios/cadastrar', usuario);
            console.log('Resposta do servidor:', response.data);
            alert('Usuário foi cadastrado com sucesso!');
            setNome('');
            setEmail('');
            setCPF('');
            setNascimento('');
            setSenha('');

            navigate('/login');
        } catch (error) {
            console.error('Erro ao cadastrar o usuário:', error);
            alert('OPS! Alguma coisa deu errado!');
        }
    };

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
                                value={cpf.cpf}
                                onChange={(e) => setCPF(e.target.value)}
                                required
                                placeholder="digite seu CPF"
                            />
                        </div>

                        <div className="input-wrapper">
                            <label className='custom-date-input' htmlFor="date">data de nascimento</label>
                            <input
                                id="date"
                                name="data"
                                value={nascimento.nascimento}
                                onChange={(e) => setNascimento(e.target.value)}
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
                            <p>já possui uma conta?</p><a href="#"> entrar</a>
                        </div>
                    </form>

                </main>
            </div>
            <img src={bg} alt="" />
        </div>
    );
}

