import React, { useState } from 'react';
// import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import rosa from '../../assets/img/rosa.png';
import eye from '../../assets/img/eye.svg';
import eyeOff from '../../assets/img/eye-off.svg';
import bg from '../../assets/img/bg.jpg';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import config from '../../../config';

export default function Teste() {
    const navigate = useNavigate();
    const idMotorista = sessionStorage.getItem('idMotoristaLogin') || {};

    const handleFormSubmit = async (evento) => {
        try {
            //const response = await api.get(`http://localhost:8080/viagens/fila/${1}`);
            const response = await api.get(`${config.API_URL}/viagens/fila/${1}`);

            console.log('Resposta do servidor:', response.data);
            if (response.status === 200) {
                //alert('viagem finalizada');
                Swal.fire({
                    title: 'Viagem finalizada!',
                    icon: 'ok',
                    confirmButtonText: 'OK'
                });
            } else if (response.status === 404) {
                //alert("viagem não finalizada")
                Swal.fire({
                    title: 'Viagem não finalizada!',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            console.error('Erro ao logar usuário:', error);
        }
    };

    return (
        <>
            <button type="submit"
                onClick={handleFormSubmit}>entrar</button>
        </>
    )
}
