import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    const { title, description, price, type } = this.props.itemData.itemData;
    return (
      <Wrapper>
        <Pic>Cool picture from FB</Pic>
        <Link to="/detail">
          <h3>{title}</h3>
        </Link>
        <p> {description} </p>
        <h2>{type}</h2>
        <h3>{price}</h3>
      </Wrapper>
    );
  }
}

export default Home;

const Wrapper = styled.div`
  height: 600px;
  width: 400px;
  background-color: grey;
  color: white;
  margin: 50px;

  p {
    padding: 10px;
  }
`;

const Pic = styled.div`
  height: 300px;
  width: 100%;
  background-color: green;
`;
