import { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";

const TransactionList = () => {
  const { transactions, deleteTransaction } = useContext(TransactionContext);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md mt-4">
      <h3 className="text-xl text-gray-400">Transaction History</h3>
      <ul className="mt-4">
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <li
              key={transaction._id} // Use MongoDB _id
              className={`flex justify-between items-center p-2 mb-2 rounded-lg shadow-md 
              ${transaction.amount > 0 ? "bg-green-600" : "bg-red-600"}`}
            >
              <span className="text-white">{transaction.text}</span>
              <span className="text-white">₹{transaction.amount}</span>
              <button
                onClick={() => deleteTransaction(transaction._id)} // Use MongoDB _id
                className="ml-2 text-white bg-gray-800 hover:bg-red-700 px-3 py-1 rounded"
              >
                ❌
              </button>
            </li>
          ))
        ) : (
          <p className="text-gray-400 text-center mt-2">No transactions yet.</p>
        )}
      </ul>
    </div>
  );
};

export default TransactionList;
