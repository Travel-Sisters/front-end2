import React, {useState, useEffect} from 'react';
import axios from 'axios';
import 'sweetalert2/dist/sweetalert2.min.css';


export default function Viagem() {

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
        const selectedAddress = enderecos.find((endereco) => endereco.rua === event.target.value);

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

            alert('Viagem foi cadastrada com sucesso!');

        } catch (error) {
            console.error('Erro ao cadastrar o viagem:', error);
            alert('OPS! Alguma coisa deu errado!');
        }
    };


    return (
        <div id="page" className="flex">
            <div>
                <header></header>
                <main>
                    <div className="headline">
                        <h1>criar uma viagem</h1>
                    </div>
                    <form>
                        <div className="input-wrapper">
                            <label htmlFor="text">Data</label>
                            <input id="data" name="data"
                                value={
                                    data.data
                                }
                                onChange={
                                    (e) => setData(e.target.value)
                                }
                                required
                                placeholder="data viagem"/>
                        </div>


                        <div className="input-wrapper">
                            <label htmlFor="pontoEmbarque">Escolha um ponto de embarque:</label>
                            <select id="pontoEmbarque" name="pontoEmbarque"
                                value={
                                    pontoEmbarque ? pontoEmbarque.rua : ''
                                }
                                onChange={
                                    (e) => handleChange(e, 'embarque')
                            }>
                                <option value="">Selecione um endereço</option>
                                {
                                enderecos.map((endereco) => (
                                    <option key={
                                            endereco.id
                                        }
                                        value={
                                            endereco.rua
                                    }>
                                        {
                                        endereco.rua
                                    } </option>
                                ))
                            } </select>
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="pontoDesembarque">Escolha um ponto de desembarque:</label>
                            <select id="pontoDesembarque" name="pontoDesembarque"
                                value={
                                    pontoDesembarque ? pontoDesembarque.rua : ''
                                }
                                onChange={
                                    (e) => handleChange(e, 'desembarque')
                            }>
                                <option value="">Selecione um endereço</option>
                                {
                                enderecos.map((endereco) => (
                                    <option key={
                                            endereco.id
                                        }
                                        value={
                                            endereco.rua
                                    }>
                                        {
                                        endereco.rua
                                    } </option>
                                ))
                            } </select>
                        </div>


                        <div className="input-wrapper">
                            <label htmlFor="text">Descrição</label>
                            <input id="descricao" name="descricao"
                                value={
                                    descricao.descricao
                                }
                                onChange={
                                    (e) => setDescricao(e.target.value)
                                }
                                required
                                placeholder="descrição"/>
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="text">Horário</label>
                            <input id="horario" name="horario"
                                value={
                                    horario.horario
                                }
                                onChange={
                                    (e) => setHorario(e.target.value)
                                }
                                required
                                placeholder="horário"/>
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="number">Valor</label>
                            <input id="valor" name="valor"
                                value={
                                    valor.valor
                                }
                                onChange={
                                    (e) => setValor(e.target.value)
                                }
                                required
                                placeholder="valor"/>
                        </div>

                        <button type="submit"
                            onClick={handleFormSubmit}>criar</button>


                    </form>


                </main>
            </div>
        </div>
    );
}
