const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');
const WebSocket = require('ws');
const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));


const wss = new SocketServer({server});

const colors = ['#7FDBFF', '#39CCCC', '#85144b', '#F012BE', '#FF851B', '#3D9970'];
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

wss.on('connection', (ws)=> {
  console.log('Client connected');
  const color = colors[Math.floor(Math.random() * 6)];
  console.log(color);
  ws.send(JSON.stringify({color: color}));
  wss.clients.forEach(function each(client) {
    console.log('sending to client');
    const message = {
      type: 'user',
      content: 'A user has joined the channel',
      activeuser: wss.clients.size
    }
    console.log(message);
    client.send(JSON.stringify(message));
  })

  ws.on('message', (message) => {
    message = JSON.parse(message);
    message.id = uuidv4();
    wss.clients.forEach(function each(client) {
        if (true) {
          client.send(JSON.stringify(message));
        }
    })    
  });


  ws.on('close', (ws) => {
    console.log('Client disconnected');
    wss.clients.forEach(function each(client) {
      console.log('sending to client');
      const message = {
        type: 'user',
        content: 'A user has left the channel',
        color: null,
        activeuser: wss.clients.size
      }
      // console.log(message);
      client.send(JSON.stringify(message));
    });
  })
});
