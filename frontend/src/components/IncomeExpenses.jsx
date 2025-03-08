import { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";

const IncomeExpenses = () => {
  const { transactions } = useContext(TransactionContext);

  const amounts = transactions.map((transaction) => transaction.amount);
  const income = amounts.filter((num) => num > 0).reduce((acc, num) => acc + num, 0);
  const expense = amounts.filter((num) => num < 0).reduce((acc, num) => acc + num, 0);

  return (
    <div className="flex justify-between bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="text-center">
        <h4 className="text-gray-400">Income</h4>
        <p className="text-green-400 font-bold">₹{income}</p>
      </div>
      <div className="text-center">
        <h4 className="text-gray-400">Expense</h4>
        <p className="text-red-400 font-bold">₹{Math.abs(expense)}</p>
      </div>
    </div>
  );
};

export default IncomeExpenses;
