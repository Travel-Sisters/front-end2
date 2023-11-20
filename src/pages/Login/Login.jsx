import React, {useState} from 'react';
import './Login.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import rosa from '../../assets/img/rosa.png';
import eye from '../../assets/img/eye.svg';
import eyeOff from '../../assets/img/eye-off.svg';
import bg from '../../assets/img/bg.jpg';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePassword = () => {
        setPasswordVisible((prev) => !prev);
    };

    const handleFormSubmit = async (evento) => {
        evento.preventDefault();
        const usuario = {
            email,
            senha
        };

        try {
            const response = await axios.post('http://localhost:8080/usuarios/entrar', usuario);

            if (response.status === 200) {
                const token = response.data.token;

                sessionStorage.setItem('authToken', token);
                sessionStorage.setItem('usuario', response.data.nome);
                sessionStorage.setItem('idUsuarioLogin', response.data.userId);

                console.log('Resposta do servidor:', response.data);
                alert('Usuário entrou com sucesso!');
                setEmail('');
                setSenha('');

                if (response.data.userId !== null && response.data.userId !== undefined) {
                    const responseM = await axios.get(`http://localhost:8080/usuarios/verificar-perfil/${response.data.userId}`);
                    
                    sessionStorage.setItem('idMotoristaLogin', responseM.data.id);

                    if (responseM.status === 204) {
                        
                        navigate('/passageira')
                    } else {
                        Swal.fire({
                            title: 'Escolha uma opção:',
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonText: 'Passageira',
                            cancelButtonText: 'Motorista'
                        }).then((result) => {
                            if (result.isConfirmed) {

                                Swal.fire('Passageira', '', 'success');
                                navigate('/passageira')
                            } else if (result.isDismissed) {

                                Swal.fire('Motorista', '', 'success');
                                navigate('/motorista')
                            }
                        });
                    }

                }

                // navigate('/sair');
            } else {
                throw new Error('Ops! Ocorreu um erro interno.');
            }
        } catch (error) {
            console.error('Erro ao logar usuário:', error);
            alert('OPS! Alguma coisa deu errado!');
        }
    };

    return (
        <>
            <div id="page" className="flex">

                <div>
                    <header>
                        <img src={rosa}
                            alt=""/>
                    </header>
                    <main>
                        <div className="headline">
                            <h1>acesse a plataforma</h1>
                            <p className='p'>
                                faça login ou registre-se para trilhar seu caminho.
                            </p>
                        </div>
                        <form>
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
                                <div className="label-wrapper flex">
                                    <label htmlFor="senha">senha</label>
                                </div>

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
                                onClick={handleFormSubmit}>entrar</button>

                            <div className="create-account">
                                não tem uma conta?
                                <a href="#">
                                    criar</a>
                            </div>
                        </form>

                    </main>
                </div>
                {/* <img src={bg} alt="giovana" /> */} </div>
        </>
    )
}
