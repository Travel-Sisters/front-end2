import React from 'react';
import * as map from './mapa.js';

import './Confirmation.css'
import axios from 'axios';

function Confirmation() {

    const embarque = sessionStorage.getItem('embarque') || {};
    const desembarque = sessionStorage.getItem('desembarque') || {};
    const idMotorista = sessionStorage.getItem('idMotoristaLogin') || {};

    const handleFormSubmit = async (evento) => {
        try {
            console.log('SESSION STORAGE MOTORISTA ' + idMotorista);

            const response = await axios.get(`http://localhost:8080/viagens/pilha/${idMotorista}`);
            console.log('Resposta do servidor:', response.data);

            alert('Pilha desfeita com sucesso!');

        } catch (error) {
            console.error('Erro ao cancelar:', error);
            alert('OPS! Alguma coisa deu errado!');
        }
    };


    return (
        <>
            <div id="page-confirmation">
                <div id="container">
                    <div class="elementos">
                        <div id="textos">
                            <div class="titulo">
                                <p>
                                    <b>
                                        confirme seu destino
                                    </b>
                                </p>
                            </div>
                            <div class="resumo">
                                <p>escolha o destino da sua viagem, revise
                                                                         todos os detalhes cuidadosamente e crie um grupo de viagem!
                                </p>
                            </div>
                        </div>
                        <div class="select-box">
                            <input type="text"
                                placeholder={embarque}
                                disabled/>
                            <br/>
                            <input type="text"
                                placeholder={desembarque}
                                disabled/>
                            <br/>
                            <button id="button" 
                                //onclick={getLongAndLat()}
                                >
                                confirmar
                            </button>
                            <button id="button"
                                onClick={handleFormSubmit}>
                                cancelar
                            </button>
                        </div>
                    </div>
                    <div onLoad={map.plotMap} className="mapa" id="mapa"></div>
                </div>
            </div>
        </>
    )
}

export default Confirmation
