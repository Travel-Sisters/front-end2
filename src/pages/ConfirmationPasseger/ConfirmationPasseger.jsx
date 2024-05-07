import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { api, api_pix } from '../../api';
// import * as map from './mapa.js';
// import L from 'leaflet';

import MenuConfirmation from '../../components/MenuConfirmation/Menu'
import './ConfirmationPasseger.css'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import config from '../../../config';

function Confirmation() {
    const [dadoUser, setDadoUser] = useState(null);

    const navigate = useNavigate();

    const storedViagem = JSON.parse(sessionStorage.getItem('viagem'));
    sessionStorage.setItem('viagemId', storedViagem.id)

    if (storedViagem) {
        console.log('Detalhes da Viagem:', storedViagem);
    }
    const idViagem = storedViagem.id
    const idUsuario = sessionStorage.getItem('idUsuarioLogin') || {};

    console.log(idViagem)
    console.log("-" + idUsuario)

    const navegarPagamento = (event) => {
        event.preventDefault(); // Impede o comportamento padrão do evento (recarregar a página)

        try {

   //         api.post(`http://localhost:8080/viagens/cadastrarUsuarioViagem/${idViagem}/${idUsuario}`);
            const response = api.post(`/viagens/cadastrarUsuarioViagem/${idViagem}/${idUsuario}`);


            getPix()

        } catch (error) {
            console.error('Erro ao realizar a requisição:', error);
            Swal.fire({
                title: 'Erro ao confirmar viagem',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    const getPix = async () => {
        try {

            var desc = `Data da viagem ${storedViagem.data}, Horário: ${storedViagem.horario}, Detalhes da viagem: ${storedViagem.descricao}, Motorista: ${storedViagem.motorista.usuario.nome}, Telefone da motorista: ${storedViagem.motorista.telefone}`

            var data = JSON.stringify({
                "calendario": {
                    "expiracao": 3600
                },
                "devedor": {
                    "cpf": "12345678909",
                    "nome": sessionStorage.getItem('usuario')
                },
                "valor": {
                    "original": parseFloat(storedViagem.valor).toFixed(2).toString()
                },
                "chave": "travel@sisters.com.br",
                "solicitacaoPagador": desc
            })

            Swal.fire({
                title: 'Gerando QRCode',
                // text: 'Mensagem do Alerta',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false
              });

            const resposta = await api_pix.post('/cob', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const pix = {
                "id": resposta.data.response.txid,
                "expiracao": resposta.data.response.calendario.expiracao,
                "locid": resposta.data.response.loc.id,
                "pixCopiaECola": resposta.data.response.pixCopiaECola
            }

            console.log(resposta.data);
            sessionStorage.setItem('pix', JSON.stringify(pix))
            navigate('/pagamento');

        } catch (error) {
            console.error('Erro ao gerar cobrança', error);
            Swal.fire({
                title: "erro ao gerar cobrança, tente novamente mais tarde",
                icon: "error",
            })
        }
        // alert("Viagem confirmada")
    }

    const navegarHome = () => {
        alert('Ok!')
        navigate('/passageira');
    };

    const [selectedPosition, setSelectedPosition] = useState(null);

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
                                        placeholder={storedViagem.pontoEmbarque.nome}
                                        disabled />
                                </div>
                                <div className="field">
                                    <label htmlFor="name">ponto de desembarque</label>
                                    <input type="text" name="name"
                                        placeholder={storedViagem.pontoDesembarque.nome}
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
                                    onClick={navegarHome}>
                                    cancelar
                                </button>
                                <button type="submit"
                                    onClick={navegarPagamento}>
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
