//IMPORTS
import getFirebase from "./Firebase";
import { doc, updateDoc, setDoc, getDoc, getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

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

			//Adds the user info to our database
			const res = await setDoc(doc(db, "Person", email), {
				firstName: firstName.trim(),
				lastName: lastName.trim(),
				phoneNumber: phoneNumber.trim(),
				city: city.trim(),
				street: street.trim(),
				homeNumber: homeNumber.trim(),
				email: email.trim(),
				// password: hashed_password,
				classification: "",
			});
			//creating a sub collection of orders for each person
			// createSubCollection(db, "Person", email, "Orders");

			console.log(`Welcome ${email}!`);
		}
	} catch (error) {
		console.log("error code :", error.code);
		console.log("error message : ", error.message);
	}
};

export const signIn = async (event, ...userinfo) => {
	event.preventDefault();
	let res = "";
	try {
		if (firebaseInstance) {
			const { email, password } = userinfo[0];
			await firebaseInstance
				.auth()
				.signInWithEmailAndPassword(email, password)
				.then(userCredential => {})
				.catch(error => {
					const errorCode = error.code;
					if (errorCode === "auth/wrong-password") {
						res = "Incorrect Password";
					}
				});
		}
	} catch (err) {
		console.log(err);
	} finally {
		return res;
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
export const phoneNumberExist = async phoneNum => {
	try {
		if (firebaseInstance) {
			let counter = 0;
			const db = getFirestore();
			//query to check if phone numbe exist
			const q = query(collection(db, "Person"), where("phoneNumber", "==", phoneNum));
			const querySnapshot = await getDocs(q);
			querySnapshot.forEach(doc => {
				console.log(doc.id, " => ", doc.data()["email"]);
				counter++;
			});
			return counter > 0;
		}
	} catch (err) {
		console.log("err");
	}
};

export const getUserClassification = async frDoc => {
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

//
export const resetPassword = async email => {
	let res = "";
	try {
		if (firebaseInstance) {
			const auth = getAuth();
			await sendPasswordResetEmail(auth, email)
				.then(result => {})
				.catch(error => {
					const errorCode = error.code;
					res = errorCode;
				});
		}
	} catch (err) {
		console.log(err);
	} finally {
		return res;
	}
};

// checks if phone number already exist in firestore before updating Info
export const phoneNumberExistForInfoUpdate = async (currentUserEmail, phoneNum) => {
	try {
		if (firebaseInstance) {
			let counter = 0;
			const db = getFirestore();
			//query to check if phone numbe exist
			const q = query(collection(db, "Person"), where("phoneNumber", "==", phoneNum));
			const querySnapshot = await getDocs(q);
			querySnapshot.forEach(doc => {
				console.log(doc.id, " => ", doc.data()["email"]);
				//skipping the current user
				if (doc.id !== currentUserEmail) {
					counter++;
				}
			});
			return counter > 0;
		}
	} catch (err) {
		console.log("err");
	}
};

export const updateInfo = async (email, data) => {
	try {
		if (firebaseInstance) {
			console.log(data);
			const db = getFirestore();
			await updateDoc(doc(db, "Person", email), {
				city: data.city,
				email: data.email,
				firstName: data.firstName,
				homeNumber: data.homeNumber,
				lastName: data.lastName,
				phoneNumber: data.phoneNumber,
				street: data.street,
			});
		}
	} catch (err) {
		console.log(err);
	}
};

export const getEmailForInfoUpdate = async (currentUserEmail, email) => {
	try {
		//checks there is db connection
		if (firebaseInstance) {
			let counter = 0;
			const db = getFirestore();
			//query to check if phone numbe exist
			const q = query(collection(db, "Person"), where("email", "==", email));
			const querySnapshot = await getDocs(q);
			querySnapshot.forEach(doc => {
				console.log(doc.id, " => ", doc.data()["email"]);
				//skipping the current user
				if (doc.id !== currentUserEmail) {
					counter++;
					console.log(doc.id, " => inside with counter ", doc.data()["email"]);
				}
			});
			return counter > 0;
		}
	} catch (error) {
		console.log("getDocument error : ", error);
	}
};
