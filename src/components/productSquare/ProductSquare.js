/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/

 import React from 'react';
import { Card,Button } from 'react-bootstrap';
import styles from './productSquare.module.css';
 
 /*****************************************
  * * CREATE REACT FUNCTION COMPONENT
  *****************************************/

 function ProductSquare(props) {
    const {title,image,text,price} = props.data;
   return (
    // <div className={styles.container}>
    //   <img className='menu-cover-image' src={image} alt="Original Burger"/>
    //   <h2 className={styles.h2}>{title}</h2>
    //   <div className={styles.infodiv}> 
    //   <figure className={`${styles.price} ${styles.figure}`}>{price}</figure>
    //   <figure className={styles.figure}>{text}</figure>
    //  </div>
    //   <button className={styles.btn}>הוסף מנה</button>
    // </div>
    <Card>
      <Card.Img variant="top" src={image}/>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{text}</Card.Text>
        <Button variant="primary">{price}</Button>
      </Card.Body>
    </Card>
   );
 }
 export default ProductSquare;
 