import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import './LandingPage.css';
import bgAmarelo from '@/assets/img/bg-amarelo.png';
import bgBlue from '@/assets/img/bg-blue.png';
import logo from '@/assets/img/logo.png';

export default function LandingPage() {
    useEffect(() => {
        const accordionItems = document.querySelectorAll('.questions-item');

        accordionItems.forEach((item) => {
            const accordionHeader = item.querySelector('.questions-header');

            accordionHeader.addEventListener('click', () => {
                const openItem = document.querySelector('.accordion-open');

                toggleItem(item);

                if (openItem && openItem !== item) {
                    toggleItem(openItem);
                }
            });
        });
    }, []);

    const toggleItem = (item) => {
        const accordionContent = item.querySelector('.questions-content');

        if (item.classList.contains('accordion-open')) {
            accordionContent.removeAttribute('style');
            item.classList.remove('accordion-open');
        } else {
            accordionContent.style.height = accordionContent.scrollHeight + 'px';
            item.classList.add('accordion-open');
        }
    };


    return (
        <>
            <div id="page-all-users">
                <header className="header" id="header">
                    <nav className="nav container">
                        <a href="#" className="nav-logo">
                            Travel Sisters
                        </a>

                        <div className="nav-menu" id="nav-menu">
                            <ul className="nav-list">
                                <li className="nav-item">
                                    <a href="#home" className="nav-link active-link">início</a>
                                </li>
                                <li className="nav-item">
                                    <a href="#about" className="nav-link">passageira</a>
                                </li>
                                <li className="nav-item">
                                    <a href="#driver" className="nav-link">motorista</a>
                                </li>
                                <li className="nav-item">
                                    <a href="#faqs" className="nav-link">FAQs</a>
                                </li>
                                <Link to="/escolha-cadastro" target="_blank" className="nav-item">
                                    cadastrar
                                </Link>
                                <Link to="/login" target="_blank" className="nav-item">
                                    entrar
                                </Link>
                            </ul>
                        </div>
                    </nav>
                </header>

                <main className="main">
                    <section className="home" id="home">
                        <div className="home-container container grid">
                            <img src={bgAmarelo}
                                alt=""
                                className="home-img"/>

                            <div className="home-data">
                                <h1 className="home-title">
                                    união em aventuras inspiradoras.
                                </h1>
                                <p className="home-description">
                                    junte-se à comunidade de Sisters e vivencie viagens cheias de empoderamento, amizade e descobertas.
                                </p>
                                <Link to="/escolha-cadastro" target="_blank" className="button button-flex">
                                    descubra
                                </Link>
                            </div>
                        </div>
                    </section>
                    <section className="about section container" id="about">
                        <div className="about-container grid">
                            <img src={bgBlue}
                                alt=""
                                className="about-img"/>

                            <div className="about-data">
                                <h2 className="section-title about-title">
                                    aventure-se em viagens seguras.
                                </h2>

                                <div className="about-details">
                                    <p className="about-details-description">
                                        <i className="ri-checkbox-fill about-details-icon"></i>
                                        escolha seu destino: navegue por uma seleção de destinos incríveis.
                                    </p>
                                    <p className="about-details-description">
                                        <i className="ri-checkbox-fill about-details-icon"></i>
                                        encontre uma companheira: conheça mulheres inspiradoras que compartilham sua paixão por viagens.
                                    </p>
                                    <p className="about-details-description">
                                        <i className="ri-checkbox-fill about-details-icon"></i>
                                        planeje sua viagem: personalize todos os detalhes da sua aventura junto com suas companheiras de jornada.
                                    </p>
                                </div>

                            </div>
                        </div>
                    </section>
                    <section className="steps section container" id="driver">
                        <div className="steps-bg">
                            <h2 className="section-title-center steps-title">
                                se você é uma entusiasta de viagens apaixonada por inovação, está no lugar certo.
                            </h2>

                            <div className="steps-container grid">
                                <div className="steps-card">
                                    <div className="steps-card-number">01</div>
                                    <h3 className="steps-card-title">escolha seu destino</h3>
                                    <p className="steps-card-description">
                                        selecione destinos de viagem, refine sua busca e escolha a viagem perfeita para compartilhar.
                                    </p>
                                </div>

                                <div className="steps-card">
                                    <div className="steps-card-number">02</div>
                                    <h3 className="steps-card-title">escolha seu destino</h3>
                                    <p className="steps-card-description">
                                        selecione destinos de viagem, refine sua busca e escolha a viagem perfeita para compartilhar.
                                    </p>
                                </div>

                                <div className="steps-card">
                                    <div className="steps-card-number">03</div>
                                    <h3 className="steps-card-title">defina os detalhes</h3>
                                    <p className="steps-card-description">
                                        confirme os termos, cadastre as informações necessárias e seja redirecionada ao chat.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="questions section" id="faqs">
                        <h2 className="section-title-center questions-title container">
                            FAQ
                        </h2>

                        <div className="questions-container container grid">
                            <div className="questions-group">
                                <div className="questions-item">
                                    <header className="questions-header">
                                        <i className="ri-add-line questions-icon"></i>
                                        <h3 className="questions-item-title">
                                            como eu contrato uma viagem?
                                        </h3>
                                    </header>

                                    <div className="questions-content">
                                        <p className="questions-description">
                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam, aliquid quidem dolor alias doloremque necessitatibus! Reprehenderit, dolor maiores porro minus asperiores excepturi corrupti totam tenetur quaerat architecto, hic enim. Consectetur!
                                        </p>
                                    </div>
                                </div>

                                <div className="questions-item">
                                    <header className="questions-header">
                                        <i className="ri-add-line questions-icon"></i>
                                        <h3 className="questions-item-title">
                                            como saberei aonde encontrar a motorista?
                                        </h3>
                                    </header>

                                    <div className="questions-content">
                                        <p className="questions-description">
                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam, aliquid quidem dolor alias doloremque necessitatibus! Reprehenderit, dolor maiores porro minus asperiores excepturi corrupti totam tenetur quaerat architecto, hic enim. Consectetur!
                                        </p>
                                    </div>
                                </div>

                                <div className="questions-item">
                                    <header className="questions-header">
                                        <i className="ri-add-line questions-icon"></i>
                                        <h3 className="questions-item-title">
                                            como é feito o pagamento da viagem?
                                        </h3>
                                    </header>

                                    <div className="questions-content">
                                        <p className="questions-description">
                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam, aliquid quidem dolor alias doloremque necessitatibus! Reprehenderit, dolor maiores porro minus asperiores excepturi corrupti totam tenetur quaerat architecto, hic enim. Consectetur!
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="questions-group">
                                <div className="questions-item">
                                    <header className="questions-header">
                                        <i className="ri-add-line questions-icon"></i>
                                        <h3 className="questions-item-title">
                                            como posso me tornar motorista?
                                        </h3>
                                    </header>

                                    <div className="questions-content">
                                        <p className="questions-description">
                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam, aliquid quidem dolor alias doloremque necessitatibus! Reprehenderit, dolor maiores porro minus asperiores excepturi corrupti totam tenetur quaerat architecto, hic enim. Consectetur!
                                        </p>
                                    </div>
                                </div>

                                <div className="questions-item">
                                    <header className="questions-header">
                                        <i className="ri-add-line questions-icon"></i>
                                        <h3 className="questions-item-title">
                                            posso cadastrar mais de duas viagens?
                                        </h3>
                                    </header>

                                    <div className="questions-content">
                                        <p className="questions-description">
                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam, aliquid quidem dolor alias doloremque necessitatibus! Reprehenderit, dolor maiores porro minus asperiores excepturi corrupti totam tenetur quaerat architecto, hic enim. Consectetur!
                                        </p>
                                    </div>
                                </div>

                                <div className="questions-item">
                                    <header className="questions-header">
                                        <i className="ri-add-line questions-icon"></i>
                                        <h3 className="questions-item-title">
                                            posso ser motorista e passageira?
                                        </h3>
                                    </header>

                                    <div className="questions-content">
                                        <p className="questions-description">
                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam, aliquid quidem dolor alias doloremque necessitatibus! Reprehenderit, dolor maiores porro minus asperiores excepturi corrupti totam tenetur quaerat architecto, hic enim. Consectetur!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                </main>

                <footer className="section">
                    <div className="container grid">
                        <div className="brand">
                            <img className='logo'
                                src={logo}
                                alt=""/>
                            <p>©2023 Travel Sisters</p>
                            <p>todos os direitos reservados.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}
