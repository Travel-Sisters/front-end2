import React from 'react'

import Register from './pages/Register/Register'
import LandingPage from './pages/LandingPage/LandingPage'
import Login from './pages/Login/Login'
import Chat from './pages/Chat/Chat'
import Viagem from './pages/Viagem/Viagem'
import Sair from './pages/LogOff/LogOff'
import EscolhaCadastro from './pages/EscolhaCadastro/EscolhaCadastro'
import RegisterMotorista from './pages/RegisterMotorista/RegisterMotorista'
import LoginValidacao from './pages/LoginValidacao/LoginValidacao'
import RegisterUsuarioEMotorista from './pages/RegisterUsuarioEMotorista/RegisterUsuarioEMotorista'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function Rota() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/cadastro" element={<Register />} />
                    <Route path="/cadastro-motorista" element={<RegisterMotorista />} />
                    <Route path="/cadastro-motorista-usuario" element={<RegisterUsuarioEMotorista />} />
                    <Route path="/login-validacao" element={<LoginValidacao />} />
                    <Route path="/escolha-cadastro" element={<EscolhaCadastro />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<LandingPage />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/viagem" element={<Viagem />} />
                    <Route path="/sair" element={<Sair />} />
                </Routes>
            </Router>
        </>
    )
}

export default Rota