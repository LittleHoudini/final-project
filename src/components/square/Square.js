/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/

 import React, { Component } from 'react';
 import Styles from './square.module.css';
 import {Link} from 'react-router-dom';
 /*****************************************
  * * CREATE REACT FUNCTION COMPONENT
  *****************************************/

 //Squares in the home page
 export default class Square extends Component {
   render(){
    //  renders image and text as data
    const {title,image,text,path} = this.props.data;
   return (
    <div className={Styles.container3}>
        <img className={Styles.img} src={image} alt="Original Burger"/>
        <Link to={path} as={Link}>
          <button className={Styles.btn}>{title}<br></br>{text}</button>
        </Link>
        {/* <Nav.Link as={Link} to={"/userprofile"}>user profile page</Nav.Link> */}
    </div>
   );
 }
 
}
 