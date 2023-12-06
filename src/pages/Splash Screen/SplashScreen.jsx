import React from 'react'
import { useNavigate } from 'react-router-dom';

import './SplashScreen.css'
import bgRosa from '@/assets/img/bg-pink.png';

function SplashScreen() {
    const navigate = useNavigate();
    const navegarHome = () => {
        navigate('/home');
    };

    return (
        <>
            <main className="main" id='splash-screen-page'>
                <section className="home">
                    <div className="home-container container">
                        <div className="home-data">
                            <span className="home-subtitle">
                                <b>Travel Sisters</b>
                            </span>
                            <h1 className="home-title">
                                trilhe seu próprio
                                caminho</h1>
                            <p className="home-description">
                                bem-vinda ao mundo das viagens que transcendem destinos.
                                aqui, mulheres se unem para explorar,  aprender e rir juntas,
                                formando laços que durarão uma vida inteira.
                            </p>
                            <button onClick={navegarHome}
                                className="home-button">
                                quero conhecer
                            </button>
                        </div>

                        <div className="home-img">
                            <img src={bgRosa}
                                alt="" />
                        </div>
                    </div>

                </section>
            </main>
        </>
    )
}

export default SplashScreen
