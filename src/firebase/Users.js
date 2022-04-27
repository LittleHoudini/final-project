//IMPORTS
import getFirebase from "./Firebase";
import bcrypt from "bcryptjs/dist/bcrypt";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { Navigate as Redirect} from "react-router-dom";

//Firebase instance
const firebaseInstance = getFirebase();
  // sign up function
  export const signUp = async (event,...userinfo) => {
    //cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.
    event.preventDefault();
    const { email,password } = userinfo[0]
    try {
        if (firebaseInstance) {
            //Adds the email user, so the same email cant be registered again.
            const user = await firebaseInstance.auth().createUserWithEmailAndPassword(email, password)
            //Gets db
            const db = getFirestore();
            //Hashed password
            const salt = bcrypt.genSaltSync(10);
            const hashed_password = bcrypt.hashSync(password, salt);
            //Adds the user info to our database 
            const res = await setDoc(doc(db,'Person', email),{
                email : email,
                password : hashed_password
            });
            alert(`Welcome ${email}!`);
        }
    } catch (error) {
        console.log("ERROR! : ", error);
        alert(error.message);
    }
};

// sign in function
export const signIn = async (event, ...userinfo) => {
    //cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.
    event.preventDefault();
    const { email,password } = userinfo[0]
    try {
        if (firebaseInstance) {
        const user = await firebaseInstance
            .auth()
            .signInWithEmailAndPassword(email, password);
        console.log("in signIn function ",window.location.href);
        alert("Welcome back!");   
        }
    } catch (error) {
        console.log("error", error);
    // NEED TO FIX REDIRECT HERE NOT WORKING!!!
    }finally{
        return <Redirect to={{pathname: '/'}}/>
    }
};


//Sign out function for users
export const signOut = async () => {
    try {
        if (firebaseInstance) {
            await firebaseInstance.auth().signOut();
            alert("Successfully signed out!");
        }
    }
    catch (error) {
        console.log("error", error);
    }
};