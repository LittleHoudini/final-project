/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/

import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import styles from "./productSquare.module.css";
import Ingredients from "../ingredients/Ingredients";
import { useState } from "react";
/*****************************************
 * * CREATE REACT FUNCTION COMPONENT
 *****************************************/

//Creates a square where all the product info will be shown
//with title, image, text, price as data
export default function ProductSquare(props) {
    const {id, title, image, text, price } = props.data;
    const [open, setOpen] = useState(false);
    return (
      <>
      <Card className={styles.container}>
        <Card.Img src={image} />
        <Card.Body>
          <Card.Title className={styles.title}>{title}</Card.Title>
          <Card.Text className={styles.aboutproduct}>{text}</Card.Text>
          <Button className={styles.containerbtn} variant="primary" id={id} onClick={() => setOpen(true)}>
            {price}
          </Button>
        </Card.Body>
      </Card>
      <Ingredients includes={props.ingredients}  open={open} setOpen={setOpen}/>
      </>
    );
  }

