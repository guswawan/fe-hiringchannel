import React, { Component, Fragment } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
// import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Grid, TextField ,Button } from '@material-ui/core/';
import { Link } from 'react-router-dom';
import logo from '../image/Arkademy-Putih.svg';
import hiring from '../image/vector-hiring.png';
import '../styles/Register.css';



export class DetailEngineer extends Component {

	getFetch = (personalData) => {
      const url = 'http://localhost:5000/v1/engineer'
      axios.post(url, personalData)
      .then( res => {
        console.log("res axios ", res)
        // this.setState({
        //   message: res.data.message
          const success = res.data.msg
          
          if (success === 'success') {
            Swal.fire({title: 'Success.',
            text: 'Your account has been created.',
            icon: 'success'})
          } else if (success === 'failed') {
            Swal.fire({title: 'Failed.',
            text: 'This account already exist.',
            icon: 'warning'})
          }
        // })
      })
      .catch(err => {
        console.log(err)
        this.setState({
          err: err,
          message: 'Register failed.'
        })
      })
    }

     continue = e => {
      e.preventDefault();
      // PROCESS FORM ATAU SEND DATA TO API (AXIOS HERE)

      const personalData = {
          name_engineer: this.props.values.name_engineer,
          description: this.props.values.description,
          location: this.props.values.location,
          birth:this.props.values.birth
      }
      // const { values: { name_engineer, description, location, birth   } } = this.props;

      this.getFetch(personalData)
      //this.props.nextStep()
    }
	

	back = e => {
		e.preventDefault();
		this.props.prevStep()
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
            <h1>Complete your detail</h1>
            <form method="post" type="submit">
              <div className="login-group">
                <div className="field-username">
                  <label>Full Name</label>
                  <TextField 
                  fullWidth 
                  id="fullname" 
                  label="Enter your name.." 
                  onChange={handleChange('name_engineer')}
                	defaultValue={values.name_engineer}	/>
                </div>
                <div className="field-password">
                  <label>Expertise</label>
                  <TextField 
                  fullWidth
                  id="description" 
                  label="Enter your occupation.." 
                  onChange={handleChange('description')}
                	defaultValue={values.description}/>
                </div>
                <div className="field-role">
                  <label>Location</label>
                  <TextField 
                  fullWidth 
                  id="role" 
                  label="Enter your city.." 
                  onChange={handleChange('location')}
                	defaultValue={values.location}/>
                </div>
                <TextField
                		id="date"
                		type="date"
                		label="Date of birth"
       					//floatingLabelText="Date of birth"
       					className="birth"
       					InputLabelProps={{
				          shrink: true,
				        }}
                		onChange={handleChange('birth')}
                		defaultValue={values.birth}	
                	/>
                <div className="button-login">
                  <Button 
                  variant="contained" 
                  color="primary"
                  //onClick={this.handleRegister}
                  onClick={this.continue}>
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



export default DetailEngineer
