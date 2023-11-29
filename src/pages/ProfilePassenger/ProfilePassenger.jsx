import React from 'react'

import './Profile.css'
import Menu from '../../components/Menu/Menu'

export default function ProfilePassenger() {
    return (
        <section className="profile" id="page-profile-passenger">
            <div className="profile-container container grid">
                <Menu />
                
                <div className="main-w3layouts wrapper">
                    <div className="main-agileinfo">
                        <div className="agileits-top">
                            <h3 className="section-title about-title" style={{ fontSize: '1.7rem' }}>
                                edite suas informações de cadastro
                            </h3>
                            <br />
                            <form action="#" method="post" />
                            <input className="text" type="text" name="nome" placeholder="altere seu nome" disabled />
                            <input className="text email" type="email" name="email" placeholder="altere seu e-mail" disabled />
                            <input className="text" type="password" name="password" placeholder="altere sua senha" disabled />

                            <br />
                            <br />

                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', width: '100%' }}>
                                <button className="button button-flex" type="submit" style={{ border: 'none', marginRight: '10px' }}>alterar</button>
                                <button className="button button-flex" type="submit" style={{ border: 'none', marginRight: '10px' }}>confirmar</button>
                                <button className="button button-flex" type="submit" style={{ border: 'none' }}>excluir conta</button>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

}
