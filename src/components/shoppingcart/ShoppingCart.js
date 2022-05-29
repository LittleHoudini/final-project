// import React from "react";
// import "./shoppingcart.css";
// import { useCart} from "react-use-cart";

// export const ShoppingCart = () => {
// 	const {
// 		isEmpty,
// 		totalUniqueItems,
// 		items,
// 		updateItemQuantity,
// 		removeItem,
// 	  } = useCart();
	
	  
// 	return (

// 		<div className="wrapper2">
// 					<h1>Cart ({totalUniqueItems})</h1>
  
//   <ul>
// 	{items.map((item) => (
// 	  <li key={item.id}>
// 		{item.quantity} x {item.title} &mdash;
// 		<button
// 		  onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
// 		>
// 		  -
// 		</button>
// 		<button
// 		  onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
// 		>
// 		  +
// 		</button>
// 		<button onClick={() => removeItem(item.id)}>&times;</button>
// 	  </li>
// 	))}
//   </ul>
// 			<div className="wrappershoppingcart">
// 				<section className="orderdetails">
// 					<p className="orderdetail"> מספר הזמנה </p>
// 					<p className="orderdetail"> שם המזמין </p>
// 					<p className="orderdetail"> כתובת </p>
// 					<p className="orderdetail"> מספר טלפון </p>
// 					<p className="orderdetail"> הערות לכתובת </p>
// 					<p className="orderdetail">הערות לשליח </p>
// 				</section>
// 				<section className="shoppingcart">
// 					<div className="сhangequantity">
// 						<button className="сhangequantitybtn">מחיקת מנה</button>
// 						<button className="сhangequantitybtn">שכפול מנה</button>
// 						<button className="сhangequantitybtn">עריכה</button>
// 					</div>

// 					<div className="productdetails">
// 						<p className="productdetail"> מחיר </p>
// 						<p className="productdetail"> תוספת </p>
// 						<p className="productdetail"> שם מנה </p>
// 					</div>
// 				</section>

// 				<section className="costbuttons">
// 					<button className="orderbtn">סיום ותשלום</button>
// 					<button className="orderbtn">לרוקן את המגש</button>
// 					<p className="ordercost">סהכ מחיר</p>
// 					<p className="ordercost"> כולל מעמ </p>
// 				</section>
// 			</div>
// 		</div>
// 	);
// };
// import * as React from 'react';
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

export function ShoppingCart() {
		const {
		isEmpty,
		totalUniqueItems,
		items,
		updateItemQuantity,
		removeItem,
		cartTotal
	  } = useCart();
	  const [taxRate, setTaxRate] = useState(null);

	  useEffect(() => {
		let isMounted = true;
		getMisc('tax')
		  .then((res) => {
			  //making sure state is mounted before setting values
			if(isMounted){
				console.log(res.tax);
			  setTaxRate(res.tax);
			}
		  })
		  .catch((err) => console.log(err));
		  return () => {
			isMounted = false;
		  }
	  }, []);

	function ccyFormat(num) {
	return `${num.toFixed(2)}`;
	}

	const convertJSON = (obj) => {
		let str = JSON.stringify(obj)
		return str.replace(/{|},|}/g, "\n").replace(/\[|\]|"/g, "").replace(/,/g, ',\n')
	}
	

	if (isEmpty) return <p>Your cart is empty</p>;

  return (
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
				  <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>-</button>
				  {item.quantity}
				  <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</button>
				</TableCell>
              
              <TableCell align="right">{ccyFormat(item.price * item.quantity)}</TableCell>
			  <TableCell align="right">{item.ing && convertJSON(item.ing)}</TableCell>
			  {console.log(JSON.stringify(item.items_id))}
			  <TableCell align='right'><button onClick={() => removeItem(item.id)}>הסר</button></TableCell>
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

  );
}

