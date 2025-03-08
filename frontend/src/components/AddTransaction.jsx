import { useState, useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";

const AddTransaction = () => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense"); // Default: Expense
  const { addTransaction } = useContext(TransactionContext);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text.trim() || !amount.trim()) {
      alert("Please enter a transaction name and amount.");
      return;
    }

    if (isNaN(amount) || amount === "0") {
      alert("Please enter a valid amount.");
      return;
    }

    // Convert amount to number and set correct sign
    const transactionAmount = type === "expense" ? -Math.abs(Number(amount)) : Math.abs(Number(amount));

    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: transactionAmount,
    };

    addTransaction(newTransaction);
    setText("");
    setAmount("");
  };

  return (
    <div className="bg-gray-800 text-white p-6 rounded-md shadow-lg mt-6">
      <h3 className="text-xl font-bold mb-4 text-center">Add New Transaction</h3>
      <form onSubmit={onSubmit} className="space-y-4">
        {/* Transaction Name Input */}
        <div>
          <label className="block text-sm font-medium mb-1">Transaction Name</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter text..."
            required
          />
        </div>

        {/* Amount Input (Fully Removes Arrows) */}
        <div>
          <label className="block text-sm font-medium mb-1">Amount (₹)</label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/[^0-9.-]/g, ""))} // Only allow numbers, dot, and minus
            className="w-full bg-gray-700 border border-gray-600 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter amount..."
            required
            inputMode="decimal" // Ensures numeric keyboard on mobile
            autoComplete="off"
          />
        </div>

        {/* Transaction Type Dropdown */}
        <div>
          <label className="block text-sm font-medium mb-1">Select Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="income">Income (+)</option>
            <option value="expense">Expense (-)</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md text-lg font-semibold transition duration-200"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default AddTransaction;
