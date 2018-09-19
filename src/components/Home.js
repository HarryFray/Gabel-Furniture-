import React, { Component } from 'react';
import map from 'lodash/map';

import './App.css';

import Item from './Item';

import styled from 'styled-components';
import { database } from '../utils/firebase';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    database.ref('/items').on('value', items => {
      let allItems = [];
      map(items.val(), (itemData, key) => {
        allItems.push({ key, itemData });
      });
      this.setState(
        {
          items: allItems
        },
        () => {
          console.log(this.state.items);
        }
      );
    });
  }

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
          {this.state.items.map(item => {
            return <Item key={item.key} itemData={item} />;
          })}
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
