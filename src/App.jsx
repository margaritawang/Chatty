import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {
        name: 'Anonymous',
        color: null
      },
      activeUser : 1,
      messages: []
    };
  }

  addMessage(user, color, content) {
    const newMessage = {
      user: user,
      color: color,
      type: 'chat',
      content: content
    };

    this.socket.send(JSON.stringify(newMessage));
    
  }

  changeUser(oldName, newName, color) {
    const msg = {
      type: 'system',
      content: `${oldName} changed their name to ${newName}`
    };

    this.socket.send(JSON.stringify(msg));
    this.socket.onmessage = ((event) => {
      this.setState({
        messages: this.state.messages.concat(JSON.parse(event.data))
      });
      this.setState({currentUser:{
        name: newName,
        color: color
      }});
      
    })
  }
 
  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span>{this.state.activeUser} users online</span>
        </nav>
        <MessageList messages={this.state.messages} />
        <Chatbar currentUser={this.state.currentUser} addMessage={this.addMessage.bind(this)} changeUser={this.changeUser.bind(this)}/>
      </div>
    );
  }

  componentDidMount() {
    console.log('ComponentDidMount <app />');
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onmessage = ((event)=> {
      const parsedData = JSON.parse(event.data);
      
      if (parsedData.color  && !this.state.currentUser.color) {
        this.setState({currentUser:{
          name: this.state.currentUser.name,
          color : parsedData.color}});
      }

      if (parsedData.type){
        this.setState({
          messages: this.state.messages.concat(parsedData)
        });
      } 
      
      if (parsedData.type === 'user') {
        console.log(parsedData);
        this.setState({
          activeUser: parsedData.activeuser
        });
      }
    })
    console.log('Connected to server');
    setTimeout(() => {
      console.log('Simulating incoming message');

      const newMessage = {
        id: Math.random(),
        user: 'System',
        type: 'chat',
        content: 'Welcome to Chatty!'
      };

      this.setState({messages: this.state.messages.concat(newMessage)});
    }, 3000);
  }
}

export default App;
