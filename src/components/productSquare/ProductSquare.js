/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/

 import React, { useEffect, useState } from "react";
 import { Card, Button } from "react-bootstrap";
 import styles from "./productSquare.module.css";
 import Ingredients from "../ingredients/Ingredients";
 import "../button/btn.css";
 import { useCart } from "react-use-cart";
 import Alert from '@mui/material/Alert';
 import { handleDisabledProduct } from "../../firebase/Admin";
 import { useContext } from "react";
 import { UserContext } from "../../App";
 import { getUserClassification } from "../../firebase/Users";
 /*****************************************
  * * CREATE REACT FUNCTION COMPONENT
  *****************************************/
 
 //Creates a square where all the product info will be shown
 //with title, image, text, price as data
 export default function ProductSquare(props) {
   const { name, hasIngredients, title, image, text, price, id ,items_id,disabled} = props.data;
   const [open, setOpen] = useState(false);
   const { addItem } = useCart();
   const [itemAdded, setItemAdded] = useState(false)

   const currentUser = useContext(UserContext);
   const [userType, setUserType] = useState("");

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
 
   const handleAddToCart = () => {
     if(hasIngredients){
       setOpen(true);
     }
     else{
       addItem({id:id, title:title, price:price})
       setItemAdded(true);
     }
   }

   useEffect(() => {
		if (currentUser) {
			//checks user classification to determine if hes admin or worker
			getUserClassification(currentUser)
				.then(result => {
					console.log("result = " , result);
					setUserType(result);
				})
				.catch(err => {
					console.log("error in fetching classification : ", err);
				});
		}
		return () => {
			setUserType("");
		};
	}, [currentUser]);

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
             disabled={disabled}
             className={"containerbtn"}
             variant="primary"
             id={name}
             onClick={handleAddToCart}>
              הוסף
           </Button>
           {userType === 'admin' ?
                      <Button onClick={() => handleDisabledProduct(captializeFirstLetter(getCategoryName()),getCategoryName(),name,disabled)}>
                      {disabled ? "Activate" : "Disable"}
                      </Button>
                      :
                      null
           }
           {itemAdded && <Alert severity="success">Added To Cart</Alert> }
         </Card.Body>
       </Card>
       {hasIngredients && (
         <Ingredients name={name} open={open} setOpen={setOpen} dishData={{
             title: title,
             price: price,
             image: image,
             id: id,
           }}
         />
       )}
     </>
   );
 }
 
