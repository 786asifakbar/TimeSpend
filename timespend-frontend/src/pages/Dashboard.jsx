import { useEffect, useState } from "react";
import api from "../api/axios";
import MonthlyExpenseChart from "../components/MonthlyExpenseChart";
import UpgradeProModal from "../components/UpgradeProModal";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [showUpgrade, setShowUpgrade] = useState(false);

  const fetchDashboard = async () => {
    try {
      const now = new Date();
      const month = now.getMonth() + 1;
      const year = now.getFullYear();

      const res = await api.get(
        `/reports/monthly?month=${month}&year=${year}`
      );

      setStats(res.data.data);
    } catch (err) {
      if (err.response?.status === 403) {
        setShowUpgrade(true);
      }
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (!stats) return <p className="p-6">Loading dashboard...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <InsightCard title="Total Expense" value={`Rs ${stats.totalExpense}`} />
        <InsightCard title="Time Spent" value={`${stats.totalTime} min`} />
        <InsightCard title="Entries" value={stats.expenses.length} />
      </div>

      {/* Chart */}
      <MonthlyExpenseChart expenses={stats.expenses} />

      {showUpgrade && (
        <UpgradeProModal onClose={() => setShowUpgrade(false)} />
      )}
    </div>
  );
};

const InsightCard = ({ title, value }) => (
  <div className="bg-white shadow rounded p-4">
    <h3 className="text-gray-500">{title}</h3>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default Dashboard;