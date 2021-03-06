import React, {Component} from 'react';


class Chatbar extends Component {
  constructor(props) {
    super(props);
    this.state = {value: this.props.currentUser.name};

    this.handlechange = this.handlechange.bind(this);
  }

  handlechange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    if (this.props.currentUser) {
      return (
        <div>
          <footer className="chatbar">
            <input
              className="chatbar-username"
              value={this.state.value}
              onChange={this.handlechange}
              onKeyPress={(event) =>{
                if (event.key === 'Enter'){
                  this.props.changeUser(this.props.currentUser.name, event.target.value, this.props.currentUser.color);
                }
              }} />
            <input
              className="chatbar-message"
              placeholder="Type a message and hit ENTER"
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  this.props.addMessage(this.props.currentUser.name,this.props.currentUser.color, event.target.value);
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