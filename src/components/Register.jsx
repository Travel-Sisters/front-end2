// import React, { useState } from 'react';
// import axios from '../axios';
// import Swal from 'sweetalert2';
// import 'sweetalert2/dist/sweetalert2.min.css';

// import logo from '../assets/img/logo.png';
// import eye from '../assets/img/eye.svg';
// import eyeOff from '../assets/img/eye-off.svg';
// import bg from '../assets/img/bg.jpg';

// export default function Register() {
//     const [nome, setNome] = useState('');
//     const [email, setEmail] = useState('');
//     const [cpf, setCPF] = useState('');
//     const [nascimento, setNascimento] = useState('');
//     const [senha, setSenha] = useState('');
//     const [passwordVisible, setPasswordVisible] = useState(false);
//     const [emailError, setEmailError] = useState('');

//     const togglePassword = () => {
//         setPasswordVisible((prev) => !prev);
//     };

//     const handleCPFChange = (e) => {
//         const numericValue = e.target.value.replace(/\D/g, '');
//         setCPF(numericValue);
//     };

    
//     const formatarData = (input) => {
//         const value = input.replace(/\D/g, ''); 
//         if (value.length <= 2) {
//             return value;
//         } else if (value.length <= 4) {
//             return `${value.slice(0, 2)}-${value.slice(2)}`; 
//         } else {
//             return `${value.slice(0, 2)}-${value.slice(2, 4)}-${value.slice(4, 8)}`; 
//         }
//     };

//     const handleNascimentoChange = (e) => {
//         const valorFormatado = formatarData(e.target.value);
//         setNascimento(valorFormatado);
//     };

//     const handleFormSubmit = async (evento) => {

//         evento.preventDefault();

//         const dataNascimento = new Date(nascimento);
//         const anoNascimento = dataNascimento.getFullYear();
//         const anoAtual = new Date().getFullYear(); 

//         if (nome.trim() === '' || email.trim() === '' || nascimento.trim() === '' || senha.trim() === '') {
//             return Swal.fire({
//                 icon: 'error',
//                 title: 'Oops...',
//                 text: 'Por favor, preencha todos os campos obrigatórios.',
//               });
//         }
//         const nomeParts = nome.trim().split(' ');
//         if (nomeParts.length < 2) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Erro',
//                 text: 'O campo "Nome completo" deve conter pelo menos duas palavras.',
//             });
//             return;
//         }

//         if (anoAtual - anoNascimento < 18) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Erro',
//                 text: 'Você deve ter pelo menos 18 anos para se cadastrar.',
//             });
//             return;
//         }
        
 
//         const usuario = {
//             nome,
//             email,
//             cpf,
//             nascimento,
//             senha,
//         };

//         try {
//             const response = await api.post('http://localhost:8080/usuarios/', usuario);
//             console.log('Resposta do servidor:', response.data);
//             alert('Usuário foi cadastrado com sucesso!');
//             setNome('');
//             setEmail('');
//             setCPF('');
//             setNascimento('');
//             setSenha('');
//         } catch (error) {
//             console.error('Erro ao cadastrar o usuário:', error);
//             alert('OPS! Alguma coisa deu errado!');
//         }
//     };

//     return (
//         <div id="page"> 
//         <div className="flex">
//             <div>
//                 <header>
//                     <img src={logo} alt="" />
//                 </header>
//                 <main>
//                     <div className="headline">
//                         <h1>criar uma conta</h1>
//                         <p>
//                             faça login ou registre-se para começar a para trilhar seu caminho
//                             ainda hoje.
//                         </p>
//                     </div>
//                     <form>
//                         <div className="input-wrapper">
//                             <label htmlFor="text">nome completo</label>
//                             <input
//                                 id="nome"
//                                 type="text"
//                                 name="nome"
//                                 value={nome.nome}
//                                 onChange={(e) => setNome(e.target.value)}
//                                 required
//                                 placeholder="digite seu nome completo"
//                             />
//                         </div>

//                         <div className="input-wrapper">
//                             <label htmlFor="email">e-mail</label>
//                             <input

//                                 id="email"
//                                 type="email"
//                                 name="email"
//                                 value={email.email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 required
//                                 placeholder="digite seu e-mail"
//                             />
//                         </div>

//                         <div className="input-wrapper">
//                             <label htmlFor="number">CPF</label>
//                             <input
//                                 id="cpf"
//                                 name="cpf"
//                                 value={cpf}
//                                 onChange={(e) => {
//                                     setEmail(e.target.value);
//                                     handleCPFChange(e);
//                                 }}
//                                 required
//                                 placeholder="digite seu CPF"
//                             />
//                         </div>

//                         <div className="input-wrapper">
//                             <label className='custom-date-input' htmlFor="date">data de nascimento</label>
//                             <input
//                                 id="date"
//                                 name="data"
//                                 type="text"
//                                 value={nascimento}
//                                 onChange={(e) => {
//                                     setEmail(e.target.value);
//                                     handleNascimentoChange(e);
//                                 }}
//                                 required
//                                 placeholder="digite sua data de nascimento"
//                             />
//                         </div> 

//                         <div className="input-wrapper">
//                             <div className="label-wrapper flex">
//                                 <label htmlFor="senha">senha</label>
//                                 {/* <a href="#">esqueceu a senha?</a> */}
//                             </div>

//                             <input
//                                 type={passwordVisible ? 'text' : 'password'}
//                                 id="senha"
//                                 value={senha.senha}
//                                 onChange={(e) => setSenha(e.target.value)}
//                                 placeholder="digite sua senha"
//                             />

//                             <img
//                                 onClick={togglePassword}
//                                 className={`eye ${passwordVisible ? 'hide' : ''}`}
//                                 src={eyeOff}
//                                 alt=""
//                             />
//                             <img
//                                 onClick={togglePassword}
//                                 className={`eye ${passwordVisible ? '' : 'hide'}`}
//                                 src={eye}
//                                 alt=""
//                             />
//                         </div>

//                         <button type="submit" onClick={handleFormSubmit}>criar</button>

//                         <div className="create-account">
//                             já possui uma conta?
//                             <a href="#"> entrar</a>
//                         </div>
//                     </form>
//                 </main>
//             </div>
//             <img src={bg} alt="" />
//         </div>
//         </div>
//     );
// }
