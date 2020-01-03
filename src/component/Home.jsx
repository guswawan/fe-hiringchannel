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
import SortIcon from '@material-ui/icons/Sort';

import '../styles/Home.css';

class Home extends Component {
    constructor(props) {
      super(props)
      this.state = {
          data: [],
          dataCompany:[],
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


    getCompanyProfile = () => {
      const auth = getAuth();
    
      axios.get('http://localhost:5000/v1/company/profile', { headers: { Authorization: `Bearer ${auth.token}`}})
      .then(res => {
          console.log("res axios pro company ", res.data.data[0])
          this.setState({
              dataCompany:res.data.data[0]
          })
      })
      .catch(err => {
          console.log(err)
          this.setState({
            dataCompany: 'Not Found.'
          })
      })
      this.props.history.push('/company')
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
      await this.handlePageNext(e);
      this.setData(this.state.limit, this.state.page)
    }

    previousPage = async (e) => {
      await this.handlePagePrevious(e);
      this.setData(this.state.limit, this.state.page)
    }

    handleSignout = (e) => {
      this.setState({ token: '' });
      localStorage.clear();
    }

    handleDetail = (id) => {
      console.log("GO DETAIL ", this.getCompanyProfile(`http://localhost:5000/v1/engineer/profile`))
      this.getCompanyProfile()
      this.props.history.push(`/home/detail-engineer/${id}`)
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
                console.log("res axios pro eng ", res.data.data)
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

    getProfileCompany = () => {
      const auth = getAuth();

      axios.get(`http:localhost:5000/v1/company/profile`, { headers: { Authorization: `Bearer ${auth.token}`}})
      .then(res => {
        console.log("RES ",res)
        this.setState({
          data: res.data.data
        })
      })
    }

    componentDidMount(){
      this.getFetch(`http://localhost:5000/v1/engineer?limit=${this.state.limit}&page=${this.state.page}`)
      // this.getCompanyProfile(`http://localhost:5000/v1/company/profile`)
    }

    render() {
      
      if (!this.state.token) {
        this.props.history.push('/login');
      }


      let filtered = this.state.data.filter(
        (data) => {
          return data.skill&&data.name_engineer.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
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
                
                  <Button className="btn-home">Home</Button>
            
                  <Button 
                  className="user-detail"
                  onClick={this.getCompanyProfile}>
                      <Avatar className="avatar">U</Avatar>
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
      
          <Grid className="sort">
            {/* <Button onClick={this.sortAscending}>ASC</Button> */}
            Sort <SortIcon onClick={this.sortDescending} />
            {/*<Button onClick={this.sortDescending}>Sort</Button>*/}
          </Grid>
          <Grid className="map-home">

            {
                filtered && filtered.map(data => {
                    return <Cards key={data.id} name={data.name_engineer}
                    desc={data.description} skill={data.skill} goDetail={data.id}/>
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