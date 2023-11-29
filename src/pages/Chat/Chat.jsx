// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';
// import axios from 'axios';
// import './Chat.css';

// export default function Chat() {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const socket = io('http://localhost:5173');

//   useEffect(() => {
//     socket.on('message', (message) => {
//       setMessages((prevMessages) => [...prevMessages, message]);
//     });

//     axios.get('http://seu-servidor/api/messages')
//       .then((response) => {
//         setMessages(response.data);
//       });

//     return () => {
//       socket.disconnect();
//     };
//   }, [socket]);

//   const sendMessage = () => {
//     socket.emit('message', newMessage);
//     axios.post('http://seu-servidor/api/messages', { message: newMessage });
//     setNewMessage('');
//   }

//   return (
//     <div id="page-chat">
//       <div id="app">
//         <div id="messages">
//           <div id="last-seen">hoje 11:30</div>
//           <div className="messages">
//             {messages.map((message, index) => (
//               <div key={index} className={`message ${message.from === 'you' ? 'you' : ''}`}>
//                 <div className="top">{message.sender} - {message.time}</div>
//                 <div className="body">{message.body}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//         <form id="bottom" onSubmit={(e) => { e.preventDefault(); sendMessage(); }}>
//           <input
//             type="text"
//             placeholder="digite sua mensagem"
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//           />
//           <button type="submit">
//             <i className="ph-paper-plane-right-fill"></i>
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './Chat.css'; // Importe o arquivo CSS aqui
const ChatRoom = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [chatId, setChatId] = useState(); // Simula um chat específico



  useEffect(() => {
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  const handleChangeChat = (newChatId) => {
    setChatId(newChatId); // Atualiza o estado do chatId com o novo valor
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
      // Lógica para exibir a mensagem recebida na interface
    });

    return () => socket.off('new_message');
  }, [socket]);

  return (
    <div>
      <button onClick={() => handleChangeChat(1)}>Mudar para Chat 1</button>
      <br />
      <button onClick={() => handleChangeChat(2)}>Mudar para Chat 2</button>
      <br />
      <button onClick={handleJoinChat}>Entrar no Chat</button>
      <br />
      <button onClick={handleJoinChat}>Entrar em outro Chat</button>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleMessageSend}>Enviar Mensagem</button>
    </div>
  );
};

export default ChatRoom;