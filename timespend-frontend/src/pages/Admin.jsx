import { useEffect, useState } from "react";
import api from "../api/axios";

const Admin = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await api.get("/users");
    setUsers(res.data.data);
  };

  const makePro = async (id) => {
    await api.put(`/admin/make-pro/${id}`);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

      {users.map((u) => (
        <div key={u._id} className="flex justify-between border p-3 mb-2">
          <span>{u.email}</span>
          {!u.isPro && (
            <button
              onClick={() => makePro(u._id)}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              Make Pro
            </button>
          )}
        </div>
      ))}
    </div>
  );
};
export default Admin;