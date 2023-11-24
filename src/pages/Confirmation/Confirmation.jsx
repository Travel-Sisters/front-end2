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
                            <select name="select1" id="select1">
                                <option value="" disabled selected>selecione uma saída</option>
                            </select>
                            <select name="select2" id="select2">
                                <option value="" disabled selected>selecione um destino</option>
                            </select>
                            <button id="button" onclick="getLongAndLat()">
                                <p>confirmar</p>
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