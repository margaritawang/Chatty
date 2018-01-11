import React, {Component} from 'react';

function isPic(string) {
  if (
    (string.startsWith('http://') ||
    string.startsWith('https://'))
    &&
    (string.endsWith('.jpg') ||
    string.endsWith('.gif') ||
    string.endsWith('.png') ||
    string.endsWith('.jpeg'))
  ) {
    return true;
  }
  return false;
}

function splitmsg(arr) {
  let msg = [];
  
  if (!arr.length) {
    return [];
  }

  for (let i in arr) {
    i = Number(i);
    let element = arr[i];
      
    if (isPic(element)) {
      msg = msg.concat(arr.slice(0, i).join(' '));
      msg = msg.concat(element);
      const rest = arr.slice(i + 1);
      const found = splitmsg(rest);
      if (found.length) {
        msg = msg.concat(found);
        break;
      }
    }
  }
  
  if (!msg.length) {
    return arr.join(' ');
  } else {
    return msg;
  }
}

function rendermsg(arr) {
  const content = splitmsg(arr);
  
  if (typeof(content) === "string") {
    return (<span>{content}</span>);
  }

  const message = content.map((element) => {
    console.log(element);
    if (!isPic(element)) {
      return (<p>{element}</p>);
    } else {
      return (<img src={element}/>);
    }
  })
  return message;
}

class Message extends Component {
  render() {
    // console.log(this.props);
    if (this.props.type === 'chat') {
      // if (isPic(this.props.content)){

      //   const url = isPic(this.props.content)[0];
      //   const msg1 = isPic(this.props.content)[1];
      //   const msg2 = isPic(this.props.content)[2];
        return (
          <div className="message">
            <span className="message-username" style={{color: this.props.color}}>{this.props.user}</span>
            <div className="message-content">
              {rendermsg(this.props.content.split(" "))}
            </div>
          </div>
        );  
      // } else {
      //   return (
      //     <div className="message">
      //       <span className="message-username" style={{color: this.props.color}}>{this.props.user}</span>
      //       <span className="message-content">{this.props.content}</span>
      //     </div>
      //   );
      // }
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