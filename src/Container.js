import React, { PureComponent } from 'react';

import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';

import './App.css';

export default class Container extends PureComponent {
  ws;

  state = {
    myName: '',
    connected: false,
    users: [],
    selectedUser: '',
    messages: [],
  };

  handleName = (event) => {
    this.setState({
      myName: event.target.value,
    });
  };

  connect = () => {
    const { myName } = this.state;
    this.ws = new WebSocket('ws://localhost:8085/' + myName);

    this.setState({
      connected: true,
    });

    this.ws.onmessage = (message) => {
      console.log(message);
      const response = JSON.parse(message.data);

      if (response.type === 'allUsers') {
        this.setState({
          users: response.users,
        });
      } else if (response.type === 'chatMessage') {
        const { messages } = this.state;
        this.setState({
          messages: [...messages, response],
        });
      }
    };
  };

  onSend = (message) => {
    const { myName, selectedUser } = this.state;
    if (this.ws) {
      this.ws.send(
        JSON.stringify({
          from: myName,
          to: selectedUser,
          msg: message,
        }),
      );
    }
  };

  updateSelectedUser = (user) => {
    this.setState({ selectedUser: user });
  };

  render() {
    const { users, connected, selectedUser, messages, myName } = this.state;

    const visibleMessages = messages.filter(
      (msg) => (msg.to === myName && msg.from === selectedUser) || (msg.from === myName && msg.to === selectedUser),
    );
    // console.log(visibleMessages);
    return (
      <div>
        <p>Zubi chat app</p>
        {!connected ? (
          <div>
            <p>My name</p>
            <input onChange={this.handleName} />
            <button onClick={this.connect}>Connect</button>
          </div>
        ) : (
          <div className="Wrapper">
            <div className="LeftWrapper">
              <LeftPanel users={users} selectedUser={selectedUser} updateSelectedUser={this.updateSelectedUser} />
            </div>
            {selectedUser && (
              <div className="RightWrapper">
                <RightPanel onSend={this.onSend} messages={visibleMessages} />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
