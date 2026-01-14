import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../api/axios";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseTable from "../components/ExpenseTable";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    const { data } = await api.get("/expenses");
    setExpenses(data.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <DashboardLayout>
      <ExpenseForm onAdd={fetchExpenses} />
      <ExpenseTable expenses={expenses} onDelete={fetchExpenses} />
    </DashboardLayout>
  );
};

export default Expenses;