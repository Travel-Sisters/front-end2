import React, {useState} from 'react';
import axios from 'axios';
import 'sweetalert2/dist/sweetalert2.min.css';


export default function Viagem() {
    const [data, setData] = useState('');
    const [pontoEmbarque, setpontoEm] = useState('');
    const [pontoDesembarque, setpontoDes] = useState('');
    const [descricao, setDescricao] = useState('');
    const [horario, setHorario] = useState('');
    const [valor, setValor] = useState(0.0);

    const handleFormSubmit = async (evento) => {
        evento.preventDefault();
        const viagem = {
            data,
            pontoEmbarque,
            pontoDesembarque,
            descricao,
            horario,
            valor
        };

        try {
            const response = await axios.post('http://localhost:8080/viagens/', viagem);
            console.log('Resposta do servidor:', response.data);
            alert('Viagem foi cadastrada com sucesso!');
            setData('');
            setpontoEm('');
            setpontoDes('');
            setDescricao('');
            setHorario('');
            setValor('');
        } catch (error) {
            console.error('Erro ao cadastrar o viagem:', error);
            alert('OPS! Alguma coisa deu errado!');
        }
    };

    const handleFormSubmitCsv = async (evento) => {
        evento.preventDefault();
        const viagem = {
            data,
            pontoEmbarque,
            pontoDesembarque,
            descricao,
            horario,
            valor
        };

        try {
            const response = await axios.post('http://localhost:8080/viagens/csv', viagem);
            console.log('Resposta do servidor:', response.data);
            alert('Dados da viagem foram enviadados com sucesso!');
            setData('');
            setpontoEm('');
            setpontoDes('');
            setDescricao('');
            setHorario('');
            setValor('');
        } catch (error) {
            console.error('Erro ao enviar os dados da viagem:', error);
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
                            <label htmlFor="text">Ponto de embarque</label>
                            <input id="pontoEmbarque" name="pontoEmbarque"
                                value={
                                    pontoEmbarque.pontoEmbarque
                                }
                                onChange={
                                    (e) => setpontoEm(e.target.value)
                                }
                                required
                                placeholder="ponto embarque"/>
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="text">Ponto de desembarque</label>
                            <input id="pontoDesembarque" name="pontoDesembarque"
                                value={
                                    pontoDesembarque.pontoDesembarque
                                }
                                onChange={
                                    (e) => setpontoDes(e.target.value)
                                }
                                required
                                placeholder="ponto desembarque"/>
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

                        <button type="submit"
                            onClick={handleFormSubmitCsv}>Gerar arquivo CSV</button>

                    </form>


                </main>
            </div>
        </div>
    );
}
