/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/

 import React, { Component } from 'react';
 import Styles from './square.module.css';
 /*****************************************
  * * CREATE REACT FUNCTION COMPONENT
  *****************************************/

 //Squares in the home page
 export default class Square extends Component {
   render(){
    //  renders image and text as data
    const {title,image,text} = this.props.data;
   return (
    <div className={Styles.container2}>
        <img className={Styles.img} src={image} alt="Original Burger"/>
        <button className={Styles.btn}>{title}<br></br>{text}</button>
    </div>
   );
 }
 
}
 