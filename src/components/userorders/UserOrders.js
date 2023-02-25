import { useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import './userOrdersStyle.css';


function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

const convertJSON = (obj) => {
  let str = JSON.stringify(obj)
  return str.replace(/{|},|}/g, "\n").replace(/\[|\]|"/g, "").replace(/,/g, ',\n')
}

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function formatDate(date) {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join('/') +   ", " +  [date.getHours(),
  date.getMinutes()].join(":");
}


export default function UserOrders({docs}) {
  const [open, setOpen] = useState(false);

  return (
    <>
   
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell className={docs.status}>
          <IconButton
            aria-label="expand row"
            size="large"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        
    
        <TableCell   component="th" scope="row" className={docs.status}>
            {docs.orderID}
        </TableCell>
        <TableCell component="th" scope="row" className={docs.status}>
        {formatDate(docs.date.toDate())}
        </TableCell>
        <TableCell component="th" scope="row" className={docs.status}>
            {docs.status}
        </TableCell>
        <TableCell className={docs.status}  component="th" align="right">
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
                    <TableCell style={{color:'white',textAlign:"right"}}  align="right">סה"כ</TableCell>
                    <TableCell style={{color:'white',textAlign:"right"}}  align="right">מחיר ליחידה</TableCell>
                    <TableCell style={{color:'white',textAlign:"right"}}  align="right">כמות</TableCell>
                    <TableCell style={{color:'white',textAlign:"right"}} >פריטים</TableCell>
                    <TableCell style={{color:'white',textAlign:"right"}} >שם</TableCell>
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