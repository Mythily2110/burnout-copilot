import AICopilot from './AICopilot'
import { getRiskBadgeClasses } from '../utils'

function factorContributions(employee) {
  const seniorityValue = employee.designation === 'Junior' ? 10 : employee.designation === 'Mid' ? 5 : 0
  return [
    {
      label: 'Mental Fatigue',
      value: (employee.mentalFatigueScore / 10) * 35,
      max: 35,
      high: employee.mentalFatigueScore >= 7,
    },
    {
      label: 'Resource Load',
      value: (employee.resourceAllocation / 10) * 25,
      max: 25,
      high: employee.resourceAllocation >= 8,
    },
    {
      label: 'Overtime Hours',
      value: (Math.max(0, employee.weeklyHours - 40) / 30) * 20,
      max: 20,
      high: employee.weeklyHours >= 55,
    },
    {
      label: 'PTO Deficit',
      value: ((15 - employee.ptoUsed) / 15) * 10,
      max: 10,
      high: employee.ptoUsed <= 4,
    },
    {
      label: 'Seniority',
      value: seniorityValue,
      max: 10,
      high: employee.designation === 'Junior',
    },
  ]
}

function DetailItem({ label, value }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-gray-900">{value}</p>
    </div>
  )
}

function EmployeeModal({ employee, onClose }) {
  const factors = factorContributions(employee)
  const topDrivers = [...factors]
    .sort((a, b) => b.value / b.max - a.value / a.max)
    .slice(0, 2)
    .map((factor) => factor.label)

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 p-4 backdrop-blur-sm sm:p-6">
      <div className="mx-auto max-w-6xl rounded-3xl bg-white shadow-2xl">
        <div className="flex flex-col gap-4 border-b border-gray-100 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-900">{employee.name}</h2>
              <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${getRiskBadgeClasses(employee.riskLevel)}`}>
                {employee.riskLevel} Risk
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Burnout risk score: <span className="font-semibold text-gray-800">{employee.score}</span>/100
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Close
          </button>
        </div>

        <div className="grid gap-6 p-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900">Employee Details</h3>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                <DetailItem label="Department" value={employee.department} />
                <DetailItem label="Designation" value={employee.designation} />
                <DetailItem label="WFH Setup" value={employee.wfhSetup} />
                <DetailItem label="Tenure" value={`${employee.tenure} years`} />
                <DetailItem label="Weekly Hours" value={`${employee.weeklyHours} hrs`} />
                <DetailItem label="PTO Used" value={`${employee.ptoUsed} days`} />
              </div>
            </section>

            <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900">Risk Factor Contributions</h3>
              <div className="mt-5 space-y-4">
                {factors.map((factor) => {
                  const width = Math.min(100, Math.round((factor.value / factor.max) * 100))
                  return (
                    <div key={factor.label}>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="font-semibold text-gray-700">{factor.label}</span>
                        <span className="text-gray-500">{factor.value.toFixed(1)} pts</span>
                      </div>
                      <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                        <div
                          className={`h-full rounded-full ${factor.high ? 'bg-red-500' : 'bg-blue-500'}`}
                          style={{ width: `${width}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
              <span className="font-bold">Top risk drivers:</span> {topDrivers.join(', ')}
            </div>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900">🤖 AI Intervention Copilot</h3>
            <p className="mt-2 text-sm text-gray-600">
              Generate empathetic, manager-ready next steps tailored to this employee's early risk signals.
            </p>
            <div className="mt-5">
              <AICopilot employee={employee} />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 bg-gray-50 px-6 py-4 text-sm text-gray-600">
          ⚠️ This is an AI-generated estimate based on simulated indicators. Always use professional judgment before taking any action.
        </div>
      </div>
    </div>
  )
}

export default EmployeeModal
