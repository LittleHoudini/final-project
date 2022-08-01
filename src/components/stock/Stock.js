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
        { field: 'count', headerName: 'מלאי' },
        { field: 'name', headerName: 'שם המוצר'},
        { field: 'id', headerName: 'ID'},
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
            console.log(res)
            setItems(res);
        }
        )
        .catch((err) => console.log(err))
    },[])

  return (
<div className="wrapper55">
  <div className="wrappershoppingcart55">
  <div  className="reportformbox"  style={{ height: 700, width: 1000 }}>
      <DataGrid
        className="inside-row"
        rows={items}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        components={{
          Toolbar: CustomToolbar,
        }}
      />
    </div>
  </div>
</div>
  );
}
