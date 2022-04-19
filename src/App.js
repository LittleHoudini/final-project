/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/

import React from 'react';
import Footer from './components/footer/Footer'
import Navbar1 from './components/navbar/Navbar1'

/*****************************************
 * * CREATE REACT FUNCTION COMPONENT
 *****************************************/


// pascal case
function App() {
  return (
   <div className="app">
     <Navbar1 />
     <Footer />
   </div>
  );
}

export default App;