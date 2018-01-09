import React, {Component} from 'react';


class Chatbar extends Component {
  render() {
    if (this.props.currentUser) {
      return (
        <div>
          <footer className="chatbar">
            <input
              className="chatbar-username"
              defaultValue={this.props.currentUser} />
            <input
              className="chatbar-message"
              placeholder="Type a message and hit ENTER"
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  this.props.addMessage(this.props.currentUser, event.target.value);
                  event.target.value = "";
                }
              }}/>
          </footer>
        </div>
      )
    } else {
      return (
        <div>
          <footer className="chatbar">
            <input
              className="chatbar-username"
              placeholder="Your Name (Optional)" />
            <input
              className="chatbar-message"
              placeholder="Type a message and hit ENTER"
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  this.props.addMessage(event.target.value)
                }
              }}/>
          </footer>
        </div>
      );
    }
  }
}

export default Chatbar;