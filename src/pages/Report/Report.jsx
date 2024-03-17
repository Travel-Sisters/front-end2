import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './Report.css'

import MenuConfirmation from '@/components/MenuConfirmation/Menu'


export default function Report() {
    const storedViagem = JSON.parse(sessionStorage.getItem('viagem'));
    if (storedViagem) {
        console.log('Detalhes da Viagem:', storedViagem);
    }

    const navigate = useNavigate();
    const navegarConfirmacao = async () => {

        var data = JSON.stringify({
            "calendario": {
                "expiracao": 3600
            },
            "devedor": {
                "cpf": "12345678909",
                "nome": "Francisco da Silva"
            },
            "valor": {
                "original": "123.45"
            },
            "chave": "71cdf9ba-c695-4e3c-b010-abb521a3f1be",
            "solicitacaoPagador": "Cobrança dos serviços prestados."
        })


        try {

            const resposta = await axios.post('https://localhost:3001/pix/cob', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log(response.data);
    
        } catch (error) {
            console.error('Erro ao gerar cobrança', error);
        }



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
                                <div class="icon">
                                    {/* TROCAR ICONE PARA TELEFONE */}
                                    <i class="fa-regular fa-user"></i>
                                    <p>Telefone: {storedViagem.motorista.telefone}</p>
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
