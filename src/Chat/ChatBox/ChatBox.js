import React, { Component } from 'react';
import './ChatBox.scss';
import ChatMessage from './ChatMessage/ChatMessage';
import { ROLE } from '../../constants';

class ChatBox extends Component {
  render() {
    const { messages } = this.props;
    return (
      <section className="ChatBox">
        <ul>
          {messages.map((message, index) => (
            <li
              key={message.role + index}
              className={message.role === ROLE.ROBOT ? 'robot' : 'customer'}
            >
              <ChatMessage text={message.text} role={message.role} />
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

export default ChatBox;
