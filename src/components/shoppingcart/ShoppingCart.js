import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getMisc } from "../../firebase/Orders";
import "./shoppingcart.css";
import { useCart } from "react-use-cart";
import { checkStockAvailbility, handleStockAfterOrder, addOrderToDB } from "../../firebase/Orders";
import ShoppingCartIcon from "../../images/shopping-cart-icon.png";
import { useContext } from "react";
import { UserContext } from "../../App";
import "../button/btn.css";
import { PayPalButtons } from "@paypal/react-paypal-js";
import uuid from "react-uuid";
import { SigninPage } from "../pages/signin/SigninPage";
import SomethingWentWrong from "./SomethingWentWrong";

export function ShoppingCart() {
	const currentUser = useContext(UserContext);
	const { isEmpty, totalUniqueItems, items, updateItemQuantity, removeItem, cartTotal, emptyCart } = useCart();

	const [show, setShow] = useState(false);
	const [success, setSuccess] = useState(false);
	const [ErrorMessage, setErrorMessage] = useState("");
	const [orderID, setOrderID] = useState(false);

	const [taxRate, setTaxRate] = useState(null);
	const [itemQuantity, setItemQuantity] = useState();

	const [openSignIn, setOpenSignIn] = useState(false);
	const [openSomethingWentWrong, setOpenSomethingWentWrong] = useState(false);

	//use effect to get tax rate
	useEffect(() => {
		let isMounted = true;
		getMisc("tax")
			.then(res => {
				//making sure state is mounted before setting values
				if (isMounted) {
					setTaxRate(res.tax);
				}
			})
			.catch(err => console.log(err));
		return () => {
			isMounted = false;
		};
	}, []);

	//add 2 zeros after price
	function ccyFormat(num) {
		return `${num.toFixed(2)}`;
	}

	//convert json to string, to show ingredients as a string
	const convertJSON = obj => {
		let str = JSON.stringify(obj);
		return str
			.replace(/{|},|}/g, "\n")
			.replace(/\[|\]|"/g, "")
			.replace(/,/g, ",\n");
	};

	//get the amount of ingredients in the cart
	const getItemQuantity = () => {
		let arrayOfObjects = [];
		let obj = {};
		for (let i in items) {
			for (let key in items[i]["ing"]) {
				obj[key] = items[i]["ing"][key] * items[i]["quantity"];
			}
			//here push
			arrayOfObjects.push(obj);
			obj = {};
		}
		return arrayOfObjects;
	};

	//set the amount of ingredients to the state, rerender when cart item changes, to recalculate ingredients amount
	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			const stock = getItemQuantity();
			setItemQuantity(stock);
		}
		return () => (isMounted = false);
	}, [items]);

	const formatItemsForOrder = () => {
		let arr = [];
		items.map(item => {
			arr.push({
				name: item.title,
				description: "Store Pickup on 12/31/2020. Bring receipt and photo ID for proof of purchase.",
				// sku: item.id,
				unit_amount: { currency_code: "ILS", value: ccyFormat(item.price) },
				quantity: item.quantity,
				tax: { currency_code: "ILS", value: "0.00" },
				category: "PHYSICAL_GOODS",
			});
		});
		return arr;
	};

	// creates a paypal order
	const createOrder = (data, actions) => {
		const formattedItems = formatItemsForOrder();
		return actions.order
			.create({
				purchase_units: [
					{
						reference_id: "0", //make sure to always use a ref id, hopefully some day the ability to have multip purcahse_units will actually work
						invoice_id: uuid(),
						amount: {
							currency_code: "ILS",
							value: ccyFormat(cartTotal * taxRate + cartTotal), // this is the total of the breakdown lines below
							//make sure to specify your currency_code and the price, and make sure the price has 2 digits after the decimal
							breakdown: {
								item_total: { currency_code: "ILS", value: cartTotal },
								shipping: { currency_code: "ILS", value: "0.00" },
								handling: { currency_code: "ILS", value: "0.00" },
								tax_total: { currency_code: "ILS", value: ccyFormat(cartTotal * taxRate) },
								discount: { currency_code: "ILS", value: "0.00" },
							},
						},
						items: formattedItems,
					},
				],

				// not needed if a shipping address is actually needed
				application_context: {
					shipping_preference: "NO_SHIPPING",
				},
			})
			.then(orderID => {
				setOrderID(orderID);
				return orderID;
			})
			.catch(err => {
				setErrorMessage(err);
			});
	};

	// check Approval
	const onApprove = (data, actions) => {
		return actions.order.capture().then(function (details) {
			const { payer } = details;
			setSuccess(true);
		});
	};

	//capture likely error
	const onError = (data, actions) => {
		setErrorMessage("An Error occured with your payment ");
	};

	useEffect(() => {
		if (success) {
			console.log("if success, handle db");
			const handleUpdate = handleStockAfterOrder(itemQuantity);
			const addOrderToUserHistory = addOrderToDB(items, cartTotal * taxRate + cartTotal, currentUser);
			emptyCart();
		}
	}, [success]);

	console.log(1, orderID);
	console.log(2, success);
	console.log(3, ErrorMessage);

	const handleOrder = async () => {
		try {
			//if we can update
			if (currentUser) {
				const canUpdateStock = await checkStockAvailbility(itemQuantity);
				if (canUpdateStock) {
					setShow(true);
				} else {
					//seterrorMessage here
					console.log("cant update");
					//here we will show the user some kind of something went wrong...
					setErrorMessage("Sorry, something went wrong. Please try again, or refresh the page. If you keep seeing this message, please contact us.");
					setOpenSomethingWentWrong(true);
				}
			} else {
				console.log("please log in first");
				setOpenSignIn(true);
			}
		} catch (err) {
			console.log(err);
		}
	};

	//incase cart is empty
	if (isEmpty) {
		return (
			<div className="shoppingCartBox">
				<img alt="" src={ShoppingCartIcon} className="emptyShoppingCartImage" />
				<p> אנו מצטערים, סל הקניות שלכם ריק</p>
				<button className="closebtn">לתפריט</button>
			</div>
		);
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
							<TableCell align="right">הסר פריט</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{items.map(item => (
							<TableRow key={item.id}>
								<TableCell>{item.title}</TableCell>
								<TableCell align="right">{ccyFormat(item.price)}</TableCell>
								<TableCell align="right">
									<button className="minusBtn" onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>
										-
									</button>
									{item.quantity}
									<button className="plusBtn" onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>
										+
									</button>
								</TableCell>

								<TableCell align="right">{ccyFormat(item.price * item.quantity)}</TableCell>
								<TableCell align="right">{item.ing && convertJSON(item.ing)}</TableCell>
								<TableCell align="right">
									<button className="minusBtn fullTd" onClick={() => removeItem(item.id)}>
										הסר
									</button>
								</TableCell>
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
							<TableCell align="right">{ccyFormat(taxRate * cartTotal + cartTotal)}</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
			<div className="shoppingCartBtnBox">
				<button className="containerbtn" onClick={handleOrder}>
					לתשלום {show ? <PayPalButtons style={{ layout: "vertical" }} createOrder={createOrder} onApprove={onApprove} /> : null}
				</button>
				<button className="containerbtn"> חזרה לתפריט</button>
			</div>
			{openSignIn && <SigninPage openSignIn={openSignIn} setOpenSignIn={setOpenSignIn} />}
			{ErrorMessage.length > 0 ? <SomethingWentWrong openSomethingWentWrong= {openSomethingWentWrong} setOpenSomethingWentWrong={setOpenSomethingWentWrong}/> : null}
		</div>
	);
}
