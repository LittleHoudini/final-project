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
import {updateItemsAmount,canUpdateItem} from '../../firebase/Admin';
import uuid from "react-uuid";

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
	];
	const [items, setItems] = useState([
		{
			count: "0",
			id: "0",
			name: "0",
		},
	]);

	const [num, setNum] = useState("");
	const [error, setError] = useState("");
	const [clicked, setClicked] = useState(false);
  const[id, setId] = useState("");

	useEffect(() => {
    let isMounted = true;
    if(isMounted){
      getItems("Item")
			.then(res => {
				setItems(res);
			})
			.catch(err => console.log(err));
    }

		return () => {
      isMounted = false;
      setItems([{}])
    };
	}, [clicked]);

	const handleSubmit = async (e, todo) => {
		e.preventDefault();
    if(checkInput(e)){
      setError("");
      if(todo === "הוספה"){
        const update = await updateItemsAmount(id,Number(num))
        setClicked(prev => !prev);
      }
      else{
        const canUpdate = await canUpdateItem(id,Number(num));
        if(canUpdate){
          const update = await updateItemsAmount(id,Number(-num))
          setClicked(prev => !prev);
        }
        else{
          setError("לא ניתן לבצע פעולה זאת")
          return;
        }
      }
    }
	};

  const checkInput = (e) => {
    e.preventDefault();
    if(id === ""){
      setError("ID לא תקין")
      return false;
    }
    if(num === ""){
      setError("כמות לא תקינה")
      return false;
    }
    return true;
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
        
				<DataGrid
          getRowId={(row) => uuid()}
					rows={items}
					columns={columns}
					xs={10}
					pageSize={10}
					rowsPerPageOptions={[10]}
					checkboxSelection
					components={{
						Toolbar: CustomToolbar,
					}}
				/>
			</div>
		</div>
	);
}
