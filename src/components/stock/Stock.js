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
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function CustomToolbarGrid() {
    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'name', headerName: 'Product Name', width: 200 },
        { field: 'count', headerName: 'Available', width: 200 },
        { field: 'price', headerName: 'Price', width: 200 },
        
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
<<<<<<< HEAD
    <div style={{ height: 400, width: '100%' }}>
=======
    <div style={{ height: 700, width: '100%' }}>
>>>>>>> a21fa53bf57510a2f82749c7abc452b0277f514f
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
