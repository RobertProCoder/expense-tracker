import { Navbar } from "./components/Navbar";
import { useEffect, useState } from "react";
import { auth, db } from "./config/firebase";
import { collection, addDoc, doc, setDoc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { currencyFormatter } from "./components/currencyFormatter";
import { UserRecords } from "./components/UserRecords";

export function MainPage() {
  const [totalBalance, setTotalBalance] = useState(0);
  const [amount, setAmount] = useState(0);
  const [typeTransaction, setTypeTransaction] = useState("");
  const [description, setDescription] = useState("");
  const [user] = useAuthState(auth);
  const [selectedDate, setSelectedDate] = useState("");

  const handleRadioChange = (e) => {
    setTypeTransaction(e.target.value);
  };
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };
  const postCollection = collection(db, "Ledger");
  const balanceCollection = doc(db, "UserBalance", user?.uid);

  const getBalance = async () => {
    const data = await getDoc(balanceCollection);

    if (data.exists) {
      setTotalBalance(data?.data().userBalance);
    } else {
      console.log("No DATA");
    }
  };

  const submitTransaction = async (e) => {
    e.preventDefault();
    let newBalance;
    if (typeTransaction === "expense") {
      newBalance = parseFloat(totalBalance) - parseFloat(amount);
    } else if (typeTransaction === "income") {
      newBalance = parseFloat(totalBalance) + parseFloat(amount);
    }
    setTotalBalance(newBalance);

    if (typeTransaction) {
      await addDoc(postCollection, {
        transactionAmount: amount,
        transactionDescription: description,
        transactionType: typeTransaction,
        userName: user?.displayName,
        userId: user?.uid,
        transactionDate: selectedDate,
      });

      await setDoc(balanceCollection, {
        userBalance: newBalance,
        userId: user?.uid,
        userName: user?.displayName,
      });
      console.log("success");
      setAmount(0);
      setDescription("");
      setSelectedDate("");
    } else {
      getBalance();
      alert("Please Select type of transaction");
    }
  };

  useEffect(() => {
    getBalance();
  }, []);

  return (
    <div className="main" onSubmit={submitTransaction}>
      <Navbar />
      <div className="currency">
        <h1>{currencyFormatter(totalBalance)}</h1>
      </div>
      <form className="transac-form">
        <span>Enter Amount</span>
        <input
          type="number"
          placeholder="Enter amount..."
          className="amount"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />
        <textarea
          cols="100"
          rows="10"
          placeholder="Enter reason for transaction"
          className="description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></textarea>
        <div className="transac-type">
          <label className="labels">
            <input
              type="radio"
              className="type"
              value="expense"
              checked={typeTransaction === "expense"}
              onChange={handleRadioChange}
            />
            Expense
          </label>
          <label className="labels">
            <input
              type="radio"
              className="type"
              value="income"
              checked={typeTransaction === "income"}
              onChange={handleRadioChange}
            />
            Income
          </label>
        </div>
        <input type="date" value={selectedDate} onChange={handleDateChange} />
        <input type="submit" value="Submit" className="submit-btn" />
      </form>
      <UserRecords />
    </div>
  );
}
