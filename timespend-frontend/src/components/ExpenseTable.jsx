import { useState } from "react";
import api from "../api/axios";
import EditExpenseModal from "./EditExpenseModal";

  


const ExpenseTable = ({ expenses, onDelete }) => {
  const [loadingId, setLoadingId] = useState(null);
  const [selected, setSelected] = useState(null);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this expense?"
    );
    if (!confirmDelete) return;

    try {
      setLoadingId(id);
      await api.delete(`/expenses/${id}`);
      onDelete(); // refresh list
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete expense");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Title</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Category</th>
            <th className="p-3">Date</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {expenses.length === 0 ? (
            <tr>
              <td colSpan="5" className="p-4 text-center text-gray-500">
                No expenses found
              </td>
            </tr>
          ) : (
            expenses.map((e) => (
              <tr key={e._id} className="border-t">
                <td className="p-3">{e.title}</td>
                <td className="p-3">Rs {e.amount}</td>
                <td className="p-3">{e.category}</td>
                <td className="p-3">
                  {new Date(e.date).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(e._id)}
                    disabled={loadingId === e._id}
                    className="text-red-500 hover:underline disabled:opacity-50"
                  >
                    {loadingId === e._id ? "Deleting..." : "Delete"}
                  </button>
                </td>
                <td className="p-3 space-x-3">
    <button onClick={() => setSelected(e)} className="text-blue-500">
    Edit
  </button>
  <button onClick={() => handleDelete(e._id)} className="text-red-500">
    Delete
  </button>

  {selected && (
    <EditExpenseModal
      expense={selected}
      onClose={() => setSelected(null)}
      onUpdated={onDelete}
    />
  )}
</td>

              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;