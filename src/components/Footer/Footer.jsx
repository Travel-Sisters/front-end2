import React from 'react'

import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer section">
      <div className="footer-container container grid">
        <div className="footer-content">
          <a href="#" className="footer-logo">Travel Sisters</a>
        </div>
        <div className="footer-content">
          <h3 className="footer-title">sobre nós</h3>

          <ul className="footer_data">
            <li className="footer-info">como funciona?</li>
            <li className="footer-info">trabalhe conosco</li>
          </ul>
        </div>
        <div className="footer-content">
          <h3 className="footer-title">mais informações</h3>
          <ul className="footer_data">
            <li className="footer-info">sobre nós</li>
            <li className="footer-info">perguntas frequentes</li>
          </ul>
        </div>
        <div className="footer-content">
          <h3 className="footer-title">redes sociais</h3>
          <ul className="footer_data">
            <div className="footer-social">
              <a href="#" className="footer-social-link">
                <i className='bx bxl-facebook'></i>
              </a>
              <a href="#" className="footer-social-link">
                <i className='bx bxl-twitter'></i>
              </a>
              <a href="#" className="footer-social-link">
                <i className='bx bxl-instagram'></i>
              </a>
            </div>
          </ul>
        </div>
      </div>
      <p className="footer-copy">
        &#169; Travel Sisters. todos os direitos reservados
      </p>
    </footer>
  )
}
