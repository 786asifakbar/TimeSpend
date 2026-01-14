import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const MonthlyExpenseChart = ({ expenses }) => {
  const chartData = expenses.map((e) => ({
    date: new Date(e.date).toLocaleDateString(),
    amount: e.amount,
  }));

  return (
    <div className="bg-white p-4 shadow rounded">
      <h3 className="font-semibold mb-4">Expense Trend</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="amount" stroke="#2563eb" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyExpenseChart;