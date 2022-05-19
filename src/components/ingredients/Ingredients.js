/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/

// import { Card, Button } from "react-bootstrap";
import { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

/*****************************************
 * * CREATE REACT FUNCTION COMPONENT
 *****************************************/

//Creates a square where all the product info will be shown
//with title, image, text, price as data
export default function Ingredients({includes,open,setOpen}) {
    const handleClose = () => {
      setOpen(false);
    };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
        {Object.entries(includes).map(([key, value]) => {
          return (
            <DialogContentText key={key}>
              {key} : {value.toString()}
            </DialogContentText>
          );
        })}
          <TextField autoFocus margin="dense" id="name" label="Email Address" type="email" fullWidth variant="standard"/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Exit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
