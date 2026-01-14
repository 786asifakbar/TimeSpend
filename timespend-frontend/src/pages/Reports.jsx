import { useEffect, useState } from "react";
import api from "../api/axios";
import { handleApiError } from "../utils/handleApiError";
import UpgradeProModal from "../components/UpgradeProModal";
import MonthlyExpenseChart from "../components/MonthlyExpenseChart";

const Reports = () => {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [showUpgrade, setShowUpgrade] = useState(false);

  const fetchReport = async () => {
    try {
      const res = await api.get(
        `/reports/monthly?month=${month}&year=${year}`
      );
      setData(res.data.data);
      setError("");
    } catch (err) {
      const msg = handleApiError(err);
      if (msg.includes("Upgrade")) {
        setShowUpgrade(true);
      } else {
        setError(msg);
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Monthly Report</h1>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <input
          type="number"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border p-2 rounded"
          placeholder="Month"
        />
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border p-2 rounded"
          placeholder="Year"
        />
        <button
          onClick={fetchReport}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Generate
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {/* Report Data */}
      {data && (
        <>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white shadow p-4 rounded">
              <h3 className="font-semibold">Total Expense</h3>
              <p className="text-xl">Rs {data.totalExpense}</p>
            </div>

            <div className="bg-white shadow p-4 rounded">
              <h3 className="font-semibold">Total Time</h3>
              <p className="text-xl">{data.totalTime} minutes</p>
            </div>
          </div>

          {/* Chart */}
          <MonthlyExpenseChart expenses={data.expenses} />
        </>
      )}

      {showUpgrade && (
        <UpgradeProModal onClose={() => setShowUpgrade(false)} />
      )}
    </div>
  );
};

export default Reports;