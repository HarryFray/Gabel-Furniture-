import React, { Component } from 'react';
import './App.css';

import styled from 'styled-components';
import Item from './Item';

class ItemDetail extends Component {
  render() {
    console.log('FROM ITEM DETAIL', this.props);
    return (
      <Wrapper className="ItemDetail">
        <Item
          itemData={this.props.location.state.itemData}
          isDetailView={true}
        />
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
