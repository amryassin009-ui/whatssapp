const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static('whatsapp'));

io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('message_from_client', (msg) => {
    io.emit('message_from_server', msg);
  });
});

server.listen(5000, () => {
  console.log('Server running on port 5000');
});
