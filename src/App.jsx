import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';



// exampleSocket.onopen = (event) => {
//   exampleSocket.send('ok');
// }

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {
        name: 'Anonymous',
        color: null
      },
      activeUser : 1,
      messages: [
      //   {
      //   id: 1,
      //   user: 'Amy',
      //   type: 'chat',
      //   content: "I won't be impressed with technology until I can download food."
      // }, {
      //   id: 1.5,
      //   type: 'system',
      //   content: 'Anonymous1 changed their name to Bob'
      // }, {
      //   id: 2,
      //   user: 'Yuyumeer',
      //   type: 'chat',
      //   content: 'I am message 2'
      // }, {
      //   id: 3,
      //   user: 'Yuyumeer',
      //   type: 'chat',
      //   content: 'I love yewyew'
      // }
    ]
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
      console.log(event.data);
      if (event.data[0] === "#") {
        this.setState({currentUser:{
          name: this.state.currentUser.name,
          color : event.data}});
      } else if (JSON.parse(event.data).type === 'chat' || JSON.parse(event.data).type === 'system'){
        this.setState({
          messages: this.state.messages.concat(JSON.parse(event.data))
        });
        return;
      } else if (JSON.parse(event.data).type === 'user') {
        // console.log(JSON.parse(event.data));
        this.setState({activeUser: JSON.parse(event.data).activeuser});
      }
    })
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
