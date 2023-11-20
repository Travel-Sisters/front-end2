import React from 'react';

import './Hiring.css';

function Hiring() {

  return (
    <>
      <div id="container">
        <div class="titulo">
          <p>
            <b>cadastre sua viagem</b>
          </p>
        </div>
        <div class="sub">
          <p>endereços e horários</p>
        </div>
        <div class="inputs">
          <div class="lado">
          <label htmlFor="text">nome do local</label>
            <input type="text" id="local" placeholder="escolha os lugares disponíveis" />
            <label htmlFor="text">data da viagem</label>
            <input type="date" id="data" />
            <label htmlFor="text">preço</label>
            <input type="password" name="" id="preco" placeholder="R$00,00" />
          </div>
          <div class="lado2">
          <label htmlFor="text">ponto de encontro</label>
            <input type="" id="encontro" placeholder="escolha os lugares disponíveis" />
            <label htmlFor="text">horário</label>
            <input type="time" id="horario" placeholder="insira um horário " />
            <label htmlFor="text">descrição</label>
            <input type="text" id="desc" placeholder="insira aqui informações sobre a sua van, regras, tolerância..." />
          </div>
        </div>
      </div>
      <div class="butt">
        <button id="cad">cadastrar e ir para o chat</button>
        <button id="limp" onclick="limpar()">X limpar tudo</button>
      </div>

    </>
  )
}

export default Hiring