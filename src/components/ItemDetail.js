import React, { Component } from 'react';
import './App.css';

import styled from 'styled-components';
import Item from './Item';

class ItemDetail extends Component {
  imemAData = {
    title: 'Cool Table',
    description: 'This table is great trust me!'
  };

  render() {
    return (
      <Wrapper className="ItemDetail">
        <Item itemData={this.imemAData} />
      </Wrapper>
    );
  }
}

export default ItemDetail;

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: white;
`;
