/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/

 import React from 'react';
 import styles from './productSquare.module.css';
 
 
 /*****************************************
  * * CREATE REACT FUNCTION COMPONENT
  *****************************************/

 function ProductSquare(props) {
    const {title,image,text,price} = props.data;
   return (
    <div className={styles.container}>
      <img className='menu-cover-image' src={image} alt="Original Burger"/>
      <h2 className={styles.h2}>{title}</h2>
      <figure className={styles.figure}>{price}</figure>
      <figure className={styles.figure}>{text}</figure>
      
      <button className={styles.btn}>הוסף מנה</button>
    
    </div>
   );
 }
 export default ProductSquare;
 