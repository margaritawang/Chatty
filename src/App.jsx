import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
// import Message from './Message.jsx';
import MessageList from './MessageList.jsx';



// exampleSocket.onopen = (event) => {
//   exampleSocket.send('ok');
// }

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Margarita'},
      messages: [{
        id: 1,
        user: 'Amy',
        type: 'chat',
        content: "I won't be impressed with technology until I can download food."
      }, {
        id: 1.5,
        type: 'system',
        content: 'Anonymous1 changed their name to Bob'
      }, {
        id: 2,
        user: 'Yuyumeer',
        type: 'chat',
        content: 'I am message 2'
      }, {
        id: 3,
        user: 'Yuyumeer',
        type: 'chat',
        content: 'I love yewyew'
      }]
    };
  }

  addMessage(user, content) {
    const newMessage = {
      id: Math.random(),
      user: user,
      type: 'chat',
      content: content
    };

    this.socket.send(JSON.stringify(newMessage));

    this.setState({
      messages: this.state.messages.concat(newMessage)
    });
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <Chatbar currentUser={this.state.currentUser.name} addMessage={this.addMessage.bind(this)} />
      </div>
    );
  }

  componentDidMount() {
    console.log('ComponentDidMount <app />');
    this.socket = new WebSocket('ws://localhost:3001');
    console.log('Connected to server');
    setTimeout(() => {
      console.log('Simulating incoming message');

      const newMessage = {
        id: Math.random(),
        user: 'yewsi',
        type: 'chat',
        content: 'I am yuyumeer'
      };

      this.setState({messages: this.state.messages.concat(newMessage)});
    }, 3000);
  }
}

export default App;
