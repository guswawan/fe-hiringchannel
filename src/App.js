import React, { Component, Fragment } from 'react';
import Home from './component/Home';
import SignIn from './component/SignIn';
import UserForm from './component/UserForm';
import Engineer from './component/Engineer';
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
        </Fragment>
      </Router>
    )
  }
}

export default App;
