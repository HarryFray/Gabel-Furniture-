import React, { Component } from 'react';
import './App.css';

import styled from 'styled-components';
import { Link } from 'react-router-dom';

class Nav extends Component {
  render() {
    return (
      <Wrapper className="Nav">
        <Link to="/home">
          <h1>Home</h1>
        </Link>
        <Link to="/cart">
          <h1>Cart</h1>
        </Link>
      </Wrapper>
    );
  }
}

export default Nav;

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
