import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-100 min-h-screen">
        <Navbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};
export default DashboardLayout;