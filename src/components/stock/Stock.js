import * as React from "react";
import { useEffect, useState } from "react";
import {
	DataGrid,
	GridToolbarContainer,
	GridToolbarColumnsButton,
	GridToolbarFilterButton,
	GridToolbarExport,
	GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { getItems } from "../../firebase/Orders";
import "./stock.css";
import { updateItemsAmount, canUpdateItem } from "../../firebase/Admin";
import uuid from "react-uuid";
import Box from "@mui/material/Box";

import { darken, lighten } from "@mui/material/styles";

const getBackgroundColor = (color, mode) => (mode === "dark" ? darken(color, 0.6) : lighten(color, 0.6));

const getHoverBackgroundColor = (color, mode) => (mode === "dark" ? darken(color, 0.5) : lighten(color, 0.5));
function CustomToolbar() {
	return (
		<div className="report-toolbar">
			<GridToolbarContainer>
				<GridToolbarColumnsButton />
				<GridToolbarFilterButton />
				<GridToolbarDensitySelector />
				<GridToolbarExport />
			</GridToolbarContainer>
		</div>
	);
}

export default function CustomToolbarGrid() {
	const columns = [
		{ field: "id", minWidth: 150, headerName: "ID" },
		{ field: "name", minWidth: 150, headerName: "שם המוצר" },
		{ field: "count", minWidth: 150, headerName: "מלאי" },
		{ field: "status", minWidth: 150, headerName: "סטטוס" },
	];
	const [items, setItems] = useState([
		{
			count: "0",
			id: "0",
			name: "0",
			status: "",
		},
	]);

	const [num, setNum] = useState("");
	const [error, setError] = useState("");
	const [clicked, setClicked] = useState(false);
	const [id, setId] = useState("");

	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			getItems("Item")
				.then(res => {
					setItems(res);
				})
				.catch(err => console.log(err));
		}

		return () => {
			isMounted = false;
			setItems([{}]);
		};
	}, [clicked]);

	const handleSubmit = async (e, todo) => {
		e.preventDefault();
		if (checkInput(e)) {
			setError("");
			if (todo === "הוספה") {
				const update = await updateItemsAmount(id, Number(num));
				setClicked(prev => !prev);
			} else {
				const canUpdate = await canUpdateItem(id, Number(num));
				if (canUpdate) {
					const update = await updateItemsAmount(id, Number(-num));
					setClicked(prev => !prev);
				} else {
					setError("לא ניתן לבצע פעולה זאת");
					return;
				}
			}
		}
	};

	const checkInput = e => {
		e.preventDefault();
		if (id === "") {
			setError("ID לא תקין");
			return false;
		}
		if (num === "") {
			setError("כמות לא תקינה");
			return false;
		}
		return true;
	};

	const addStatusToItem = obj => {
		let arr = [];
		obj.map((item) => {
			if(item.count < 100){
				item.status = "VeryLow"
			}
			else if(item.count > 100 && item.count < 250){
				item.status = "Low"
			}
			else{
				item.status = "Good"
			}
			arr.push(item);
		});
		return arr;
	}

	return (
		<div className="wrapper55">
			<>
				{error ? <label style={{ color: "red" }}>{error}</label> : null}
				<br />
				<label>ID</label>
				<input
					type="text"
					value={id}
					onChange={e => setId(e.target.value)}
					onKeyPress={event => {
						if (!/[0-9]/.test(event.key)) {
							event.preventDefault();
						}
					}}
				/>
				<br />
				<label>כמות</label>
				<input
					type="text"
					value={num}
					onChange={e => setNum(e.target.value)}
					onKeyPress={event => {
						if (!/[0-9]/.test(event.key)) {
							event.preventDefault();
						}
					}}
				/>
				<br />
				<button onClick={e => handleSubmit(e, "הוספה")}>הוספה</button>
				<button onClick={e => handleSubmit(e, "הסרה")}>הסרה</button>
			</>
			<div className="reportformbox">
				<Box
					sx={{
						height: 700,
						width: "100%",
						"& .super-app-theme--Good": {
							bgcolor: theme => getBackgroundColor(theme.palette.success.main, theme.palette.mode),
							"&:hover": {
								bgcolor: theme => getHoverBackgroundColor(theme.palette.success.main, theme.palette.mode),
							},
						},
						"& .super-app-theme--Low": {
							bgcolor: theme => getBackgroundColor(theme.palette.warning.main, theme.palette.mode),
							"&:hover": {
								bgcolor: theme => getHoverBackgroundColor(theme.palette.warning.main, theme.palette.mode),
							},
						},
						"& .super-app-theme--VeryLow": {
							bgcolor: theme => getBackgroundColor(theme.palette.error.main, theme.palette.mode),
							"&:hover": {
								bgcolor: theme => getHoverBackgroundColor(theme.palette.error.main, theme.palette.mode),
							},
						},
					}}
				>
					<DataGrid
						getRowId={row => uuid()}
						rows={addStatusToItem(items)}
						getRowClassName={(params) => `super-app-theme--${params.row.status}`}
						columns={columns}
						xs={10}
						pageSize={10}
						rowsPerPageOptions={[10]}
						checkboxSelection
						components={{
							Toolbar: CustomToolbar,
						}}
					/>
				</Box>
			</div>
		</div>
	);
}
