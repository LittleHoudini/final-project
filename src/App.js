/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/

import React from 'react';
import Main from './components/main/Main'
import Footer from './components/footer/Footer'
import Navbar1 from './components/navbar/Navbar1'

/*****************************************
 * * CREATE REACT FUNCTION COMPONENT
 *****************************************/


// pascal case
function App() {
  return (
   <div className="app">
     <Navbar1 fixed="top" />
      <Main />
      <Footer />
   </div>
  );
}

export default App;