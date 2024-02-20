import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import './LandingPage.css';
import Footer from '@/components/Footer/Footer';

import bgAmarelo from '@/assets/img/bg-amarelo.png';
import bgBlue from '@/assets/img/bg-blue.png';

export default function LandingPage() {
    useEffect(() => {
        const faqItems = document.querySelectorAll('.faq-item');
    
        const toggleItem = (item) => {
          const faqContent = item.querySelector('.faq-content');
    
          if (item.classList.contains('faq-open')) {
            faqContent.style.height = '0px';
            item.classList.remove('faq-open');
          } else {
            faqContent.style.height = faqContent.scrollHeight + 'px';
            item.classList.add('faq-open');
          }
        };
    
        faqItems.forEach((item) => {
          const faqHeader = item.querySelector('.faq-header');
    
          faqHeader.addEventListener('click', () => {
            const openItem = document.querySelector('.faq-open');
    
            toggleItem(item);
    
            if (openItem && openItem !== item) {
              toggleItem(openItem);
            }
    
            // Armazenar o estado no localStorage
            localStorage.setItem('faqState', JSON.stringify(Array.from(faqItems).map((item) => item.classList.contains('faq-open'))));
          });
        });
    
        // Recuperar o estado do localStorage
        const faqState = JSON.parse(localStorage.getItem('faqState')) || [];
        faqItems.forEach((item, index) => {
          if (faqState[index]) {
            toggleItem(item);
          }
        });
    
        return () => {
          // Limpar event listeners, se necessário
          faqItems.forEach((item) => {
            const faqHeader = item.querySelector('.faq-header');
            faqHeader.removeEventListener('click', () => {});
          });
        };
      }, []);

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
                                <Link to="/direcionador" target="_blank" className="nav-item" style={{ color: '#202020', fontWeight: '500' }}>
                                    cadastrar
                                </Link>

                                <Link to="/login" target="_blank" className="nav-item" style={{ color: '#202020', fontWeight: '500', textDecoration: 'none' }} hover={{ color: '#fafafa' }}>
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
                                className="home-img" />

                            <div className="home-data">
                                <h1 className="home-title">
                                    união em aventuras inspiradoras.
                                </h1>
                                <p className="home-description">
                                    junte-se à comunidade de Sisters e vivencie viagens cheias de empoderamento, amizade e descobertas.
                                </p>
                                <Link to="/direcionador" target="_blank" className="button button-flex">
                                    descubra
                                </Link>
                            </div>
                        </div>
                    </section>
                    <section className="about section container" id="about">
                        <div className="about-container grid">
                            <img src={bgBlue}
                                alt=""
                                className="about-img" />

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
                    <section className="faq section" id="faqs">
                        <h2 className="section-title-center faq-title container">
                            perguntas frequentes
                        </h2>

                        <div className="faq-container container grid">
                            <div className="faq-group">
                                <div className="faq-item">
                                    <header className="faq-header">
                                        <i className="ri-add-line faq-icon"></i>
                                        <h3 className="faq-item-title">
                                            como eu contrato uma viagem?
                                        </h3>
                                    </header>

                                    <div className="faq-content">
                                        <p className="faq-description">
                                        para contratar uma viagem, é necessário realizar o cadastro, e após isso temos nossa home especialmente feita para as passageiras, onde você pode contratar sua viagem, e além disso temos também sugestões dos lugares mais visitados
                                        </p>
                                    </div>
                                </div>

                                <div className="faq-item">
                                    <header className="faq-header">
                                        <i className="ri-add-line faq-icon"></i>
                                        <h3 className="faq-item-title">
                                            como saberei aonde encontrar a motorista?
                                        </h3>
                                    </header>

                                    <div className="faq-content">
                                        <p className="faq-description">
                                        ao comprar uma passagem, você terá as opções para revisar os dados da viagem, além disso você entrará em um chat que está diretamente conectado com as outras passageiras e também com a motorista, sendo assim você pode tirar dúvidas da viagem direto com a motorista.
                                        </p>
                                    </div>
                                </div>

                                <div className="faq-item">
                                    <header className="faq-header">
                                        <i className="ri-add-line faq-icon"></i>
                                        <h3 className="faq-item-title">
                                            como é feito o pagamento da viagem?
                                        </h3>
                                    </header>

                                    <div className="faq-content">
                                        <p className="faq-description">
                                        o pagamento pode ser feito via pix, cartões de débito e crédito direto com a motorista da sua viagem.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="faq-group">
                                <div className="faq-item">
                                    <header className="faq-header">
                                        <i className="ri-add-line faq-icon"></i>
                                        <h3 className="faq-item-title">
                                            como posso me tornar motorista?
                                        </h3>
                                    </header>

                                    <div className="faq-content">
                                        <p className="faq-description">
                                        para se tornar motorista é muito fácil, faça seu cadastro pela nossa plataforma, preechendo alguns dados e logo logo se tornará uma Sister
                                        </p>
                                    </div>
                                </div>

                                <div className="faq-item">
                                    <header className="faq-header">
                                        <i className="ri-add-line faq-icon"></i>
                                        <h3 className="faq-item-title">
                                            posso cadastrar mais de duas viagens?
                                        </h3>
                                    </header>

                                    <div className="faq-content">
                                        <p className="faq-description">
                                        sim, é possível cadastrar mais de uma viagem, entretanto temos uma limite para que não sobrecarregue nenhuma motorista.
                                        </p>
                                    </div>
                                </div>

                                <div className="faq-item">
                                    <header className="faq-header">
                                        <i className="ri-add-line faq-icon"></i>
                                        <h3 className="faq-item-title">
                                            posso ser motorista e passageira?
                                        </h3>
                                    </header>

                                    <div className="faq-content">
                                        <p className="faq-description">
                                        claro, temos as opção para você que é passageira ser uma motorista e vice-versa, na nossa página inicial quando você clicar no opção de cadastro, você pode escolher a sua melhor opção
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
                <Footer />
            </div>
        </>
    )
}
