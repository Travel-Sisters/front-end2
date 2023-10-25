import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../LandingPage/LandingPage.css';


export default function LogOff() {
    const navigate = useNavigate();
    const username = sessionStorage?.getItem('usuario');

    const handleLogout = () => {
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('usuario');
        console.clear();
        navigate('/login');
    };

    return (
        <a className="button button-flex" onClick={handleLogout}>
            sair
        </a>
    );
}
