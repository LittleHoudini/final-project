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
import { updateDishData, removeProduct } from "../../firebase/Admin";

/*****************************************
 * * CREATE REACT FUNCTION COMPONENT
 *****************************************/

//Creates a square where all the product info will be shown
//with title, image, text, price as data
export default function ProductSquare(props) {
	const { name, hasIngredients, title, image, text, price, id, items_id, disabled } = props.data;
	const { deleteDish, disable, edit } = props.clicks;
	const [open, setOpen] = useState(false);
	const { addItem } = useCart();
	const [itemAdded, setItemAdded] = useState(false);
	const [error, setError] = useState(false);
	const [show, setShow] = useState(false);
	const [checkbox, setCheckBox] = useState(false);

	const [values, setValues] = useState({
		imageLink: image,
		priceToEdit: price,
		titleToEdit: title,
		textToEdit: text,
	});

	const handleChange = name => event => {
		setValues({ ...values, [name]: event.target.value });
	};

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
		props.setClicked({ ...props.clicks, disable: !disable });
	};

	const handleEdit = (e, values) => {
		e.preventDefault();
		console.log(values);
		if (checkInput(e)) {
			try {
				updateDishData(captializeFirstLetter(getCategoryName()), getCategoryName(), name, values);
				props.setClicked({ ...props.clicks, edit: !edit });
				return true;
			} catch (err) {
				console.log(err);
			}
		}
	};

	const handleremoveProduct = async e => {
		e.preventDefault();
		if (checkbox) {
			removeProduct(captializeFirstLetter(getCategoryName()), getCategoryName(), name);
			props.setClicked({ ...props.clicks, deleteDish: !deleteDish });
		}
	};

	const checkInput = e => {
		e.preventDefault();
		if (values.titleToEdit.length < 1) {
			setError("Product Category Required");
			return false;
		}

		if (Number(values.priceToEdit) < 1) {
			setError("Price can not be below 1");
			return false;
		}

		let re = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
		let re1 = /([./-]*[A-Za-z])\w+/g;
		if (!re1.test(values.imageLinkToEdit) && !re.test(values.imageLinkToEdit)) {
			setError("Incorrect Image Link Format");
			return false;
		}

		return true;
	};

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
						{disabled ? "אזל המלאי" : "הוסף לעגלה"}
					</Button>
					{props.userType === "admin" ? (
						<>
							<Button onClick={handleDisabledClick}>{disabled ? "Activate" : "Disable"}</Button>
							<button onClick={e => setShow(prev => !prev)}>{show ? "Cancel Edit" : "Edit Product"}</button>
							{show ? (
								<form onSubmit={e => handleEdit(e, values)}>
									{error ? <label style={{ color: "red" }}>{error}</label> : null}
									<input value={values.imageLink} onChange={handleChange("imageLink")} placeholder="Image Link" />
									<input value={values.priceToEdit} onChange={handleChange("priceToEdit")} placeholder="Product Price" />
									<input value={values.titleToEdit} onChange={handleChange("titleToEdit")} placeholder="Product Title" />
									<input value={values.textToEdit} onChange={handleChange("textToEdit")} placeholder="Product Text" />
									<button type="submit">Submit</button>
								</form>
							) : null}
							<input type="checkbox" onChange={() => setCheckBox(prev => !prev)} value={checkbox} />

							<label htmlFor="hasIngredients">Confirm Delete</label>
							<button onClick={e => handleremoveProduct(e)}>Delete Product</button>
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
