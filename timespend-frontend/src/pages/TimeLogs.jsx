import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../api/axios";
import TimeLogForm from "../components/TimeLogForm";
import TimeLogList from "../components/TimeLogList";

const TimeLogs = () => {
  const [logs, setLogs] = useState([]);

  const fetchLogs = async () => {
    const { data } = await api.get("/timelogs");
    setLogs(data.data);
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <DashboardLayout>
      <TimeLogForm onAdd={fetchLogs} />
      <TimeLogList logs={logs} />
    </DashboardLayout>
  );
};

export default TimeLogs;