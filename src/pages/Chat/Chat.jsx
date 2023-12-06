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
        const viagem = sessionStorage.getItem('viagemId')
        const response = await axios.get(`http://localhost:8080/chat/${viagem}`);
        console.log(response)
        setChatId(1)
        //const parametro = response.data[0][1].id
        //setChatId(parametro);
      } catch (error) {
        console.error('Erro ao obter o chatId do banco de dados:', error);
      }
    };
    fetchChatId();
  }, []);
 


  useEffect(() => {
    if (socket) {
      socket.emit('join_chat', chatId);
    }
  }, [chatId]);

  const handleMessageSend = () => {
    // Verificar se o usuário está enviando a mensagem
    const isCurrentUser = messages.some((msg) => msg.user === 'eu'); // Substitua 'eu' pelo usuário atual

    if (!isCurrentUser) {
      socket.emit('message', { message, chatId });
    }

    setMessage('');
  };

  useEffect(() => {
    if (!socket) return;

    socket.on('new_message', (data) => {
      setMessages((prevMessages) => {
        // Verifica se a mensagem já está no estado
        if (!prevMessages.some((msg) => msg.message === data.message && msg.user === data.user)) {
          data.user = sessionStorage.getItem('usuario')
          return [...prevMessages, data];
        }
        return prevMessages;
      });
    });

    return () => socket.off('new_message');
  }, [socket]);

  return (
    <div id="page-chat">
      <div id="app">
        <div id="messages">
          {/* <div id="last-seen">hoje 11:30</div> */}
          <div className="messages">
            {messages ? (
              messages.map((message, index) => (
                <div key={index}>
                  <div className="top">{message.user}</div>
                  <div className="body">{message.message}</div>
                </div>
              ))) :
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