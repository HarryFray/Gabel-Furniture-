import React, { Component } from 'react';
import './App.css';

import styled from 'styled-components';
import { database } from '../utils/firebase';
import map from 'lodash/map';

class ChatRoom extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      chatLog: []
    };
  }

  componentDidMount() {
    // listeing for chat room changes
    database.ref('/chatroom').on('value', snapshot => {
      let chatLog = [];
      map(snapshot.val(), (sentence, key) => {
        chatLog.push(sentence);
      });
      this.setState({ chatLog });
    });
  }

  handleSaySomething(e) {
    if (e.key === 'Enter') {
      let inputVal = this.input.value;
      database.ref('/chatroom').push(`${this.state.name}: ${inputVal}`);
      this.input.value = '';
    }
  }

  handleEnterName(e) {
    if (e.key === 'Enter') {
      let inputVal = this.input.value;
      this.setState({ name: inputVal });
      this.input.value = '';
    }
  }

  render() {
    return (
      <Wrapper>
        {this.state.name && <div>{this.state.name} is signed into the</div>}
        <h1>Chat Room</h1>
        <ChatList>
          {this.state.chatLog.map(sentence => {
            return <div key={sentence}>{sentence}</div>;
          })}
          {this.state.name === '' ? (
            <input
              type="text"
              placeholder="Enter Name To chat"
              ref={input => (this.input = input)}
              onKeyPress={this.handleEnterName.bind(this)}
            />
          ) : (
            <input
              type="text"
              placeholder="Say Something"
              ref={input => (this.input = input)}
              onKeyPress={this.handleSaySomething.bind(this)}
            />
          )}
        </ChatList>
      </Wrapper>
    );
  }
}

export default ChatRoom;

const Wrapper = styled.div`
  align-self: start;
  padding: 20px;
  width: 800px;
  height: 1000px;
  background-color: orange;
  margin-right: 100px;

  background-color: lightgrey;

  -webkit-box-shadow: 0 10px 6px -6px #777;
  -moz-box-shadow: 0 10px 6px -6px #777;
  box-shadow: 0 10px 6px -6px #777;
`;

const ChatList = styled.div`
  display: flex;
  flex-direction: column;

  align-items: flex-start;
`;
