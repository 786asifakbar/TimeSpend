import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="flex justify-between items-center bg-white p-4 shadow">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <div className="flex items-center gap-4">
        <span>{user.name}</span>
        <button
          onClick={logout}
          className="bg-black text-white px-4 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </header>
  );
};
export default Navbar;