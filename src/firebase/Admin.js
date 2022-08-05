//IMPORTS
import getFirebase from "./Firebase";
import bcrypt from "bcryptjs/dist/bcrypt";
import { doc, updateDoc, setDoc, getDoc, addDoc, getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth, updatePassword, sendPasswordResetEmail, deleteUser } from "firebase/auth";

//Firebase instance
const firebaseInstance = getFirebase();

export const handleDisabledProduct = async (category,product,dishName,disabled) => {
	try {
		if (firebaseInstance) {
			const db = getFirestore();
            const dishRef = doc(db, `Category/${category}/${product}/${dishName}`);
            await updateDoc(dishRef, {
                disabled: !disabled
              });
		}
	} catch (err) {
		console.log(err);
	}
}

export const handleImageChange = async(category,product,dishName,link) => {
	try {
		if (firebaseInstance) {
			const db = getFirestore();
            const dishRef = doc(db, `Category/${category}/${product}/${dishName}`);
            await updateDoc(dishRef, {
                image: link
              });
		}
	} catch (err) {
		console.log(err);
	}
}