import React, { Component, Fragment } from 'react';
import Home from './component/Home';
import SignIn from './component/SignIn';
import UserForm from './component/UserForm';
import Engineer from './component/Engineer';
import Company from './component/Company';
import HomeDetail from './component/HomeDetail';
import { BrowserRouter as Router, Route ,Link } from 'react-router-dom';
import './App.css';


class App extends Component {
  state = {
    showComponent: true
  }
  render() {
    return (
      <Router>
        <Fragment> 
          <div>
            <Link to="/register"></Link>
          </div>
          <Route path='/' exact component ={SignIn} />
          <Route path='/home' exact component ={Home} />
          <Route path='/login' exact component ={SignIn} />
          <Route path='/register' exact component ={UserForm} />
          <Route path='/home/engineer' exact component ={Engineer} />
          <Route path='/company' exact component ={Company} />
          <Route path='/home/detail-engineer' exact component ={HomeDetail} />
        </Fragment>
      </Router>
    )
  }
}

export default App;
