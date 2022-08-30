import { useEffect, useState, useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./shoppingcart.css";
import { useCart } from "react-use-cart";
import { checkStockAvailbility, getMisc, addOrderToDB } from "../../firebase/Orders";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
import { PayPalButtons } from "@paypal/react-paypal-js";
import uuid from "react-uuid";
import { SigninPage } from "../pages/signin/SigninPage";
import SomethingWentWrong from "./SomethingWentWrong";
import { getDocument } from "../../firebase/Users";

export function ShoppingCart() {
	const currentUser = useContext(UserContext);
	const { isEmpty, items, updateItemQuantity, removeItem, cartTotal, emptyCart } = useCart();

	const [show, setShow] = useState(false);
	const [success, setSuccess] = useState(false);
	const [ErrorMessage, setErrorMessage] = useState("");
	const [orderID, setOrderID] = useState(false);

	const [taxRate, setTaxRate] = useState(null);
	const [itemQuantity, setItemQuantity] = useState();

	const [openSignIn, setOpenSignIn] = useState(false);
	const [openSomethingWentWrong, setOpenSomethingWentWrong] = useState(false);

	const [passwordShown, setPasswordShown] = useState(false);
	const [values, setValues] = useState({
		firstName: "",
		lastName: "",
		phoneNumber: "",
		city: "",
		street: "",
		homeNumber: "",
		email: "",
		password: "",
	});
	//deconstruct object values
	const { firstName, lastName, phoneNumber, city, street, homeNumber, email, password } = values;

	//changing state based on input
	const handleChange = name => event => {
		setValues({ ...values, [name]: event.target.value });
	};

	// fetching user data based on current user logged in
	useEffect(() => {
		let isMounted = true;
		if (currentUser) {
			//fetch data from collection 'Person' if theres user logged in
			getDocument("Person", currentUser)
				.then(result => {
					if (isMounted) {
						//set the values to input fields
						setValues(result);
					}
				})
				.catch(err => {
					console.log(err);
				});
		}
		return () => {
			isMounted = false;
		};
	}, [currentUser]);

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
			const addOrderToUserHistory = addOrderToDB(items, cartTotal * taxRate + cartTotal, currentUser, orderID);
			emptyCart();
		}
	}, [success]);

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
					setErrorMessage(
						"Sorry, something went wrong. Please try again, or refresh the page. If you keep seeing this message, please contact us."
					);
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
			<div className="emptyShoppingCart">
				{/* <img alt="" src={ShoppingCartIcon} className="emptyShoppingCartImage " /> */}
				<p> סל הקניות שלכם ריק</p>
				<Link as={Link} to={"/menucategories"} className="containerbtnEmpty">
					חזרה לתפריט
				</Link>
			</div>
		);
	}

	return (
		<div className="shoppingCartBox">
			<div className="titleDiv">
				<h1 className="titleDiv"> סל קניה</h1>
				<p>לפני התשלום נא לוודא שפרטי המזמין והכתובת תקינים</p>
			</div>
			<TableContainer className="tableBodyBox" align="left" component={Paper}>
				<Table aria-label="spanning table">
					<TableHead>
						<TableRow>
							<TableCell style={{ color: "white" }} align="center" colSpan={6}>
								סל קנייה
							</TableCell>
						</TableRow>

						<TableRow>
							<TableCell style={{ color: "white" }} align="right">
								הסר פריט
							</TableCell>
							<TableCell style={{ color: "white" }} align="right">
								סה"כ
							</TableCell>
							<TableCell style={{ color: "white" }} align="right">
								יחידות
							</TableCell>
							<TableCell style={{ color: "white" }}>פריטים</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{items.map(item => (
							<TableRow key={item.id}>
								<TableCell align="right">
									<button className="minusBtn fullTd" onClick={() => removeItem(item.id)}>
										הסר
									</button>
								</TableCell>
								<TableCell align="right">{ccyFormat(item.price * item.quantity)}</TableCell>
								<TableCell align="center">
									<div className="changeQ">
										<button className="minusBtn" onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>
											-
										</button>
										{item.quantity}
										<button className="plusBtn" onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>
											+
										</button>
									</div>
								</TableCell>

								{/* <TableCell align="right">{ccyFormat(item.price)}</TableCell> */}

								<TableCell className="producttd">
									{item.title} <br></br>
									{item.ing && convertJSON(item.ing)}
									<br></br> {ccyFormat(item.price)}
								</TableCell>
							</TableRow>
						))}

						<TableRow>
							<TableCell colSpan={1}></TableCell>
							<TableCell colSpan={1}></TableCell>
							<TableCell align="right">{ccyFormat(cartTotal)}</TableCell>
							<TableCell colSpan={1}>סה"כ</TableCell>
						</TableRow>
						<TableRow>
							<TableCell colSpan={1}></TableCell>
							<TableCell colSpan={1}></TableCell>
							<TableCell align="right">{ccyFormat(taxRate * cartTotal)}</TableCell>
							<TableCell> מע"מ{`${(taxRate * 100).toFixed(0)} %`}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell colSpan={1}></TableCell>
							<TableCell colSpan={1}></TableCell>
							<TableCell align="left">{ccyFormat(taxRate * cartTotal + cartTotal)}</TableCell>
							<TableCell colSpan={2}>סה"כ אחרי מע"מ</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
			{/* <button className="containerbtn " onClick={handleOrder}>חזרה לתפריט </button> */}
			<div className="paybtn">
				<button className="containerbtn paybtnpaypal " onClick={handleOrder}>
					לתשלום{" "}
					{show ? (
						<PayPalButtons className="payPalPayBox" style={{ layout: "vertical" }} createOrder={createOrder} onApprove={onApprove} />
					) : null}
				</button>
			</div>
			{openSignIn && <SigninPage openSignIn={openSignIn} setOpenSignIn={setOpenSignIn} />}
			{ErrorMessage.length > 0 ? (
				<SomethingWentWrong openSomethingWentWrong={openSomethingWentWrong} setOpenSomethingWentWrong={setOpenSomethingWentWrong} />
			) : null}
		</div>
	);
}
