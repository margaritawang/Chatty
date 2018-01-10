import React, {Component} from 'react';


class Chatbar extends Component {
  constructor(props) {
    super(props);
    this.state = {value: this.props.currentUser};

    this.handlechange = this.handlechange.bind(this);
  }

  handlechange(event) {
    // console.log(event.target.value);
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
                  this.props.changeUser(this.props.currentUser, event.target.value);
                }
              }} />
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