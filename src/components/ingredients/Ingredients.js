/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/

import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Styles from "./ingredients.module.css";
import { getDishIngredients } from "../../firebase/Orders";
import { useCart } from "react-use-cart";
import Alert from "@mui/material/Alert";
import uuid from "react-uuid";

//Creates a square where all the product info will be shown
//with title, image, text, price as data
export default function Ingredients({ dishData, name, open, setOpen }) {
	const handleClose = () => {
		setOpen(false);
	};

	const { items, addItem, inCart, updateItem, getItem, setCartMetadata } = useCart();

	//values is our ingredients
	const [values, setValues] = useState({});
	const [itemAdded, setItemAdded] = useState(false);
	//handle changes
	const handleOnChange = e => {
		const { name, value } = e.target;
		setValues({ ...values, [name]: value });
	};

	//increment dish values ,
	const IncrementItemByKey = key => {
		const lastValue = values[key];
		if (lastValue < 2) {
			setValues({ ...values, [key]: lastValue + 1 });
		}
	};

	//decrement dish values
	const DecreaseItemByKey = key => {
		const lastValue = values[key];
		if (lastValue > 0) {
			setValues({ ...values, [key]: lastValue - 1 });
		}
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

	//save path
	const subCategory = getCategoryName();
	const category = captializeFirstLetter();

	//fetching ingredients for each dish, using path to get the correct document
	useEffect(() => {
		let isMounted = true;
		getDishIngredients(category, subCategory, name)
			.then(res => {
				//making sure state is mounted before setting values
				if (isMounted) {
					setValues(res);
				}
			})
			.catch(err => console.log(err));
		return () => {
			isMounted = false;
		};
	}, [subCategory]);

	//function to sort ingredients objects, to compare later
	function sortedObject(unordered) {
		return Object.keys(unordered)
			.sort()
			.reduce((obj, key) => {
				obj[key] = unordered[key];
				return obj;
			}, {});
	}

	const handleAddToCart = () => {
		//incase item is already in cart
		if (inCart(dishData.id)) {
			let flag = false;
			items.map(item => {
				console.log(item.title === dishData.title && JSON.stringify(sortedObject(item.ing)) === JSON.stringify(sortedObject(values)));
				if (item.title === dishData.title && JSON.stringify(sortedObject(item.ing)) === JSON.stringify(sortedObject(values))) {
					flag = true;
				}
			});
			//if item in cart, and has same ingredients just increment the amount of it by 1
			if (flag) {
				console.log("flag true");
				addItem({ id: dishData.id, title: dishData.title, price: dishData.price, ing: values });
				setItemAdded(true);
			}
			//if item in cart, and has different ingredients, add it as unique item
			else {
				console.log("in else, flag not true");
				addItem({ id: uuid(), title: dishData.title, price: dishData.price, ing: values });
				setItemAdded(true);
			}
		}
		//if item is not in cart
		else {
			console.log("no items in cart yet");
			addItem({ id: dishData.id, title: dishData.title, price: dishData.price, ing: values });
			setItemAdded(true);
		}
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			{/* add product name for every dish */}
			{itemAdded && <Alert severity="success">Added To Cart</Alert>}
			<DialogTitle className={Styles.ingredientsTitle}>{dishData.title} </DialogTitle>
			<DialogContent className={Styles.ingredientsContent}>
				<img className={Styles.ingredients} src={dishData.image}></img>
				{/* add image for every dish */}
				{Object.entries(values).map(([key, value]) => {
					return (
						<div className={Styles.ingredientsContainer} key={key}>
							<div className={Styles.ingredientsList}>{key}</div>
							<div className={Styles.ingredientsBtns}>
								<button
									onClick={() => {
										DecreaseItemByKey(key);
									}}
									className={Styles.minusBtn}
									name={key}
								>
									-
								</button>
								<input style={{width:"20px"}} disabled className={Styles.countInput} value={value} name={key} onChange={handleOnChange} />
								<button
									onClick={() => {
										IncrementItemByKey(key);
									}}
									className={Styles.plusBtn}
									name={key}
								>
									+
								</button>
							</div>
						</div>
					);
				})}
			</DialogContent>
			<DialogActions>
				<button className={Styles.closebtn} onClick={handleClose}>
					ביטול
				</button>
				<button className={Styles.closebtn} onClick={handleAddToCart}>
					הוסף לעגלה
				</button>
			</DialogActions>
		</Dialog>
	);
}
