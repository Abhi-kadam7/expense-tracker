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

// ✅ Use environment variable for API URL (defined in `.env` file)
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/transactions";

// Provider component
export const TransactionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(transactionReducer, initialState);

  // Fetch transactions from backend on load
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch(API_BASE_URL, { credentials: "include" });
        if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
        const data = await res.json();
        dispatch({ type: "SET_TRANSACTIONS", payload: data });
      } catch (error) {
        console.error("❌ Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  // Add transaction
  const addTransaction = async (transaction) => {
    try {
      const res = await fetch(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(transaction),
      });
      if (!res.ok) throw new Error(`Failed to add transaction: ${res.statusText}`);
      const data = await res.json();
      dispatch({ type: "ADD_TRANSACTION", payload: data });
    } catch (error) {
      console.error("❌ Error adding transaction:", error);
    }
  };

  // Delete transaction
  const deleteTransaction = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error(`Failed to delete transaction: ${res.statusText}`);
      dispatch({ type: "DELETE_TRANSACTION", payload: id });
    } catch (error) {
      console.error("❌ Error deleting transaction:", error);
    }
  };

  return (
    <TransactionContext.Provider value={{ transactions: state.transactions, addTransaction, deleteTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};
