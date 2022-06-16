import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function SomethingWentWrong({openSomethingWentWrong,setOpenSomethingWentWrong}) {
  

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

  const handleClose = () => {
    setOpenSomethingWentWrong(false);
  };

  return (
    <div>
      <Dialog
        open={openSomethingWentWrong}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Something Went Wrong."}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Sorry, something went wrong. Please try again, or refresh the page. If you keep seeing this message, please contact us.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            CLOSE
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
