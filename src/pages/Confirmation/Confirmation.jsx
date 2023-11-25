import React from 'react'

import './Confirmation.css'

function Confirmation() {
    return (
        <>
            <div id="page-confirmation">
                <div id="container">
                    <div class="elementos">
                        <div id="textos">
                            <div class="titulo">
                                <p>
                                    <b>
                                        defina o destino
                                    </b>
                                </p>
                            </div>
                            <div class="resumo">
                                <p>escolha o destino da sua viagem, revise todos os detalhes cuidadosamente e crie um grupo de viagem!
                                </p>
                            </div>
                        </div>
                        <div class="select-box">
                            <input type="text" />
                            <input type="text" placeholder='oi' disabled/>
                            <button id="button" onclick="getLongAndLat()">
                                confirmar
                            </button>
                            <button id="button" onclick="getLongAndLat()">
                                cancelar
                            </button>
                        </div>
                    </div>
                    <div class="mapa" id="mapa"></div>
                </div>
            </div>
        </>
    )
}

export default Confirmation