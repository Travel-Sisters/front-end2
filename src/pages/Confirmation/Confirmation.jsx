import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useNavigate } from 'react-router-dom';
import * as map from './mapa.js';
import L from 'leaflet';
import axios from 'axios';

import './Confirmation.css'
import Menu from '../../components/Menu/Menu'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import config from '../../../config';

function Confirmation() {
    const navigate = useNavigate();

    const embarque = sessionStorage.getItem('embarque') || {};
    const desembarque = sessionStorage.getItem('desembarque') || {};
    const idMotorista = sessionStorage.getItem('idMotoristaLogin') || {};

    const navegarChat = () => {
        //alert('Viagem confirmada!')
        Swal.fire({
            title: 'Viagem confirmada!',
            icon: 'ok',
            confirmButtonText: 'OK'
        });
        navigate('/chat');
    };

    const handleFormSubmit = async (evento) => {
        try {
            console.log('SESSION STORAGE MOTORISTA ' + idMotorista);

            //const response = await axios.get(`http://localhost:8080/viagens/pilha/${idMotorista}`);
            axios.get(`${config.API_URL}/viagens/pilha/${idMotorista}`);

            console.log('Resposta do servidor:', response.data);

            //alert('Viagem desfeita com sucesso!');
            Swal.fire({
                title: 'Viagem desfeita com sucesso!',
                icon: 'ok',
                confirmButtonText: 'OK'
            });
            navigate('/contratacao');

        } catch (error) {
            console.error('Erro ao cancelar:', error);
            //alert('OPS! Alguma coisa deu errado!');
            Swal.fire({
                title: 'OPS! Alguma coisa deu errado!',
                icon: 'error',
                confirmButtonText: 'OK'
            });
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
            <section className="confirmation id=" confirmation>
                <div className="confirmation-container container grid">
                    <Menu/>
                    <div className="confirmation-data">
                        <h2 className="confirmation-title">confirme o destino</h2>
                        <p className="confirmation-description">
                            revise os detalhes da sua viagem e junte-se ao seu grupo de viagem!
                        </p>
                    </div>


                </div>
            </section>


            <div id="page-confirmation">
                <div id="container">
                    <div className="elementos">
                        <div className="textos">
                            <div className="titulo">
                                <p>
                                    <b>
                                        confirme seu destino
                                    </b>
                                </p>
                            </div>
                            <div className="resumo">
                                <p>revise todos os detalhes cuidadosamente!
                                </p>
                            </div>
                        </div>

                        <br />

                        <div className="select-box">
                            <label htmlFor="text">ponto de encontro</label>

                            <input type="text"
                                placeholder={embarque}
                                disabled />
                            <br />

                            <label htmlFor="text">ponto de desembarque</label>
                            <input type="text"
                                placeholder={desembarque}
                                disabled />
                            <br />
                            <button className="button button-flex" type="submit"
                                onClick={navegarChat}>
                                confirmar
                            </button>

                            <button className="button button-flex" type="submit" style={{ border: 'none', marginRight: '10px' }}>
                                gerar TXT
                            </button>

                            <button className="button button-flex" type="submit"
                                onClick={handleFormSubmit}>
                                cancelar
                            </button>

                        </div>
                    </div>
                    <div className="mapa" id="mapa">
                        <div className="mapa-container">
                            <MapContainer className="markercluster-map"
                                center={
                                    [51.0, 19.0]
                                }
                                zoom={4}
                                maxZoom={18}>
                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
                            </MapContainer>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Confirmation