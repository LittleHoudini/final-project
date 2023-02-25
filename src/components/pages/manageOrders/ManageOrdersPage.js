import { useState, useEffect, Fragment,useContext } from "react";
import { UserContext } from "../../../App";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import uuid from "react-uuid";
import { ManageOrders } from "../../manageOrders/ManageOrders";
import { handleStockAfterOrder, checkStockAvailbility,HandleOrderStatus,fetchAllPendingOrders } from "../../../firebase/Orders";
import { CSVLink } from "react-csv";
import "./manageorderspage.css";
export default function ManageOrdersPage() {
	const currentUser = useContext(UserContext);
	const [pendingOrders, setPendingOrders] = useState([]);
	const [docsUpdated, setDocsUpdated] = useState(false);
	const [error, setError] = useState(false);

	const getItemQuantity = items => {
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

	function padTo2Digits(num) {
		return num.toString().padStart(2, "0");
	}

	function formatDate(date) {
		return (
			[padTo2Digits(date.getDate()), padTo2Digits(date.getMonth() + 1), date.getFullYear()].join("/") +
			", " +
			[date.getHours(), date.getMinutes()].join(":")
		);
	}

	const headers = [
		{ label: 'First Name', key: 'firstName' },
		{ label: 'Last Name', key: 'lastName' },
		{ label: 'Phone Number', key: 'phoneNumber' },
		{ label: 'City', key: 'city' },
		{ label: 'Street', key: 'street' },
		{ label: 'Home Number', key: 'homeNumber' },
		{ label: 'Email', key: 'email' },
		{ label: 'Cart Total', key: 'cartTotal' },
		{ label: 'Order ID', key: 'orderID' },
		{ label: 'Item Title', key: 'orders.title' },
		{ label: 'Item ID', key: 'orders.id' },
		{ label: 'Item Total', key: 'orders.itemTotal' },
		{ label: 'Item Price', key: 'orders.price' },
		{ label: 'Item Quantity', key: 'orders.quantity' },
	  ];


	const generateCsvData = (docs) => {
		const { firstName, lastName, phoneNumber, city, street, homeNumber, email, cartTotal ,orderID ,orders } = docs;
		const data = [
			{ firstName,
			  lastName,
			  phoneNumber,
			  city,
			  street,
			  homeNumber,
			  email: email,
			  cartTotal,
			  orderID,
			}
		]
		orders.map(obj => {
			data.push({orders:obj})
		})

		return data;
	}

  
	const handleStatusChange = async (docs, status) => {
		//handle if order is approved 
		if (status === "Approved") {
			console.log("Approved");
			const canUpdateStock = await checkStockAvailbility(getItemQuantity(docs.orders));
			if (canUpdateStock) {
				setError("");
				const res = await HandleOrderStatus(docs.orderID, docs.email, status);
				handleDocsChange();
				const handleUpdate = await handleStockAfterOrder(getItemQuantity(docs.orders));
			} else {
				setError(`Can't approve order ${docs.orderID}, Stock can not be updated, Please check stock status`);
			}
      //handle if order is declined
		} else {
			const res = await HandleOrderStatus(docs.orderID, docs.email, status);
			handleDocsChange();
		}
	};

	const handleDocsChange = () => {
		setDocsUpdated(prev => !prev);
	};

	function formatDate(date) {
		return [
		  padTo2Digits(date.getDate()),
		  padTo2Digits(date.getMonth() + 1),
		  date.getFullYear(),
		].join('_') +   "-" +  [date.getHours(),
		date.getMinutes()].join(";");
	  }

	//use effect for pending orders with interval, updates every 1 minute
	const MINUTE_MS = 60000;
	useEffect(() => {
		let isMounted = true;
		//make sure there is user logged in
		const interval = setInterval(() => {
			if (currentUser) {
				console.log("starting fetch");
				fetchAllPendingOrders()
					.then(res => {
						//if component did mount, set res to state
						if (isMounted) {
							const sortedOrders = res.sort(function (a, b) {
								return formatDate(a.date.toDate()).localeCompare(formatDate(b.date.toDate()));
							});

							setPendingOrders(sortedOrders);
						}
					})
					.catch(err => console.log(err));
			}
		}, MINUTE_MS);
		//component did unmount
		return () => {
			isMounted = false;
			clearInterval(interval);
			// setDocsUpdated(false);
		};
	}, [currentUser, docsUpdated]);

	//regular use effect for pending orders
	useEffect(() => {
		let isMounted = true;
		//make sure there is user logged in
		if (currentUser) {
			console.log("starting fetch");
			fetchAllPendingOrders()
				.then(res => {
					//if component did mount, set res to state
					if (isMounted) {
						const sortedOrders = res.sort(function (a, b) {
							return formatDate(a.date.toDate()).localeCompare(formatDate(b.date.toDate()));
						});

						setPendingOrders(sortedOrders);
					}
				})
				.catch(err => console.log(err));
		}

		//component did unmount
		return () => {
			isMounted = false;
		};
	}, [currentUser, docsUpdated]);

	if (pendingOrders.length === 0) return <p style={{textAlign: "center"}}>אין הזמנות פעילות</p>;

	return (
		<div className="wrapper22">
			<TableContainer component={Paper}>
				<Table aria-label="collapsible table">
					<TableHead>
						<TableRow className="ordersTitle">
							<TableCell />
							<TableCell style={{ color: "white" }} align="right">
								סה״כ{" "}
							</TableCell>
							<TableCell style={{ color: "white" }}>תאריך </TableCell>
							<TableCell style={{ color: "white" }}>סטטוס</TableCell>
							<TableCell style={{ color: "white" }}>מספר הזמנה</TableCell>
						</TableRow>
					</TableHead>
					<TableBody className="wrappershoppingcart">
						{error ? <label style={{ color: "red" }}>{error}</label> : null}
						{pendingOrders.map(docs => {
							// docs => each doc represents user order history
							return (
								<Fragment key={uuid()}>
									<ManageOrders key={uuid()} docs={docs} />
									<TableRow key={uuid()}>
										<TableCell className="btnArea">
											{/* <button onClick={() => handleStatusChange(docs, "Approved")} className="containerbtn1 btnApprove">
												לאשר הזמנה
											</button> */}
											{/* <button onClick={() => handleStatusChange(docs, "Canceled")} className="containerbtn1">
												לבטל הזמנה
											</button> */}
											<button className="containerbtn1 btnApprove">
												<CSVLink  onClick={() => handleStatusChange(docs, "Approved")} data={generateCsvData(docs)} headers={headers} target="_blank" filename={`ApprovedOrder_${formatDate(docs.date.toDate())}_${docs.orderID}.csv`}>לאשר הזמנה</CSVLink>
											</button>
											<button className="containerbtn1 btnCancel">
												<CSVLink  onClick={() => handleStatusChange(docs, "Canceled")} data={generateCsvData(docs)} headers={headers} target="_blank" filename={`CanceledOrder_${formatDate(docs.date.toDate())}_${docs.orderID}.csv`}>לבטל הזמנה</CSVLink>
											</button>
										</TableCell>
									</TableRow>
								</Fragment>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
}
