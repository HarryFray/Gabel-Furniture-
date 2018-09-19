import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import { addItemToCart, removeItemFromCart } from '../actions/items';

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDetailView: false
    };
  }

  componentDidMount() {
    if (this.props.isDetailView) {
      this.setState({ isDetailView: true });
    }
  }

  handleAddToCart(id) {
    this.props.dispatch(addItemToCart(id));
  }

  handleRemoveFromCart(id) {
    this.props.dispatch(removeItemFromCart(id));
  }

  render() {
    const { title, description, price, type } = this.props.itemData.itemData;
    const { key } = this.props.itemData;
    console.log(this.props.items);
    return (
      <Wrapper>
        <Pic>Cool picture from FB</Pic>
        <Link
          to={{
            pathname: `item/${title}`,
            state: {
              itemData: this.props.itemData
            }
          }}
        >
          <h3>{title}</h3>
        </Link>
        <p> {description} </p>
        <h2>{type}</h2>
        <h3>{price}</h3>
        <button onClick={() => this.handleAddToCart(key)}>Add To Cart</button>
        <button onClick={() => this.handleRemoveFromCart(key)}>
          Remove From Cart
        </button>
      </Wrapper>
    );
  }
}

export default connect(state => ({
  items: state.items
}))(Item);

const Wrapper = styled.div`
  height: 600px;
  width: 400px;
  background-color: grey;
  color: white;
  margin: 50px;

  p {
    padding: 10px;
  }
`;

const Pic = styled.div`
  height: 300px;
  width: 100%;
  background-color: green;
`;
