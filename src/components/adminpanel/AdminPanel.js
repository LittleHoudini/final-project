import React, { useEffect, useState } from "react";
import WeeklyChart from "../chart/WeeklyChart";
import { Chart } from "../chart/Chart";
import AddProduct from "../addproduct/AddProduct";
import Stock from "../stock/Stock";
import ManageOrdersPage from "../pages/manageOrders/ManageOrdersPage";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { getItemsBelowNum, getUrgentOrders } from "../../firebase/Admin";
import uuid from "react-uuid";
import "./adminpanel.css";

export const AdminPanel = () => {
	const [items, setItems] = useState([
		{
			count: "",
			id: "",
			name: "",
		},
	]);
	const [pendingOrders, setPendingOrders] = useState([]);

	//fetching items with count below 100
	useEffect(() => {
		getItemsBelowNum(100)
			.then(res => {
				setItems(res);
			})
			.catch(err => console.log(err));
		return () => setItems([{}]);
	}, []);

	//fetching urgent orders
	useEffect(() => {
		getUrgentOrders()
			.then(res => {
				console.log(res);
				setPendingOrders(res);
			})
			.catch(err => console.log(err));
		return () => setPendingOrders([{}]);
	}, []);

	//notifications
	const dismissItemNotification = id => {
		const updatedItems = [...items].filter(item => item.id !== id);
		setItems(updatedItems);
	};

	const dismissUrgenOrderNotification = id => {
		const updateOrders = [...pendingOrders].filter(order => order.id !== id);
		setPendingOrders(updateOrders);
	};

	return (
		<div className="box">
			<div className="div1">
				<Stack className="AlertArea" sx={{ width: "100%" }} spacing={2}>
					{items.map(item => {
						return (
							<Alert className="Alert1" key={uuid()} severity="warning" onClose={() => dismissItemNotification(item.id)}>
								הכמות הנוכחית של {item.name} (מזהה מוצר-{item.id}) היא : {item.count}
							</Alert>
						);
					})}
					{pendingOrders.map(order => {
						return (
							<Alert key={uuid()} severity="warning" onClose={() => dismissUrgenOrderNotification(order.id)}>
								Order {order.id} waiting above half an hour for confirmation , order belongs to Name : {order.firstName} {order.lastName},
								Phone Number : {order.phoneNumber}
							</Alert>
						);
					})}
				</Stack>
				<div className="cardBox">
					<div className="titleDiv">
						<h1 className="titleDiv"> ניהול הזמנות</h1>
					</div>
					<div>
						{" "}
						<ManageOrdersPage />{" "}
					</div>
				</div>
			</div>
			<div className="div2">
				<div className="titleDiv">
					<h1 className="titleDiv">מכירות</h1>
				</div>
				<div>
					{" "}
					<WeeklyChart />
				</div>
			</div>

			<div className="div3">
				<div className="titleDiv">
					<h1 className="titleDiv">מכירות חודשי</h1>
				</div>
				<div>
					<Chart />
				</div>
			</div>

			<div className="div4">
				<div className="titleDiv">
					<h1 className="titleDiv">מלאי</h1>
				</div>
				<div className="b">
					{" "}
					<Stock />{" "}
				</div>
			</div>

			<div className="div5">
				<div className="titleDiv">
					<h1 className="titleDiv">הוספת מוצר חדש</h1>
				</div>
				<div>
					{" "}
					<AddProduct />{" "}
				</div>
			</div>
		</div>
	);
};
