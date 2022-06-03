/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/

// import { Card, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "../button/btn.css";
import Styles from "./ingredients.module.css";
import { getDishIngredients } from "../../firebase/Orders";
import { useCart } from "react-use-cart";
import Alert from '@mui/material/Alert';
import uuid from "react-uuid";

/*****************************************
 * * CREATE REACT FUNCTION COMPONENT
 *****************************************/

//Creates a square where all the product info will be shown
//with title, image, text, price as data
export default function Ingredients({ dishData,name, open, setOpen }) {
	const handleClose = () => {
		setOpen(false);
	};

	const { addItem,inCart,updateItem,getItem,setCartMetadata  } = useCart();

	//values is our ingredients
	const [values, setValues] = useState({});
	const [itemAdded, setItemAdded] = useState(false)
	//handle changes
	const handleOnChange = e => {
		const { name, value } = e.target;
		setValues({...values, [name]: parseInt(value, 10) });
	};
	 
	//increment dish values , 
	const IncrementItemByKey = (key) => {
		const lastValue = values[ key ];
		if(lastValue <3){
			setValues({...values, [ key ]: lastValue + 1 });
		}
	  }

	  //decrement dish values
	  const DecreaseItemByKey  = (key) => {
		const lastValue = values[ key ];
		if(lastValue > 0){
			setValues({...values, [ key ]: lastValue - 1 });
		}
	  }


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


  //fetching ingredients for each dish, using path to get the correct document
	  useEffect(() => {
		let isMounted = true;
		getDishIngredients(category, subCategory, name)
		  .then((res) => {
			  //making sure state is mounted before setting values
			if(isMounted){
			  setValues(res);
			}
		  })
		  .catch((err) => console.log(err));
		  return () => {
			isMounted = false;
		  }
	  }, [subCategory]);

	  const handleAddToCart = () => {
			
		//if item already in card
		  if(inCart(dishData.id)){
			  //get item
			const myItem = getItem(dishData.id)
			//check if item in cart ingredients are same as the one the user trying to add
			if(JSON.stringify(myItem['ing']) === JSON.stringify(values)){
				//if same
				addItem({id:dishData.id, title:dishData.title, price:dishData.price, ing : values});
				setItemAdded(true);
			}
			//if different ingredients
			else{
				addItem({id:dishData.id+" ", title:dishData.title, price:dishData.price, ing : values});
				setItemAdded(true);
			}
		  }
		  //if not in cart
		  else{
			addItem({id:dishData.id, title:dishData.title, price:dishData.price, ing : values});
			setItemAdded(true);
		}
	}

	return (
		
			<Dialog open={open} onClose={handleClose}>
				{/* add product name for every dish */}
				{itemAdded && <Alert severity="success">Added To Cart</Alert> }
				<DialogTitle className={Styles.ingredientsTitle}>{dishData.title} </DialogTitle>
				<DialogContent className={Styles.ingredientsContent}>
					<img className={Styles.ingredients} src={dishData.image}></img>
					{/* add image for every dish */}
						{Object.entries(values).map(([key, value]) => {
							return (
								<DialogContentText className={Styles.ingredientsContainer}  key={key}>
									<div className={Styles.ingredientsList}>{key}</div>
									<div className={Styles.ingredientsBtns}>
									<button   onClick={(() => {DecreaseItemByKey(key)})} className="minusBtn" name={key} >-</button>
									<input  className={Styles.countInput}  value={value} name={key} onChange={handleOnChange}  />
									<button onClick={(() => {IncrementItemByKey(key)})} className="plusBtn" name={key} >+</button>
									</div>
								</DialogContentText>
							);
						})}
				</DialogContent>
				<DialogActions>
					<button className="closebtn" onClick={handleClose}>
						X
					</button>
					<button className="closebtn" onClick={() => {console.table(values);console.table(dishData)}}>
						CLG
					</button>
					<button className="closebtn" onClick={handleAddToCart}>
						הוסף
					</button>
				</DialogActions>
			</Dialog>
		
	);
}
