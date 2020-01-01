import React, { Component } from 'react';
import { Grid, TextField, Button } from '@material-ui/core/'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import logo from '../image/Arkademy-Putih.svg';
import hiring from '../image/vector-hiring.png';
import '../styles/SignIn.css';



class SignIn extends Component {

    constructor(){
      super()
      this.state = {
        username: null,
        password: null,
        role: null,
        token: null,
        id_user: null,
        message:''
      }
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


    handleLogin(e){
      e.preventDefault()
      const url = 'http://localhost:5000/v1/user/login'
      const data = {
        username: this.state.username,
        password: this.state.password,
        role: this.state.engineer,
      }
      axios.post(url, data)
      .then(res => {

        const success = res.data.success
        console.log("Success ", res.data)
        if (success === true) {
          Swal.fire({title: 'Login Success.',
          // text: 'Your account has been created.',
          icon: 'success'})
        } else if (success === false) {
          Swal.fire({title: 'Login Failed.',
          // text: 'This account already exist.',
          icon: 'warning'})
        }
        
        this.setState({
          username: res.data.data.username,
          role: res.data.data.role,
          token: res.data.token,
          id_user: res.data.data.id_user,
          message: res.data.data.message
        })
        console.log("token ", res.data.token)
        localStorage.setItem('token', this.state.token)
        localStorage.setItem('id_user', this.state.id_user)
        localStorage.setItem('username', this.state.username)
        localStorage.setItem('role', this.state.role)
        console.log("localStorage ",res.data)
        if(this.state.role === 'company'){
          this.props.history.push("/home")
        } else if(this.state.role === 'engineer'){
          this.props.history.push("/home/engineer")
        }
      })
      .catch(err => {
        console.log(err)
        this.setState({
          message: 'Login failed.'
        })
      })
    }


    render() {
      return (
        <Grid container>
          <Grid item sm={7}>
            <div className="left-side">
              <img src={logo} className="logo-white" alt="logo"></img>
              <img src={hiring} className="logo-hiring" alt="hiring"></img>
              <div className="wrap-caption">
                <h2><b>Hire expert freelancers for any jobs, online</b></h2>
                <p>Millions of small businesses use Frelancer to turn their ideas into reality.</p>
              </div>
            </div>
          </Grid>

          <Grid item sm={5}>
            <h1>Login</h1>
            <form>
            <div className="login-group">
              <div className="field-username">
                <label>Username</label>
                <TextField fullWidth id="username" label="Enter your username.."
                onChange={this.username} />
              </div>
              <div className="field-password">
                <label>Password</label>
                <TextField fullWidth type="password" id="password" label="Enter your password.." 
                onChange={this.password}/>
              </div>
              <Link to='/login' className="forgot-password">Forgot Password?</Link>
              <div className="button-login">
                  <Button variant="contained" color="primary"
                  onClick={(e) => this.handleLogin(e)}
                  >
                    Login
                  </Button>
              </div>
              {/* <div className="button-register"> */}
                <Link to="/register" className="button-register">
                  <Button variant="contained" >
                    Register
                  </Button>
                </Link>
              {/* </div> */}
            </div>
            </form>
          </Grid>
        </Grid>
      )
    }
  }

export default SignIn
