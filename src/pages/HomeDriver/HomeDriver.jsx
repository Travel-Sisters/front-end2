import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './HomeDriver.css';
import Footer from '@/components/Footer/Footer';

import motoristaRoxo from '@/assets/img/fmotorista.png';
import app from '@/assets/img/app.png'
import zoologico from '@/assets/img/zoo.png';
import sebastiao from '@/assets/img/sebastiao.png';
import parque from '@/assets/img/parque.png';
import holambra from '@/assets/img/holambra.png';
import brotas from '@/assets/img/brotas.png';
import mis from '@/assets/img/mis.png';
import config from '../../../config';

export default function HomeDriver() {
    const idMotorista = sessionStorage.getItem('idMotoristaLogin') || {};
    const navigate = useNavigate();

    const navegarViagem = () => {
        navigate('/cadastro-viagem');
    };

    const gerarPdf = async () => {
        try {
            //const response = await axios.get(`http://localhost:8080/viagens/listarPorId/${idMotorista}`); 
            axios.get(`${config.API_URL}/viagens/listarPorId/${idMotorista}`);     
            const viagens = response.data;
            const pdf = new jsPDF();

            viagens.forEach((viagem, index) => {
                if (index > 0) {
                    pdf.addPage();
                  }
                const verticalPosition = 20 + index * 5;
                pdf.text(`Viagem: ${viagem.id}`, 20, verticalPosition);
                pdf.text(`Data: ${viagem.data}`, 20, verticalPosition + 10);
                pdf.text(`Ponto de embarque: ${viagem.pontoEmbarque.rua}`, 20, verticalPosition + 20);
                pdf.text(`Ponto de desembarque: ${viagem.pontoDesembarque.rua}`, 20, verticalPosition + 30);
                pdf.text(`Descrição: ${viagem.descricao}`, 20, verticalPosition + 40);
                pdf.text(`Horário: ${viagem.horario}`, 20, verticalPosition + 50);
                pdf.text(`Valor: ${viagem.valor}`, 20, verticalPosition + 60);
                pdf.text(`Nome da motorista: ${viagem.motorista.usuario.nome}`, 20, verticalPosition + 70);
                pdf.text(`Placa da van: ${viagem.motorista.placaVan}`, 20, verticalPosition + 80);
                pdf.text(`Telefone da motorista: ${viagem.motorista.telefone}`, 20, verticalPosition + 90);
              });
      
            const blob = pdf.output('blob');
            const blobUrl = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.setAttribute('download', 'suas_viagens.pdf');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(blobUrl);
          } catch (error) {
            alert('Você não tem viagens cadastradas:')
            console.error('Você não tem viagens cadastradas:', error);
          }
        };

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const navegarPerfil = () => {
        navigate('/perfil-motorista');
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
                                    <a href="#us" className="nav-link">trabalhe conosco</a>
                                </li>

                                <li className="nav-item">
                                    <a href="#visited" className="nav-link">populares</a>
                                </li>
                                <li>
                                    <div className={`dropdown ${isDropdownOpen ? 'show-dropdown' : ''}`} id="dropdown-content">
                                        <button className="dropdown-button" id="dropdown-button" onClick={toggleDropdown}>
                                            <span className="dropdown-name">perfil</span>
                                            <div className="dropdown-icons">
                                                {/* <i className="ri-arrow-down-s-line dropdown-arrow"></i>  */}
                                                {/* <i className="ri-close-line dropdown-close"></i> */}
                                            </div>
                                        </button>

                                        <ul className="dropdown-menu">
                                            <li className="dropdown-item">
                                                <i className="ri-map-2-line dropdown-icon"></i>
                                                <span onClick={navegarPerfil} className="dropdown-name">meu perfil</span>
                                            </li>

                                            <li className="dropdown-item">
                                                <i className="ri-settings-3-line dropdown-icon"></i>
                                                <span className="dropdown-name">sair</span>
                                            </li>
                                        </ul>
                                    </div>
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
                                   cadastrar viagem
                                </button>
                                <br />
                                <br />
                                <button onClick={gerarPdf}
                                    className="button button-flex">
                                   gerar pdf das suas viagens
                                </button>

                            </div>


                        </div>
                    </section>

                    <section className="us section container" id='us'>
                        <h2 className="section-title">
                            trabalhe conosco
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
                                    viagens que você poderá proporcionar
                                </h2>
                                <div id="container-visitados">
                                    <div class="div1">
                                        <img src={zoologico}
                                            alt="" />
                                    </div>
                                    <div class="div2">
                                        <img src={parque}
                                            alt="" />
                                    </div>
                                    <div class="div3">
                                        <img src={mis}
                                            alt="" />
                                    </div>
                                    <div class="div4">
                                        <img src={sebastiao}
                                            alt="" />
                                    </div>
                                    <div class="div5">
                                        <img src={brotas}
                                            alt="" />

                                    </div>
                                    <div class="div6">
                                        <img src={holambra}
                                            alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* 
                    <section className="message section container" id="message">
                        <div className="message-container grid">
                            <div className="message-data">
                                <h2 className="section-title message-title">
                                    inscreva-se para receber as novidades do nosso site!
                                </h2>
                                <a href="#" className="button">quero agora</a>
                            </div>
                        </div>
                    </section> */}
                </main>
                <footer className="footer section" id='footer'>
                    <div className="footer-container container grid">
                        <div className="footer-content">
                            <a href="#" className="footer-logo" style={{ color: '#6234cf' }}>Travel Sisters</a>
                        </div>
                        <div className="footer-content">
                            <h3 className="footer-title">sobre nós</h3>

                            <ul className="footer_data">
                                <li className="footer-info">como funciona?</li>
                                <li className="footer-info">trabalhe conosco</li>
                            </ul>
                        </div>
                        <div className="footer-content">
                            <h3 className="footer-title">mais informações</h3>
                            <ul className="footer_data">
                                <li className="footer-info">sobre nós</li>
                                <li className="footer-info">perguntas frequentes</li>
                            </ul>
                        </div>
                        <div className="footer-content">
                            <h3 className="footer-title">redes sociais</h3>
                            <ul className="footer_data">
                                <div className="footer-social">
                                    <a href="#" className="footer-social-link">
                                        <i className='bx bxl-facebook'></i>
                                    </a>
                                    <a href="#" className="footer-social-link">
                                        <i className='bx bxl-twitter'></i>
                                    </a>
                                    <a href="#" className="footer-social-link">
                                        <i className='bx bxl-instagram'></i>
                                    </a>
                                </div>
                            </ul>
                        </div>
                    </div>
                    <p className="footer-copy">
                        &#169; Travel Sisters. todos os direitos reservados
                    </p>
                </footer>
            </div>
        </>
    )
}
