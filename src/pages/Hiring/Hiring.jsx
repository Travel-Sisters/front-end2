import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './Hiring.css';
import Menu from '../../components/Menu/Menu'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import API_URL from './config';

function Hiring() {

    const idMotorista = sessionStorage.getItem('idMotoristaLogin') || {};

    const navigate = useNavigate();

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
                //const response = await fetch('http://localhost:8080/enderecos/');
                axios.get(`${API_URL}/enderecos/`);
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

            //const response = await axios.post(`http://localhost:8080/viagens/cadastrar/${idMotorista}`, viagem);
            axios.get(`${API_URL}/viagens/cadastrar/${idMotorista}`, viagem);
            console.log('Resposta do servidor:', response.data);

            //alert('Viagem cadastrada com sucesso!');
            Swal.fire({
                title: 'Viagem cadastrada com sucesso!',
                icon: 'ok',
                confirmButtonText: 'OK'
            });
            sessionStorage.setItem('embarque', response.data.pontoEmbarque.nome);
            sessionStorage.setItem('desembarque', response.data.pontoDesembarque.nome);
            navigate('/confirmacao');

        } catch (error) {
            console.error('Erro ao cadastrar o viagem:', error);
            //alert('OPS! Alguma coisa deu errado!');
            Swal.fire({
                title: 'OPS! Alguma coisa deu errado!',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };


    return (
        <>
            {/* <section className="profile" id="page-profile">
                <div className="profile-container container grid">
                    <Menu />

                    <div id="container">
                        <div class="titulo">
                            <p>
                                <b>cadastre sua viagem</b>
                            </p>
                        </div>
                        <div class="sub">
                            <p>endereços e horários</p>
                        </div>
                        <div class="inputs">
                            <div class="lado">

                                <label htmlFor="text">descrição</label>

                                <input id="descricao" name="descricao"
                                    value={
                                        descricao.descricao
                                    }
                                    onChange={
                                        (e) => setDescricao(e.target.value)
                                    }
                                    required
                                    placeholder="insira aqui informações relevantes sobre a viagem" />

                                <label htmlFor="text">data da viagem</label>

                                <input id="data" name="data"
                                    value={
                                        data.data
                                    }
                                    onChange={
                                        (e) => setData(e.target.value)
                                    }
                                    required
                                    placeholder="Insira uma data" />

                                <label htmlFor="text">horário</label>

                                <input id="valor" name="valor"
                                    value={
                                        valor.valor //mudar
                                    }
                                    onChange={
                                        (e) => setValor(e.target.value)
                                    }
                                    required
                                    placeholder="Insira um horário" />


                            </div>
                            <div class="lado2">
                                <label htmlFor="text">Valor da V</label>

                                <select id="pontoEmbarque" name="pontoEmbarque"
                                    value={
                                        pontoEmbarque ? pontoEmbarque.nome : ''
                                    }
                                    onChange={
                                        (e) => handleChange(e, 'embarque')
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

                                <br />
                                <br />

                                <label htmlFor="text">ponto de encontro</label>

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

                                <br />

                                <label htmlFor="text">horário</label>

                                <input type="time" id="horario" name="horario"
                                    value={
                                        horario.horario
                                    }
                                    onChange={
                                        (e) => setHorario(e.target.value)
                                    }
                                    required
                                    placeholder="horário" />

                            </div>
                        </div>
                    </div>

                    <br />
                    <div class="butt">
                        <button id="cad" type="submit"
                            onClick={handleFormSubmit}>cadastrar viagem</button>
                        <button id="limp" onclick="limpar()">X limpar tudo</button>
                    </div>

                </div>
            </section> */}


            <div id="container">
                <div class="titulo">
                    <p>
                        <b>cadastre sua viagem</b>
                    </p>
                </div>
                <div class="sub">
                    <p>endereços e horários</p>
                </div>
                <div class="inputs">
                    <div class="lado">


                        <label htmlFor="text">descrição</label>

                        <input id="descricao" name="descricao"
                            value={
                                descricao.descricao
                            }
                            onChange={
                                (e) => setDescricao(e.target.value)
                            }
                            required
                            placeholder="insira aqui informações relevantes sobre a viagem"/>

                        <label htmlFor="text">data da viagem</label>

                        <input id="data" name="data"
                            value={
                                data.data
                            }
                            onChange={
                                (e) => setData(e.target.value)
                            }
                            required
                            placeholder="2025-05-12"/>

                        <label htmlFor="text">preço</label>

                        <input id="valor" name="valor"
                            value={
                                valor.valor
                            }
                            onChange={
                                (e) => setValor(e.target.value)
                            }
                            required
                            placeholder="R$00.00"/>


                    </div>
                    <div class="lado2">
                        <label htmlFor="text">ponto de encontro</label>

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

                        <br/>
                        <br/>

                        <label htmlFor="text">ponto de encontro</label>

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

                        <br/>

                        <label htmlFor="text">horário</label>

                        <input type="time" id="horario" name="horario"
                            value={
                                horario.horario
                            }
                            onChange={
                                (e) => setHorario(e.target.value)
                            }
                            required
                            placeholder="horário"/>

                    </div>
                </div>
            </div>

            <br />
            <div class="butt">
                <button id="cad" type="submit"
                    onClick={handleFormSubmit}>cadastrar viagem</button>
                <button id="limp" onclick="limpar()">X limpar tudo</button>
            </div> 

        </>
    )
}

export default Hiring
