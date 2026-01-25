import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Expenses from "./pages/Expenses.jsx";
import Reports from "./pages/Reports.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import TimeLogs from "./pages/TimeLogs";
import Admin from "./pages/Admin.jsx";




const App = () => {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
      <Route path="/admin" element={user ? <Admin /> : <Navigate to="/" />} />
      <Route path="/home" element={user ? <Expenses /> : <Navigate to="/" />} />
      <Route path="/expenses" element={user ? <Expenses /> : <Navigate to="/" />} />
      <Route path="/reports" element={user ? <Reports /> : <Navigate to="/" />} />
      <Route path="/timelogs" element={user ? <TimeLogs /> : <Navigate to="/" />}
/>

    </Routes>
  );
};

export default App;