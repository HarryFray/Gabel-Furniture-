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
      itemsInCartAndUserSpecificInfo: [],
      totalPrice: 0
    };
  }

  componentDidMount() {
    // listening for item changes
    database.ref('/items').on('value', items => {
      let allItems = [];
      map(items.val(), (itemData, key) => {
        allItems.push({ key, itemData });
      });

      // getting all items in cart
      let IdsInCart = this.props.items.map(item => item.id);
      let itemsInCart = allItems.filter(item => {
        return IdsInCart.includes(item.key);
      });

      // merging fb data with redux data
      let itemsInCartAndUserSpecificInfo = itemsInCart.map(item => {
        let userSpecificInfo = this.props.items.filter(userItemInfo => {
          return userItemInfo.id === item.key;
        });
        return { ...item, ...userSpecificInfo[0] };
      });
      this.setState({ itemsInCartAndUserSpecificInfo }, () => {
        this.updateTotalPrice();
      });
    });
  }

  // updating cart when item is deleted
  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
      let IdsInCart = this.props.items.map(item => item.id);
      this.setState(
        {
          itemsInCartAndUserSpecificInfo: prevState.itemsInCartAndUserSpecificInfo.filter(
            item => {
              return IdsInCart.includes(item.key);
            }
          )
        },
        () => {
          this.updateTotalPrice();
        }
      );
    }
  }

  updateTotalPrice() {
    let totalPrice = 0;
    this.state.itemsInCartAndUserSpecificInfo.forEach(item => {
      totalPrice = totalPrice + item.qty * Number(item.itemData.price);
    });
    this.setState({ totalPrice });
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
                  <h4>{`QTY: ${item.qty}`}</h4>
                  <h4>{`Color: ${item.color}`}</h4>
                  <h4>{`Special Request: ${item.specialReq}`}</h4>
                  <div />
                  <h4>{`Item Total: $${item.qty * item.itemData.price}`}</h4>
                </ExtraCartInfo>
              </CartWrapper>
            );
          })}
        </ItemList>
        <Price>
          {this.state.itemsInCartAndUserSpecificInfo.map(item => {
            return (
              <div>{`${item.itemData.title}: ${item.qty} X ${
                item.itemData.price
              } .... ${item.qty * item.itemData.price}`}</div>
            );
          })}
          <hr />
          <h4>{`Total $${this.state.totalPrice}`}</h4>
        </Price>
        <ChatRoom />
      </Wrapper>
    );
  }
}

export default connect(state => ({
  items: state.items
}))(Cart);

const Price = styled.div`
  background-color: white;
  width: 400px;
  padding-right: 200px;
  height: 200px;

  display: flex;
  flex-direction: column;
  align-items: flex-end;

  padding: 10px;
  margin-top: 100px;
  margin-right: 100px;

  align-self: flex-start;

  background-color: lightgrey;

  -webkit-box-shadow: 0 10px 6px -6px #777;
  -moz-box-shadow: 0 10px 6px -6px #777;
  box-shadow: 0 10px 6px -6px #777;

  hr {
    width: 200px;
    color: black;
  }
  h4 {
    margin: 0px;
  }
`;

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
align-self: flex-start;

  width: 1500px;
  display: flex
  flex-direction: column;
  justify-content: flex-start;
  padding-left: 20px;
  padding-top: 30px;
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

  div {
    flex: 1;
  }
`;

const CartWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 600px;
  padding-bottom: 40px;
  width: 600px;
  margin-left: 200px;
`;
