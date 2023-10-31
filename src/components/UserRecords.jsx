import "../css/Records.css";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db, auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
export function UserRecords() {
  const [userTransaction, setUserTransaction] = useState([]);

  const [user] = useAuthState(auth);
  // const transactions = doc(db, "Ledger", user?.uid);
  const transactionCollection = collection(db, "Ledger");
  const transactionQuery = query(
    transactionCollection,
    where("userId", "==", user?.uid)
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(transactionQuery, (onSnapshot) => {
      const updatedTransaction = onSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserTransaction(updatedTransaction);
    });

    return () => unsubscribe();
  }, []);
  return (
    <div className="records-container">
      <div className="container-header">
        <h1>Transaction Records</h1>
      </div>
      <div className="records">
        {userTransaction?.map((transaction) => (
          <div className="record">
            <p>UserName: {transaction?.userName}</p>
            <p>Amount: {transaction?.transactionAmount}</p>
            <p>Description: {transaction?.transactionDescription}</p>
            <p>Type of Transaction: {transaction?.transactionType}</p>
            <p>Date of Transaction: {transaction?.transactionDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
