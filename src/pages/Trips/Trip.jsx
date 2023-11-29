import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './Trip.css'

import Menu from '../../components/Menu/Menu';

import roxo from '@/assets/img/roxo.png';

export default function Trip() {


    const navigate = useNavigate();

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

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div id="page-trip">
            <Menu />
            <section className="recommendations section container" id="recommendations">
                <div className="recommendations-container grid">
                    <h2 className="section-title about-title" style={{ fontSize: '1.8rem' }}>
                        confira suas viagens até agora
                    </h2>
                    <section class="cards">
                        <div class="card">
                            <img src={roxo} alt="" />

                            <div class="content">
                                <h3>Pico do Olho D’Água</h3>
                                <p>
                                    faça uma trilha incrível e explore novos horizontes.
                                </p>
                            </div>
                        </div>

                        <div class="card">
                            <img src={roxo} alt="" />

                            <div class="content">
                                <h3>São Sebastião</h3>
                                <p>
                                    divirta-se, pegue um bronze e construa castelos na areia!
                                </p>
                            </div>
                        </div>

                        <div class="card">
                            <img src={roxo} alt="" />
                            <div class="content">
                                <h3>Praia da Enseada</h3>
                                <p>
                                    pé na areia, a caipirinha, água de coco, a cervejinha.
                                </p>
                            </div>
                        </div>
                    </section>
                    <br />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', width: '100%' }}>
                    <button onClick={gerarCsv} className="button">
                        gerar CSV
                    </button>
                    <button onClick={gerarTxt} className="button">
                        gerar TXT
                    </button>
                </div>
            </section>
        </div>
    )
}
