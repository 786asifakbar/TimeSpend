import { useState } from "react";
import api from "../api/axios";

const EditExpenseModal = ({ expense, onClose, onUpdated }) => {
  const [form, setForm] = useState({
    title: expense.title,
    amount: expense.amount,
    category: expense.category,
    date: expense.date?.slice(0, 10),
  });

  const handleUpdate = async () => {
    await api.put(`/expenses/${expense._id}`, form);
    onUpdated();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-96">
        <h2 className="text-xl font-bold mb-4">Edit Expense</h2>

        {["title", "amount", "category", "date"].map((field) => (
          <input
            key={field}
            className="w-full border p-2 rounded mb-3"
            value={form[field]}
            type={field === "amount" ? "number" : field === "date" ? "date" : "text"}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
          />
        ))}

        <div className="flex justify-end gap-3">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={handleUpdate}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditExpenseModal;