import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getRiskColor } from "../utils";

function toRiskLevel(score) {
  if (score >= 70) return "High";
  if (score >= 40) return "Medium";
  return "Low";
}

function departmentAverages(employees) {
  const grouped = employees.reduce((acc, employee) => {
    if (!acc[employee.department]) {
      acc[employee.department] = { department: employee.department, total: 0, count: 0 };
    }
    acc[employee.department].total += employee.burnout.score;
    acc[employee.department].count += 1;
    return acc;
  }, {});

  return Object.values(grouped)
    .map((group) => {
      const avgScore = Math.round(group.total / group.count);
      return {
        department: group.department,
        avgScore,
        riskLevel: toRiskLevel(avgScore),
      };
    })
    .sort((a, b) => b.avgScore - a.avgScore);
}

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const data = payload[0].payload;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-lg">
      <p className="font-semibold text-gray-900">{data.department}</p>
      <p className="text-sm text-gray-600">Average score: {data.avgScore}</p>
      <p className="text-sm text-gray-600">Risk level: {data.riskLevel}</p>
    </div>
  );
}

export default function DepartmentChart({ employees }) {
  const data = departmentAverages(employees);

  return (
    <div className="rounded-2xl bg-white p-6 shadow-md">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Department Average Risk</h2>
        <p className="text-sm text-gray-500">Average burnout score by department</p>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 24, right: 8, left: -18, bottom: 12 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis dataKey="department" tick={{ fill: "#4b5563", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 100]} tick={{ fill: "#4b5563", fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f9fafb" }} />
            <Bar dataKey="avgScore" radius={[10, 10, 0, 0]} maxBarSize={52}>
              <LabelList dataKey="avgScore" position="top" className="fill-gray-700 text-sm font-semibold" />
              {data.map((entry) => (
                <Cell key={entry.department} fill={getRiskColor(entry.riskLevel)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
