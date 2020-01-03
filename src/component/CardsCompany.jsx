import React from 'react';
// import Check from '../image/check.png';
// import Star from '../image/star.png';
// import { Link } from 'react-router-dom';
import '../styles/Cards.css';


 const CardsCompany = (props) => {

     return(
      // <Link 
      // to={{
      //   pathname: "/home/detail-engineer/",
      //   state: {data: props.goDetail} 
      // }} 
      // className="link-to-detail">
      <div className="card">
        <div className="card-media">
          <div className="card-content">
          <div className="card-black"></div>
            <div className="name">
            {props.name}
            </div>
            <div className="desc">
            {props.desc}
            </div>
            {/* <div className="rate">
              <img src={Check} alt="check" />&nbsp;18 Project &nbsp;&nbsp;
              <img src={Star} alt="check" />&nbsp;89% Success Rate 
            </div> */}
            <div className="skill">
            <b>Location:</b> <br/>{props.location}
            </div>
          </div>
        </div>
      </div>
      // </Link>
     )
 } 

export default CardsCompany
