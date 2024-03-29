/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/

import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import styles from "./productSquare.module.css";
import Ingredients from "../ingredients/Ingredients";

import { useCart } from "react-use-cart";
import Alert from "@mui/material/Alert";
import { updateDishData, removeProduct, handleDisabledProduct,productInPendingOrders } from "../../firebase/Admin";

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
	const [removeError, setRemoveError] = useState(false);
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

	//add to cart
	const handleAddToCart = () => {
		if (hasIngredients) {
			setOpen(true);
		} else {
			addItem({ id: id, title: title, price: price });
			setItemAdded(true);
		}
	};

	//make product unavailable
	const handleDisabledClick = async e => {
		e.preventDefault();
		const res = await handleDisabledProduct(captializeFirstLetter(getCategoryName()), getCategoryName(), name, disabled);
		props.setClicked({ ...props.clicks, disable: !disable });
	};

	//handle edit product info
	const handleEdit = async (e, values) => {
		e.preventDefault();
		if (checkInput(e)) {
			try {
				const res = await updateDishData(captializeFirstLetter(getCategoryName()), getCategoryName(), name, values);
				props.setClicked({ ...props.clicks, edit: !edit });
			} catch (err) {
				console.log(err);
			}
		}
	};

	//handle remove product
	const handleremoveProduct = async e => {
		e.preventDefault();
		if (checkbox) {
			const productFound = await productInPendingOrders(title);
			if(!productFound){
				const res = await removeProduct(captializeFirstLetter(getCategoryName()), getCategoryName(), name);
				props.setClicked({ ...props.clicks, deleteDish: !deleteDish });
			}
			else{
				setRemoveError("הזמנה ממתינה לאישור עם המוצר הנ''ל")
				return false;
			}
		}
	};

	//check if input after edit is valid
	const checkInput = e => {
		e.preventDefault();
		if (values.titleToEdit.length < 1) {
			setError("קטגורית מוצר לא תקינה");
			return false;
		}

		if (Number(values.priceToEdit) < 1 || isDot(values.priceToEdit)) {
			setError("מחיר לא יכול להיות מתחת ל1");
			return false;
		}

		//regex
		let re = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
		let re1 = /([./-]*[A-Za-z])\w+/g;
		if (!re1.test(values.imageLinkToEdit) && !re.test(values.imageLinkToEdit)) {
			setError("פורמט תמונה לא תקין");
			return false;
		}

		return true;
	};

	function isDot(key) {
		return key === ".";
	  }
	  
	  function isNumber(key) {
		return key.match(/[0-9]/);
	  }
	  
	  function isValidDot(value) {
		return value.length === 0 || (value.match(/\./g) || []).length < 1;
	  }
	  
	  function isValidNumber(value) {
		const index = value.indexOf(".");
		if(index === -1) return true;
		return value.slice(index+1).length < 2;
	  }
	  
	  function isValidPriceInput(key, value) {
		if(isDot(key)) return isValidDot(value);
		if(isNumber(key)) return isValidNumber(value);
		return false;
	  }
	  
	  function formatNumber(num) {
		if (Number.isInteger(num)) {
		  return `${num}.00`;
		}
		return num;
	  }

	return (
		<>
			
			<Card className={`${show ? styles.show : styles.container}`}>
			{removeError ? <label style={{ color: "red" }}>{removeError}</label> : null}
				<Card.Img src={image} />

				<Card.Body className={styles.cardbody}>
					<Card.Title className={styles.title}>{title}</Card.Title>
					<div className={styles.info}>
						<Card.Text className={styles.priceproduct} onClick={() => console.log(typeof(price))}>{formatNumber(price)}</Card.Text>
						<Card.Text className={styles.aboutproduct}>{text}</Card.Text>
					</div>
					<Button disabled={disabled} className={"containerbtn"} variant="primary" id={name} onClick={handleAddToCart}>
						{disabled ? "אזל המלאי" : "הוסף לעגלה"}
					</Button>
					{props.userType === "admin" ? (
						<>
							<Button className={styles.containerbtn} onClick={e => handleDisabledClick(e)}>
								{disabled ? "הפוך לפעיל" : "הפוך ללא פעיל"}
							</Button>
							<button className={styles.containerbtn} onClick={e => setShow(prev => !prev)}>
								{show ? "ביטול עריכה" : "עריכה"}
							</button>
							{show ? (
								<div className={styles.adminEditBox} >
									<form onSubmit={e => handleEdit(e, values)}>
										{error ? <label style={{ color: "red" }}>{error}</label> : null}
										<label>תמונה</label>
										<input value={values.imageLink} onChange={handleChange("imageLink")} placeholder="Image Link" />
										<label>מחיר</label>
										<input 
										onKeyPress={event => {
											if (!isValidPriceInput(event.key, event.target.value)) {
											event.preventDefault();
											}
										}}
										value={values.priceToEdit} onChange={handleChange("priceToEdit")} placeholder="Product Price" />
										<label>שם מוצר</label>
										<input value={values.titleToEdit} onChange={handleChange("titleToEdit")} placeholder="Product Title" />
										<label>תיאור מוצר</label>
										<input maxLength="50" value={values.textToEdit} onChange={handleChange("textToEdit")} placeholder="Product Text" />
										<div className={styles.saveEditBtn}>
											<button type="submit">
												שמירה
											</button>
										</div>
									</form>
								</div>
							) : null}
							<label style={{textAlign:"center",width:"100%"}} htmlFor="hasIngredients">למחיקת המוצר נא לסמן את התיבה הבאה</label>
							<input className={styles.checkBoxDelete} type="checkbox" onChange={() => setCheckBox(prev => !prev)} value={checkbox} />
							<button className={styles.containerbtn} onClick={e => handleremoveProduct(e)}>
								מחיקת מוצר
							</button>
						</>
					) : null}
					{itemAdded && <Alert severity="success">המוצר התווסף לעגלה</Alert>}
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
