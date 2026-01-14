import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-black text-white min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-10">TimeSpend</h2>

      <nav className="space-y-4">
        <NavLink to="/dashboard" className="block hover:text-gray-300">
          Dashboard
        </NavLink>
        <NavLink to="/expenses" className="block hover:text-gray-300">
          Expenses
        </NavLink>
        <NavLink to="/reports" className="block hover:text-gray-300">
          Reports
        </NavLink>
      </nav>
    </aside>
  );
};
export default Sidebar;