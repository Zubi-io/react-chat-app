import React, { PureComponent } from 'react';

export default class ComposeBox extends PureComponent {
  state = {
    message: '',
  };

  onMsgChange = (event) => {
    this.setState({
      message: event.target.value,
    });
  };

  sendMessage = () => {
    const { onSend } = this.props;
    const { message } = this.state;
    onSend(message);
    this.setState({
      message: '',
    });
  };

  render() {
    const { message } = this.state;
    return (
      <div className="ComposeBoxWrapper">
        <input value={message} onChange={this.onMsgChange} />
        <button onClick={this.sendMessage}>Send</button>
      </div>
    );
  }
}
