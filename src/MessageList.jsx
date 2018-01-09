import React, {Component} from 'react';

import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    return (
      <main className="messages">
        {this.props.messages.map(message => (
          <Message
            key={message.id}
            user={message.user}
            type={message.type}
            content={message.content}/>
        ))}
      </main>
    );
  }
}

export default MessageList;