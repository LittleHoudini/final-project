/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/

import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import styles from "./productSquare.module.css";
import Ingredients from "../ingredients/Ingredients";
import "../button/btn.css";
import { useCart } from "react-use-cart";
import Alert from "@mui/material/Alert";
import { handleDisabledProduct } from "../../firebase/Admin";
import { handleImageChange } from "../../firebase/Admin";
/*****************************************
 * * CREATE REACT FUNCTION COMPONENT
 *****************************************/

//Creates a square where all the product info will be shown
//with title, image, text, price as data
export default function ProductSquare(props) {
	const { name, hasIngredients, title, image, text, price, id, items_id, disabled } = props.data;
	const [open, setOpen] = useState(false);
	const { addItem } = useCart();
	const [itemAdded, setItemAdded] = useState(false);
  const [imageLink,setImageLink] = useState("");



	//getting category name through url to match database path
	function getCategoryName() {
		const location = window.location.pathname;
		return location.replace(/\//, "");
	}
	//capitalize first letter to match database path
	function captializeFirstLetter(str) {
		const location = window.location.pathname;
		return location.charAt(1).toUpperCase() + location.slice(2);
	}

	const handleAddToCart = () => {
		if (hasIngredients) {
			setOpen(true);
		} else {
			addItem({ id: id, title: title, price: price });
			setItemAdded(true);
		}
	};



	const handleDisabledClick = () => {
		handleDisabledProduct(captializeFirstLetter(getCategoryName()), getCategoryName(), name, disabled);
		props.setClicked(prev => !prev);
	};

  const handleNewImageLinkSubmit = (e) => {
    e.preventDefault();
    console.log(imageLink)
    handleImageChange(captializeFirstLetter(getCategoryName()), getCategoryName(), name,imageLink)
    setImageLink("");
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
					<Button disabled={disabled} className={"containerbtn"} variant="primary" id={name} onClick={handleAddToCart}>
						הוסף
					</Button>
					{props.userType === "admin" ? (
						<>
							<Button onClick={handleDisabledClick}>{disabled ? "Activate" : "Disable"}</Button>
              <form onSubmit={(e) => handleNewImageLinkSubmit(e)}>
                <label>Change Image</label>
                <input value={imageLink} onChange={(e) => setImageLink(e.target.value)} placeholder="Image Link"/>
                <button type="submit">Submit</button>
              </form>
						</>
					) : null}
					{itemAdded && <Alert severity="success">Added To Cart</Alert>}
				</Card.Body>
			</Card>
			{hasIngredients && (
				<Ingredients
					name={name}
					open={open}
					setOpen={setOpen}
					dishData={{
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
