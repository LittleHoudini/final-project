//IMPORTS
import getFirebase from "./Firebase";
import bcrypt from "bcryptjs/dist/bcrypt";
import { doc, setDoc, getDoc, addDoc, getFirestore, collection } from "firebase/firestore";

//Firebase instance
const firebaseInstance = getFirebase();

// sign up function
export const signUp = async (event, ...userinfo) => {
	//cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.
	event.preventDefault();
	console.table(userinfo[0]);
	const { firstName, lastName, phoneNumber, city, street, homeNumber, email, password } = userinfo[0];
	try {
		if (firebaseInstance) {
			//Adds the email user, so the same email cant be registered again.
			const user = await firebaseInstance.auth().createUserWithEmailAndPassword(email, password);
			//Gets db
			const db = getFirestore();
			//Hashed password
			const salt = bcrypt.genSaltSync(10);
			const hashed_password = bcrypt.hashSync(password.trim(), salt);
			//Adds the user info to our database
			const res = await setDoc(doc(db, "Person", email), {
				firstName: firstName.trim(),
				lastName: lastName.trim(),
				phoneNumber: phoneNumber.trim(),
				city: city.trim(),
				street: street.trim(),
				homeNumber: homeNumber.trim(),
				email: email.trim(),
				password: hashed_password,
				classfication: "",
			});
			//creating a sub collection of orders for each person
			createSubCollection(db, "Person", email, "Orders");

			console.log(`Welcome ${email}!`);
		}
	} catch (error) {
		console.log("ERROR! : ", error);
		alert(error.message);
	}
};

//creates sub collection of orders for each person
const createSubCollection = async (db, parentCollection, email, subCollectionName) => {
	const docRef = await addDoc(collection(db, parentCollection, email, subCollectionName), {});
};

// sign in function
export const signIn = async (event, ...userinfo) => {
	//cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.
	event.preventDefault();
	//deconstruct
	const { email, password } = userinfo[0];
	try {
		if (firebaseInstance) {
			//checks if user input match to database info
			const user = await firebaseInstance.auth().signInWithEmailAndPassword(email, password);
			console.log(`Welcome ${email}!`);
		}
	} catch (error) {
		console.log("error", error);
	}
};

//Sign out function for users
export const signOut = async () => {
	try {
		if (firebaseInstance) {
			await firebaseInstance.auth().signOut();
			console.log("Successfully signed out!");
		}
	} catch (error) {
		console.log("error", error);
	}
};

// frCollection can be 'Person' and frDoc is the email of the current user
export const getDocument = async (frCollection, frDoc) => {
	try {
		//checks there is db connection
		if (firebaseInstance) {
			const db = getFirestore();
			//gets the doc
			const docRef = doc(db, frCollection, frDoc);
			//gets snapshot of the doc
			const docSnap = await getDoc(docRef);
			//if doc exists return promise object
			if (docSnap.exists()) {
				return docSnap.data();
			} else {
				// doc.data() will be undefined in this case
				console.log("No such document!");
			}
		}
	} catch (error) {
		console.log("getDocument error : ", error);
	}
};
