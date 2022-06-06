import { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getMisc } from "../../firebase/Orders";
import "./shoppingcart.css";
import { useCart} from "react-use-cart";
import { checkStockAvailbility, handleStockAfterOrder,addOrderToDB } from "../../firebase/Orders";
import ShoppingCartIcon from '../../images/shopping-cart-icon.png'
import { useContext } from "react";
import { UserContext } from "../../App";
import "../button/btn.css";

export function ShoppingCart() {
	const currentUser = useContext(UserContext);
		const {
		isEmpty,
		totalUniqueItems,
		items,
		updateItemQuantity,
		removeItem,
		cartTotal,
		emptyCart 
	  } = useCart();
	  

	  const [taxRate, setTaxRate] = useState(null);
	  const [itemQuantity, setItemQuantity] = useState();

	  //use effect to get tax rate
	  useEffect(() => {
		let isMounted = true;
		getMisc('tax')
		  .then((res) => {
			  //making sure state is mounted before setting values
			if(isMounted){
			  setTaxRate(res.tax);
			}
		  })
		  .catch((err) => console.log(err));
		  return () => {
			isMounted = false;
		  }
	  }, []);

	  //add 2 zeros after price
	function ccyFormat(num) {
		return `${num.toFixed(2)}`;
	}

	//convert json to string, to show ingredients as a string
	const convertJSON = (obj) => {
		let str = JSON.stringify(obj)
		return str.replace(/{|},|}/g, "\n").replace(/\[|\]|"/g, "").replace(/,/g, ',\n')
	}
	
	//get the amount of ingredients in the cart
	const getItemQuantity = () => {
		let arrayOfObjects = []
		let obj = {}
		for(let i in items){
			for(let key in items[i]['ing']){
				obj[key] = (items[i]['ing'][key])*items[i]['quantity']
			}
			//here push
			arrayOfObjects.push(obj)
			obj = {}
		  }
	return arrayOfObjects
	}

	//set the amount of ingredients to the state, rerender when cart item changes, to recalculate ingredients amount
	useEffect(() => {
		let isMounted = true;
		if(isMounted){
			const stock = getItemQuantity();
			setItemQuantity(stock)
		}
		return(() => isMounted = false)
	},[items])

	const handleOrder = async () => {
		try{
			//if we can update
			const canUpdateStock = await checkStockAvailbility(itemQuantity)
			if(canUpdateStock){
				const handleUpdate = await handleStockAfterOrder(itemQuantity);
				const addOrderToUserHistory = addOrderToDB(items,cartTotal,currentUser);
				emptyCart();
			}
			else{
				console.log("cant update");
				//here we will show the user some kind of something went wrong...
			}
		}
		catch(err){
			console.log(err);
		}
	}


	//incase cart is empty
	if (isEmpty) {
		emptyCart();
		return <div className="shoppingCartBox">
			
 				<img alt="" src={ShoppingCartIcon}  className="emptyShoppingCartImage" />
				 <p> אנו מצטערים, סל הקניות שלכם ריק</p>
				 <button className="closebtn">לתפריט</button>
				</div>;
	}

  return (
	<div className="shoppingCartBox">  
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={6}>
              Details 
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>פריטים</TableCell>
            <TableCell align="right">מחיר ליחידה</TableCell>
            <TableCell align="right">יחידות</TableCell>
            <TableCell align="right">סה"כ</TableCell>
			<TableCell align="right">הערות</TableCell>
			<TableCell align='right'>הסר פריט</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.title}</TableCell>
			  <TableCell align="right">{ccyFormat(item.price)}</TableCell>
			  <TableCell align="right">
				  <button  className="minusBtn" onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>-</button>
				  {item.quantity}
				  <button  className="plusBtn" onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</button>
				</TableCell>
              
              <TableCell align="right">{ccyFormat(item.price * item.quantity)}</TableCell>
			  <TableCell align="right">{item.ing && convertJSON(item.ing)}</TableCell>
			  <TableCell align='right'><button  className="minusBtn fullTd" onClick={() => removeItem(item.id)}>הסר</button></TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>סה"כ</TableCell>
			<TableCell align="right">{ccyFormat(cartTotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>מע"מ</TableCell>
            <TableCell align="right">{`${(taxRate * 100).toFixed(0)} %`}</TableCell>
			<TableCell align="right">{ccyFormat(taxRate * cartTotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>סה"כ אחרי מע"מ</TableCell>
			<TableCell align="right">{ccyFormat((taxRate * cartTotal)+cartTotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
	<div className="shoppingCartBtnBox">
	<button className="containerbtn" onClick={handleOrder}> לתשלום</button>
	<button className="containerbtn"> חזרה לתפריט</button>
	</div>
	</div>
  );
}

