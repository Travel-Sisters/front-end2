import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import './Chat.css';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const socket = io('http://localhost:3001');

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    axios.get('http://seu-servidor/api/messages')
      .then((response) => {
        setMessages(response.data);
      });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const sendMessage = () => {
    socket.emit('message', newMessage);
    axios.post('http://seu-servidor/api/messages', { message: newMessage });
    setNewMessage('');
  }

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
