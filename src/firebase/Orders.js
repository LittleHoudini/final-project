import getFirebase from "./Firebase";
import { doc, getDoc, addDoc, getFirestore, collection, query, where, getDocs, updateDoc, increment, Timestamp } from "firebase/firestore";

//Firebase instance
const firebaseInstance = getFirebase();

export const getItems = async frCollection => {
	try {
		if (firebaseInstance) {
			const db = getFirestore();
			let res = [];
			const querySnapshot = await getDocs(collection(db, frCollection));
			querySnapshot.forEach(doc => {
				//   console.log(doc.id, " => ", doc.data());
				let docToAdd = doc.data();
				res.push(docToAdd);
			});
			//return array of objects(docs)
			return res;
		}
	} catch (err) {
		console.log(err);
	}
};

//Fetch all documents from a collection and return the doc
export const getSubDocument = async (frCollection, frDoc, subCollection, subDoc, subCollection1, includes) => {
	try {
		if (firebaseInstance) {
			//connect to firestore
			const db = getFirestore();
			//path to get the document => example => ('Category','Extras','extras','chips','items','includes')
			//will get the document includes for specific dish,
			const docRef = doc(db, frCollection, frDoc, subCollection, subDoc, subCollection1, includes);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				return docSnap.data();
			} else {
				// doc.data() will be undefined in this case
				console.log("No such document");
			}
		}
	} catch (err) {
		console.log(err);
	}
};
// category, product,dishName
export const getDishIngredients = async (category, product, dishName) => {
	try {
		if (firebaseInstance) {
			const db = getFirestore();
			const docSnap = await getDoc(doc(db, `Category/${category}/${product}/${dishName}`));
			//if doc exists return promise object
			if (docSnap.exists()) {
				return docSnap.data().ingredients;
			} else {
				console.log("No such document!");
				return false;
			}
		}
	} catch (err) {
		console.log(err);
	}
};

//Fetch all documents from a collection and return an array of objects
export const getAllDishesFromCategory = async (frCollection, frDoc, subCollection) => {
	try {
		if (firebaseInstance) {
			//connect to firestore
			const db = getFirestore();
			//declare array
			let res = [];
			//path to get the collections => example => Category/Extras/extras
			//will get all the document in extras
			const querySnapshot = await getDocs(collection(db, frCollection, frDoc, subCollection));
			//iterate over each doc and push it to array
			querySnapshot.forEach(doc => {
				//   console.log(doc.id, " => ", doc.data());
				let docToAdd = doc.data();
				res.push(docToAdd);
			});
			//return array of objects
			return res;
		}
	} catch (err) {
		console.log(err);
	}
};

export const getDishData = async (category, product, dishName) => {
	try {
		if (firebaseInstance) {
			const db = getFirestore();
			const docSnap = await getDoc(doc(db, `Category/${category}/${product}/${dishName}`));
			//if doc exists return promise object
			if (docSnap.exists()) {
				return docSnap.data();
			} else {
				console.log("No such document!");
				return false;
			}
		}
	} catch (err) {
		console.log(err);
	}
};

export const getMisc = async docName => {
	try {
		if (firebaseInstance) {
			const db = getFirestore();
			const docSnap = await getDoc(doc(db, `misc/${docName}`));
			if (docSnap.exists()) {
				return docSnap.data();
			} else {
				console.log("No such document!");
				return false;
			}
		}
	} catch (err) {
		console.log(err);
	}
};

//Fetch all documents from a collection and return an array of objects
export const getMenuCategories = async () => {
	try {
		if (firebaseInstance) {
			//connect to firestore
			const db = getFirestore();
			//declare array
			let res = [];
			//will get all the document in documents in 'Category
			const querySnapshot = await getDocs(collection(db, "Category"));
			//iterate over each doc and push it to array
			querySnapshot.forEach(doc => {
				//   console.log(doc.id, " => ", doc.data());
				let docToAdd = doc.data();
				res.push(docToAdd);
			});
			//return array of objects
			return res;
		}
	} catch (err) {
		console.log(err);
	}
};

export const getHomePageData = async () => {
	try {
		if (firebaseInstance) {
			const db = getFirestore();
			let res = [];
			// const q = query(collection(db,'Person'), where("phoneNumber", "==", phoneNum))
			const querySnapshot = await getDocs(collection(db, "misc"));
			querySnapshot.forEach(doc => {
				if (doc.data()["path"]) {
					let docToAdd = doc.data();
					res.push(docToAdd);
				}
			});
			return res;
		}
	} catch (err) {
		console.log(err);
	}
};

//check stock before update
export const checkStockAvailbility = async obj => {
	try {
		if (firebaseInstance) {
			//db
			const db = getFirestore();
			var flag = true;
			for (let index in obj) {
				for (let key in obj[index]) {
					//query
					const q = query(collection(db, "Item"), where("name", "==", key));
					//get docs matching query
					const querySnapshot = await getDocs(q);
					console.log(obj[index][key], key);
					querySnapshot.forEach(doc => {
						//if at least one of the items will be negative after update set flag to false
						if (doc.data()["count"] - obj[index][key] < 0) {
							flag = false;
						}
					});
				}
			}
			return flag;
		}
	} catch (err) {
		console.log(err);
	}
};

export const handleStockAfterOrder = async obj => {
	try {
		if (firebaseInstance) {
			console.log("we shilling");
			console.log(obj);
			//db
			const db = getFirestore();
			for (let index in obj) {
				for (let key in obj[index]) {
					//query
					const q = query(collection(db, "Item"), where("name", "==", key));
					//get docs matching query
					const querySnapshot = await getDocs(q);
					//update docs
					querySnapshot.forEach(doc => {
						updateDoc(doc.ref, { count: increment(-obj[index][key]) });
					});
				}
			}
		}
	} catch (err) {
		console.log(err);
	}
};

export const addOrderToDB = async (obj, cartTotal, currentUser, orderID) => {
	try {
		if (firebaseInstance) {
			//Gets db
			const db = getFirestore();
			//Adds the user info to our database
			const docRef = await addDoc(collection(db, "Person", currentUser, "Orders"), {
				// date : new Date().toLocaleString() + '',
				date: new Date(),
				cartTotal: cartTotal,
				orderID: orderID,
				status: "Pending",
				orders: obj,
			});
		}
	} catch (error) {
		console.log("error code :", error.code);
		console.log("error message : ", error.message);
	}
};

export const fetchUserOrders = async currentUser => {
	try {
		if (firebaseInstance) {
			const db = getFirestore();
			let res = [];
			const querySnapshot = await getDocs(collection(db, "Person", currentUser, "Orders"));
			querySnapshot.forEach(doc => {
				//   console.log(doc.id, " => ", doc.data());
				let docToAdd = doc.data();
				res.push(docToAdd);
			});
			return res;
		}
	} catch (err) {
		console.log(err);
	}
};

export const fetchAllUsersEmails = async () => {
	try {
		if (firebaseInstance) {
			const db = getFirestore();
			let res = [];
			const querySnapshot = await getDocs(collection(db, "Person"));
			querySnapshot.forEach(doc => {
				//   console.log(doc.id, " => ", doc.data());
				let docToAdd = doc.data()["email"];
				res.push(docToAdd);
			});
			return res;
		}
	} catch (err) {
		console.error(err);
	}
};

export const fetchAllUsersData = async () => {
	try {
		if (firebaseInstance) {
			const db = getFirestore();
			let res = [];
			const querySnapshot = await getDocs(collection(db, "Person"));
			querySnapshot.forEach(doc => {
				//   console.log(doc.id, " => ", doc.data());
				let docToAdd = doc.data();
				res.push(docToAdd);
			});
			return res;
		}
	} catch (err) {
		console.error(err);
	}
};

export const fetchAllPendingOrders = async () => {
	try {
		if (firebaseInstance) {
			const db = getFirestore();
			let res = [];
			const usersEmails = await fetchAllUsersEmails();
			const usersData = await fetchAllUsersData();
			for (let i in usersEmails) {
				//fetching all pending orders
				const q = query(collection(db, "Person", usersEmails[i], "Orders"), where("status", "==", "Pending"));
				// console.log("this is query  => " , q)
				const currentUserData = usersData[i];
				const querySnapshot = await getDocs(q);
				querySnapshot.forEach(doc => {
					let docToAdd = doc.data();
					Object.assign(docToAdd, { ...currentUserData });
					res.push(docToAdd);
				});
			}
			return res;
		}
	} catch (err) {
		console.log(err);
	}
};

export const HandleOrderStatus = async (orderID, email, status) => {
	try {
		if (firebaseInstance) {
			const db = getFirestore();
			const q = query(collection(db, "Person", email, "Orders"), where("orderID", "==", orderID));
			let docRef;
			const querySnapshot = await getDocs(q);
			querySnapshot.forEach(doc => {
				// doc.data() is never undefined for query doc snapshots
				//get document reference so we change its status
				docRef = doc.ref;
			});
			await updateDoc(docRef, {
				status: status,
			});
		}
	} catch (err) {
		console.log(err);
	}
};
