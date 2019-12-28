import React, { Component, Fragment } from 'react';
import { Grid } from '@material-ui/core/';
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
import '../styles/CardList.css';

import '../styles/Home.css';

class Home extends Component {
    constructor(props) {
      super(props)
      this.state = {
          data: [],
          search: '',
          token: localStorage.getItem('token'),
          page: 1,
          limit: 5,
          // totalPage: this.Math.ceil(countdata/limit),
          sortBy: 'name',
          order: 'asc'
      }
     
  }
 

  sortAscending = () => {
    const { data } = this.state;
    console.log("DATA ",data)
    data.sort((a, b) => a - b)
    this.setState({ data })
  }

  sortDescending = () => {
    const { data } = this.state;
    data.sort((a, b) => a-b).reverse()
    this.setState({ data })
  }

  handleSearch = (e) => {
    console.log("VALUES ", e.target.value)
    this.setState({search: e.target.value})
  }

  setData = ( limit, page ) => {
    this.getFetch(`http://localhost:5000/v1/engineer?limit=${this.state.limit}&page=${this.state.page}`)
  }

  handlePageNext = (e) => {
    let page = this.state.page
    this.setState({page: page + 1})
    console.log("PAGE ", this.state.page)
  }

  handlePagePrevious = (e) => {
    let page = this.state.page;
    if(page > 1){
      this.setState({
        page: page-1
      })
    } else {
      this.setState({
        page:1
      })
    }
    console.log("PAGE ",this.state.page)
  }

  nextPage = async (e) => {
    const next = await this.handlePageNext(e);
    this.setData(this.state.limit, this.state.page)
  }

  previousPage = async (e) => {
    const previous = await this.handlePagePrevious(e);
    this.setData(this.state.limit, this.state.page)
  }

  page = (e) => {
    if(e === 'prev'){
      this.setState({page: e - 1})
    } else if(e === 'next'){
      this.setState({page:e + 1})
    }
    this.setData( this.state.limit, this.state.page )
  }

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
              console.log("res axios ke-2 ", res.data.data)
              this.setState({
                  data:res.data.data
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

  

  componentDidMount(){
    this.getFetch(`http://localhost:5000/v1/engineer?limit=${this.state.limit}&page=${this.state.page}`)
  }



    render() {
      
      if (!this.state.token) {
        this.props.history.push('/login');
      }


      let filtered = this.state.data.filter(
        (data) => {
          return data.name_engineer.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
        }
      )

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
                  <TypoGraphy variant="inherit" gutterbottom="true">
                    <h4>Home</h4>
                  </TypoGraphy>
                  <TypoGraphy className="user-detail" variant="inherit" gutterbottom="true">
                      <Avatar>U</Avatar>
                      <h4>User</h4>
                  </TypoGraphy>
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
          <Grid>
          <div>
              <Button onClick={this.sortAscending}>ASC</Button>
              <Button onClick={this.sortDescending}>DSC</Button>
            </div>
            
          </Grid>
          
          <Grid className="map">
            
            {
                filtered && filtered.map(data => {
                    return <Cards key={data.id} name={data.name_engineer}
                    desc={data.description} skill={data.skill}/>
                })
            }
            
            </Grid>
         
  
            <div className="button-page">
            <ButtonGroup 
              variant="text" 
     
              aria-label="contained primary button group">
              <Button 
                name="prev"
                onClick={this.previousPage}
                >Prev</Button>
              <Button>{this.state.page}</Button>
              <Button 
              name="next"
              onClick={this.nextPage}>Next</Button>
            </ButtonGroup>
          </div>

          
        </Fragment>
      )
    }
}


export default Home