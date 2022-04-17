/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/

import React from 'react';


import './footer.css'
/*****************************************
 * * CREATE REACT FUNCTION COMPONENT
 *****************************************/

function getDate() {

  let date = new Date();
  return date.getFullYear();
}

// pascal case
function Footer() {
  const name = 'Footer';
  return (
    <footer className="footer">
      {/* // interpolation */}
      <p>&copy; {getDate()} {name}</p>
    </footer>
  );
}

export default Footer;
