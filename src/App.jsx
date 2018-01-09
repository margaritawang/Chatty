import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
// import Message from './Message.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Yewyew'},
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

  addMessage(content) {
    const newMessage = {
      id: Math.random(),
      user: 'Yuyumeer',
      type: 'chat',
      content: content
    };

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
        <Chatbar addMessage={this.addMessage.bind(this)} />
      </div>
    );
  }
}

export default App;
