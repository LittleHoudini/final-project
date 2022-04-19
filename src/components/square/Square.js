/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/

 import React from 'react';
 import './square.css'
 /*****************************************
  * * CREATE REACT FUNCTION COMPONENT
  *****************************************/

 // pascal case
 function Square(props) {
    const {title,image,text} = props.data;
   return (
    <div className='container'>
        <img className='menu-cover-image' src={image} alt="Original Burger"/>
        <button className='btn'>{title}<br></br>{text}</button>
    </div>
   );
 }
 
 export default Square;
 