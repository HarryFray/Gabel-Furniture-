import React, { Component } from 'react';
import './App.css';

import styled from 'styled-components';
import { connect } from 'react-redux';
import { updateSpecialReq, updateQty } from '../actions/items';

import Item from './Item';

class ItemDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInCart: false,
      qty: 0,
      specialReq: ''
    };
  }

  componentDidMount() {
    let itemIds = this.props.items.map(item => item.id);
    if (itemIds.includes(this.props.location.state.itemData.key)) {
      this.setState({ isInCart: true });
    }
  }

  handleNewQtyEnter(e) {
    this.setState({ qty: e.target.value });
    this.props.dispatch(
      updateQty(this.props.location.state.itemData.key, this.state.qty)
    );
  }

  handleUpdatSpecialReq() {
    this.props.dispatch(
      updateSpecialReq(
        this.props.location.state.itemData.key,
        this.state.specialReq
      )
    );
  }

  handleUpdateSpecialReqInLocalState(e) {
    this.setState({ specialReq: e.target.value });
  }

  render() {
    return (
      <Wrapper className="ItemDetail">
        <Item
          itemData={this.props.location.state.itemData}
          isDetailView={true}
        />
        <Detail>
          <InputDetail>
            <input
              type="number"
              placeholder="Qty"
              ref={input => (this.input = input)}
              onClick={this.handleNewQtyEnter.bind(this)}
            />
          </InputDetail>
          <InputDetail>
            <input
              type="text"
              placeholder="Special Request"
              ref={input => (this.input = input)}
              onKeyPress={this.handleUpdateSpecialReqInLocalState.bind(this)}
            />
            <button onClick={this.handleUpdatSpecialReq.bind(this)}>
              Update Special Request
            </button>
          </InputDetail>
        </Detail>
      </Wrapper>
    );
  }
}

export default connect(state => ({
  items: state.items
}))(ItemDetail);

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: white;
  display: flex;
  justify-content: center;
`;

const Detail = styled.div`
  height: 600px;
  width: 400px;
  background-color: grey;
  color: white;
  margin: 50px;
  display: flex;
  flex-direction: column;
`;

const InputDetail = styled.div`
  width: 600px;
  display: flex;
  align-items: center;

  h3 {
    padding: 10px;
  }
`;
