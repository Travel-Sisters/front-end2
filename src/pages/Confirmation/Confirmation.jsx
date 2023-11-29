import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import * as map from './mapa.js';
import L from 'leaflet';

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

    const [center, setCenter] = useState({ lat: 13.084622, lng: 80.248357 });
    const ZOOM_LEVEL = 9;
    const mapRef = useRef();

    // useEffect(() => {
    //     const mapContainer = document.getElementById('mapa'); // Obtém o elemento do mapa pelo ID

    //     if (mapContainer) {
    //         //const myMap = L.map(mapContainer).setView([51.505, -0.09], 13);
    //         // Adicione camadas, marcadores ou outras configurações ao mapa, se necessário
    //         const plot = () => {
    //             const map = L.map(mapContainer, {
    //                 layers: MQ.mapLayer(),
    //                 center: [-23.5475000, -46.6361100],
    //                 zoom: 11
    //             });
    //         }
    //     }
    // }, []);

    return (
        <>
            <div id="page-confirmation">
                <div id="container">
                    <div className="elementos">
                        <div id="textos">
                            <div className="titulo">
                                <p>
                                    <b>
                                        confirme seu destino
                                    </b>
                                </p>
                            </div>
                            <div className="resumo">
                                <p>escolha o destino da sua viagem, revise
                                    todos os detalhes cuidadosamente e crie um grupo de viagem!
                                </p>
                            </div>
                        </div>
                        <div className="select-box">
                            <input type="text"
                                placeholder={embarque}
                                disabled />
                            <br />
                            <input type="text"
                                placeholder={desembarque}
                                disabled />
                            <br />
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
                    <div className="mapa" id="mapa">
                        <MapContainer
                            className="markercluster-map"
                            center={[51.0, 19.0]}
                            zoom={4}
                            maxZoom={18}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            />
                        </MapContainer>
                        {/* <Map center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
                            <TileLayer
                                url={"https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=c3P54xf1ln4kPtpVWh4d"}
                                attribution={'&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}
                            />
                        </Map> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Confirmation
