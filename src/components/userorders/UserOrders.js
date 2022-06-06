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
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" style={{backgroundColor:'#ca7275', color: 'white',}}>
            {docs.date}
        </TableCell>
        <TableCell align="right">{ccyFormat(docs.cartTotal)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Ingredients</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Price Per Unit</TableCell>
                    <TableCell align="right">Total ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {docs.orders.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell component="th" scope="row">{item.title}</TableCell>
                      <TableCell component="th" scope="row">{item.ing && convertJSON(item.ing)}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell align="right">{ccyFormat(item.price)}</TableCell>
                      <TableCell align="right">{ccyFormat(item.itemTotal)}</TableCell>
                      
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