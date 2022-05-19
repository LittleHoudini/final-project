/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/

import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import styles from "./productSquare.module.css";
import Ingredients from "../ingredients/Ingredients";
import { getDishIngredients } from "../../firebase/Orders";



/*****************************************
 * * CREATE REACT FUNCTION COMPONENT
 *****************************************/

//Creates a square where all the product info will be shown
//with title, image, text, price as data
export default function ProductSquare(props) {
  const { hasIngredients, title, image, text, price } = props.data;
  const [open, setOpen] = useState(false);
  const [ingredients, setIngredients] = useState({});
  
  
  function getCategoryName(){
    const location = window.location.pathname;
    return location.replace(/\//, "");
  }
  function captializeFirstLetter(str){
    const location = window.location.pathname;
    return location.charAt(1).toUpperCase() + location.slice(2);
  }

  
  const subCategory = getCategoryName()
  const category = captializeFirstLetter()

  
  
  useEffect(() => {
    getDishIngredients(category, subCategory, hasIngredients)
      .then((res) => {
        setIngredients(res);
      })
      .catch((err) => console.log(err));
  }, [subCategory]);

  
  return (
    <>
      <Card className={styles.container}>
        <Card.Img src={image} />
        <Card.Body>
          <Card.Title className={styles.title}>{title}</Card.Title>
          <Card.Text className={styles.aboutproduct}>{text}</Card.Text>
          <Button
            className={styles.containerbtn}
            variant="primary"
            id={hasIngredients}
            onClick={() => {setOpen(true);console.log(`${hasIngredients} button`);}}>
            {price}
          </Button>
        </Card.Body>
      </Card>
      { hasIngredients && <Ingredients includes={ingredients} open={open} setOpen={setOpen} />}
    </>
  );
}
