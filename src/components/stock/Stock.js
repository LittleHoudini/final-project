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
    <div className="shoppingCartBox">
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
       
        { field: 'price', headerName: 'Price', width: 150},
        { field: 'count', headerName: 'Available', width:  150 },
        { field: 'name', headerName: 'Product Name', width: 150 },
        { field: 'id', headerName: 'ID', width: 100 },
      ];
    const [items, setItems] = useState([
        {
            count: "",
            id: "",
            price: "",
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
    <div  className="shoppingCartBox" style={{ height: 700, width: '100%' }}>
      <DataGrid
        className="reportform"
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
  );
}
