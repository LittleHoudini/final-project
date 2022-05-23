/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/

import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import styles from "./productSquare.module.css";
import Ingredients from "../ingredients/Ingredients";
import '../button/btn.css';
import { getDishData } from "../../firebase/Orders";



/*****************************************
 * * CREATE REACT FUNCTION COMPONENT
 *****************************************/

//Creates a square where all the product info will be shown
//with title, image, text, price as data
export default function ProductSquare(props) {
  const { name,hasIngredients, title, image, text, price } = props.data;
  const [open, setOpen] = useState(false);
  const [dishData, setDishData] = useState({
    title : "",
    price : "",
    image : "",
  })
  
  
  //getting category name through url to match database path
  function getCategoryName(){
    const location = window.location.pathname;
    return location.replace(/\//, "");
  }
  //capitalize first letter to match database path
  function captializeFirstLetter(str){
    const location = window.location.pathname;
    return location.charAt(1).toUpperCase() + location.slice(2);
  }

  //save path
  const subCategory = getCategoryName()
  const category = captializeFirstLetter()

  
  //get dish title ,image and price and send it ingredients component
  useEffect(() => {
    let isMounted = true;
    getDishData(category,subCategory,name)
    .then((res) => {
      if(isMounted){
        setDishData({title: res.title, price:res.price, image:res.image})
      }

    }).catch((err) => console.log(err))
    return () => {
      isMounted = false;
    }

  },[subCategory])
  
  return (
    <>
      <Card className={styles.container}>
        <Card.Img src={image} />
        <Card.Body className={styles.cardbody}>
          <Card.Title className={styles.title}>{title}</Card.Title>
          <Card.Text className={styles.aboutproduct}>{text}</Card.Text>
          <Button
            className={"containerbtn"}
            variant="primary"
            id={name}
            onClick={() => {setOpen(true);console.log(`${name} button`);}}>
            {price}.00
          </Button>
        </Card.Body>
      </Card>
      { hasIngredients && <Ingredients name={name} open={open} setOpen={setOpen} dishData={dishData} />}
    </>
  );
}
