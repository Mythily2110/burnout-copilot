import { averageScore, getRiskClasses, groupByDepartment } from "../utils";

const getStatus = (departmentEmployees) => {
  const highRisk = departmentEmployees.filter((employee) => employee.riskLevel === "High").length;
  const avgScore = averageScore(departmentEmployees);

  if (highRisk >= 2 || avgScore >= 70) {
    return { label: "Critical", classes: getRiskClasses("High") };
  }

  if (highRisk === 1 || avgScore >= 40) {
    return { label: "Watch", classes: getRiskClasses("Medium") };
  }

  return { label: "Healthy", classes: getRiskClasses("Low") };
};

const DepartmentRiskTable = ({ employees }) => {
  const rows = Object.entries(groupByDepartment(employees))
    .map(([department, departmentEmployees]) => {
      const highRisk = departmentEmployees.filter((employee) => employee.riskLevel === "High").length;
      const mediumRisk = departmentEmployees.filter((employee) => employee.riskLevel === "Medium").length;
      const lowRisk = departmentEmployees.filter((employee) => employee.riskLevel === "Low").length;

      return {
        department,
        total: departmentEmployees.length,
        highRisk,
        mediumRisk,
        lowRisk,
        avgScore: averageScore(departmentEmployees),
        status: getStatus(departmentEmployees),
      };
    })
    .sort((a, b) => b.avgScore - a.avgScore);

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-md">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["Department", "Total Headcount", "High Risk", "Medium Risk", "Low Risk", "Avg Score", "Status"].map(
                (header) => (
                  <th
                    key={header}
                    className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-gray-500"
                  >
                    {header}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {rows.map((row) => (
              <tr key={row.department} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-gray-900">
                  {row.department}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{row.total}</td>
                <td className="px-6 py-4 text-sm font-semibold text-red-600">{row.highRisk}</td>
                <td className="px-6 py-4 text-sm font-semibold text-amber-600">{row.mediumRisk}</td>
                <td className="px-6 py-4 text-sm font-semibold text-green-600">{row.lowRisk}</td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">{row.avgScore}</td>
                <td className="px-6 py-4">
                  <span className={`rounded-full border px-3 py-1 text-xs font-bold ${row.status.classes}`}>
                    {row.status.label}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DepartmentRiskTable;
