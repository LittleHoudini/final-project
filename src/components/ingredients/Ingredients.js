/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/

// import { Card, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "../button/btn.css";
import Styles from "./ingredients.module.css";
import { getDishIngredients } from "../../firebase/Orders";

/*****************************************
 * * CREATE REACT FUNCTION COMPONENT
 *****************************************/

//Creates a square where all the product info will be shown
//with title, image, text, price as data
export default function Ingredients({ dishData,name, open, setOpen }) {
	const handleClose = () => {
		setOpen(false);
	};

	//values is our ingredients
	const [values, setValues] = useState({});
	
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

	return (
		
			<Dialog open={open} onClose={handleClose}>
				{/* add product name for every dish */}
				<DialogTitle className={Styles.ingredientsTitle}>{dishData.title} </DialogTitle>
				<DialogContent className={Styles.ingredientsContent}>
					<img className={Styles.ingredients} src={dishData.image}></img>
					{/* add image for every dish */}
						{Object.entries(values).map(([key, value]) => {
							return (
								<DialogContentText className={Styles.ingredientsContainer}  key={key}>
									<div className={Styles.ingredientsList}>{key}</div>
									<div className={Styles.ingredientsBtns}>
									<button   onClick={(() => {DecreaseItemByKey(key)})} className={Styles.minusBtn} name={key} >-</button>
									<input  className={Styles.countInput}  value={value} name={key} onChange={handleOnChange}  />
									<button onClick={(() => {IncrementItemByKey(key)})} className={Styles.plusBtn} name={key} >+</button>
									</div>
								</DialogContentText>
							);
						})}

					<TextField autoFocus margin="dense" id="name" label="הערות למנה"  fullWidth variant="standard" />
				</DialogContent>
				<DialogActions>
					<button className="closebtn" onClick={handleClose}>
						X
					</button>
					<button className="closebtn" onClick={() => console.log(dishData,values)}>
						ORDER NOW
					</button>
				</DialogActions>
			</Dialog>
		
	);
}
