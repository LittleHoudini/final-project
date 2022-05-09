/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/

 import React, { Component } from 'react';
import { Card,Button } from 'react-bootstrap';
import styles from './productSquare.module.css';
 
 /*****************************************
  * * CREATE REACT FUNCTION COMPONENT
  *****************************************/

 //Creates a square where all the product info will be shown
 //with title, image, text, price as data
 export default class ProductSquare extends Component {
   render(){
   const {title,image,text,price} = this.props.data;
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
    <Card className={styles.container}>
      <Card.Img   src={image}/>
      <Card.Body>
        <Card.Title className={styles.title}>{title}</Card.Title>
        <Card.Text  className={styles.aboutproduct} >{text}</Card.Text>
        <Button className={styles.containerbtn} variant="primary">{price}</Button>
      </Card.Body>
    </Card>
   );
 }
}
 