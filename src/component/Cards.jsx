import React from 'react';
import Check from '../image/check.png';
import Star from '../image/star.png';
import '../styles/Cards.css';


 const Cards = (props) => {

     return(
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
            <div className="rate">
              <img src={Check} alt="check" />&nbsp;18 Project &nbsp;&nbsp;
              <img src={Star} alt="check" />&nbsp;89% Success Rate 
            </div>
            <div className="skill">
            <b>Skill:</b> <br/>{props.skill}
            </div>
          </div>
        </div>
      </div>
     )
 } 

export default Cards