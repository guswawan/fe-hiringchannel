import React, { Component, Fragment } from 'react';
import { Grid } from '@material-ui/core/';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import logo from '../image/Arkademy-Putih.svg';
import hiring from '../image/vector-hiring.png';
import { List, ListItem } from 'material-ui/List';
import '../styles/Register.css';


class Confirm extends Component {

    getFetch = ({ values: { username, password, role, name_engineer, description, location, birth   } }) => {
      const url = 'http://localhost:5000/v1/engineer'
      axios.post(url, { values: { username, password, role, name_engineer, description, location, birth   } })
      .then( res => {
        console.log("res axios ", res.data)
        // this.setState({
        //   message: res.data.message
          const success = res.data.success
          
          if (success === true) {
            Swal.fire({title: 'Success.',
            text: 'Your account has been created.',
            icon: 'success'})
          } else if (success === false) {
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


    // handleRegister = (e) => {
    //   e.preventDefault();

    //   const data = {
    //     username: this.state.username,
    //     password: this.state.password,
    //     role: this.state.role
    //   }
    //   this.getFetch(data)
    // }


    continue = e => {
      e.preventDefault();
      // PROCESS FORM ATAU SEND DATA TO API (AXIOS HERE)
      const { values: { username, password, role, name_engineer, description, location, birth   } } = this.props;

      this.getFetch({ values: { username, password, role, name_engineer, description, location, birth   } })
      this.props.nextStep()
    }

    back = e => {
      e.preventDefault();
      this.props.prevStep()
    }
      
    render() {
      const { values: { username, password, role, name_engineer, description, location, birth   } } = this.props;
      return (
        <MuiThemeProvider>
                <Fragment>
                  <AppBar title="Confirm User Data" />
                  <List>
                    <ListItem
                      primaryText="Username"
                      secondaryText={ username }
                    />
                     <ListItem
                      primaryText="Password"
                      secondaryText={ password }
                    />
                     <ListItem
                      primaryText="Role user"
                      secondaryText={ role }
                    />
                     <ListItem
                      primaryText="Name"
                      secondaryText={ name_engineer }
                    />
                     <ListItem
                      primaryText="Description"
                      secondaryText={ description }
                    />
                     <ListItem
                      primaryText="Location"
                      secondaryText={ location }
                    />
                     <ListItem
                      primaryText="Date of Birth"
                      secondaryText={ birth }
                    />
                  </List>
                  <br/>
                  <RaisedButton
                    label="Confirm & Submit"
                    primary={true}
                    style={styles.button}
                    onClick={this.continue}
                  />
                  <RaisedButton
                    label="Back"
                    primary={false}
                    style={styles.button}
                    onClick={this.back}
                  />



                </Fragment>
            </MuiThemeProvider>
          
      )
    }
}

  const styles = {
    button: {
      margin: 15
    }
  }

export default Confirm
