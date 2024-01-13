import { FIREBASE_APP } from './Firebase.Config';
import { getDatabase, ref, set, get, query, limitToFirst } from "firebase/database";

export const writeData = (data) => {
  const db = getDatabase();
  const companyRef = ref(db, data.name);
  set(companyRef, data)
    .then(() => console.log("Data uploaded successfully!"))
    .catch((error) => console.error("Error uploading data:", error));
};

export const readData = () => {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    const companyRef = ref(db, 'expenses');
    const firstExpenseQuery = query(companyRef, limitToFirst(1));

    get(firstExpenseQuery).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        // The data is an object where the key is the node's key and the value is the record
        const firstKey = Object.keys(data)[0];
        const firstRecord = data[firstKey];
        resolve(firstRecord);
      } else {
        reject("No data available");
      }
    }).catch((error) => {
      reject(error);
    });
  });
};