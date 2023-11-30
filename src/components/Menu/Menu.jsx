import React from 'react'

import './Menu.css'

export default function Menu() {
  return (
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
              <a href="#driver" className="nav-link">perfil</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}
