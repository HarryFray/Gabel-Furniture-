import React, { Component } from 'react';
import './App.css';

import styled from 'styled-components';
import { database } from '../utils/firebase';

class Admin extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      type: '',
      price: ''
    };
  }

  handleAddNewItemToStore() {
    database.ref('/items').push(this.state);
  }

  handleTitleInput(e) {
    this.setState({ title: e.target.value });
  }

  handleDescriptionInput(e) {
    this.setState({ description: e.target.value });
  }

  handlePriceInput(e) {
    this.setState({ price: e.target.value });
  }

  handleTypeInput(e) {
    this.setState({ type: e.target.value });
  }

  render() {
    return (
      <Wrapper className="Admin">
        <button onClick={this.handleAddNewItemToStore.bind(this)}>
          Add New Item To Store!
        </button>
        <InputDetail>
          <input
            type="text"
            placeholder="Title"
            onKeyPress={this.handleTitleInput.bind(this)}
          />
          <h3>
            Title:
            {this.state.title}
          </h3>
        </InputDetail>
        <InputDetail>
          <input
            type="text"
            placeholder="Description"
            onKeyPress={this.handleDescriptionInput.bind(this)}
          />
          <h3>
            Description:
            {this.state.description}
          </h3>
        </InputDetail>
        <InputDetail>
          <input
            type="number"
            placeholder="Price"
            onKeyPress={this.handlePriceInput.bind(this)}
          />
          <h3>
            Price:
            {this.state.price}
          </h3>
        </InputDetail>
        <InputDetail>
          <input
            type="text"
            placeholder="Type"
            onKeyPress={this.handleTypeInput.bind(this)}
          />
          <h3>
            Type:
            {this.state.type}
          </h3>
        </InputDetail>
      </Wrapper>
    );
  }
}

export default Admin;

const Wrapper = styled.div`
  padding-top: 50px;
  height: 100vh;
  width: 100vw;
  color:black h1 {
  }
`;

const InputDetail = styled.div`
  width: 600px;
  display: flex;
  align-items: center;

  h3 {
    padding: 10px;
  }
`;
