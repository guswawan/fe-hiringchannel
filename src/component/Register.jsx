import React, { Component} from 'react';
import { Grid, TextField, Button } from '@material-ui/core/';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../image/Arkademy-Putih.svg';
import hiring from '../image/vector-hiring.png';
import '../styles/Register.css';

class Register extends Component {

  getFetch = (data) => {
      const url = 'http://localhost:5000/v1/user/register'
      axios.post(url, data)
      .then( res => {
        console.log("res axios ", res)

      })
      .catch(err => {
        console.log(err)
        this.setState({
          err: err,
          message: 'Register failed.'
        })
      })
    }

    continue = (e, datares) => {
      e.preventDefault();
      const insertId = datares
      console.log("INSERTID ",insertId)
      console.log(this.props)

      const data = {
          username: this.props.values.username,
          password: this.props.values.password,
          role: this.props.values.role,
      }
      // const { values: { username, password, role   } } = this.props;

      this.getFetch(data)
      this.props.nextStep()
    }
    
    render() {
      const { values, handleChange } = this.props;
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
                  //onChange={this.username}
                  onChange={handleChange('username')}
                  defaultValue={values.username}/>
                </div>
                <div className="field-password">
                  <label>Password</label>
                  <TextField 
                  fullWidth
                  type="password"
                  id="password" 
                  label="Enter your password.." 
                  //onChange={this.password}
                  onChange={handleChange('password')}
                  defaultValue={values.password}/>
                </div>
                <div className="field-role">
                  <label>Role User</label>
                  <TextField 
                  fullWidth 
                  id="role" 
                  label="company / engineer" 
                  //onChange={this.role}
                  onChange={handleChange('role')}
                  defaultValue={values.role}/>
                </div>
                <div className="button-login">
                  <Button 
                  variant="contained" 
                  color="primary"
                  //onClick={this.handleRegister}
                  onClick={this.continue}
                  >
                    Continue
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
