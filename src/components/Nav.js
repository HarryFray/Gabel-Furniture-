import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalItemsInCart: 0
    };
  }

  // updating number of items in cart
  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
      let totalItemsInCart = this.props.items.length;
      this.setState({ totalItemsInCart });
    }
  }

  render() {
    return (
      <Wrapper className="Nav">
        <Link to="/">
          <h1>Home</h1>
        </Link>
        <h1>Gabel Furniture</h1>
        <Link to="/cart">
          <h1>{`${this.state.totalItemsInCart} Cart`}</h1>
        </Link>
      </Wrapper>
    );
  }
}

export default connect(state => ({
  items: state.items
}))(Nav);

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  color: white;
  height: 70px;
  width: 100%;
  background-color: black;
  position: fixed;
  h1 {
    padding: 20px;
    margin: 0px;
    color: #ffffff;
    text-decoration: none;

    :hover {
      cursor: pointer;
      color: grey;
    }

    link {
      text-decoration: none;
    }
  }
`;
