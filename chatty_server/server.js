const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');
const WebSocket = require('ws');
const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));


const wss = new SocketServer({server});

const colors = ['#7FDBFF', '#39CCCC', '#85144b', '#F012BE'];
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

wss.on('connection', (ws)=> {
  console.log('Client connected');
  // console.log(wss.clients.size);
  const color = colors[Math.floor(Math.random() * 4)];
  console.log(color);
  ws.send(color);
  wss.clients.forEach(function each(client) {
    console.log('sending to client');
    console.log(wss.clients.size.toString());
    const message = {
      type: 'user',
      content: 'A user has joined the channel',
      activeuser: wss.clients.size
    }
    client.send(JSON.stringify(message));
  })

  ws.on('message', (message) => {
    message = JSON.parse(message);
    if (message.type === 'chat') {
      message.id = uuidv4();
      // console.log(message.id);
      // console.log(message);
      wss.clients.forEach(function each(client) {
        if (true) {
          client.send(JSON.stringify(message));
        }
      })
    } else {
      // console.log(message);
      wss.clients.forEach((client)=> {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(message));
        }
      })
    }
  });


  ws.on('close', () => console.log('Client disconnected'));
});
