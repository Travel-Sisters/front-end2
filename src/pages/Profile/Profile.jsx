import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { api, api_pix } from '../../api';

import './Profile.css'
import Menu from '../../components/Menu/Menu'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import config from '../../../config';

export default function Profile() {

    const navigate = useNavigate();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const navegarViagem = () => {
        navigate('/viagem');
    };

    const idMotorista = sessionStorage.getItem('idMotoristaLogin') || {};

    const gerarCsv = () => {
        //const response = api.get(`http://localhost:8080/viagens/csv/${idMotorista}`);
        const response = api.get(`/viagens/csv/${idMotorista}`);
        alert('Csv entrou com sucesso!');
    };

    const gerarTxt = () => {
        //const response = api.get(`http://localhost:8080/viagens/txt/${idMotorista}`);
        const response = api.get(`/viagens/txt/${idMotorista}`);
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
            //const response = await api.put(`http://localhost:8080/motoristas/alterar/${idMotorista}`, motorista);
            const response = await api.put(`/motoristas/alterar/${idMotorista}`, motorista);
            console.log('Resposta do servidor:', response.data);
            //alert('Motorista foi alterado com sucesso!');
            Swal.fire({
                title: 'Motorista foi alterado com sucesso!',
                icon: 'success',
                confirmButtonText: 'OK'
            });


            navigate('/motorista');
        } catch (error) {
            console.error('Erro ao atualizar a motorista:', error);
            //alert('OPS! Alguma coisa deu errado!');
            Swal.fire({
                title: 'OPS! Alguma coisa deu errado!',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <section className="profile" id="page-profile">
            <div className="profile-container container grid">
                <Menu />
                <div className="main-w3layouts wrapper">
                    <div className="main-agileinfo">
                        <br />
                        <div className="agileits-top">
                            <h3 className="section-title about-title"
                                style={{ fontSize: '1.6rem' }}>
                                edite suas informações de cadastro
                            </h3>
                            <p>fique à vontade para alterar suas informações</p>
                            <br />
                            <form action="#" method="put" />
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
                                type="password"
                                id="senha"
                                value={senha.senha}
                                onChange={(e) => setSenha(e.target.value)}
                                name="password"
                                className="text"
                                placeholder="altere sua senha"
                            />

                            <div style={{ gap: '0.5rem', width: '100%' }}>
                                <button onClick={handleFormSubmit} className="button button-flex" type="submit" style={{ border: 'none', marginRight: '10px' }}>confirmar</button>
                            </div>
                            {/*<h2 className="section-title about-title" style={{ fontSize: '1.6rem' }}>
                                confira suas viagens até agora
                            </h2>
                            <p>gere relatório das suas viagens e tenha controle de tudo.
                                com essa visão você consegue ter um overview de todas as viagens que você durante sua jornada em nossa aplicação.
                            </p>
                            <button className="button button-flex" type="submit" onClick={gerarCsv} style={{ border: 'none', marginRight: '10px' }}>
                                gerar CSV
                            </button>
                            <button className="button button-flex" type="submit" onClick={gerarTxt} style={{ border: 'none', marginRight: '10px' }}>
                                gerar TXT
                            </button>*/}
                        </div>
                        <br />
                        <br />
                    </div>
                </div>

            </div>
        </section>
    )

}
