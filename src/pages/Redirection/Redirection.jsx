import React from 'react'

import './Redirection.css'

import Rosa from '@/assets/img/direction-pink.png';
import Blue from '@/assets/img/direction-blue.png';
import Roxo from '@/assets/img/direction-purple.png';



function Redirection() {
    return (
        <div className="container" id='redirection-page'>
            <div className="card-container">
                <article className="card-article">
                    <img src={Rosa} alt="image" className="card-img" />

                    <div className="card-data">
                        <span className="card-description">passageira</span>
                        <h2 className="card-title">venha se aventurar e fazer viagens incríveis</h2>
                        <a href="#" className="card-button">quero fazer parte!</a>
                    </div>
                </article>

                <article className="card-article">
                    <img src={Roxo} alt="image" className="card-img" />

                    <div className="card-data">
                        <span className="card-description">motorista</span>
                        <h2 className="card-title">venha se aventurar e proporcionar viagens incríveis</h2>
                        <a href="#" className="card-button">quero fazer parte!</a>
                    </div>
                </article>

                <article className="card-article">
                    <img src={Blue} alt="image" className="card-img" />

                    <div className="card-data">
                        <span className="card-description">motorista e passageira</span>
                        <h2 className="card-title">aproveite o melhor dos dois mundos e vivencie viagens incríveis.</h2>
                        <a href="#" className="card-button">quero fazer parte!</a>
                    </div>
                </article>
            </div>
        </div>
    )
}

export default Redirection