import React, { Component } from 'react';
import './App.css';

import styled from 'styled-components';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Nav from './Nav';
import Home from './Home';
import Cart from './Cart';
import ItemDetail from './ItemDetail';
import Admin from './Admin';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Nav />
          <Content>
            <Route exact path="/" component={Home} />
            <Route path="/cart" component={Cart} />
            <Route path="/item/:id" component={ItemDetail} />
            <Route path="/admin" component={Admin} />
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
