import { useState, useEffect, useContext } from "react";
import { fetchUserOrders } from "../../../firebase/Orders";
import { UserContext } from "../../../App";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import uuid from "react-uuid";
import UserOrders from "../../userorders/UserOrders";

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

export default function UserOrdersPage() {
	const currentUser = useContext(UserContext);
	const [orderHistory, setOrderHistory] = useState([]);
	const [search, setSearch] = useState("");

	useEffect(() => {
		let isMounted = true;
		//make sure there is user logged in
		if (currentUser) {
			fetchUserOrders(currentUser)
				.then(res => {
					//if component did mount, set res to state
					if (isMounted) {
						setOrderHistory(res);
					}
				})
				.catch(err => console.log(err));
		}
		//component did unmount
		return () => {
			isMounted = false;
		};
	}, [currentUser]);

	if (orderHistory.length === 0) return <p>You dont have Orders yet</p>;

	return (
		<div className="myOrdersPage">
			<div className="titleDiv">
				<h1> ההזמנות שלי</h1>
				<p style={{marginRight: "0px"}}>לחיפוש הזמנה נא הכנס את מספר ההזמנה/תאריך/סטטוס בשורה החיפוש</p>
				<input placeholder="Search" type="text" onChange={e => setSearch(e.target.value)} value={search} />
			</div>
			<TableContainer component={Paper}>
				<Table aria-label="collapsible table">
					<TableHead>
						<TableRow>
							<TableCell />
							<TableCell>ORDER ID</TableCell>
							<TableCell>DATE ORDERED</TableCell>
							<TableCell>STATUS</TableCell>

							<TableCell align="right">Price For Order</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{search === ""
							? orderHistory.map(docs => {
									// docs => each doc represents user order history
									return <UserOrders key={uuid()} docs={docs} />;
							  })
							: orderHistory
									.filter(
										docs => formatDate(docs.date.toDate()).includes(search) || docs.orderID.toLowerCase().includes(search.toLowerCase()) || docs.status.toLowerCase().includes(search.toLowerCase())
									)
									.map(docs => {
										return <UserOrders key={uuid()} docs={docs} />;
									})}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
}
