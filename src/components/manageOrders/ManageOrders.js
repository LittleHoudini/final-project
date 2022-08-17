import { useState,useEffect } from 'react';
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
import "./manageorders.css"
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

export function ManageOrders({docs}) {
  
  const [open, setOpen] = useState(false);

  return (
   
    <>
 
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell className="header-table-main">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        

        <TableCell  className="header-table-details" component="th">
          {ccyFormat(docs.cartTotal)}
          </TableCell>
        <TableCell className="header-table-details" component="th" scope="row">
            {formatDate(docs.date.toDate())}
        </TableCell>
        <TableCell className="header-table-details" component="th" scope="row">
            {docs.status}
        </TableCell>
        <TableCell className="header-table-details" component="th" scope="row">
            {docs.orderID}
        </TableCell>
        

      </TableRow>
      <TableRow>
        <TableCell  style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse  in={open} timeout="auto" unmountOnExit>
            <Box  sx={{ margin: 1 }}>
             

              <Table  size="small" aria-label="purchases">
              {/* tableHeaderBox דריסה? */}
              <TableHead >
                  <TableRow>
                  <TableCell>עיר</TableCell>
                   <TableCell>רחוב</TableCell>
                    <TableCell>מספר בית</TableCell>
                    <TableCell>מספר טלפון</TableCell>
                    <TableCell>אימייל</TableCell>
                    <TableCell>שם פרטי</TableCell>
                    <TableCell colSpan={2}>שם משפחה</TableCell>
                    
                  
                  </TableRow>
                </TableHead>
                    <TableBody>
                        <TableRow key={docs.email}> 
                            <TableCell  >{docs.city}</TableCell>
                            <TableCell >{docs.street}</TableCell>
                            <TableCell  >{docs.homeNumber}</TableCell>
                            <TableCell>{docs.phoneNumber}</TableCell>
                            <TableCell  scope="row">{docs.email}</TableCell>
                            <TableCell  scope="row">{docs.firstName}</TableCell>
                            <TableCell >{docs.lastName}</TableCell>
                      </TableRow>
                    </TableBody>
                
                <TableHead >
                  <TableRow >
                  <TableCell colSpan={1} ></TableCell>
                    <TableCell align="right">סהכ </TableCell>
                    <TableCell  align="right">מחיר ליחידה</TableCell>
                    <TableCell    align="right">כמות</TableCell>
                    <TableCell colSpan={2}>רכיבים</TableCell>
                    <TableCell  colSpan={2}>שם מוצר</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {docs.orders.map((item) => (
                    <TableRow  key={item.id}>
                       <TableCell  colSpan={1} ></TableCell>
                       <TableCell >{ccyFormat(item.itemTotal)}</TableCell>
                       <TableCell >{ccyFormat(item.price)}</TableCell>
                       <TableCell  >{item.quantity}</TableCell>
                      <TableCell colSpan={2} scope="row">{item.ing && convertJSON(item.ing)}</TableCell>
                      <TableCell colSpan={1}></TableCell>
                      <TableCell colSpan={1} scope="row">{item.title}</TableCell>
                    </TableRow>
                  ))}
                <TableRow>
                </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
     
    </>


  );
}