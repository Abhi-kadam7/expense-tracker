import { createContext, useReducer, useEffect } from "react";

// Initial state
const initialState = {
  transactions: [],
};

// Create context
export const TransactionContext = createContext(initialState);

// Reducer function
const transactionReducer = (state, action) => {
  switch (action.type) {
    case "SET_TRANSACTIONS":
      return { ...state, transactions: action.payload };
    case "ADD_TRANSACTION":
      return { ...state, transactions: [action.payload, ...state.transactions] };
    case "DELETE_TRANSACTION":
      return { ...state, transactions: state.transactions.filter((t) => t._id !== action.payload) };
    default:
      return state;
  }
};

// Backend API URL
const API_BASE_URL = "https://expense-tracker-1-srnn.onrender.com/api/transactions"; // Update if deployed

// Provider component
export const TransactionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(transactionReducer, initialState);

  // Fetch transactions from backend
  const fetchTransactions = async () => {
    try {
      const res = await fetch(API_BASE_URL);
      if (!res.ok) throw new Error("Failed to fetch transactions.");
      const data = await res.json();
      dispatch({ type: "SET_TRANSACTIONS", payload: data });
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  // Load transactions on mount
  useEffect(() => {
    fetchTransactions();
  }, []);

  // Add transaction
  const addTransaction = async (transaction) => {
    try {
      const res = await fetch(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transaction),
      });

      if (!res.ok) throw new Error("Failed to add transaction.");
      await fetchTransactions(); // Refresh transaction list after adding
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  // Delete transaction
  const deleteTransaction = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/${id}`, { method: "DELETE" });

      if (!res.ok) throw new Error("Failed to delete transaction.");
      await fetchTransactions(); // Refresh transaction list after deleting
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  return (
    <TransactionContext.Provider
      value={{ transactions: state.transactions, addTransaction, deleteTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
