//IMPORTS
import getFirebase from "./Firebase";
import bcrypt from "bcryptjs/dist/bcrypt";
import { doc, updateDoc, setDoc, getDoc, deleteDoc, addDoc, getFirestore, collection, query, where, getDocs,increment } from "firebase/firestore";
import { getAuth, updatePassword, sendPasswordResetEmail, deleteUser } from "firebase/auth";
import { fetchAllUsersData,fetchAllUsersEmails } from "./Orders";
import uuid from "react-uuid";

//Firebase instance
const firebaseInstance = getFirebase();

export const handleDisabledProduct = async (category, product, dishName, disabled) => {
	try {
		if (firebaseInstance) {
			const db = getFirestore();
			const dishRef = doc(db, `Category/${category}/${product}/${dishName}`);
			await updateDoc(dishRef, {
				disabled: !disabled,
			});
		}
	} catch (err) {
		console.log(err);
	}
};

// export const handleImageChange = async(category,product,dishName,link) => {
// 	try {
// 		if (firebaseInstance) {
// 			const db = getFirestore();
//             const dishRef = doc(db, `Category/${category}/${product}/${dishName}`);
//             await updateDoc(dishRef, {
//                 image: link
//               });
// 		}
// 	} catch (err) {
// 		console.log(err);
// 	}
// }

export const updateDishData = async (category, product, dishName, values) => {
	try {
		const db = getFirestore();
		const { imageLink, priceToEdit, titleToEdit, textToEdit } = values;
		const dishRef = doc(db, `Category/${category}/${product}/${dishName}`);

		// Set the "capital" field of the city 'DC'
		await updateDoc(dishRef, {
			image: imageLink,
			price : Number(priceToEdit),
			title : titleToEdit,
			text : textToEdit
		});
	} catch (err) {
		console.log(err);
	}
};

export const IngredientExists = async ingredient => {
	try {
		if (firebaseInstance) {
			const db = getFirestore();
			const q = query(collection(db, "Item"), where("name", "==", ingredient));
			let counter = 0;
			//get docs matching query
			const querySnapshot = await getDocs(q);
			//update docs
			querySnapshot.forEach(doc => {
				counter++;
			});
			return counter > 0;
		}
	} catch (err) {
		console.log(err);
	}
};

export const addIngredient = async ingredientToAdd => {
	try {
		if (firebaseInstance) {
			const db = getFirestore();
			await setDoc(doc(db, "Item", ingredientToAdd), {
				name: ingredientToAdd,
				id: uuid(),
				count: 1000,
			});
		}
	} catch (err) {
		console.log(err);
	}
};

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export const addProductWithIngredients = async (product, ingredients) => {
	try {
		if (firebaseInstance) {
			const db = getFirestore();
			const pName = capitalizeFirstLetter(product.productName);

			await setDoc(doc(db, "Category", product.category, product.category.toLowerCase(), pName), {
				disabled: false,
				hasIngredients: pName,
				id: uuid(),
				image: product.imageLink,
				ingredients: ingredients,
				item_id: [],
				name: pName,
				price: Number(product.price),
				text: product.text,
				title: product.title,
			});
		}
	} catch (err) {
		console.log(err);
	}
};

export const addProduct = async product => {
	try {
		if (firebaseInstance) {
			const db = getFirestore();
			const pName = capitalizeFirstLetter(product.productName);

			await setDoc(doc(db, "Category", product.category, product.category.toLowerCase(), pName), {
				disabled: false,
				id: uuid(),
				image: product.imageLink,
				name: pName,
				price: Number(product.price),
				text: product.text,
				title: product.title,
			});
		}
	} catch (err) {
		console.log(err);
	}
};

export const removeProduct = async (category, product, docToRemove) => {
	try {
		if (firebaseInstance) {
			console.log(category, product, docToRemove);
			const db = getFirestore();
			await deleteDoc(doc(db, `Category/${category}/${product}/${docToRemove}`));
		}
	} catch (err) {
		console.log(err);
	}
};

export const getStats = async () => {
	try{
		if(firebaseInstance){
			const db = getFirestore();
			const docSnap = await getDoc(doc(db, `Order/Chart`));
			if (docSnap.exists()) {
				return docSnap.data();
			} else {
				console.log("No such document!");
				return false;
			}
		}
	}
	catch(err){
		console.log(err);
	}
}

export const updateStats = async (total,month) => {
	try{
		if(firebaseInstance){
			const db = getFirestore();
			const docRef = doc(db, (db, `Order/Chart`));

			// Set the "capital" field of the city 'DC'
			await updateDoc(docRef, {
				[`${month}`] : increment(total),
			});
		}
	}
	catch(err){
		console.log(err);
	}
}






export const getWeeklyStats = async (start,end) => {
	try{
		if(firebaseInstance){
			const db = getFirestore();
			let res = {};
			const usersEmails = await fetchAllUsersEmails();
			for(let i in usersEmails){
				//fetching all Approved orders
				const q = query(collection(db, "Person",usersEmails[i],"Orders"), where("status", "==", "Approved"));
				const querySnapshot = await getDocs(q);
				querySnapshot.forEach((doc) => {
					start.setHours(0,0,0,0);
					end.setHours(0,0,0,0);
					const dateToCheck = doc.data().date.toDate();
					dateToCheck.setHours(0,0,0,0);
					if((dateToCheck <= end && dateToCheck >= start) || (dateToCheck < end && dateToCheck > start) || (dateToCheck < end && dateToCheck >= start) || (dateToCheck <= end && dateToCheck > start)){
						const month = doc.data().date.toDate().getDate();
						const total = doc.data().cartTotal;
						console.log(month, total)
						res[month] = (res[month] || 0) + total;
					}
				

				});
			}
			// console.log(res)
			return res;
			
		}
	}catch(err){
		console.log(err);
	}
}