import React, { useEffect, useState } from "react";
import WeeklyChart from "../chart/WeeklyChart";
import { Chart } from "../chart/Chart";
import AddProduct from "../addproduct/AddProduct";
import Stock from "../stock/Stock";
import ManageOrdersPage from "../pages/manageOrders/ManageOrdersPage";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { getItemsBelowNum, getUrgentOrders } from "../../firebase/Admin";
import uuid from "react-uuid";
export const AdminPanel = () => {
	const [items, setItems] = useState([
		{
			count: "",
			id: "",
			name: "",
		},
	]);
	const [pendingOrders, setPendingOrders] = useState([]);
	useEffect(() => {
		getItemsBelowNum(100)
			.then(res => {
				setItems(res);
			})
			.catch(err => console.log(err));
		return () => setItems([{}]);
	}, []);

	useEffect(() => {
		getUrgentOrders()
			.then(res => {
				console.log(res);
				setPendingOrders(res);
			})
			.catch(err => console.log(err));
		return () => setPendingOrders([{}]);
	}, []);

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
				<Stack sx={{ width: "100%" }} spacing={2}>
					{items.map(item => {
						return (
							<Alert key={uuid()} severity="warning" onClose={() => dismissItemNotification(item.id)}>
								הכמות הנוכחית של {item.name} (מזהה מוצר-{item.id}) היא : {item.count}
							</Alert>
						);
					})}
					{pendingOrders.map(order => {
						return (
							<Alert key={uuid()} severity="warning" onClose={() => dismissUrgenOrderNotification(order.id)}>
								Order {order.id} waiting above half an hour for confirmation , order belongs to Name : {order.firstName} {order.lastName},  Phone Number : {order.phoneNumber}
							</Alert>
						);
					})}
				</Stack>
				<div className="titleDiv">
					<h1 className="titleDiv"> ניהול הזמנות</h1>
					<p>התראות חדשות</p>
				</div>
				<div>
					{" "}
					<ManageOrdersPage />{" "}
				</div>
			</div>

			<div className="div2">
				<div className="titleDiv">
					<h1 className="titleDiv">דו"ח מכירות יומי </h1>
					<p>התראות חדשות</p>
				</div>
				<div>
					{" "}
					<WeeklyChart />
				</div>
			</div>

			<div className="div3">
				<div className="titleDiv">
					<h1 className="titleDiv">דו"ח מכירות יומי </h1>
					<p>התראות חדשות</p>
				</div>
				<div>
					<Chart />
				</div>
			</div>

			<div className="div4">
				<div className="titleDiv">
					<h1 className="titleDiv">דו"ח מכירות יומי </h1>
					<p>התראות חדשות</p>
				</div>
				<div className="b">
					{" "}
					<Stock />{" "}
				</div>
			</div>

			<div className="div5">
				<div className="titleDiv">
					<h1 className="titleDiv">דו"ח מכירות יומי </h1>
					<p>התראות חדשות</p>
				</div>
				<div>
					{" "}
					<AddProduct />{" "}
				</div>
			</div>
		</div>
	);
};
