import React, { Component } from 'react';
import './App.css';

import Item from './Item';

import styled from 'styled-components';
import { database } from '../utils/firebase';

class Home extends Component {
  componentDidMount() {}

  imemAData = {
    title: 'Cool Table',
    description: 'This table is great trust me!'
  };

  imemBData = {
    title: 'coffee higaboooo!',
    description: 'mwahh raa goo!'
  };

  render() {
    return (
      <Wrapper className="Home">
        <ItemList>
          <Item itemData={this.imemAData} />
          <Item itemData={this.imemBData} />
          <Item itemData={this.imemAData} />
          <Item itemData={this.imemAData} />
          <Item itemData={this.imemAData} />
          <Item itemData={this.imemAData} />
        </ItemList>
      </Wrapper>
    );
  }
}

export default Home;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  color: white;

  h1 {
    margin: 0px;
  }
`;

const ItemList = styled.div`
  flex-wrap: wrap;
  padding-top: 450px;

  width: 1500px;
  display: flex;
`;
