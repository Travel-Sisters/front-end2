import React from 'react'
import './Validation.css'

export default function Validation() {
    return (
        <>
            <div id="container2">
                <div class="imagem-vi">

                </div>
                <div class="contratacao">
                    <div class="titulo">
                        <p><b>Praia da Enseada</b></p>
                    </div>
                    <div class="info">
                        <div class="icon">
                            <i class="fa-regular fa-calendar"></i>
                            <p>udhsdaudassuadhak</p>

                            <i class="fa-regular fa-clock"></i>
                            <p>udhsdaudassuadhak</p>

                            <i class="fa-regular fa-map"></i>
                            <p>udhsdaudassuadhak</p>
                        </div>

                        <div class="preco">
                            <p><b> R$200.00 </b></p>
                        </div>
                        <div class="text">
                            <p>quer relaxar e aproveitar o momento? a Enseada é a melhor opção para você. encontre suas companheiras no Terminal Barra Funda e desfrute uma incrível experiência.
                            </p>
                        </div>
                        <div class="fav">
                            <i class="fa-solid fa-star"></i>
                            <p><b>4,8</b> (1,873)</p>
                        </div>
                        <div class="lugares">
                            <p><b>quantidade de lugares (3/8 ocupados)</b></p>
                            <div class="aum">
                                <button onclick="diminuir()"><b>-</b></button>
                                <div id="msg"> <b>0</b></div>
                                <button onclick="aumentar()"><b>+</b></button>
                            </div>
                        </div>
                        <button id="contratar"><p><b>contratar</b></p></button>
                    </div>
                </div>
            </div>
        </>
    )
}
