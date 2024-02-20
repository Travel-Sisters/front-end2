import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './Report.css'

import MenuConfirmation from '../../components/MenuConfirmation/Menu'


export default function Report() {
    const storedViagem = JSON.parse(sessionStorage.getItem('viagem'));
    if (storedViagem) {
        console.log('Detalhes da Viagem:', storedViagem);
    }

    const navigate = useNavigate();
    const navegarConfirmacao = () => {

        navigate('/confirmacao-passageira');
    };

    return (
        <section className="point" id="page-create-point">
            <div className="point-container container grid">
                <div id="page-create-point">
                    <header>
                        <MenuConfirmation />
                    </header>
                    <div id="container">
                        <div class="img"></div>
                        <div class="star">
                            <i class="fa-solid fa-star"></i>
                        </div>
                        <div class="box">
                            <div class="info">
                                <div class="titulo">
                                    <p id="title">
                                        <b>{
                                            storedViagem.pontoDesembarque.nome
                                        }</b>
                                    </p>
                                </div>
                                <div class="icon">
                                    <i class="fa-regular fa-calendar"></i>
                                    <p>{storedViagem.data}</p>
                                    <i id="teste" class="fa-regular fa-clock"></i>
                                    <p id="teste2">{storedViagem.horario}</p>
                                </div>
                                <div class="icon">
                                    <i class="fa-solid fa-location-dot"></i>
                                    <p>Embarque: {storedViagem.pontoEmbarque.nome}</p>
                                </div>
                                <div class="icon">
                                    <i class="fa-regular fa-user"></i>
                                    <p>Motorista: {storedViagem.motorista.usuario.nome}</p>
                                </div>
                                <div class="icon">
                                    <i class="fa-solid fa-van-shuttle"></i>
                                    <p>Van Rosa, placa {storedViagem.motorista.placaVan}</p>
                                </div>
                                
                                <div class="botao">
                                    <button onClick={navegarConfirmacao} id="butt">contratar
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
