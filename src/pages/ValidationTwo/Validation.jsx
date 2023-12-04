import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useNavigate } from 'react-router-dom';
// import * as map from './mapa.js';
// import L from 'leaflet';
import axios from 'axios';

import MenuConfirmation from '../../components/MenuConfirmation/Menu'
import './Validation.css'

export default function Validation() {
    const navigate = useNavigate();

    const embarque = sessionStorage.getItem('embarque') || {};
    const desembarque = sessionStorage.getItem('desembarque') || {};
    const idMotorista = sessionStorage.getItem('idMotoristaLogin') || {};

    const navegarChat = () => {
        alert('Viagem confirmada!')
        navigate('/chat');
    };

    const handleFormSubmit = async (evento) => {
        try {
            console.log('SESSION STORAGE MOTORISTA ' + idMotorista);

            const response = await axios.get(`http://localhost:8080/viagens/pilha/${idMotorista}`);
            console.log('Resposta do servidor:', response.data);

            alert('Viagem desfeita com sucesso!');
            navigate('/contratacao');

        } catch (error) {
            console.error('Erro ao cancelar:', error);
            alert('OPS! Alguma coisa deu errado!');
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
                        <form >
                            <h1 style={{ color: '#202020', fontSize: '1.7rem' }}>cadastre sua viagem</h1>
                            <p style={{ color: '#999999', fontSize: '1rem', fontWeight: '500' }}>defina os endereço, horário e descrição da sua viagem!</p>

                            <fieldset>
                                <div className="field">
                                    <label htmlFor="name">ponto de embarque</label>
                                    <select name="city" id="city">
                                        <option value="0" disabled selected>escolha destino e ponto de encontro</option>
                                        <option value="sao-paulo">Guarulhos - Metrô Barra Funda</option>
                                        <option value="sao-paulo">Praia Grande - Metrô Barra Funda</option>
                                        <option value="sao-paulo">Monguagá - Metrô Luz</option>
                                    </select>
                                </div>
                                <div className="field">
                                    <label htmlFor="name">ponto de desembarque</label>
                                    <select name="city" id="city">
                                        <option value="0" disabled selected>escolha destino e ponto de encontro</option>
                                        <option value="sao-paulo">Guarulhos - Metrô Barra Funda</option>
                                        <option value="sao-paulo">Praia Grande - Metrô Barra Funda</option>
                                        <option value="sao-paulo">Monguagá - Metrô Luz</option>
                                    </select>
                                </div>

                                <hr style={{ borderColor: '#F8F8FC' }} />
                            </fieldset>
                            <fieldset>
                                <div className="field">
                                    <label htmlFor="name">data</label>
                                    <input
                                        type="text"
                                        name="name"
                                    />
                                </div>
                                <div className="field">
                                    <label htmlFor="name">horário</label>
                                    <input
                                        type="time"
                                        name="name"
                                    />
                                </div>
                                <div className="field">
                                    <label htmlFor="name">valor</label>
                                    <input
                                        type="number"
                                        name="name"
                                    />
                                </div>
                                <div className="field">
                                    <label htmlFor="name">descrição da viagem</label>
                                    <textarea />
                                </div>
                            </fieldset>
                            <button type="submit" onClick={handleFormSubmit}>
                                cadastrar viagem
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}


