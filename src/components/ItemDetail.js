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
      specialReq: 'No Special Request',
      color: 'Standard Brown'
    };
  }

  componentDidMount() {
    let itemIds = this.props.items.map(item => item.id);
    if (itemIds.includes(this.props.location.state.itemData.key)) {
      this.setState({ isInCart: true });
    }
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

  handleNewQtyEnter(e) {
    let qty = e.target.value;
    this.setState({ qty });
    this.props.dispatch(updateQty(this.props.location.state.itemData.key, qty));
  }

  handleColorDropDownSelect(e) {
    let color = e.target.value;
    this.setState({ color });
    this.props.dispatch(
      updateColor(this.props.location.state.itemData.key, color)
    );
  }

  handleAddItemWithDetailData() {
    let key = this.props.location.state.itemData.key;
    this.props.dispatch(updateColor(key, this.state.color));
    this.props.dispatch(updateSpecialReq(key, this.state.specialReq));
    this.props.dispatch(updateQty(key, this.state.qty));
    this.props.history.push('/cart');
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
          <div>
            <div>
              <select
                value={this.state.value}
                onChange={this.handleNewQtyEnter.bind(this)}
              >
                <option value="select">Select a qty</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
              </select>
            </div>
            <div>
              <select
                value={this.state.value}
                onChange={this.handleColorDropDownSelect.bind(this)}
              >
                <option value="select">Select a Color Option</option>
                <option value="Tope">Tope</option>
                <option value="Brown">Brown</option>
                <option value="Off Grey">Off Grey</option>
                <option value="Sandy Brown">Sandy Brown</option>
              </select>
            </div>
          </div>
          <div>
            <InputSpecialReq
              type="text"
              placeholder="Special Request"
              ref={input => (this.input = input)}
              onKeyPress={this.handleUpdateSpecialReqInLocalState.bind(this)}
            />
            {this.state.isInCart && (
              <SpecialReqButton onClick={this.handleUpdatSpecialReq.bind(this)}>
                Update Special Request
              </SpecialReqButton>
            )}
          </div>
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
  width: 1000px;
  background-color: white;
  display: flex;
  justify-content: center;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 600px;
  width: 400px;
  background-color: lightgrey;
  margin: 40px auto;
  -webkit-box-shadow: 0 10px 6px -6px #777;
  -moz-box-shadow: 0 10px 6px -6px #777;
  box-shadow: 0 10px 6px -6px #777;

  div {
    padding-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 15px;
  }
`;

const InputSpecialReq = styled.textarea`
  height: 400px;
  width: 350px;
  margin: 10px;
`;

const SpecialReqButton = styled.button`
  margin-left: 215px;
`;
