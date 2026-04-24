import { useMemo, useState } from 'react';
import { employees, calculateBurnout } from '../data/employees';
import EmployeeModal from '../components/EmployeeModal';
import EmployeeTable from '../components/EmployeeTable';
import Navbar from '../components/Navbar';
import SummaryCards from '../components/SummaryCards';
import TeamRiskChart from '../components/TeamRiskChart';

export default function ManagerDashboard({ user, onLogout }) {
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const myTeam = useMemo(
    () =>
      employees
        .filter((employee) => employee.managerId === user.managerId)
        .map((employee) => ({
          ...employee,
          burnout: calculateBurnout(employee),
        })),
    [user.managerId],
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onLogout={onLogout} />

      <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <section>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">Manager Dashboard</p>
          <h1 className="mt-2 text-3xl font-bold text-gray-950">Welcome back, {user.name} 👋</h1>
          <p className="mt-2 text-gray-600">Here is your team's current wellbeing overview</p>
        </section>

        <SummaryCards employees={myTeam} />

        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-950">Team Risk Overview</h2>
            <p className="text-sm text-gray-600">Burnout estimates by direct report with threshold markers.</p>
          </div>
          <TeamRiskChart employees={myTeam} />
        </section>

        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-950">Team Members</h2>
            <p className="text-sm text-gray-600">Search, filter, and open individual intervention details.</p>
          </div>
          <EmployeeTable employees={myTeam} onSelectEmployee={setSelectedEmployee} />
        </section>
      </main>

      {selectedEmployee ? (
        <EmployeeModal employee={selectedEmployee} onClose={() => setSelectedEmployee(null)} />
      ) : null}
    </div>
  );
}
