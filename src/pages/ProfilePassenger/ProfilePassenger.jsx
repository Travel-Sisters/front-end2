import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './Profile.css'
import Menu from '../../components/Menu/Menu'

export default function ProfilePassenger() {
    const navigate = useNavigate();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleFormSubmit = async (evento) => {
        evento.preventDefault();
        const passageira = {
            nome,
            email,
            senha
        };

        try {
            const response = await axios.put(`http://localhost:8080/passsageiras/alterar/${idPassageira}`, passageira);
            console.log('Resposta do servidor:', response.data);
            alert('passageira foi alterado com sucesso!');

            navigate('/passageira');
        } catch (error) {
            console.error('Erro ao atualizar a passageira:', error);
            alert('OPS! Alguma coisa deu errado!');
        }
    };


    return (
        <section className="profile" id="page-profile-passenger">
            <div className="profile-container container grid">
                <Menu />
                <div className="main-w3layouts wrapper">
                    <div className="main-agileinfo">
                        <div className="agileits-top">
                            <h3 className="section-title about-title" style={{ fontSize: '1.7rem' }}>
                                edite suas informações de cadastro
                            </h3>
                            <p>fique à vontade para alterar suas informações</p>

                            <br />
                            <form action="#" method="post" />
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
                            <br />
                            <br />
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', width: '100%' }}>
                                <button onClick={handleFormSubmit} className="button button-flex" type="submit" style={{ border: 'none', marginRight: '10px' }}>confirmar</button>
                                <button className="button button-flex" type="submit" style={{ border: 'none' }}>excluir conta</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
