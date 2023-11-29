import React from 'react'

import './Profile.css'
import Menu from '../../components/Menu/Menu'

export default function Profile() {
    return (
        <section className="profile" id="page-profile">
            <div className="profile-container container grid">
                <Menu />

                <div className="main-w3layouts wrapper">
                    <div className="main-agileinfo">
                        <div className="agileits-top">
                            <h3 className="section-title about-title" style={{ fontSize: '1.8rem' }}>
                                edite suas informações de cadastro
                            </h3>
                            <br />
                            <form action="#" method="post" />
                            <input className="text" type="text" name="nome" placeholder="nome" disabled />
                            <input className="text email" type="email" name="email" placeholder="e-mail" disabled />
                            <input className="text" type="password" name="password" placeholder="senha" disabled />

                            <div>
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
