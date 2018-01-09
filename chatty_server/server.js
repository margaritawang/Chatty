const express = require('express');
const SocketServer = require('ws').Server;

const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));


const wss = new SocketServer({server});

wss.on('connection', (ws)=> {
  console.log('Client connected');

  ws.on('close', () => console.log('Client disconnected'));
});
