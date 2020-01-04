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
import UserIcon from '../image/default-user.png';
import logo from '../image/arkademy-logo.png';
import axios from 'axios';
import getAuth from '../helpers/auth';
import CardsCompany from './CardsCompany';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Swal from 'sweetalert2';

// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
import '../styles/Company.css';


class Company extends Component {
    constructor(props) {
      super(props)
      this.state = {
          data: [],
          project: [],
          id:'',
          name_engineer:'',
          description:'',
          location:'',
          birth:'',
          skill_item:'',
          search: '',
          name_company: '',
          name_project: '',
          status_project:'',
          status_engineer: '',
          token: localStorage.getItem('token'),
          page: 1,
          limit: 5,
          sortBy: 'name',
          order: 'asc',
      }     
    }
 
    getCompanyProfile = () => {
      const auth = getAuth();
    
      axios.get('http://localhost:5000/v1/company/profile', { headers: { Authorization: `Bearer ${auth.token}`}})
      .then(res => {
          console.log("res axios pro company ", res.data.data[0])
          this.setState({
              data:res.data.data,
              id:res.data.data[0].id,
              name_company: res.data.data[0].name_company,
              description: res.data.data[0].description,
              location: res.data.data[0].location
          })
      })
      .catch(err => {
          console.log(err)
          this.setState({
            data: 'Not Found.'
          })
      })
      this.props.history.push('/company')
    }

    handlePatch = () => {
      const auth = getAuth();
      const token = auth.token;
      const url = `http://localhost:5000/v1/company/${this.state.id}`
      console.log("ID ",this.state.id)
      const data = {
        // id: this.state.id,
        name_company: this.state.name_company,
        description: this.state.description,
        location: this.state.location,
      }
      const headers = { Authorization: `Bearer ${token}`};

      axios.patch(url, null, {
        headers: headers,
        params: data 
      })
      .then(res => {
        console.log(res)
        Swal.fire({
          icon: 'success',
          title:'Success',
          text:'Profile Updated.'
        })
        this.getCompanyProfile(`http://localhost:5000/v1/company/profile`)
      })
      .catch(err => {
        console.log(err)
        Swal.fire ({
          icon: 'error',
          title: 'error',
          text: 'Update Failed.'
        })
      })
    }

    handleSignout = (e) => {
      this.setState({ token: '' });
      localStorage.clear();
    }

    getHome = () => {
      this.props.history.push('/home')
    }

    // getProject = () => {
    //   const auth = getAuth();
    //   const url = `http://localhost:5000/v1/project`

    //   axios.get(url, { Authorization: `Bearer ${auth.token}`})
    //   .then(res => {
    //     this.setState({
    //       project: res.data.data,
    //       // id_project: res.data.data.id_project,
    //       // id_engineer: res.data.data.id_engineer,
    //       // id_company: res.data.data.id_company,
    //       // name_company: res.data.data[1].name_company,
    //       // name_project: res.data.data.name_project,
    //       // status_project: res.data.data.status_project,
    //       // status_engineer: res.data.data.status_engineer,

    //     })
    //     console.log("PROJECT ",this.state.project)
    //   })
    // }

    handleStatusProject = (index, status_project, status_engineer) => {
      console.log("AAAA ", this.state.id_project)
    }
    

    componentDidMount(){
      console.log("componentDidMount")
      // this.getProject(`http://localhost:5000/v1/project`)
      this.getCompanyProfile(`http://localhost:5000/v1/company/profile`)
    }


    render() {
      console.log(this.props)
      
      if (!this.state.token) {
        this.props.history.push('/login');
      }


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
                    onChange={this.handleSearch}
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </div>
                <div className="home">
                
                  <Button 
                  className="btn-home"
                  onClick={this.getHome}
                  >Home</Button>
            
                  <Button className="user-detail">
                  <Avatar className="avatar"><img src={UserIcon} className="avatar" alt="user"></img></Avatar>
                  <h4>{this.state.name_company}</h4>
                  </Button>
                  <TypoGraphy className="typo-wrap" variant="inherit" gutterbottom="true">
                      <hr width="1" size="40" />
                      <img src={chat} className="chat" alt="chat"></img>
                      <img src={bell} className="notif" alt="bell notif"></img>
                  </TypoGraphy>
                  <Button onClick={this.handleSignout.bind()}
                  >Logout</Button>
                </div>
              </div>
            </Toolbar>
          </AppBar>

          {/* <CardList /> */}
      
          <Grid className="map">

            {
                this.state.data.map(data => {
                    return <CardsCompany key={data.id} name={data.name_company}
                    desc={data.description} location={data.location}/>
                })
            }

            <div className="wrap-form">
              <div className="group-form-editprofile">
                <h2>Edit profile Company</h2>
                <p>Engineer on Hiring Channel will get to know you with the info below</p>
                <div className="form-editprofile">
                  <TextField
                  label="Full Name"
                  id="outlined-size-small"
                  value={this.state.name_company}
                  onChange={ e => {this.setState({name_company:e.target.value})
                  console.log(this.state.name_engineer)}}
                  variant="outlined"
                  size="small"
                  />
                  <br/>
                  <TextField
                    label="Description"
                    id="outlined-size-small"
                    value={this.state.description}
                    onChange={ e => {this.setState({description:e.target.value})
                  console.log(e.target.value)}}
                    variant="outlined"
                    size="small"
                  />
                  <br/>
                  <TextField
                  label="Location"
                  id="outlined-size-small"
                  value={this.state.location}
                  onChange={ e => {this.setState({location:e.target.value})
                  console.log(e.target.value)}}
                  variant="outlined"
                  size="small"
                  />
                  <br/>
                </div>
                <div className="btn-editprofile">
                  <ButtonGroup>
                    <Button 
                    variant="text" 
                    color="secondary"
                    >
                      Cancel&nbsp;
                    </Button>
                    
                    <Button 
                    variant="contained" 
                    color="inherit"
                    onClick={e => this.handlePatch(e)}
                    >
                      Done
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
            </div>

          </Grid>
          {/* <Grid className="map-table">
            <div className="table-title">
              <h1><b>Job list table.</b></h1>
              <hr />
            </div>
            <br/>
            <div className="wrap-table">
              <TableContainer component={Paper}>
                <Table className="{classes.table}" aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <TableCell className="table-head-side-left">Company</TableCell>
                      <TableCell className="table-head" align="left">Project Name</TableCell>
                      <TableCell className="table-head" align="center">Status Project</TableCell>
                      <TableCell className="table-head-side-right" align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.project.map(project => (
                      <TableRow key={project.id_project}>
                        <TableCell component="th" scope="row">
                          {project.name_company}
                        </TableCell>
                        <TableCell align="left">{project.name_project}</TableCell>
                        <TableCell align="center">{project.status_project}</TableCell>
                        <TableCell align="center">
                          <Button color="secondary">x</Button>
                          <Button color="inherit" onClick={this.handleStatusProject}>v</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Grid> */}
          
          {/* <Grid className="map-form">
            
          </Grid> */}
        </Fragment>
      )
    }
}


export default Company