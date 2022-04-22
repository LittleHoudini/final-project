/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/

 import React from 'react';
 import Styles from './square.module.css';
 /*****************************************
  * * CREATE REACT FUNCTION COMPONENT
  *****************************************/

 function Square(props) {
    const {title,image,text} = props.data;
   return (
    <div className={Styles.container2}>
        <img className={Styles.img} src={image} alt="Original Burger"/>
        <button className={Styles.btn}>{title}<br></br>{text}</button>
    </div>
   );
 }
 
 export default Square;
 