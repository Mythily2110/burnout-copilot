import { useMemo, useState } from 'react';
import { getRiskBadgeClasses } from '../utils';

function EmployeeTable({ employees, onSelectEmployee }) {
  const [query, setQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState('All');

  const visibleEmployees = useMemo(() => {
    const riskOrder = { High: 0, Medium: 1, Low: 2 };

    return employees
      .filter((employee) => employee.name.toLowerCase().includes(query.toLowerCase()))
      .filter((employee) => riskFilter === 'All' || employee.riskLevel === riskFilter)
      .sort((a, b) => {
        const riskDifference = riskOrder[a.riskLevel] - riskOrder[b.riskLevel];
        return riskDifference || b.score - a.score;
      });
  }, [employees, query, riskFilter]);

  return (
    <div className="rounded-2xl bg-white p-6 shadow-md">
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="relative max-w-md flex-1">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search team member by name..."
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <select
          value={riskFilter}
          onChange={(event) => setRiskFilter(event.target.value)}
          className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        >
          <option>All</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100 text-left text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-wide text-gray-500">
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Department</th>
              <th className="px-4 py-3 font-semibold">Designation</th>
              <th className="px-4 py-3 font-semibold">WFH</th>
              <th className="px-4 py-3 font-semibold">Weekly Hrs</th>
              <th className="px-4 py-3 font-semibold">Mental Fatigue</th>
              <th className="px-4 py-3 font-semibold">Risk Badge</th>
              <th className="px-4 py-3 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {visibleEmployees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-4 py-4 font-semibold text-gray-900">{employee.name}</td>
                <td className="whitespace-nowrap px-4 py-4 text-gray-600">{employee.department}</td>
                <td className="whitespace-nowrap px-4 py-4 text-gray-600">{employee.designation}</td>
                <td className="whitespace-nowrap px-4 py-4 text-gray-600">{employee.wfhSetup}</td>
                <td className="whitespace-nowrap px-4 py-4 text-gray-600">{employee.weeklyHours}</td>
                <td className="whitespace-nowrap px-4 py-4 text-gray-600">{employee.mentalFatigueScore}/10</td>
                <td className="whitespace-nowrap px-4 py-4">
                  <span className={`rounded-full border px-3 py-1 text-xs font-bold ${getRiskBadgeClasses(employee.riskLevel)}`}>
                    {employee.riskLevel} ({employee.score})
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-4">
                  <button
                    type="button"
                    onClick={() => onSelectEmployee(employee)}
                    className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-700"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {visibleEmployees.length === 0 && (
        <div className="rounded-xl border border-dashed border-gray-200 p-8 text-center text-sm text-gray-500">
          No team members match the current filters.
        </div>
      )}
    </div>
  );
}

export default EmployeeTable;
