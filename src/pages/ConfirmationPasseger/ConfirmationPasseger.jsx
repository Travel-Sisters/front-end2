import React, {useEffect, useState, useRef} from 'react';
import {MapContainer, TileLayer, Marker} from "react-leaflet";
import {useNavigate} from 'react-router-dom';
// import * as map from './mapa.js';
// import L from 'leaflet';
import axios from 'axios';

import MenuConfirmation from '../../components/MenuConfirmation/Menu'
import './ConfirmationPasseger.css'

function Confirmation() {
    const navigate = useNavigate();

    const storedViagem = JSON.parse(sessionStorage.getItem('viagem'));
    if (storedViagem) {
        console.log('Detalhes da Viagem:', storedViagem);
    }
    const idMotorista = sessionStorage.getItem('idMotoristaLogin') || {};

    const navegarChat = () => {
        alert('Viagem confirmada!')
        navigate('/chat');
    };

    const navegarHome = () => {
        alert('Ok!')
        navigate('/passageira');
    };

    const [selectedPosition, setSelectedPosition] = useState(null);

    const handleMapClick = (event) => {
        setSelectedPosition([event.latlng.lat, event.latlng.lng]);
    };

    return (
        <>
            <section className="point" id="page-create-point">
                <div className="point-container container grid">
                    <div id="page-create-point">
                        <header>
                            <MenuConfirmation/>
                        </header>
                        <form>
                            <h1 style={
                                {
                                    color: '#202020',
                                    fontSize: '1.7rem'
                                }
                            }>confirme seu destino</h1>
                            <p style={
                                {
                                    color: '#999999',
                                    fontSize: '1rem',
                                    fontWeight: '500'
                                }
                            }>revise os detalhes da sua jornada e junte-se ao seu grupo de viagem!</p>

                            <fieldset>
                                <div className="field">
                                    <label htmlFor="name">ponto de embarque</label>
                                    <input type="text" name="name"
                                        placeholder={storedViagem.pontoEmbarque.nome}
                                        disabled/>
                                </div>
                                <div className="field">
                                    <label htmlFor="name">ponto de desembarque</label>
                                    <input type="text" name="name"
                                        placeholder={storedViagem.pontoDesembarque.nome}
                                        disabled/>
                                </div>
                            </fieldset>

                            {/* <div className="mapa" id="mapa">
                                <div className="mapa-container">
                                    <MapContainer className="markercluster-map"
                                        center={
                                            [51.0, 19.0]
                                        }
                                        zoom={15}
                                        maxZoom={0}>
                                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' />
                                    </MapContainer>
                                </div>
                            </div> */}


                            <button type="submit"
                                onClick={navegarHome}>
                                cancelar
                            </button>

                            <button type="submit"
                                onClick={navegarChat}>
                                confirmar viagem
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Confirmation
