import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Reports from "./pages/Reports";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
      <Route path="/expenses" element={user ? <Expenses /> : <Navigate to="/" />} />
      <Route path="/reports" element={user ? <Reports /> : <Navigate to="/" />} />
    </Routes>
  );
};

export default App;