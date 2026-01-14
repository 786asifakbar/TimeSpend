import { useState } from "react";
import api from "../api/axios";

const ExpenseForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/expenses", form);
    setForm({ title: "", amount: "", category: "", date: "" });
    onAdd();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow mb-6"
    >
      <h2 className="text-xl font-bold mb-4">Add Expense</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          placeholder="Title"
          className="border p-2 rounded"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          type="number"
          placeholder="Amount"
          className="border p-2 rounded"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />

        <input
          placeholder="Category"
          className="border p-2 rounded"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <input
          type="date"
          className="border p-2 rounded"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
      </div>

      <button className="mt-4 bg-black text-white px-6 py-2 rounded">
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;