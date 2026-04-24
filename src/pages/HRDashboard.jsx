import Navbar from "../components/Navbar";
import SummaryCards from "../components/SummaryCards";
import DepartmentChart from "../components/DepartmentChart";
import RiskDistributionPie from "../components/RiskDistributionPie";
import DepartmentRiskTable from "../components/DepartmentRiskTable";
import { employees, calculateBurnout } from "../data/employees";

export default function HRDashboard({ user, onLogout }) {
  const allEmployees = employees.map((employee) => ({
    ...employee,
    burnout: calculateBurnout(employee),
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onLogout={onLogout} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-purple-600">
            HR Admin Workspace
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            HR Analytics Overview 📊
          </h1>
          <p className="mt-2 text-slate-600">
            Company-wide burnout risk summary — individual names are anonymized
          </p>
        </section>

        <SummaryCards employees={allEmployees} />

        <section className="grid gap-6 lg:grid-cols-2">
          <DepartmentChart employees={allEmployees} />
          <RiskDistributionPie employees={allEmployees} />
        </section>

        <section className="mt-8">
          <h2 className="mb-4 text-xl font-bold text-slate-900">
            Department Risk Breakdown
          </h2>
          <DepartmentRiskTable employees={allEmployees} />
        </section>

        <section className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-900 shadow-sm">
          🔒 <span className="font-semibold">Privacy Notice:</span> HR view shows
          aggregated department data only. Individual employee details are only
          accessible to direct managers.
        </section>
      </main>
    </div>
  );
}
