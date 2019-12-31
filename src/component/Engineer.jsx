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
import Cards from './Cards';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import '../styles/Engineer.css';
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
          search: '',
          token: localStorage.getItem('token'),
          page: 1,
          limit: 5,
          sortBy: 'name',
          order: 'asc',
      }     
    }
 

    setData = () => {
      this.getFetch(`http://localhost:5000/v1/engineer?limit=${this.state.limit}&page=${this.state.page}`)
    }

    // sortAscending = () => {
    //   const { data } = this.state;
    //   console.log("DATA ",data)
    //   data.sort((a, b) => a - b)
    //   this.setState({ data })
    // }

    // sortDescending = () => {
    //   const { data } = this.state;
    //   data.sort((a, b) => a-b).reverse()
    //   this.setState({ data })
    // }

    handleSearch = (e) => {
      console.log("VALUES ", e.target.value)
      this.setState({search: e.target.value})
    }

    // handlePageNext = (e) => {
    //   let page = this.state.page
    //   this.setState({page: page + 1})
    //   console.log("PAGE ", this.state.page)
    // }

    // handlePagePrevious = (e) => {
    //   let page = this.state.page;
    //   if(page > 1){
    //     this.setState({
    //       page: page-1
    //     })
    //   } else {
    //     this.setState({
    //       page:1
    //     })
    //   }
    //   console.log("PAGE ",this.state.page)
    // }

    // nextPage = async (e) => {
    //   await this.handlePageNext(e);
    //   this.setData(this.state.limit, this.state.page)
    // }

    // previousPage = async (e) => {
    //   await this.handlePagePrevious(e);
    //   this.setData(this.state.limit, this.state.page)
    // }

    handleSignout = (e) => {
      this.setState({ token: '' });
      localStorage.clear();
    }

    getFetch = (url) =>{
        const auth = getAuth();
        console.log("Get Aouth ",auth)
        console.log("Get Aouth Role",auth.role)
        const authRole = auth.role
        if (authRole === 'company') {
            axios.get(url, { headers: { Authorization: `Bearer ${auth.token}`}})
            .then(res => {
                console.log("res axios ",res.data)
                this.setState({
                    data: res.data.result 
                })
            })
        } else if (authRole === 'engineer') {
            axios.get('http://localhost:5000/v1/engineer/profile', { headers: { Authorization: `Bearer ${auth.token}`}})
            .then(res => {
              console.log("res axios ke-2 B ", res.data.data)  
              console.log("res axios ke-2 ", res.data.data[0])
                this.setState({
                    data:res.data.data,
                    id: res.data.data[0].id,
                    name_engineer: res.data.data[0].name_engineer,
                    description: res.data.data[0].description,
                    location: res.data.data[0].location,
                    birth: res.data.data[0].birth.slice(0,10)
                })
            })
            .catch(err => {
                console.log(err)
                this.setState({
                  data: 'Not Found.'
                })
            })
        }
    }

    handlePatch = () => {
      const auth = getAuth();
      const username = auth.username;
      const token = auth.token;
      const url = `http://localhost:5000/v1/engineer/${this.state.id}`
      console.log("ID ",this.state.id)
      const data = {
        name_engineer: this.state.name_engineer,
        description: this.state.description,
        location: this.state.location,
        birth: this.state.birth
      }
      const headers = { Authorization: `Bearer ${token}`};

      axios.patch(url, null, {
        headers: headers,
        params: data 
      })
      .then(res => {
        Swal.fire({
          icon: 'success',
          title:'Success',
          text:'Profile Updated.'
        })
        this.getFetch('http://localhost:5000/v1/engineer')
      })
      .catch(err => {
        Swal.fire ({
          icon: 'error',
          title: 'error',
          text: 'Update Failed.'
        })
      })
    }

    handlePostSkill = () => {
      
    }

    componentDidMount(){
      this.getFetch(`http://localhost:5000/v1/engineer?limit=${this.state.limit}&page=${this.state.page}`)
    }


    render() {
      
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
                    onChange={this.handleSearch.bind()}
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </div>
                <div className="home">
                
                  <Button className="btn-home">Home</Button>
            
                  <Button className="user-detail">
                      <Avatar>U</Avatar>
                      <h4>User</h4>
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
                    return <Cards key={data.id} name={data.name_engineer}
                    desc={data.description} skill={data.skill}/>
                })
            }

            <div className="wrap-form">
              <div className="group-form-editprofile">
                <h2>Edit profile</h2>
                <p>Companies on Hiring Channel will get to know you with the info below</p>
                {/* {
                this.state.data.map(data => {
                  return <jjj />

                })
                } */}
                <div className="form-editprofile">
                  <TextField
                  label="Full Name"
                  id="outlined-size-small"
                  value={this.state.name_engineer}
                  onChange={ e => {this.setState({name_engineer:e.target.value})
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
                  <TextField
                  id="outlined-size-small"
                  type="date"
                  size="small"
                  variant="outlined"
                  label="Date of birth"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={this.state.birth}
                  onChange={ e => {this.setState({birth:e.target.value})
                  console.log(e.target.value)}}
                  />
                  <br/>
               
                </div>
                <div className="btn-editprofile">
                  <ButtonGroup>
                    <Button 
                    variant="text" 
                    color="secondary"
                    //onClick={this.handleRegister}
                    // onClick={this.continue}
                    >
                      Cancel&nbsp;
                    </Button>
                    
                    <Button 
                    variant="contained" 
                    color="inherit"
                    onClick={e => this.handlePatch(e)}
                    // onClick={this.continue}
                    >
                      Done
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
              {/* skill */}
              {/* <div className="group-form-editprofile">
                <h2>Your Skill</h2>
                <p>Upgrade more your skill on Hiring Channel, insert below</p>
                <div className="form-editprofile">
                  <TextField
                  label="Insert your skill"
                  id="outlined-size-small"
                  defaultValue={this.state.skill}
                  onChange={ e => {this.setState({skill:e.target.value})
                  console.log(e.target.value)}}
                  variant="outlined"
                  size="small"
                  />
                  <br/>
                </div>
                <div className="btn-editprofile">
                  <ButtonGroup>
                    <Button 
                    variant="contained" 
                    color="inherit"
                    //onClick={this.handleRegister}
                    // onClick={this.continue}
                    >
                      Done
                    </Button>
                  </ButtonGroup>
                </div>
              </div> */}
            </div>
          </Grid>
        </Fragment>
      )
    }
}


export default Engineer