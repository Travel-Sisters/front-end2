import React from 'react'

import './Menu.css'

export default function MenuConfirmation() {
  return (
    <header className="header" id="header">
      <nav className="nav container">
        <a href="#" className="nav-logo" style={{marginRight: '600px'}}>
          Travel Sisters
        </a>

        <div className="nav-menu" id="nav-menu">
          <ul className="nav-list">
            <li className="nav-item">
              <a href="#driver" className="nav-link">← voltar para o passo anterior</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}
