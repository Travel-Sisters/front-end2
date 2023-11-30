import React from 'react'

import './SplashScreen.css'
import bgRosa from '@/assets/img/bg-pink.png';

function SplashScreen() {
    return (
        <>
            <main className="main" id='splash-screen-page'>
                <section className="home">
                    <div className="home-container container">
                        <div className="home-data">
                            <span className="home-subtitle"><b>Travel Sisters</b></span>
                            <h1 className="home-title">
                                trilhe seu próprio
                                caminho</h1>
                            <p className="home-description">
                                bem-vinda ao mundo das viagens que transcendem destinos.
                                aqui, mulheres se unem para explorar,  aprender e rir juntas,
                                formando laços que durarão uma vida inteira.
                            </p>
                            <a href="#" className="home-button">
                                quero conhecer
                            </a>
                            <b><a href="#" className="home-button-second">
                                quero me inscrever →
                            </a>
                            </b>
                        </div>

                        <div className="home-img">
                            <img src={bgRosa} alt="" />
                        </div>
                    </div>

                </section>
            </main>
        </>
    )
}

export default SplashScreen