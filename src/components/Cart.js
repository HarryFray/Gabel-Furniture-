import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import map from 'lodash/map';
import { database } from '../utils/firebase';
import Item from './Item';

import styled from 'styled-components';

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      itemsInCart: []
    };
  }

  componentDidMount() {
    database.ref('/items').on('value', items => {
      let allItems = [];
      map(items.val(), (itemData, key) => {
        allItems.push({ key, itemData });
      });
      let itemsInCart = allItems.filter(item => {
        return this.props.items.includes(item.key);
      });
      this.setState({
        itemsInCart
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
      this.setState({
        itemsInCart: prevState.itemsInCart.filter(item => {
          return this.props.items.includes(item.key);
        })
      });
    }
  }

  render() {
    return (
      <Wrapper className="Cart">
        <ItemList>
          {this.state.itemsInCart.map(item => {
            return <Item key={item.key} itemData={item} />;
          })}
        </ItemList>
      </Wrapper>
    );
  }
}

export default connect(state => ({
  items: state.items
}))(Cart);

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
