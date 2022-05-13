// import useInput from "./useInput"
import React, {useState} from "react";
import {signIn} from "../../firebase/Users";
import { useContext } from "react";
import { UserContext } from '../../App';
import {Navigate as Redirect} from "react-router-dom";
import './sign.css'
// import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

//Sign in form for new users
const Signin = ({open,setOpen}) => {
    const currentUser = useContext(UserContext);
    const [signed, setSigned] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword]=  useState("")    
    if(currentUser && signed){
        return <Redirect to={{pathname: '/'}}/>
    }
    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>SIGN IN</DialogTitle>
          <DialogContent>
            <form onSubmit={(e) => {signIn(e,{email, password}); setSigned(true)}}>                
                <TextField className="textfieldform"  autoFocus margin="dense" label="Email Address" type="email" fullWidth variant="standard" value={email} onChange={event => {setEmail(event.target.value)}}/>
                <TextField className="textfieldform" autoFocus margin="dense" label="password" type="password" fullWidth variant="standard" value={password} onChange={event => {setPassword(event.target.value)}}/>
                <button  className="formbtn"   type="submit">Sign in</button >
             </form>
          </DialogContent>
          <DialogActions>
            <button onClick={() => setOpen(false)}>X</button >
          </DialogActions>
        </Dialog>
    );
};

export default Signin;