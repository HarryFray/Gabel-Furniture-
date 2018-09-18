import React, { Component } from 'react';
import './App.css';

import styled from 'styled-components';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Nav from './Nav';
import Home from './Home';
import Cart from './Cart';
import ItemDetail from './ItemDetail';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Nav />
          <Content>
            <Route path="/home" component={Home} />
            <Route path="/cart" component={Cart} />
            <Route path="/detail" component={ItemDetail} />
          </Content>
        </div>
      </Router>
    );
  }
}

export default App;

const Content = styled.div`
  padding-top: 50px;
  width: 100%;
`;
