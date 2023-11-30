import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import './Chat.css';

export default function Chat() {
  // const [messages, setMessages] = useState([]);
  // const [newMessage, setNewMessage] = useState('');
  // const socket = io('http://localhost:3001');
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [chatId, setChatId] = useState();

  useEffect(() => {
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  const getChatViagem = () => {
    axios.get(`http://localhost:8080/`)
  }

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const sendMessage = () => {
    socket.emit('message', newMessage);
    const [currentDate, setCurrentDate] = useState(new Date());

    axios.post('http://localhost:8080/chat/', {id: sessionStorage.getItem('idUsuarioLogin'),
                                               mensagem: newMessage,
                                               data: currentDate.getDate,
                                               hora: currentDate.getTime,
                                               //chat_viagem: ->preciso terminar

    })
      .then((response) => {
        setMessages(response.data);
      });
    setNewMessage('');
  }
 
  const handleChangeChat = (newChatId) => {
    setChatId(newChatId); 
  };

  const handleJoinChat = () => {
    socket.emit('join_chat', chatId);
    console.log(chatId)
  };

  const handleMessageSend = () => {
    socket.emit('message', { message, chatId });
    setMessage('');
  };
  useEffect(() => {
    if (!socket) return;

    socket.on('new_message', (data) => {
      console.log(`Nova mensagem: ${data.message} - Usuário: ${data.user}`);
    });

    return () => socket.off('new_message');
  }, [socket]);

  return (
    <div id="page-chat">
      <div id="app">
        <div id="messages">
          <div id="last-seen">hoje 11:30</div>
          <div className="messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.from === 'you' ? 'you' : ''}`}>
                <div className="top">{message.sender} - {message.time}</div>
                <div className="body">{message.body}</div>
              </div>
            ))}
          </div>
        </div>
        <form id="bottom" onSubmit={(e) => { e.preventDefault(); sendMessage(); }}>
          <input
            type="text"
            placeholder="digite sua mensagem"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button type="submit">
            <i className="ph-paper-plane-right-fill"></i>
          </button>
        </form>
      </div>
    </div>
  );
}

// return (
//   <div>
//     <button onClick={() => handleChangeChat(1)}>Mudar para Chat 1</button>
//     <br />
//     <button onClick={() => handleChangeChat(2)}>Mudar para Chat 2</button>
//     <br />
//     <button onClick={handleJoinChat}>Entrar no Chat</button>
//     <br />
//     <button onClick={handleJoinChat}>Entrar em outro Chat</button>
//     <input
//       type="text"
//       value={message}
//       onChange={(e) => setMessage(e.target.value)}
//     />
//     <button onClick={handleMessageSend}>Enviar Mensagem</button>
//   </div>
// );