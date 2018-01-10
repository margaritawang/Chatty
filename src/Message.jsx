import React, {Component} from 'react';

class Message extends Component {
  render() {
    if (this.props.type === 'chat') {
      if (this.props.content.includes('jpg')||this.props.content.includes('png')||this.props.content.includes('gif')){
        return (
          <div className="message">
            <span className="message-username">{this.props.user}</span>
            <div className="message-content">
              <img src={this.props.content}/>
            </div>
          </div>
        );  
      } else {
        return (
          <div className="message">
            <span className="message-username">{this.props.user}</span>
            <span className="message-content">{this.props.content}</span>
          </div>
        );
      }
    } else {
      return (
        <div className="message system">
          {this.props.content}
        </div>
      );
    }
  }
}

export default Message;