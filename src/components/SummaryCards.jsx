const cardMeta = {
  total: {
    title: "Total Employees",
    icon: "👥",
    color: "bg-blue-100 text-blue-700 border-blue-200",
    caption: "Active profiles analyzed",
  },
  High: {
    title: "High Risk",
    icon: "🔴",
    color: "bg-red-100 text-red-700 border-red-200",
    caption: "Need immediate attention",
  },
  Medium: {
    title: "Medium Risk",
    icon: "🟡",
    color: "bg-amber-100 text-amber-700 border-amber-200",
    caption: "Monitor closely",
  },
  Low: {
    title: "Low Risk",
    icon: "🟢",
    color: "bg-green-100 text-green-700 border-green-200",
    caption: "On track",
  },
};

function SummaryCard({ title, icon, color, count, caption }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-2xl border text-xl ${color}`}
        >
          {icon}
        </span>
      </div>
      <p className="mt-5 text-3xl font-bold text-gray-900">{count}</p>
      <p className="mt-2 text-sm text-gray-500">{caption}</p>
    </div>
  );
}

export default function SummaryCards({ employees }) {
  const counts = employees.reduce(
    (acc, employee) => {
      acc[employee.riskLevel] += 1;
      return acc;
    },
    { High: 0, Medium: 0, Low: 0 },
  );

  const cards = [
    { key: "total", count: employees.length },
    { key: "High", count: counts.High },
    { key: "Medium", count: counts.Medium },
    { key: "Low", count: counts.Low },
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map(({ key, count }) => (
        <SummaryCard key={key} {...cardMeta[key]} count={count} />
      ))}
    </section>
  );
}
