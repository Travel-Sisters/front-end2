import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './HomeDriver.css';

import motoristaRoxo from '@/assets/img/fmotorista.png';
import logo from '@/assets/img/logo.png';
import app from '@/assets/img/app.png'
import zoologico from '@/assets/img/zoo.png';
import sebastiao from '@/assets/img/sebastiao.png';
import parque from '@/assets/img/parque.png';
import holambra from '@/assets/img/holambra.png';
import brotas from '@/assets/img/brotas.png';
import mis from '@/assets/img/mis.png';

export default function HomeDriver() {

    const navigate = useNavigate();

    const navegarViagem = () => {
        navigate('/viagem');
    };

    const gerarCsv = () => {
        try {
            const idMotorista = sessionStorage.getItem('idMotoristaLogin') || {};
            const response = axios.get(`http://localhost:8080/viagens/csv/${idMotorista}`);

            if (response.status === 200) {

                console.log('Resposta do servidor:', response.data);
                alert('Csv entrou com sucesso!');

            } else {
                throw new Error('Ops! Ocorreu um erro interno.');
            }
        } catch (error) {
            console.error('Erro ao gerar arquivo:', error);
            alert('OPS! Alguma coisa deu errado!');
        }
    };


    return (
        <>
            <div id="page-driver">
                <header className="header" id="header">
                    <nav className="nav container">
                        <a href="#" className="nav-logo">
                            Travel Sisters
                        </a>

                        <div className="nav-menu" id="nav-menu">
                            <ul className="nav-list">
                                <li className="nav-item">
                                    <a href="#home" className="nav-link active-link">início</a>
                                </li>
                                <li className="nav-item">
                                    <a href="#about" className="nav-link">dúvidas</a>
                                </li>
                                <li className="nav-item">
                                    <a href="#search" className="nav-link">agendar</a>
                                </li>
                                <li className="nav-item">
                                    <a href="#recommendations" className="nav-link">populares</a>
                                </li>

                            </ul>
                        </div>
                    </nav>
                </header>

                <main className="main">
                    <section className="home" id="home">
                        <div className="home-container container grid">
                            <img src={motoristaRoxo} alt="" className="home-img" />

                            <div className="home-data">
                                <h1 className="home-title">
                                    motorista, <br /> é com você!
                                </h1>
                                <p className="home-description">explore o mundo conosco e crie memórias inesquecíveis. somos uma comunidade exclusiva para mulheres que desejam explorar, aprender e crescer juntas, sem limites.</p>
                                <button onClick={navegarViagem}
                                    className="button button-flex">
                                    Cadastrar viagem
                                </button>

                                <br />
                                <br />

                                <button onClick={gerarCsv}
                                    className="button button-flex">
                                    Gerar Csv com todas as suas viagens
                                </button>
                            </div>


                        </div>
                    </section>

                    <section className="search" id="search">
                        <div className="search-container container grid">
                            <form className="search" >
                                <div className="search-field select">
                                    <label className="sr-only" htmlFor="city">localização</label>
                                    <i className="ph-map-pin-light"></i>
                                    <select name="city" id="city">
                                        <option value="0" selected>escolha a localização</option>
                                        <option value="sao-paulo">São Paulo</option>
                                    </select>
                                    <i className="ph-caret-down-light"></i>
                                </div>
                                <div className="search-field select">
                                    <label className="sr-only" htmlFor="city">destino</label>
                                    <i className="ph-map-pin-light"></i>
                                    <select name="city" id="city">
                                        <option value="0" selected>defina destino e ponto de encontro</option>
                                        <option value="sao-paulo">Guarulhos - Metrô Barra Funda</option>
                                        <option value="sao-paulo">Praia Grande - Metrô Barra Funda</option>
                                        <option value="sao-paulo">Monguagá - Metrô Luz</option>
                                    </select>
                                    <i className="ph-caret-down-light"></i>
                                </div>

                                <button className="button button-flex">confirmar</button>
                            </form>
                        </div>
                    </section>

                    <section className="giving section container">
                        <h2 className="section-title">
                            como é trabalhar conosco?
                        </h2>

                        <div className="us-container grid">
                            <div className="us-content">
                                <i className="fa-solid fa-map"></i>
                                <h3 className="us-title">escolha o destino</h3>
                                <p className="us-description">selecione uma de nossas vastas opções para viajar e criar momentos.</p>
                            </div>

                            <div className="us-content">
                                <i className="fa-solid fa-gear"></i>
                                <h3 className="us-title">defina os detalhes</h3>
                                <p className="us-description">descreva os detalhes cruciais da viagem: ponto de encontro, preços, horários, regras...</p>
                            </div>

                            <div className="us-content">
                                <i className="fa-solid fa-message"></i>
                                <h3 className="us-title">entre no chat</h3>
                                <p className="us-description">finalize os últimos detalhes da viagem no chat e tire dúvidas até o dia da viagem.</p>
                            </div>

                            <div className="us-content">
                                <i className="fa-solid fa-heart"></i>
                                <h3 className="us-title">crie experiências</h3>
                                <p className="us-description">proporcione maravilhosas experiências, crie conexões e faça uma viagem calma.</p>
                            </div>
                        </div>
                    </section>

                    <section className="about section container" id="about">
                        <div className="about-container grid">
                            <img src={app} alt="" className="about-img" />

                            <div className="about-data">
                                <h2 className="section-title about-title">
                                    em breve nosso aplicativo!
                                </h2>
                                <div className="about-details">
                                    <p className="home-description">nosso aplicativo vem com o propósito de facilitar ainda mais nossa conexão entre você e as passageiras. em breve novidades! </p>
                                </div>
                            </div>
                        </div>
                    </section>


                    <section className="visited section container" id="visited">
                        <div className="visited-container grid">
                            <div className="visited-data">
                                <h2 className="section-title visited-title">
                                    mais visitados que inspiram
                                </h2>
                                <div id="container-visitados">
                                    <div class="div1">
                                        <img src={zoologico} alt="" />
                                    </div>
                                    <div class="div2">
                                        <img src={parque} alt="" />
                                    </div>
                                    <div class="div3">
                                        <img src={mis} alt="" />
                                    </div>
                                    <div class="div4">
                                        <img src={sebastiao} alt="" />
                                    </div>
                                    <div class="div5">
                                        <img src={brotas} alt="" />

                                    </div>
                                    <div class="div6">
                                        <img src={holambra} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="message section container" id="message">
                        <div className="message-container grid">
                            <div className="message-data">
                                <h2 className="section-title message-title">
                                    inscreva-se para receber as novidades do nosso site!
                                </h2>
                                <a href="#" className="button">quero agora</a>
                            </div>
                        </div>
                    </section>
                </main>

                <footer className="section">
                    <div className="container grid">
                        <div className="brand">
                            <img className='logo' src={logo} alt="" />
                            <p>©2023 Travel Sisters</p>
                            <p>todos os direitos reservados.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}
