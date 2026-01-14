import { useState } from "react";
import api from "../api/axios";

const TimeLogForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    task: "",
    minutes: "",
    date: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/timelogs", form);
    setForm({ task: "", minutes: "", date: "" });
    onAdd();
  };

  return (
    <form className="bg-white p-6 rounded-xl shadow mb-6" onSubmit={submit}>
      <h2 className="text-xl font-bold mb-4">Log Time</h2>

      <div className="grid md:grid-cols-3 gap-4">
        <input
          placeholder="Task"
          className="border p-2 rounded"
          value={form.task}
          onChange={(e) => setForm({ ...form, task: e.target.value })}
        />

        <input
          type="number"
          placeholder="Minutes"
          className="border p-2 rounded"
          value={form.minutes}
          onChange={(e) => setForm({ ...form, minutes: e.target.value })}
        />

        <input
          type="date"
          className="border p-2 rounded"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
      </div>

      <button className="mt-4 bg-black text-white px-6 py-2 rounded">
        Save
      </button>
    </form>
  );
};

export default TimeLogForm;