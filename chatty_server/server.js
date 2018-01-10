const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');
const WebSocket = require('ws');
const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));


const wss = new SocketServer({server});

wss.on('connection', (ws)=> {
  console.log('Client connected');
  ws.on('message', (message) => {
    if (message.includes('content')) {
      message = JSON.parse(message);
      message.id = uuidv4();
      console.log(message.id);
      console.log(message);
      wss.clients.forEach((client)=> {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(message));
        }
      })
    } else {
      console.log(message);
      wss.clients.forEach((client)=> {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(message));
        }
      })
    }
  });


  ws.on('close', () => console.log('Client disconnected'));
});
