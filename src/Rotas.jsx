import React from 'react'

import HomeDriver from './pages/HomeDriver/HomeDriver'
import HomePassenger from './pages/HomePassenger/HomePassenger'
import SplashScreen from './pages/Splash Screen/SplashScreen'
import Redirection from './pages/Redirection/Redirection'
import Confirmation from './pages/Confirmation/Confirmation'
import Chat from './pages/Chat/Chat'
import Register from './pages/Register/Register'
import LandingPage from './pages/LandingPage/LandingPage'
import Login from './pages/Login/Login'
import Hiring from './pages/Hiring/Hiring'
import Viagem from './pages/Viagem/Viagem'
import Sair from './pages/LogOff/LogOff'
import RegisterMotorista from './pages/RegisterMotorista/RegisterMotorista'
import LoginValidacao from './pages/LoginValidacao/LoginValidacao'
import RegisterUsuarioEMotorista from './pages/RegisterUsuarioEMotorista/RegisterUsuarioEMotorista'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function Rota() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/motorista" element={<HomeDriver />} />
                    <Route path="/passageira" element={<HomePassenger />} />
                    <Route path="/index" element={<SplashScreen />} />
                    <Route path="/direcionador" element={<Redirection />} />
                    <Route path="/contratacao" element={<Hiring />} />
                    <Route path="/confirmacao" element={<Confirmation />} />
                    <Route path="/cadastro" element={<Register />} />
                    <Route path="/cadastro-motorista" element={<RegisterMotorista />} />
                    <Route path="/cadastro-motorista-usuario" element={<RegisterUsuarioEMotorista />} />
                    <Route path="/login-validacao" element={<LoginValidacao />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<LandingPage />} />
                    <Route path="/viagem" element={<Viagem />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/sair" element={<Sair />} />
                </Routes>
            </Router>
        </>
    )
}

export default Rota