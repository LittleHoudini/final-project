//IMPORTS
import getFirebase from "./Firebase";
import bcrypt from "bcryptjs/dist/bcrypt";
import { doc, setDoc, getDoc, addDoc, getFirestore, collection,query, where, getDocs } from "firebase/firestore";


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
				classification: "",
			});
			//creating a sub collection of orders for each person
			createSubCollection(db, "Person", email, "Orders");

			console.log(`Welcome ${email}!`);
		}
	} catch(error) {
		console.log("error code :" ,error.code);
		console.log("error message : " ,error.message);
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
		console.log("sign in error", error);
	}
};

export const passwordMatch = async (email,pw) => {
	try{
		if(firebaseInstance){
			const db = getFirestore();
			//gets the doc
			const docRef = doc(db,'Person',email)
			//gets snapshot of the doc
			const docSnap = await getDoc(docRef);
			if(docSnap.exists()){
				const hashed_pw = docSnap.data()['password'];
				const match = await bcrypt.compare(pw, hashed_pw);
				return match ? true : false;
			}
		}
	}catch(error){
		console.log(error);
	}
}
 
//Sign out function for users
export const signOut = async () => {
	try {
		if (firebaseInstance) {
			await firebaseInstance.auth().signOut();
			console.log("Successfully signed out!");
		}
	} catch (error) {
		console.log("sign out error", error);
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
				console.log("No such document!");
				return false;
			}
		}
	} catch (error) {
		console.log("getDocument error : ", error);
	}
};



// checks if phone number already exist in firestore before sign up
export const phoneNumberExist = async (phoneNum) => {
	try{
		if (firebaseInstance){
			let counter = 0;
			const db = getFirestore();
			//query to check if phone numbe exist
			const q = query(collection(db,'Person'), where("phoneNumber", "==", phoneNum))
			const querySnapshot = await getDocs(q);
			querySnapshot.forEach((doc) => {
				console.log(doc.id, " => ", doc.data()['email']);
				counter++;
			  });
			return counter > 0;
		}

	}catch(err){
		console.log("err");
	}
}

export const getUserClassification = async (frDoc) => {
	try {
		//checks there is db connection
		if (firebaseInstance) {
			const db = getFirestore();
			//gets the doc
			const docRef = doc(db, "Person", frDoc);
			//gets snapshot of the doc
			const docSnap = await getDoc(docRef);
			//if doc exists return promise object
			if (docSnap.exists()) {
				return docSnap.data().classification;
			} else {
				// doc.data() will be undefined in this case
				console.log("No such document");
			}
		}
	} catch (error) {
		console.log("getUserClassification error : ", error);
	}
};

//Fetch all documents from a collection and return an array of objects
export const getAllDocuments = async (frCollection,frDoc,subCollection) => {
	try{
		if(firebaseInstance){
			//connect to firestore
			const db = getFirestore();
			//declare array
			let res = [];
			//path to get the collections => example => Category/Extras/extras
			//will get all the document in extras
			const querySnapshot = await getDocs(collection(db, frCollection,frDoc,subCollection));
			//iterate over each doc and push it to array
			querySnapshot.forEach((doc) => {
			//   console.log(doc.id, " => ", doc.data());
			  let docToAdd = doc.data();
			  res.push(docToAdd);
			});
			//return array of objects
			return res;
		}
		
	}catch(err){
		console.log(err)
	}
}

//Fetch all documents from a collection and return the doc
export const getSubDocument = async (frCollection,frDoc,subCollection,subDoc,subCollection1,includes) => {
	try{
		if(firebaseInstance){
			//connect to firestore
			const db = getFirestore();
			//declare array
			let res = [];
			//path to get the document => example => ('Category','Extras','extras','chips','items','includes')
			//will get the document includes for specific dish,
			const docRef = doc(db, frCollection,frDoc,subCollection,subDoc,subCollection1,includes);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				return docSnap.data();
			} else {
				// doc.data() will be undefined in this case
				console.log("No such document");
			}
		}
		
	}catch(err){
		console.log(err)
	}
}