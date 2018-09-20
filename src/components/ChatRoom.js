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
        {this.state.name && <div>{this.state.name} is signed in</div>}
        <h1>Chat Room</h1>
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
      </Wrapper>
    );
  }
}

export default ChatRoom;

const Wrapper = styled.div`
  padding-top: 50px;
  width: 100%;
  height: 1000px;
  background-color: orange;
`;
