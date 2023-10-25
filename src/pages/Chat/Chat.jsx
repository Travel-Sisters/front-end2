import React from 'react'
// import './Chat.css';
import Van from '@/assets/img/icon.png';
// import { App, Top, Messages, Button } from './styles';

export default function Chat() {
  return (
    <>
      <App>
        <Top>
          <div id="user-info">
            <img
              src={Van}
              alt="ilustração van cor azul"
            />

            <div id="user-status">
              <strong>Sisters - Enseada | 18/09</strong>
              <div className="status">motorista@gmail.com</div>
            </div>
          </div>
        </Top>
        <Messages>
          <div id="last-seen">hoje 11:30</div>
          <div className="messages">
            <div className="message">
              <div className="top">Motorista - 11:30</div>
              <div className="body">Meninas, hoje sairemos da Paulista às 12:30. Estão preparadas?</div>
            </div>
            <div className="message you">
              <div className="top">Passageira - 11:32</div>
              <div className="body"> Tudo certo. Estou com dúvida somente no ponto... Seria em frente ao MASP?</div>
            </div>
            <div className="message">
              <div className="top">Motorista - 11:34</div>
              <div className="body">
                Isso mesmo.
              </div>
            </div>
            <div className="message you">
              <div className="top">Passageira - 11:36</div>
              <div className="body"><strong>Beleza, combinado. Estarei lá... </strong></div>
            </div>
          </div>
        </Messages>
        <Button>
          <form id="bottom">
            <input type="text" placeholder="digite sua mensagem" />
            <button>
              <ion-icon name="paper-plane-outline"></ion-icon>
            </button>
          </form>
        </Button>
      </App >
      {/* <div id="app">
        <div id="top">
          <div id="user-info">
            <img
              src=""
              alt=""
            />

            <div id="user-status">
              <strong>Sisters - Enseada | 18/09</strong>
              <div className="status">motorista@gmail.com</div>
            </div>
          </div>
        </div>
        <div id="messages">
          <div id="last-seen">hoje 11:30</div>

          <div className="messages">
            <div className="message">
              <div className="top">Motorista - 11:30</div>
              <div className="body">Meninas, hoje sairemos da Paulista às 12:30. Estão preparadas?</div>
            </div>
            <div className="message you">
              <div className="top">Passageira - 11:32</div>
              <div className="body"> Tudo certo. Estou com dúvida somente no ponto... Seria em frente ao MASP?</div>
            </div>
            <div className="message">
              <div className="top">Motorista - 11:34</div>
              <div className="body">
                Isso mesmo.
              </div>
            </div>
            <div className="message you">
              <div className="top">Passageira - 11:36</div>
              <div className="body"><strong>Beleza, combinado. Estarei lá... </strong></div>
            </div>
          </div>
        </div>
        <form id="bottom">
          <input type="text" placeholder="digite sua mensagem" />
          <button>
            <i className="ph-paper-plane-right-fill"></i>
          </button>
        </form>
      </div> */}
    </>
  )
}

