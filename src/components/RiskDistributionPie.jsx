import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const COLORS = {
  High: "#ef4444",
  Medium: "#f59e0b",
  Low: "#22c55e",
};

function buildDistribution(employees) {
  const total = employees.length || 1;
  return ["High", "Medium", "Low"].map((level) => {
    const count = employees.filter((employee) => employee.riskLevel === level).length;

    return {
      name: level,
      value: count,
      percent: Math.round((count / total) * 100),
    };
  });
}

function renderLabel({ name, value, percent }) {
  if (value === 0) {
    return "";
  }

  return `${name}: ${value} (${percent}%)`;
}

function RiskDistributionPie({ employees }) {
  const data = buildDistribution(employees);

  return (
    <section className="rounded-2xl bg-white p-6 shadow-md">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-slate-900">Risk Distribution</h2>
        <p className="text-sm text-slate-500">Company-wide count by risk level.</p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="45%"
              outerRadius={95}
              label={renderLabel}
              labelLine={false}
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={COLORS[entry.name]} />
              ))}
            </Pie>
            <Tooltip formatter={(value, name) => [`${value} employees`, name]} />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default RiskDistributionPie;
