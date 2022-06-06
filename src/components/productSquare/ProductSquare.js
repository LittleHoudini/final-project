/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/

 import React, { useState } from "react";
 import { Card, Button } from "react-bootstrap";
 import styles from "./productSquare.module.css";
 import Ingredients from "../ingredients/Ingredients";
 import "../button/btn.css";
 import { useCart } from "react-use-cart";
 import Alert from '@mui/material/Alert';
 /*****************************************
  * * CREATE REACT FUNCTION COMPONENT
  *****************************************/
 
 //Creates a square where all the product info will be shown
 //with title, image, text, price as data
 export default function ProductSquare(props) {
   const { name, hasIngredients, title, image, text, price, id ,items_id} = props.data;
   const [open, setOpen] = useState(false);
   const { addItem } = useCart();
   const [itemAdded, setItemAdded] = useState(false)
 
   const handleAddToCart = () => {
     if(hasIngredients){
       setOpen(true);
     }
     else{
       addItem({id:id, title:title, price:price})
       setItemAdded(true);
     }
   }
 
   return (
     <>
       <Card className={styles.container}>
       
         <Card.Img src={image} />
         
         <Card.Body className={styles.cardbody}>
           <Card.Title className={styles.title}>{title}</Card.Title>
        <div className={styles.info}>
        <Card.Text className={styles.priceproduct}>{price}.00</Card.Text>
        <Card.Text className={styles.aboutproduct}>{text}</Card.Text>
         
         </div>
           <Button
             className={"containerbtn"}
             variant="primary"
             id={name}
             onClick={handleAddToCart}>
              הוסף
           </Button>
           {itemAdded && <Alert severity="success">Added To Cart</Alert> }
         </Card.Body>
       </Card>
       {hasIngredients && (
         <Ingredients name={name} open={open} setOpen={setOpen} dishData={{
             title: title,
             price: price,
             image: image,
             id: id,
<<<<<<< HEAD
             items_id : items_id
=======
>>>>>>> a21fa53bf57510a2f82749c7abc452b0277f514f
           }}
         />
       )}
     </>
   );
 }
<<<<<<< HEAD
 
=======
 
>>>>>>> a21fa53bf57510a2f82749c7abc452b0277f514f
