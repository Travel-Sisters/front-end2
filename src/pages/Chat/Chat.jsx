import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import './Chat.css';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [chatId, setChatId] = useState();

  useEffect(() => {
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    const fetchChatId = async () => {
      try {
        // const idViagem = sessionStorage.getItem('idViagem');
        //const response = await axios.get(`http://localhost:8080/chat/${idViagem}`);
        const response = await axios.get(`http://localhost:8080/chat/2`);
        console.log("DADOS RECEBIDOS >> ", response.data)
        console.log("MOTORISTA >> ", response.data[0][1].id)
        const parametro = response.data[0][1].id
        setChatId(parametro);
        console.log('MEU CHATID', parametro)
      } catch (error) {
        console.error('Erro ao obter o chatId do banco de dados:', error);
      }
    };
    fetchChatId();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.emit('join_chat', chatId);
      console.log("ENTREI NO CHAT ", chatId)
    }
  }, [chatId]);

  const handleMessageSend = () => {
    socket.emit('message', { message, chatId });
    setMessage('');
  };

  useEffect(() => {
    if (!socket) return;

    socket.on('new_message', (data) => {
      console.log(`Nova mensagem: ${data.message} - Usuário: ${data.user}`);
      console.log(data)
      setMessages(data)

    });
    
    return () => socket.off('new_message');
  }, [socket]);

  return (
    <div id="page-chat">
      <div id="app">
        <div id="messages">
          <div id="last-seen">hoje 11:30</div>
          <div className="messages">
            {messages ? (
            messages.map((message) => (
              // <div key={index} className={`message ${message.from === 'you' ? 'you' : ''}`}>
                <div key={index}>
                {/* <div className="top">{message.user} - {message.time}</div> */}
                <div className="top">{message.user}</div> 
                <div className="body">{message.message}</div>
              </div>
            ))):
            (
              <h1>NAO TEM NESSA BOSTA</h1>
            )}
          </div>
        </div>
        <form id="bottom"
          onSubmit={(e) => {
            e.preventDefault();
            handleMessageSend();
          }}
        >
          <input
            type="text"
            placeholder="digite sua mensagem"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" onClick={handleMessageSend}>
            <i className="ph-paper-plane-right-fill"></i>
          </button>
        </form>
      </div>
    </div>
  );
};
