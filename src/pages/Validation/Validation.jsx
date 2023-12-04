
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './Validation.css'

import MenuConfirmation from '../../components/MenuConfirmation/Menu'


export default function Validation() {
    const navigate = useNavigate();

    const navegarChat = () => {
        navigate('/chat');
    };

    return (
        <section className="point" id="page-create-validation">
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

                                    <i id="teste" class="fa-regular fa-clock" style={{ marginLeft: '10px' }}></i>
                                    <p id="teste2">12:00 PM</p>

                                    <i class="fa-solid fa-location-dot" style={{ marginLeft: '10px' }}></i>
                                    <p>Terminal Barra Funda</p>
                                </div>
                                <p id="title">
                                    <b>R$200.00</b>
                                </p>
                                <p className='title' style={{ marginTop: '10px' }}>quer relaxar e aproveitar o momento? a Enseada é a melhor opção para você. encontre suas companheiras no Terminal Barra Funda e desfrute uma incrível experiência.</p>
                                <br />
                                <br />
                                <div class="botao" style={{marginBottom: '40px'}}>
                                    <button id="butt" >entrar no chat </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
