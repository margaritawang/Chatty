import React, {Component} from 'react';

function isPic(string) {
  var str = string.slice(-4);
    if (str === '.jpg' || str === '.png'|| str === '.gif' || str === 'jpeg') {
      return true;
    } 
  return false;

}

class Message extends Component {
  render() {
    console.log(this.props);
    if (this.props.type === 'chat') {
      if (isPic(this.props.content)){
        return (
          <div className="message">
            <span className="message-username" style={{color: this.props.color}}>{this.props.user}</span>
            <div className="message-content">
              <img src={this.props.content}/>
            </div>
          </div>
        );  
      } else {
        return (
          <div className="message">
            <span className="message-username" style={{color: this.props.color}}>{this.props.user}</span>
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