import React, {useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import eye from '../../assets/img/eye.svg';
import eyeOff from '../../assets/img/eye-off.svg';

import './Profile.css'
import Menu from '../../components/Menu/Menu'

export default function Profile() {

    const navigate = useNavigate();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePassword = () => {
        setPasswordVisible((prev) => !prev);
    };

    const navegarViagem = () => {
        navigate('/viagem');
    };

    const idMotorista = sessionStorage.getItem('idMotoristaLogin') || {};

    const gerarCsv = () => {
        const response = axios.get(`http://localhost:8080/viagens/csv/${idMotorista}`);
        alert('Csv entrou com sucesso!');
    };

    const gerarTxt = () => {
        const response = axios.get(`http://localhost:8080/viagens/txt/${idMotorista}`);
        alert('Txt entrou com sucesso!');
    };

    const handleFormSubmit = async (evento) => {
        evento.preventDefault();
        const motorista = {
            nome,
            email,
            senha
        };

        try {
            const response = await axios.put(`http://localhost:8080/motoristas/alterar/${idMotorista}`, motorista);
            console.log('Resposta do servidor:', response.data);
            alert('Motorista foi alterado com sucesso!');


            navigate('/motorista');
        } catch (error) {
            console.error('Erro ao atualizar a motorista:', error);
            alert('OPS! Alguma coisa deu errado!');
        }
    };

    return (
        <section className="profile" id="page-profile">
            <div className="profile-container container grid">
                <Menu/>


                <div className="main-w3layouts wrapper">

                    <div className="main-agileinfo">

                        <br/>

                        <p>Aqui é seu espaço , você pode editar informações do seu 
                                                            perfil ou gerar arquivo das suas viagens</p>
                        <div className="agileits-top">
                            <h3 className="section-title about-title"
                                style={
                                    {fontSize: '1.7rem'}
                            }>
                                edite suas informações de cadastro
                            </h3>
                            <br/>
                            <form action="#" method="put"/>
                            <input
                                id="nome"
                                type="text"
                                name="nome"
                                value={nome.nome}
                                onChange={(e) => setNome(e.target.value)}
                                className="text"
                                required
                                placeholder="altere seu nome"
                            />

                            <input

                                id="email"
                                type="email"
                                name="email"
                                value={email.email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="text email" 
                                required
                                placeholder="altere seu e-mail"
                            />

                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                id="senha"
                                value={senha.senha}
                                onChange={(e) => setSenha(e.target.value)}
                                name="password"
                                className="text"
                                placeholder="altere sua senha"
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
                            <br/>
                            <br/>

                            <div style={
                                {
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    gap: '0.5rem',
                                    width: '100%'
                                }
                            }>
                                <button onClick={handleFormSubmit} className="button button-flex" type="submit"
                                    style={
                                        {
                                            border: 'none',
                                            marginRight: '10px'
                                        }
                                }>confirmar</button>

                                <button className="button button-flex" type="submit"
                                    style={
                                        {border: 'none'}
                                }>excluir conta</button>
                            </div>


                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="section-title about-title"
                        style={
                            {fontSize: '1.8rem'}
                    }>
                        confira suas viagens até agora
                    </h2>

                    <div>

                        <p>gere relatório das suas viagens</p>
                    <button className="button button-flex" type="submit" onClick={gerarCsv}>
                        gerar CSV
                    </button>
                    <button className="button button-flex" type="submit" onClick={gerarTxt}>
                        gerar TXT
                    </button>
                </div>

                </div>

            </div>
        </section>
    )

}
