import React, { Component } from 'react';
import './App.css';

import styled from 'styled-components';
import { connect } from 'react-redux';
import { updateSpecialReq, updateQty, updateColor } from '../actions/items';

import Item from './Item';

class ItemDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInCart: false,
      qty: 1,
      specialReq: 'No Special Request Entered',
      color: 'Standard Brown'
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
    this.setState({
      specialReq: e.target.value
    });
  }

  handleColorDropDownSelect(e) {
    let color = e.target.value;
    this.props.dispatch(
      updateColor(this.props.location.state.itemData.key, color)
    );
  }

  handleAddItemWithDetailData() {
    let key = this.props.location.state.itemData.key;
    this.props.dispatch(updateColor(key, this.state.color));
    this.props.dispatch(updateSpecialReq(key, this.state.specialReq));
    this.props.dispatch(updateQty(key, this.state.qty));
  }

  render() {
    return (
      <Wrapper className="ItemDetail">
        <Item
          itemData={this.props.location.state.itemData}
          isDetailView={true}
          handleAddItemWithDetailData={this.handleAddItemWithDetailData.bind(
            this
          )}
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
          <InputDetail>
            <label>Color</label>
            <select
              value={this.state.value}
              onChange={this.handleColorDropDownSelect.bind(this)}
            >
              <option value="select">Select an Option</option>
              <option value="Tope">Tope</option>
              <option value="Brown">Brown</option>
              <option value="Off Grey">Off Grey</option>
              <option value="Sandy Brown">Sandy Brown</option>
            </select>
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
