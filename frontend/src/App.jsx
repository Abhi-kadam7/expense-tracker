import Header from "./components/Header";
import Balance from "./components/Balance";
import IncomeExpenses from "./components/IncomeExpenses";
import TransactionList from "./components/TransactionList";
import AddTransaction from "./components/AddTransaction";
import { TransactionProvider } from "./context/TransactionContext";

const App = () => {
  return (
    <TransactionProvider>
      <div className="max-w-lg mx-auto mt-10">
        <Header />
        <Balance />
        <IncomeExpenses />
        <TransactionList />
        <AddTransaction />
      </div>
    </TransactionProvider>
  );
};

export default App;
