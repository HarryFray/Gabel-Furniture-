import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { storage } from '../utils/firebase';

import { Link } from 'react-router-dom';
import { addItemToCart, removeItemFromCart } from '../actions/items';

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInCart: false,
      url: ''
    };
  }

  componentDidMount() {
    let IdsInCart = this.props.items.map(item => item.id);
    if (IdsInCart.includes(this.props.itemData.key)) {
      this.setState({ isInCart: true });
    }
    //gettting img from fb
    storage
      .ref(`/item-images/${this.props.itemData.itemData.title}`)
      .getDownloadURL()
      .then(url => {
        this.setState({ url });
      });
  }

  handleAddToCart(id) {
    this.props.dispatch(
      addItemToCart({
        id,
        qty: 1,
        specialReq: 'No Special Request Entered',
        color: 'Standard Brown'
      })
    );
    this.setState({ isInCart: true });
    this.props.handleAddItemWithDetailData();
  }

  handleRemoveFromCart(id) {
    this.props.dispatch(removeItemFromCart(id));
    this.setState({ isInCart: false });
  }

  render() {
    const { title, description, price, type } = this.props.itemData.itemData;
    const { key } = this.props.itemData;
    return (
      <Wrapper>
        <Pic>
          <img src={this.state.url} />
        </Pic>
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
        {!this.props.isHomeView &&
          (this.state.isInCart ? (
            <button onClick={() => this.handleRemoveFromCart(key)}>
              Remove From Cart
            </button>
          ) : (
            <button onClick={() => this.handleAddToCart(key)}>
              Add To Cart
            </button>
          ))}
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
  margin: 50px 0px 50px 50px;

  p {
    padding: 10px;
  }
`;

const Pic = styled.div`
  height: 300px;
  width: 100%;
  background-color: green;
  img {
    width: 100%;
    heigth: 300px;
  }
`;
