import React, { PureComponent } from 'react';

import ComposeBox from './ComposeBox';

const Message = ({ message }) => {
  return <p key={message.id}>{message.msg}</p>;
};

export default class RightPanel extends PureComponent {
  renderMessage = (m) => {
    return <Message message={m} />;
  };
  render() {
    const { onSend, messages } = this.props;
    console.log(messages);
    return (
      <div className="RightContainer">
        {messages.map((m) => this.renderMessage(m))}
        <ComposeBox onSend={onSend} />
      </div>
    );
  }
}
