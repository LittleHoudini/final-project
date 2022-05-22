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
import '../button/btn.css';
import Styles from './ingredients.module.css';
import { doc, updateDoc } from "firebase/firestore";
import { decrement, increment } from 'firebase/database';

/*****************************************
 * * CREATE REACT FUNCTION COMPONENT
 *****************************************/


//Creates a square where all the product info will be shown
//with title, image, text, price as data
export default function Ingredients({title,image,includes,open,setOpen}) {
    const handleClose = () => {
      setOpen(false);
    };




    const [values,setValues] = useState([includes]);


    
  return (
    <div>
      <Dialog  open={open} onClose={handleClose}>
      {/* add product name for every dish */}
        <DialogTitle className={Styles.ingredientsTitle}>{title} </DialogTitle> 
        <DialogContent className={Styles.ingredientsContent}>
        <img className={Styles.ingredients} src={image}></img>
          {/* add image for every dish */}
          <DialogContentText>
        {Object.entries(includes).map(([key, value]) => {
          
          return (
            <DialogContentText className={Styles.ingredientsContainer} key={key}>
              <div className={Styles.ingredientsList}>
              {key}
              </div>
              <div className={Styles.ingredientsBtns}>
              {/* onClick={() => setValues({...values, [key]: value-1})} */}
              <button className={Styles.minusBtn} id={key}>-</button>
              <input className={Styles.countInput} value={values[key]} placeholder={value} id={key} />

              <button className={Styles.plusBtn} id={key}>+</button>
              {console.log("values " , values)}
              </div>
            </DialogContentText>
          );
        })
        }

         </DialogContentText>
          <TextField autoFocus margin="dense" id="name" label="הערות למנה" type="email" fullWidth variant="standard"/>
        </DialogContent>
        <DialogActions>
          <button className="closebtn" onClick={handleClose}>X</button>
        
        </DialogActions>
      </Dialog>
    </div>
  );
}
