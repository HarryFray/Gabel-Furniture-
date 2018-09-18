import React, { Component } from 'react';
import './App.css';

import styled from 'styled-components';

class Cart extends Component {
  render() {
    return (
      <Wrapper className="Cart">
        <h1>Cart</h1>
      </Wrapper>
    );
  }
}

export default Cart;

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  color:black h1 {
  }
`;
