// Productivity stats dashboard
import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", tasks: 3 },
  { day: "Tue", tasks: 5 },
  { day: "Wed", tasks: 2 },
  { day: "Thu", tasks: 8 },
  { day: "Fri", tasks: 4 },
  { day: "Sat", tasks: 6 },
  { day: "Sun", tasks: 3 },
];

function AnalyticsDashboard() {
  return (
    <div>
      <h2 className="text-2xl mb-4">Productivity Analytics</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <Line type="monotone" dataKey="tasks" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AnalyticsDashboard;
