/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/

import React from 'react';


import './header.css'
/*****************************************
 * * CREATE REACT FUNCTION COMPONENT
 *****************************************/


// pascal case
function Header(props) {
  const style = {color:props.color};
  return (
    <header className="header" style={style}>
      <h1>Header</h1>
    </header>
  );
}

export default Header;
