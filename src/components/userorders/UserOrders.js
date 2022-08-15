import { useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import './userorders.css';

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

const convertJSON = (obj) => {
  let str = JSON.stringify(obj)
  return str.replace(/{|},|}/g, "\n").replace(/\[|\]|"/g, "").replace(/,/g, ',\n')
}


export default function UserOrders({docs}) {
  const [open, setOpen] = useState(false);

  return (
    <>
   
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell style={{backgroundColor:'#84A98c', color: 'white',}}>
          <IconButton
            aria-label="expand row"
            size="large"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        
    
        <TableCell   component="th" scope="row" style={{backgroundColor:'#84A98c', color: 'white',}}>
            {docs.orderID}
        </TableCell>
        <TableCell component="th" scope="row" style={{backgroundColor:'#84A98c', color: 'white',}}>
            {docs.date}
        </TableCell>
        <TableCell component="th" scope="row" style={{backgroundColor:'#84A98c', color: 'white',}}>
            {docs.status}
        </TableCell>
        <TableCell style={{backgroundColor:'#84A98c', color: 'white',}}  component="th" align="right">
          {ccyFormat(docs.cartTotal)}
          </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell style={{color:'white'}}   align="right">סה"כ ($)</TableCell>
                    <TableCell style={{color:'white'}}  align="right">מחיר ליחידה</TableCell>
                    <TableCell style={{color:'white'}}  align="right">כמות</TableCell>
                    <TableCell style={{color:'white'}} >פריטים</TableCell>
                    <TableCell style={{color:'white'}} >שם</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {docs.orders.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell align="right">{ccyFormat(item.itemTotal)}</TableCell>
                      <TableCell align="right">{ccyFormat(item.price)}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell  scope="row">{item.ing && convertJSON(item.ing)}</TableCell>
                      <TableCell  scope="row">{item.title}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
  
}