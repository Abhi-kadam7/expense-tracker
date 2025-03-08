import { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";

const Balance = () => {
  const { transactions } = useContext(TransactionContext);
  const total = transactions.reduce((acc, item) => acc + item.amount, 0);

  return (
    <div className="bg-gray-800 p-6 rounded-lg text-center shadow-md">
      <h4 className="text-xl text-gray-400">Your Balance</h4>
      <h1 className="text-4xl font-bold text-green-400">₹{total}</h1>
    </div>
  );
};

export default Balance;
