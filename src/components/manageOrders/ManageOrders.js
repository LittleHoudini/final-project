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



export function ManageOrders({docs}) {
  
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell style={{backgroundColor:'#84A98c', color: 'white',}}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        

        <TableCell align="right" style={{backgroundColor:'#84A98c', color: 'white',}}>{ccyFormat(docs.cartTotal)}</TableCell>
        <TableCell component="th" scope="row" style={{backgroundColor:'#84A98c', color: 'white',}}>
            {docs.date}
        </TableCell>
        <TableCell component="th" scope="row" style={{backgroundColor:'#84A98c', color: 'white',}}>
            {docs.status}
        </TableCell>
        <TableCell component="th" scope="row" style={{backgroundColor:'#84A98c', color: 'white',}}>
            {docs.orderID}
        </TableCell>
        <TableCell></TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table className='orderBoxInside' size="small" aria-label="purchases">



              <TableHead className='tableHeaderBox'>
                  <TableRow>
                  <TableCell  style={{ color:'white'}} align="right">עיר</TableCell>
                    <TableCell  style={{ color:'white'}} align="right">רחוב</TableCell>
                    <TableCell  style={{ color:'white'}} align="right">מספר בית</TableCell>
                    <TableCell  style={{ color:'white'}} align="right">מספר טלפון</TableCell>
                    <TableCell  style={{ color:'white'}}>אימייל</TableCell>
                    <TableCell  style={{ color:'white'}}>שם פרטי</TableCell>
                    <TableCell   style={{ color:'white'}}align="right">שם משפחה</TableCell>
                    
                  
                  </TableRow>
                </TableHead>
                    <TableBody className='tableBodyBox'>
                        <TableRow key={docs.email}> 
                            <TableCell align="right">{docs.city}</TableCell>
                            <TableCell>{docs.street}</TableCell>
                            <TableCell align="right">{docs.homeNumber}</TableCell>
                            <TableCell>{docs.phoneNumber}</TableCell>
                            <TableCell component="th" scope="row">{docs.email}</TableCell>
                            <TableCell component="th" scope="row">{docs.firstName}</TableCell>
                            <TableCell>{docs.lastName}</TableCell>
                      </TableRow>
                    </TableBody>
                
                <TableHead className='tableHeaderBox'>
                  <TableRow >
                  <TableCell colSpan={1} ></TableCell>
                    <TableCell style={{ color:'white'}} align="right">סהכ ($)</TableCell>
                    <TableCell  style={{ color:'white'}} align="right">מחיר ליחידה</TableCell>
                    <TableCell   style={{ color:'white'}} align="right">כמות</TableCell>
                    <TableCell  style={{ color:'white'}} colSpan={2}>רכיבים</TableCell>
                    <TableCell  style={{ color:'white'}} colSpan={1}>שם מוצר</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody >
                  {docs.orders.map((item) => (
                    <TableRow className='' key={item.id}>
                       <TableCell colSpan={1} ></TableCell>
                       <TableCell align="right">{ccyFormat(item.itemTotal)}</TableCell>
                       <TableCell align="right">{ccyFormat(item.price)}</TableCell>
                       <TableCell>{item.quantity}</TableCell>
                      <TableCell colSpan={2}  component="th" scope="row">{item.ing && convertJSON(item.ing)}</TableCell>
                      <TableCell colSpan={1} component="th" scope="row">{item.title}</TableCell>
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