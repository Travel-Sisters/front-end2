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

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCPF] = useState('');
    const [nascimento, setNascimento] = useState('');
    const [senha, setSenha] = useState('');

    const [cnh, setCnh] = useState('');
    const [placaVan, setPlacaVan] = useState('');
    const [fkEmpresa, setFkEmpresa] = useState('');

    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePassword = () => {
        setPasswordVisible((prev) => !prev);
    };

    const handleFormSubmit = async (evento) => {
        evento.preventDefault();
        const usuario = {
            nome,
            email,
            cpf,
            nascimento,
            senha
        };

        const motorista = {
            cnh,
            placaVan,
            fkEmpresa,
        };

     
    try {
        const responseUsuario = await axios.post('http://localhost:8080/usuarios/cadastrar', usuario);
        console.log('Resposta do servidor (Usuário):', responseUsuario.data);

        if (responseUsuario.data.id != null) {
            console.log('Id usuário: ', responseUsuario.data.id);
            alert('Usuário foi cadastrado com sucesso!');

            const idUsuario = responseUsuario.data.id;
            const responseMotorista = await axios.post(`http://localhost:8080/motoristas/cadastrar/${idUsuario}`, motorista);
            console.log('Resposta do servidor (Motorista):', responseMotorista.data);
            
            alert('Motorista foi cadastrado com sucesso!');
            navigate('/login');
        } else {
            alert('Erro ao cadastrar o usuário. Verifique os dados e tente novamente.');
        }
    } catch (error) {
        console.error('Erro ao cadastrar o usuário:', error);
        alert('OPS! Alguma coisa deu errado!');
    }
};


    /* const handleFormSubmitMotorista = async (evento) => {
        evento.preventDefault();
        const motorista = {
            cnh,
            placaVan,
            fkEmpresa,
            fkUsuario
        };

        try {
            console.log(response.data.userId)
            setFkUsuario(response.data.userId)

            const response = await axios.post('http://localhost:8080/motoristas/cadastrar', motorista);
            console.log('Resposta do servidor:', response.data);
            alert('Usuário foi cadastrado com sucesso!');
            setCnh('');
            setPlacaVan('');
            setFkEmpresa('');

            navigate('/login');
        } catch (error) {
            console.error('Erro ao cadastrar o usuário:', error);
            alert('OPS! Alguma coisa deu errado!');
        }
    };*/

    return (
        <div id="page" className="flex">
            <div>
                <header>
                    <img src={rosa}
                        alt=""/>
                </header>
                <main>
                    <div className="headline">
                        <h1>criar uma conta como Motorista</h1>
                        <p>
                            faça login ou registre-se para começar a para trilhar seu caminho
                                                                                                                                                                        ainda hoje.
                        </p>
                    </div>
                    <form>
                        <div className="input-wrapper">
                            <label htmlFor="text">nome completo</label>
                            <input id="nome" type="text" name="nome"
                                value={
                                    nome.nome
                                }
                                onChange={
                                    (e) => setNome(e.target.value)
                                }
                                required
                                placeholder="digite seu nome completo"/>
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="email">e-mail</label>
                            <input id="email" type="email" name="email"
                                value={
                                    email.email
                                }
                                onChange={
                                    (e) => setEmail(e.target.value)
                                }
                                required
                                placeholder="digite seu e-mail"/>
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="number">CPF</label>
                            <input id="cpf" name="cpf"
                                value={
                                    cpf.cpf
                                }
                                onChange={
                                    (e) => setCPF(e.target.value)
                                }
                                required
                                placeholder="digite seu CPF"/>
                        </div>

                        <div className="input-wrapper">
                            <label className='custom-date-input' htmlFor="date">data de nascimento</label>
                            <input id="date" name="data"
                                value={
                                    nascimento.nascimento
                                }
                                onChange={
                                    (e) => setNascimento(e.target.value)
                                }
                                required
                                placeholder="digite sua data de nascimento"/>
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

                        <div className="input-wrapper">
                            <div className="label-wrapper flex">
                                <label htmlFor="senha">senha</label>
                                {/* <a href="#">esqueceu a senha?</a> */} </div>

                            <input type={
                                    passwordVisible ? 'text' : 'password'
                                }
                                id="senha"
                                value={
                                    senha.senha
                                }
                                onChange={
                                    (e) => setSenha(e.target.value)
                                }
                                placeholder="digite sua senha"/>

                            <img onClick={togglePassword}
                                className={
                                    `eye ${
                                        passwordVisible ? 'hide' : ''
                                    }`
                                }
                                src={eyeOff}
                                alt=""/>
                            <img onClick={togglePassword}
                                className={
                                    `eye ${
                                        passwordVisible ? '' : 'hide'
                                    }`
                                }
                                src={eye}
                                alt=""/>
                        </div>

                        <button type="submit"
                            onClick={handleFormSubmit}>criar</button>

                        <div className="create-account">
                            já possui uma conta?
                            <a href="#">
                                entrar</a>
                        </div>
                    </form>
                </main>
            </div>
            {/* <img src={bg} alt="" /> */} </div>
    );
}
