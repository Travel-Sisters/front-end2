import React from 'react';
import {Link} from 'react-router-dom';

export default function EscolhaCadastro() {
    return (
        <div>

            <Link to="/cadastro">
                <button>
                    Passageira
                </button>
            </Link>

            <br/>
            <br/>

            <Link to="/login-validacao">
                <button>
                    Já sou passageira , quero ser Motorista
                </button>
            </Link>

            <br/>
            <br/>

            <Link to="/cadastro-motorista-usuario">
                <button>
                    Motorista
                </button>
            </Link>

        </div>
    );

};
