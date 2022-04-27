/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/
import React, { useState,useEffect,createContext } from 'react';
import Routing from './components/routing/Routing';
import Footer from './components/footer/Footer';
import getFirebase from './firebase/Firebase';
// import Signout from './components/authentication/Signout';


/*****************************************
 * * CREATE REACT FUNCTION COMPONENT
 *****************************************/
//context for state
export const UserContext = createContext()

function App()  {
  // Create a currentUser state
  const [currentUser, setCurrentUser] = useState(null);
  // Listen to onAuthStateChanged
  useEffect(() => {
      const firebase = getFirebase();
      if (firebase) {
        console.log("db connected")
        firebase.auth().onAuthStateChanged((authUser) => {
          if (authUser) {
            setCurrentUser(authUser.email);
          } else {
            setCurrentUser(null);
          }
        });
      }
    }, []);
  return (
    <UserContext.Provider value={currentUser}>
      <div className="app">
        <h1>{currentUser ? `The current logged in user is: ${currentUser}` : "No user is currently logged in."}</h1>
        <Routing currentUser={currentUser}/>
        <Footer/>
      </div>
    </UserContext.Provider>
  );

}

export default App;