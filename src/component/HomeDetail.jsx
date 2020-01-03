import React, { Component, Fragment } from 'react';
import { Grid } from '@material-ui/core/';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import TypoGraphy from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import chat from '../image/chat.png';
import bell from '../image/bell.png';
import logo from '../image/arkademy-logo.png';
import axios from 'axios';
import getAuth from '../helpers/auth';
// import Cards from './Cards';
import ButtonGroup from '@material-ui/core/ButtonGroup';

// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
import '../styles/HomeDetail.css';
import Swal from 'sweetalert2';


class Engineer extends Component {
    constructor(props) {
      super(props)
      this.state = {
          data: [],
          id:'',
          name_engineer:'',
          description:'',
          location:'',
          birth:'',
          skill:'',
          name_project:'',
          id_engineer: '',
          name_company:'',
          search: '',
          token: localStorage.getItem('token'),
          page: 1,
          limit: 5,
          sortBy: 'name',
          order: 'asc',
      }     
    }
 


    handleSignout = (e) => {
      this.setState({ token: '' });
      localStorage.clear();
    }

    

    handleHire = () => {
      const auth = getAuth();
      const token = auth.token;
      const url = `http://localhost:5000/v1/project`
      const data = {
        name_project: this.state.name_project,
        id_engineer: this.props.location.state.data
      }
      console.log("DATA ", data)
      const headers = { Authorization: `Bearer ${token}`};

      axios.post(url, null, {
        headers: headers,
        data: data 
      })
      .then(res => {
        Swal.fire({
          icon: 'success',
          title:'Success',
          text:'Success.'
        })
        this.getFetch('http://localhost:5000/v1/engineer')
      })
      .catch(err => {
        Swal.fire ({
          icon: 'error',
          title: 'error',
          text: 'Failed.'
        })
      })
    }

    handleHome = () => {
      this.props.history.push('/home')
    }

    componentDidMount(){
      console.log("DID MOUNT")
      // this.getFetch(`http://localhost:5000/v1/engineer?limit=${this.state.limit}&page=${this.state.page}`)
    }


    render() {
      console.log("ID ENG ",this.props.location.state.data)
      
      if (!this.state.token) {
        this.props.history.push('/login');
      }


      //Filter (search)
      // let filtered = this.state.data.filter(
      //   (data) => {
      //     return data.skill&&data.name_engineer.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
      //   }
      // )

      return (
        <Fragment>
          <AppBar position="fixed" color="inherit">
            <Toolbar>
              <div className="nav-group">
                <img src={logo} className="logo" alt="logo" />
                <div className="search">
                  <SearchIcon />
                  <InputBase
                    type="text"
                    placeholder="Search…"
                    value={this.state.search}
                    onChange="{this.handleSearch.bind()}"
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </div>
                <div className="home">
                
                  <Button className="btn-home" onClick={this.handleHome}>Home</Button>
            
                  <Button className="user-detail">
                  <Avatar className="avatar">U</Avatar>
                      <h4>User</h4>
                  </Button>
                  <TypoGraphy className="typo-wrap" variant="inherit" gutterbottom="true">
                      <hr width="1" size="40" />
                      <img src={chat} className="chat" alt="chat"></img>
                      <img src={bell} className="notif" alt="bell notif"></img>
                  </TypoGraphy>
                  <Button onClick={this.handleSignout}
                  >Logout</Button>
                </div>
              </div>
            </Toolbar>
          </AppBar>

          {/* <CardList /> */}
      
          <Grid className="map">

            {/* {
                filtered && filtered.map(data => {
                    return <Cards key={data.id} name={data.name_engineer}
                    desc={data.description} skill={data.skill}/>
                })
            } */}

          </Grid>
          <Grid className="map-hire">
            <div className="hire-title">
              <h1><b>Hire.</b></h1>
              <hr />
            </div>
            <br/>
          </Grid>
          
          <Grid className="map-form">
              <div className="group-form-job">
                {/* <h2>Your Skill</h2>
                <p>Upgrade more your skill on Hiring Channel, insert below</p> */}
                <div className="form-job">
                  <TextField
                  label="Insert the project"
                  id="outlined-size-small"
                  defaultValue={this.state.name_project}
                  onChange={ e => {this.setState({name_project:e.target.value})
                  console.log(e.target.value)}}
                  variant="outlined"
                  size="default"
                  multiline
                  rows="4"
                  col="4"
                  />
                  <br/>
                </div>
                <div className="btn-editprofile">
                  <ButtonGroup>
                    <Button 
                    variant="contained" 
                    color="inherit"
                    onClick={this.handleHire}
                    // onClick={this.continue}
                    >
                      Hire
                    </Button>
                  </ButtonGroup>
                </div>
              </div> 
          </Grid>
        </Fragment>
      )
    }
}


export default Engineer