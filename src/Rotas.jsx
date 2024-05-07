import React from 'react'

import HomeDriver from './pages/HomeDriver/HomeDriver'
import HomePassenger from './pages/HomePassenger/HomePassenger'
import SplashScreen from './pages/Splash Screen/SplashScreen'
import Redirection from './pages/Redirection/Redirection'
import ConfirmationTwo from './pages/ConfirmationTwo/Confirmation'
import ConfirmationPasseger from './pages/ConfirmationPasseger/ConfirmationPasseger'
import Chat from './pages/Chat/Chat'
import Register from './pages/Register/Register'
import LandingPage from './pages/LandingPage/LandingPage'
import Login from './pages/Login/Login'
import Sair from './pages/LogOff/LogOff'
import RegisterMotorista from './pages/RegisterMotorista/RegisterMotorista'
import LoginValidacao from './pages/LoginValidacao/LoginValidacao'
import RegisterUsuarioEMotorista from './pages/RegisterUsuarioEMotorista/RegisterUsuarioEMotorista'
import Profile from './pages/Profile/Profile'
import ProfilePassenger from './pages/ProfilePassenger/ProfilePassenger'
import Report from './pages/Report/Report'
import Validation from './pages/Validation/Validation'
import RegisterViagem from './pages/RegisterViagem/RegisterViagem'
import Payment from './pages/Payment/Payment'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function Rota() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/motorista" element={<HomeDriver />} />
                    <Route path="/passageira" element={<HomePassenger />} />
                    <Route path="/" element={<SplashScreen />} />
                    <Route path="/direcionador" element={<Redirection />} />
                    <Route path="/confirmacao" element={<ConfirmationTwo />} />
                    <Route path="/confirmacao-passageira" element={<ConfirmationPasseger />} />
                    <Route path="/cadastro" element={<Register />} />
                    <Route path="/cadastro-motorista" element={<RegisterMotorista />} />
                    <Route path="/cadastro-motorista-usuario" element={<RegisterUsuarioEMotorista />} />
                    <Route path="/login-validacao" element={<LoginValidacao />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<LandingPage />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/sair" element={<Sair />} />
                    <Route path="/perfil-motorista" element={<Profile />} />
                    <Route path="/perfil-passageira" element={<ProfilePassenger />} />
                    <Route path="/relatorio" element={<Report />} />
                    <Route path="/validacao" element={<Validation />} />
                    <Route path="/cadastro-viagem" element={<RegisterViagem />} />
                    <Route path="/pagamento" element={<Payment/>} />
                </Routes>
            </Router>
        </>
    )
}

export default Rota