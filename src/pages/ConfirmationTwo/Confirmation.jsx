import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useNavigate } from 'react-router-dom';
// import * as map from './mapa.js';
// import L from 'leaflet';
import axios from 'axios';

import MenuConfirmation from '../../components/MenuConfirmation/Menu'
import './Confirmation.css'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

function Confirmation() {
    const navigate = useNavigate();
    const [dt_chegada, setDt_chegada] = useState(null)
    const [viagem, setViagem] = useState()

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
        navigate('/motorista');
    };

    const handleFormSubmit = async (evento) => {

        try {
            console.log('SESSION STORAGE MOTORISTA ' + idMotorista);

            //const response = await axios.get(`http://localhost:8080/viagens/pilha/${idMotorista}`);
            axios.get(`${API_URL}/viagens/pilha/${idMotorista}`);

            console.log('Resposta do servidor:', response.data);
            //alert('Viagem desfeita com sucesso!');
            Swal.fire({
                title: 'Viagem desfeita com sucesso!',
                icon: 'ok',
                confirmButtonText: 'OK'
            });
            registerChat()
            navigate('/chat');

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

    const registerChat = async (evento) => {
        setViagem(sessionStorage.getItem('viagemId'))
        const bodyChat = {
            dt_chegada,
            viagem
        }
        try {
            // const responseChat = await axios.post(`http://localhost:8080/chat/publicar`, bodyChat);
            // console.log('Resposta do servidor:', responseChat.data);
            // console.log('')
            // console.log('CHAT REGISTRADO NO BANCO, ID: ', respondeChat.data.viagem)


            navigate('/motorista');
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
                            <MenuConfirmation />
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
                                        placeholder={embarque}
                                        disabled />
                                </div>
                                <div className="field">
                                    <label htmlFor="name">ponto de desembarque</label>
                                    <input type="text" name="name"
                                        placeholder={desembarque}
                                        disabled />
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

                            <div className='button-wrapper'>
                                <button type="submit"
                                    onClick={handleFormSubmit}>
                                    cancelar
                                </button>
                                <button type="submit"
                                    onClick={registerChat}>
                                    confirmar viagem
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Confirmation
