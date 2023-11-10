import React, {useState} from 'react';
import './Register.css';

import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import rosa from '../../assets/img/rosa.png';
import eye from '../../assets/img/eye.svg';
import eyeOff from '../../assets/img/eye-off.svg';
import bg from '../../assets/img/bg.jpg';

export default function Register() {
    const navigate = useNavigate();
    const [cnh, setCnh] = useState('');
    const [placaVan, setPlacaVan] = useState('');
    const [fkEmpresa, setFkEmpresa] = useState('');
    const [fkUsuario, setFkUsuario] = useState('');


    const handleFormSubmit = async (evento) => {
        evento.preventDefault();
        const motorista = {
            cnh,
            placaVan,
            fkEmpresa,
            fkUsuario
        };

        try {
            const storedResposta = sessionStorage.getItem('resposta');
            const meusDados = storedResposta ? JSON.parse(storedResposta) : null;

            console.log('SESSION STORAGE MEUS DADOS' + storedResposta)
        
            setFkUsuario(meusDados.userId)

            const response = await axios.post('http://localhost:8080/motoristas/cadastrar', motorista);
            console.log('Resposta do servidor:', response.data);
            alert('Usuário foi cadastrado com sucesso!');
            setCnh('');
            setPlacaVan('');
            setFkEmpresa('');

            navigate('');
        } catch (error) {
            console.error('Erro ao cadastrar o usuário:', error);
            alert('OPS! Alguma coisa deu errado!');
        }
    };

    return (
        <div id="page" className="flex">
            <div>
                <header>
                    <img src={rosa}
                        alt=""/>
                </header>
                <main>
                    <div className="headline">
                        <h1>Criar uma conta de Motorista</h1>
                    </div>
                    <form>
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
                                placeholder="cnh"/>
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="placaVan">Placa da Van</label>
                            <input id="placaVan" name="placaVan"
                                value={
                                    placaVan.placaVan
                                }
                                onChange={
                                    (e) => setPlacaVan(e.target.value)
                                }
                                required
                                placeholder="Placa Van"/>
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="number">Código da empresa</label>
                            <input id="fkEmpresa" name="fkEmpresa"
                                value={
                                    fkEmpresa.fkEmpresa
                                }
                                onChange={
                                    (e) => setFkEmpresa(e.target.value)
                                }
                                required
                                placeholder="digite seu Código da empresa"/>
                        </div>

            
                        <button type="submit"
                            onClick={handleFormSubmit}>criar</button>

                    </form>
                </main>
            </div>
            {/* <img src={bg} alt="" /> */} </div>
    );
}
