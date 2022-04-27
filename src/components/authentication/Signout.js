
import React from "react";
import {Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { signOut } from "../../firebase/Users";

const Signout = () => {
  return (
    <Nav.Link as={Link} to={'/'} onClick={() => signOut()}>SIGN OUT</Nav.Link>
  );
};

export default Signout;

