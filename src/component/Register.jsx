import React, { Component } from 'react';
import { Grid, TextField, Button } from '@material-ui/core/';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import logo from '../image/Arkademy-Putih.svg';
import hiring from '../image/vector-hiring.png';
import '../styles/Register.css';

class Register extends Component {
  constructor(){
    super();

    this.state = {
      username: '',
      password: '',
      role:''
    }

    this.username = this.username.bind(this);
    this.password = this.password.bind(this);
    this.role = this.role.bind(this);
  }

    username = (e) => {
      console.log("value ",e.target.value)
      this.setState({username: e.target.value})
    }
    password = (e) => {
      console.log("value ",e.target.value)
      this.setState({password: e.target.value})
    }
    role = (e) => {
      console.log("value ",e.target.value)
      this.setState({role: e.target.value})
    }

    handleRegister = (e) => {
      e.preventDefault();

      const data = {
        username: this.state.username,
        password: this.state.password,
        role: this.state.role
      }
      const url = 'http://localhost:5000/v1/user/register'
      axios.post(url, data)
      .then( res => {
        console.log("res axios ", res.data)
        // this.setState({
        //   message: res.data.message
          const success = res.data.success
          
          if (success === true) {
            Swal.fire({title: 'Success.',
            text: 'Your account has been created.',
            icon: 'success'})
          } else if (success === true) {
            Swal.fire({title: 'Failed.',
            text: 'This account already exist.',
            icon: 'warning'})
          }
        // })
      })
      .catch(err => {
       
        this.setState({
          err: err,
          message: 'Register failed.'
        })
      })
    }

    
    render() {
      return (
        <Grid container sm ={12}>
          <Grid item sm ={7}>
            <div className="left-side">
              <img src={logo} className="logo-white" alt="logo"></img>
              <img src={hiring} className="logo-hiring" alt="hiring"></img>
              <div className="wrap-caption">
                <h2><b>Hire expert freelancers for any jobs, online</b></h2>
                <p>Millions of small businesses use Frelancer to turn their ideas into reality.</p>
              </div>
            </div>
          </Grid>
          <Grid item sm ={5}>
            <h1>Register</h1>
            <form method="post" type="submit">
              <div className="login-group">
                <div className="field-username">
                  <label>Username</label>
                  <TextField 
                  fullWidth 
                  id="username" 
                  label="Register your username.." 
                  onChange={this.username}/>
                </div>
                <div className="field-password">
                  <label>Password</label>
                  <TextField 
                  fullWidth
                  type="password"
                  id="password" 
                  label="Enter your password.." 
                  onChange={this.password}/>
                </div>
                <div className="field-role">
                  <label>Role User</label>
                  <TextField 
                  fullWidth 
                  id="role" 
                  label="company / engineer" 
                  onChange={this.role}/>
                </div>
                <div className="button-login">
                  <Button 
                  variant="contained" 
                  color="primary"
                  onClick={this.handleRegister}>
                    Register
                  </Button>
                </div>
                  <Link to='/login' className="have-account">Have an account? Login</Link>
              </div>
            </form>
          </Grid>
        </Grid>
      )
    }
  }

export default Register
