import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import map from 'lodash/map';
import { database } from '../utils/firebase';
import Item from './Item';
import styled from 'styled-components';
import ChatRoom from './ChatRoom';

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      itemsInCartAndUserSpecificInfo: []
    };
  }

  componentDidMount() {
    database.ref('/items').on('value', items => {
      let allItems = [];
      map(items.val(), (itemData, key) => {
        allItems.push({ key, itemData });
      });
      let IdsInCart = this.props.items.map(item => item.id);

      let itemsInCart = allItems.filter(item => {
        return IdsInCart.includes(item.key);
      });

      let itemsInCartAndUserSpecificInfo = itemsInCart.map(item => {
        let userSpecificInfo = this.props.items.filter(userItemInfo => {
          return userItemInfo.id === item.key;
        });
        return { ...item, ...userSpecificInfo[0] };
      });
      this.setState({ itemsInCartAndUserSpecificInfo });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
      let IdsInCart = this.props.items.map(item => item.id);
      this.setState({
        itemsInCartAndUserSpecificInfo: prevState.itemsInCartAndUserSpecificInfo.filter(
          item => {
            return IdsInCart.includes(item.key);
          }
        )
      });
    }
  }

  render() {
    return (
      <Wrapper className="Cart">
        {this.state.itemsInCartAndUserSpecificInfo.length === 0 && (
          <h1>You Have No Items In Your Cart</h1>
        )}
        <ItemList>
          {this.state.itemsInCartAndUserSpecificInfo.map(item => {
            return (
              <CartWrapper key={item.key}>
                <Item isCartView={true} itemData={item} />
                <ExtraCartInfo>
                  <h3>{`QTY: ${item.qty}`}</h3>
                  <h3>{`Color: ${item.color}`}</h3>
                  <h3>{`Special Request: ${item.specialReq}`}</h3>
                </ExtraCartInfo>
              </CartWrapper>
            );
          })}
        </ItemList>
        <ChatRoom />
      </Wrapper>
    );
  }
}

export default connect(state => ({
  items: state.items
}))(Cart);

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100%;
  h1 {
    margin: 0px;
  }
`;

const ItemList = styled.div`
  width: 1500px;
  display: flex
  flex-direction: column;
  justify-content: flex-start;
  padding-left: 20px;
`;

const ExtraCartInfo = styled.div`
  width: 300px;
  margin-top: 50px;
  height: 600px;

  background-color: lightgrey;
  margin: 40px auto;
  -webkit-box-shadow: 0 10px 6px -6px #777;
  -moz-box-shadow: 0 10px 6px -6px #777;
  box-shadow: 0 10px 6px -6px #777;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  padding-left: 15px;
`;

const CartWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 600px;
  padding-bottom: 40px;
  width: 700px;
`;
