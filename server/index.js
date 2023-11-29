const express = require('express');
const http = require('http');
const socketIO = require('socket.io')
const cors = require('cors'); 


const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

app.use(cors());

const PORT = 3001;

io.on('connection', (socket) => {
  console.log('Usuário conectado:', socket.id);

  socket.on('join_chat', (chatId) => {
    socket.join(chatId); // Coloca o usuário no "quarto" do chat específico

    // Emite uma mensagem para o chat específico informando que um usuário entrou
    io.to(chatId).emit('user_joined', `Usuário ${socket.id} entrou no chat.`);
  });

  socket.on('message', (data) => {
    // Envia a mensagem para o chat específico
    io.to(data.chatId).emit('new_message', {
      message: data.message,
      user: socket.id,
    });
  });

  socket.on('disconnect', () => {
    console.log('Usuário desconectado:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
