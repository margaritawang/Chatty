import React, {Component} from 'react';

function isPic(string) {
  
}

function isPic(string) {
  const arr = string.split(" ");
  
  for (let i in arr) {
    i = Number(i);
    let element = arr[i];
    
    if (element.endsWith('.jpg')||element.endsWith('.gif')||element.endsWith('.png')||element.endsWith('.jpeg')) {
      const url = element;
      const first = arr.slice(0,i).join(" ");
      const last = arr.slice(i+1).join(" ");
      return [url, first, last];
    }
    
  }
  
  return false;
}

class Message extends Component {
  render() {
    // console.log(this.props);
    if (this.props.type === 'chat') {
      if (isPic(this.props.content)){

        const url = isPic(this.props.content)[0];
        const msg1 = isPic(this.props.content)[1];
        const msg2 = isPic(this.props.content)[2];
        return (
          <div className="message">
            <span className="message-username" style={{color: this.props.color}}>{this.props.user}</span>
            <div className="message-content">
              <p>{msg1}</p>
              <img src={url}/>
              <p>{msg2}</p>
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