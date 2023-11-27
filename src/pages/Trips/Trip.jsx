import React from 'react'

import './Trip.css'
import Menu from '../../components/Menu/Menu';

import roxo from '@/assets/img/roxo.png';

export default function Trip() {
    return (
        <div id="page-trip">
            <Menu />
            <section className="recommendations section container" id="recommendations">
                <div className="recommendations-container grid">
                    <h2 className="section-title about-title">
                        confira suas viagens até agora
                    </h2>
                    <section class="cards">
                        <div class="card">
                            <img src={roxo} alt="" />

                            <div class="content">
                                <h3>Pico do Olho D’Água</h3>
                                <p>
                                    faça uma trilha incrível e explore novos horizontes.
                                </p>
                                <div style={{ display: 'flex' }}>
                                    <a href="" className='link' style={{color: 'var(--purple)'}}>gerar CSV</a>
                                    <a href="" className='link' style={{ marginLeft: '1.3rem', color:'var(--purple)' }}>gerar TXT</a>
                                </div>
                            </div>
                        </div>

                        <div class="card">
                            <img src={roxo} alt="" />

                            <div class="content">
                                <h3>São Sebastião</h3>
                                <p>
                                    divirta-se, pegue um bronze e construa castelos na areia!
                                </p>

                                <div style={{ display: 'flex' }}>
                                    <a href="" className='link' style={{color: 'var(--purple)'}}>gerar CSV</a>
                                    <a href="" className='link' style={{ marginLeft: '1.3rem', color:'var(--purple)' }}>gerar TXT</a>
                                </div>
                            </div>
                        </div>

                        <div class="card">
                            <img src={roxo} alt="" />
                            <div class="content">
                                <h3>Praia da Enseada</h3>
                                <p>
                                    pé na areia, a caipirinha, água de coco, a cervejinha.
                                </p>
                                <div style={{ display: 'flex' }}>
                                    <a href="" className='link' style={{color: 'var(--purple)'}}>gerar CSV</a>
                                    <a href="" className='link' style={{ marginLeft: '1.3rem', color:'var(--purple)' }}>gerar TXT</a>
                                </div>
                            </div>
                        </div>

                        <div class="card">
                            <img src={roxo} alt="" />

                            <div class="content">
                                <h3>Holambra</h3>
                                <p>
                                    conheça e fique encantada com a cidade das flores.
                                </p>

                                {/* <div class="location">
                                    <i class="ph-map-pin-light"></i>
                                    São Paulo - SP
                                </div> */}
                                <div style={{ display: 'flex' }}>
                                    <a href="" className='link' style={{color: 'var(--purple)'}}>gerar CSV</a>
                                    <a href="" className='link' style={{ marginLeft: '1.3rem', color:'var(--purple)' }}>gerar TXT</a>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </div>
    )
}
