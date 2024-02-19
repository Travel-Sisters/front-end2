import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useNavigate } from 'react-router-dom';
// import * as map from './mapa.js';
// import L from 'leaflet';
import axios from 'axios';

import MenuConfirmation from '../../components/MenuConfirmation/Menu'
import './RegisterViagem.css'

export default function Validation() {

    const navigate = useNavigate();

    const idMotorista = sessionStorage.getItem('idMotoristaLogin') || {};

    const [data, setData] = useState('');
    const [enderecos, setEnderecos] = useState([]);
    const [pontoEmbarque, setpontoEm] = useState(null);
    const [pontoDesembarque, setpontoDes] = useState(null);
    const [descricao, setDescricao] = useState('');
    const [horario, setHorario] = useState('');
    const [valor, setValor] = useState(0.0);
    const [motorista, setMotorista] = useState({});

    const handleChange = (event, pontoType) => {
        const selectedAddress = enderecos.find((endereco) => endereco.nome === event.target.value);

        if (pontoType === 'embarque') {
            setpontoEm(selectedAddress);
        } else if (pontoType === 'desembarque') {
            setpontoDes(selectedAddress);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/enderecos/');
                const data = await response.json();

                setEnderecos(data);
                console.log(data)

            } catch (error) {
                console.error('Erro ao buscar dados do banco de dados:', error);
            }
        };

        fetchData();
    }, []);


    const handleFormSubmit = async (evento) => {
        evento.preventDefault();
        const viagem = {
            data,
            pontoEmbarque,
            pontoDesembarque,
            descricao,
            horario,
            valor,
            motorista
        };

        try {
            console.log('SESSION STORAGE MOTORISTA ' + idMotorista);

            const response = await axios.post(`http://localhost:8080/viagens/cadastrar/${idMotorista}`, viagem);
            console.log('Resposta do servidor:', response.data);

            alert('Viagem cadastrada com sucesso!');
            sessionStorage.setItem('embarque', response.data.pontoEmbarque.nome);
            sessionStorage.setItem('desembarque', response.data.pontoDesembarque.nome);
            sessionStorage.setItem('viagemId', response.data.id)
            
            navigate('/confirmacao');

        } catch (error) {
            console.error('Erro ao cadastrar o viagem:', error);
            alert('OPS! Alguma coisa deu errado!');
        }
    };

    // const navegarChat = () => {
    //     alert('Viagem confirmada!')
    //     navigate('/chat');
    // };

    // const handleFormSubmit = async (evento) => {
    //     try {
    //         console.log('SESSION STORAGE MOTORISTA ' + idMotorista);

    //         const response = await axios.get(`http://localhost:8080/viagens/pilha/${idMotorista}`);
    //         console.log('Resposta do servidor:', response.data);

    //         alert('Viagem desfeita com sucesso!');
    //         navigate('/contratacao');

    //     } catch (error) {
    //         console.error('Erro ao cancelar:', error);
    //         alert('OPS! Alguma coisa deu errado!');
    //     }
    // };

    // const [selectedPosition, setSelectedPosition] = useState(null);

    // const handleMapClick = (event) => {
    //     setSelectedPosition([event.latlng.lat, event.latlng.lng]);
    // };


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
                                    <select id="pontoEmbarque" name="pontoEmbarque"
                                        value={
                                            pontoEmbarque ? pontoEmbarque.nome : ''
                                        }
                                        onChange={
                                            (e) => handleChange(e, 'embarque')
                                    }>
                                        <option selected disabled value="">escolha os lugares disponíveis</option>
                                        {
                                        enderecos.map((endereco) => (
                                            <option key={
                                                    endereco.id
                                                }
                                                value={
                                                    endereco.nome
                                            }>
                                                {
                                                endereco.nome
                                            } </option>
                                        ))
                                    } </select>
                                </div>
                                <div className="field">
                                    <label htmlFor="name">ponto de desembarque</label>
                                    <select id="pontoDesembarque" name="pontoDesembarque"
                                        value={
                                            pontoDesembarque ? pontoDesembarque.nome : ''
                                        }
                                        onChange={
                                            (e) => handleChange(e, 'desembarque')
                                    }>
                                        <option value="">escolha os lugares disponíveis</option>
                                        {
                                        enderecos.map((endereco) => (
                                            <option key={
                                                    endereco.id
                                                }
                                                value={
                                                    endereco.nome
                                            }>
                                                {
                                                endereco.nome
                                            } </option>
                                        ))
                                    } </select>
                                </div>

                                <hr style={{ borderColor: '#F8F8FC' }} />
                            </fieldset>
                            <fieldset>
                                <div className="field">
                                    <label htmlFor="name">data</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={
                                            data.data
                                        }
                                        onChange={
                                            (e) => setData(e.target.value)
                                        }
                                        required
                                        placeholder="2025-05-12"
                                    />
                                </div>
                                <div className="field">
                                    <label htmlFor="name">horário</label>
                                    <input
                                        type="time"
                                        name="name"
                                        value={
                                            horario.horario
                                        }
                                        onChange={
                                            (e) => setHorario(e.target.value)
                                        }
                                        required
                                        placeholder="horário"
                                    />
                                </div>
                                <div className="field">
                                    <label htmlFor="name">valor</label>
                                    <input
                                        type="number"
                                        name="name"
                                        
                                        value={
                                            valor.valor
                                        }
                                        onChange={
                                            (e) => setValor(e.target.value)
                                        }
                                        required
                                        placeholder="R$00.00"
                                    />
                                </div>
                                <div className="field">
                                    <label htmlFor="name">descrição da viagem</label>
                                    <textarea
                                        value={
                                            descricao.descricao
                                        }
                                        onChange={
                                             (e) => setDescricao(e.target.value)
                                        } 
                                        required
                                        placeholder="insira aqui informações relevantes sobre a viagem" />                                      
                                </div>
                            </fieldset>
                            <div className='button-wrapper'>
                            <button type="submit" onClick={handleFormSubmit}>
                                cadastrar viagem
                            </button>
                            <button id="limp" onclick="limpar()">limpar tudo</button>
                            </div>
                           
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}


