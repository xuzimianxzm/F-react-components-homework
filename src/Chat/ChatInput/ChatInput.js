import React, { Component } from 'react';
import './ChatInput.scss';
import { ROLE } from '../../constants';
import answersData from '../../data/answers.json';

class ChatInput extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.state = {
      inputMessage: '',
    };
  }

  inputChange = () => {
    const message = this.textInput.current.value;
    this.setState({
      inputMessage: message,
    });
  };

  getInputMessage = () => {
    if (!this.state.inputMessage) {
      return;
    }

    const customerMessage = this.createMessage();
    this.showMessage(customerMessage);
    this.answerQuestion(customerMessage);
    this.resetInputText();
  };

  showMessage = (customerMessage) => {
    this.props.messages.push(customerMessage);
    this.props.onQuestion(this.props.messages);
  };

  createMessage = () => {
    const customerMessage = {
      text: this.state.inputMessage,
      role: ROLE.CUSTOMER,
    };
    return customerMessage;
  };

  answerQuestion = (currentMessage) => {
    if (ROLE.CUSTOMER === currentMessage.role) {
      const answerMessage = answersData.find((answer) => currentMessage.text.includes(answer.tags));
      if (answerMessage) {
        this.showMessage(answerMessage);
      }
    }
  };

  resetInputText = () => {
    this.setState({
      inputMessage: null,
    });
    this.textInput.current.value = null;
  };

  render() {
    return (
      <footer className="ChatInput">
        <input type="text" ref={this.textInput} onChange={this.inputChange} />
        <button type="button" onClick={this.getInputMessage}>
          Send
        </button>
      </footer>
    );
  }
}

export default ChatInput;
