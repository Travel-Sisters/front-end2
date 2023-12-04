import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';

import './HomePassenger.css';
import Footer from '../../components/Footer/Footer';

import passageira from '@/assets/img/passageira.png';
import passageiraAmarelo from '@/assets/img/fpassageira.png';
import logo from '@/assets/img/logo.png';
import zoologico from '@/assets/img/zoo.png';
import sebastiao from '@/assets/img/sebastiao.png';
import parque from '@/assets/img/parque.png';
import holambra from '@/assets/img/holambra.png';
import brotas from '@/assets/img/brotas.png';
import mis from '@/assets/img/mis.png';


export default function HomePassenger() {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const [data, setData] = useState('');
    const [viagens, setViagens] = useState([]);
    const [viagem, setViagem] = useState(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleChange = (event, type) => {
        const selectedAddress = viagens.find((viagem) => viagem.pontoEmbarque === event.target.value);
        setViagem(selectedAddress);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/viagens/listar');
                const data = await response.json();

                setViagens(data);
                console.log(data)

            } catch (error) {
                console.error('Erro ao buscar dados do banco de dados:', error);
            }
        };

        fetchData();
    }, []);

    const navegarConfirmacao = () => {
        navigate('/validacao');
    };

    return (
        <>
            <div id="page-passenger">
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
                                    <a href="#visited" className="nav-link">populares</a>
                                </li>
                                <li>
                                    <div className={
                                            `dropdown ${
                                                isDropdownOpen ? 'show-dropdown' : ''
                                            }`
                                        }
                                        id="dropdown-content">
                                        <button className="dropdown-button" id="dropdown-button"
                                            onClick={toggleDropdown}>
                                            <span className="dropdown-name">perfil</span>
                                            <div className="dropdown-icons">
                                                {/* <i className="ri-arrow-down-s-line dropdown-arrow"></i>  */}
                                                {/* <i className="ri-close-line dropdown-close"></i> */} </div>
                                        </button>

                                        <ul className="dropdown-menu">
                                            <li className="dropdown-item">
                                                <i className="ri-map-2-line dropdown-icon"></i>
                                                <span className="dropdown-name">minhas viagens</span>
                                            </li>

                                            <li className="dropdown-item">
                                                <i className="ri-settings-3-line dropdown-icon"></i>
                                                <span className="dropdown-name">editar perfil</span>
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
                            <img src={passageiraAmarelo}
                                alt=""
                                className="home-img"/>

                            <div className="home-data">
                                <h1 className="home-title">
                                    passageira,
                                    <br/>
                                    é com você!
                                </h1>
                                <p className="home-description">
                                    somos uma comunidade exclusiva para
                                                                                                                                                mulheres que desejam explorar juntas.</p>
                            </div>
                        </div>
                    </section>

                    <section className="about section container" id="about">
                        <div className="about-container grid">
                            <img src={passageira}
                                alt=""
                                className="about-img"/>

                            <div className="about-data">
                                <h2 className="section-title about-title">
                                    ainda com dúvidas sobre como funciona?
                                </h2>
                                <div className="about-details">
                                    <p className="about-details-description">
                                        <i className="ri-checkbox-fill about-details-icon"></i>
                                        localização: conte para nós onde você está atualmente.
                                    </p>
                                    <p className="about-details-description">
                                        <i className="ri-checkbox-fill about-details-icon"></i>
                                        destino e ponto de encontro: a fim de facilitar, aqui você terá acesso aos destinos e pontos de encontro já definidos.

                                    </p>
                                    <p className="about-details-description">
                                        <i className="ri-checkbox-fill about-details-icon"></i>
                                        planeje sua viagem: defina o ponto de embarque e desembarque, depois clique em "contratar".
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="search" id="search">
                        <div className="search-container container grid">
                            <br/>
                            <form className="search">
                                {/* <div className="search-field select">
                                    <label className="sr-only" htmlFor="city">localização</label>
                                    <i className="ph-map-pin-light"></i>
                                    <select name="city" id="city">
                                        <option value="0" selected>escolha a localização</option>
                                        <option value="sao-paulo">São Paulo</option>
                                    </select>
                                    <i className="ph-caret-down-light"></i>
                                </div> */}
                                <div className="search-field select">

                                    <select id="viagem" name="viagem"
                                        value={
                                            viagem ? viagem.pontoEmbarque : ''
                                        }
                                        onChange={
                                            (e) => handleChange(e, 'viagem')
                                    }>
                                        <option value="" disabled>escolha os lugares disponíveis</option>
                                        {
                                        viagens.map((viagem) => (
                                            <option key={
                                                    viagem.id
                                                }
                                                value={
                                                    `${
                                                        viagem.pontoEmbarque.nome
                                                    }${
                                                        viagem.pontoDesembarque.nome
                                                    }`
                                            }>
                                                {
                                                `De:  ${
                                                    viagem.pontoEmbarque.nome
                                                } - Para:  ${
                                                    viagem.pontoDesembarque.nome
                                                }`
                                            } </option>
                                        ))
                                    } </select>


                                    <i className="ph-caret-down-light"></i>
                                </div>
                                <button onClick={navegarConfirmacao} className="button button-flex">contratar</button>
                            </form>
                        </div>
                    </section>

                    {/* <section className="recommendations section container" id="recommendations">
                        <div className="recommendations-container grid">
                            <h2 className="section-title about-title">
                                sugestões do dia
                            </h2>
                            <section class="cards">
                                <div class="card">
                                    <img src={pico} alt="" />

                                    <div class="content">
                                        <h3>Pico do Olho D’Água</h3>
                                        <p>
                                            faça uma trilha incrível e explore novos horizontes.
                                        </p>

                                        <div class="location">
                                            <i class="ph-map-pin-light"></i>
                                            São Paulo - SP
                                        </div>
                                    </div>
                                </div>

                                <div class="card">
                                    <img src={hopihari} alt="" />

                                    <div class="content">
                                        <h3>Hopi Hari</h3>
                                        <p>
                                            divirta-se, perca o folego e aproveite as atrações do dia.
                                        </p>

                                        <div class="location">
                                            <i class="ph-map-pin-light"></i>
                                            São Paulo - SP
                                        </div>
                                    </div>
                                </div>

                                <div class="card">
                                    <img src={praia} alt="" />
                                    <div class="content">
                                        <h3>Praia da Enseada</h3>
                                        <p>
                                            pé na areia, a caipirinha, água de coco, a cervejinha.
                                        </p>
                                        <div class="location">
                                            <i class="ph-map-pin-light"></i>
                                            São Paulo - SP
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </section> */}

                    <section className="visited section container" id="visited">
                        <div className="visited-container grid">
                            <div className="visited-data">
                                <h2 className="section-title visited-title">
                                    mais visitados que inspiram
                                </h2>
                                <div id="container-visitados">
                                    <div class="div1">
                                        <img src={zoologico}
                                            alt=""/>
                                    </div>
                                    <div class="div2">
                                        <img src={parque}
                                            alt=""/>
                                    </div>
                                    <div class="div3">
                                        <img src={mis}
                                            alt=""/>
                                    </div>
                                    <div class="div4">
                                        <img src={sebastiao}
                                            alt=""/>
                                    </div>
                                    <div class="div5">
                                        <img src={brotas}
                                            alt=""/>

                                    </div>
                                    <div class="div6">
                                        <img src={holambra}
                                            alt=""/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
                <Footer/>
            </div>
        </>
    )
}
