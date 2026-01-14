const TimeLogList = ({ logs }) => {
  return (
    <div className="bg-white rounded-xl shadow">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Task</th>
            <th className="p-3">Minutes</th>
            <th className="p-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((l) => (
            <tr key={l._id} className="border-t">
              <td className="p-3">{l.task}</td>
              <td className="p-3">{l.minutes}</td>
              <td className="p-3">
                {new Date(l.date).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimeLogList;