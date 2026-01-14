import DashboardLayout from "../layouts/DashboardLayout.jsx";
import StatCard from "../components/StatCard.jsx";

const Dashboard = () => {
  return (
    <>
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Expense" value="Rs 12,500" />
        <StatCard title="Total Time Spent" value="48 hrs" />
        <StatCard title="This Month" value="January" />
      </div>
    </DashboardLayout>
    </>
  );
};

export default Dashboard;