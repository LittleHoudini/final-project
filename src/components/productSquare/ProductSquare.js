/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/

 import React from 'react';
 import styles from './productSquare.module.css';
 /*****************************************
  * * CREATE REACT FUNCTION COMPONENT
  *****************************************/

 function ProductSquare(props) {
    const {title,image,text} = props.data;
   return (
    <div className={styles.container}>
        <img className='menu-cover-image' src={image} alt="Original Burger"/>
        <button className={styles.btn}>{title}<br></br>{text}</button>
    </div>
   );
 }
 
 export default ProductSquare;
 