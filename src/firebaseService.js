import { FIREBASE_APP } from "./Firebase.Config";
import {
  getDatabase,
  ref,
  set,
  get,
  query,
  limitToFirst,
} from "firebase/database";

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
    const expensesRef = ref(db, "/"); // Adjust if your expenses are under a different node

    get(expensesRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const allExpenses = snapshot.val();
          console.log(
            "Reading all data:",
            JSON.stringify(allExpenses, null, 2)
          );

          let totalTrips = 0;
          let totalEmissions = 0;
          let totalMiles = 0;
          let mostRecentDate = "";

          // Iterate through each expense and process the data
          for (const key in allExpenses) {
            const expense = allExpenses[key];
            if (expense.numTrips) totalTrips += expense.numTrips;
            if (expense.totalEmissions)
              totalEmissions += expense.totalEmissions;
            if (expense.totalMiles) totalMiles += expense.totalMiles;

            if (
              expense.date &&
              (!mostRecentDate ||
                new Date(expense.date) > new Date(mostRecentDate))
            ) {
              mostRecentDate = expense.date;
            }
          }

          const aggregatedData = {
            totalTrips,
            totalEmissions,
            totalMiles,
            mostRecentDate,
          };

          resolve(aggregatedData);
        } else {
          reject("No data available");
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// export const readData = () => {
//   return new Promise((resolve, reject) => {
//     const db = getDatabase();
//     const companyRef = ref(db, "Expense 1");
//     const firstExpenseQuery = query(companyRef, limitToFirst(1));

//     get(firstExpenseQuery)
//       .then((snapshot) => {
//         if (snapshot.exists()) {
//           const data = snapshot.val();
//           console.log("Reading data:", JSON.stringify(data, null, 2)); // Pretty print the object
//           // The data is an object where the key is the node's key and the value is the record
//           resolve(data);
//         } else {
//           reject("No data available");
//         }
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// };
