import * as React from 'react';
import { useEffect,useState } from 'react';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import { getItems } from '../../firebase/Orders';
import './stock.css';


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
    { field: 'id',minWidth: 150, headerName: 'ID'},
    { field: 'name',minWidth: 150, headerName: 'שם המוצר'},
    { field: 'count' ,minWidth: 150, headerName: 'מלאי' },
  ];
    const [items, setItems] = useState([
        {
            count: "",
            id: "",
            name: "",
        }
    ])

    useEffect(() => {
        getItems("Item")
        .then((res)=> {
            setItems(res);
        }
        )
        .catch((err) => console.log(err))
        return () => setItems([{}])
    },[])

  return (
<div className="wrapper55">

<div className="titleDiv">
				<h1 className="titleDiv"> מלאי</h1>
				<p>למיון תוצאות דו"ח יש ללחוץ על כותרות הטבלה</p>
				</div>
  <div  className="reportformbox" >
      <DataGrid
        rows={items}
        columns={columns }item xs={10}
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
