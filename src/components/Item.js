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
        <Content>
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
          <div>
            <h3>Type: {type}</h3>
            <h3>Price: ${price}</h3>
          </div>
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
        </Content>
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
  background-color: lightgrey;

  margin: 10px;

  margin: 40px auto;
  -webkit-box-shadow: 0 10px 6px -6px #777;
  -moz-box-shadow: 0 10px 6px -6px #777;
  box-shadow: 0 10px 6px -6px #777;

  p {
    padding: 10px;
  }
`;

const Pic = styled.div`
  height: 300px;
  width: 100%;
  background-color: lightgrey;
  img {
    width: 100%;
    heigth: 300px;
  }
`;

const Content = styled.div`
  padding-top: 75px;
  height: 300px;
  width: 100%;

  p {
    margin: 0px;
  }

  a {
    h3 {
      padding-top: 30px;
      margin: 0px;
    }
  }

  div {
    display: flex;
    justify-content: space-around;
    margin-bottom: 10px;
    h3 {
      margin: 0px;
    }
  }
`;
