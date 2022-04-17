/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/

import React from 'react';


import Header from './components/header/Header'
import Main from './components/main/Main'
import Footer from './components/footer/Footer'



/*****************************************
 * * CREATE REACT FUNCTION COMPONENT
 *****************************************/


// pascal case
function App() {
  return (
   <div className="app">
      <Header />
      <Main />
      <Footer />
   </div>
  );
}

export default App;