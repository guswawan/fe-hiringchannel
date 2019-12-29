import React, { Component } from 'react'
import Register from './Register'
import DetailEngineer from './DetailEngineer'
import Confirm from './Confirm'


export class UserForm extends Component {
    state = {
        username:'',
        password:'',
        role:'',
        step:1,
        name_engineer:'',
        description:'',
        location:'',
        birth:''
    }

    //next step
    nextStep = () => {
        const { step } = this.state
        this.setState({
          step: step + 1
        })
      }
  
    prevStep = () => {
    const { step } = this.state
    this.setState({
        step: step - 1
    })
    }

    //handle field change bio 
    handleChange = input => e => {
    this.setState({
        [input]: e.target.value
    })
    }

    render() {
        const { step } = this.state;
        const { username, password, role, name_engineer, description, location, birth } = this.state;
        const values = { username, password, role, name_engineer, description, location, birth }

        switch(step) {
            case 1:
                return(
                    <Register
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        values={values}
                    />
                )
            case 2:
                return(
                    <DetailEngineer
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        values={values}
                    />
                )
            case 3:
                return(
                    <Confirm
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        values={values}
                    />
                )
        }

    }
}

export default UserForm
