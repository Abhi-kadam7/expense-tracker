import Transaction from "../models/Transaction.js";

// Get all transactions
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Add transaction
export const addTransaction = async (req, res) => {
  try {
    const { text, amount } = req.body;
    const transaction = new Transaction({ text, amount });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete transaction
export const deleteTransaction = async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: "Transaction Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
