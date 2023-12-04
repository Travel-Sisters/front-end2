
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './Report.css'

import MenuConfirmation from '../../components/MenuConfirmation/Menu'


export default function Report() {
    const navigate = useNavigate();

    const navegarChat = () => {
        navigate('/chat');
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
                                        <b>Praia da Enseada</b>
                                    </p>
                                    {/* <i id="teste" class="fa-regular fa-map" style={{height: '1%'}}></i> */}
                                    <p id="teste2">10,6 km</p>
                                </div>
                                <div class="icon">
                                    <i class="fa-regular fa-calendar"></i>
                                    <p>29 de agosto, 2023</p>

                                    <i id="teste" class="fa-regular fa-clock"></i>
                                    <p id="teste2">12:00 PM</p>
                                </div>
                                <div class="icon">
                                    <i class="fa-solid fa-location-dot"></i>
                                    <p>terminal Barra Funda, Linha Vermelha</p>
                                </div>
                                <div class="icon">
                                    <i class="fa-regular fa-user"></i>
                                    <p>motorista Rosane Almeida</p>
                                </div>
                                <div class="icon">
                                    <i class="fa-solid fa-van-shuttle"></i>
                                    <p>van rosa, placa BZB-0579</p>
                                </div>
                                <div class="reserva">
                                    <div class="qtd">
                                        <div class="num"><p><b>1</b></p></div>
                                        <p>lugar reservado</p>
                                    </div>
                                </div>
                                <div class="botao">
                                    <button id="butt">entrar no chat </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
