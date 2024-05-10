import React, { useState } from 'react';
import './Register.css';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import azul from '../../assets/img/logo-azul.png';
import eye from '../../assets/img/eye.svg';
import eyeOff from '../../assets/img/eye-off.svg';
import bg from '../../assets/img/bg-azul.png';
import config from '../../../config';
import { api, api_pix } from '../../api';

export default function Register() {
    const navigate = useNavigate();
    const [telefone,setTelefone] = useState('');
    const [cnh, setCnh] = useState('');
    const [placaVan, setPlacaVan] = useState('');
    const [fkEmpresa, setFkEmpresa] = useState({});
    const [fkUsuario, setFkUsuario] = useState({});


    const handleFormSubmit = async (evento) => {
        evento.preventDefault();
        const motorista = {
            telefone,
            cnh,
            placaVan,
            fkEmpresa,
            fkUsuario
        };

        try {
            const idUsuario = sessionStorage.getItem('idUsuario');

            console.log('SESSION STORAGE USUARIO ' + idUsuario)

            //const response = await api.post(`http://localhost:8080/motoristas/cadastrar/${idUsuario}`, motorista);
            const response = await api.post(`/motoristas/cadastrar/${idUsuario}`, motorista);
            console.log('Resposta do servidor:', response.data);
            Swal.fire({
                title: 'Cadastro efetuado com sucesso!!',
                icon: 'ok',
                confirmButtonText: 'OK'
            });
            navigate("/login")
        } catch (error) {
            console.error('Erro ao cadastrar o motorista:', error);
            Swal.fire({
                title: 'Erro ao cadastrar usuário, verifique os dados e tente novamente.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <div id="page-moto" className="flex">
            <div>
                <header>
                    <img src={azul}
                        alt="" />
                </header>
                <main>
                    <div className="headline">
                        <h1>criar uma conta de motorista</h1>
                        <p>ficamos felizes que você se tornará uma sister motorista!</p>

                    </div>
                    <form>
                    <div className="input-wrapper">
                            <label htmlFor="number">telefone</label>
                            <input id="telefone" name="telefone"
                                value={
                                    cnh.cnh
                                }
                                onChange={
                                    (e) => setTelefone(e.target.value)
                                }
                                required
                                placeholder="insira o número do seu telefone" />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="text">CNH</label>
                            <input id="cnh" name="cnh"
                                value={
                                    cnh.cnh
                                }
                                onChange={
                                    (e) => setCnh(e.target.value)
                                }
                                required
                                placeholder="insira o número da sua CNH" />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="text">CNH</label>
                            <input id="cnh" name="cnh"
                                value={
                                    cnh.cnh
                                }
                                onChange={
                                    (e) => setCnh(e.target.value)
                                }
                                required
                                placeholder="insira o número da sua CNH" />
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="placaVan">placa da van</label>
                            <input id="placaVan" name="placaVan"
                                value={
                                    placaVan.placaVan
                                }
                                onChange={
                                    (e) => setPlacaVan(e.target.value)
                                }
                                required
                                placeholder="digite o número da placa do seu veículo" />
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="number">código da empresa</label>
                            <input id="fkEmpresa" name="fkEmpresa"
                                value={
                                    fkEmpresa.fkEmpresa
                                }
                                onChange={
                                    (e) => setFkEmpresa(e.target.value)
                                }
                                required
                                placeholder="digite seu código da empresa" />
                        </div>


                        <button type="submit"
                            onClick={handleFormSubmit}>criar</button>

                    </form>
                </main>
            </div>
            <img src={bg} alt="" />
        </div>
    );
}
